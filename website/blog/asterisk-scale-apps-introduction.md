---
title: Scaling Asterisk applications
date: 2020-01-13 14:00:00
author: Sylvain Baubeau and Sylvain Afchain
category: Wazo Platform
tags: [asterisk, applications, stasis, scalability]
slug: scale-asterisk-apps
status: published
---

# Scaling Asterisk applications

This article is the first one of a series about the work that we do at Wazo around Asterisk application scalability. For this first post, we will describe some high level aspects of the approach we take to scale Stasis applications. We will explain which components are involved and their role. Let’s take a simple application as an example.

# Our sample application

Our application will be a simple conference app : when a user calls the 8000 extension, he will be placed in a conference.
Typical call flow would be like :

- Call arrives on an Asterisk instance
- The App creates a bridge if it doesn’t exist already
- The App answers the call and place it in the bridge

The difficulty we have here is that we have to deal with multiple Asterisk instances as we want to distribute the load and not put all calls and bridges of the app on the same Asterisk node.

# High level overview

Let’s see how the applications and the different components interact :

![High level overview](../static/images/blog/scale-apps/scale-app-high-level-overview.png)

### Consul

- Will hold the list of the applications and their state
- Maintain the list of Asterisk instances

### RabbitMQ

Used for forwarding of stasis messages

### App

Our conference app, written in Python for demo purpose.

### API gateway

In order to route API calls to the appropriate Asterisk instance we need to introduce a new component. It will be in charge of :

- Register the app into Consul
- Handle the REST API app requests, acting a bit like an ARI proxy
- Keep track of the resources belonging to Asterisk instance, so that we can route the `Answer` request to the Asterisk that actually received the call.

### Asterisk cluster

A set of Asterisk instances. Each Asterisk instance will:

- Registers at startup into a Service Discovery.
- Create the Stasis application, fetched from Consul.
- Forward Stasis messages through the AMQP bus

### Kamailio

Randomly dispatches the SIP calls to the Asterisk instances

# API gateway deep dive

To create our app, we have to do more than redirecting requests to the right Asterisk instance : we need to have 2 users connected to 2 different Asterisk instances to be able to actually talk together. To do so, the API gateway will generate a call (using Originate) between the Asterisk instances and bridge them together.

A typical call flow for an application answering a call and then playing a sound would be like this

![Workflow](../static/images/blog/scale-apps/scale-app-conf-app-workflow.png)

A python code would be like following

```Python
import asyncio

from app_sdk import Application, Config

APP_ID = "conf"
APP_NAME = "conf"
BRIDGE_ID = "conf"


class BridgeApplication(Application):

    async def on_start(self, context):
        await self.get_or_create_bridge(context, BRIDGE_ID, "mixing")
        await self.answer(context)

    async def on_up(self, context):
        await self.bridge_add_channel(context, BRIDGE_ID)


def main():
    config = Config()
    app = BridgeApplication(config, APP_ID, APP_NAME)
    app.launch()


if __name__ == "__main__":
    main()
```

# Conclusion

As we will continue to improve the solution more features will be added to the API Gateway mainly to support complex workflow hiding the complexity of having to deal with multiple Asterisk instances. Stay tuned !

# Show me the code

All the work presented in the blog post is available in the following Git repositories:

- https://github.com/safchain/asterisk-scale-poc
  Holds the Python application, code for the API gateway and a Docker Compose template that will deploy all the POC components. Check the README to see how to test it.

- https://github.com/safchain/asyncio-ari-ast-id
  Asyncio ARI library supporting extra parameter in order to handle communication with the API Gateway

- https://github.com/lebauce/consul-c
  C library to talk with Consul API

- https://github.com/lebauce/asterisk-res-consul/tree/scale
  Asterisk module with primitives to handle connections to Consul

- https://github.com/lebauce/asterisk-res-consul-discovery/tree/scale
  Asterisk module to register Asterisk instances into Consul

- https://github.com/lebauce/asterisk-res-consul-stasis-app/tree/scale
  Asterisk module to create Stasis applications from applications registered in Consul

- https://github.com/wazo-platform/wazo-res-amqp/tree/scale
  Asterisk module for AMQP bus communication

- https://github.com/wazo-platform/wazo-res-stasis-amqp/tree/scale
  Asterisk module forwarding Stasis message through AMQP bus

# Discussion

Comments or questions in [this forum post](https://wazo-platform.discourse.group/t/blog-scaling-asterisk-applications/244).
