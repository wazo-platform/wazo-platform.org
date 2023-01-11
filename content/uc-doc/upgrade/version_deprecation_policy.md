---
title: Deprecated Wazo versions
---

## General policy

On January 1st of every year, Wazo versions that are more than 4 years old will be considered as
deprecated.

Planned deprecation calendar:

| Date       | Deprecated versions |
| ---------- | ------------------- |
| 2022-01-01 | older than 18.01    |
| 2023-01-01 | older than 19.01    |
| 2024-01-01 | older than 20.01    |
| 2025-01-01 | older than 21.01    |

### What does it mean to be in a deprecated version?

- A deprecated Wazo version does not have a supported upgrade path directly to the latest Wazo
  version. This means that running a straight `wazo-upgrade` is not guaranteed to succeed.
- Asking questions about a deprecated version (e.g. on the forum) will probably get the following
  answer: "get a newer version first, then come back and ask your question".

### Why are versions being deprecated?

- Hosting the binaries of older versions is costly and mostly useless: most people install the
  latest version of Wazo, and the very few cases where an old binary is needed is not worth the
  cost.
- Maintaining the upgrade machinery for older versions is time-consuming for developers: the more
  versions are supported by the upgrade, the more cases there are to handle; more cases make the
  code harder to read, understand and modify, bugs become more probable and the latest upgrades are
  more difficult to write.
- There are very few Wazo installed with older versions, as far as we can tell: all software should
  be upgraded frequently and Wazo is no exception. We consider 4 years to be a reasonable time range
  to upgrade at least once an IPBX. We do not want to hinder development for the very few who did
  not take the time to upgrade.

### I have a deprecated version. What are my options?

There are two main options:

- upgrade to a Wazo version that is more recent, but not the latest: you can use the procedures
  listed in [Upgrade to a specific version of Wazo](/uc-doc/upgrade/upgrade_specific_version).
- install a new server with the latest Wazo version, and reproduce your configuration by using the
  export/import features of Wazo and copying files
