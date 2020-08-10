Title: Wazo Platform 20.11 Released
Date: 2020-08-07
Author: The Wazo Authors
Category: Wazo Platform
Tags: wazo-platform, development
Slug: release-review-2011
Status: published

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 20.11 release.

## New features in this release

* **Agents**: Until Wazo Platform 20.11, agents were automatically logged in on their main line. In Wazo Platform 20.11, an agent may now choose on which of her lines will ring when receiving a call distributed from a queue.

* **CTI**: Wazo Platform offers API to control a physical phone. Until 20.11, Wazo Platform could mute or hangup a call on a physical phone. There is now a new API to put a physical phone call on hold. This feature is currently only available for Yealink phones.

* **DND**: Wazo Platform 20.11 API offers a new presence information: whether a user is on DND mode or not. This information can be changed either from a Wazo Platform API or from a physical phone.

## Technical features

* **Asterisk**: Asterisk was upgraded to 17.6.0. See the [Asterisk release announcement](https://www.asterisk.org/downloads/asterisk-news/asterisk-1760-now-available ).

## Ongoing features

* **SIP lines and trunks**: We are currently rewriting the SIP configuration API to match PJSIP options and be multi-tenant.


For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

## Resources

* [Install Wazo Platform](/install)

* [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the [breaking changes](/uc-doc/upgrade/upgrade_notes#20-11)

Sources:

* [Upgrade notes](/uc-doc/upgrade/upgrade_notes#20-11)

* [Wazo Platform 20.11 Changelog](https://wazo-dev.atlassian.net/secure/ReleaseNote.jspa?projectId=10011&version=10117)

## Discussion

Comments or questions in [this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-20-11-released).
