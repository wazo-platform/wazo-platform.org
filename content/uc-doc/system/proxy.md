---
title: Proxy Configuration
---

- [apt](#apt)
- [provd](#provd)
- [dhcp-update](#dhcp-update)
- [xivo-fetchfw](#xivo-fetchfw)
- [wazo-auth, wazo-dird](#wazo-auth-wazo-dird)

If you use Wazo behind an HTTP proxy, you must do a couple of manipulations for it to work
correctly.

## apt

Create the `/etc/apt/apt.conf.d/90proxy` file with the following content:

```ascii
Acquire::http::Proxy "http://domain\username:password@proxyip:proxyport";
```

## provd

Proxy information is set with `wazo-provd` endpoint `/provd/configuration/http_proxy`.

## dhcp-update

_This step is needed if you use the DHCP server of the Wazo. Otherwise the DHCP configuration won't
be correct._

Proxy information is set via the `/etc/xivo/dhcpd-update.conf` file.

Edit the file and look for the `[proxy]` section.

## xivo-fetchfw

_This step is not needed if you don\'t use xivo-fetchfw._

Proxy information is set via the `/etc/xivo/xivo-fetchfw.conf` file.

Edit the file and look for the `[proxy]` section.

## wazo-auth, wazo-dird

_This step is needed for external contacts integration, like Google or Microsoft Office 356, or any
other external source of contacts_

Add two files `/etc/systemd/system/wazo-auth.service.d/proxy.conf` and
`/etc/systemd/system/wazo-dird.service.d/proxy.conf` with the same content:

```ini
[Service]
Environment=HTTP_PROXY=myproxy:8000  # replace myproxy with your proxy host and 8000 with your proxy port
Environment=HTTPS_PROXY=myproxy:8000  # replace myproxy with your proxy host and 8000 with your proxy port for HTTPS
Environment=NO_PROXY=localhost,127.0.0.1,127.0.1.1
```

Then run the following commands:

```shell
systemctl daemon-reload
systemctl restart wazo-auth wazo-dird
```

## wazo-plugind

_This step is needed in order to install Wazo plugins._

Add a file `/etc/systemd/system/wazo-plugind.service.d/proxy.conf`:

```ini
[Service]
Environment=HTTP_PROXY=myproxy:8000  # replace myproxy with your proxy host and 8000 with your proxy port
Environment=HTTPS_PROXY=myproxy:8000  # replace myproxy with your proxy host and 8000 with your proxy port for HTTPS
Environment=NO_PROXY=localhost,127.0.0.1,127.0.1.1
```

Then run the following commands:

```shell
systemctl daemon-reload
systemctl restart wazo-plugind
```

## wazo-setupd

_This step is needed in order to connect your Wazo engine to an external management product._

Add a file `/etc/systemd/system/wazo-setupd.service.d/proxy.conf`:

```ini
[Service]
Environment=HTTP_PROXY=myproxy:8000  # replace myproxy with your proxy host and 8000 with your proxy port
Environment=HTTPS_PROXY=myproxy:8000  # replace myproxy with your proxy host and 8000 with your proxy port for HTTPS
Environment=NO_PROXY=localhost,127.0.0.1,127.0.1.1
```

Then run the following commands:

```shell
systemctl daemon-reload
systemctl restart wazo-setupd
```
