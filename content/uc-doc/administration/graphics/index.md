---
title: Graphics
---

There are graphics, locate to `/var/cache/munin/www/localdomain/localhost.localdomain/`, that give a
historical overview of a Wazo system's activity based on snapshots recorded every 5 minutes.
Graphics are available for the following resources :

- `cpu-*.png`
- `entropy-*.png`
- `interrupts-*.png`
- `irqstats-*.png`
- `load-*.png`
- `memory-*.png`
- `open_files-*.png`
- `open_inodes-*.png`
- `swap-*.png`

Each graphic is available with different time range: `day`, `week`, `month`, `year`

# Troubleshooting

## Missing graphs

Symptoms:

- daily graphs are missing
- weekly/monthly/yearly graphs stop updating
- a mail is sent from cron every 5 minutes about a "bad magic number"

Cause:

- the machine was forcefully stopped, while munin (responsible for the graphs) was running,
  resulting in a file corruption

Resolution:

- Run the following command:

  ```shell
  rm /var/lib/munin/htmlconf.storable /var/lib/munin/limits.storable
  ```

- The graphs will be restored on the next run of munin, in the next 5 minutes.
