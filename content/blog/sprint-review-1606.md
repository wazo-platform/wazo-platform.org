Title: Sprint Review 16.06
Date: 2016-05-16
Author: sduthil
Category: XiVO IPBX
Tags: XiVO, development
Slug: sprint-review-1606
Status: published

Hello XiVO community! Here comes the release of XiVO 16.06!

New features in this sprint
---------------------------

**Installation Wizard**: The wizard is the little assistant that allows administrators to setup the XiVO server. The wizard is a very important part of XiVO, since it's the mandatory way to finalize the installation of XiVO. We have released a new API allowing to setup XiVO automatically, without the need of the XiVO web interface. Also a number of bugs related to the wizard were fixed.

**XiVO Client**: Thanks to the XiVO community (thank you Julien Revert), the deployment of the XiVO Client for Windows on multiple machines is easier in 16.06. This facilitates upgrading the version of XiVO and the XiVO Client together.

Technical Features
------------------

**Polycom phones:** The plugin for Polycom phones has been upgraded to version 5.4.3 of the firmware. Also, two new models are supported: VVX101 and VVX201.

**Personal contacts**: The import of personal contacts has been improved: there were some performance issues that are fixed in 16.06, and there can not be any more duplicated personal contacts.

Ongoing features
----------------

**Call Transfers**: We are working on a new API for managing call transfers. This will offer third parties more flexibility when developing applications that control the call flows, such as a Web Switchboard. In addition, this new API should solve a number of bugs related to call transfers.

**Entity management**: Entities are used to manage multiple groups of users on the same XiVO server, but each group can't see the other. This is useful for example when managing multiple departments of the same big company, but each department has its own telephony administrator, and each administrator should only see the users of their own department. This feature was until now exclusive to the web interface, but we are working on making this feature manageable through a REST API. Be aware that this is a long-term job, because entities apply to every single configuration object in XiVO. As with other REST APIs, this will allow creating different graphical interfaces for managing XiVO, as well as automating this management.

---

See you at the next sprint review!

Sources:

* [Upgrade notes](http://documentation.xivo.io/en/latest/upgrade/upgrade.html#upgrade-notes)
* [XiVO 16.06 Roadmap](http://projects.xivo.io/versions/242)
* [REST API Changelog](http://documentation.xivo.io/en/latest/api_sdk/rest_api/confd/changelog.html)
