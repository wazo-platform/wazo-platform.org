---
title: Wazo Platform 26.05 Released
date: 2026-05-01T15:10:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2605
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 26.05 release.

## Bug Fixes
- **recording**: pausing/resuming a recording for a queue agent while in a call is now fixed.
- **trunks**: when deleting a tenant, associated trunks stayed registered on asterisk. This now has been fixed.
- **upgrade**: wazo-confd was improved to avoid timeouts when upgrading a system with 2,000 users or more.
 
## Technical
- **auth**: mobile offline logins are now limited to one active refresh token per user; every new mobile offline login request revokes any existing refresh token and their sessions, even if client_id is reused (a fresh refresh token is always returned);
- **agents**: login per queue was improved. The agent is now logged off when they decide to logoff the last queue associated with them. Likewise, when the agent logs in and there are no queues logged in, all their associated queues are logged in. wazo-agentd-cli was also updated to include per-queue status and login per queue functionality.
- **caller ID**: the user outgoing caller ID API now exposes the caller ID name.
- **call listening**: the call listening feature has been removed as it was not multi-tenant

## Ongoing Features
- **multi-channel communication**: multi-channel chat support framework

See you at the next release review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#26-05)

<!-- truncate -->

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#26-05)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-26-05-released).
