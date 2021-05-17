Title: Wazo Platform 20.12 Released
Date: 2020-08-31
Author: The Wazo Authors
Category: Wazo Platform
Tags: wazo-platform, development
Slug: release-review-2012
Status: published

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 20.12 release.

## New features in this release

* **Conferences**: until Wazo Platform 20.12, the only way to create conferences was to ask users to dial a specific extension pointing to a conference room. It is now possible to merge two or more existing calls together to create what we call an adhoc conference.

* **CTI**: Wazo Platform offers an API to control physical phones. Until 20.12, Wazo Platform could mute, hangup or hold a call on a physical phone. There is now a new API to answer a physical phone call. This feature is currently only available for Yealink phones.

## Bug fixes

* **Outcalls**: if a user had set a custom music-on-hold on their account, the default system music-on-hold was being played anyway when the user placed an outcall on hold. Now it is the correct one that is used.

## Ongoing features

* **SIP lines and trunks**: We are currently rewriting the SIP configuration API to match PJSIP options and be multi-tenant.


For more details about the aforementioned topics, please see the changelog linked below.

See you at the next sprint review!

## Resources

* [Install Wazo Platform](/install)

* [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the [breaking changes](/uc-doc/upgrade/upgrade_notes#20-12)

Sources:

* [Upgrade notes](/uc-doc/upgrade/upgrade_notes#20-12)

* [Wazo Platform 20.12 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D20.12)

## Discussion

Comments or questions in [this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-20-12-released).
