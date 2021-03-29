Title: Wazo Platform 21.04 Released
Date: 2021-03-29
Author: The Wazo Authors
Category: Wazo Platform
Tags: wazo-platform, development
Slug: release-review-2104
Status: published

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 21.04 release.

## New features in this release

* **Email**: Some options only present in database are now exposed through API. It's the first step
  to improve and allow administrators to configure the email server using the API.
* **Call recording**: Using API to start/stop a call recording will now trigger a beep.
* **Tenant**: Add possibility to set a unique human readable identifier (a.k.a "slug") to a
  tenant, which will used to easily identify resource in asterisk configuration and log. For now
  this behavior is only used for groups, but will be used for all asterisk resources.
* **Events**: A new event is sent when a user receives a call but is not
  answered, be it because the phone is unavailable or the Do-Not-Disturb (DND) mode is activated, 
  among other causes.

## Technical features

* **Ring group**: Group API now use uuid as primary identifier

## Ongoing features

* **Call recording**: we are working to improve the Wazo Platform API to easily get call recordings.

For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

## Resources

* [Install Wazo Platform](/use-cases)

* [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the [breaking changes](/uc-doc/upgrade/upgrade_notes#21-04)

Sources:

* [Upgrade notes](/uc-doc/upgrade/upgrade_notes#21-04)

* [Wazo Platform 21.04 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.04)

## Discussion

Comments or questions in [this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-21-04-released).
