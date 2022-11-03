---
title: Sprint Review 16.16
date: 2016-12-12
author: The Wazo Authors
category: Wazo IPBX
tags: wazo, development
slug: sprint-review-1616
status: published
---

Hello Wazo community! Here comes the first release of Wazo, Wazo 16.16!

If your are new to the Wazo project, you should take a look at [this blog post](/blog/introducing-wazo) that explains why the project was created.

We will describe here the changes made since XiVO 16.13, which is the release of XiVO where Wazo starts from. This sprint review is a bit longer than the others, since it includes the equivalent of 3 versions, 16.13 having been released more than 2 months ago. Future releases will come out every 3 weeks, except for quality assurance no-gos.

New features in this sprint
---------------------------

**Migration from XiVO infrastructure**: Since the domain xivo.io went down, we spent some time rebuilding everything that was needed to make Wazo work correctly from a XiVO installation. You can find the instruction to migrate from XiVO [on the documentation](http://wazo.readthedocs.io/en/wazo-16.16/upgrade/16.16/xivo_to_wazo.html). Note that you don't have to upgrade your XiVO to use the new infrastructure. See the documentation for more details.

**Codecs**: The Opus codec is now available in Wazo. The Opus codec is a [very efficient codec](http://opus-codec.org/comparison/) that has been around for a while, but is a potential subject for patent-infringement lawsuits. The Asterisk editor Digium came out with a solution that we deem satisfying, given the great advantages of the Opus codec.

**Documentation**: We have improved the documentation for using REST APIs. You can see the instructions on [this page](http://wazo.readthedocs.io/en/wazo-16.16/api_sdk/rest_api/quickstart.html)

**REST API**: A new REST API has been added to manage SIP trunks and outgoing calls. Trunks and outgoing calls were the last missing APIs to be able to control inbound and outbound call routing without the need of the web interface.

**REST API**: Groups may now be managed via REST API. A very popular usage for groups is to ring the multiple phones of the same user with the same phone number. Note that the REST API allows you to assign multiple lines to a single user, giving you the same behavior as the aforementioned group configuration, but without some drawbacks of the groups. So this REST API is mainly intended for groups ringing multiple users.

**REST API**: We have added another REST API to manage conference rooms. The conference rooms from the REST API are quite different from the conference rooms we were used to from the web interface: they use a different backend (Confbridge instead of Meetme) and have the additional feature of conference administration: by entering the right PIN, one becomes administrator of the conference and may mute or reject other members.

**REST API**: Yet another REST API, this time for IVR (interactive voice response): you can create simple IVR via the REST API, without needing to write dialplan.

**Directories**: Until now, XiVO allowed only one phonebook, that was shared across all entities, meaning all users of different entities would see the same contacts that are stored in the phonebook. This was clearly not a good idea, since the purpose of entities is to isolate users from each other while staying on the same server. You may now configure multiple phonebooks on the same Wazo. Phonebooks may be shared across entities or isolated, at your convenience.

**Scalability**: We've made it a bit easier to share contacts between multiple Wazo servers, in that new servers will be auto-discovered, instead of having to manually configure each server to share contacts. See [the updated documentation](http://wazo.readthedocs.io/en/wazo-16.16/scalability_and_distributed_systems/contact_and_presence_sharing.html) for the new procedure.

Technical features
------------------

**Asterisk**: Asterisk has been upgraded from 13.11.2 to 14.2.1, including security fixes.


Ongoing features
----------------

**Switchboard**: We are changing the internals of the Switchboard feature so that we can control more precisely how calls are answered, transferred, etc.

---

Thanks for you support and encouragement and see you at the next sprint review!

Sources:

* [Upgrade notes](http://wazo.readthedocs.io/en/wazo-16.16/upgrade/upgrade.html#upgrade-notes)
* [xivo-confd REST API Changelog](http://wazo.readthedocs.io/en/wazo-16.16/api_sdk/rest_api/confd/changelog.html)
