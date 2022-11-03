---
title: Wazo Platform 20.02 Released
date: 2020-02-03
author: The Wazo Authors
category: Wazo Platform
tags: wazo-platform, development
slug: release-review-2002
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 20.02 release.

## Security fixes

* A [security issue](http://mirror.wazo.community/security/WAZO-2020-01.pdf) has been fixed that allowed the database of the engine to be accessed remotely when the following conditions were met:

  * Engine configured as a slave
  * Engine installed using ansible
  * Engine in version 19.12 to 20.01

  If your installation matches all of these conditions you MUST upgrade or execute [this script](https://mirror.wazo.community/security/WAZO-2020-01.sh) on your engine.

## New features in this sprint

* **Phones**: We have added a provisioning plugin for Fanvil X Series phones, supporting 12 new phones models.
* **REST API**: A new REST API has been added to mute or unmute an arbitrary call. This allows a better control of physical phones from the REST API.
* **Mobile applications**: Two new kinds of push notifications are sent to FCM (Android) or APNS (iOS) when a call has been answered or cancelled from another line than a mobile line. This allows a better handling of calls for mobile applications developed for Wazo Platform.

## Technical features

* **REST API**: We have allowed some of our services to serve the REST API using HTTP instead of HTTPS. This will allow us to remove any unnecessary encryption for communication within Wazo Platform.

## Ongoing features

* **SIP**: We are currently changing the SIP configuration API to match the PJSIP configuration
* **Class 4**: We are still improving the new blocks in Wazo Platform to handle more calls and improve security. Kamailio is the core of those new features and serves as a Session Border Controller (SBC) and SIP router to multiple Asterisk instances.
* **Phones**: We are improving provisioning for Yealink phones in a NAT environment.

For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

## Resources

* [Install Wazo Platform](/uc-doc/installation/install-system)
* [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/introduction). Be sure to read the [breaking changes](http://wazo.readthedocs.io/en/wazo-20.02/upgrade/upgrade_notes.html)

Sources:

* [Upgrade notes](/uc-doc/upgrade/upgrade_notes)
* [Wazo Platform 20.02 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D20.02)
