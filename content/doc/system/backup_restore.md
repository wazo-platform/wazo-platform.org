-   [Backup](#backup)
    -   [Periodic backup](#periodic-backup)
    -   [Retrieve the backup](#retrieve-the-backup)
    -   [What is actually backed-up?](#what-is-actually-backed-up)
        -   [Data](#data)
        -   [Database](#database)
    -   [Creating backup files manually](#manual_backup)
        -   [Database](#database-1)
        -   [Files](#files)
-   [Restore](#restore)
    -   [Introduction](#introduction)
    -   [Limitations](#limitations)
    -   [Before Restoring the System](#before-restoring-the-system)
    -   [Restoring System Files](#restoring-system-files)
    -   [Restoring the Database](#restoring-the-database)
        -   [Troubleshooting](#troubleshooting)
    -   [Alternative: Restoring and Keeping System
        Configuration](#restore_keep_system_config)
    -   [After Restoring The System](#after_restore)

Backup
======

Periodic backup
---------------

A backup of the database and the data are launched every day with a
logrotate task. It is run at 06:25 a.m. and backups are kept for 7 days.

Logrotate task:

> `/etc/logrotate.d/xivo-backup`{.interpreted-text role="file"}

Logrotate cron:

> `/etc/cron.daily/logrotate`{.interpreted-text role="file"}

Retrieve the backup
-------------------

With shell access, you can retrieve them in
`/var/backups/xivo`{.interpreted-text role="file"}. In this directory
you will find `db.tgz`{.interpreted-text role="file"} and
`data.tgz`{.interpreted-text role="file"} files for the database and
data backups.

Backup scripts:

> `/usr/sbin/xivo-backup`{.interpreted-text role="file"}

Backup location:

> `/var/backups/xivo`{.interpreted-text role="file"}

What is actually backed-up?
---------------------------

### Data

Here is the list of folders and files that are backed-up:

-   `/etc/asterisk/`{.interpreted-text role="file"}
-   `/etc/consul/`{.interpreted-text role="file"}
-   `/etc/crontab`{.interpreted-text role="file"}
-   `/etc/dahdi/`{.interpreted-text role="file"}
-   `/etc/dhcp/`{.interpreted-text role="file"}
-   `/etc/hostname`{.interpreted-text role="file"}
-   `/etc/hosts`{.interpreted-text role="file"}
-   `/etc/ldap/`{.interpreted-text role="file"}
-   `/etc/network/if-up.d/xivo-routes`{.interpreted-text role="file"}
-   `/etc/network/interfaces`{.interpreted-text role="file"}
-   `/etc/ntp.conf`{.interpreted-text role="file"}
-   `/etc/profile.d/xivo_uuid.sh`{.interpreted-text role="file"}
-   `/etc/resolv.conf`{.interpreted-text role="file"}
-   `/etc/ssl/`{.interpreted-text role="file"}
-   `/etc/systemd/`{.interpreted-text role="file"}
-   `/etc/wanpipe/`{.interpreted-text role="file"}
-   `/etc/wazo-agentd/`{.interpreted-text role="file"}
-   `/etc/wazo-agid/`{.interpreted-text role="file"}
-   `/etc/wazo-amid/`{.interpreted-text role="file"}
-   `/etc/wazo-auth/`{.interpreted-text role="file"}
-   `/etc/wazo-call-logd/`{.interpreted-text role="file"}
-   `/etc/wazo-calld/`{.interpreted-text role="file"}
-   `/etc/wazo-chatd/`{.interpreted-text role="file"}
-   `/etc/wazo-confd/`{.interpreted-text role="file"}
-   `/etc/wazo-confgend-client/`{.interpreted-text role="file"}
-   `/etc/wazo-phoned/`{.interpreted-text role="file"}
-   `/etc/wazo-dird/`{.interpreted-text role="file"}
-   `/etc/wazo-plugind/`{.interpreted-text role="file"}
-   `/etc/wazo-purge-db/`{.interpreted-text role="file"}
-   `/etc/wazo-webhookd/`{.interpreted-text role="file"}
-   `/etc/wazo-websocketd/`{.interpreted-text role="file"}
-   `/etc/wazo-dxtora/`{.interpreted-text role="file"}
-   `/etc/xivo/`{.interpreted-text role="file"}
-   `/root/.config/wazo-auth-cli/`{.interpreted-text role="file"}
-   `/usr/local/bin/`{.interpreted-text role="file"}
-   `/usr/local/sbin/`{.interpreted-text role="file"}
-   `/usr/local/share/`{.interpreted-text role="file"}
-   `/usr/share/wazo/WAZO-VERSION`{.interpreted-text role="file"}
-   `/var/lib/asterisk/`{.interpreted-text role="file"}
-   `/var/lib/consul/`{.interpreted-text role="file"}
-   `/var/lib/wazo/`{.interpreted-text role="file"}
-   `/var/lib/wazo-auth-keys/`{.interpreted-text role="file"}
-   `/var/lib/wazo-provd/`{.interpreted-text role="file"}
-   `/var/log/asterisk/`{.interpreted-text role="file"}
-   `/var/spool/asterisk/`{.interpreted-text role="file"}
-   `/var/spool/cron/crontabs/`{.interpreted-text role="file"}

The following files/folders are excluded from this backup:

-   folders:
    -   `/var/lib/consul/checks`{.interpreted-text role="file"}
    -   `/var/lib/consul/raft`{.interpreted-text role="file"}
    -   `/var/lib/consul/serf`{.interpreted-text role="file"}
    -   `/var/lib/consul/services`{.interpreted-text role="file"}
    -   `/var/lib/wazo-provd/plugins/*/var/cache/*`{.interpreted-text
        role="file"}
    -   `/var/spool/asterisk/monitor/`{.interpreted-text role="file"}
    -   `/var/spool/asterisk/meetme/`{.interpreted-text role="file"}
-   files
    -   `/var/lib/wazo-provd/plugins/xivo-polycom*/var/tftpboot/*.ld`{.interpreted-text
        role="file"}
-   log files, coredump files
-   audio recordings
-   and, files greater than 10 MiB or folders containing more than 100
    files if they belong to one of these folders:
    -   `/var/lib/wazo/sounds/`{.interpreted-text role="file"}
    -   `/var/lib/asterisk/sounds/custom/`{.interpreted-text
        role="file"}
    -   `/var/lib/asterisk/moh/`{.interpreted-text role="file"}
    -   `/var/spool/asterisk/voicemail/`{.interpreted-text role="file"}
    -   `/var/spool/asterisk/monitor/`{.interpreted-text role="file"}

### Database

The following databases from PostgreSQL are backed up:

-   `asterisk`: all the configuration done via the web interface
    (exceptions: High Availability, Provisioning, Certificates)

Creating backup files manually {#manual_backup}
------------------------------

::: {.warning}
::: {.admonition-title}
Warning
:::

A backup file may take a lot of space on the disk. You should check the
free space on the partition before creating one.
:::

### Database

You can manually create a *database* backup file named
`db-manual.tgz`{.interpreted-text role="file"} in
`/var/tmp`{.interpreted-text role="file"} by issuing the following
commands:

    xivo-backup db /var/tmp/db-manual

### Files

You can manually create a *data* backup file named
`data-manual.tgz`{.interpreted-text role="file"} in
`/var/tmp`{.interpreted-text role="file"} by issuing the following
commands:

    xivo-backup data /var/tmp/data-manual

Restore
=======

Introduction
------------

A backup of both the configuration files and the database used by a Wazo
installation is done automatically every day. These backups are created
in the `/var/backups/xivo`{.interpreted-text role="file"} directory and
are kept for 7 days.

Limitations
-----------

-   You must restore a backup on the **same version** of Wazo that was
    backed up (though the architecture \-- `i386` or `amd64` \-- may
    differ)
-   You must restore a backup on a machine with the **same hostname and
    IP address**

Before Restoring the System
---------------------------

::: {.warning}
::: {.admonition-title}
Warning
:::

Before restoring a Wazo on a fresh install you have to setup Wazo using
the wizard.
:::

Stop monit and all the Wazo services:

    wazo-service stop

Restoring System Files
----------------------

System files are stored in the data.tgz file located in the
`/var/backups/xivo`{.interpreted-text role="file"} directory.

This file contains for example, voicemail files, musics, voice guides,
phone sets firmwares, provisioning server configuration database.

To restore the file :

    tar xvfp /var/backups/xivo/data.tgz -C /

Once the database and files have been restored, you can
`finalize the restore <after_restore>`{.interpreted-text role="ref"}

Restoring the Database
----------------------

::: {.warning}
::: {.admonition-title}
Warning
:::

-   This will destroy all the current data in your database.
-   You have to check the free space on your system partition before
    extracting the backups.
-   If restoring Wazo \>= 18.01 on a different machine, you should not
    restore the system configuration, because of network interface names
    that would change. See
    `restore_keep_system_config`{.interpreted-text role="ref"}.
:::

Database backups are created as `db.tgz`{.interpreted-text role="file"}
files in the `/var/backups/xivo`{.interpreted-text role="file"}
directory. These tarballs contains a dump of the database used in Wazo.

In this example, we\'ll restore the database from a backup file named
`db.tgz`{.interpreted-text role="file"} placed in the home directory of
root.

First, extract the content of the `db.tgz`{.interpreted-text
role="file"} file into the `/var/tmp`{.interpreted-text role="file"}
directory and go inside the newly created directory:

    tar xvf db.tgz -C /var/tmp
    cd /var/tmp/pg-backup

Drop the asterisk database and restore it with the one from the backup:

    sudo -u postgres dropdb asterisk
    sudo -u postgres pg_restore -C -d postgres asterisk-*.dump

Once the database and files have been restored, you can
`finalize the restore <after_restore>`{.interpreted-text role="ref"}

### Troubleshooting

When restoring the database, if you encounter problems related to the
system locale, see `postgresql_localization_errors`{.interpreted-text
role="ref"}.

Alternative: Restoring and Keeping System Configuration {#restore_keep_system_config}
-------------------------------------------------------

System configuration like network interfaces is stored in the database.
It is possible to keep this configuration and only restore Wazo data.

Rename the asterisk database to asterisk\_previous:

    sudo -u postgres psql -c 'ALTER DATABASE asterisk RENAME TO asterisk_previous'

Restore the asterisk database from the backup:

    sudo -u postgres pg_restore -C -d postgres asterisk-*.dump

Restore the system configuration tables from the asterisk\_previous
database:

    sudo -u postgres pg_dump -c -t dhcp -t netiface -t resolvconf asterisk_previous | sudo -u postgres psql asterisk

Drop the asterisk\_previous database:

    sudo -u postgres dropdb asterisk_previous

::: {.warning}
::: {.admonition-title}
Warning
:::

Restoring the data.tgz file also restores system files such as host
hostname, network interfaces, etc. You will need to reapply the network
configuration if you restore the data.tgz file.
:::

Once the database and files have been restored, you can
`finalize the restore <after_restore>`{.interpreted-text role="ref"}

After Restoring The System {#after_restore}
--------------------------

1.  Restore the server UUID:

        XIVO_UUID=$(sudo -u postgres psql -d asterisk -tA -c 'select uuid from infos')
        echo "export XIVO_UUID=$XIVO_UUID" > /etc/profile.d/xivo_uuid.sh

    Then edit `/etc/systemd/system.conf`{.interpreted-text role="file"}
    to update `XIVO_UUID` in `DefaultEnvironment`

2.  You may reboot the system, or execute the following steps.
3.  Update systemd runtime configuration:

        source /etc/profile.d/xivo_uuid.sh
        systemctl set-environment XIVO_UUID=$XIVO_UUID
        systemctl daemon-reload

4.  Restart the services you stopped in the first step:

        wazo-service start
