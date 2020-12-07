---
title: Nginx
---

Wazo use nginx as a web server and reverse proxy.

In its default configuration, the nginx server listens on port TCP/80 and TCP/443 and allows these
services to be used:

- The agent management server (wazo-agentd)
- The authentication server (wazo-auth)
- The configuration server (wazo-confd)
- The telephony service interface (wazo-calld)
- The directory service (wazo-dird)
- The AMI HTTP interface (wazo-amid)
- API documentation (xivo-swagger-doc)
- The websocket interface (wazo-websocketd)
- Asterisk WebSocket (xivo-config)

An administrator can easily modify the configuration to allow or disallow some services.

To do so, an administrator only has to create a symbolic link inside the
`/etc/nginx/locations/http-enabled`{.interpreted-text role="file"} directory to the corresponding
file in the `/etc/nginx/locations/http-available`{.interpreted-text role="file"} directory, and then
reload nginx with `systemctl reload nginx`. A similar operation must be done for HTTPS.

For example, to enable all the available services:

    ln -sf /etc/nginx/locations/http-available/* /etc/nginx/locations/http-enabled
    ln -sf /etc/nginx/locations/https-available/* /etc/nginx/locations/https-enabled
    systemctl reload nginx

To disable all the services other than the web interface:

    rm /etc/nginx/locations/http-enabled/* /etc/nginx/locations/https-enabled/*
    systemctl reload nginx
