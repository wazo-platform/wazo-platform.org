---
title: Basic Configuration
---

You have two options to get your phone to be provisioned:

- Set up a DHCP server
- Manually tell each phone where to get the provisioning information

You may want to manually configure the phones if you are only trying Wazo or if your network
configuration does not allow the phones to access the Wazo DHCP server.

You may want to set up a DHCP server if you have a significant number of phones to connect, as no
manual intervention will be required on each phone.

## Configuring the DHCP Server {#dhcpd-config}

Wazo includes a DHCP server that facilitate the auto-provisioning of telephony devices. It is _not_
activated by default.

There are a few things to know about the peculiarities of the included DHCP server:

- it only answers DHCP requests from [supported devices](/uc-doc/ecosystem/supported_devices).
- it only answers DHCP requests from the VoIP subnet (see
  [network configuration](/uc-doc/system/network)).

This means that if your phones are on the same broadcast domain than your computers, and you would
like the DHCP server on your Wazo to handle both your phones and your computers, it won't do it.

The DHCP server is configured via `PUT /dhcp`

## Installing `provd` Plugins

The installation and management of `provd` plugins is done via the `wazo-provd` endpoint
`/provd/pg_mgr/install`

**Warning**: If you uninstall a plugin that is used by some of your devices, they will be left in an
unconfigured state and won't be associated with another plugin automatically.

It's possible that there will be more than one plugin compatible with a given device. In these
cases, the difference between the two plugins is usually just the firmware version the plugin
targets. If you are unsure about which version you should install, you should look for more
information on the vendor's website.

It's good practice to only install the plugins you need and no more.

### Alternative plugin repository {#alternative-plugins-repo}

By default, the list of plugins available for installation are the stable plugins for the officially
supported devices.

This can be changed with `wazo-provd` endpoint `/provd/configure/plugin_server`

- `http://provd.wazo.community/plugins/2/stable/` --
  [community supported devices](/uc-doc/ecosystem/supported_devices) "stable" repository
- `http://provd.wazo.community/plugins/2/testing/` -- officially supported devices "testing"
  repository
- `http://provd.wazo.community/plugins/2/archive/` -- officially supported devices "archive"
  repository

The difference between the stable and testing repositories is that the latter might contain plugins
that are not working properly or are still in development. The testing repository is updated every
time a plugin is merged in the main branch during a development iteration. At the end of an
iteration, the testing repository is copied to the stable repository.

The archive repository contains plugins that were once in the stable repository and is updated at
the end of every development iteration.

After setting a new URL, you must refresh the list of installable plugins with
`/provd/pg_mgr/install/update`

## How to manually tell the phones to get their configuration

If you have set up a DHCP server on Wazo and the phones can access it, you can skip this section.

The appropriate provisioning plugins must be installed for your device.

### Aastra

In the web interface of your phone, go to `Advanced settings --> Configuration server`, and enter
the following settings:

![Configuration Server Aastra](/images/uc-doc/provisioning/config_server_aastra.png)

### Polycom

On the phone, go to
`Menu --> Settings --> Advanced --> Admin Settings --> Network configuration --> Server Menu` and
enter the following settings:

- Server type: HTTP
- Server address: `http://<Wazo IP address>:8667/000000000000.cfg`

Then save and reboot the phone.

### Snom

First, you need to run the following command on the Wazo server:

```shell
sed -i 's/dhcp:stop/dhcp:proceed/' /var/lib/wazo-provd/plugins/wazo-snom-8.7.5.35/var/tftpboot/snom-general.xml
```

On the web interface of your phone, go to `Setup --> Advanced --> Update` and enter the following
settings:

![Configuration Server SNOM](/images/uc-doc/provisioning/config_server_snom.png)

### Yealink

On the web interface of your phone, go to `Settings --> Auto Provision`, and enter the following
settings:

- Server URL: `http://<Wazo IP address>:8667`

![Configuration Server Yealink](/images/uc-doc/provisioning/config_server_yealink.png)

Save the changes by clicking on the `Confirm` button and then click on the `Autoprovision Now`
button.

## Using HTTPS for autoprovisioning {#https-autoprovisioning}

By default, autoprovisioning happens over TFTP (for older phones) and HTTP. However, some phones
also support autoprovisioning over HTTPS. This is the most secure way of provisioning a phone, but
also the less likely to work out-of-the-box, hence not the default.

In order to autoprovision devices over HTTPS, use the following wazo-confd API:

```http
PUT /provisioning/networking
{
   ...
   "provision_http_base_url": "https://wazo.example.com/device/provisioning",
   ...
}
```

where `wazo.example.com` is the hostname of your Wazo Platform server.

### Limitations

If you use a HTTPS certificate signed by a recent root CA, such as Let's Encrypt, phones may not be
able to verify the HTTPS certificate. Make sure you use the most recent firmware for HTTPS
provisioning.

## Updating Service Port

By default, the HTTP provisioning service listen on port `8667`. To update value, use the following
wazo-confd API:

```http
PUT /provisioning/networking
{
   ...
   "provision_http_port": 8667,
   ...
}
```

### Implementation Details

The following sequence is produced when using the provisioning networking API:

- Port value is saved in the database
- NGINX configuration file is generated by the wazo configuration template system taken value from
  the database
- NGINX is restarted
- wazo-provd service is restarted using a dynamic configuration file generated by wazo-confgend
  taken the value from the database

## Proxied Autoprovisioning

Some device plugins need to write the URL to retrieve other files (ex: firmware, language, etc.) in
their configuration file. By default, this value is taken through wazo-confgend from a valid network
interface. However, if this value cannot be discovered (ex: behind a proxy), you'll have to
configure it manually through wazo-confd API.

```http
PUT /provisioning/networking
{
   ...
   "provision_http_url": "http://wazo.example.com:8667",
   ...
}
```

Another example is provided in
[HTTPS for auto-provisioning](/uc-doc/administration/provisioning/basic_configuration#https-autoprovisioning)
section.

## Autoprovisioning a Device

Once you have installed the right provd plugins for your devices and correctly set up your DHCP
server, you can then connect your devices to your network.

But first, `GET /devices`. You will then see that no devices are currently known by your Wazo

You can then power on your devices on your LAN. For example, after you power on an Aastra 6731i and
give it the time to boot and maybe upgrade its firmware, you should then see the phone has its first
line configured as 'autoprov', and if you `GET /devices`, you should see that your Wazo now knows
about your 6731i with `status: not_configured`

You can then dial from your Aastra 6731i the provisioning code associated with a line of one of your
user. You will hear a prompt thanking you and your device should then reboot in the next few
seconds. Once the device has rebooted, it will then be properly configured for your user to use it.
And also, if you `GET /devices`, you'll see the device with with `status: configured`

## Resetting a Device

### From REST API

To remove a phone from Wazo or enable a device to be used for another user:

- `GET /devices/{device_id}/autoprov`
- `GET /devices/{device_id}/synchronize`

The phone will restart and display autoprov. Ready to be used for another user.

### From a Device {#reset-to-autoprov-device}

- Dial `*guest` (`*48378`) on the phone dialpad followed by `9486` as a password

The phone restarts and displays autoprov. Ready to be used for another user.
