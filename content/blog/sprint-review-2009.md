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

* **WebSocket**: A new ping/pong command has been implemented to improve connection stability.

## Technical features

* **Asterisk**: Asterisk has now a process realtime priority by default. It increases stability when the server is on load.
* **Performance**: We had removing the use of encryption of internal communication between Wazo components.

## Ongoing features

* **Directories**: We are adding a GraphQL API in wazo-dird to reduce the number of requests and improve performance.
* **SIP lines and trunks**: We are currently rewriting the SIP configuration API to match PJSIP options and be multi-tenant

For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

## Resources

* [Install Wazo Platform](/install)

* [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the [breaking changes](/uc-doc/upgrade/upgrade_notes#20-09)

Sources:

* [Upgrade notes](/uc-doc/upgrade/upgrade_notes#20-09)

* [Wazo Platform 20.09 Changelog](https://wazo-dev.atlassian.net/secure/ReleaseNote.jspa?projectId=10011&version=10101)

## Discussion

Comments or questions in [this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-20-09-released).
