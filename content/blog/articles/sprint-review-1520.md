Title: Sprint Review 15.20
Date: 2016-01-08 12:00:00
Author: gsanderson
Category: XiVO IPBX
Tags: XiVO, development
Slug: sprint-review-1520
Status: published

Greetings fellow XiVO fans, allow me to wish you all a happy new year ! I am pleased to announce that the first version
of XiVO in 2016, version 15.20, has been released. Since we have started a new year, the next version of XiVO will be
numbered 16.01.

New features in this sprint
---------------------------

**REST API**: New APIs for managing users via CSV files have been added. CSV files can now be used for updating users
and their associated resources such as lines, extensions, CTI profiles, incalls and voicemails. Users can also be
exported to a CSV file. The goal of this API is to make the management of a XiVO more efficient when administrators need
to modify a great number of users at the same time.

**XiVO Client**: Contact searches using context separation can now be activated through the web interface. Context
separation allows groups of users to be isolated from one another by grouping them into "contexts". This feature becomes
useful when you want to separate users from different organizations, but still keep them all on the same server. For
example: schools, business offices, etc. In version 15.19, this feature needed manual configuration on the server. This
configuration is no longer necessary.

**XiVO Client**: Users can now chat with people on other servers. Before, people using a XiVO Client could only chat
with users that were on the same server. With version 15.20, people will be able to chat with users on other servers
when these servers have been [configured to communicate together](http://documentation.xivo.io/en/stable/scalability_and_distributed_systems/contact_and_presence_sharing.html).

Technical Features
------------------

**OS Upgrade**: 15.20 will be the first version of XiVO running under the latest version of Debian GNU/Linux, also known
as "Jessie". Many libraries and programs that run on a XiVO server have also been upgraded. This upgrade helps to
improve the overall stability and security of XiVO and allows to use the latest technologies available in order to
develop new and exciting features.

**XiVO Client connections**: Both standard and encrypted connections now use port 5003. In previous versions, encrypted
connections had to be reconfigured client-side in order to use a different port. Changing the port is no longer
necessary. Encrypted connections can now be activated by simply clicking on the lock in the client's configuration
window.

Ongoing features
----------------

**Lines:** We are revamping the web interface in a similar fashion to what was done for voicemails. The goal is to make
configuration of advanced parameters easier while still keeping the interface simple.

**Switchboard:** We are changing the internals of the Switchboard feature so that we can control more precisely how
calls are answered, transferred, etc.

**LDAP authentication**: We are working on new authentication mechanisms. We are adding LDAP authentication to the XiVO
Client. This allows administrators to reuse their existing infrastructure in order to manage and authenticate users
from different systems, such as an Active Directory server.

---

*My fellow xivoists, as the **Lord of XiVO** allow me to bid you a happy and invigorating farewell. I
wish you shall remain in high spirits until our next fateful encounter, 3 weeks from now. May the
freedom of XiVO bless your communications across the vast VoIP expanse.*

Sources:

* [XiVO 15.20 Upgrade notes](http://documentation.xivo.io/en/stable/upgrade/upgrade.html#id2)
* [XiVO 15.20 Roadmap](http://projects.xivo.io/versions/236)
* [REST API Changelog](http://documentation.xivo.io/en/stable/api_sdk/rest_api/confd/changelog.html)
