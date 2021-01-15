---
title: 'wazo-service'
---

- [Usage](#usage)

Wazo has many running services. To restart the whole stack, the `wazo-service` command can be used
to make sure the service is restarted in the right order.

## Usage

Show all services status:

```shell
wazo-service status
```

Stop Wazo services:

```shell
wazo-service stop
```

Start Wazo services:

```shell
wazo-service start
```

Restart Wazo services:

```shell
wazo-service restart
```

The commands above will only act upon Wazo services. Appending an argument `all` will also act upon
`nginx` and `postgresql`. Example:

```shell
wazo-service restart all
```

UDP port 5060 will be closed while services are restarting.
