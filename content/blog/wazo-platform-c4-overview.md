# Wazo C4 platform overview

## Introduction
The Wazo platform was thought as an IPBX programmable solution, built around the famous open source Asterisk framework. To fulfill our vision to bring a complete open source solution, cloud ready for the telecommunication world we knew that the class 4 routing and sbc were needed to scale, secure and load balance the traffic to our IPBX solution. Keeping in mind our microservice architecture we also wanted to further strip down some of the Asterisk dependant functionalities and try to use different tools.


## What is a C4?
Basically a C4 softswitch routes traffic between C5 softswitches.
One of the many definitions you can find online will be something like this:
```A Class 4 Softswitch routes large volumes of usually long-distance VoIP calls. For businesses that want to interconnect their VoIP servers, a Class 4 Softswitch is used to relay VoIP traffic and services over multiple IP networks.```
So the main characteristics of a C4 softswitch for us are:
* route large volume of calls
* protocol support and conversion
* transcoding
* billing interface
* security management
* call authentication

C4 softswiches provide intelligent call routing, which reduces congestion, latency, and costs while improving the quality of VoIP calls. They have several security features to protect the C5 switches.


## What we wanted to achieve?
The main question the Wazo "C4 team" was faced was:
```How to Scale Wazo to Support 10,000 Users and 2,500 Simultaneous Calls?```
Beside performance and scaling We defined basically seven main features categories we should work on:
* Security
* NAT management
* Protocol translation
* Normalization
* SIP message routing
* Media management
* Administration and reporting

### Security
One of the key features for our users was to have an active protection against denial of service attacks, to limit the number of scanners and thus to guarantee enough resources to perform the basic tasks.

### NAT management
The use of private IPv4 addresses is an everyday reality for our users. The IPv6 deployment unfortunately is still, well, in deployment. So handling NAT is a must requirement for our C4 interfacing the public IP network.

### Protocol translation
VoIP is using different transport protocols and IP versioning. Being at the edge of the network the C4 must manage various transport protocols, decrypt the TLS flows and extract / encapsulate the SIP WebRTC flow.

### Normalization
The number of the caller and the called party entering the system should be in E.164 format without the leading “+” before processing in order to obtain reliable and stable operation whatever the customer’s country.

### Routing
Class 4 equipment is located at the periphery of the network, it is necessary to implement routing mechanisms sometimes simple, sometimes complex. The mechanism will depend on the desired services and may be different depending on the targets.

### Media management
Our C4 should support all inbound and outbound media flows in the network infrastructure. The media handling can be defined in this three categories:
* transcoding
* broadcasting
* recording
The negotiation of Codecs is ensured by the SDP protocol.

### Administration and Reporting
The C4 we are developing should be easily administrable and fit in our "programmable telecommunication platform" so the usage of API should be mandatory in order to include the C4 blocks in our existent administration interface or allow our users to handle the C4 with their interfaces.

Reporting is a key feature for us. Beside the usual system logs and CDRs we want to standardize the logs and be able to gain useful information and to analyze the reports with different tools for further advanced machine learning features for intelligent and preemptive actions.


## What have we done?
Up to November 2019 we created an API in Python called [wazo-router-confd](https://github.com/wazo-platform/wazo-router-confd) able to provide a Kamailio instance routing rules. We use a fairly simple kamailio configuration file available at the repository [wazo-kamailio-config](https://github.com/wazo-platform/wazo-kamailio-config) using the Kamailio [rtjson module](https://www.kamailio.org/docs/modules/devel/modules/rtjson.html).
We now handle DID, domain and outbound routing. Also we are using external [RTPengine](https://github.com/sipwise/rtpengine) for media handling with configuration available at our repository [wazo-rtpe-config](https://github.com/wazo-platform/wazo-rtpe-config). We also provide security functionalities such as denial of service attacks and scanner blocking. We handle normalization and SIP authentication.
We created a testing tool for our infrastructure called [wazo-tester](https://github.com/wazo-platform/wazo-tester) written in Python 
able to setup the Wazo environment, perform testing or stress testing with parallel sipp workers and custom scenarios.
Our `wazo-kamailio-config` repo uses `wazo-tester` for testing the correct routing and behavior of our C4.


## What still needs to be done?
We have a long way to go from here. As said this is a first working instance of our C4 for the Wazo platform. Our next steps will be regarding HA and service auto discovery. We're focused on delivering a cloud ready solution with all the bells and whistles in the next months. Also we are working hard with our partners to go in production and gather more feedback from real word scenarios and user needs.