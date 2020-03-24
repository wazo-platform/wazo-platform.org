---
title: Interconnect a Wazo to a VoIP provider
---

When you want to send and receive calls to the global telephony network,
one option is to subscribe to a VoIP provider. To receive calls, your
Wazo needs to tell your provider that it is ready and to which IP the
calls must be sent. To send calls, your Wazo needs to authenticate
itself, so that the provider knows that your Wazo is authorized to send
calls and whose account must be credited with the call fare.

The steps to configure the interconnections are:

-   Establish the trunk between the two Wazo, that is the SIP connection
    between the two servers
-   Configure outgoing calls on the server(s) used to emit calls
-   Configure incoming calls on the server(s) used to receive calls

Establish the trunk
-------------------

You need the following information from your provider:

-   a username
-   a password
-   the name of the provider VoIP server
-   a public phone number
-   `POST /trunks {"context": "from-extern"}` (or another incoming call
    context)
-   `POST /endpoints/sip {"username": <username>, "secret": <password>, "type": "peer", "host": "voip.provider.example.com"}`
-   `PUT /trunks/{trunk_id}/endpoints/sip/{sip_id}`
-   `POST /registers/sip {"auth_username": <username>, "auth_password": <password>, "transport": "udp", "remote_host": "voip.provider.example.com"}`
-   `PUT /trunks/{trunk_id}/registers/sip/{sip_id}`

If your Wazo is behind a NAT device or a firewall, you should set the
following:

    * ``PUT /endpoints/sip {"options": [..., ["qualify", "yes"], ...]}``

This option will make Asterisk send a signal to the VoIP provider server
every 60 seconds (default settings), so that NATs and firewall know the
connection is still alive. If you want to change the value of this cycle
period, you have to select the appropriate value of the following
parameter:

    * ``PUT /endpoints/sip {"options": [..., ["qualifyfreq", <value>], ...]}``

At that point, the Asterisk command `sip show registry` should print a
line showing that you are registered, meaning your trunk is established.

<a name="voip_provider_outcall"></a>Set the outgoing calls
----------------------

The outgoing calls configuration will allow Wazo to know which
extensions will be called through the trunk.

-   `POST /outcalls`
-   `PUT /outcalls/{outcall_id}/trunks`
-   `POST /extensions {"exten": "418.", "context": "to-extern"}`
-   `PUT /outcalls/{outcall_id}/extensions/{extension_id}`

This will tell Wazo: if an internal user dials a number beginning with
`418`, then try to dial it on the trunk associated.

The most useful special characters to match extensions are:

    . (period): will match one or more characters
    X: will match only one character

You can find more details about pattern matching in Asterisk (hence in
Wazo) on [the Asterisk
wiki](https://wiki.asterisk.org/wiki/display/AST/Pattern+Matching).

<a name="voip_provider_incall"></a>Set the incoming calls
----------------------

Now that we have calls going out, we need to route incoming calls.

To route an incoming call to the right destination in the right context,
we will create an incoming call.

-   `POST /extensions {"exten": <public_phone_number>, "context": "from-extern"}`
-   `POST /incalls {"destination": {"type": "user", "user_id": <the_front_desk_guy_id>}}`
-   `PUT /incalls/{incall_id}/extensions/{extension_id}`

This will tell Wazo: if you receive an incoming call to the public phone
number in the context `from_extern`, then route it to the user
`the_front_desk_guy_id`. The destination context will be found
automatically, depending on the context of the line of the given user.
