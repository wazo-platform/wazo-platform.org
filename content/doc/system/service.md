---
title: 'wazo-service'
---

-   [Usage](#usage)

Wazo has many running services. To restart the whole stack, the
`wazo-service` command can be used to make sure the service is restarted
in the right order.

Usage
=====

Show all services status:

    wazo-service status

Stop XiVO services:

    wazo-service stop

Start XiVO services:

    wazo-service start

Restart XiVO services:

    wazo-service restart

The commands above will only act upon Wazo services. Appending an
argument `all` will also act upon `nginx` and `postgresql`. Example:

    wazo-service restart all

UDP port 5060 will be closed while services are restarting.
