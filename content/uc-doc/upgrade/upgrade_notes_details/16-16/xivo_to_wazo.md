---
title: XiVO to Wazo Upgrade Notes
---

The Wazo project is a continuation of the original XiVO project.
Programs, filenames, packages, plugins, etc, still use the \"xivo\" name
as to not break backward compatibility. In this regard, upgrading from
XiVO 16.13 to Wazo 16.16 is not different from upgrading XiVO 16.10 to
XiVO 16.13, for example.

More information about the Wazo project is available on the [Wazo blog](/blog/introducing-wazo).

## <a name="using-wazo-infrastructure"></a>Using the Wazo Infrastructure on your XiVO

Since `*.xivo.io` has been shut down, you may use the infrastructure at
`*.wazo.community` instead of `*.xivo.io`. This step is only needed if
you **don\'t intend to upgrade to Wazo** right away, i.e. you want to
continue using your XiVO installation in its current version for some
time. The features needing `*.xivo.io` are:

- Installing new provisioning plugins
- Keeping your DHCP configuration up-to-date (for new phones OUI, for example)
- Upgrading to XiVO \<= 16.13, i.e. not Wazo

In this case, you\'ll need to run the following commands:

```ShellSession
# --no-check-certificate is needed only if you are affected by http://projects.wazo.community/issues/6024
wget --no-check-certificate https://raw.githubusercontent.com/wazo-platform/wazo-upgrade/master/bin/use-wazo-infrastructure
chmod +x use-wazo-infrastructure
./use-wazo-infrastructure
```

The `use-wazo-infrastructure` script adds lines to the
`/etc/hosts`{.interpreted-text role="file"} file such that hostnames
that used to refer to the infrastructure of the XiVO project (e.g.
mirror.xivo.io) now points to the infrastructure of the Wazo project
(e.g. mirror.wazo.community).

The script can be run multiple times. If you want to revert the
modification done by the script, just execute it with the `--revert`
option.

This script is compatible with any future upgrade, you don\'t have to
revert it manually.

## <a name="upgrading-to-wazo"></a>Upgrading to Wazo

To upgrade your XiVO to Wazo, run the following commands:

```ShellSession
# --no-check-certificate is needed only if you are affected by http://projects.wazo.community/issues/6024
wget --no-check-certificate https://raw.githubusercontent.com/wazo-platform/wazo-upgrade/master/bin/xivo-to-wazo-upgrade
chmod +x xivo-to-wazo-upgrade
./xivo-to-wazo-upgrade
```

### After the Upgrade

You should make sure that you don\'t have any reference left to the
xivo.io domain on your Wazo. In particular, you should check the
`/etc` directory with the command:
```ShellSession
    grep -rF xivo.io /etc
```
There is no release of the Wazo Client 16.16, but Wazo 16.16 is
compatible with the Wazo Client 16.13.
