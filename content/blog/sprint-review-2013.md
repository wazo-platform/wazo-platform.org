Title: Wazo Platform 20.13 Released
Date: 2020-09-22 12:00:00
Author: The Wazo Authors
Category: Wazo Platform
Tags: wazo-platform, development
Slug: release-review-2013
Status: published

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 20.13 release.

## New features in this release

* **SIP lines and trunks**: The SIP configuration API has been revamped to match the possibilities
of the Asterisk PJSIP configuration file. The SIP general configuration has been removed in favor
of a global configuration template for each tenant. Here is an article describing the changes done
on lines and trunks. https://wazo-platform.discourse.group/t/wazo-20-13-how-trunk-works-now/567

* **SIP Templates**: SIP endpoints (lines and trunks) can now inherit their configuration from
templates. If you want to assign a given configuration to multiple lines, you can create a template
with that given configuration and assign it to all the lines you want. If you ever decide to add
a new option to that group of lines or if you wish to rollback that change, you can do it using the
template. No more clicking on all users. If multiple templates are applied, for example "global",
which is the SIP configuration that is meant to be used on all endpoints of a tenant, and "webrtc",
then all options from the "global" template are used, then all options from the "webrtc" template
are applied over the "global" template. Finally, the endpoint options will be applied over the
options coming from the templates. This makes line endpoints very lightweight containing only a
caller id in most cases.

* **Permissions and ACL**: wazo-auth now makes it possible to remove permissions from a policy.
This allows an administrator to create a new policy to remove permissions for a specific group of
users instead of re-writing and maintaining a whole policy without the undesired permission.

* **Menu revamp**: The menu as been revamped in wazo-ui.

* **Global settings**: A global settings section has been added in wazo-ui to configure settings that
are shared amongs all tenants.

* **Group members**: Extensions can now be used as group members in wazo-ui

## Bug fixes

* **Schedules**: Schedules with no timezone defined prevented the call from being distributed.

## Documentation

* **Wazo SuiteCRM integration**: A [complete guide has been
contributed](https://wazo-platform.org/images/uc-doc/community/how_to_proxmox_suitecrm.pdf)
by community member Richard Cantin on configuring Wazo and SuiteCRM on the
Proxmox virtual environment.

For more details about the aforementioned topics, please see the roadmap linked below.

See you at the next sprint review!

## Resources

* [Install Wazo Platform](/install)

* [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the [breaking changes](/uc-doc/upgrade/upgrade_notes#20-13)

Sources:

* [Upgrade notes](/uc-doc/upgrade/upgrade_notes#20-13)

* [Wazo Platform 20.13, Changelog](https://wazo-dev.atlassian.net/secure/ReleaseNote.jspa?projectId=10011&version=10122)

## Discussion

Comments or questions in [this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-20-13-released).
