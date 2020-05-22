---
title: wazo-purge-db
---

Keeping records of personal communications for long periods may be
subject to local legislation, to avoid personal data retention. Also,
keeping too many records may become resource intensive for the server.
To ease the removal of such records, `wazo-purge-db` is a process that
removes old log entries from the database. This allows keeping records
for a maximum period and deleting older ones.

By default, wazo-purge-db removes all logs older than a year (365 days),
except for webhookd logs where only 30 days are kept. wazo-purge-db is
run nightly.

#:exclamation: Please check the laws applicable to your country and modify
`days_to_keep` (see below) in the configuration file accordingly.

Records Purged
==============

The following features are impacted by wazo-purge-db:

-   [Call Logs](/uc-doc/administration/call_logs)
-   Call center statistics

More technically, `wazo-purge-db` have a set of plugins, each plugin are
responsible of certain type of record (usually a postgresql table).

The format of the following list is `plugin-name` (`associated table`) :

-   `call-log` (`call_log`)
-   `cel` (`cel`)
-   `queue-log` (`queue_log`)
-   `stat-agent` (`stat_agent_periodic`)
-   `stat-call` (`stat_call_on_queue`)
-   `stat-queue` (`stat_queue_periodic`)
-   `stat-switchboard` (`stat_switchboard_queue`)
-   `webhookd-logs` (`webhookd_subscription_log`)

Configuration File {#purge_logs_config_file}
==================

We recommend to override the setting `days_to_keep` from
`/etc/wazo-purge-db/config.yml` in a new file in
`/etc/wazo-purge-db/conf.d/`.

The `days_to_keep` configuration can be done per plugin if needed, by
setting `days_to_keep_per_plugin` for example:

    days_to_keep_per_plugin:
        webhookd-logs: 30

#:warning: Setting `days_to_keep` to 0 will NOT disable `wazo-purge-db`, and will
remove ALL logs from your system.

See [Configuration priority](/uc-doc/system/configuration_files#configuration-priority) and
`/etc/wazo-purge-db/config.yml` for more details.

Manual Purge
============

It is possible to purge logs manually. To do so, log on to the target
Wazo server and run:

    wazo-purge-db

You can specify the number of days of logs to keep. For example, to
purge entries older than 365 days:

    wazo-purge-db -d 365

Usage of `wazo-purge-db`:

    usage: wazo-purge-db [-h] [-d DAYS_TO_KEEP]

    optional arguments:
      -h, --help            show this help message and exit
      -d DAYS_TO_KEEP, --days_to_keep DAYS_TO_KEEP
                            Number of days data will be kept in tables

Maintenance
===========

After an execution of `wazo-purge-db`, postgresql\'s [Autovacuum
Daemon](https://www.postgresql.org/docs/11/static/routine-vacuuming.html#AUTOVACUUM)
should perform a
[VACUUM](https://www.postgresql.org/docs/11/static/sql-vacuum.html)
ANALYZE automatically (after 1 minute). This command marks memory as
reusable but does not actually free disk space, which is fine if your
disk is not getting full. In the case when `wazo-purge-db` hasn\'t run
for a long time (e.g. upgrading to 15.11 or when
[days_to_keep](/uc-doc/system/purge_logs#purge-logs-config-file) is
decreased), some administrator may want to perform a
[VACUUM](https://www.postgresql.org/docs/11/static/sql-vacuum.html) FULL
to recover disk space.

#:warning: VACUUM FULL will require a service interruption. This may take several
hours depending on the size of purged database.

You need to:

    $ wazo-service stop
    $ sudo -u postgres psql asterisk -c "VACUUM (FULL)"
    $ wazo-service start

Archive Plugins
===============

In the case you want to keep archives of the logs removed by
wazo-purge-db, you may install plugins to wazo-purge-db that will be run
before the purge.

Wazo does not provide any archive plugin. You will need to develop
plugins for your own need. If you want to share your plugins, please
open a [pull
request](https://github.com/wazo-platform/wazo-purge-db/pulls).

Archive Plugins (for Developers)
================================

Each plugin is a Python callable (function or class constructor), that
takes a dictionary of configuration as argument. The keys of this
dictionary are the keys taken from the configuration file. This allows
you to add plugin-specific configuration in
`/etc/wazo-purge-db/conf.d/`.

There is an example plugin in the [wazo-purge-db git
repo](https://github.com/wazo-platform/wazo-purge-db/tree/master/contribs).

Example
-------

Archive name: sample

Purpose: demonstrate how to create your own archive plugin.

### Activate Plugin

Each plugin needs to be explicitly enabled in the configuration of
`wazo-purge-db`. Here is an example of file added in
`/etc/wazo-purge-db/conf.d/`:

``` {.sourceCode .yaml}
enabled_plugins:
    archives:
        - sample
```

### sample.py

The following example will be save a file in `/tmp/wazo_purge_db.sample`
with the following content:

    Save tables before purge. 365 days to keep!

``` {.sourceCode .python}
sample_file = '/tmp/wazo_purge_db.sample'
```

> def sample\_plugin(config):
>
> :
>
>     with open(sample\_file, \'w\') as output:
>
>     :   output.write(\'Save tables before purge. {0} days to
>         keep!\'.format(config\[\'days\_to\_keep\'\]))
>
### Install sample plugin

The following `setup.py` shows an example of a python library that adds
a plugin to wazo-purge-db:

``` {.sourceCode .python}
#!/usr/bin/env python
# -*- coding: utf-8 -*-

from setuptools import setup
from setuptools import find_packages


setup(
    name='wazo-purge-db-sample-plugin',
    version='0.0.1',

    description='An example program',
    packages=find_packages(),
    entry_points={
        'wazo_purge_db.archives': [
            'sample = wazo_purge_db_sample.sample:sample_plugin',
        ],
    }
)
```
