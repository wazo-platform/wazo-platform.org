---
title: Wazo Platform 20.15 Released
date: 2020-11-09
author: The Wazo Authors
category: Wazo Platform
tags: wazo-platform, development
slug: release-review-2015
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 20.15 release.

## New features in this release

* **Contact Center Stats API**: The queue statistics have been improved and may now be aggregated by day or by month, to provide insights on a queue on long periods of time.
* **Contact Center Stats API**: The begin and end time of the statistics are now timezone aware.
* **External application API**: A new API has been added to configure external applications for users and tenants. This API can be used by an administrator to control how an external application will behave.

## Technical features

* **Asterisk**: Asterisk was upgraded to 17.8.1. This is a security release, so we strongly recommend you to update your Wazo Platform.

## Ongoing features

* **Contact Center Stats API**: We are working to expose all the statistics for queues and agents through REST API.

For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

## Resources

* [Install Wazo Platform](/use-cases)
* [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the [breaking changes](/uc-doc/upgrade/upgrade_notes#20-15)

Sources:

* [Upgrade notes](/uc-doc/upgrade/upgrade_notes#20-15)
* [Wazo Platform 20.15 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D20.15)

## Discussion

Comments or questions in [this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-20-15-released).
