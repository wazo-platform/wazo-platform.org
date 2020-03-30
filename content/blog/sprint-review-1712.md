Title: Sprint Review 17.12
Date: 2017-08-28
Author: The Wazo Authors
Category: Wazo IPBX
Tags: wazo, development
Slug: sprint-review-1712
Status: published

Hello Wazo community! Here comes the release of Wazo 17.12!

## New features in this sprint

**REST API**: A new REST API has been added to fetch a user's chat history. Until now, the chat history was not kept on the server: this means that one chat interface (say, the XiVO Client) could only see its own history, not messages sent from other softwares (say, the web interface [Unicom](https://phone.wazo.community)).

**Wazo plugins**: The administration interface now shows if a Wazo plugin has a new version available and allows the administrator to upgrade plugins to a more recent version.


## Technical features

**Web Hooks**: Options have been added to make web hook configuration more usable. These options include, the content type, trusted certificates and [templates for the body and URL](http://wazo.readthedocs.io/en/latest/api_sdk/rest_api/webhookd/templates.html).

**Plugins**: wazo-plugind memory usage has been improved.

**Chat**: The chat history is now stored in the database and included in backups (see the updated [restore procedure](http://wazo.readthedocs.io/en/latest/system/backup_restore.html#restoring-the-database)).


## Ongoing features

**Plugin management**: We want developers to be able to write and share Wazo plugins easily. For this, we need a central place where users can browse plugins and developers can upload them. That's what we call the Plugin Market. Right now, the market already serves the list of available plugins, but it is very static. Work will now be done to add a front end to our plugin market, allowing users to browse, add and modify plugins.

**Webhooks**: Webhooks allow Wazo to notify other applications about events that happen on the telephony server, e.g. when a call arrives, when it is answered, hung up, when a new contact is added, etc. Webhooks are working correctly, but they still need some polishing: performance tweaking, handling HTTP authentication, listing the history of webhooks triggered, allowing users to setup their own webhooks in order to connect with Zapier, for example. We're also thinking of triggering scripts instead of HTTP requests, making Wazo all the more flexible when interconnecting with other tools.


---

The instructions for [installing Wazo](/uc-doc/installation/install-system) or [upgrading Wazo](/uc-doc/upgrade/introduction) are available in the documentation.

For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

Sources:

* [Upgrade notes](http://wazo.readthedocs.io/en/wazo-17.12/upgrade/upgrade.html#upgrade-notes)
* [Wazo 17.12 Roadmap](https://projects.wazo.community/versions/265)
