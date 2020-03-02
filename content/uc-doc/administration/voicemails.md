---
title: Voicemails
---

-   [General Configuration](#voicemail_general_configuration)
-   [Deleting a voicemail](#deleting-a-voicemail)
-   [Disable password checking](#disable-password-checking)
-   [Advanced configuration](#advanced-configuration)
    -   [Remote *wazo-confd*](#remote-wazo-confd)

Voicemail Configuration.

General Configuration {#voicemail_general_configuration}
=====================

The global voicemail configuration is provided by `/asterisk/voicemail`
endpoints

To customize the email sent when a voicemail is received, you can use a
few variables. The complete list is available on the [Asterisk
wiki](https://wiki.asterisk.org/wiki/display/AST/VoiceMail+Channel+Variables).

Deleting a voicemail
====================

-   Deleting a voicemail is irreversible. It deletes all messages
    associated with that voicemail.
-   If the voicemail contains messages, the message waiting indication
    on the phone will not be deactivated until the next phone reboot.

Disable password checking
=========================

Unchecking the option `ask_password` field allows you to skip password
checking for the voicemail only when it is consulted from an internal
context.

-   when calling the voicemail with \*98
-   when calling the voicemail with \*99\<voicemail number\>

::: {.warning}
::: {.admonition-title}
Warning
:::

If the the \*99 extension is enabled and a user does not have a password
on its voicemail, anyone from the same context will be able to listen to
its messages, change its password and greeting messages.
:::

::: {.warning}
::: {.admonition-title}
Warning
:::

For security reasons, an incoming call with
`{"destination": {"appplication: "voicemail"}` with the same context as
the voicemail should be avoided if a voicemail has no password.
:::

Advanced configuration
======================

Remote *wazo-confd*
-------------------

If *wazo-confd* is on a remote host, *wazo-confd-client* configuration
will be required to be able to change the voicemail passwords using a
phone.

This configuration should be done:

``` {.sourceCode .sh}
mkdir -p /etc/systemd/system/asterisk.service.d
cat >/etc/systemd/system/asterisk.service.d/remote-confd-voicemail.conf <<EOF
[Service]
Environment=CONFD_HOST=localhost
Environment=CONFD_PORT=9486
Environment=CONFD_HTTPS=true
Environment=CONFD_USERNAME=<username>
Environment=CONFD_PASSWORD=<password>
EOF
systemctl daemon-reload
```
