Title: Sprint Review 17.06
Date: 2017-04-24
Author: The Wazo Authors
Category: Wazo IPBX
Tags: wazo, development
Slug: sprint-review-1706
Status: published

Hello Wazo community! Here comes the release of Wazo 17.06!

New features in this sprint
---------------------------

**REST API**: We have added a new REST API to get call logs in JSON format, instead of the current CSV format. The CSV format was mainly chosen for compatibility and JSON is easier to create new web interfaces.


Technical features
------------------

**Asterisk**: Asterisk was updated from 14.3.0 to 14.4.0

Important bug fixes
-------------------

**CTI Client**: Transfers made via the client could cause Asterisk to take all CPU of the machine, blocking the transfer and losing the call, in some circumstances. Ticket reference: [#6624](https://projects.wazo.community/issues/6642).


Ongoing features
----------------

**Call logs**: We are attaching more data to the call logs, so that we can filter call logs more easily. This mainly includes filtering call logs by user, so that call logs analysis becomes less tedious. See http://api.wazo.community in section xivo-call-logs for more details.

**New web interface**: This web interface will only use the REST API we've been developing in the past few years, with no brittle complicated internal logic like the current web interface has: all the logic is handled by the REST APIs. This web interface will not replace the current web interface before it has all the same features, so it will take time to become the default interface. However, both web interfaces will coexist during the maturation of the new one. We'll keep you posted when the new web interface becomes usable.

**Plugin management**: We are currently working a plugin management service as well as a standard plugin definition that will be easy to write. The goal is to allow users to add features easily to Wazo and to be able to distribute their extensions to other users. This new system will be used to install features on the new administration interface.

---

The instructions for [installing Wazo](http://documentation.wazo.community/en/stable/installation/installsystem.html) or [upgrading Wazo](http://documentation.wazo.community/en/stable/upgrade/upgrade.html) are available in the documentation.

For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

Sources:

* [Upgrade notes](http://documentation.wazo.community/en/wazo-17.06/upgrade/upgrade.html#upgrade-notes)
* [Wazo 17.06 Roadmap](https://projects.wazo.community/versions/258)
