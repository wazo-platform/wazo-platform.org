---
sidebar_position: 1
id: intro
title: Introduction
description: Introducing Wazo Platform
slug: /intro
---

# Introduction

Wazo Platform allows developers to build solutions that fit any business and technical
requirements. Fully open source and based on open Source components, Wazo Platform aims to
provide all the building blocks to create a full-featured, carrier-grade, Programmable
Telecom Infrastructure.

Wazo Platform is an Open Source project allowing to <strong>build carrier grade programmable IP communication infrastructures</strong>.
You can pick and choose the components you need to build your infrastructures with class 5 features like
<strong>audio and video calls</strong>, chat, call centers, conferences, voicemail, etc.

From our APIs, <strong>integrate any kind of integration</strong> with the platform.
Wazo could integrate with your own billing capabilities or any value-added services
like Speech to Text, A.I. or sentiment analysis.

<strong>Deployable and scalable</strong> on bare metal, virtual machines or containers.

Wazo Platform is defined by 4 layers:

- <strong>Application layer</strong>: SDK to build mobile and web apps
  - Repository: [wazo-js-sdk](https://github.com/wazo-platform/wazo-js-sdk)
- <strong>Business layer</strong>: REST API to manage users, phones, call centers, load balancing, billing...
  - Services: [wazo-calld](./wazo-calld), [wazo-confd](./wazo-confd), [wazo-agentd](./wazo-agentd)
- <strong>Engine layer</strong>: internal services for core functionalities (audio/video, provisioning...)
  - Services: [wazo-confd](./wazo-confd), [wazo-amid](./wazo-amid), [wazo-provd](./wazo-provd), asterisk, kamailio, rtpengine
- <strong>Technical layer</strong>: internal services for the Operating System, HTTP, internal messaging, database...

  - Services and Debian: [wazo-auth](./wazo-auth), [wazo-webhookd](./wazo-webhookd), [wazo-websocketd](./wazo-websocketd), nginx, rabbitmq, postgresql

<br/>
![Technical layers](../static/images/docs/Technical_Layers_2019_V3.png)

## License

You may copy, distribute and modify the software as long as you track changes/dates in source files.
Any modifications to our software including (via compiler) GPL-licensed code must also be made available under the GPL along with build & install instructions.

More details at [tldrlegal.com](<https://tldrlegal.com/license/gnu-general-public-license-v3-(gpl-3)>)
