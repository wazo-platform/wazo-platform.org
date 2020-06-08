Title: Wazo Platform 20.08 Released
Date: 2020-06-08
Author: The Wazo Authors
Category: Wazo Platform
Tags: wazo-platform, development
Slug: release-review-2008
Status: published

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 20.08 release.

## New features in this release

* **Presences**: In Wazo 20.08, the presence status of users takes into account the multiple lines of a user: if one of the lines is talking, the phone status of the user will be talking.
* **Sounds**: We have increased the limit for uploading sound files to Wazo Platform. The system now accepts sound files and music-on-hold up to 16MB in size. Unfortunately, voicemail greeting messages still have a limitation that forbids files greater that 1M.
* **Directories**: In Wazo 20.08, reverse lookup will search through conference numbers. While not very useful when a incoming call arrives, it allows interrogating the system to know "what was that number I talked to the other day?".
* **Provisioning**: We have improved the documentation about physical devices that are supported by Wazo Platform. You can see the new version here: https://wazo-platform.org/uc-doc/ecosystem/supported_devices. This list is auto-generated, which makes it easier to maintain over time and to keep in sync with what the provisioning plugins can do. Let us know what you think!
* **Calls**: Wazo Platform is now able to emulate the pressing of DTMF keys via a REST API call. This makes remote-controlling a physical phone more transparent.

## Technical features

* **Asterisk**: Asterisk was upgraded to 17.4.0. See the [Asterisk release announcement](https://www.asterisk.org/downloads/asterisk-news/asterisk-1740-now-available)

## Ongoing features

* **Performance**: We will continue removing the use of encryption of internal communication between some Wazo components
* **Directories**: We are adding a GraphQL API in wazo-dird to reduce the number of requests and improve performance.
* **SIP lines and trunks**: We are currently rewriting the SIP configuration API to match PJSIP options and be multi-tenant

For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

## Resources

* [Install Wazo Platform](/install)

* [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the [breaking changes](/uc-doc/upgrade/upgrade_notes#20-08)

Sources:

* [Upgrade notes](/uc-doc/upgrade/upgrade_notes#20-08)

* [Wazo Platform 20.08 Changelog](https://wazo-dev.atlassian.net/secure/ReleaseNote.jspa?projectId=10011&version=10096)

## Discussion

Comments or questions in [this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-20-08-released).
