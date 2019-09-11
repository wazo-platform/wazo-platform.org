Title: Sprint Review 16.13
Date: 2016-10-07
Author: sduthil
Category: XiVO IPBX
Tags: XiVO, development
Slug: sprint-review-1613
Status: published

Hello XiVO community! Here comes the release of XiVO 16.13!

New features in this sprint
---------------------------

**Provisioning**: [Patton gateways](http://documentation.xivo.io/en/latest/ecosystem/official_devices.html#patton) SN4110 and SN4300 are now supported for auto-provisioning.

**REST API**: DID configuration (a.k.a Incoming calls) is now available in the REST API of xivo-confd. Until now, it was only possible via the web interface forms. The REST API is now only missing outgoing calls configuration to be able to use SIP trunks.


Technical features
------------------

**Consul**: Consul has been upgraded to version 0.7.


Ongoing features
----------------

**Directories**: The phonebook in the web interface will be replaced with the phonebooks from xivo-dird. This will allow more than one phonebook per entity. Without this, XiVO supports only one phonebook, shared across entities.

**REST API**: A REST API to manage outgoing calls is being developed. This is the last piece needed in the API to be able to use SIP trunks, and interconnect XiVO with operators, without needing to use THE XiVO web interface. This means other web interfaces may be developed, and automatic configuration of SIP trunks and call routing will be possible.

**Asterisk**: We are working on upgrading Asterisk to the latest major version: Asterisk 14.

---

See you at the next sprint review!

Sources:

* [Upgrade notes](http://documentation.xivo.io/en/latest/upgrade/upgrade.html#upgrade-notes)
* [xivo-confd REST API Changelog](http://documentation.xivo.io/en/latest/api_sdk/rest_api/confd/changelog.html)
* [XiVO 16.13 Roadmap](http://projects.xivo.io/versions/249)
