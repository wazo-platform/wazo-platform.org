---
sidebar_position: 1
id: wazo-call-logd
title: Overview
description: wazo-call-logd overview
slug: /wazo-call-logd
---

[wazo-call-logd](https://github.com/wazo-platform/wazo-call-logd) collects metadata on calls made on a Wazo Platform, allowing users to see their calls history.

This is service accessible via REST API.

## Schema

```mermaid
graph TD
    subgraph Call-logd application
        call_logd["wazo-call-logd<br>Python<br>Call-log service"]
        db["Postgresql<br>C<br>Database"]
        bus["RabbitMQ<br>Erlang<br>Messaging Bus"]
        auth["wazo-auth<br>Python<br>Authentication service"]:::authLink
    end

    classDef authLink fill:#fff,stroke:#333,stroke-width:2px;
    class auth authLink

    actor[User]
    amid["wazo-amid<br>Python"]
    asterisk["Asterisk<br>C<br>Back2Back Agent"]

    amid -->|Push events<br>AMQP| bus
    amid -.-> asterisk
    asterisk -->|Push raw call logs<br>SQL| db
    call_logd -->|Push and Fetch call-log<br>SQL| db
    call_logd -->|Publishes and Receives internal events<br>AMQP| bus
    call_logd -->|Authenticates<br>REST| auth
    actor -->|Retrieves call history<br>REST| call_logd
```

## Usage example

```mermaid
sequenceDiagram
    actor Alice
    Alice ->> Asterisk: Hangup Call
    Asterisk ->> postgres: Store Channel Events Logging (CELs)
    Asterisk ->> amid: Push event: LINKEDID_END
    amid ->> bus: Publish event: LINKEDID_END internally
    bus ->> call_logd: Received event: LINKEDID_END
    call_logd ->> postgres: Retrieve all CELs linked with LINKEDID_END through the CELID
    call_logd ->> call_logd: Transforms CELs in Call Log
    call_logd ->> postgres: Store Call Log
    call_logd ->> bus: Publish call_logs_created event with the new Call Log
    bus ->> websocketd: Transfer call_logs_created event
    websocketd ->> Alice: Receive call_logs_created event

```

## API documentation

The REST API for wazo-call-logd is available [here](../api/cdr.html)

## Related

- [wazo-auth](https://github.com/wazo-platform/wazo-auth)

## See also

- [Admin notes](cdr-admin.html)

```

```
