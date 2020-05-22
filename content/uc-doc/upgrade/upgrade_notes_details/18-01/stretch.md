---
title: 'Debian 9 (stretch) Upgrade Notes'
---

The upgrade to Wazo 18.01 or later will take longer than usual, because
the whole Debian system will be upgraded.

The database management system (postgresql) will also be upgraded from
version 9.4 to version 9.6 at the same time. This will upgrade the
database used by Wazo. This operation should take at most a few minutes.

After the upgrade, the system will need to be rebooted.

## Before the upgrade {#before-the-upgrade}

-   Make sure your have sufficient space for the upgrade. You might run
    into trouble if you have less than 2 GiB available in the file
    system that holds the `/var`{.interpreted-text role="file"} and
    `/`{.interpreted-text role="file"} directories.
-   If you have customized the Debian system of your XiVO in some
    nontrivial way, you might want to review the [official Debian
    release notes](https://www.debian.org/releases/stretch/releasenotes)
    before the upgrade. Most importantly, you should:
    -   Make sure you don\'t have any unofficial sources in your
        `/etc/apt/sources.list`{.interpreted-text role="file"} or
        `/etc/apt/sources.list.d`{.interpreted-text role="file"}
        directory. If you were using the `jessie-backports` source, you
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

## Upgrade {#upgrade}

The upgrade must be done with three commands:

-   `xivo-dist phoenix`: Ensures your system is not restricted to a
    specific version
-   `wazo-upgrade`: Installs the `wazo-dist-upgrade` script and makes
    sure the system is up-to-date.
-   `wazo-dist-upgrade`: Upgrade to the latest version of Wazo with
    Debian 9 (stretch). This upgrade will take longer than usual.

You may need to reboot your machine before running `wazo-dist-upgrade`.
`wazo-dist-upgrade` will tell you if a reboot is needed.

To minimize the downtime, you can pre-download the packages required for
the upgrade with:

    wazo-upgrade -d
    wazo-dist-upgrade -d

## After the upgrade {#after-the-upgrade}

-   Check that customization to your configuration files is still
    effective.

    During the upgrade, new version of configuration files are going to
    be installed, and these might override your local customization. For
    example, the vim package provides a new
    `/etc/vim/vimrc`{.interpreted-text role="file"} file. If you have
    customized this file, after the upgrade you\'ll have both a
    `/etc/vim/vimrc`{.interpreted-text role="file"} and
    `/etc/vim/vimrc.dpkg-old`{.interpreted-text role="file"} file, the
    former containing the new version of the file shipped by the vim
    package while the later is your customized version. You should merge
    back your customization into the new file, then delete the
    `.dpkg-old`{.interpreted-text role="file"} file.

    You can see a list of affected files by running
    `find /etc -name '*.dpkg-old'`. If some files show up that you
    didn\'t modify by yourself, you can ignore them.

-   Purge removed packages. You can see the list of packages in this
    state by running `dpkg -l | awk '/^rc/ { print $2 }'` and purge all
    of them with `apt-get purge $(dpkg -l | awk '/^rc/ { print $2 }')`
-   Reboot your system. It is necessary for the new Linux kernel to be
    effective.

## Changes {#changes}

Here\'s a non-exhaustive list of changes that comes with Wazo on Debian
9:

-   **Network interface names (only for new installs, not upgrades)**:
    Debian Stretch uses the new standard naming scheme for network
    interfaces instead of `eth0`, `eth1`, etc. The new enumeration
    method relies on more sources of information, to produce a more
    repeatable outcome. It uses the firmware/BIOS provided index numbers
    and then tries PCI card slot numbers, producing names like `ens0` or
    `enp1s1`.

## External Links {#external-links}

-   [Official Debian 9 release
    notes](https://www.debian.org/releases/stretch/releasenotes)
