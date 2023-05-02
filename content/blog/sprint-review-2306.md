---
title: Wazo Platform 23.06 Released
date: 2023-05-02T13:32:05
author: The Wazo Authors
category: Wazo Platform
tags: wazo-platform, development
slug: release-review-2306
status: published
---

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 23.06 release.

## New features in this release

- **Debian 11 (Bullseye)**: As of 23.06, the Wazo Platform is now based on Debian 11 (Bullseye). 
  As such, the upgrade procedure is slightly different and may take a little longer than standard upgrades. 
  See the full [upgrade guide here](/uc-doc/upgrade/upgrade_notes_details/23-06/bullseye) for more information.

## Technical Features

- **Python 3.9**: As part of the upgrade to Debian 11, the Wazo platform now uses Python 3.9 and many Python libraries have been updated as well. 
  So, if you have any custom script please ensure they are compatible with the newer versions.
- **PostgreSQL**: The database system PostgreSQL has also been upgrade from version 11 to 13.

For more information on the aforementioned topics, please see the [changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.06).

See you at the next sprint review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#23-06)
- [Detailed upgrade notes](/uc-doc/upgrade/upgrade_notes_details/23-06/bullseye)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#23-06)
- [Wazo Platform 23.06 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D23.06)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-23-06-released).