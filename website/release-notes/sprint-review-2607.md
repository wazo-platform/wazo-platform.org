---
title: Wazo Platform 26.07 Released
date: 2026-06-26T09:00:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2607
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 26.07 release.

## New Features in this release
- **chatd**: Added endpoints to manage connector identities. An admin can now set, update, or
remove a user's connector identity
- **stats**: Agent statistics now include per-queue metrics
- **calld**: Set diversion header for queue calls

## Bug Fixes
- **calls**: Carry over transferee identity for caller ID during blind transfers, in all directions
- **chatd**: Fixed an issue with cross-tenant isolation when sending/receiving connector messages
- **debug**: Verify sufficient free space before creating the tarball to avoid overfilling storage
- **dird**: Fixed an issue that could prevent the reverse lookup timeout from being configured
- **webhookd**: Fixed an issue that prevented token reuse between push notifications
- **agid**: Allow spaces in non-quoted caller ID
- **calld**: Fixed an issue that prevented recording announcements from playing for automatic call recordings

## Technical
- **asterisk**: Upgraded to 22.10.0
- **auth**: Modifying a user's email address no longer invalidates refresh tokens
- **services**: Improved logging by adding request/response correlation and other improvements
- **provisioning**: Ensure `deletable=false` for default device configurations

## Ongoing Features
- **services**: Various under-the-hood performance optimizations for larger deployments

See you at the next release review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#26-07)

<!-- truncate -->

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#26-07)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-26-07-released).
