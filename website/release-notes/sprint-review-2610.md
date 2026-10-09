---
title: Wazo Platform 26.10 Released
date: 2026-10-12T08:00:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2610
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 26.10 release.

## New Features in this release
- **authentication/sessions**: sessions now expose their user agent, creation
  and expiration dates, to help identify which application opened them
- **outgoing calls/caller ID**: users can now set a default outgoing caller ID,
  used by devices that cannot select one per call, such as hardware phones. See
  [Default Caller ID selection](/uc-doc/administration/callerid#default-caller-id)

## Bug Fixes
- **outgoing calls/caller ID**: the caller ID stored on a user is now formatted
  for the trunk, and validated when set
- **groups/do not disturb**: a user's DND state on groups is now kept after an
  Asterisk or wazo-calld restart
- **telephony engine**: fixed an Asterisk crash on SIP response retransmission
  during call hangup
- **configuration management/SIP transports**: PJSIP transports now accept IPv6
  addresses with a port or a scope identifier
- **auth**: the `Strict-Transport-Security` header is now sent on `/api/auth/`
  responses
- **upgrade**: `wazo-dist-upgrade` no longer uses the end-of-life
  `bullseye-security` Debian mirror
- **upgrade**: upgrades no longer stop on a locally modified nginx site
  configuration; custom TLS certificates are kept. Also backported to 26.09 (see
  the [26.09 upgrade notes](/uc-doc/upgrade/upgrade_notes#26-09))
- **phone provisioning/Snom**: improved directory key provisioning for Snom
  phones

## Maintenance
- **telephony engine**: Asterisk upgraded to 22.11.0
- **auth**: less log noise when services start before wazo-auth is reachable

## Performance
- **contact directories**: faster searches in phonebooks and personal contacts
  on large directories
- **contact directories/reverse lookup**: more efficient reverse lookups on
  `wazo` sources for large deployments; their `first_matched_columns` are now
  validated and limited to a subset of user fields

See you at the next release review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#26-10)

<!-- truncate -->

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#26-10)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-26-10-released).
