---
title: Log Files
---

- [asterisk](#asterisk)
- [wazo-auth](#wazo-auth)
- [wazo-agid](#wazo-agid)
- [wazo-calld](#wazo-calld)
- [wazo-dird](#wazo-dird)
- [wazo-upgrade](#wazo-upgrade)
- [wazo-agentd](#wazo-agentd)
- [wazo-amid](#wazo-amid)
- [wazo-call-logd](#wazo-call-logd)
- [wazo-confd](#wazo-confd)
- [wazo-confgend](#wazo-confgend)
- [wazo-phoned](#wazo-phoned)
- [wazo-dxtora](#wazo-dxtora)
- [wazo-provd](#wazo-provd)
- [wazo-purge-db](#wazo-purge-db)
- [wazo-stat](#wazo-stat)
- [xivo-sysconfd](#xivo-sysconfd)
- [wazo-websocketd](#wazo-websocketd)

Every Wazo service has its own log file, placed in `/var/log`.

## asterisk

The Asterisk log files are managed by logrotate.

It's configuration files `/etc/logrotate.d/asterisk` and `/etc/asterisk/logger.conf`

The message log level is enabled by default in `logger.conf` and contains notices, warnings and
errors. The full log entry is commented in `logger.conf` and should only be enabled when verbose
debugging is required. Using this option in production would produce VERY large log files.

- Files location: `/var/log/asterisk/\*`
- Number of archived files: 15
- Rotation frequence: Daily

## wazo-auth {#wazo-auth}

- File location: `/var/log/wazo-auth.log`
- Rotate configuration: `/etc/logrotate.d/wazo-auth`
- Number of archived files: 15
- Rotation frequence: Daily

## wazo-agid

- File location: `/var/log/wazo-agid.log`
- Rotate configuration: `/etc/logrotate.d/wazo-agid`
- Number of archived files: 15
- Rotation frequence: Daily

## wazo-calld

- File location: `/var/log/wazo-calld.log`
- Rotate configuration: `/etc/logrotate.d/wazo-calld`
- Number of archived files: 15
- Rotation frequence: Daily

## wazo-dird {#wazo-dird}

- File location: `/var/log/wazo-dird.log`
- Rotate configuration: `/etc/logrotate.d/wazo-dird`
- Number of archived files: 15
- Rotation frequence: Daily

## wazo-upgrade

- File location: `/var/log/wazo-upgrade.log`
- Rotate configuration: `/etc/logrotate.d/wazo-upgrade`
- Number of archived files: 15
- Rotation frequence: Daily

## wazo-agentd

- File location: `/var/log/wazo-agentd.log`
- Rotate configuration: `/etc/logrotate.d/wazo-agentd`
- Number of archived files: 15
- Rotation frequence: Daily

## wazo-amid

- File location: `/var/log/wazo-amid.log`
- Rotate configuration: `/etc/logrotate.d/wazo-amid`
- Number of archived files: 15
- Rotation frequence: Daily

## wazo-call-logd

- File location: `/var/log/wazo-call-logd.log`
- Rotate configuration: `/etc/logrotate.d/wazo-call-logd`
- Number of archived files: 15
- Rotation frequence: Daily

## wazo-confd {#wazo-confd}

- File location: `/var/log/wazo-confd.log`
- Rotate configuration: `/etc/logrotate.d/wazo-confd`
- Number of archived files: 15
- Rotation frequence: Daily

## wazo-confgend {#wazo-confgend}

The wazo-confgend daemon output is sent to the file specified with the `--logfile` parameter when
launched with twistd.

The file location can be changed by customizing the wazo-confgend.service unit file.

- File location: `/var/log/wazo-confgend.log`
- Rotate configuration: `/etc/logrotate.d/wazo-confgend`
- Number of archived files: 15
- Rotation frequence: Daily

## wazo-phoned {#wazo-phoned}

- File location: `/var/log/wazo-phoned.log`
- Rotate configuration: `/etc/logrotate.d/wazo-phoned`
- Number of archived files: 15
- Rotation frequence: Daily

## wazo-dxtora

- File location: `/var/log/wazo-dxtora.log`
- Rotate configuration: `/etc/logrotate.d/wazo-dxtora`
- Number of archived files: 15
- Rotation frequence: Daily

## wazo-provd

- File location: `/var/log/wazo-provd.log`
- Rotate configuration: `/etc/logrotate.d/wazo-provd`
- Number of archived files: 15
- Rotation frequence: Daily

## wazo-purge-db {#wazo-purge-db}

- File location: `/var/log/wazo-purge-db.log`
- Rotate configuration: `/etc/logrotate.d/wazo-purge-db`
- Number of archived files: 15
- Rotation frequence: Daily

## wazo-stat

- File location: `/var/log/wazo-stat.log`
- Rotate configuration: `/etc/logrotate.d/wazo-stat`
- Number of archived files: 15
- Rotation frequence: Daily

## xivo-sysconfd

- File location: `/var/log/xivo-sysconfd.log`
- Rotate configuration: `/etc/logrotate.d/xivo-sysconfd`
- Number of archived files: 15
- Rotation frequence: Daily

## wazo-websocketd

- File location: `/var/log/wazo-websocketd.log`
- Rotate configuration: `/etc/logrotate.d/wazo-websocketd`
- Number of archived files: 15
- Rotation frequence: Daily
