Title: Wazo Platform 20.14 Released
Date: 2020-10-21
Author: The Wazo Authors
Category: Wazo Platform
Tags: wazo-platform, development
Slug: release-review-2014
Status: published

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 20.14 release.

## New features in this release

* **Contact Center Stats API**: Wazo Platform 20.14 introduces a new HTTP API to retrieve statistics for calls received in queues. The statistics were collected but not available in any way since they were displayed in the web interface of Wazo 18.03.

* **Tenant API**: A new API has been added to Wazo Platform 20.14 to easily retrieve resources that have been created along with a new tenant. Currently, this API exposes the PJSIP templates automatically created with the new tenant.

* **Phones**: Two new phone provisioning plugins have been added to support Yealink T31G & T33G phones and Cisco 78XX.

## Technical features

* **Asterisk**: Asterisk was upgraded to 17.7.0. See the [Asterisk release announcement](https://www.asterisk.org/asterisk-news/asterisk-17-7-0-now-available/)

## Ongoing features

* **Contact Center Stats API**: We are working to expose all the statistics for queues and agents through REST API.

For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

## Resources

* [Install Wazo Platform](/use-cases)
* [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the [breaking changes](/uc-doc/upgrade/upgrade_notes#20-14)

Sources:

* [Upgrade notes](/uc-doc/upgrade/upgrade_notes#20-14)
* [Wazo Platform 20.14 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D20.14)

## Discussion

Comments or questions in [this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-20-14-released).
