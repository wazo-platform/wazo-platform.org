---
title: Nginx
---

Wazo use nginx as a web server and reverse proxy.

It listens on two entry points:

- TCP/443, for the clients of the public API. Plain HTTP on TCP/80 is redirected to it. The services
  reachable this way are the ones enabled in `/etc/nginx/locations/https-enabled`:

  - The agent management server (wazo-agentd)
  - The authentication server (wazo-auth)
  - The configuration server (wazo-confd)
  - The telephony service interface (wazo-calld)
  - The directory service (wazo-dird)
  - The AMI HTTP interface (wazo-amid)
  - The websocket interface (wazo-websocketd)
  - Asterisk WebSocket (xivo-config)

- `127.0.0.1:80`, for the requests the Wazo services send to each other, from the locations enabled
  in `/etc/nginx/locations/http-enabled`. This entry point is bound to the loopback interface and is
  not reachable from outside the machine. Its requests are logged in
  `/var/log/nginx/wazo-internal.access.log`.

An administrator can allow or disallow a service on the public API by creating or removing a
symbolic link inside `/etc/nginx/locations/https-enabled`, pointing to the corresponding file in
`/etc/nginx/locations/https-available`, then reloading nginx.

For example, to enable all the available services:

```shell
ln -sf /etc/nginx/locations/https-available/* /etc/nginx/locations/https-enabled
systemctl reload nginx
```

To disable all the services other than the web interface:

```shell
rm /etc/nginx/locations/https-enabled/*
systemctl reload nginx
```

The `http-available` and `http-enabled` directories work the same way, but for the internal entry
point: removing a location there prevents the other Wazo services from reaching that service.

Rate limiting is defined in `/etc/nginx/sites-available/wazo`. It is applied to unauthenticated
resources only at the moment.
