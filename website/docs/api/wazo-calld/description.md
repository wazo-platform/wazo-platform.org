---
sidebar_position: 1
id: wazo-calld
title: Overview
description: wazo-calld overview
slug: /wazo-calld
---

[wazo-calld](https://github.com/wazo-platform/wazo-calld) is the call control service for the Wazo platform.

It manages the following resources:

- applications
- calls
- fax
- relocates
- switchboards
- transfers
- voicemails

## API documentation

The REST API for wazo-calld is available [here](../api/application.html#tag/applications).

The bus events are defined [here](https://github.com/wazo-platform/wazo-calld/blob/master/wazo_calld/plugins/calls/events.yml) and [here](https://github.com/wazo-platform/wazo-calld/blob/master/wazo_calld/plugins/switchboards/events.yml).

## Schema

```mermaid
graph TD
    subgraph Call_application ["Call application"]
        calld_app["wazo-calld<br>Python<br>Call application service"]
        asterisk["Asterisk<br>C<br>Media server"]
        auth["wazo-auth<br>Python<br>Authentication service"]:::authLink
        amid["wazo-amid<br>Python<br>AMI proxy service"]:::amidLink
        bus["RabbitMQ<br>Erlang<br>Message bus"]
        confd["wazo-confd<br>Python<br>Configuration service"]:::confdLink
    end

    classDef authLink fill:#fff,stroke:#333,stroke-width:2px;
    classDef amidLink fill:#fff,stroke:#333,stroke-width:2px;
    classDef confdLink fill:#fff,stroke:#333,stroke-width:2px;

    user["User"]
    phone["Phone"]

    user -->|uses| phone
    user -->|REST| calld_app

    calld_app -->|REST| auth
    calld_app -->|REST| amid

    amid -->|HTTP| asterisk
    amid -->|TCP| asterisk
    amid -->|AMQP| bus

    asterisk -->|SIP/SCCP| phone
    phone --> asterisk

    calld_app -->|AMQP| bus
    calld_app -->|REST| confd
    calld_app -->|REST| asterisk
```

## Example

```mermaid
sequenceDiagram
    participant Phone1000
    participant asterisk
    participant Phone1001
    participant User
    participant calld

    Phone1000 ->> asterisk: Call 1001
    asterisk ->> Phone1001: 1001
    Phone1001 -->> User: answers
    asterisk ->> calld: Event
    calld -->> User: Event
    User ->> calld: DELETE /calls/{call_id}
    calld ->> asterisk: Hangup
    asterisk -->> calld: OK
    asterisk ->> Phone1001: Bye
    calld -->> User: 204
```

## Related

- [wazo-amid](amid.html)
- [wazo-auth](authentication.html)
- [wazo-confd](configuration.html)

## See also

- [Dev notes](application-dev.html)
