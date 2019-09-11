Title: Sprint Review 17.10
Date: 2017-07-17
Author: The Wazo Authors
Category: Wazo IPBX
Tags: wazo, development
Slug: sprint-review-1710
Status: published

Hello Wazo community! Here comes the release of Wazo 17.10!

New features in this sprint
---------------------------

**Plugins**: The Wazo plugin system is still young and did not implement any compatibility restriction across Wazo versions. Newer plugins may become incompatible with older Wazo versions as they are released or older plugins may be incompatible with newer Wazo versions. We have added a restriction to forbid installing an incompatible plugin on your Wazo. Since there is no such restriction in Wazo 17.08 and 17.09, plugins installed on those versions may not work properly.

**Plugins**: Plugins are now shown in two sections: official plugins that are developed by the Wazo development team and community plugins that are written by the Wazo community.

**Plugins**: We also improved the search box for plugins, so that it is easier to find plugins that you don't already know about.


Ongoing features
----------------

**Plugin management**: There is still a lot to be done to the plugin management service. e.g. dependency, upgrade, HA, ...

**Webhooks**: We are adding a new way of interconnecting Wazo with other software: webhooks. Outgoing webhooks allow Wazo to notify other applications about events that happen on the telephony server, e.g. when a call arrives, when it is answered, hung up, when a new contact is added, etc. Incoming webhooks also allow Wazo to be notified of events happening on other applications, e.g. a new customer was added in your CRM, a new employee was added in your directory, etc. Unfortunately, there is no magic and the application in question must be able to send or receive webhooks so that Wazo can talk with it. See also this [blog post (sorry, it's in French)](http://blog.wazo.community/wazo-webhook.html#wazo-webhook) about Wazo and webhooks.

---

The instructions for [installing Wazo](http://documentation.wazo.community/en/stable/installation/installsystem.html) or [upgrading Wazo](http://documentation.wazo.community/en/stable/upgrade/upgrade.html) are available in the documentation.

For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

Sources:

* [Upgrade notes](http://documentation.wazo.community/en/wazo-17.10/upgrade/upgrade.html#upgrade-notes)
* [Wazo 17.10 Roadmap](https://projects.wazo.community/versions/262)
