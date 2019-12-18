# [rtpe-config](https://github.com/wazo-platform/wazo-rtpe-config)

This is the Media proxy component of the Wazo Platform C4 (Class 4).

## Features of the Media Proxy

Our C4 should support all inbound and outbound media flows in the network infrastructure. The media handling falls in these three categories:

* Transcoding
* Broadcasting
* Recording
* High availability

The SDP protocol ensures the negotiation of codecs.

The Wazo Media Proxy is based on SipWise RTPEngine.

### High availability

The Router component must be resilient to errors and outages. The Wazo Media Proxy provides Redis-based synchronization of the dialogs to offer High Availability and avoid media stream loss in case of interruptions of a single instance.

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