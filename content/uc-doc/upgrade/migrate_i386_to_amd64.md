---
title: 'Migrate Wazo from `i386` (32 bits) to `amd64` (64 bits)'
---

There is no fully automated method to migrate Wazo from `i386` to
`amd64`.

The procedure is:

1.  `Upgrade <upgrade>`{.interpreted-text role="ref"} your `i386`
    machine to XiVO/Wazo \>= 15.13
2.  `Install <install>`{.interpreted-text role="ref"} a Wazo `amd64`
    **using the same version as the upgraded Wazo i386**
3.  Make a backup of your Wazo `i386` by following the
    `backup procedure <manual_backup>`{.interpreted-text role="ref"}
4.  Copy the backup tarballs to the Wazo `amd64`
5.  Restore the backup by following the
    `restore procedure <restore>`{.interpreted-text role="ref"}

Before starting the services after restoring the backup on the Wazo
`amd64`, you should ensure that there won\'t be a conflict between the
two machines, e.g. two DHCP servers on the same broadcast domain, or
both Wazo fighting over the same SIP trunk register. You can disable the
Wazo `i386` by running:

    wazo-service stop

But be aware the Wazo `i386` will be enabled again after you reboot it.
