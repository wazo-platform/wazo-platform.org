-   [Interconnect two Wazo directly](#interconnect-two-wazo-directly)
    -   [Establish the trunk](#establish-the-trunk)
    -   [Set the outgoing calls](#set-the-outgoing-calls)
    -   [Set the incoming calls](#set-the-incoming-calls)

::: {.index}
interconnections
:::

Interconnect two Wazo directly
==============================

Interconnecting two Wazo will allow you to send and receive calls
between the users configured on both sides.

The steps to configure the interconnections are:

-   Establish the trunk between the two Wazo, that is the SIP connection
    between the two servers
-   Configure outgoing calls on the server(s) used to emit calls
-   Configure incoming calls on the server(s) used to receive calls

For now, only SIP interconnections have been tested.

Establish the trunk
-------------------

The settings below allow a trunk to be used in both directions, so it
doesn\'t matter which server is A and which is B.

Consider Wazo A wants to establish a trunk with Wazo B.

-   `POST /trunks {"context": <see below>}`
-   `POST /endpoints/sip {"username": "wazo-trunk", "secret": "pass", "type": "friend", "host": "dynamic"}`
-   `PUT /trunks/{trunk_id}/endpoints/sip/{sip_id}`

The `context` field will determine which extensions will be reachable by
the other side of the trunk:

-   If `context` is set to `default`, then every user, group, conf room,
    queue, etc. that have an extension if the `default` context will be
    reachable directly by the other end of the trunk. This setting can
    ease configuration if you manage both ends of the trunk.
-   If you are establishing a trunk with a provider, you probably don\'t
    want everything to be available to everyone else, so you can set the
    `context` field to `from-extern`. By default, there is no extension
    available in this context, so we will be able to configure which
    extension are reachable by the other end. This is the role of the
    incoming calls: making bridges from the `from-extern` context to
    other contexts.

On Wazo A, create the other end of the SIP trunk:

-   `POST /trunks {"context": "from-extern"}`
-   `POST /endpoints/sip {"username": "wazo-trunk", "secret": "pass", "type": "friend", "host": <Wazo B IP address or hostname>}`
-   `PUT /trunks/{trunk_id}/endpoints/sip/{sip_id}`
-   `POST /registers/sip {"auth_username": "wazo-trunk", "auth_password": "pass", "transport": "udp", "remote_host": <Wazo B IP address or hostname>}`
-   `PUT /trunks/{trunk_id}/registers/sip/{sip_id}`

On both Wazo, activate some codecs:

-   `PUT /asterisk/sip/general {..., "allow": "gsm", ...}`

At that point, the Asterisk command `sip show registry` on Wazo B should
print a line showing that Wazo A is registered, meaning your trunk is
established.

Set the outgoing calls
----------------------

The outgoing calls configuration will allow Wazo to know which
extensions will be called through the trunk.

On the call emitting server(s), add outgoing call.

-   `POST /outcalls`
-   `PUT /outcalls/{outcall_id}/trunks`
-   `POST /extensions {"exten": "_**99.", "context": "to-extern"}`
-   `PUT /outcalls/{outcall_id}/extensions/{extension_id} {"strip_digits": 4}`

This will tell Wazo: if any extension begins with `**99`, then try to
dial it on the trunk `wazo-trunk`, after removing the 4 first characters
(the `**99` prefix).

The most useful special characters to match extensions are:

    _ (underscore): tells Asterisk that this is a pattern
    . (period): will match one or more characters
    X: will match only one character

You can find more details about pattern matching in Asterisk (hence in
Wazo) on [the Asterisk
wiki](https://wiki.asterisk.org/wiki/display/AST/Pattern+Matching).

Set the incoming calls
----------------------

Now that we have calls going out from a Wazo, we need to route incoming
calls on the Wazo destination.

::: {.note}
::: {.admonition-title}
Note
:::

This step is only necessary if the trunk is linked to an Incoming calls
context.
:::

To route an incoming call to the right destination in the right context,
we will create an incoming call

-   `POST /extensions {"exten": "101", "context": "from-extern"}`
-   `POST /incalls {"destination": {"type": "user", "user_id": <someone_id>}}`
-   `PUT /incalls/{incall_id}/extensions/{extension_id}`

This will tell Wazo: if you receive an incoming call to the extension
`101` in the context `from-extern`, then route it to the user
`someone_id`. The destination context will be found automatically,
depending on the context of the line of the given user.

So, with the outgoing call set earlier on Wazo A, and with the incoming
call above set on Wazo B, a user on Wazo A will dial `**99101`, and the
user `someone_id` will ring on Wazo B.
