---
title: Debian 11 (Bullseye) Upgrade Notes
---

The upgrade to Wazo 23.06 or later will take longer than usual, because the whole Debian system will
be upgraded.

The database management system (PostgreSQL) will also be upgraded from version 11 to version 13 at
the same time. This will upgrade the database used by Wazo. This operation should take at most a few
minutes.

After the upgrade, the system will need to be rebooted.

## Before the upgrade

- Make sure your version of Wazo is at least 19.13. You can run `wazo-upgrade` to check the version
  currently installed. If your version of Wazo is older than 19.13, you should first upgrade your
  Wazo to Debian Buster, following the procedure described in
  [Debian 10 (buster) Upgrade Notes](/uc-doc/upgrade/upgrade_notes_details/19-13/buster).
- Make sure your have sufficient space for the upgrade. You might run into trouble if you have less
  than 2 GiB available in the file system that holds the `/var` and `/` directories.
- If you have customized the Debian system of your Wazo in some nontrivial way, you might want to
  review the [official Debian release notes](https://www.debian.org/releases/bullseye/releasenotes)
  before the upgrade. Most importantly, you should:
  - Make sure you don't have any unofficial sources in your `/etc/apt/sources.list` or
    `/etc/apt/sources.list.d` directory. If you were using the `buster-backports` source, you must
    remove it.
  - Remove packages that were automatically installed and are not needed anymore, by running
    `apt-get autoremove --purge`.
  - Purge removed packages. You can see the list of packages in this state by running
    `dpkg -l | awk '/^rc/ { print $2 }'` and purge all of them with
    `apt-get purge $(dpkg -l | awk '/^rc/ { print $2 }')`
  - Remove `.dpkg-*`, `.ucf-*` and `.merge-error` files from previous upgrade. You can see a list of
    these files by running `find /etc -name '*.dpkg-*' -o -name '*.ucf-*' -o -name '*.merge-error'`.

## Upgrade

The upgrade must be done with three commands:

- `wazo-dist -m pelican-buster`: Ensures your system is not restricted to a specific version
- `wazo-upgrade`: Installs the `wazo-dist-upgrade` script and makes sure the system is up-to-date.
- `wazo-dist-upgrade`: Upgrades to the latest version of Wazo with Debian 11 (Bullseye). This
  upgrade will take longer than usual.

To minimize the downtime, you can pre-download the packages required for the upgrade with:

```shell
wazo-upgrade -d
wazo-dist-upgrade -d
```

## After the upgrade

- Verify that any changes you had made to your configuration files are still present and working.

  During the upgrade, new versions of configuration files are installed, and these might override
  your local changes. For example, the vim package provides a new `/etc/vim/vimrc` file. If you have
  customized this file, after the upgrade you'll have both a `/etc/vim/vimrc` and
  `/etc/vim/vimrc.dpkg-old` file, the former containing the new version of the file shipped by the
  vim package while the latter is your customized version. You should merge your customizations back
  into the new file, then delete the `.dpkg-old` file.

  You can see a list of affected files by running `find /etc -name '*.dpkg-old'`. If some files show
  up that you didn't modify yourself, you can ignore them.

- Purge removed packages. You can see the list of packages in this state by running
  `dpkg -l | awk '/^rc/ { print $2 }'` and purge all of them with
  `apt-get purge $(dpkg -l | awk '/^rc/ { print $2 }')`
- Reboot your system. It is necessary for the new Linux kernel to be effective.

## External Links

- [Official Debian 11 release notes](https://www.debian.org/releases/bullseye/releasenotes)
