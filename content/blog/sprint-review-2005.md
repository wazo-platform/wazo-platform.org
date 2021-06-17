Title: Wazo Platform 20.05 Released
Date: 2020-04-08
Author: The Wazo Authors
Category: Wazo Platform
Tags: wazo-platform, development
Slug: release-review-2005
Status: published

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 20.05 release.

## New features in this release

* **Phones**: The DECT phone Yealink W80B can now be auto-provisioned with Wazo.
* **Mobile applications**: Wazo Platform 20.05 now accepts a new kind of token for Apple Push Notification service (APNs): it allows receiving chat and voicemail notifications on a mobile application. In previous versions, it was only possible to receive VoIP notifications from APNs.
* **Conferences**: Wazo Platform 20.05 offers new events for applications: they are notified when a conference participant starts or stops talking.
* **Users**: The bulk creation of users has been improved to be able to assign WebRTC lines to new users.
* **SIP transports**: SIP transports can now be configured using an API to leverage all possible fields of the Asterisk configuration.

## Bug fixes

* **Directories**: Directory lookup in Office365 now return more than 10 results.

## Technical features

* **Documentation**: The Wazo Platform documentation has moved from http://documentation.wazo.community to /uc-doc. Links to the former documentations should redirect you to the latter documentation automatically.
* **Asterisk**: Asterisk was upgraded from 16.8.0 to 17.3.0.
* **Performance**: We are in the process of removing SSL between services running on the same host, using plain HTTP instead.

## Ongoing features

* **SIP lines and trunks**: We are currently rewriting the SIP configuration API to match PJSIP options and be multi-tenant
* **Phones**: We are working on synchronizing the DND status of phones with the DND status of Wazo, to avoid having two kinds of DND, one on the phone and another in Wazo applications.


For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

## Resources

* [Install Wazo Platform](/uc-doc/installation/install-system)
* [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the [breaking changes](/uc-doc/upgrade/upgrade_notes#20.05)

Sources:

* [Upgrade notes](/uc-doc/upgrade/upgrade_notes#20.05)
* [Wazo Platform 20.05 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D20.05)

## Discussion

Comments or questions in [this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-20-05-released).
