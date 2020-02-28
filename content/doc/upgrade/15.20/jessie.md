---
title: 'Debian 8 (jessie) Upgrade Notes'
---

-   [Before the upgrade](#before-the-upgrade)
-   [After the upgrade](#after-the-upgrade)
-   [Changes](#changes)
-   [List of Known Bugs And
    Limitations](#list-of-known-bugs-and-limitations)
-   [External Links](#external-links)

The upgrade to XiVO 15.20 or later will take longer than usual, because
the whole Debian system will be upgraded.

The database management system (postgresql) will also be upgraded from
version 9.1 to version 9.4 at the same time. This will upgrade the
database used by XiVO. This operation should take at most a few minutes.

After the upgrade, the system will need to be rebooted.

Before the upgrade
==================

-   Make sure your have sufficient space for the upgrade. You might run
    into trouble if you have less than 2 GiB available in the file
    system that holds the /var and / directories.
-   If you have customized the Debian system of your XiVO in some
    nontrivial way, you might want to review the [official Debian
    release notes](https://www.debian.org/releases/jessie/releasenotes)
    before the upgrade. Most importantly, you should:
    -   Make sure you don\'t have any unofficial sources in your
        /etc/apt/sources.list or /etc/apt/sources.list.d directory. If
        you were using the wheezy-backports source, you must remove it.
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

After the upgrade
=================

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
    `find /etc -name '*.dpkg-old'`. If some files shows up that you
    didn\'t modify by yourself, you can ignore them.

-   Purge removed packages. You can see the list of packages in this
    state by running `dpkg -l | awk '/^rc/ { print $2 }'` and purge all
    of them with `apt-get purge $(dpkg -l | awk '/^rc/ { print $2 }')`
-   If you had customizations in one of these files:

    -   `/etc/default/asterisk`{.interpreted-text role="file"}
    -   `/etc/default/consul`{.interpreted-text role="file"}
    -   `/etc/default/xivo-ctid`{.interpreted-text role="file"}

    Then you\'ll need to review your customizations to make sure they
    still work with systemd. This is necessary since these 3 files
    aren\'t read under systemd.

    For `/etc/default/asterisk`{.interpreted-text role="file"}, only the
    [CONFD]()\* options are automatically migrated to
    `/etc/systemd/system/asterisk.service.d/auto-sysv-migration.conf`{.interpreted-text
    role="file"}.

    For `/etc/default/consul`{.interpreted-text role="file"}, only the
    WAIT\_FOR\_LEADER and CONFIG\_DIR options are automatically migrated
    to
    `/etc/systemd/system/consul.service.d/auto-sysv-migration.conf`{.interpreted-text
    role="file"}.

    For `/etc/default/xivo-ctid`{.interpreted-text role="file"}, only
    the XIVO\_CTID\_AMI\_PROXY option is automatically migrated to
    `/etc/systemd/system/xivo-ctid.service.d/auto-sysv-migration.conf`{.interpreted-text
    role="file"}.

-   Reboot your system. It is necessary for the upgrade to the Linux
    kernel and init system (systemd) to be effective.

Changes
=======

Here\'s a non-exhaustive list of changes that comes with XiVO on Debian
8:

-   In Debian 7, the `halt` command powered off the machine. In Debian
    8, the command halts the system, but does not power off the machine.
    To halt the machine and turn it off, use the `poweroff` or
    `shutdown` command.
-   With the init system switch from SysV to systemd, you should now use
    the `systemctl` command to manage services (i.e. start/stop/status)
    instead of the `service` command or `/etc/init.d/<service>`,
    although these two methods should still work fine.

    If you are new to systemd, you can find some basic usage on the
    [systemd page of the Debian
    Wiki](https://wiki.debian.org/systemd#Managing_services_with_systemd).

-   The bootlogd package is not installed by default anymore, since it
    is not needed with systemd. If you want to see the boot messages,
    use the `journalctl -b` command instead.
-   The virtual terminals (tty1 to tty6) now shows up earlier during the
    boot, before all services have been started.
-   The way the ami-proxy is configured for xivo-ctid has changed. If
    your XiVO was using the ami-proxy, the configuration will be
    automatically upgraded.
-   Customization to asterisk and consul startup is now done by
    customizing the systemd unit file (by creating a drop-in file for
    example) instead of editing the
    `/etc/default/asterisk`{.interpreted-text role="file"} and
    `/etc/default/consul`{.interpreted-text role="file"} files. These
    files are not used anymore.

List of Known Bugs And Limitations
==================================

-   If your system is using a swap partition or file and is using more
    memory than it can fit in the RAM, then system power-off or reboot
    might hangs indefinitely. This is due to a limitation in the current
    systemd version.

    If you find yourself in this case, you should try allocating more
    RAM to your system. Otherwise, you can try stopping the xivo
    services using `wazo-service stop` before rebooting to lessen the
    likelihood of this problem.

    See <http://projects.wazo.community/issues/6016>

External Links
==============

-   [Official Debian 8 release
    notes](https://www.debian.org/releases/jessie/releasenotes)
