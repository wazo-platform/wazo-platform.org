---
title: Post Installation
---

Here are a few configuration options that are commonly changed once the
installation is completed. Please note that these changes are optional.

## Display called name on internal calls

When you call internally another phone of the system you would like your
phone to display the name of the called person (instead of the dialed
number only). To achieve this you must change the following SIP options:

-   `PUT /asterisk/sip/general`

    > -   `trustrpid`: `yes`
    > -   `sendrpid`: `pai`

## Incoming caller number display {#callerid-num-normalization}

The caller ID number on incoming calls depends on what is sent by your
operator. You can modify it via the file
`/etc/xivo/asterisk/xivo_in_callerid.conf`.

#:exclamation: The reverse directory lookup use the caller ID number after it has been
modified by `xivo_in_callerid.conf`

Examples:

-   If you use a prefix to dial outgoing numbers (like a 0) you should
    add a 0 to all the `add =` sections,
-   You may want to display incoming numbers in E.164 format. For
    example, you can change the `[national1]` section to:

        callerid = ^0[1-9]\d{8}$
        strip = 1
        add = +33

To enable the changes you have to restart wazo-agid:

    service wazo-agid restart

## Time and date


-   Configure your locale and default time zone device template with
    `wazo-provd` endpoint `/provd/cfg_mgr/config` by editing the default
    template
-   If needed, reconfigure your timezone for the system:

        dpkg-reconfigure tzdata

## Codecs

You should also select default codecs. It obviously depends on the telco
links, the country, the phones, the usage, etc. Here is a typical
example for Europe (the main goal in this example is to select *only*
`alaw` instead of both `alaw` and `ulaw` by default):

-   `PUT /asterisk/sip/general`

    > -   `allow`: `alaw,g722,g729,h264`

-   `PUT /asterisk/iax/general`

    > -   `allow`: `alaw,g722,g729,h264`
