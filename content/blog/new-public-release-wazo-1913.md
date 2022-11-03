---
title: Introducing Wazo Platform 19.13
date: 2019-09-20
author: The Wazo Authors
category: Wazo Platform
tags: wazo-platform, development
slug: wazo-platform-1913
status: published
---

Hello Wazo community!

We are excited to release today the latest version of Wazo Platform!

Wazo Platform is an Open Source project allowing to build carrier grade programmable IP communication infrastructures. You can pick and choose the components you need to build your infrastructures.

It is designed so as to let you choose the components you need to build your infrastructures with:
- Class 5 features such as audio and video calls, chat, call centers, conferences, voicemail, etc.,
- Class 4 features like security, routing, load balancing, etc.

You can augment the platform and integrate it with your subscription and billing capabilities or any value-added services like Speech to Text, A.I. or sentiment analysis.

These communication infrastructures can be deployed and scaled on bare metal, virtual machines or containers.


## What's the future of Wazo?

Wazo’s vision is that no single communication system can address appropriately the vast diversity of the communication needs of organizations, either for team collaboration or for customer engagement.

Our mission is to provide the world with a communication platform on which organizations can freely design and build the communication systems that they need to fit with their process requirements.

Our commitment to open source software is the most convenient lever to have the greatest impact and put the platform in the hands of the largest number of organizations.

In this perspective, we have decided to share the needed building blocks to build tailored communication solutions. These building blocks can be assembled, improved and packaged to create as many diverse applications as you want.

Enter [Wazo Platform](/): an API engine that gives all the API toolbox needed to manage a unified communication system. This engine offers many interfaces based on Web technologies: REST API, WebRTC, Websockets and Webhooks.

## Where do I start building with Wazo Platform?

The complete documentation is available [here](/documentation) and there is an example of using the API in the [install documentation](/use-cases).
We certainly are looking forward to seeing what you will build!

## Wazo was Free Software. How about Wazo Platform?

We are and we will always remain deeply committed to Free Software. Therefore we want our code to stay publicly available as much as possible. It is for us a guarantee of quality and trust to be able to audit the software we are using. Our code is available at [Github](https://github.com/wazo-platform) and we always welcome contributions.

## Why did it take so long between the public releases of the Wazo 18.03 and the Wazo Platform 19.13?

Wazo 18.03 had a pseudo-multi-tenancy feature via the concept of Entities. However there were a lot of Wazo resources that were not tenant-aware. When we started adding multi-tenancy to more resources, we made breaking changes that introduced functional regressions in Wazo that we refused to release. Instead we went forward in multi-tenancy. Be certain that we don't consider this a good practice: we would have preferred the steady incremental way that we used before 18.03, releasing more public versions, each containing small changes. But we focused on the future of Wazo Platform and decided to take the needed time before another public release.

## What's next?

We are releasing Wazo Platform 19.13. The main changes from Wazo 18.03 are:

- A lot more [APIs are available](/documentation) to build web, mobile and desktop applications and third-party software integrations

- ISO images have been replaced with an [Ansible recipe](https://github.com/wazo-platform/wazo-ansible).

- Wazo Platform offers [multiple SDKs](/documentation#wazo-client-sdk) to build applications. There is no longer a built-in client like the Wazo Client.

- The administration web interface is optional and disabled by default (see below how to enable it)

- The administration web interface is fully multi-tenant

The full list of changes is available in [the upgrade notes](/uc-doc/upgrade/upgrade_notes).

We will continue releasing public versions of Wazo Platform every 3 weeks.

## Are there limitations to Wazo Platform 19.13?

Conference rooms that were available in Wazo 18.03 are unusable in Wazo Platform 19.13. A new system for conferencing (Asterisk confbridge module) is used but the previous conference rooms haven't been migrated yet. That will be the case in a future release.

## How do I enable the administration web interface?

You have to install the Wazo package `wazo-ui` with the following system commands:

```ShellSession
# apt update
# apt install wazo-ui
```

The interface will then be available at `https://<your-engine-ip>/`. Be sure to use HTTPS instead of HTTP!

## What if I have a question?

You can always reach us via [Mattermost](https://mm.wazo.community/wazo-platform/channels/town-square) or on the [forums](https://wazo-platform.discourse.group).

--
The Wazo team.
