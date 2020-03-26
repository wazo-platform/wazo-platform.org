---
title: 'Migrate Wazo from `i386` (32 bits) to `amd64` (64 bits)'
---

There is no fully automated method to migrate Wazo from `i386` to
`amd64`.

The procedure is:

1.  [Upgrade](/uc-doc/upgrade/upgrade_notes_details/18-01/stretch#upgrade) your `i386`
    machine to XiVO/Wazo \>= 15.13
2.  [Install](/uc-doc/installation/install-system) a Wazo `amd64`
    **using the same version as the upgraded Wazo i386**
3.  Make a backup of your Wazo `i386` by following the
    [backup procedure](/uc-doc/system/backup_restore#manual_backup)
4.  Copy the backup tarballs to the Wazo `amd64`
5.  Restore the backup by following the
    [restore procedure](/uc-doc/system/backup_restore#restore)

Before starting the services after restoring the backup on the Wazo
`amd64`, you should ensure that there won\'t be a conflict between the
two machines, e.g. two DHCP servers on the same broadcast domain, or
both Wazo fighting over the same SIP trunk register. You can disable the
Wazo `i386` by running:

    wazo-service stop

But be aware the Wazo `i386` will be enabled again after you reboot it.
