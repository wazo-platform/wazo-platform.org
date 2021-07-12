Title: Wazo Platform 21.09 Released
Date: 2021-07-12T16:29:00
Author: The Wazo Authors
Category: Wazo Platform
Tags: wazo-platform, development
Slug: release-review-2109
Status: published

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 21.09 release.

## New Features in This Release

- **Import**: A new tool is available to ease migration to Wazo. See
  [documentation](https://wazo-platform.org/uc-doc/administration/import_export)
- **Incall**: Music on Hold can now be played when an incall redirects to a user.
- **Phones**: A new phone provisioning plugin has been added to support Gigaset N870.
- **REST API**: To make REST API easier to use, authentication policies can now be identified by a
  slug instead of its UUID.

## Bug Fixes

- **Asterisk**: Fix asterisk [STUN issue](https://wazo-dev.atlassian.net/browse/WAZO-2237) when IP
  of STUN server changes while Asterisk is running.

## Technical Features

- **Authorization**: Users cannot give permission to another user if they don't already have that
  permission themselves.
- **Asterisk**: Asterisk has been upgraded to 18.5.0. See the
  [Asterisk release announcement](https://www.asterisk.org/asterisk-news/asterisk-18-5-0-now-available/)

## Ongoing Features

- **Conference**: We are working on a better integration of conference actions, by adding events and
  REST API to control them, like raising hand or mute/unmute participants
- **Group**: Improve user and group interaction, like avoid ringing user phone when DND is enabled
  and better push mobile integration.

For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#21-09)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#21-09)
- [Wazo Platform 21.09 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.09)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-21-09-released).
