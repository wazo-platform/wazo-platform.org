# [c4-router](https://github.com/wazo-platform/wazo-c4-router)

This is the SIP router component of the Wazo Platform C4 (Class 4).

## Features of the SIP Router

* Authentication
* Routing

### Authentication

The SIP router performs authentication, both for Carrier Trunks and for IPBX, to ensure only authorized calls are successfully routed to the destination.
We support the following authentication methods:

* Source IP and port
* SIP Username/Password

### Routing

Class 4 equipments are located at the periphery of the network; it is necessary to implement routing mechanisms sometimes simple, sometimes sophisticated. The mechanism will depend on the desired services and may be different depending on the targets. Wazo C4 Router supports both inbound and outbound routing based on routing rules:

* Authentication details
* Source IP and port
* Destination DID
* Destination Domain

### High availability

The Router component is a crucial component for all the calls; it must be resilient to errors and outages. The Wazo Router provides Redis-based synchronization of the dialogs to offer High Availability and horizontal scaling.

## Part of the Wazo Platform C4

A Class 4 Softswitch routes large volumes of usually long-distance VoIP calls. For businesses that want to interconnect their VoIP servers, a Class 4 Softswitch is used to relay VoIP traffic and services over multiple IP networks. C4 soft switches provide intelligent call routing, which reduces congestion, latency, and costs while improving the quality of VoIP calls. They have several security features to protect the C5 switches.

The main characteristics of a C4 Softswitch are:

* route large volume of calls
* protocol support and conversion
* transcoding
* billing interface
* security management
* call authentication

Wazo Platform aims to offer to service providers, enterprises, and digital natives a coherent and complete reference platform for the design, deployment, and management of a telecom infrastructure that can support massive volumes of simultaneous calls by interconnecting millions of users.

The solution must be able to handle mission-critical needs by providing robust and efficient mechanisms for availability and scalability.