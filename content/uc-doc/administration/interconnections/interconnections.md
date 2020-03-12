---
title: Interconnections
---

- [two_xivo](/uc-doc/administration/interconnections/two_xivo)
- [xivo_with_voip_provider](/uc-doc/administration/interconnections/xivo_with_voip_provider)
- [xivo_with_pbx](/uc-doc/administration/interconnections/xivo_with_pbx)

Specific VoIP providers
=======================

- [simonics](/uc-doc/administration/interconnections/simonics)

Create an interconnection
=========================

There are three types of interconnections :

-   Customized
-   SIP
-   IAX

SIP interconnections
--------------------

SIP interconnections are used to connect to a SIP provider to to another
PBX that is part of your telecom infrastructure.

General SIP configurations are available with `/asterisk/sip/general`
endpoint and trunk configurations are available with `/endpoints/sip`
and `/trunks` endpoints

### Environment with NAT

There are some configuration steps that are required when connecting to
a SIP provider from a NAT environment.

-   `PUT /asterisk/sip/general {..., "externip": "69.70.94.94", "localnet": "192.168.0.0/16", ...}`
-   `externip`: This is your public IP address
-   `localnet`: Your internal network range
-   `PUT /endpoints/sip/{endpoint_sip_id} {"options": [["nat", "yes"], ["qualify", "yes"]]}`

#:warning: When changing the [externip]{.title-ref}, the
[media_address]{.title-ref} or the [externhost]{.title-ref} Asterisk
has to be restarted using the [wazo-service restart]{.title-ref} command
for the changes to take effect.

Customized interconnections
---------------------------

Customized interconnections are mainly used for interconnections using
DAHDI or Local channels:

-   *Name* : it is the name which will appear in the outcall
    interconnections list,
-   *Interface* : this is the channel name (for DAHDI see
    `interco_dahdi_conf`{.interpreted-text role="ref"})
-   *Interface suffix* (optional) : a suffix added after the dialed
    number (in fact the Dial command will dial:

        <Interface>/<EXTEN><Interface suffix>

-   *Context* : currently not relevant

### DAHDI interconnections {#interco_dahdi_conf}

To use your DAHDI links you must create a customized interconnection.

**Name** : the name of the interconnection like **e1_span1** or
**bri_port1**

**Interface** : must be of the form `dahdi/[group order][group number]`
where :

-   `group order` is one of :
    -   `g` : pick the first available channel in group, searching from
        lowest to highest,
    -   `G` : pick the first available channel in group, searching from
        highest to lowest,
    -   `r` : pick the first available channel in group, going in
        round-robin fashion (and remembering where it last left off),
        searching from lowest to highest,
    -   `R` : pick the first available channel in group, going in
        round-robin fashion (and remembering where it last left off),
        searching from highest to lowest.
-   `group number` is the group number to which belongs the span as
    defined in the `asterisk_dahdi_channel_conf`{.interpreted-text
    role="ref"}.

#:warning: if you use a BRI card you MUST use per-port dahdi groups. You should not
use a group like g0 which spans over several spans.

Debug
=====

Interesting Asterisk commands: :

    sip show peers
    sip show registry
    sip set debug on

Caller ID
=========

When setting up an interconnection with the public network or another
PBX, it is possible to set a caller ID in different places. Each way to
configure a caller ID has it's own use case.

The format for a caller ID is the following `"My Name" <9999>` If you
don't set the number part of the caller ID, the dialplan's number will
be used instead. This might not be a good option in most cases.

Outgoing call caller ID
=======================

When you create an outgoing call, it's possible to set the
`internal_caller_id`. When this option is activated, the caller's
caller ID will be forwarded to the trunk. This option is use full when
the other side of the trunk can reach the user with it's caller ID
number.

When the caller's caller ID is not usable to the called party, the
outgoing call's caller id can be fixed to a given value that is more
use full to the outside world. Giving the public number here might be a
good idea.

`PUT /outcalls/{outcall_id}/extensions/{extension_id} {"caller_id": ""XIVO" <555>"}`

A user can also have a forced caller ID for outgoing calls. This can be
use full for someone who has his own public number. This option can be
set by user. The `outgoing_caller_id` option must be set to the caller
ID. The user can also set his `outgoing_caller_id` to `anonymous`.

`PUT /users/{user_uuid} {"outgoing_caller_id": ""Bob" <555>"}`

The order of precedence when setting the caller ID in multiple place is
the following.

1.  `internal_caller_id`
2.  User's `outgoing_caller_id`
3.  Outgoing call
4.  Default caller ID
