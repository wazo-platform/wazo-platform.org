Title: Wazo Platform 20.06 Released
Date: 2020-04-27
Author: The Wazo Authors
Category: Wazo Platform
Tags: wazo-platform, development
Slug: release-review-2006
Status: published

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 20.06 release.

## New features in this release

* **Call logs**: The API for call logs now returns two destination names: the one that was dialed and the one that answered. This is useful when a call was forwarded to another number, in order to know who forwarded the call to whom.

## Technical features

* **Performance**: We have removed the use of encryption for internal communication between some Wazo components. This results in some performance improvements, while keeping data secure: all communications to and from the outside of the Wazo Platform still use HTTPS.

## Ongoing features

* **Performance**: We will continue removing the use of encryption of internal communication between some Wazo components
* **Directories**: We are adding a GraphQL API in wazo-dird to reduce the number of requests and improve performance.
* **SIP lines and trunks**: We are currently rewriting the SIP configuration API to match PJSIP options and be multi-tenant
* **Phones**: We are working on synchronizing the DND status of phones with the status of Wazo, to avoid having two kinds of DND, one on the phone and another in Wazo applications.


For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

## Resources

* [Install Wazo Platform](/uc-doc/installation/install-system)
* [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the [breaking changes](/uc-doc/upgrade/upgrade_notes#20-06)

Sources:

* [Upgrade notes](/uc-doc/upgrade/upgrade_notes#20-06)
* [Wazo Platform 20.06 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D20.06)

## Discussion

Comments or questions in [this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-20-06-released).
