Title: Sprint Review 16.02
Date: 2016-02-19
Author: sduthil
Category: XiVO IPBX
Tags: XiVO, development
Slug: sprint-review-1602
Status: published

Hello,

New features in this sprint
---------------------------

**Users import**: The CSV import of users now supports setting the call permissions for each user. Call permissions define which restriction are put on users regarding which numbers they can dial.

**XiVO Client**: All communications between the CTI server and the XiVO Clients will now be encrypted by default.

**LDAP authentication**: The LDAP authentication mechanisms now uses the new user field for email address, and is not considered experimental anymore. However, it only supports simple LDAP hierarchies, and we are going to improve it to be more flexible.

Technical Features
------------------

**Asterisk upgrade**: Asterisk has been upgraded from version 13.7.0 to 13.7.2

Ongoing features
----------------

**Security**: We are extending the permission system to all REST APIs. This will allow a finer grained access to the REST APIs and reduce the chances of accidentally breaking the rest of the system. For example, users will be able to modify their function keys, without having access to the function keys of other users.

**REST API**: We are working on a new REST API for associating devices with SIP or SCCP accounts.

**Web applications**: We are working towards making Web applications connected to XiVO possible. The two things it needs is REST APIs, which are growing more useful, and events, which will be provided via Websockets, introduced in this sprint. A good example of a Web application is a switchboard application, where the operator may answer, hold and transfer calls from his browser, effectively controlling his physical phone. This may also be coupled with a WebRTC softphone, in order to have a full Web switchboard environment.

**Switchboard**: We are changing the internals of the Switchboard feature so that we can control more precisely how calls are answered, transferred, etc.

---

See you at the next sprint review.

Sources:

* [XiVO 16.02 Upgrade notes](http://documentation.xivo.io/en/stable/upgrade/upgrade.html#id2)
* [XiVO 16.02 Roadmap](http://projects.xivo.io/versions/238)
* [REST API Changelog](http://documentation.xivo.io/en/stable/api_sdk/rest_api/confd/changelog.html)
