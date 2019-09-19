Title: Introducting Wazo Platform 19.13
Date: 2019-09-19
Author: The Wazo Authors
Category: Wazo Platform
Tags: wazo-platform, development
Slug: wazo-platform-1913
Status: published

Hello Wazo community!

## What's the future of Wazo?

Communication channels are tools. Tools to build something together. But like many tools, they can be used in very different ways, depending on the people using them. Telephony alone has myriads of applications and many details change from one organization to another. Telephony tools thus require a lot of options to account for the many ways people want to interact with phones. The same complexity applies for other channels of communications. Unified communications aim at connecting multiple channels of communication and services together, raising the complexity to another level. Hence a unified communication solution that addresses the problems of an organization needs to be tailored to the processes of that organization.

At Wazo, we don't want to be the only ones building solutions for organizations. Because of the complexity of unified communication, we can't address all the different problems on our own. We like the open-source spirit of sharing tools to create ever better software. We want to enable other developers to create their own solutions. So we decided to share building blocks for unified communication. Those building blocks can be assembled, improved and packaged to create as many diverse applications as you want. This is what [Openstack](https://openstack.org) does with infrastructure and this is what we want for unified communication.

Enter [Wazo Platform](http://wazo-platform.org): an API engine that gives all the API toolbox needed to manage a unified communication system. This engine offers many interfaces based on Web technologies: REST API, WebRTC, Websockets and Webhooks.

## Where do I start building with Wazo Platform?

The complete documentation is [here](http://wazo-platform.org/documentation) and there is an example of using the API in the [install documentation](http://wazo-platform.org/install). We certainly are looking forward to see what you will build!

## Wazo was Free Software. How about Wazo Platform?

We are deeply committed to Free Software and we want our code to stay publicly available as much as possible. It is for us a guarantee of quality and trust to be able to audit the software we are using. Our code is available at [Github](https://github.com/wazo-platform) and we always welcome contributions.

## Why did you stop releasing public versions after Wazo 18.03?

Wazo 18.03 had a pseudo-multi-tenancy feature via the concept of Entities. However there were a lot of Wazo resources that were not tenant-aware. When we started adding multi-tenancy to more resources, we made breaking changes that introduced functional regressions in Wazo that we refused to release. Instead we went forward in multi-tenancy. Be certain that we don't consider this a good practice: we would have preferred the steady incremental way that we used before 18.03, releasing more public versions, each containing small changes. But we focused on the future of Wazo Platform and decided to wait some time before another public release.

## What's next?

We are releasing Wazo Platform 19.13. The main changes from Wazo 18.03 are:
    
- A lot more [APIs are available](http://wazo-platform.org/documentation) to build web, mobile and desktop applications and third-party software integrations
- ISO images have been replaced with an [Ansible recipe](https://github.com/wazo-platform/wazo-ansible).
- Wazo Platform offers [multiple SDKs](http://wazo-platform.org/documentation#wazo-client-sdk) to build applications. There is no longer a builtin client like the Wazo Client.
- The administration web interface is optional and disabled by default (see below how to enable it)
- The administration web interface is fully multi-tenant

The full list of changes is available in [the upgrade notes](http://documentation.wazo.community/en/latest/upgrade/upgrade_notes.html).

We will continue releasing public versions of Wazo Platform every 3 weeks.

## Are there limitations to Wazo Platform 19.13?

- Conference rooms available in Wazo 18.03 are unusable in Wazo Platform 19.13. A new system for conferencing (Asterisk confbridge module) is used but the previous conference rooms haven't been migrated yet. They will be in a future release.

## How do I enable the administration web interface?

You have to install the Wazo package `wazo-ui` with the following system commands:

```shell
apt update
apt install wazo-ui
```

The interface will then be available at `https://<your-engine-ip>/`. Be sure to use HTTPS instead of HTTP!

## What if I have a question?

You can always reach us via [Mattermost](https://mm.wazo.community/wazo-platform/channels/town-square) or on the [forums](https://projects.wazo.community/projects/1/boards): 

--
The Wazo team.

