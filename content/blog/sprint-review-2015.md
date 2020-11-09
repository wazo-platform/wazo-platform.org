Title: Wazo Platform 20.15 Released
Date: 2020-11-09
Author: The Wazo Authors
Category: Wazo Platform
Tags: wazo-platform, development
Slug: release-review-2015
Status: published

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 20.15 release.

## New features in this release

* **Contact Center Stats API**: The queue statistics have been improved and may now be aggregated by day or by month, to provide insights on a queue on long periods of time.
* **Contact Center Stats API**: The begin and end time of the statistics are now timezone aware.
* **External application API**: A new API has been added to configure external applications for users and tenants. This API can be used by an administrator to control how an external application will behave.

## Technical features

* **Asterisk**: Asterisk was upgraded to 17.8.1. See the [Asterisk release announcement](https://www.asterisk.org/asterisk-news/asterisk-17-8-1-now-available/). This is a security release, so we strongly recommand you to update your Wazo Platform.

## Ongoing features

* **Contact Center Stats API**: We are working to expose all the statistics for queues and agents through REST API.

For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

## Resources

* [Install Wazo Platform](/install)

* [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the [breaking changes](/uc-doc/upgrade/upgrade_notes#20-15)

Sources:

* [Upgrade notes](/uc-doc/upgrade/upgrade_notes#20-15)

* [Wazo Platform 20.15 Changelog](https://wazo-dev.atlassian.net/secure/ReleaseNote.jspa?projectId=10011&version=10135)

## Discussion

Comments or questions in [this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-20-15-released).
