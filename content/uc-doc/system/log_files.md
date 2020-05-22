---
title: Log Files
---

-   [asterisk](#asterisk)
-   [wazo-auth](#wazo-auth)
-   [wazo-agid](#wazo-agid)
-   [wazo-calld](#wazo-calld)
-   [wazo-dird](#wazo-dird)
-   [wazo-upgrade](#wazo-upgrade)
-   [wazo-agentd](#wazo-agentd)
-   [wazo-amid](#wazo-amid)
-   [wazo-call-logd](#wazo-call-logd)
-   [wazo-confd](#wazo-confd)
-   [wazo-confgend](#wazo-confgend)
-   [wazo-phoned](#wazo-phoned)
-   [wazo-dxtora](#wazo-dxtora)
-   [wazo-provd](#wazo-provd)
-   [wazo-purge-db](#wazo-purge-db)
-   [xivo-stat](#xivo-stat)
-   [xivo-sysconfd](#xivo-sysconfd)
-   [wazo-websocketd](#wazo-websocketd)

Every Wazo service has its own log file, placed in
`/var/log`{.interpreted-text role="file"}.

asterisk
========

The Asterisk log files are managed by logrotate.

It\'s configuration files `/etc/logrotate.d/asterisk`{.interpreted-text
role="file"} and `/etc/asterisk/logger.conf`{.interpreted-text
role="file"}

The message log level is enabled by default in
`logger.conf`{.interpreted-text role="file"} and contains notices,
warnings and errors. The full log entry is commented in
`logger.conf`{.interpreted-text role="file"} and should only be enabled
when verbose debugging is required. Using this option in production
would produce VERY large log files.

-   Files location: `/var/log/asterisk/\*`{.interpreted-text
    role="file"}
-   Number of archived files: 15
-   Rotation frequence: Daily

wazo-auth {#wazo-auth}
=========

-   File location: `/var/log/wazo-auth.log`{.interpreted-text
    role="file"}
-   Rotate configuration: `/etc/logrotate.d/wazo-auth`{.interpreted-text
    role="file"}
-   Number of archived files: 15
-   Rotation frequence: Daily

wazo-agid
=========

-   File location: `/var/log/wazo-agid.log`{.interpreted-text
    role="file"}
-   Rotate configuration: `/etc/logrotate.d/wazo-agid`{.interpreted-text
    role="file"}
-   Number of archived files: 15
-   Rotation frequence: Daily

wazo-calld
==========

-   File location: `/var/log/wazo-calld.log`{.interpreted-text
    role="file"}
-   Rotate configuration:
    `/etc/logrotate.d/wazo-calld`{.interpreted-text role="file"}
-   Number of archived files: 15
-   Rotation frequence: Daily

wazo-dird {#wazo-dird}
=========

-   File location: `/var/log/wazo-dird.log`{.interpreted-text
    role="file"}
-   Rotate configuration: `/etc/logrotate.d/wazo-dird`{.interpreted-text
    role="file"}
-   Number of archived files: 15
-   Rotation frequence: Daily

wazo-upgrade
============

-   File location: `/var/log/wazo-upgrade.log`{.interpreted-text
    role="file"}
-   Rotate configuration:
    `/etc/logrotate.d/wazo-upgrade`{.interpreted-text role="file"}
-   Number of archived files: 15
-   Rotation frequence: Daily

wazo-agentd
===========

-   File location: `/var/log/wazo-agentd.log`{.interpreted-text
    role="file"}
-   Rotate configuration:
    `/etc/logrotate.d/wazo-agentd`{.interpreted-text role="file"}
-   Number of archived files: 15
-   Rotation frequence: Daily

wazo-amid
=========

-   File location: `/var/log/wazo-amid.log`{.interpreted-text
    role="file"}
-   Rotate configuration: `/etc/logrotate.d/wazo-amid`{.interpreted-text
    role="file"}
-   Number of archived files: 15
-   Rotation frequence: Daily

wazo-call-logd
==============

-   File location: `/var/log/wazo-call-logd.log`{.interpreted-text
    role="file"}
-   Rotate configuration:
    `/etc/logrotate.d/wazo-call-logd`{.interpreted-text role="file"}
-   Number of archived files: 15
-   Rotation frequence: Daily

wazo-confd {#wazo-confd}
==========

-   File location: `/var/log/wazo-confd.log`{.interpreted-text
    role="file"}
-   Rotate configuration:
    `/etc/logrotate.d/wazo-confd`{.interpreted-text role="file"}
-   Number of archived files: 15
-   Rotation frequence: Daily

wazo-confgend {#wazo-confgend}
=============

The wazo-confgend daemon output is sent to the file specified with the
`--logfile` parameter when launched with twistd.

The file location can be changed by customizing the
wazo-confgend.service unit file.

-   File location: `/var/log/wazo-confgend.log`{.interpreted-text
    role="file"}
-   Rotate configuration:
    `/etc/logrotate.d/wazo-confgend`{.interpreted-text role="file"}
-   Number of archived files: 15
-   Rotation frequence: Daily

wazo-phoned {#wazo-phoned}
===========

-   File location: `/var/log/wazo-phoned.log`{.interpreted-text
    role="file"}
-   Rotate configuration:
    `/etc/logrotate.d/wazo-phoned`{.interpreted-text role="file"}
-   Number of archived files: 15
-   Rotation frequence: Daily

wazo-dxtora
===========

-   File location: `/var/log/wazo-dxtora.log`{.interpreted-text
    role="file"}
-   Rotate configuration:
    `/etc/logrotate.d/wazo-dxtora`{.interpreted-text role="file"}
-   Number of archived files: 15
-   Rotation frequence: Daily

wazo-provd
==========

-   File location: `/var/log/wazo-provd.log`{.interpreted-text
    role="file"}
-   Rotate configuration:
    `/etc/logrotate.d/wazo-provd`{.interpreted-text role="file"}
-   Number of archived files: 15
-   Rotation frequence: Daily

wazo-purge-db {#purge-logs}
=============

-   File location: `/var/log/wazo-purge-db.log`{.interpreted-text
    role="file"}
-   Rotate configuration:
    `/etc/logrotate.d/wazo-purge-db`{.interpreted-text role="file"}
-   Number of archived files: 15
-   Rotation frequence: Daily

xivo-stat
=========

-   File location: `/var/log/xivo-stat.log`{.interpreted-text
    role="file"}
-   Rotate configuration: `/etc/logrotate.d/xivo-stat`{.interpreted-text
    role="file"}
-   Number of archived files: 15
-   Rotation frequence: Daily

xivo-sysconfd
=============

-   File location: `/var/log/xivo-sysconfd.log`{.interpreted-text
    role="file"}
-   Rotate configuration:
    `/etc/logrotate.d/xivo-sysconfd`{.interpreted-text role="file"}
-   Number of archived files: 15
-   Rotation frequence: Daily

wazo-websocketd
===============

-   File location: `/var/log/wazo-websocketd.log`{.interpreted-text
    role="file"}
-   Rotate configuration:
    `/etc/logrotate.d/wazo-websocketd`{.interpreted-text role="file"}
-   Number of archived files: 15
-   Rotation frequence: Daily
