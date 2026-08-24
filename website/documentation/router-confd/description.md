# [router-confd](https://github.com/wazo-platform/wazo-router-confd)

This is the configuration, management, and routing API server of the Wazo Platform C4 (Class 4).

* Carrier and Carrier Trunks
* CDR
* DIDs
* Domains
* IPBX
* Normalization profiles and rules
* Routing groups and rules
* Tenants

It exposes the end-points used by the Wazo Router as well.

## Schema

```mermaid
C4Container
    Container(rtpengine, "Media Proxy", "RTPEngine", "Media Proxy, based on RTPEngine")

    System_Boundary(users, "Users") {
        Person(carrier, "Carrier Trunk", "Routes inbound traffic to and terminates outbound traffic from the C5 infrastructure.")
        Person(ipbx, "IPBX", "CLASS 5 infrastructure, one or multiple PBX running CLASS 5 services.")
        Person(subscriber, "Subscriber", "Generic SIP account of the platform using the CLASS 5 services.")
    }

    System_Boundary(class4, "CLASS 4") {
        Container(sbc, "SBC", "Kamailio", "Session Board Controller, protects the C4 infrastructure from abuses, attacks and overloads.")
        Container(router, "Router", "Kamailio", "Dynamically routes the traffic based on configuration rules and settings.")
        Container(router_confd, "Router confd API", "FastAPI", "Router Configuration API, exposes a REST webservice.")
        Container(redis, "Redis Cache", "Redis", "Redis Cache for C4 components.")
        Container(postgresql, "Database", "PostgreSQL", "Relational database for C4 components.")
    }

    Rel(carrier, sbc, "SIP")
    Rel(ipbx, sbc, "SIP")
    Rel(subscriber, sbc, "SIP")
    Rel(carrier, rtpengine, "MEDIA")
    Rel(ipbx, rtpengine, "MEDIA")
    Rel(subscriber, rtpengine, "MEDIA")

    Rel(sbc, router, "SIP")
    Rel(router, router_confd, "REST")
    Rel(router_confd, postgresql, "SQL")
    Rel(router, rtpengine, "RTPEngine")

    Rel(sbc, redis, "REDIS")
    Rel(router, redis, "REDIS")
    Rel(router_confd, redis, "REDIS")
```

## Part of the Wazo Platform C4

A Class 4 Softswitch routes large volumes of usually long-distance VoIP calls. For businesses that want to interconnect their VoIP servers, a Class 4 Softswitch is used to relay VoIP traffic and services over multiple IP networks. C4 soft switches provide intelligent call routing, which reduces congestion, latency, and costs while improving the quality of VoIP calls. They have several security features to protect the C5 switches.

The main characteristics of a C4 Softswitch are:

* route large volume of calls
* protocol support and conversion
* transcoding
* billing interface
* security management
* call authentication
* call authorization

Wazo Platform aims to offer to service providers, enterprises, and digital natives a coherent and complete reference platform for the design, deployment, and management of a telecom infrastructure that can support massive volumes of simultaneous calls by interconnecting millions of users.

The solution must be able to handle mission-critical needs by providing robust and efficient mechanisms for availability and scalability.

## API documentation

The REST API for wazo-router-confd is available [here](../api/router-confd.html)

## Related

* [wazo-c4-sbc](c4-sbc.html)
* [wazo-c4-router](c4-router.html)
* [wazo-rtpe](rtpe-config.html)
