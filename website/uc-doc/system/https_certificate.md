---
title: Certificates for HTTPS
---

X.509 certificates are used to authorize and secure communications with the server. They are mainly
used for HTTPS, but can also be used for SIPS, CTIS, WSS, etc.

This article is about the certificate used for HTTPS.

## Wazo and HTTPS

Wazo uses HTTPS mainly for receiving and responding to REST API calls. The REST API calls can occur
inside the Wazo Engine, i.e. between Wazo daemons, or outside the Wazo Engine, e.g. for the web
interface or any other application based on the REST APIs.

From the outside of the Wazo Engine, every API call is reverse-proxied by nginx, which listens on
port 443 (HTTPS) and distribute REST API calls to the right daemon. This means we only have to
change one certificate (the one used by nginx) to enable all APIs to be secured by this certificate
from the outside of the Wazo Engine.

The default HTTPS certificate used by the Wazo Engine is located in
`/usr/share/wazo-certs/server.crt` with its associated `server.key` private key.

## Let's Encrypt

To create a new certificate for your Wazo Engine via Let's Encrypt for the domain
`wazo-engine.example.com`, here is the procedure:

```shell
apt install python3-certbot-nginx
certbot --nginx -d wazo-engine.example.com
# answer the questions
systemctl restart nginx
```

For more details, see the official
[Certbot documentation](https://certbot.eff.org/instructions?ws=nginx&os=snap).

## Use your own certificate

You will need:

1. the private key used to create your certificate (here named `/usr/local/share/private-key.pem`)
2. the full-chain certificate. It must include all intermediate certificates used in the chain of
   trust (here named `/usr/local/share/certificate.fullchain.pem`). See the
   [nginx documentation](https://nginx.org/en/docs/http/configuring_https_servers.html#chains) for
   more details.
3. Both files **must** be readable by the group `www-data`. You can check with the following
   command:

   ```shell
   sudo -u www-data cat /usr/local/share/*.pem > /dev/null
   ```

Edit the file `/etc/nginx/sites-available/wazo` and replace the following keys:

```nginx
ssl_certificate /usr/share/wazo-certs/server.crt;
ssl_certificate_key /usr/share/wazo-certs/server.key;
```

with:

```nginx
ssl_certificate /usr/local/share/certificate.fullchain.pem;
ssl_certificate_key /usr/local/share/private-key.pem
```

Then restart nginx:

```shell
systemctl restart nginx
```
