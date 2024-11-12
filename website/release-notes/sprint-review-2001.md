---
title: Wazo Platform 20.01 Released
date: 2020-01-14
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: sprint-review-2001
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 20.01 release.

## New features in this sprint

- **Switchboard**: We have worked on improving the switchboard reactivity. In this version, the time to answer a call has been reduced by half. These changes may also impact positively the response time of other actions made on the calls in a switchboard.
- **Monitoring**: We have added a new HTTP resource to retrieve the current status of user telephony lines in wazo-calld REST API. This allows an external application to know which phones are busy, available or disconnected. This feature is currently very similar to the wazo-chatd presence features, but it will be improved with more details irrelevant to wazo-chatd, like the round-trip time to a phone.
- **Users**: We have improved the users REST API to add information related to user interception. When getting a user's details, you may now get the list of people that this user is allowed to intercept.
- **Class 4**: We are releasing a first version of the SBC and call routing features of Wazo Platform, featuring Kamailio. Here are the links to the [installation documentation](https://wazo-platform.org/use-cases/class-4) and [REST API documentation](/documentation/overview/router-confd.html).

## Contributions

- **Hardware**: While not directly related to this version, we're excited to share with you the announcement of a distribution for Wazo Platform on Raspberry Pi, named Sparrow [`https://sparrow.b5.pm`]. You can find the announcement [on our forums](https://wazo-platform.discourse.group/t/sparrow-run-wazo-engine-on-raspberry-pi/126).

## Technical features

- **Asterisk**: Asterisk was updated from 16.6.2 to 16.7.0, including 2 security fixes.
- **Orchestration**: wazo-calld can now run independently from Asterisk. Of course it can not do much without it, since the main purpose of wazo-calld is to manage calls that are placed through Asterisk. This makes Wazo Platform easier to setup in a orchestrated environment such as containers.

## Ongoing features

- **Reliability**: We are working on improving the stability of Wazo Platform in different scenarios: high number of users, REST API calls and events, temporary loss of one of Wazo services...
- **Class 4**: added new blocks in Wazo Platform to handle more calls and improve security. Kamailio is the core of those new features and will serve as a Session Border Controller (SBC) and SIP router to multiple Asterisk instances

For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

<!-- truncate -->

## Resources

- [Install Wazo Platform](/uc-doc/installation)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade). Be sure to read the [breaking changes](https://wazo.readthedocs.io/en/wazo-19.17/upgrade/upgrade_notes.html)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes)
- [Wazo Platform 20.01 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D20.01)
