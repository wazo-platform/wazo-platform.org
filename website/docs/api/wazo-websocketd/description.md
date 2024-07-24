---
sidebar_position: 1
id: wazo-websocketd
title: Overview
description: wazo-websocketd overview
slug: /wazo-websocketd
---

[wazo-websocketd](https://github.com/wazo-platform/wazo-websocketd) is a WebSocket server that delivers Wazo Platform related events to clients.

This makes it easier to build dynamic web applications that are using events from Wazo.

## Schema

```mermaid
graph TD
    subgraph Websocketd_Application
        direction TB
        websocketd["wazo-websocketd<br>Python<br>Websocketd service"]
        bus["RabbitMQ<br>Erlang<br>Messaging Bus"]
        auth["wazo-auth<br>Python<br>Authentication service"]:::doc
    end

    User["User"]

    User -->|Receives events| websocketd
    websocketd -->|Receives Wazo platform events| bus
    websocketd -->|Authenticates| auth

    classDef doc fill:#f9f,stroke:#333,stroke-width:2px;
```

## Usage example

```mermaid
sequenceDiagram
    participant User
    participant websocketd
    participant auth
    participant rabbitmq

    User ->> websocketd: Send token
    websocketd ->> auth: Validate token
    auth -->> websocketd: Send ACL list

    User ->> websocketd: Subscribe event
    User ->> websocketd: Subscribe event
    User ->> websocketd: Start events emission

    rabbitmq ->> websocketd: Receive event
    websocketd ->> websocketd: Check ACL and filter event
    websocketd ->> User: Send event
```

## See also

- [Dev notes](websocket-app.html)
