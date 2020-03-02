-   [Simon Telephonics](#simon-telephonics)
    -   [General SIP configuration](#general-sip-configuration)
    -   [Trunk settings](#trunk-settings)
    -   [Outgoing calls](#outgoing-calls)
    -   [Incoming calls](#incoming-calls)

::: {.index}
interconnections/simonics
:::

Simon Telephonics
=================

The following configuration is based on the example found
[here](http://support.simonics.com/support/solutions/articles/3000033840-asterisk-sip-conf)

-   username: `GV18005551212`
-   password: `password`
-   exten: `18005551212`
-   host: `gvgw.simonics.com`

General SIP configuration
-------------------------

-   `PUT /asterisk/sip/general {..., "match_auth_username": "yes", ...}`

Trunk settings
--------------

-   `POST /trunks {"context": "from-extern"}`
-   `POST /endpoints/sip {"username": "GV18005551212", "secret": "password", "type": "friend", "host": "gvgw.simonics.com", options=[["qualify", "yes"], ["callerid", "18005551212"]]`
-   `PUT /trunks/{trunk_id}/endpoints/sip/{sip_id}`
-   `POST /registers/sip {"auth_username": "GV18005551212", "auth_password": "password", "transport": "udp", "remote_host": "GV18005551212", "callback_extension": "18005551212"}`
-   `PUT /trunks/{trunk_id}/registers/sip/{sip_id}`

Outgoing calls
--------------

See the `voip_provider_outcall`{.interpreted-text role="ref"} section.

Incoming calls
--------------

See the `voip_provider_incall`{.interpreted-text role="ref"} section.
