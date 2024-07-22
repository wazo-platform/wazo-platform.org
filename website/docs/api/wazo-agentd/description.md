---
sidebar_position: 1
id: wazo-agentd
title: Overview
description: wazo-agentd overview
slug: /wazo-agentd
---

[wazo-agentd](https://github.com/wazo-platform/wazo-agentd) is the service responsible of managing agent which are used to distribute calls received on queues in a call center use case.

It can do the following actions:

- log in
- log out
- pause
- resume

## Schema

```mermaid
flowchart TB
    subgraph auth_system ["Agent"]
        direction TB
        agentd_app["wazo-agentd<br/>Python<br/>Agent service"]
        auth["wazo-auth<br/>Python<br/>Authentication service"]
        pgsql["PostgreSQL<br/>C<br/>Database"]
        bus["RabbitMQ<br/>Erlang<br/>Message bus"]
        agid["wazo-agid<br/>Python<br/>AGI service"]
        asterisk["Asterisk<br/>C<br/>Media server"]
    end

    user["User"]
    phone["Phone"]

    user -- REST --> agentd_app
    phone -- SIP/SCCP --> asterisk

    phone -- " " --> agid
    user -- " " --> phone

    agentd_app -- REST --> auth
    agentd_app -- SQL --> pgsql
    agentd_app -- AMQP --> bus

    agid -- REST --> agentd_app

    asterisk -- AGI --> agid
    agentd_app -- AMI --> asterisk

```

## Example

```mermaid
sequenceDiagram
    participant phone
    participant asterisk
    participant agid
    participant agentd
    participant auth
    participant db

    phone ->> asterisk: ~*311001
    asterisk ->> agid: agent login 1001
    agid ->> agentd: token, login 1001
    agentd ->> auth: authorize token?
    auth -->> agentd: ok
    agentd ->> db: login 1001
    agentd -->> asterisk: add queue member
```

## API documentation

The REST API for wazo-agentd is available [here](../api/agent.html)

## Related

- [wazo-auth](authentication.html)

## See also

- [Dev notes](agent-core.html)
