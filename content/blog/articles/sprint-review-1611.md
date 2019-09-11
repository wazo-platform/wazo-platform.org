Title: Sprint Review 16.11
Date: 2016-08-29
Author: sduthil
Category: XiVO IPBX
Tags: XiVO, development
Slug: sprint-review-1611
Status: published

Hello XiVO community! Here comes the release of XiVO 16.11!

New features in this sprint
---------------------------

**XiVO Client**: Users may now have logins in the form of email addresses: up until now, only logins of the form `peter_parker` were allowed. With XiVO 16.11, users may have logins of the form `peter.parker@spiders.love`.


Important bug fixes
-------------------

**Contact center**: Introduced in XiVO 16.10, [this bug](http://projects.xivo.io/issues/6363) causes, in certain conditions, an agent to stop receiving calls from queues. This bug is fixed in XiVO 16.11.


Community contributions
-----------------------

**Web interface**: Thanks to Kevin Labécot for providing fixes to [display problems](http://projects.xivo.io/issues/6362) when using XiVO with OpenVZ.


Ongoing features
----------------

**Phonebook**: We are adding REST APIs to control the phonebook of XiVO. This allows other applications to interact with the phonebook of XiVO, like adding and removing contacts. The current phonebook is shared by all users of the same XiVO, even if they are in different entities. The new REST API will also allow to have different phonebooks for different entities.


---

See you at the next sprint review!

Sources:

* [Upgrade notes](http://documentation.xivo.io/en/latest/upgrade/upgrade.html#upgrade-notes)
* [xivo-confd REST API Changelog](http://documentation.xivo.io/en/latest/api_sdk/rest_api/confd/changelog.html)
* [XiVO 16.11 Roadmap](http://projects.xivo.io/versions/247)
