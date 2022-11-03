---
title: Sprint Review 17.01
date: 2017-01-09
author: The Wazo Authors
category: Wazo IPBX
tags: wazo, development
slug: sprint-review-1701
status: published
---

Hello Wazo community! Here comes the release of Wazo 17.01!

We took a bit of extra time to release this version, due to the holidays here in Québec City. So this version took 4 weeks to release, but upcoming versions will be released every 3 weeks.

New features in this sprint
---------------------------

**REST API**: Parking lots may now be managed via REST API. A parking lot is a range of phone numbers reserved for pending calls: by default, you can park call to the parking lot 700 and retrieve those calls by dialing 701, 702, etc. Currently, the web interface only allows one parking lot, from 700 to 750 by default. The REST API allows you to create as many parking lots as you want, for example one per entity, to avoid mixing up calls from different entities in the same parking lot.

**REST API**: We added another REST API for paging groups. This API offers about the same features than the web interface, allowing you to use a group of phones as PA speakers.

**REST API**: A new REST API has been added in order to place a new call from the mobile phone of a user. This will come in handy for a mobile application, where you can call a contact by clicking a button. Your mobile phone will be called by Wazo and once you answer you will hear your contact ringing. This means your mobile operator will charge an inbound call to your mobile phone instead of an outbound call.

Technical features
------------------

**Consul**: Consul was upgraded to [0.7.2](https://github.com/hashicorp/consul/blob/v0.7.2/CHANGELOG.md). We also removed the management of authentication tokens from Consul and used good old PostgreSQL instead. So Consul now only serves for service discovery, which is useful when connecting multiple Wazo together.

**LibPRI**: LibPRI was upgraded to 1.5.0

---

See you at the next sprint review!

Sources:

* [Upgrade notes](http://wazo.readthedocs.io/en/wazo-17.01/upgrade/upgrade.html#upgrade-notes)
* [xivo-confd REST API Changelog](http://wazo.readthedocs.io/en/wazo-17.01/api_sdk/rest_api/confd/changelog.html)
