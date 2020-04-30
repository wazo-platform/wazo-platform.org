---
title: Voicemail Configuration
---

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

-   when calling the voicemail with *98
-   when calling the voicemail with *99<voicemail number>

#:warning: If the the *99 extension is enabled and a user does not have a password
on its voicemail, anyone from the same context will be able to listen to
its messages, change its password and greeting messages.

#!warning: For security reasons, an incoming call with
`{"destination": {"appplication: "voicemail"}` with the same context as
the voicemail should be avoided if a voicemail has no password.
