---
title: Wazo Platform 26.11 Released
date: 2026-11-23T08:00:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2611
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 26.11 release.

## New Features in this release
- **phone provisioning/HTTP authentication**: the master tenant can now switch
  the provisioning key requirement on or off through the API, without editing
  the wazo-provd configuration file. See
  [HTTP Authentication Strategy](/uc-doc/administration/provisioning/http-auth-strategy)
- **lines and trunks**: `GET /lines` and `GET /trunks` of wazo-calld now accept
  the `limit`, `offset`, `order` and `direction` parameters; items are sorted by
  name by default

## Bug Fixes
- **call logs/groups**: in the call logs of group calls, `requested_name` is now
  the group's label and `destination_name` the member who answered
- **call logs/forwards**: a call that a group forwards to an external number
  (no answer, full, out of schedule) is now logged as a forwarded call, with the
  dialed number as destination
- **telephony engine**: fixed an Asterisk freeze of all SIP processing when a
  channel masquerade overlapped a `res_pjsip` reload
- **DHCP integration**: AppArmor no longer blocks DHCP leases from reaching
  the provisioning server
- **upgrade**: upgrades no longer time out when resetting unassociated devices
  on systems with many lines
- **contact directories**: `limit=0` now returns an empty page on all list
  endpoints, and all endpoints return errors in the standard format
- **plugins**: `min_wazo_version` and `max_wazo_version` of a plugin are now
  validated, with clearer errors

## Security
- **phone provisioning**: with a provisioning key required, invalid key attempts
  are now reported to fail2ban, keys are no longer written to logs, and HTTPS
  provisioning requests are rate limited

## Maintenance
- **telephony engine**: Asterisk upgraded to 22.12.0
- **groups**: the `weight_random` ring strategy is no longer accepted; existing
  groups using it are migrated to `random`
- **webhooks**: the deprecated `subscribe_to_event_names` and
  `unsubscribe_from_event_names` methods are removed for custom wazo-webhookd
  plugins (see the [upgrade notes](/uc-doc/upgrade/upgrade_notes#26-11)), and
  `/status` now reports failing bus subscriptions
- **monitoring**: removed the obsolete chan_sip munin plugins

## Performance
- **contact directories/Google**: each account's Google contacts are now cached
  (5 minutes by default, see `google_backend.contacts_cache_ttl`), for faster
  lookups and far fewer calls to Google
- **REST APIs**: browsers now cache CORS preflight answers for two hours, saving
  a round trip on repeated API calls from web clients
- **lines and trunks**: wazo-calld now loads lines and trunks in pages at
  startup, avoiding timeouts on large systems
- **configuration generation**: SIP line settings are loaded with fewer database
  queries

See you at the next release review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#26-11)

<!-- truncate -->

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#26-11)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-26-11-released).
