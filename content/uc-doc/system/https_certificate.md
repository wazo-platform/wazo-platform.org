---
title: Certificates for HTTPS
---

- [Wazo and HTTPS](#wazo-and-https)
- [Let\'s Encrypt](#lets-encrypt)
- [Use your own certificate](#use-your-own-certificate)
- [Revert previous custom HTTPS certificate configuration](#revert-previous-custom-https-certificate-configuration)

X.509 certificates are used to authorize and secure communications with the server. They are mainly
used for HTTPS, but can also be used for SIPS, CTIS, WSS, etc.

This article is about the certificate used for HTTPS.

# Wazo and HTTPS

Wazo uses HTTPS mainly for receiving and responding to REST API calls. The REST API calls can occur
inside the Wazo Engine, i.e. between Wazo daemons, or outside the Wazo Engine, e.g. for the web
interface or any other application based on the REST APIs.

From the outside of the Wazo Engine, every API call is reverse-proxied by nginx, which listens on
port 443 (HTTPS) and distribute REST API calls to the right daemon. This means we only have to
change one certificate (the one used by nginx) to enable all APIs to be secured by this certificate
from the outside of the Wazo Engine.

The default HTTPS certificate used by the Wazo Engine is located in
`/usr/share/xivo-certs/server.crt`{.interpreted-text role="file"} with its associated `server.key`
private key.

# Let\'s Encrypt

To create a new certificate for your Wazo Engine via Let\'s Encrypt for the domain
`wazo-engine.example.com`, here is the procedure:

    apt install python3-certbot-nginx
    certbot --nginx -d wazo-engine.example.com
    # answer the questions
    systemctl restart nginx

For more details, see the official
[Certbot documentation](https://certbot.eff.org/lets-encrypt/debianbuster-nginx.html).

# Use your own certificate

You will need:

1.  the private key used to create your certificate (here named
    `/usr/local/share/private-key.pem`{.interpreted-text role="file"})
2.  the full-chain certificate. It must include all intermediate certificates used in the chain of
    trust (here named `/usr/local/share/certificate.fullchain.pem`{.interpreted-text role="file"}).
    See the
    [nginx documentation](https://nginx.org/en/docs/http/configuring_https_servers.html#chains) for
    more details.
3.  Both files **must** be readable by the group `www-data`. You can check with the following
    command:

        sudo -u www-data cat /usr/local/share/*.pem > /dev/null

Edit the file `/etc/nginx/sites-available/wazo`{.interpreted-text role="file"} and replace the
following keys:

    ssl_certificate /usr/share/xivo-certs/server.crt;
    ssl_certificate_key /usr/share/xivo-certs/server.key;

with:

    ssl_certificate /usr/local/share/certificate.fullchain.pem;
    ssl_certificate_key /usr/local/share/private-key.pem

Then restart nginx:

    systemctl restart nginx

# Revert previous custom HTTPS certificate configuration

Up to Wazo 18.03, the procedure to install a custom HTTPS certificate was much more complex. This
complex procedure is not needed anymore and should be removed to avoid any conflict with future
upgrade. You can use the following removal procedure before of after the above configuration steps.

Here is the removal procedure:

    # backup your certificate / key (optional)
    cp /usr/share/xivo-certs/server.{key,crt} /var/backups

    # stop all Wazo Engine services
    wazo-service stop all

    # regenerate self-signed certificate
    rm /usr/share/xivo-certs/server.{key,crt}
    dpkg-reconfigure xivo-certs

    # remove custom config files
    rm /etc/xivo/custom/custom-certificate.yml
    rm /etc/{wazo,xivo}-*/conf.d/010-custom-certificate.yml
    rm /etc/xivo/custom-templates/system/etc/hosts

    # restart services
    xivo-update-config
    wazo-service restart all

Then, the last steps:

- update your directories of type `wazo` to use:
  - the domain `localhost`
  - the certificate located in `/usr/share/xivo-certs/server.crt`{.interpreted-text role="file"}
