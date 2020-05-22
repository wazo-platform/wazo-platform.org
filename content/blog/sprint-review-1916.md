Title: Wazo Platform 19.16 Released
Date: 2019-11-18
Author: The Wazo Authors
Category: Wazo Platform
Tags: wazo-platform, development
Slug: sprint-review-1916
Status: published

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 19.16 release.

## New features in this sprint

* Directories: lookups are now insensitive to accented characters.

## Ongoing features

* Switchboard: We are working to improve the switchboard call flow response time.
* BLF: The Busy Lamp Field (BLF) of Do Not Disturb mode, call forwards and call filtering are being reimplemented to restore the behavior of Wazo 18.03.
* Call logs: We are handling more scenarios in the Wazo Platform CDR. We are focused on the call forwarding scenarios, in order to present the correct numbers to users.
* SBC: We are adding new blocks in Wazo Platform to handle more calls and improve security. Kamailio is the core of those new features and will serve as a Session Border Controller (SBC) and SIP router to multiple Asterisk instances.

For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

---

Resources:

* [Install Wazo Platform](/install)
* [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/introduction). Be sure to read the [breaking changes](http://wazo.readthedocs.io/en/wazo-19.16/upgrade/upgrade_notes.html).

Sources:

* [Upgrade notes](/uc-doc/upgrade/upgrade_notes)
* [Wazo Platform 19.16 Release notes](https://wazo-dev.atlassian.net/secure/ReleaseNote.jspa?projectId=10011&version=10054)
