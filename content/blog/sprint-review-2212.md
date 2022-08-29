Title: Wazo Platform 22.12 Released
Date: 2022-08-24T19:03:00
Author: The Wazo Authors
Category: Wazo Platform
Tags: wazo-platform, development
Slug: release-review-2212
Status: published

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 22.12 release.

## New Features in This Release
- **API CDR**: Call Detail Records (CDR) now include destination type of the call, i.e: if a user or a conference.

## Technical Features
- **Stasis over bus**: Asterisk now publishes stasis events to the rabbitmq bus when registered using the Asterisk REST API. This improves the tolerance to higher peaks in events volume without failure.
- **wazo-calld stasis connection**: wazo-calld now uses stasis events received from RabbitMQ bus instead of the Asterisk WebSocket.

## Ongoing Features
- **New user API**: We are working on a new high level API endpoint to create a user and all of its related resources (user, line, extension, voicemail, incoming call) in a single HTTP request.
- **Events**: All events are being documented in order to better facilitate developpers effort to use the event system.
- **Major upgrade**: We are preparing the upgrade to Debian 11 Buster. This requires migrating the remaining code written in Python 2 to Python 3.

For more details about the aforementioned topics, please see the [changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.12).

See you at the next sprint review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#22-12)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#22-12)
- [Wazo Platform 22.12 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.12)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-22-12-released).
