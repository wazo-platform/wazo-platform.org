Title: Sprint Review 16.12
Date: 2016-09-19
Author: pcadotte
Category: XiVO IPBX
Tags: XiVO, development
Slug: sprint-review-1612
Status: published

Hello XiVO community! Here comes the release of XiVO 16.12!

New features in this sprint
---------------------------

**Provisioning**: Support for Snom D745 has been added.

**Directories**: The phonebooks from xivo-dird now support imports. This feature is currently available only from the xivo-dird REST API.


Technical features
------------------

**Asterisk**: Asterisk has been upgraded to [13.11.2](http://downloads.asterisk.org/pub/telephony/asterisk/releases/ChangeLog-13.11.2)


Important bug fixes
-------------------

**XiVO client**: Transferee could hear the transferer and the target during a transfer if no music on hold was configured. See [issue 6392](http://projects.xivo.io/issues/6392) for more information.


Community contributions
-----------------------

**Tutorials**: Thanks to Eric Viel from Iper Telecom for his tutorial on configuring Keepalived with the XiVO high availability to have a floating IP.


Ongoing features
----------------

**Directories**: The old directory in the web interface will be replaced with the phonebooks from xivo-dird, allowing many phonebooks owned by different entities.

**REST API**: API to manage incoming calls are in progress.


---

See you at the next sprint review!

Sources:

* [Upgrade notes](http://documentation.xivo.io/en/latest/upgrade/upgrade.html#upgrade-notes)
* [xivo-confd REST API Changelog](http://documentation.xivo.io/en/latest/api_sdk/rest_api/confd/changelog.html)
* [XiVO 16.12 Roadmap](http://projects.xivo.io/versions/248)
