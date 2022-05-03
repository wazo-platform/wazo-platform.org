Title: Wazo Platform 22.05 Released
Date: 2022-04-04T19:47:00
Author: The Wazo Authors
Category: Wazo Platform
Tags: wazo-platform, development
Slug: release-review-2205
Status: published

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 22.05 release.

## New Features in This Release
- **Provisioning**: A new plugin for Alcatel-Lucent M3, M5 and M7 has been added.
- **Meetings**: Meeting owners can now allow or deny new participants to join the meeting.

## Bug Fixes
- **Switchboards**: Timeout fallback did not work when a group destination had its ring timeout set to null
- **Groups**: Mobile group members will now receive call when they have a mobile refresh token

## Technical Features
- **Asterisk**: Asterisk has been upgraded to 18.11.0. See the [Asterisk release announcement](https://www.asterisk.org/asterisk-news/asterisk-18-11-0-now-available/)

## Ongoing Features
- **Meetings**: Improve external conferences that allow guests to join a meeting

For more details about the aforementioned topics, please see the [changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.05).

See you at the next sprint review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#22-05)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#22-05)
- [Wazo Platform 22.05 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.05)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-22-05-released).
