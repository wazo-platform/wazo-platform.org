Title: Wazo Platform 20.09 Released
Date: 2020-06-29
Author: The Wazo Authors
Category: Wazo Platform
Tags: wazo-platform, development
Slug: release-review-2009
Status: published

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 20.09 release.

## New features in this release

* **WebSocket**: A new ping/pong command has been implemented in the Wazo WebSocket. This allows clients to detect more easily when the network connection with the server is interrupted.

## Technical features

* **Asterisk**: Asterisk process priority has been changed to realtime priority. This increases stability and voice quality when the server is under load.
* **Performance**: We have removed the use of encryption for internal HTTP communication between Wazo components. Encryption now only happens when Wazo is sending/receiving data from the outside world.

## Ongoing features

* **Directories**: We are adding a GraphQL API in wazo-dird to reduce the number of requests and improve performance.
* **SIP lines and trunks**: We are currently rewriting the SIP configuration API to match PJSIP options and be multi-tenant

For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

## Resources

* [Install Wazo Platform](/uc-doc/installation/install-system)

* [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the [breaking changes](/uc-doc/upgrade/upgrade_notes#20-09)

Sources:

* [Upgrade notes](/uc-doc/upgrade/upgrade_notes#20-09)

* [Wazo Platform 20.09 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D20.09)

## Discussion

Comments or questions in [this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-20-09-released).
