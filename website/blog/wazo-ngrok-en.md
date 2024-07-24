---
title: Ngrok and Wazo integration
date: 2017-05-26
author: Sylvain Boily
category: Wazo
slug: wazo-ngrok-en
status: published
---

Cliquez [ici](https://wazo-platform.org/blog/wazo-ngrok-fr) pour la version française.

Ngrok is a software allowing its users to create reverse tunnels to access a server from the Internet. It's secure and easy to use. It's very useful to grant access to an internal API over the Internet without having to configure network equipment. It also allows you to create an SSH access to get help from the Wazo developers or another member of our community.

![ngrok.png](../static/images/blog/wazo-ngrok/ngrok.png 'Ngrok website')

# Ngrok

Using Ngrok from Wazo is very simple. The first step is to register to the ngrok service [site](https://ngrok.com) (which is free, as in beer) and to retrieve your authentication token. The token is necessary to create tunnels.

This article focuses on Ngrok 2.0. Some features are only available with the paid subscription plans. You should consider getting a paid subscription if you find this service useful.

Once you have your token, you have to go to your Wazo admin UI to install the Ngrok plugin.

![wazo-plugin.png](../static/images/blog/wazo-ngrok/wazo-plugin.png 'Wazo ngrok plugin')

After installing your plugin, an "Ngrok" entry will appear on the menu. You will have to go to the configuration to add your token and optionally select your geographical zone.

![wazo-ngrok-config.png](../static/images/blog/wazo-ngrok/wazo-ngrok-config.png 'Wazo ngrok config')

Once configured, you will be able to create tunnel from the "tunnel" menu. Some of the options are only available to paid accounts, TLS and sub-domains, to name a few. For example, you will need TLS support to create an HTTPS tunnel to your Wazo HTTPS interface. But you can still create a TCP tunnel to port 443 to access it.

![wazo-ngrok-add.png](../static/images/blog/wazo-ngrok/wazo-ngrok-add.png 'Wazo ngrok add tunnel')

Once your tunnel is up, you will see the unique address the Ngrok created for your tunnel. This will allow you or someone else to access you Wazo server.

![wazo-ngrok-tunnel.png](../static/images/blog/wazo-ngrok/wazo-ngrok-tunnel.png 'Wazo ngrok tunnel')

Ngrok also allows you to inspect traffic going through the tunnel from its management interface. To access it, create a tunnel of type HTTP to port 4040 and connect to it using your browser.

![ngrok-inspect.png](../static/images/blog/wazo-ngrok/ngrok-inspect.png 'Ngrok inspect')

You can now discover and enjoy the simplicity of Wazo and Ngrok.

Do not be shy and get in touch with us to give your feedback [on our forums](https://wazo-platform.discourse.group).

Keep your Wazo squeaking!

/sylvain
