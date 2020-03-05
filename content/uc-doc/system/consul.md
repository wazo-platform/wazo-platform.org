---
title: Consul
---

The default [consul](https://consul.io) installation in Wazo uses the
configuration file in `/etc/consul/xivo/*.json`. All files in this
directory are installed with the package and *should not* be modified
by the administrator. To use a different configuration, the
adminstrator can add it's own configuration file at another location
and set the new configuration directory by creating a systemd unit
drop-in file in the `/etc/systemd/system/consul.service.d` directory.

The default installation generates a master token that can be
retrieved in `/var/lib/consul/master_token`. This master token will
not be used if a new configuration is supplied.

Variables
=========

The following environment variables can be overridden in a systemd unit
drop-in file:

-   `CONFIG_DIR`: the consul configuration directory
-   `WAIT_FOR_LEADER`: should the "start" action wait for a leader ?

Example, in
`/etc/systemd/system/consul.service.d/custom.conf`:

    [Service]
    Environment=CONFIG_DIR=/etc/consul/agent
    Environment=WAIT_FOR_LEADER=no

Agent mode
==========

It is possible to run consul on another host and have the local consul
node run as an agent only.

To get this kind of setup up and running, you will need to follow the
following steps.

Downloading Consul
------------------

For a 32 bits system

```ShellSession
# wget --no-check-certificate https://releases.hashicorp.com/consul/0.5.2/consul_0.5.2_linux_386.zip
```

For a 64 bits system

```ShellSession
# wget --no-check-certificate https://releases.hashicorp.com/consul/0.5.2/consul_0.5.2_linux_amd64.zip
```

Installing Consul on a new host
-------------------------------

```ShellSession
# unzip consul_0.5.2_linux_386.zip
```

Or

```ShellSession
# unzip consul_0.5.2_linux_amd64.zip
```

```ShellSession
# mv consul /usr/bin/consul
# mkdir -p /etc/consul/xivo
# mkdir -p /var/lib/consul
# adduser --quiet --system --group --no-create-home \
        --home /var/lib/consul consul
```

Copying the consul configuration from the Wazo to a new host
------------------------------------------------------------

On the new consul host, modify
`/etc/consul/xivo/config.json` to include
to following lines.

```Javascript
"bind_addr": "0.0.0.0",
"client_addr": "0.0.0.0",
"advertise_addr": "<consul-host>"
```

```ShellSession
# # on the consul host
# scp root@<wazo-host>:/lib/systemd/system/consul.service /lib/systemd/system
# systemctl daemon-reload
# scp -r root@<wazo-host>:/etc/consul /etc
# scp -r root@<wazo-host>:/usr/share/xivo-certs /usr/share
# consul agent -data-dir /var/lib/consul -config-dir /etc/consul/xivo/
```

#:exclamation: To start consul with the systemd unit file, you may need to change owner
and group (consul:consul) for all files inside
`/etc/consul`,
`/usr/share/xivo-certs` and
`/var/lib/consul`

Adding the agent configuration
------------------------------

Create the file `/etc/consul/agent/config.json`{.interpreted-text
role="file"} with the following content

``` {.sourceCode .javascript}
{
    "acl_datacenter": "<node_name>",
    "datacenter": "xivo",
    "server": false,
    "bind_addr": "0.0.0.0",
    "advertise_addr": "<wazo_address>",
    "client_addr": "127.0.0.1",
    "bootstrap": false,
    "rejoin_after_leave": true,
    "data_dir": "/var/lib/consul",
    "enable_syslog": true,
    "disable_update_check": true,
    "log_level": "INFO",
    "ports": {
        "dns": -1,
        "http": -1,
        "https": 8500
    },
    "retry_join": [
        "<remote_host>"
    ],
    "cert_file": "/usr/share/xivo-certs/server.crt",
    "key_file": "/usr/share/xivo-certs/server.key"
}
```

-   `node_name`: Arbitrary name to give this node, `wazo-paris` for
    example.
-   `remote_host`: IP address of your new consul. Be sure the host is
    accessible from your Wazo and check the firewall. See the
    documentation [here](../contributors/network).
-   `wazo_address`: IP address of your Wazo.

This file should be owned by consul user.

```ShellSession
# chown -R consul:consul /etc/consul/agent
```

Enabling the agent configuration
--------------------------------

Add or modify
`/etc/systemd/system/consul.service.d/custom.conf` to include the following lines:

    [Service]
    Environment=CONFIG_DIR=/etc/consul/agent

Restart your consul server.

```ShellSession
# service consul restart
```
