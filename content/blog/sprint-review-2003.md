Title: Wazo Platform 20.03 Released
Date: 2020-02-24
Author: The Wazo Authors
Category: Wazo Platform
Tags: wazo-platform, development
Slug: release-review-2003
Status: published

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 20.03 release.

## New features in this sprint

* **Calls API**: Until now, a user placing a call could only ring one of its lines to place the call. A user may now ring all of its lines at once, without having to indicate which line should ring.

* **Calls API**: Until now, a user placing a call always had to answer the ringing line before the call was actually being placed. A user may now ask to auto-answer the call, so that the call is placed directly. In this case, the user would hear the ringback tone directly in his headphones or phone speaker.

* **Calls events**: Until now, when a call was answered, there was only a `call_updated` event sent. This event was not detailed enough to distinguish if the call was answered or if something else happened. This release adds a `call_answered` event, so that applications can know precisely when a call was answered.

## Bug fixes

* **Function keys**: BLF for DND and call forwards are now fully functional. BLF (Busy Lamp Fields) are small physical LEDs indicating on a physical phone whether the feature (e.g. Do Not Disturb) is currently activated for this phone.

## Technical features

* **Asterisk**: Asterisk has been upgraded to version 16.8.0 ([changelog](https://www.asterisk.org/downloads/asterisk-news/asterisk-1680-now-available))

## Ongoing features

* **SIP**: We are currently changing the SIP configuration API to match the PJSIP configuration

For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

## Resources

* [Install Wazo Platform](/uc-doc/installation/install-system)

* [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/introduction). Be sure to read the [breaking changes](http://wazo.readthedocs.io/en/wazo-20.03/upgrade/upgrade_notes.html)

Sources:

* [Upgrade notes](/uc-doc/upgrade/upgrade_notes)

* [Wazo Platform 20.03 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D20.03)

## Discussion

Comments or questions in [this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-20-03-released/227).
