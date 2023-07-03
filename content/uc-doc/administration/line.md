---
title: Lines
---


## Description

A line is used to assign a device and extension to a user.

In Asterisk, a "line" refers to a communication channel between Asterisk and an external device, such as a phone or a VoIP gateway. A line essentially represents a bidirectional connection that allows Asterisk to establish, manage, and control incoming and outgoing calls.

A line in Asterisk can be configured in different ways, depending on the type of external device it is connected to. Here are some examples of commonly used line types in Asterisk:

1. Analog Line (POTS): This is a traditional phone line connected to Asterisk through an analog card or an analog VoIP gateway. This line can be used to make and receive regular telephone calls.

2. SIP Line: SIP (Session Initiation Protocol) is a signaling protocol used to establish communication sessions over the internet. A SIP line in Asterisk is associated with a SIP account provided by a VoIP service provider or a remote PBX server, allowing Asterisk to make calls over the IP network.

3. ISDN Line: ISDN (Integrated Services Digital Network) is a digital telecommunications network. An ISDN line in Asterisk is used to connect to a digital phone network and supports advanced features such as caller ID and simultaneous calls.

4. E1/T1 Line: E1 (in Europe) and T1 (in North America) lines are digital interfaces used to carry voice and data signals. In Asterisk, these lines are often used to connect to VoIP gateways that interconnect traditional phone networks and IP networks.

It is important to properly configure the lines in Asterisk based on the type of external device and specific network settings to ensure proper call operation and telephony features.