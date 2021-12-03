Title: Wazo Platform 21.16 Released
Date: 2021-12-03T15:14:00
Author: The Wazo Authors
Category: Wazo Platform
Tags: wazo-platform, development
Slug: release-review-2116
Status: published

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 21.16 release.

## New Features in This Release

- **Meetings**: Wazo 21.16 introduces persistent meeting rooms. The persistent meeting rooms can be
  created by users and will stay indefinitely in the system, contrary to other meeting rooms that
  will be deleted after some time. The meeting rooms can then be used to invite external people to
  join the meeting.

## Bug Fixes

- **Call recording**: Outgoing external calls were not recorded if the user enabled only the
  recording of outgoing external calls and no other call recording direction.

## Technical Features

- **Asterisk**: Asterisk has been upgraded to 18.8.0. See the [Asterisk release
  announcement](https://www.asterisk.org/asterisk-news/asterisk-18-8-0-now-available/)

- **Security**: Unauthenticated HTTP API are throttled to 25 requests per second.

- **Provisioning**: the Patton provisioning plugin has been updated for the most recent firmware

## Ongoing Features

- **Meetings**: Improve external conferences that allow guests to join a meeting

For more details about the aforementioned topics, please see the
[changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.16).

See you at the next sprint review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the [breaking
  changes](/uc-doc/upgrade/upgrade_notes#21-16)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#21-16)
- [Wazo Platform 21.16
  Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.16)

## Discussion

Comments or questions in [this forum
post](https://wazo-platform.discourse.group/t/blog-wazo-platform-21-16-released).
