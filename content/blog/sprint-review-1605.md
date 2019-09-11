Title: Sprint Review 16.05
Date: 2016-04-20
Author: sduthil
Category: XiVO IPBX
Tags: XiVO, development
Slug: sprint-review-1605
Status: published

Greetings fellow XiVO fans, it is my pleasure to announce the release of XiVO 16.05.

New features in this sprint
---------------------------

**Translations**: Thanks to the XiVO community (thank you Marcos Tadeu), the XiVO Client and phone directory labels are translated in Portuguese (Brazil).

**REST API**: A new API has been added to create and associate call permissions to users. Call permissions enable administrators to control which phone numbers are allowed to be called by users.

**SIP Lines**: The SIP lines configuration page has been simplified. A lot of advanced options may now be set freely, independently of what options are supported by the web interface.

Ongoing features
----------------

**Call Transfers**: We are working on a new API for managing call transfers. This will offer third parties more flexibility when developing applications that control the call flows, such as a Web Switchboard. In addition, this new API should solve a number of bugs related to call transfers.

**Installation Wizard**: The wizard is the little assistant that allows administrators to setup the XiVO server. The wizard is a very important part of XiVO, since it's the mandatory way to finalize the installation of XiVO. We are working on a new API allowing to setup XiVO automatically, without the need of the XiVO web interface. Also there are some known bugs in the current wizard blocking the end of the installation that would put beginners to a complete stop before even trying XiVO. So the time has come to squash those nasty bugs!

---

See you at the next sprint review!

Sources:

* [XiVO 16.05 Upgrade notes](http://documentation.xivo.io/en/latest/upgrade/upgrade.html#id2)
* [XiVO 16.05 Roadmap](http://projects.xivo.io/versions/241)
* [REST API Changelog](http://documentation.xivo.io/en/latest/api_sdk/rest_api/confd/changelog.html)
