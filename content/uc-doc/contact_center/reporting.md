---
title: Reporting
---

The supported way to consume Wazo support center statistics is to use the HTTP API.

## General Architecture {#general-architecture}

1. The `queue_log` table of the `asterisk` database is filled by events from Asterisk and by custom
   dialplan events
2. `wazo-stat fill_db` is then used to:

- read data from the `queue_log` table
- read active queues and agents from wazo-confd
- generate statistics in database

**Note**: Statistics are generated (via `wazo-stat fill_db`) every 6 hours by a cron job
