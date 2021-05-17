Title: Sprint Review 17.04
Date: 2017-03-13
Author: The Wazo Authors
Category: Wazo IPBX
Tags: wazo, development
Slug: sprint-review-1704
Status: published

Hello Wazo community! Here comes the release of Wazo 17.04!

New features in this sprint
---------------------------

**CSV import of a phonebook**: The CSV import had been removed from the web interface when we allowed many phonebooks to be available on the same Wazo. Many administrators have reported that they used that feature for their end users. You told us and we heard you. The CSV import is back.

Technical features
------------------

**Asterisk**: Asterisk has been updated from 14.2.1 to 14.3.0

Ongoing features
----------------

**Switchboard API**: We are changing the internals of the Switchboard feature so that we can control more precisely how calls are answered, transferred, etc. We are also adding a REST API over the switchboard feature, to allow different interfaces for the switchboard, be it web or desktop client.

**API policies permissions**: The current model of permissions for authentication tokens is a bit too rigid to give users only the permissions they need. We are making the system more flexible in order to have more fine-grained control over what user is allowed to do, such as entering/leaving only certain groups, answering calls from certain switchboards, etc.

**New web interface**: This web interface will only use the REST API we've been developing in the past few years, with no brittle complicated internal logic like the current web interface has: all the logic is handled by the REST APIs. This web interface will not replace the current web interface before it has all the same features, so it will take time to become the default interface. However, both web interfaces will coexist during the maturation of the new one. We'll keep you posted when the new web interface becomes usable.

**Plugin management**: We are currently working a plugin management service as well as a standard plugin definition that will be easy to write. The goal is to allow users to add features easily to Wazo and to be able to distribute their extensions to other users. This new system will be used to install features on the new administration interface.

---

The instructions for [installing Wazo](/uc-doc/installation/install-system) or [upgrading Wazo](/uc-doc/upgrade/introduction) are available in the documentation.

See you at the next sprint review!

Sources:

* [Upgrade notes](http://wazo.readthedocs.io/en/wazo-17.04/upgrade/upgrade.html#upgrade-notes)
