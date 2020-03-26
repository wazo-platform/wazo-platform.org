---
title: Debian 10 (Buster) Upgrade Notes
---

The upgrade to Wazo 19.13 or later will take longer than usual, because
the whole Debian system will be upgraded.

The database management system (postgresql) will also be upgraded from
version 9.6 to version 11 at the same time. This will upgrade the
database used by Wazo. This operation should take at most a few minutes.

After the upgrade, the system will need to be rebooted.

Before the upgrade
==================

-   Make sure your version of Wazo is at least 18.01. You can run
    `wazo-upgrade` to check the version currently installed. If your
    version of Wazo is older that 18.01, you should first upgrade your
    Wazo to Debian Stretch, following the procedure described in
    [Debian 9 (stretch) Upgrade Notes](/uc-doc/upgrade/upgrade_notes_details/18-01/stretch).
-   Make sure your have sufficient space for the upgrade. You might run
    into trouble if you have less than 2 GiB available in the file
    system that holds the `/var` and
    `/` directories.
-   Remove the `freeradius` package. If you have recompiled Asterisk on
    you server you most likely installed the `libfreeradius-dev`
    package, which pulled `freeradius`. This package cannot be
    confiugred on Debian Buster under some circunstances that are not
    under our control. You can remove it with the following command
    `apt purge freeradius`
-   If you have customized the Debian system of your Wazo in some
    nontrivial way, you might want to review the [official Debian
    release notes](https://www.debian.org/releases/buster/releasenotes)
    before the upgrade. Most importantly, you should:
    -   Make sure you don\'t have any unofficial sources in your
        `/etc/apt/sources.list` or
        `/etc/apt/sources.list.d`
        directory. If you were using the `stretch-backports` source, you
        must remove it.
    -   Remove packages that were automatically installed and are not
        needed anymore, by running `apt-get autoremove --purge`.
    -   Purge removed packages. You can see the list of packages in this
        state by running `dpkg -l | awk '/^rc/ { print $2 }'` and purge
        all of them with
        `apt-get purge $(dpkg -l | awk '/^rc/ { print $2 }')`
    -   Remove `.dpkg-old`{.interpreted-text role="file"},
        `.dpkg-dist`{.interpreted-text role="file"} and
        `.dpkg-new`{.interpreted-text role="file"} files from previous
        upgrade. You can see a list of these files by running
        `find /etc -name '*.dpkg-old' -o -name '*.dpkg-dist' -o -name '*.dpkg-new'`.

Upgrade
=======

The upgrade must be done with three commands:

-   `wazo-dist -m pelican-stretch`: Ensures your system is not
    restricted to a specific version
-   `wazo-upgrade`: Installs the `wazo-dist-upgrade` script and makes
    sure the system is up-to-date.
-   `wazo-dist-upgrade`: Upgrades to the latest version of Wazo with
    Debian 10 (Buster). This upgrade will take longer than usual.

You may need to reboot your machine before running `wazo-dist-upgrade`.
`wazo-dist-upgrade` will tell you if a reboot is needed.

To minimize the downtime, you can pre-download the packages required for
the upgrade with:

```ShellSession
# wazo-upgrade -d
# wazo-dist-upgrade -d
```

After the upgrade
=================

-   Check that customization to your configuration files is still
    effective.

    During the upgrade, new version of configuration files are going to
    be installed, and these might override your local customization. For
    example, the vim package provides a new
    `/etc/vim/vimrc` file. If you have
    customized this file, after the upgrade you\'ll have both a
    `/etc/vim/vimrc` and
    `/etc/vim/vimrc.dpkg-old` file, the
    former containing the new version of the file shipped by the vim
    package while the later is your customized version. You should merge
    back your customization into the new file, then delete the
    `.dpkg-old` file.

    You can see a list of affected files by running
    `find /etc -name '*.dpkg-old'`. If some files show up that you
    didn\'t modify by yourself, you can ignore them.

-   Purge removed packages. You can see the list of packages in this
    state by running `dpkg -l | awk '/^rc/ { print $2 }'` and purge all
    of them with `apt-get purge $(dpkg -l | awk '/^rc/ { print $2 }')`
-   Reboot your system. It is necessary for the new Linux kernel to be
    effective.

External Links
==============

-   [Official Debian 10 release
    notes](https://www.debian.org/releases/buster/releasenotes)
