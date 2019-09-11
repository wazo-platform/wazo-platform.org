Title: Sprint Review 16.03
Date: 2016-03-14
Author: gsanderson
Category: XiVO IPBX
Tags: XiVO, development
Slug: sprint-review-1603
Status: published

Greetings fellow XiVO fans, it is my pleasure to announce the release of XiVO 16.03.

New features in this sprint
---------------------------

**REST API:** A new API for associating a device with a line has been added. Devices can now be fully provisioned and
controlled via the REST API. This new API represents an additional step towards our long-term goal of offering a PBX
system that is more flexible, customizable and useful for third party developers.

**Switchboard Statistics**: Calls that go through a switchboard will now generate statistics. Statistics provide
valuable information to managers of an organization when analyzing the amount of calls they receive. These statistics
can be consulted by downloading a CSV file.


Technical Features
------------------

**Websocketd**: Connections made to websocketd can now use backends such as "xivo_user" or "ldap_user" to authenticate
themselves. These connections will only receive events that they are authorized to see.

**Service discovery**: xivo-dird and xivo-agentd now register their services via consul.

**LDAP authentication**: After discussions with members of the community, the LDAP plugin has been rewritten in order to
adapt more easily to the needs of our users. We have also added these new features:

* The plugin can optionally be configured to find a user via an LDAP search
* The attributes used for matching a user's username and email are configurable

Security Advisory
-----------------

A security bug has been fixed in this sprint. Security advisories for vulnerable versions of XiVO
can be consulted on the [security advisory page](http://mirror.xivo.io/security)


Ongoing features
----------------

**REST API**: We are working on new APIs for managing a users's call services and call forwards. This will offer third
parties more flexibility when developing applications that manage a user's services.

**Web applications**: Work on tools for connecting web applications to XiVO is ongoing. A good example of a Web application is a switchboard application, where the operator may answer, hold and transfer calls from his browser, effectively controlling his physical phone. This may also be coupled with a WebRTC softphone, in order to have a full Web switchboard environment.

---

See you at the next sprint review.

Sources:

* [XiVO 16.03 Upgrade notes](http://documentation.xivo.io/en/stable/upgrade/upgrade.html#id2)
* [XiVO 16.03 Roadmap](http://projects.xivo.io/versions/239)
* [REST API Changelog](http://documentation.xivo.io/en/stable/api_sdk/rest_api/confd/changelog.html)
* [Discussion on LDAP (fr)](http://projects.xivo.io/boards/8/topics/5048)
