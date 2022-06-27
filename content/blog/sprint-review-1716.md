Title: Sprint Review 17.16
Date: 2017-11-20
Author: The Wazo Authors
Category: Wazo IPBX
Tags: wazo, development
Slug: sprint-review-1716
Status: published

Hello Wazo community! Here comes the release of Wazo 17.16!

## New features in this sprint

**REST API**: Groups can now ring arbitrary extensions. This was already possible with a specific user, a custom line and a Local channel. This API does the same thing, only a lot simpler. There is no graphical interface to use this API yet, though.

**REST API**: Until now, schedules in REST API could only be associated to incoming calls. Schedules can now be associated with users, groups and outgoing calls via REST API.

## Ongoing features

**User and Tenant Management**: We are currently reworking the user and entities (a.k.a tenant) configuration. This should make installations with multiple entities feel more natural in future versions.

**REST API**: We are working towards replacing the old orange admin web interface with the more modern and easier to maintain blue web interface (wazo-admin-ui on `/admin`). Since wazo-admin-ui is only using REST API under the hood, we need REST API to cover all cases of administration of Wazo. Hence we are completing the set of REST APIs offered by Wazo. You can find the complete API documentation on [https://wazo-platform.org/documentation](https://wazo-platform.org/documentation).

---

The instructions for [installing Wazo](/uc-doc/installation/install-system) or [upgrading Wazo](/uc-doc/upgrade/introduction) are available in the documentation.

For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

Sources:

* [Upgrade notes](http://wazo.readthedocs.io/en/wazo-17.16/upgrade/upgrade.html#upgrade-notes)
