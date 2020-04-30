---
title: Backup/Restore
---

Backup {#backup}
======

Periodic backup
---------------

A backup of the database and the data are launched every day with a
logrotate task. It is run at 06:25 a.m. and backups are kept for 7 days.

Logrotate task:

> `/etc/logrotate.d/xivo-backup`

Logrotate cron:

> `/etc/cron.daily/logrotate`

Retrieve the backup
-------------------

With shell access, you can retrieve them in
`/var/backups/xivo`. In this directory
you will find `db.tgz` and
`data.tgz` files for the database and
data backups.

Backup scripts:

> `/usr/sbin/xivo-backup`

Backup location:

> `/var/backups/xivo`

What is actually backed-up?
---------------------------

### Data

Here is the list of folders and files that are backed-up:

-   `/etc/asterisk/`
-   `/etc/consul/`
-   `/etc/crontab`
-   `/etc/dahdi/`
-   `/etc/dhcp/`
-   `/etc/hostname`
-   `/etc/hosts`
-   `/etc/ldap/`
-   `/etc/network/if-up.d/xivo-routes`
-   `/etc/network/interfaces`
-   `/etc/ntp.conf`
-   `/etc/profile.d/xivo_uuid.sh`
-   `/etc/resolv.conf`
-   `/etc/ssl/`
-   `/etc/systemd/`
-   `/etc/wanpipe/`
-   `/etc/wazo-agentd/`
-   `/etc/wazo-agid/`
-   `/etc/wazo-amid/`
-   `/etc/wazo-auth/`
-   `/etc/wazo-call-logd/`
-   `/etc/wazo-calld/`
-   `/etc/wazo-chatd/`
-   `/etc/wazo-confd/`
-   `/etc/wazo-confgend-client/`
-   `/etc/wazo-phoned/`
-   `/etc/wazo-dird/`
-   `/etc/wazo-plugind/`
-   `/etc/wazo-purge-db/`
-   `/etc/wazo-webhookd/`
-   `/etc/wazo-websocketd/`
-   `/etc/wazo-dxtora/`
-   `/etc/xivo/`
-   `/root/.config/wazo-auth-cli/`
-   `/usr/local/bin/`
-   `/usr/local/sbin/`
-   `/usr/local/share/`
-   `/usr/share/wazo/WAZO-VERSION`
-   `/var/lib/asterisk/`
-   `/var/lib/consul/`
-   `/var/lib/wazo/`
-   `/var/lib/wazo-auth-keys/`
-   `/var/lib/wazo-provd/`
-   `/var/log/asterisk/`
-   `/var/spool/asterisk/`
-   `/var/spool/cron/crontabs/`

The following files/folders are excluded from this backup:

-   folders:
    -   `/var/lib/consul/checks`
    -   `/var/lib/consul/raft`
    -   `/var/lib/consul/serf`
    -   `/var/lib/consul/services`
    -   `/var/lib/wazo-provd/plugins/*/var/cache/*`{.interpreted-text role="file"}
    -   `/var/spool/asterisk/monitor/`
    -   `/var/spool/asterisk/meetme/`
-   files
    -   `/var/lib/wazo-provd/plugins/xivo-polycom*/var/tftpboot/*.ld`{.interpreted-text role="file"}
-   log files, coredump files
-   audio recordings
-   and, files greater than 10 MiB or folders containing more than 100
    files if they belong to one of these folders:
    -   `/var/lib/wazo/sounds/`
    -   `/var/lib/asterisk/sounds/custom/`{.interpreted-text role="file"}
    -   `/var/lib/asterisk/moh/`
    -   `/var/spool/asterisk/voicemail/`
    -   `/var/spool/asterisk/monitor/`

### Database

The following databases from PostgreSQL are backed up:

-   `asterisk`: all the configuration done via the web interface
    (exceptions: High Availability, Provisioning, Certificates)

Creating backup files manually {#manual_backup}
------------------------------

#:warning: A backup file may take a lot of space on the disk. You should check the
free space on the partition before creating one.

### Database

You can manually create a *database* backup file named
`db-manual.tgz` in
`/var/tmp` by issuing the following
commands:

    xivo-backup db /var/tmp/db-manual

### Files

You can manually create a *data* backup file named
`data-manual.tgz` in
`/var/tmp` by issuing the following
commands:

    xivo-backup data /var/tmp/data-manual

Restore {#restore}
=======

Introduction {#intro-provisioning}
------------

A backup of both the configuration files and the database used by a Wazo
installation is done automatically every day. These backups are created
in the `/var/backups/xivo` directory and
are kept for 7 days.

Limitations
-----------

-   You must restore a backup on the **same version** of Wazo that was
    backed up (though the architecture -- `i386` or `amd64` -- may
    differ)
-   You must restore a backup on a machine with the **same hostname and
    IP address**

Before Restoring the System
---------------------------

#:warning: Before restoring a Wazo on a fresh install you have to setup Wazo using
the wizard.

Stop monit and all the Wazo services:

    wazo-service stop

Restoring System Files
----------------------

System files are stored in the data.tgz file located in the
`/var/backups/xivo` directory.

This file contains for example, voicemail files, musics, voice guides,
phone sets firmwares, provisioning server configuration database.

To restore the file :

    tar xvfp /var/backups/xivo/data.tgz -C /

Once the database and files have been restored, you can
[finalize the restore](/uc-doc/system/backup_restore#after_restore)

Restoring the Database
----------------------

#:warning:
-   This will destroy all the current data in your database.
-   You have to check the free space on your system partition before
    extracting the backups.
-   If restoring Wazo >= 18.01 on a different machine, you should not
    restore the system configuration, because of network interface names
    that would change. See
    [Alternative: Restoring and Keeping System Configuration](/uc-doc/system/backup_restore#restore_keep_system_config).

Database backups are created as `db.tgz`
files in the `/var/backups/xivo`
directory. These tarballs contains a dump of the database used in Wazo.

In this example, we'll restore the database from a backup file named
`db.tgz` placed in the home directory of
root.

First, extract the content of the `db.tgz`{.interpreted-text role="file"} file into the `/var/tmp`
directory and go inside the newly created directory:

    tar xvf db.tgz -C /var/tmp
    cd /var/tmp/pg-backup

Drop the asterisk database and restore it with the one from the backup:

    sudo -u postgres dropdb asterisk
    sudo -u postgres pg_restore -C -d postgres asterisk-*.dump

Once the database and files have been restored, you can
[finalize the restore](/uc-doc/system/backup_restore#after_restore)

### Troubleshooting {#troubleshooting}

When restoring the database, if you encounter problems related to the
system locale, see [PostgreSQL localization errors](/uc-doc/troubleshooting#postgresql_localization_errors).

Alternative: Restoring and Keeping System Configuration {#restore_keep_system_config}
-------------------------------------------------------

System configuration like network interfaces is stored in the database.
It is possible to keep this configuration and only restore Wazo data.

Rename the asterisk database to asterisk_previous:

    sudo -u postgres psql -c 'ALTER DATABASE asterisk RENAME TO asterisk_previous'

Restore the asterisk database from the backup:

    sudo -u postgres pg_restore -C -d postgres asterisk-*.dump

Restore the system configuration tables from the asterisk_previous
database:

    sudo -u postgres pg_dump -c -t dhcp -t netiface -t resolvconf asterisk_previous | sudo -u postgres psql asterisk

Drop the asterisk_previous database:

    sudo -u postgres dropdb asterisk_previous

#:warning: Restoring the data.tgz file also restores system files such as host
hostname, network interfaces, etc. You will need to reapply the network
configuration if you restore the data.tgz file.

Once the database and files have been restored, you can
[finalize the restore](/uc-doc/system/backup_restore#after_restore)

After Restoring The System {#after_restore}
--------------------------

1.  Restore the server UUID:

        XIVO_UUID=$(sudo -u postgres psql -d asterisk -tA -c 'select uuid from infos')
        echo "export XIVO_UUID=$XIVO_UUID" > /etc/profile.d/xivo_uuid.sh

    Then edit `/etc/systemd/system.conf`
    to update `XIVO_UUID` in `DefaultEnvironment`

2.  You may reboot the system, or execute the following steps.
3.  Update systemd runtime configuration:

        source /etc/profile.d/xivo_uuid.sh
        systemctl set-environment XIVO_UUID=$XIVO_UUID
        systemctl daemon-reload

4.  Restart the services you stopped in the first step:

        wazo-service start
