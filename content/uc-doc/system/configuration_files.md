---
title: Configuration Files
---

This section describes some of the Wazo configuration files.

Configuration priority {#configuration-priority}
======================

Usually, the configuration is read from two locations: a configuration
file `config.yml` and a configuration directory `conf.d`.

Files in the `conf.d` extra configuration directory:

-   are used in alphabetical order and the first one has priority
-   are ignored when their name starts with a dot
-   are ignored when their name does not end with `.yml`

For example:

`.01-critical.yml`:

    log_level: critical

`02-error.yml.dpkg-old`:

    log_level: error

`10-debug.yml`:

    log_level: debug

`20-nodebug.yml`:

    log_level: info

The value that will be used for `log_level` will be `debug` since:

-   `10-debug.yml` comes before `20-nodebug.yml` in the alphabetical
    order.
-   `.01-critical.yml` starts with a dot so is ignored
-   `02-error.yml.dpkg-old` does not end with `.yml` so is ignored

File configuration structure
============================

Configuration files for every service running on a Wazo server will
respect these rules:

-   Default configuration directory in
    `/etc/xivo-{{service}}/conf.d` (e.g.
    `/etc/wazo-agentd/conf.d/`)
-   Default configuration file in
    `/etc/xivo-{{service}}/config.yml`
    (e.g. `/etc/wazo-agentd/config.yml`)

The files `/etc/xivo-{{service}}/config.yml`{.interpreted-text
role="file"} should not be modified because **they will be overridden
during upgrades**. However, they may be used as examples for creating
additional configuration files as long as they respect the
[Configuration priority](/uc-doc/system/configuration_files#configuration-priority). Any exceptions
to these rules are documented below.

wazo-auth {#wazo-auth}
=========

-   Default configuration directory:
    `/etc/wazo-auth/conf.d`
-   Default configuration file:
    `/etc/wazo-auth/config.yml`

wazo-agentd
===========

-   Default configuration directory:
    `/etc/wazo-agentd/conf.d`
-   Default configuration file:
    `/etc/wazo-agentd/config.yml`

wazo-amid
=========

-   Default configuration directory:
    `/etc/wazo-amid/conf.d`
-   Default configuration file:
    `/etc/wazo-amid/config.yml`

wazo-confgend {#wazo-confgend}
=============

-   Default configuration directory:
    `/etc/wazo-confgend/conf.d`
-   Default configuration file:
    `/etc/wazo-confgend/config.yml`
-   Default templates directory:
    `/etc/wazo-confgend/templates`

xivo-dao
========

-   Default configuration directory:
    `/etc/xivo-dao/conf.d`
-   Default configuration file:
    `/etc/xivo-dao/config.yml`

This configuration is read by many Wazo programs in order to connect to
the Postgres database of Wazo.

wazo-phoned {#wazo-phoned}
===========

-   Default configuration directory:
    `/etc/wazo-phoned/conf.d`
-   Default configuration file:
    `/etc/wazo-phoned/config.yml`

wazo-provd
==========

-   Default configuration directory:
    `/etc/wazo-provd/conf.d`
-   Default configuration file:
    `/etc/wazo-provd/config.yml`

wazo-websocketd
===============

-   Default configuration directory:
    `/etc/wazo-websocketd/conf.d`
-   Default configuration file:
    `/etc/wazo-websocketd/config.yml`

conf}xivo\_ring.conf {#xivo_ring.
===============

-   Path: `/etc/xivo/asterisk/xivo_ring.conf`
-   Purpose: This file can be used to change the ringtone played by the
    phone depending on the origin of the call.

#:warning: Note that this feature has not been tested for all phones and all call
flows. This page describes how you can customize this file but does not
intend to list all validated call flows or phones.

This file `xivo_ring.conf` consists of :

-   profiles of configuration (some examples for different brands are
    already included: `[aastra]`, `[snom]` etc.)
-   one section named `[number]` where you apply the profile to an
    extension or a context etc.

Here is the process you should follow if you want to use/customize this
feature :

1.  Create a new profile, e.g.:

        [myprofile-aastra]

2.  Change the `phonetype` accordingly, in our example:

        [myprofile-aastra]
        phonetype = aastra

3.  Chose the ringtone for the different type of calls (note that the
    ringtone names are brand-specific):

        [myprofile-aastra]
        phonetype = aastra
        intern = <Bellcore-dr1>
        group = <Bellcore-dr2>

4.  Apply your profile, in the section `[number]`

> -   to a given list of extensions (e.g. 1001 and 1002):
>
>         1001@default = myprofile-aastra
>         1002@default = myprofile-aastra
>
> -   or to a whole context (e.g. default):
>
>         @default = myprofile-aastra
>
5.  Restart `wazo-agid` service:

        service wazo-agid restart

Asterisk configuration files {#asterisk-configuration}
============================

Asterisk configuration files are located at [/etc/asterisk]{.title-ref}.
These files are packaged with Wazo and you should not modify files that
are located at the root of this directory.

To add you own configurations, you must add a new configuration file in
the corresponding [.d]{.title-ref} directory.

For example, if you need to add a new user to the
[manager.conf]{.title-ref} configuration file, you would add a new file
[/etc/asterisk/manager.d/my\_new\_user.conf]{.title-ref} with the
following content:

    .. code-block: ini

> \[my\_new\_user\] secret=v3ry5ecre7 deny=0.0.0.0/0.0.0.0
> permit=127.0.0.1/255.255.255.0 read = system

The same logic applies to all Asterisk configuration files except
[asterisk.conf]{.title-ref} and [modules.conf]{.title-ref}.

Modifying the modules.conf
--------------------------

The `/etc/asterisk/modules.conf` file is automatically generated before
Asterisk starts. Modifying its content will do nothing as it\'s going to
be overritten on the next Asterisk restart.

To enable modules in the `modules.conf` file the administrator has to
configure [wazo-confgend](/uc-doc/contributors/debug_daemon#wazo-confgend) to add the
required modules to the content of the generated file.

This is done by adding the module name to the
[enabled\_asterisk\_modules]{.title-ref} section of the configuration.

### Enabling res\_cli\_aliases

1.  Enable [res\_cli\_aliases.so]{.title-ref} in the
    [wazo-confgend]{.title-ref} configuration:

        cat <<EOF > /etc/wazo-confgend/conf.d/res_cli_aliases.yml
        enabled_asterisk_modules:
            res_cli_aliases.so: true
        EOF

2.  Restart \`wazo-confgend\`:

        systemctl restart wazo-confgend

3.  Check that your changes work by looking at the generated
    \`modules.conf\`:

        wazo-confgen asterisk/modules.conf

4.  Restart Asterisk:

        systemctl restart asterisk
