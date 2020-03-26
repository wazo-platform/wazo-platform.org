Title: Wazo Platform 20.04 Released
Date: 2020-03-16
Author: The Wazo Authors
Category: Wazo Platform
Tags: wazo-platform, development
Slug: release-review-2004
Status: published

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 20.04 release.

## New features in this sprint

* **WebRTC**: We have added two new settings for WebRTC in the setup phase of Wazo Platform: WebRTC needs to discover the IP address of the two phones trying to communicate. For this, it uses the ICE protocol, exchanging the different IP addresses of the two hosts. However, for a host to know its public IP address, it needs to ask this information to a third-party service via the STUN protocol that is designed specifically for this. The two new settings allow 1) to enable the ICE protocol for exchanging IP addresses and 2) to specify the address of the third-party STUN server. Until now, those settings needed to be set after the setup phase in order for WebRTC to work correctly.
* **Groups**: In some cases, when calling a ring group, when one member answers the call, the other members would see a "missed call" on their phone. In the context of a ring group, this behavior is undesirable. We added an option to configure the behavior when a member of a ring group answers a call.


## Bug fixes

* **Scalability**: we have removed an internal cache from wazo-auth that prevented wazo-auth to be load-balanced: in some cases, a new tenant was not visible in one instance of wazo-auth, resulting in an "Unauthorized" error.
* **Directories**: Until Wazo Platform 20.04, when configuring physical phone directories, the administrator needed to restart wazo-phoned manually to apply the changes. In Wazo 20.04, the changes are applied automatically.
* **Call quality**: We have backported a patch from Asterisk 16.9.0 release candidate, preventing the audio playing static when using TLS/SRTP, possibly including WebRTC calls.


## Technical features

* **SIP lines and trunks**: We have added APIs to configure global PJSIP settings that will be used for all SIP lines and system-wide settings that will help configure Asterisk correctly for SIP calls.


## Ongoing features

* **SIP lines and trunks**: We are currently rewriting the SIP configuration API to match PJSIP options and be multi-tenant


For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

## Resources

* [Install Wazo Platform](https://wazo-platform.org/install)

* [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/introduction). Be sure to read the [breaking changes](/uc-doc/upgrade/upgrade_notes#20-04)

Sources:

* [Upgrade notes](/uc-doc/upgrade/upgrade_notes#20-04)

* [Wazo Platform 20.04 Changelog](https://wazo-dev.atlassian.net/secure/ReleaseNote.jspa?projectId=10011&version=10072)

## Discussion

Comments or questions in [this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-20-04-released/258).
