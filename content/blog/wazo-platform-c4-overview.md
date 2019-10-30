Title: Wazo Platform C4 overview
Date: 2019-10-28
Author: Aleksandar Sosic and Fabio Tranchitella
Category: Wazo C4
Tags: wazo
Slug: wazo-platform-c4-overview
Status: published

# Wazo Platform C4 overview

## Introduction

Wazo Platform allows you to build your own IP communication infrastructure and deliver innovative communication services. Fully open-source, API-centric, Cloud-native & multi-tenant, the project is designed around the famous open-source frameworks [Asterisk](https://www.asterisk.org/) & [Kamailio](https://www.kamailio.org/w/). 

If you want to know more about Wazo Platform, we encourage you to discover [Frédéric Lepied's presentation introduced at the Astricon 2019](https://www.slideshare.net/flepied/wazo-platform-astricon19).

To fulfill Wazo Platform's vision to bring a full-featured, open-source, cloud-native telecom solution for the communication industry, we knew that the C4 (Class 4) routing and SBC were essential for scaling, securing and load balancing the traffic to our B2BUA engines.

Keeping in mind our microservice architecture, we also wanted to further strip down some of the Asterisk dependant functionalities and try to use different tools.

## What is a C4?

Basically, a C4 softswitch routes traffic between C5 softswitches.
One of the many definitions you can find online will be something like this:
```A Class 4 Softswitch routes large volumes of usually long-distance VoIP calls. For businesses that want to interconnect their VoIP servers, a Class 4 Softswitch is used to relay VoIP traffic and services over multiple IP networks.```

So the main characteristics of a C4 softswitch are:

* route large volume of calls
* protocol support and conversion
* transcoding
* billing interface
* security management
* call authentication

C4 softswiches provide intelligent call routing, which reduces congestion, latency, and costs while improving the quality of VoIP calls. They have several security features to protect the C5 switches.

## What is the vision ?

Wazo Platform aims to offer to service providers, entreprises and digital natives a coherent and complete reference platform for the design, deployment and management of a telecom infrastructure that can support very large volumes of simultaneous calls by interconnecting millions of users.

The solution must be able to handle mission-critical needs by providing robust and efficient mechanisms for availability and scalability.



### Features

Besides performance and scaling, we defined seven main features categories we should work on:

* Security
* NAT management
* Protocol translation
* Normalization
* SIP message routing
* Media management
* Administration and reporting

#### Security

Fraud represents a serious threat to the telecommunication industry. It refers to the abuse of telecommunications services as VoIP is a prime target of attacks:

* significant gains and some impunity

* listening and diversion

* DDoS

One of the key features for our users was to have active protection on denial of service attacks, limit the number of scanners and consequently guarantee adequate resources to provide the basic services.


#### NAT management

The use of private IPv4 addresses is an everyday reality for our users. The IPv6 deployment, unfortunately, is still under deployment. For this reason handling NAT is a mandatory requirement for our C4 interfacing the public IP network.

#### Protocol translation

VoIP is using different transport protocols and IP versioning. Being at the edge of the network the C4 must manage various transport protocols, decrypt the TLS flows and extract/encapsulate the SIP and WebRTC streams.

#### Normalization

The number of the caller and the called party entering the system should be in E.164 format without the leading “+” before processing to obtain reliable and stable operation whatever the customer’s country.

#### Routing

Class 4 equipments are located at the periphery of the network, it is necessary to implement routing mechanisms sometimes simple, complex. The mechanism will depend on the desired services and may be different depending on the targets.

#### Media management

Our C4 should support all inbound and outbound media flows in the network infrastructure. The media handling falls in these three categories:

* transcoding
* broadcasting
* recording

 The SDP protocol ensures the negotiation of codecs.

#### Administration and Reporting

The C4 we are developing should be easily administrable and follow our "programmable telecommunication platform" manifesto so the provisioning of API is mandatory to include the C4 blocks in our existent administration interface or allow our users to handle the C4 with their interfaces.

Reporting is a key feature for us. Besides the usual system logs and CDRs, we want to standardize the logs and be able to gain useful information and to analyze the reports with different tools for further advanced machine learning features for intelligent and preemptive actions.

## Where do we stand?

We created an API in Python called [wazo-router-confd](https://github.com/wazo-platform/wazo-router-confd) able to provide a Kamailio instance routing rules, inbound and outbound authentication. We use a fairly simple Kamailio configuration file available at the repository [wazo-kamailio-config](https://github.com/wazo-platform/wazo-kamailio-config) using the Kamailio [rtjson module](https://www.kamailio.org/docs/modules/devel/modules/rtjson.html). We handle DID, domain and outbound routing. Also, we are using external [RTPengine](https://github.com/sipwise/rtpengine) for media handling with configuration available at our repository [wazo-rtpe-config](https://github.com/wazo-platform/wazo-rtpe-config).

We provide security functionalities such as SIP sanity checks, blocking the denial of service attacks and the SIP scanner. We handle normalization and SIP authentication.
We created a testing tool for our infrastructure called [wazo-tester](https://github.com/wazo-platform/wazo-tester) written in Python able to set up the Wazo environment, perform testing or stress testing with parallel sipp workers and custom scenarios.
Our `wazo-kamailio-config` repo uses `wazo-tester` for testing the correct routing and behavior of our C4.

## What still needs to be improved?

As said this is the first published components of our C4 for the Wazo Platform. Our next steps will be regarding HA and service auto-discovery. We're focused on delivering a cloud-native telecom solution with all the bells and whistles in the next months.

Keep it tune !
