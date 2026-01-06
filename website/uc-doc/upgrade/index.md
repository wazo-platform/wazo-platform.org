---
title: Upgrading
sidebar_position: 3
---

Upgrading a Wazo is done by executing commands through a terminal on the server. You can connect to
the server either through SSH or with a physical console.

To upgrade your Wazo to the latest version, you **must** use the `wazo-upgrade` script. You can
start an upgrade with the command:

```shell
wazo-upgrade
```

**Warning**: **You can't use wazo-upgrade if you have not run the wizard yet. Upgrading from a
[deprecated version](/uc-doc/upgrade/version_deprecation_policy) is not supported.**

This script will update Wazo and restart all services.

There are 2 options you can pass to wazo-upgrade:

- `-d` to only download packages without installing them. **This will still upgrade the package
  containing wazo-upgrade**.
- `-f` to force upgrade, without asking for user confirmation

`wazo-upgrade` uses the following environment variables:

- `WAZO_CONFD_PORT` to set the port used to query the
  [HTTP API of wazo-confd](/uc-doc/api_sdk/rest_api/confd) (default is `9486`)

## Upgrade procedure

- Read all existing [upgrade notes](/uc-doc/upgrade/upgrade_notes) starting from your version to the
  latest version.
- For custom setups, follow the required procedures described below (e.g. HA cluster).
- To download the packages beforehand, run `wazo-upgrade -d`. This is not mandatory, but it does not
  require stopping any service, so it may be useful to reduce the downtime of the server while
  upgrading.
- When ready, run `wazo-upgrade` which will start the upgrade process. **Telephony services will be
  stopped during the process**
- When finished, check that all services are running (the list is displayed at the end of the
  upgrade).
- Check that services are correctly working like SIP registration, ISDN link status,
  internal/incoming/outgoing calls, Wazo Client connections etc.
- If you have installed plugins using [wazo-plugind](/docs/api/wazo-plugind/description), you may
  need to reinstall them. See [wazo-plugind Plugins](#wazo-plugind-plugins) for more details.

## Upgrading a cluster {#upgrading-a-cluster}

Here are the steps for upgrading a cluster, i.e. two Wazo with
[high availability](/uc-doc/high_availability):

1. On the master : deactivate the database replication by commenting the cron in
   `/etc/cron.d/xivo-ha-master`
2. On the slave, deactivate the xivo-check-master-status script cronjob by commenting the line in
   `/etc/cron.d/xivo-ha-slave`
3. On the slave, start the upgrade:

   ```shell
   wazo-slave:~$ wazo-upgrade
   ```

4. When the slave has finished, start the upgrade on the master:

   ```shell
   wazo-master:~$ wazo-upgrade
   ```

5. When done, launch the database replication manually:

   ```shell
   wazo-master:~$ xivo-master-slave-db-replication <slave ip>
   ```

6. Reactivate the cronjobs (see steps 1 and 2)

## Upgrading to a specific version of Wazo

See our recommendation on
[how to upgrade to a specific version of Wazo](/uc-doc/upgrade/upgrade_specific_version)

## Upgrading from i386 (32 bits) to amd64 (64 bits)

- [Migrate from i386 to amd64](/uc-doc/upgrade/archives/migrate_i386_to_amd64)

## Unsupported versions

- [Version Deprecation Policy](/uc-doc/upgrade/version_deprecation_policy)

## wazo-plugind Plugins {#wazo-plugind-plugins}

Plugins installed through [wazo-plugind](/docs/api/wazo-plugind/description) are not automatically
upgraded. If a new version of a plugin is required for compatibility with a new wazo stack version,
the administrator is responsible for uninstalling the old version, and installing the new version.

Additionally, manual re-installation may be required following an upgrade, depending on the type of
plugin and the type of upgrade.

- **Patch-based plugins**: plugins using source code patches need to be systematically re-installed
  following _any_ wazo stack upgrade;
- **Upgrades involving Debian version changes**: following a wazo upgrade involving a Debian version
  change, python-based plugins also need to be systematically upgraded/re-installed; generally, a
  Debian version upgrade involves a python version change, which implies packaging and code changes
  for python-based projects, so supported plugins should see new updated versions made available,
  which should be installed following the upgrade in replacement of the previous version; plugins
  not officially supported by Wazo (custom or community-supported) may become incompatible if no
  maintenance effort is made;

See [plugins administration documentation](/uc-doc/administration/plugins) for instructions on
listing and reinstalling plugins using `wazo-plugind-cli`.

## Troubleshooting {#troubleshooting}

### Invalid signature (before 23.06 only)

You may encounter the following error:

```
The following signatures were invalid: EXPKEYSIG 3F1BF7FC527FBC6A Wazo Release Key <dev.wazo@gmail.com>
```

This error happens on all Wazo Platform servers installed before 23.06. See also the
[issue ticket](https://wazo-dev.atlassian.net/browse/WAZO-2622).

To fix the issue, run the following commands:

```
curl https://mirror.wazo.community/wazo_current.key | apt-key add -
curl https://mirror.wazo.community/wazo_current.key | apt-key --keyring /etc/apt/trusted.gpg.d/wazo-keyring.gpg add -
wazo-upgrade
```

### Postgresql

When upgrading Wazo, if you encounter problems related to the system locale, see
`postgresql_localization_errors`.

### wazo-upgrade

If wazo-upgrade fails or aborts in mid-process, the system might end up in a faulty condition. If in
doubt, run the following command to check the current state of Wazo's firewall rules:

```shell
iptables -nvL
```

If, among others, it displays something like the following line (notice the DROP and 5060):

```shell
0     0 DROP       udp  --  *      *       0.0.0.0/0            0.0.0.0/0           udp dpt:5060
```

Then your Wazo will not be able to register any SIP phones. In this case, you must delete the DROP
rules with the following command:

```shell
iptables -D INPUT -p udp --dport 5060 -j DROP
```

Repeat this command until no more unwanted rules are left.

## Upgrade notes {#upgrade-notes}

- [Upgrade Notes](/uc-doc/upgrade/upgrade_notes)
