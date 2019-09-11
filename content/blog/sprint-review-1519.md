Title: Sprint Review 15.19
Date: 2015-12-04 12:00:00
Author: gsanderson
Category: XiVO IPBX
Tags: XiVO, development
Slug: sprint-review-1519
Status: published

Greetings fellow XiVO fans ! I am pleased to announce that version 15.19 of XiVO has been released.
This will be our last version released in 2015. The next version, 15.20, will be released during
the month of January in 2016.

New features in this sprint
---------------------------

**Call Forwards**: Unconditional forwards on a phone can be updated through a single operation. When you wish
to update the phone number on a forward, simply dial ```*21<new_number>``` and the forward will be
automatically updated.

**REST API:** A new API for importing users en masse has been added. A CSV file can be used for
importing users, lines, extensions, cti profiles, incalls, and voicemails in a single operation. The
goal of this API is to accelerate the installation and configuration of a server when deploying one
or more XiVOs.

**REST API:** The search system on confd APIs has been improved. You can now filter results using
exact matches on any field for a given resource. For example : If you have two users named "John
Smith" and "Jane Smith", you can search for users who only have "Jane" as a firstname. These
improvements allow API users to search and filter results more precisely.

**REST API:** A new API for remotely initiating calls has been added. This feature can be used
for implementing custom services related to calling services, such as automatically dialing
a client's phone number, or call reminders at a specific time.

**XiVO Client**: The new People xlet now has buttons for transfering calls to voicemails, sending
emails, and chatting with other users. This means that it is now feature complete and can be used as
a replacement for the old Contacts xlet. The XiVO dev team is very proud to have completed this major
milestone ! The old Contacts xlet has now been removed from the client.

**Caller ID:** The caller ID lookup service has been improved. Lookups now include searches in your
personal contacts. This means that when one of your personal contacts calls you, instead of seeing
only her number, you will see her name along with her number.


Security Advisory
-----------------

2 security bugs have been fixed in this sprint. Security advisories for vunerable versions of xivo
have been released and can be consulted on the [security advisory page](http://mirror.xivo.io/security)


Ongoing features
----------------

**OS Upgrade:** We will be upgrading the version of Debian GNU/Linux, on which XiVO is based, from
Wheezy to Jessie. This will upgrade many libraires and programs running on
a server to newer versions.

**User import:** We will be adding more features to the user import API in order
to update information that has already been imported.

**Lines:** We are revamping the web interface in a similar fashion to what was done for
voicemails. The goal is to make configuration of advanced parameters easier while
still keeping the interface simple.

**Switchboard:** We are changing the internals of the Switchboard feature so that
we can control more precisely how calls are answered, transferred, etc.


Technical features
------------------

 * We have started working on a permission system in order to better secure communications between
 services on a XiVO server. In the long term, this work will also enable users to access
 various xivo subsystems in a restricted mode, allowing them the possibility of customizing
 different features without impacting other parts of the system.

---

*My fellow xivoists, as the **Lord of XiVO** allow me to wish you all a merry christmas and a
happy new year ! May your spirits remain joyous until the end of the year and throughout 2016.
May the freedom of XiVO bless your communications across the vast VoIP expanse.*

![XiVO Christmas Tree]({filename}/images/blog/xivo_xmas_tree_2015.jpg)

Sources:

* [XiVO 15.19 Roadmap](http://projects.xivo.io/versions/235" XiVO 15.19 Roadmap")
* [xivo-confd Changelog](http://documentation.xivo.io/en/latest/api_sdk/rest_api/confd/changelog.html)
