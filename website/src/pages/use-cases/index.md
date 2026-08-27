---
title: Use Cases
description: Communication use cases you can build with Wazo Platform
---

# Meet Wazo Platform

Wazo Platform is an Open Source project allowing to build carrier grade programmable IP
communication infrastructures. You can pick and choose the components you need to build your
infrastructures with **class 5 features**.

Our platform allows to setup multiple communication use cases. Find bellow the documentation of
some examples of use cases. You can of course use your own set of services to build your own use
case.

## Use Cases

### Unified Communication

Audio calls, video calls, chat, call centers, conferences, voicemail and more.

- [Install Procedure](/uc-doc/installation)
- [Documentation](/uc-doc/)

### Programmable Contact Center

Queues, agents, skill-based routing and the reporting behind them, all configurable over the REST
API — so the routing decisions can live in your own application instead of a static dialplan.

- [Contact center documentation](/uc-doc/contact_center)
- [Skill-based routing](/uc-doc/contact_center/skillbasedrouting)
- [Agent API](/documentation/api/agent) and [CDR API](/documentation/api/cdr)

### AI-Assisted Voice Applications

Wazo Platform ships no speech or language model of its own — what it gives you is the call control
and event plumbing to plug one in. Calls are handed to your application through `wazo-calld`,
platform events stream over `wazo-websocketd`, and `wazo-webhookd` delivers them to your own
services. That is enough to build live transcription, a voice assistant in front of an IVR, or
call summaries generated from the CDR after hangup.

- [Application API](/documentation/api/application) for call control
- [Websocket events](/uc-doc/api_sdk/websocket) and the [message bus](/uc-doc/api_sdk/message_bus)
- [Webhooks](/documentation/api/webhook) to reach an external service
- [Dialplan subroutines](/uc-doc/api_sdk/subroutine) to hand a call to your own logic

### Embedded Communications

Put calling and messaging inside your own web or mobile product instead of shipping a separate
softphone: authenticate against `wazo-auth`, drive calls with `wazo-calld`, and wake mobile
clients with push notifications.

- [Authenticate a user against the API](/docs/tutorials/authenticate-user-wazo-api)
- [Mobile push notifications](/uc-doc/api_sdk/mobile_push_notification)
- [Client SDKs and demo applications](/documentation)
