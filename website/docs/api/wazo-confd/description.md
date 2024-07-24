---
sidebar_position: 1
id: wazo-confd
title: Overview
description: wazo-confd overview
slug: /wazo-confd
---

[wazo-confd](https://github.com/wazo-platform/wazo-confd) configures and manages the PBX part of Wazo Platform.

- Agents
- Applications
- Asterisk configuration
- Call filters
- Call permissions
- Call pickups
- Conferences
- Configuration
- Contexts
- DHCP
- Devices
- Endpoints custom
- Endpoints iax
- Endpoints sccp
- Endpoints sip
- Extensions
- Function keys
- Groups
- High availability
- IVR
- Incoming calls
- Lines
- Music on hold
- Outgoing calls
- Pagings
- Parking lots
- Queues skills
- Queues
- Registers
- Sounds
- Switchboards
- Trunks
- Users
- Voicemails

## Schema

```mermaid
graph TD
    subgraph "Configuration application"
        direction TB
        confd["wazo-confd<br>Python<br>Configuration service"]
        db["Postgresql<br>C<br>Database"]
        bus["RabbitMQ<br>Erlang<br>Messaging Bus"]
        provd["wazo-provd<br>Python<br>Provisioning service"]
        sysconfd["wazo-sysconfd<br>Python<br>Operating system configuration service"]
        auth["wazo-auth<br>Python<br>Authentication service"]

        confd --> db["SQL"]
        confd --> bus["Received Wazo platform events<br>AMQP"]
        confd --> auth["Authenticates<br>REST"]
        confd --> provd["Configures devices<br>REST"]
        confd --> sysconfd["Runs Operating System commands<br>REST"]
    end

    User --> confd["uses<br>REST"]
```

## First example

```mermaid
sequenceDiagram
    actor Admin
    Admin ->> confd: edit extension
    confd ->> auth: Validate token
    auth -->> confd: allow
    confd ->> Bus: send message extension_edited
    confd ->> sysconfd: HTTP request to reload
    sysconfd ->> Asterisk: dialplan reload
    Asterisk ->> Filesystem: read config
    Filesystem -->> Asterisk: command
    Asterisk ->> confgend: execute command
    confd ->> DB: (no label)
    confgend ->> DB: retrieve extension
    DB -->> confgend: (no label)
    confgend -->> Asterisk: stream config
    confd -->> Admin: OK
```

## Second example: Create a user with a phone and a voicemail

Setup workflow, details to create resources as described afterward:

- First, associate a `line` to an `extension ;
- Then, associate an `user` to the `line` ;
- Then associate an `endpoint` with the `line` ;
- Then associate a `device` with the `line` ;
- Finally, associate `voicemail` to the `user`.

```mermaid
sequenceDiagram
    Alice ->> confd: Create Line<br/>POST /lines<br/>{"context": "ctx-<tenant slug>-internal-<uuid>"}
    confd -->> Alice: {"id": 11, ...}

    Alice ->> confd: Create an extension<br/>POST /extensions<br/>{"exten": "1234", "context": "ctx-<tenant slug>-internal-<uuid>"}
    confd -->> Alice: {"id": 22, ...}

    Alice ->> confd: Associate the line-extension<br/>PUT /lines/11/extensions/22
    confd -->> Alice: (no label)

    Alice ->> confd: Create a user<br/>POST /users<br/>{"firstname": "Alice"}
    confd -->> Alice: {"uuid": "44444444-...", ...}

    Alice ->> confd: Associate the user-line<br/>PUT /users/44444444-.../lines/11
    confd -->> Alice: (no label)

    Alice ->> confd: Create the SIP endpoint<br/>POST /endpoints/sip<br/>{}
    confd -->> Alice: {"id": 66, ...}

    Alice ->> confd: Associate the line-endpoint<br/>PUT /lines/11/endpoints/sip/66
    confd -->> Alice: (no label)

    Alice ->> confd: Get the device ID (autocreated by provd)<br/>GET /devices?search=88:88:88:88:88:88<br/>or GET /devices?search=192.168.88.
    confd -->> Alice: {"id": "888...", ...}

    Alice ->> confd: Associate the line-device<br/>PUT /lines/11/devices/8888
    confd -->> Alice: (no label)

    Alice ->> confd: Re-synchronize the device (optional):<br/>PUT /devices/8888/synchronize
    confd -->> Alice: (no label)

    Alice ->> confd: Create the voicemail<br/>POST /voicemails<br/>{"name": "Alice's voicemail", "number": "1234", "context": "ctx-<tenant slug>-internal-<uuid>"}
    confd -->> Alice: {"id": 1010, ...}

    Alice ->> confd: Associate the user-voicemail<br/>PUT /users/44444444-.../voicemails/1010
    confd -->> Alice: (no label)
```

## API documentation

The REST API for wazo-confd is available [here](../api/configuration.html)

## Related

- [wazo-auth](https://github.com/wazo-platform/wazo-auth)
- [wazo-confd-client](https://github.com/wazo-platform/wazo-confd-client)
- [wazo-provd](https://github.com/wazo-platform/wazo-provd)
- [wazo-sysconfd](https://github.com/wazo-platform/wazo-sysconfd)

## See also

- [Internal concepts](/uc-doc/system/wazo-confd/developer)
- [Tools](https://github.com/wazo-platform/wazo-confd/blob/master/README.md)
