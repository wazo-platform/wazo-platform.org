---
title: Wazo Platform 25.14 Released
date: 2025-10-14T09:00:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2514
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 25.14 release.

## New Features in This Release

- **wazo-agid**: Added the ability to override the default `p-asserted-identity` SIP header format
  per trunk. The format can be configured by adding a key `set_var` with the value
  `WAZO_PAI_FORMAT=...` in the trunk's endpoints. (default: sip:user@host)

## Bug Fixes

- **wazo-auth**: PUT `/api/auth/0.1/users/$user_uuid/external/mobile` is now idempotent. It will now
  create or update the resource instead of returning a 404 if it doesn't exist.

## Technical

- **wazo-agentd-client**: `client.agents.pause_by_number` and `client.agents.pause_user_agent` now support a
  `reason` parameter, which was already supported by the wazo-agentd API endpoints.

## Ongoing Features

- **debian bookworm**: it is high time for wazo to update its underlying OS layer from debian
  bullseye to debian bookworm; work is ongoing and the first bookworm release is expected to come at
  some point before the end of the year; see
  [previous debian dist upgrades](https://wazo-platform.org/uc-doc/upgrade/upgrade_notes_details/23-06/bullseye/)
  for a taste of what an upgrade to the first bookworm-based wazo release should entail

For more details about the aforementioned topics, please see the
[changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D25.14).

See you at the next sprint review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#25-14)

<!-- truncate -->

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#25-14)
- [Wazo Platform 25.14 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D25.14)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-25-14-released).
