---
title: Simonics
---

## Simon Telephonics {#simon-telephonics}

- username: `GV18005551212`
- password: `password`
- exten: `18005551212`
- host: `gvgw.simonics.com`

### General SIP configuration {#general-sip-configuration}

- `PUT /asterisk/sip/general {..., "match_auth_username": "yes", ...}`

### Trunk settings {#trunk-settings}

- `POST /trunks {"context": "from-extern"}`
- `POST /endpoints/sip {"username": "GV18005551212", "secret": "password", "type": "friend", "host": "gvgw.simonics.com", options=[["qualify", "yes"], ["callerid", "18005551212"]]`
- `PUT /trunks/{trunk_id}/endpoints/sip/{sip_id}`
- `POST /registers/sip {"auth_username": "GV18005551212", "auth_password": "password", "transport": "udp", "remote_host": "GV18005551212", "callback_extension": "18005551212"}`
- `PUT /trunks/{trunk_id}/registers/sip/{sip_id}`

### Outgoing calls {#outgoing-calls}

See the
[Set the outgoing calls](/uc-doc/administration/interconnections/xivo_with_voip_provider#voip-provider-outcall)
section.

### Incoming calls {#incoming-calls}

See the
[Set the incoming calls](/uc-doc/administration/interconnections/xivo_with_voip_provider#voip-provider-incall)
section.
