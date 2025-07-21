---
title: Wazo Platform 25.10 Released
date: 2025-07-17T16:24:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2510
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 25.10 release.

## New Features in This Release

- **Agent**: agentd APIs now expose the `queues` field in agent status containing per queue status
  information

## Bug Fixes

- **Chat**: Presences are now automatically resynchronized after an Asterisk crash
- **Directory**: reverse lookup on incoming calls now account for properly configured external
  directories

## Technical

- **Asterisk**: Asterisk has been upgraded to 22.4.1. See the
  [Asterisk release announcement](https://www.asterisk.org/asterisk-news/asterisk-security-release-22-4-1-now-available/)
- **SIP templates**: the default webrtc sip template now forces usage of SIP session timers with a 5
  minutes refresh interval/session timeout, even without explicit support from the SIP user agent,
  ensuring sip sessions with unresponsive endpoints are detected and terminated

For more details about the aforementioned topics, please see the
[changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D25.10).

See you at the next sprint review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#25-10)

<!-- truncate -->

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#25-10)
- [Wazo Platform 25.10 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D25.10)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-25-10-released).
