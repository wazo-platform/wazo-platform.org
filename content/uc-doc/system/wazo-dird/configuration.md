---
title: 'wazo-dird configuration'
---

- [Main Configuration File](#main-configuration-file)
  - [Root section](#root-section)
  - [enabled_plugins section](#enabled-plugins-section)

There are three sources of configuration for wazo-dird:

- the [command line options](/uc-doc/system/wazo-dird/introduction#wazo-dird-usage)
- the main configuration file
- configuration done using the API

The command-line options have priority over the main configuration file options.

# Main Configuration File {#main-configuration-file}

Default location: `/etc/wazo-dird/config.yml`. Format: YAML

The default location may be overwritten by the command line options.

Here\'s an example of the main configuration file:

```{.sourceCode .yaml}
debug: False
log_filename: /var/log/wazo-dird.log
log_level: info
user: www-data

enabled_plugins:
   backends:
       csv: true
       ldap: true
       phonebook: true
   services:
       lookup: true
   views:
       cisco_view: true
       default_json: true
```

## Root section {#root-section}

debug

: Enable log debug messages. Overrides `log_level`. Default: `False`.

log_filename

: File to write logs to. Default: `/var/log/wazo-dird.log`.

log_level

: Logs messages with LOG_LEVEL details. Must be one of: `critical`, `error`, `warning`, `info`,
`debug`. Default: `info`.

user

: The owner of the process. Default: `www-data`.

## enabled_plugins section {#enabled-plugins-section}

This sections controls which plugins are to be loaded at wazo-dird startup. All plugin types must
have at least one plugin enabled, or wazo-dird will not start. For back-end plugins, sources using a
back-end plugin that is not enabled will be ignored.
