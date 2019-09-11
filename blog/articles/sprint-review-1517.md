Title: Sprint Review 15.17
Date: 2015-10-16 12:00:00
Author: gsanderson
Category: XiVO IPBX
Tags: XiVO, development
Slug: sprint-review-1517
Status: published

Greetings fellow XiVOists ! I am pleased to announce that version 15.17 of XiVO has been released.

New features in this sprint
---------------------------

**REST API:** A new API for managing SIP accounts has been added. The API can be used for creating
SIP accounts and associating them with users on a XiVO server. This API also offers third parties,
such as developers or administrators, the flexibility of configuring all of the advanced SIP
parameters offered by asterisk. This new API helps us expand on our goal of offering a more
customizable and flexible system ideal for use in a wide range of environments, such as cloud
infrastructures.

**Directories:** The contacts system used by the phones has been improved. Contact sources have been
unified. This means that phones will now search through the same places as searches in the XiVO
Client. Phones will also be able to search through personal contacts. Up until now, personal
contacts could only be used from the XiVO Client. But with this release, any contact added through
the client can be used on the phone.


Ongoing features
----------------

 **SCCP:** In a similar fashion to the SIP API, we will be adding a new API for managing
 SCCP accounts. This will make configuration of advanced SCCP parameters more flexible for
 administrators and other tech specialists.

 **Lines:** We are revamping the web interface in a similar fashion to what was done for
 voicemails. The goal is to make configuration of advanced parameters easier while
 still keeping the interface simple.

 **LDAP:** We are working on a new authentication mecanism for allowing users access
 to XiVO based on LDAP credentials. This will allow administrators to integrate
 XiVO with their existing infrastructure and give them finer grained access
 to xivo's services.

Technical features
------------------

**Asterisk:** Minor Asterisk upgrade from 13.5.0 to 13.6.0. This upgrade fixes the latest bugs and
improves overall stability.

---

*My fellow xivoists, as the **Lord of XiVO** allow me to bid you a happy and invigorating farewell. I
wish you shall remain in high spirits until our next fateful encounter, 3 weeks from now. May the
freedom of XiVO bless your communications across the vast VoIP expanse.*

Source: [XiVO 15.17 Roadmap](http://projects.xivo.io/versions/233 "XiVO 15.17 Roadmap")
