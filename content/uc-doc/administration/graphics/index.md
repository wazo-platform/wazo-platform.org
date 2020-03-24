---
title: Graphics
---

-   [Troubleshooting](#troubleshooting)
    -   [Missing graphs](#missing-graphs)

There are graphics, locate to
`/var/cache/munin/www/localdomain/localhost.localdomain/`{.interpreted-text
role="file"}, that give a historical overview of a Wazo system\'s
activity based on snapshots recorded every 5 minutes. Graphics are
available for the following resources :

-   `cpu-*.png`{.interpreted-text role="file"}
-   `entropy-*.png`{.interpreted-text role="file"}
-   `interrupts-*.png`{.interpreted-text role="file"}
-   `irqstats-*.png`{.interpreted-text role="file"}
-   `load-*.png`{.interpreted-text role="file"}
-   `memory-*.png`{.interpreted-text role="file"}
-   `open_files-*.png`{.interpreted-text role="file"}
-   `open_inodes-*.png`{.interpreted-text role="file"}
-   `swap-*.png`{.interpreted-text role="file"}

Each graphic is available with different time range: `day`, `week`,
`month`, `year`

<a name="troubleshooting"></a>Troubleshooting
===============

Missing graphs
--------------

Symptoms:

-   daily graphs are missing
-   weekly/monthly/yearly graphs stop updating
-   a mail is sent from cron every 5 minutes about a \"bad magic
    number\"

Cause:

-   the machine was forcefully stopped, while munin (responsible for the
    graphs) was running, resulting in a file corruption

Resolution:

-   Run the following command:

        rm /var/lib/munin/htmlconf.storable /var/lib/munin/limits.storable

-   The graphs will be restored on the next run of munin, in the next 5
    minutes.
