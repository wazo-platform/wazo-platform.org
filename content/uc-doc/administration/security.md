---
title: Security
---

-   [fail2ban](#fail2ban)
    -   [asterisk-wazo](#asterisk-wazo)
    -   [wazo-provd](#wazo-provd)
    -   [sshd](#sshd)
-   [Firewall](#firewall)
-   [Devices](#devices)
-   [Open ports](#open-ports)

This page gives an overview of security best practices that should be
applied to a Wazo installation. This is not an exhaustive documentation
but a starting point that should be read to avoid common security
issues.

Most of this page is aimed at servers that are accessible from the
Internet.

fail2ban
========

Wazo comes with a pre-configured fail2ban. Fail2ban will block IP
addresses that tried and failed to gain access to the server. There are
3 jails that a configured.

asterisk-wazo
-------------

The `asterisk-wazo` jail watches the Asterisk log file for failed
registration attempts.

This jail protects against brute force attacks attempting to guess SIP
accounts usernames and password.

wazo-provd
----------

The `wazo-provd` jail will block attempts to create new devices and
request for configuration files.

This jail has two goals:

-   limiting DOS attacks by creating new devices repeatedly
-   protecting against brute force attacks attempting to guess
    configuration file names.

See `provd-security` for more details.

sshd
----

The `sshd` jail protects against SSH brute force attacks.

Firewall
========

Wazo comes with iptables installed but does not configure any security
rules. The only interaction Wazo has with iptables are:

-   fail2ban
-   wazo-upgrade blocks SIP trafic during an upgrade, to avoid SIP
    phones to become temporarily unusable after the upgrade.

It is highly recommended that you configure firewall rules on your Wazo.

<a name="devices"></a>Devices
=======

Your devices, phones and VoIP gateways, should not be accessible from
the Internet. If you have no choice, then the passwords should be
changed. Most phones have two different passwords: admin and user
passwords.

Some devices allow Wazo to change the password from the auto
provisioning system. To change the default values, use `wazo-provd`
endpoint `/provd/cfg_mgr/configs`.

For other devices, you need to change the passwords manually.

Open ports
==========

See the list of network ports that are listening to
[0.0.0.0] in the `network_ports` page. Change the service
`configurations<configuration-files>` for
services that do not need to be accessible.
