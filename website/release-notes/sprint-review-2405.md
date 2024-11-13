---
title: Wazo Platform 24.05 Released
date: 2024-04-08T08:00:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2405
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 24.05 release.

## New Features

- **Parking**: The API may now be used to park calls
- **Phones**: Fanvil phones DND status is now synchronized with the user DND status

## Bug Fixes

- **Context ranges**: The context range API now returns the extension ranges based on the DID length parameter of the context
- **Tenants**: The wazo-auth `/tenants` API now filters using the `uuids` query parameter properly
- **Chat**: Room chat participants can no longer read messages of rooms they are not part of
- **Chat**: Room chat participants can now create rooms which include all participants of an existing room
- **Performance**: The processing of calls was slowing down after a few days or months of usage, depending on use cases, when using some APIs to manage calls. This is now fixed, and call processing should remain constantly fast in the long run.

## Technical

- **Asterisk**: Asterisk has been upgraded to 21.1.0 [See the Asterisk release announcement](https://www.asterisk.org/asterisk-news/asterisk-version-21-1-0-now-available/)

## Ongoing Features

- **wazo-provd**: The storage of wazo-provd is being rewritten to use Postgresql instead of json files on the filesystem
- **Scalability**: Under the hood changes to make Wazo more performant on large installations.
- **Caller ID**: A new feature is being added for users to select the Caller ID that will be presented when placing calls
- **Authentication**: A new feature is being added for users to be able to login using the SAML protocol

For more details about the aforementioned topics, please see the [changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D24.05).

See you at the next sprint review!

<!-- truncate -->

## Resources

- [Install Wazo Platform](https://wazo-platform.org/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#24-05)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#24-05)
- [Wazo Platform 24.05 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D24.05)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-24-05-released).
