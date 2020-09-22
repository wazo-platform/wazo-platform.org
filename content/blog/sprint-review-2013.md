Title: Wazo Platform 20.13, Released
Date: 2020-09-22
Author: The Wazo Authors
Category: Wazo Platform
Tags: wazo-platform, development
Slug: release-review-2013,
Status: published

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 20.13, release.

## New features in this release

* **SIP lines and trunks**: The SIP configuration API has been revamped to match the possibilities
of the Asterisk PJSIP configuration file. The SIP general configuration has been removed in favor
of a global configuration template for each tenant.

* **Permissions and ACL**: wazo-auth now makes it possible to remove permissions from a policy.
This allows an administrator to create a new policy to remove permissions for a specific group of
users instead of re-writing and maintaining a whole policy without the undesired permission.

## Bug fixes

* **Schedules**: Schedules with no timezone defined prevented the call from being distributed.


## Documentation

* **Wazo SuiteCRM integration**: A complete guide as been contributed by community member Richard
Cantin on configuring Wazo, SuiteCRM on the Proxmox virtual environment.


For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

## Resources

* [Install Wazo Platform](/install)

* [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the [breaking changes](/uc-doc/upgrade/upgrade_notes#20-13,)

Sources:

* [Upgrade notes](/uc-doc/upgrade/upgrade_notes#20-13,)

* [Wazo Platform 20.13, Changelog](https://wazo-dev.atlassian.net/secure/ReleaseNote.jspa?projectId=10011&version=10122)

## Discussion

Comments or questions in [this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-20-13,-released).