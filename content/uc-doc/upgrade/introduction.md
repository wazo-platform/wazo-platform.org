---
title: Upgrading Procedure
---

Upgrading a Wazo is done by executing commands through a terminal on the
server. You can connect to the server either through SSH or with a
physical console.

To upgrade your Wazo to the latest version, you **must** use the
`wazo-upgrade` script. You can start an upgrade with the command:

```
wazo-upgrade
```

#:exclamation: **You can't use wazo-upgrade if you have not run the wizard yet
Upgrading from a [deprecated version](/uc-doc/upgrade/version_deprecation_policy)
is not supported. When upgrading Wazo, you must also upgrade
all associated Wazo Clients. There is currently no
retro-compatibility on older Wazo Client versions. The only exception is
Wazo 16.16, which is compatible with Wazo Client 16.13.**

This script will update Wazo and restart all services.

There are 2 options you can pass to wazo-upgrade:

-   `-d` to only download packages without installing them. **This will
    still upgrade the package containing wazo-upgrade**.
-   `-f` to force upgrade, without asking for user confirmation

`wazo-upgrade` uses the following environment variables:

-   `WAZO_CONFD_PORT` to set the port used to query the
    `HTTP API of wazo-confd <confd-api>`{.interpreted-text role="ref"}
    (default is 9486)

## Upgrade procedure

-   Read all existing [upgrade notes](/uc-doc/upgrade/upgrade_notes)
    starting from your version to the latest version.
-   For custom setups, follow the required procedures described below
    (e.g. HA cluster).
-   To download the packages beforehand, run `wazo-upgrade -d`. This is
    not mandatory, but it does not require stopping any service, so it
    may be useful to reduce the downtime of the server while upgrading.
-   When ready, run `wazo-upgrade` which will start the upgrade process.
    **Telephony services will be stopped during the process**
-   When finished, check that all services are running (the list is
    displayed at the end of the upgrade).
-   Check that services are correctly working like SIP registration,
    ISDN link status, internal/incoming/outgoing calls, Wazo Client
    connections etc.

## Version-specific upgrade procedures

### Upgrading from XiVO 16.13 and before

When upgrading from XiVO 16.13 or before, you must use the special
[XiVO to Wazo upgrade procedure](/uc-doc/upgrade/16-16/xivo_to_wazo#upgrading-to-wazo) instead of
simply running `xivo-upgrade`.

## Upgrading a cluster

Here are the steps for upgrading a cluster, i.e. two Wazo with
[high-availability](/uc-doc/high_availability/):

1.  On the master : deactivate the database replication by commenting
    the cron in `/etc/cron.d/xivo-ha-master`
2.  On the slave, deactivate the xivo-check-master-status script cronjob
    by commenting the line in
    `/etc/cron.d/xivo-ha-slave`
3.  On the slave, start the upgrade:

        xivo-slave:~$ wazo-upgrade

4.  When the slave has finished, start the upgrade on the master:

        xivo-master:~$ wazo-upgrade

5.  When done, launch the database replication manually:

        xivo-master:~$ xivo-master-slave-db-replication <slave ip>

6.  Reactivate the cronjobs (see steps 1 and 2)

## Upgrading to a specific version of Wazo

See our recommandation on [how to upgrade to a specific version of Wazo](/uc-doc/upgrade/upgrade_specific_version/introduction)

## Upgrading from i386 (32 bits) to amd64 (64 bits)

- [Migrate from i386 to amd64](/uc-doc/upgrade/migrate_i386_to_amd64)

## Unsupported versions

- [Version Deprecation Policy](/uc-doc/upgrade/version_deprecation_policy)

## Troubleshooting

### Postgresql

When upgrading Wazo, if you encounter problems related to the system
locale, see `postgresql_localization_errors`.

### wazo-upgrade

If wazo-upgrade fails or aborts in mid-process, the system might end up
in a faulty condition. If in doubt, run the following command to check
the current state of xivo's firewall rules:

```
iptables -nvL
```

If, among others, it displays something like the following line (notice
the DROP and 5060):

```
0     0 DROP       udp  --  *      *       0.0.0.0/0            0.0.0.0/0           udp dpt:5060
```

Then your Wazo will not be able to register any SIP phones. In this
case, you must delete the DROP rules with the following command:

    iptables -D INPUT -p udp --dport 5060 -j DROP

Repeat this command until no more unwanted rules are left.

## Upgrade notes

- [Upgrade Notes](/uc-doc/upgrade/upgrade_notes)
