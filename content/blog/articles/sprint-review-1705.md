Title: Sprint Review 17.05
Date: 2017-04-03
Author: The Wazo Authors
Category: Wazo IPBX
Tags: wazo, development
Slug: sprint-review-1705
Status: published

Hello Wazo community! Here comes the release of Wazo 17.05!

New features in this sprint
---------------------------

**Call recording**: We added some configuration options to control the naming of the call recordings. This allows administrators to dispatch recording files more easily between entities. You can read all about it [in the documentation](http://documentation.wazo.community/en/latest/administration/call_recording/call_recording.html#file-names).

**REST API**: We added the possibility to pause/unpause an agent from the REST API of xivo-agentd. An agent in pause does not receive any more calls distributed from the call queues. Until now, agents could only enter the pause through the CTI client. Also, it is now possible to specify the reason for the pause. This allows supervisors to have a better understanding of the agents availability. You can see this new feature in action in [Unicom](https://phone.wazo.community).

**REST API**: The ``calls`` API in xivo-ctid-ng has been improved to reflect the direction of each call: a graphical interface such as [Unicom](https://phone.wazo.community) may now display if the call is received or sent.

Important bug fixes
-------------------

**Database**: One of Wazo services (xivo-dird) was not closing the connections to the database. It blocked other services from accessing the database in some circumstances. Ticket reference: [#6607](https://projects.wazo.community/issues/6607)

**CTI Client**: Transfers made via the client had a performance issue that would take up all CPU of the machine after a few transfers, causing other issues as a result. Ticket reference: [#6628](https://projects.wazo.community/issues/6628)

Contributions
-------------

**Web interface**: We thank Paolo Ornati for submitting a patch fixing a bug in the list of phonebooks in the web interface.

**Translations**: We thank Rafał Perczyński and Ania Perczyńska for making polish sound files available in the web interface and translating the CTI client interface in polish with [Transifex](https://www.transifex.com/wazo/wazo/). The CTI client translations will be shipped in a future version.

**Yealink firware**: We thank Damien Barbier for submitting a new firmware for Yealink phones. The provisioning plugin for firmware v81 is now available in the [testing](http://documentation.wazo.community/en/latest/administration/provisioning/basic_configuration.html#alternative-plugins-repo) plugins repository.

Ongoing features
----------------

**Call logs**: We are attaching more data to the call logs, so that we can filter call logs more easily. This mainly includes filtering call logs by user, so that call logs analysis becomes less tedious.

**New web interface**: This web interface will only use the REST API we've been developing in the past few years, with no brittle complicated internal logic like the current web interface has: all the logic is handled by the REST APIs. This web interface will not replace the current web interface before it has all the same features, so it will take time to become the default interface. However, both web interfaces will coexist during the maturation of the new one. We'll keep you posted when the new web interface becomes usable.

**Plugin management**: We are currently working a plugin management service as well as a standard plugin definition that will be easy to write. The goal is to allow users to add features easily to Wazo and to be able to distribute their extensions to other users. This new system will be used to install features on the new administration interface.

---

The instructions for [installing Wazo](http://documentation.wazo.community/en/stable/installation/installsystem.html) or [upgrading Wazo](http://documentation.wazo.community/en/stable/upgrade/upgrade.html) are available in the documentation.

For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

Sources:

* [Upgrade notes](http://documentation.wazo.community/en/wazo-17.05/upgrade/upgrade.html#upgrade-notes)
* [Wazo 17.05 Roadmap](https://projects.wazo.community/versions/257)
