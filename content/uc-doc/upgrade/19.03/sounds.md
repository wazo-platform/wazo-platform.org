---
title: Migration of sound files to tenants
---

In Wazo 19.03, sound files are now segregated by tenant (a.k.a entity).
However, Wazo has no way to know which entity owns which sound file.
Thus a manual intervention is required to make those sound files
available to tenants.

Sound files include:

-   queue announces (`acd`)
-   telephony feature sounds, like autoprovisioning message, transfer
    messages, etc. (`features`)
-   recordings of sounds, conversations and conferences (`recordings`
    and `monitor`)
-   custom sounds used for IVR or dialplan (`playback`)

How to migrate
==============

The sound files are stored in `/var/lib/xivo/sounds`, for example:

```ShellSession
root@wazo:~# tree /var/lib/xivo/sounds
/var/lib/xivo/sounds
├── acd
│   ├── tenant-bakery-queue-announce.wav
│   └── tenant-grocery-queue-announce.wav
├── features
│   ├── tenant-bakery-autoprov.wav
│   └── tenant-vacuumcleaners-autoprov.wav
├── monitor -> ../../../spool/asterisk/monitor
├── playback
└── recordings -> ../../asterisk/sounds/custom
```

In order to make the sound files available to tenants, you need to move
the files in a `tenants`{.interpreted-text role="file"} subdirectory,
like this:

```ShellSession
root@wazo:~# tree /var/lib/xivo/sounds
/var/lib/xivo/sounds
└── tenants
    ├── 3176b5c5-a765-4dcc-81a6-e69e29081d66
    │   ├── acd
    │   │   └── tenant-bakery-queue-announce.wav
    │   ├── features
    │   │   └── tenant-bakery-autoprov.wav
    │   ├── monitor
    │   ├── playback
    │   └── recordings
    ├── 62770df9-4451-4b99-a1d3-ccf48881b173
    │   ├── acd
    │   │   └── tenant-grocery-queue-announce.wav
    │   ├── features
    │   ├── monitor
    │   ├── playback
    │   └── recordings
    └── cc85438a-8e79-417f-b713-f05e1529d132
        ├── acd
        ├── features
        │   └── tenant-vacuumcleaners-autoprov.wav
        ├── monitor
        ├── playback
        └── recordings
```

Each subdirectory of the `tenants`{.interpreted-text role="file"}
directory must be named like the UUID of each tenant. In order to know
the UUID of tenants, you can use the `wazo-auth-cli` command:

```ShellSession
root@wazo:~# wazo-auth-cli tenant list -c uuid -c name
+--------------------------------------+----------------+
| uuid                                 | name           |
+--------------------------------------+----------------+
| 80ef6d2e-2f70-4934-a02b-bdabcdf48495 | master         |
| 3176b5c5-a765-4dcc-81a6-e69e29081d66 | bakery         |
| 62770df9-4451-4b99-a1d3-ccf48881b173 | grocery        |
| cc85438a-8e79-417f-b713-f05e1529d132 | vacuumcleaners |
+--------------------------------------+----------------+
```

You can safely ignore the `master` tenant, which is used internally by
Wazo.

You should move sounds files of each tenant for the following
directories:

-   `acd`
-   `features`
-   `monitor`
-   `playback`
-   `recordings`
