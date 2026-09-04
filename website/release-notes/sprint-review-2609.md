---
title: Wazo Platform 26.09 Released
date: 2026-09-08T08:00:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2609
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 26.09 release.

## New Features in this release
- **call control**: DTMF `A`, `B`, `C` and `D` are now accepted by the calls
  and applications DTMF endpoints, in addition to `0-9`, `*` and `#`. Letters
  are case-insensitive
- **auth/scaling**: wazo-auth can now run as multiple coordinated processes

## Bug Fixes
- **call routing**: fixed the simultaneous call limit being compared as a
  string in the dialplan, so users with 10 or more simultaneous calls
  configured hit the channel limit on transfers and conferences
- **directories/office365**: fixed Microsoft 365 contacts not being displayed
  on phones
- **directories/favorites**: the favorites service now applies
  `services.favorites.options.timeout` from the profile
- **directories/phonebook**: fixed phonebook contact creation and edition
  inserting duplicate `id` rows in database
- **cdr**: fixed call log generation failing with
  `call_log.destination_participant` when a call has several source or
  destination participants; the destination now prefers the participant who
  answered
- **cdr**: fixed error in call log generation for channels
  whose extension contains a dot (e.g. `Local/01.23.45.67.89@...`)
- **cdr**: fixed ring group (ring-all strategy) CDRs showing the wrong
  answering member when that member had two channels on the same line
- **upgrade**: wazo-upgrade is more robust: failures during the upgrade are now
  detected and reported instead of being silently ignored

## Maintenance
- **auth**: Wazo services now reach wazo-auth through nginx
  (`http://localhost/api/auth`) instead of `localhost:9497`; internal requests
  are logged in `/var/log/nginx/wazo-internal.access.log`
- **directories**: the `wazo` directory source now keys contacts and favorites
  on the confd user `uuid` instead of the numeric user id.

## Performance
- **auth**: faster token validation under load: access rules are now compiled
  once and shared by every user with the same policies, instead of being
  rebuilt on every request
- **auth**: nginx now keeps upstream connections to wazo-auth alive instead of
  opening one per request
- **directories/favorites**: favorites listing loads contacts from wazo-confd
  with batched `uuid` filters instead of fetching and filtering the whole user
  list
- **directories/phonebook**: phonebook contact listing is paginated and sorted
  in the database instead of loading the whole phonebook in memory
- **directories**: wazo-dird reuses the request-scoped token instead of
  fetching it again from wazo-auth on lookup, favorites and personal endpoints
- **call control**: wazo-calld no longer queries wazo-confd for a switchboard
  with an empty uuid on every channel leaving a bridge

## Ongoing Features
- **directories**: latency improvements to the lookup service for large
  directories

See you at the next release review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#26-09)

<!-- truncate -->

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#26-09)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-26-09-released).
