---
title: Wazo Platform 26.08 Released
date: 2026-08-03T09:00:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2608
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 26.08 release.

## New Features in this release
- **cdr**: CDRs now indicate when an unanswered call was redirected to a voicemail. `call_status` is reported as `voicemail` and `destination_details` carries a `voicemail` type with the voicemail's
  `id` and `name`
- **services**: REST API worker threads now scale with demand. A new `rest_api.min_threads` setting keeps threads ready at all times, and `rest_api.max_threads` becomes a ceiling instead of a fixed count
- **debug**: `wazo-debug` can now capture the event stream alongside the rest of the diagnostics

## Bug Fixes
- **contact center/agents**: Fixed an issue that prevented an agent from logging in after another agent was deleted
- **directories/reverse lookup**: Fixed reverse lookups returning contacts inconsistently when multiple sources match the same extension
- **messaging & HA**: Fixed an idle-in-transaction database connection leak from wazo-chatd connectors that could block master/slave replication
- **logging**: Restored millisecond resolution in log timestamps
- **recording**: Unanswered calls no longer create an empty recording file when recording is enabled for all incoming calls

## Maintenance
- **calld**: configurable ARI HTTP connection pool size
- **asterisk**: Upgraded to 22.10.1, including a fix for a `func_channel` NULL dereference crash
- **plugin management**: `wazo-plugind-cli` now uses the CLIFF framework; the `-c` flag is deprecated and no longer needed
- **SIP/call control**: Exposed the Wazo call id in SIP, removing need for extra REST lookups for apps
- **upgrade**: wazo-upgrade now checks the system configuration for database migration before proceeding to avoid partial/broken upgrades

## Performance
- **call control**: optimized the ARI fan-out for `/users/me/calls`, reducing latency under load
- **directories**: improved latency degradation of the reverse lookup service under load
- **presence initialization**: Optimized presence initialization for faster, more efficient, more reliable system restarts

## Ongoing Features
- **directories**: Performance improvements to the favorites and lookup services for large directories
- **scaling**: A generalized per-component multi-process scaling architecture, extending concurrency beyond the current multi-threading model

See you at the next release review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#26-08)

<!-- truncate -->

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#26-08)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-26-08-released).
