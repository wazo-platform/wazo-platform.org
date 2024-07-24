---
sidebar_position: 1
id: wazo-amid
title: Overview
description: wazo-amid overview
slug: /wazo-amid
---

[wazo-amid](https://github.com/wazo-platform/wazo-amid) is a daemon for interacting with [Asterisk's AMI](https://docs.asterisk.org/Configuration/Interfaces/Asterisk-Manager-Interface-AMI) :

- forward AMI events to RabbitMQ ;
- expose HTTP JSON interface for AMI actions.

Once a user is authenticated against Wazo platform, he can query the `amid` service to receive `AMI` events from Asterisk and push `AMI` command to it.

The `amid` service also proxies the AMI event to our event bus.

## Schema

```mermaid
graph TD
    subgraph amid_application ["amid application"]
        amid["wazo-amid<br>Python<br>Asterisk proxy service"]
        asterisk["Asterisk<br>C<br>Back to Back User agent"]
        bus["RabbitMQ<br>Erlang<br>Messaging Bus"]
        auth["wazo-auth<br>Python<br>Authentication service"]:::authLink
    end

    classDef authLink fill:#fff,stroke:#333,stroke-width:2px;
    class auth authLink

    actor[User]
    User -->|REST| amid
    asterisk -->|Receives AMI events<br>AMI| amid
    amid -->|Sends AMI commands<br>AJAM| asterisk
    amid -->|Publishes Wazo platform events<br>AMQP| bus
    amid -->|Authenticates<br>REST| auth
```

## API documentation

The REST API for wazo-ami is available [here](../api/amid.html)

## Related

- [wazo-amid](https://github.com/wazo-platform/wazo-amid)
- [wazo-amid-client](https://github.com/wazo-platform/wazo-amid-client)
