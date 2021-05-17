Title: Sprint Review 17.08
Date: 2017-06-01
Author: The Wazo Authors
Category: Wazo IPBX
Tags: wazo, development
Slug: sprint-review-1708
Status: published

Hello Wazo community! Here comes the release of Wazo 17.08!

New features in this sprint
---------------------------

**REST API**: The call logs API has been enhanced with new information, such as the date of answering, the direction of the call and call tags. Call tags allow filtering call logs on other criteria than a user or a number, i.e. "give me the calls of all agents"... Any tag may be attached to any user, and calls placed or received by this user will be tagged accordingly.


Important bug fixes
-------------------

**High Availability**: Wazo 17.07 introduced a regression in the replication of database between master and slave. This issue is fixed in 17.08.


Ongoing features
----------------

**Admin UI**: We are working to improve the new web interface.

**Plugin management**: There is still a lot to be done to the plugin management service. e.g. dependency, upgrade, wazo version constraint, HA, ..

---

The instructions for [installing Wazo](/uc-doc/installation/install-system) or [upgrading Wazo](/uc-doc/upgrade/introduction) are available in the documentation.

For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

Sources:

* [Upgrade notes](http://wazo.readthedocs.io/en/wazo-17.08/upgrade/upgrade.html#upgrade-notes)
* [Wazo 17.08 Roadmap](https://projects.wazo.community/versions/260)
