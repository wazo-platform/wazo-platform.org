---
sidebar_position: 1
id: wazo-chatd
title: Overview
description: wazo-chatd overview
slug: /wazo-chatd
---

[wazo-chatd](https://github.com/wazo-platform/xivo-chatd) adds messaging functionality as well as devices and users presence for a Wazo Platform.

This is service accessible via REST API.

## Schema

```mermaid
graph TD
    subgraph chatd_application ["chatd application"]
        chatd["wazo-chatd<br>Python<br>Presentiel and Chat service"]
        db["Postgresql<br>C<br>Database"]
        bus["RabbitMQ<br>Erlang<br>Messaging Bus"]
        auth["wazo-auth<br>Python<br>Authentication service"]:::authLink
        amid["wazo-amid<br>Python"]:::amidLink
        confd["wazo-confd<br>Python"]:::confdLink
    end

    classDef authLink fill:#fff,stroke:#333,stroke-width:2px;
    classDef amidLink fill:#fff,stroke:#333,stroke-width:2px;
    classDef confdLink fill:#fff,stroke:#333,stroke-width:2px;

    actor["User"]

    chatd -->|Get phone status<br>REST| amid
    chatd -->|Get user list<br>REST| confd
    chatd -->|Get sessions<br>REST| auth
    actor -->|Retrieves presences<br>REST| chatd
    chatd -->|SQL| db
    chatd -->|Publishes and Receives internal events<br>AMQP| bus
    chatd -->|Authenticates<br>REST| auth
```

## Usage example

```mermaid
sequenceDiagram
    actor Alice
    participant asterisk
    participant amid
    participant bus
    participant chatd
    participant websocketd
    actor Bob

    Alice ->> asterisk: compose *10

    %% Internal events
    rect rgba(191, 223, 255, 0.1)
    asterisk ->> amid: Event DeviceStateChange<br/>name: PJSIP/alice<br/>state: ringing
    amid ->> bus: Event DeviceStateChange<br/>name: PJSIP/alice<br/>state: ringing
    bus ->> chatd: Event DeviceStateChange<br/>name: PJSIP/alice<br/>state: ringing
    end

    %% Wazo platform events
    rect rgba(255, 223, 191, 0.1)
    chatd ->> bus: Event Presence Alice
    bus ->> websocketd: Event Presence Alice
    websocketd ->> Bob: Event Presence Alice
    websocketd ->> Alice: Event Presence Alice
    end
```

```mermaid
sequenceDiagram
    participant Alice
    participant chatd
    participant bus
    participant websocketd
    participant Bob

    Alice ->> chatd: **Create a room**<br/>POST /users/me/rooms<br/>{users:[<uuid:bob>]}
    chatd -->> Alice: something
    Alice ->> chatd: **Create a message**<br/>POST /users/me/rooms/<uuid>/messages
    chatd ->> bus: **Publish message**<br/>as Wazo platform event
    bus ->> websocketd: **Relay message**
    websocketd ->> Bob: **Receive message**
```

## API documentation

The REST API for wazo-chatd is available [here](../api/chat.html)

## Related

- [wazo-amid](https://github.com/wazo-platform/wazo-amid)
- [wazo-confd](configuration.html)
