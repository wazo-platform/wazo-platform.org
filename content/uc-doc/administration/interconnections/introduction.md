---
title: Introduction
---

- [two_wazo](/uc-doc/administration/interconnections/two_wazo)
- [wazo_with_voip_provider](/uc-doc/administration/interconnections/wazo_with_voip_provider)
- [wazo_with_pbx](/uc-doc/administration/interconnections/wazo_with_pbx)

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

SIP interconnections are used to connect to a SIP provider or to another
PBX that is part of your telecom infrastructure.

Global SIP configurations are available with at the following endpoints:

- `/api/confd/1.1/asterisk/pjsip/global`
- `/api/confd/1.1/asterisk/pjsip/system`

Endpoint and trunk configurations are available with at the following endpoints:

- `/api/confd/1.1/endpoints/sip` For the SIP configuration of the trunk
- `/api/confd/1.1/endpoints/sip/templates` The `global` template can be used for global settings shared between all SIP endpoints
- `/api/confd/1.1/trunks` None SIP specific trunk configuration

The [API documentation](/documentation/api/configuration.html) can be used for more details on the configuration.


### Environment with NAT

There are some configuration steps that are required when connecting to
a SIP provider from a NAT environment.

#### Configuring your transport

The transport needs to be configured with the local network and it's external address and port.
This can be done using the `/api/confd/1.1/sip/transports` API.

    {
        "name": "transport-udp",
        "options": [
            ...,
            ["local_net", "192.168.0.0/16"],
            ["local_net", "10.1.1.0/24"],
            ["external_media_port", "<PUBLIC IP ADDRESS"],
            ["external_signaling_address", "<PUBLIC IP ADDRESS>"]
        ]
    },

- `external_signaling_address`: This is your public IP address
- `external_media_address`: This is your public IP address
- `local_net`: Your internal network range

Note that modifying a transport requires an Asterisk restart to be applied


#### Configuring your Endpoints

Some options should be set on your endpoints for them to work in a NAT environment. The `global` SIP
template can be used to apply settings to all SIP endpoints.

- `PUT /api/confd/1.1/endpoints/sip/templates/<SIP template UUID>`

    {
        "uuid": "<UUID>",
        "label": "global",
        ...,
        "endpoint_section_options": [
            ...,
            ["rtp_symmetric", "yes"],
            ["rewrite_contact", "yes"]
        ],
        ...
    }


### SIP Headers


#### Outgoing calls

There are some use cases where you need to set specific SIP headers on all outgoing
calls done using a trunk.

Adding a SIP header can be done using dialplan with the `PJSIP_HEADER(add,MY-HEADER)=value`
or it can be done in the endpoint configuration using a `set_var`.

Using the endpoint configuration endpoint `/endpoints/sip`

    {
        "uuid": "<UUID>",
        ...,
        "endpoint_section_options": [
            ...,
            ["set_var", "PJSIP_HEADER(add,<HEADER NAME>)=<HEADER VALUE>"]
        ],
        ...
    }


#### Incoming calls

Sometimes it is necessary to match incoming SIP INVITE against a specific header to route the
call to the appropriate SIP endpoint.

This is useful in a multi tenant situation where multiple tenants share the same provider.

If your provider sends the `X-Dest-User: abc123` header when you receive a call you should add a
match on the trunk SIP endpoint to get those calls routed to this endpoint.

    {
        "uuid": "<UUID>",
        ...,
        "endpoint_section_options": [
            ...,
            ["identify_by", "header,auth_username,username"],
        ],
        "identify_section_options": [
            ...,
            ["match_header", "X-Dest-User: abc123"]
        ],
        ...
    }


Customized interconnections
---------------------------

Customized interconnections are mainly used for interconnections using
DAHDI or Local channels:

-   *Name* : it is the name which will appear in the outcall
    interconnections list,
-   *Interface* : this is the channel name (for DAHDI see
    [DAHDI interconnections](/uc-doc/administration/interconnections/introduction#interco-dahdi-conf))
-   *Interface suffix* (optional) : a suffix added after the dialed
    number (in fact the Dial command will dial:

        <Interface>/<EXTEN><Interface suffix>

-   *Context* : currently not relevant

### DAHDI interconnections {#interco-dahdi-conf}

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
    defined in the [/etc/asterisk/dahdi-channels.conf](/uc-doc/administration/hardware/introduction#asterisk-dahdi-channel-conf).

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
