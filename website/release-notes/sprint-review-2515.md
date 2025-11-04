---
title: Wazo Platform 25.15 Released
date: 2025-10-30T19:00:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: release-review-2515
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 25.15 release.

## New features in this release

- **Debian 12 (Bookworm)**: As of 25.15, the Wazo Platform is now based on Debian 12 (Bookworm). As
  such, the upgrade procedure is slightly different and may take a little longer than standard
  upgrades. See the full [upgrade guide here](/uc-doc/upgrade/upgrade_notes_details/25-15/bookworm)
  for more information.

## Technical Features

- **Python 3.11**: As part of the upgrade to Debian 12, the Wazo platform now uses Python 3.11 and
  many Python libraries have been updated as well. So, if you have any custom script please ensure
  they are compatible with the newer versions.
- **PostgreSQL**: The database system PostgreSQL has also been upgrade from version 13 to 15.

## Bug fixes

- **Asterisk configuration**: asterisk configuration updates would generate spurious warnings
  about obsolete context `parkedcalls` being included but missing from dialplan; 
  default wazo-confgend dialplan template has been updated to avoid these warnings;
- **CDR**: CDRs for calls to ring groups with linear strategy would omit information
  on destination user receiving the call;
  this information is now available in `requested_internal_extension` field;
- **configuration API**: wazo-confd would not consistently handle HTTP request payloads as JSON, 
  depending on `Content-Type` header;
  request payload should now be parsed as JSON irrespective of presence of `Content-Type` header;
  requests with empty bodies are now rejected as bad requests(invalid JSON);

For more information on the aforementioned topics, please see the
[changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D25.15).

See you at the next sprint review!

## Resources

- [Install Wazo Platform](https://wazo-platform.org/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#25-15)
- [Detailed upgrade notes](/uc-doc/upgrade/upgrade_notes_details/25-15/bookworm)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#25-15)
- [Wazo Platform 25.15 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D25.15)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-25-15-released).
