---
title: Devices
---

The supported devices are expected to work across upgrades and phone
features should work on the latest version.

::: {.toctree maxdepth="1"}
supported\_devices
:::

The supported devices page lists, for each vendor, a table that shows
the various features supported by Wazo. Here\'s an example:

  -----------------------------------------------------------------------------
                                          Model X       Model Y   Model Z
  --------------------------------------- ------------- --------- -------------
  Provisioning                            Y             Y         Y

  H-A                                     Y             Y         Y

  Directory XIVO                          N             Y         Y

  Funckeys                                0             2         8

                                          \*\*Support   ed        mable
                                                        program   keys\*\*

  User with supervision function          Y             Y         Y
  -----------------------------------------------------------------------------

The rows have the following meaning:

Provisioning

:   Is the device supported by the
    `auto-provisioning <provisioning>`{.interpreted-text role="ref"}
    system?

H-A

:   Is the device supported by the
    `high availability <high-availability>`{.interpreted-text
    role="ref"} system?

Directory XiVO

:   Is the device supported by the
    `remote directory <remote-directory>`{.interpreted-text role="ref"}?
    In other word, is it possible to consult the XiVO\'s remote
    directory from the device?

Funckeys

:   How many function keys can be configured on the device from the Wazo
    web interface?

    The number of function keys that can be configured on a device is
    not necessarily the same as the number of physical function keys the
    device has. For example, an Aastra 6757i has 12 physical keys but
    you can configure 30 function keys because of the page system.

Inside a table, the following legend is used:

-   Y = Yes / Supported
-   N = No / Not supported
-   NT = Not tested
-   NYT = Not yet tested

Each table also contains a section about the supported function keys. In
that section, the following legend can also be used:

-   FK = Funckey
-   SK = SoftKey
-   HK = HardKey
-   MN = Menu

Function keys work using the extensions. It is important to enable the
function keys you want to use. Also, the enable transfer option in the
user configuration must be enabled to use transfer function keys.
