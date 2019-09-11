Title: Sprint Review 16.09
Date: 2016-07-13
Author: sduthil
Category: XiVO IPBX
Tags: XiVO, development
Slug: sprint-review-1609
Status: published

Hello XiVO community! Here comes the release of XiVO 16.09!

New features in this sprint
---------------------------

**Web interface**: Editing a user with many functions keys now takes the same time as editing a user with no function keys. There is a noticeable performance improvement when editing users with lots (25+) of function keys.

**Entities**: A new API has been added to manage entities on a XiVO. Entities allow administrators to isolate multiple companies or departments on the same XiVO server, so that they may share resources like the machine itself, or phone connections with operators.

**User call flow**: New APIs have also been added so that users may control their current call flow, like hanging up or transferring to a third party. The XiVO Client uses those APIs under the hood, and benefits from a couple of bugfixes brought by those APIs.

**Installation**: Older versions of XiVO may be installed via the installation script (only the older ISO images were available until now). This is especially useful for restoring old backups, or migrating XiVO across machines.

**Operators**: XiVO is now compatible with operators and devices offering SS7 signalling. This allows XiVO to be used with more diverse physical interconnections.


Technical features
------------------

**SCCP phones:** The newer Cisco SCCP firmwares 9.4 are available for installation.


Community contributions
-----------------------

**Monitoring**: Thanks to Alexandre Lafarcinade for fixing the bug [6278](http://projects.xivo.io/issues/6278) which make Monit alerts much more useful in an environment with multiple XiVO.

**Installation**: Thanks to Gregory Esnaud for improving the installation script so that we can install archived versions of XiVO.

**Provisioning**: Thanks to Jeremy Spiesser for adding support for SIP transport selection to the Yealink plugins.

---

See you at the next sprint review!

Sources:

* [Upgrade notes](http://documentation.xivo.io/en/latest/upgrade/upgrade.html#upgrade-notes)
* [xivo-confd REST API Changelog](http://documentation.xivo.io/en/latest/api_sdk/rest_api/confd/changelog.html)
* [xivo-ctid-ng REST API Changelog](http://documentation.xivo.io/en/latest/api_sdk/rest_api/ctid-ng/changelog.html)
* [XiVO 16.09 Roadmap](http://projects.xivo.io/versions/245)
