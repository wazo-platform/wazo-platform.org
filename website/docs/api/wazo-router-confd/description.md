---
sidebar_position: 1
id: wazo-router-confd
title: Overview
description: wazo-router-confd overview
slug: /wazo-router-confd
---

[wazo-router-confd](https://github.com/wazo-platform/wazo-router-confd) is the configuration, management, and routing API server of the Wazo Platform C4 (Class 4).

- Carrier and Carrier Trunks
- CDR
- DIDs
- Domains
- IPBX
- Normalization profiles and rules
- Routing groups and rules
- Tenants

It exposes the end-points used by the Wazo Router as well.

## Schema

```mermaid
graph TD
    subgraph Users
        direction TB
        carrier["Carrier Trunk<br>Routes inbound traffic to and terminates outbound traffic from the C5 infrastructure."]
        ipbx["IPBX<br>CLASS 5 infrastructure, one or multiple PBX running CLASS 5 services."]
        subscriber["Subscriber<br>Generic SIP account of the platform using the CLASS 5 services."]
    end

    subgraph CLASS4
        direction TB
        sbc["SBC<br>Kamailio<br>Session Board Controller, protects the C4 infrastructure from abuses, attacks and overloads."]:::doc
        router["Router<br>Kamailio<br>Dynamically routes the traffic based on configuration rules and settings."]:::doc
        router_confd["Router confd API<br>FastAPI<br>Router Configuration API, exposes a REST webservice."]
        redis["Redis Cache<br>Redis<br>Redis Cache for C4 components."]
        postgresql["Database<br>PostgreSQL<br>Relational database for C4 components."]
    end

    rtpengine["Media Proxy<br>RTPEngine<br>Media Proxy, based on RTPEngine"]:::doc

    carrier -->|SIP| sbc
    ipbx -->|SIP| sbc
    subscriber -->|SIP| sbc

    sbc -->|SIP| router
    router -->|REST| router_confd
    router_confd -->|SQL| postgresql
    router -->|RTPEngine| rtpengine

    sbc -->|REDIS| redis
    router -->|REDIS| redis
    router_confd -->|REDIS| redis

    classDef doc fill:#f9f,stroke:#333,stroke-width:2px;
```

## Part of the Wazo Platform C4

A Class 4 Softswitch routes large volumes of usually long-distance VoIP calls. For businesses that want to interconnect their VoIP servers, a Class 4 Softswitch is used to relay VoIP traffic and services over multiple IP networks. C4 soft switches provide intelligent call routing, which reduces congestion, latency, and costs while improving the quality of VoIP calls. They have several security features to protect the C5 switches.

The main characteristics of a C4 Softswitch are:

- route large volume of calls
- protocol support and conversion
- transcoding
- billing interface
- security management
- call authentication
- call authorization

Wazo Platform aims to offer to service providers, enterprises, and digital natives a coherent and complete reference platform for the design, deployment, and management of a telecom infrastructure that can support massive volumes of simultaneous calls by interconnecting millions of users.

The solution must be able to handle mission-critical needs by providing robust and efficient mechanisms for availability and scalability.

## API documentation

The REST API for wazo-router-confd is available [here](../api/router-confd.html)

## Related

- [wazo-c4-sbc](c4-sbc.html)
- [wazo-c4-router](c4-router.html)
- [wazo-rtpe](rtpe-config.html)
