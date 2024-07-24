---
sidebar_position: 1
id: wazo-webhookd
title: Overview
description: wazo-webhookd overview
slug: /wazo-webhookd
---

[wazo-webhookd](https://github.com/wazo-platform/wazo-webhookd) connects to Wazo Platform event bus to push custom HTTP hooks to external
system.

It manages the list of webhooks and triggers them when an event occurs.

Configurable via REST API.

## Schema

```mermaid
graph TD
    subgraph Webhook_Application
        direction TB
        webhookd["wazo-webhookd<br>Python<br>Webhook service"]
        db["Postgresql<br>C<br>Database"]
        bus["RabbitMQ<br>Erlang<br>Messaging Bus"]
        auth["wazo-auth<br>Python<br>Authentication service"]:::doc
    end

    external_webapp["HTTP Server<br>External Applications"]
    User["User"]

    User -->|Configures wanted events| webhookd
    webhookd -->|SQL| db
    bus -->|Receives Wazo platform events| webhookd
    webhookd -->|Authenticates| auth
    webhookd -->|Send Wazo platform events| external_webapp

    classDef doc fill:#f9f,stroke:#333,stroke-width:2px;
```

## Example

```mermaid
sequenceDiagram
    actor Alice
    actor Bob

    Alice ->> webhookd: Listen to 'user_voicemail_message_created'
    webhookd ->> auth: Validate token
    auth -->> webhookd: Token OK
    webhookd ->> Bus: Subscribe to 'user_voicemail_message_created'
    webhookd -->> Alice: OK

    Bob ->> Asterisk: Leave voicemail message
    Asterisk ->> Bus: AMI event 'MessageWaiting'
    Bus ->> "wazo-calld": parse 'MessageWaiting'
    "wazo-calld" ->> Bus: Send event 'user_voicemail_message_created'
    Bus ->> webhookd: Publish event 'user_voicemail_message_created'
    webhookd ->> "SMS Service\n(external)": Make HTTP request
```

## API documentation

The REST API for wazo-webhookd is available [here](../api/webhook.html)

## See also

- [Dev notes](webhook-core.html)
