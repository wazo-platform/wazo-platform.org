---
title: Sprint Review 17.15
date: 2017-10-31
authors: wazoplatform
category: Wazo IPBX
tags: [wazo, development]
slug: sprint-review-1715
status: published
---

Hello Wazo community! Here comes the release of Wazo 17.15!

We are looking for beta testers for the Wazo Zapier plugin. You can click this [invite link](https://zapier.com/platform/public-invite/430/a797f40ef69e5a38e4c331d1996d61ce/) to try Wazo with Zapier.

## Security update

**Chat**: We fixed a security issue of Wazo 17.14 where the chat history of a user could be seen by another authenticated malicious user.

## Important bug fix

**Web client**: Wazo servers installed or upgraded on 17.14 between October 10 and October 24 2017 are incompatible with Web clients such as [Unicom](https://phone.wazo.community). We released a fixed version on October 24 to fix Wazo 17.14. Wazo 17.15 also fixes the issue.

## New features in this sprint

**REST API**: We have added a new API to be able to switch a call between devices while keeping the conversion going. For example, if Alice is on the phone with Bob from her office, Alice can switch the call from her desk phone to her mobile phone without disrupting the call so that she can leave her office without ending the conversation.

## Ongoing features

**User and Tenant Management**: We are currently reworking the user and entities (a.k.a tenant) configuration. This should make installations with multiple entities feel more natural in future versions.

**Performance**: We are making changes to the way xivo-ctid-ng handles messages from Asterisk to be able to handle more simultaneous calls.

## New upstream versions

**Asterisk**: Wazo now includes Asterisk 15.0.0.

---

The instructions for [installing Wazo](/uc-doc/installation/install-system) or [upgrading Wazo](/uc-doc/upgrade/introduction) are available in the documentation.

For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

<!-- truncate -->

Sources:

- [Upgrade notes](https://wazo.readthedocs.io/en/wazo-17.15/upgrade/upgrade.html#upgrade-notes)
