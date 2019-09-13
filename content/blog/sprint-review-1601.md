Title: Sprint Review 16.01
Date: 2016-02-01
Author: gsanderson
Category: XiVO IPBX
Tags: XiVO, development
Slug: sprint-review-1601
Status: published

Greetings fellow XiVO fans, I am pleased to announce the release of XiVO 16.01.

New features in this sprint
---------------------------

**XiVO Client Authentication**: The XiVO client can use LDAP authentication for connecting to the XiVO server. This
makes it easier for administrators to reuse services that manage their user accounts, such as Active Directory. LDAP
authentication is managed by a new authentication backend configurable via the CTI. This backend requires manual
configuration on the server. Further details can be obtained in the upgrade notes.

**XiVO Client Connections**: The XiVO client will issue a warning when it is unable to connect to the server using an
encrypted connection. Users will have the option of reconnecting to the server using an unencrypted connection.
Encrypted connections can be reactivated by clicking on the lock in the client's configuration window.

**SIP:** A new tab has been added to the page for configuring advanced options in SIP accounts. Advanced options can be
added via the "advanced" tab on the lines page. These parameters will be included along side the rest of the SIP
configuration in Asterisk. The advanced tab offers more flexibility to advanced users of Asterisk, while still keeping
the rest of the UI simple enough for regular users.

**Web Interface:** A few minor improvements have been added to the web interface's UI:

 * A search bar has been added to the context page
 * The user's extension will now be displayed next to his name in multiselect boxes
 * The line associated to a device can be edited by clicking on its number in the device list

**REST API:** A new API for managing "custom" endpoints has been added. Custom endpoints enable the use of communication
protocols that are supported by Asterisk but not fully managed by XiVO, such as DAHDI cards. This new API represents an
additional step towards our long-term goal of offering a PBX system that is more flexible, customizable and useful for
third party developers.

Technical Features
------------------

**Snom phones:** The plugin for Snom phones has been upgraded to version 8.7.5.35 of the firmware.

**DAHDI upgrade:** DAHDI has been upgraded to version 2.11

**Consul upgrade:** Consul has been upgraded to version 0.6.3

**Asterisk upgrade:** Asterisk has been upgraded to version 13.7.0

**Web account ACLs**: The permission system used for web service accounts has been replaced by Access Control Lists
(ACL). ACLs are a part of our ongoing work on our new permission system. This system improves security in XiVO for
various subsystems, such as communication between services. In the long term, ACLs will also permit users to access
parts of in a restricted mode, giving them the possibility of customizing different features without impacting other
parts of the system.

**CTI protocol version**: The CTI protocol has been upgraded to 2.0. XiVO Clients will issue a warning when connecting
to a server that uses a version of the protocol that is incompatible with the current version of the client.


Ongoing features
----------------

**REST API:** We will be working on a new API for associating devices with SIP or SCCP accounts.

**Switchboard:** We are changing the internals of the Switchboard feature so that we can control more precisely how
calls are answered, transferred, etc.

---

*My fellow xivoists, as the **Lord of XiVO** allow me to bid you a happy and invigorating farewell. I wish you shall
remain in high spirits until our next fateful encounter, 3 weeks from now. May the freedom of XiVO bless your
communications across the vast VoIP expanse.*

Sources:

* [XiVO 16.01 Upgrade notes](http://documentation.xivo.io/en/stable/upgrade/upgrade.html#id2)
* [XiVO 16.01 Roadmap](http://projects.xivo.io/versions/237)
* [REST API Changelog](http://documentation.xivo.io/en/stable/api_sdk/rest_api/confd/changelog.html)
* [CTI Protocol Changelog](http://documentation.xivo.io/en/stable/contributors/cti_server/cti_protocol.html#id2)
