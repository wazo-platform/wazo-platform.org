Title: Wazo Platform 22.13 Released
Date: 2022-09-19T19:03:00
Author: The Wazo Authors
Category: Wazo Platform
Tags: wazo-platform, development
Slug: release-review-2213
Status: published

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 22.13 release.

## New Features in This Release
- **Call filters**: When calling a filtered extension, the filtering user will ring on all lines, rather than only one line.
- **Configuration API**: A new API has been added easily create an extension and attach it to a line at the same time

## Ongoing Features
- **New user API**: We are working on a new high level API endpoint to create a user and all of its related resources (user, line, extension, voicemail, incoming call) in a single HTTP request.
- **Events**: All events are being documented in order to better facilitate developers effort to use the event system.
- **Major upgrade**: We are preparing the upgrade to Debian 11 Buster. This requires migrating the remaining code written in Python 2 to Python 3.

For more details about the aforementioned topics, please see the [changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.13).

See you at the next sprint review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#22-13)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#22-13)
- [Wazo Platform 22.13 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.13)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-22-13-released).
