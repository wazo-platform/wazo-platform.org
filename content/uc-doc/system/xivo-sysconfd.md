---
title: 'xivo-sysconfd'
---

- [Configuration File](#sysconfd-configuration)
  - [request_handlers section](#request-handlers-section)

xivo-sysconfd is the system configuration server for Wazo. It does quite a few different things;
here\'s a non exhaustive list:

- configuring network (hostname, DNS)
- configuring high availability
- staring/stopping/restarting services
- reloading asterisk configuration
- sending some events to components (wazo-agentd)

# Configuration File {#sysconfd-configuration}

Default location: `/etc/xivo/sysconfd.conf`. Format: INI.

The default location may be overwritten by the command line options.

Here\'s an example of the configuration file:

    [general]
    xivo_config_path = /etc/xivo
    templates_path = /usr/share/xivo-sysconfd/templates
    custom_templates_path = /etc/xivo/sysconfd/custom-templates
    backup_path = /var/backups/xivo-sysconfd

    [resolvconf]
    hostname_file = /etc/hostname
    hostname_update_cmd = /etc/init.d/hostname.sh start
    hosts_file = /etc/hosts
    resolvconf_file = /etc/resolv.conf

    [wizard]
    templates_path = /usr/share/xivo-config/templates
    custom_templates_path = /etc/xivo/custom-templates

    [commonconf]
    commonconf_file = /etc/xivo/common.conf
    commonconf_cmd = /usr/sbin/xivo-update-config
    commonconf_monit = /usr/sbin/xivo-monitoring-update

    [monit]
    monit_checks_dir = /usr/share/xivo-monitoring/checks
    monit_conf_dir = /etc/monit/conf.d

    [request_handlers]
    synchronous = false

    [bus]
    username = guest
    password = guest
    host = localhost
    port = 5672
    exchange_name = xivo
    exchange_type = topic
    exchange_durable = true

## request_handlers section {#request-handlers-section}

synchronous

: If this option is true, when xivo-sysconfd receives a request to reload the dialplan for example,
it will wait for the dialplan reload to complete before replying to the request.

    When this option is false, xivo-sysconfd reply to the request
    immediately.

    Setting this option to false will speed up some operation (for
    example, editing a user from the web interface or from wazo-confd),
    but this means that there will be a small delay (up to a few seconds
    in the worst case) between the time you create your user and the
    time you can dial successfully its extension.
