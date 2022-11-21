### Creating Custom Templates

Custom templates comes in handy when you have really specific configuration
needs for your telephony devices.

Templates are handled on a per-plugin basis. It's not possible for a template to be
shared by more than one plugin since it's a design limitation of the `provd` plugin system.

**Note**:
When you install a new plugin, templates are not migrated automatically, so you must manually copy them from the old plugin directory to the new one. This does not apply for a plugin upgrade.

Let's suppose we have installed the ``wazo-aastra-3.3.1-SP4`` plugin, and we want to write some custom templates for it.

First thing to do is to go into the directory where the plugin is installed:

```shell
cd /var/lib/wazo-provd/plugins/wazo-aastra-3.3.1-SP4
```

Once you are there, you can see there's quite a few files and directories:

```shell
   tree
   .
   +-- common.py
   +-- entry.py
   +-- pkgs
   |   +-- pkgs.db
   +-- plugin-info
   +-- README
   +-- templates
   |   +-- 6730i.tpl
   |   +-- 6731i.tpl
   |   +-- 6739i.tpl
   |   +-- 6753i.tpl
   |   +-- 6755i.tpl
   |   +-- 6757i.tpl
   |   +-- 9143i.tpl
   |   +-- 9480i.tpl
   |   +-- base.tpl
   +-- var
       +-- cache
       +-- installed
       +-- templates
       +-- tftpboot
           +-- Aastra
               +-- aastra.cfg
```

The interesting directories are:

* templates:

   This is where the original templates are located. You *should not** edit these files
   directly but instead copy the one you want to modify in the var/templates directory.

* var/templates:

   This is the directory where you put and edit your custom templates.

* var/tftpboot:

   This is where the configuration files lie once they have been generated from the templates.
   You should look at them to confirm that your custom templates are giving you the results you are expecting.

**Warning**:
When you uninstall a plugin, the plugin directory is removed altogether, including all the custom templates.

A few things to know before writing your first custom template:

* templates use the [Jinja2 template engine](http://jinja.pocoo.org/docs/templates/).
* when doing an ``include`` or an ``extends`` from a template, the file is first looked up
  in the `var/templates` directory and then in the `templates` directory.
* device in autoprov mode are affected by templates, because from the point of view
  of ``provd``, there's no difference between a device in autoprov mode or fully configured.
  This means there's usually no need to modify static files in `var/tftpboot`. And this
  is a bad idea since a plugin upgrade will override these files.

### Custom templates for every device

```shell
cp templates/base.tpl var/templates
vi var/templates/base.tpl
wazo-provd-cli -c 'devices.using_plugin("wazo-aastra-3.3.1-SP4").reconfigure()'
```

Once this is done, if you want to synchronize all the affected devices, using the following command:

```shell
wazo-provd-cli -c 'devices.using_plugin("wazo-aastra-3.3.1-SP4").synchronize()'
```

### Custom template for a specific model

Let's suppose we want to customize the template for our 6739i

```shell
cp templates/6739i.tpl var/templates
vi var/templates/6739i.tpl
wazo-provd-cli -c 'devices.using_plugin("wazo-aastra-3.3.1-SP4").reconfigure()'
```

### Custom template for a specific device

To create a custom template for a specific device you have to create a device-specific template
named `<device_specific_file_with_extension>.tpl` in the `var/templates/` directory:

* for an Aastra phone, if you want to customize the file `00085D2EECFB.cfg` you will have
  to create a template file named `00085D2EECFB.cfg.tpl`,
* for a Snom phone, if you want to customize the file `000413470411.xml` you will have
  to create a template file named `000413470411.xml.tpl`,
* for a Polycom phone, if you want to customize the file `0004f2211c8b-user.cfg` you will have
  to create a template file named `0004f2211c8b-user.cfg.tpl`,
* and so on.

Here, we want to customize the content of a device-specific file named `00085D2EECFB.cfg`,
we need to create a template named `00085D2EECFB.cfg.tpl`

```shell
cp templates/6739i.tpl var/templates/00085D2EECFB.cfg.tpl
vi var/templates/00085D2EECFB.cfg.tpl
wazo-provd-cli -c 'devices.using_mac("00085D2EECFB").reconfigure()'
```

**Note**:
The choice to use this syntax comes from the fact that ``provd`` supports devices that do not have MAC addresses,
namely softphones.

Also, some devices have more than one file (like Snom), so this way make
it possible to customize more than 1 file.

The template to use as the base for a device specific template will vary depending on the need.
Typically, the model template will be a good choice, but it might not always be the case.

### Changing the Plugin Used by a Device

From time to time, new firmware versions are released by the device's manufacturer.
This sometimes translates to a new plugin being available for these devices.

When this happens, it almost always means the new plugin renders the old one obsolete.
The older plugin is then considered "end-of-life", and won't receive any new updates
nor be available for new installations.

Let's suppose we have the old ``wazo-aastra-3.3.1-SP2`` plugin installed on our
Wazo and want to use the newer ``wazo-aastra-3.3.1-SP4`` plugin.

Both of these plugins can be installed at the same time, and you can manually change
the plugin used by a phone with ``PUT /devices/{device_id}``.

If you are using custom templates in your old plugin, you should copy
them to the new plugin and make sure that they are still compatible.

Once you make the decision to migrate all your phones to the new plugin, you can
use the following command:

```shell
wazo-provd-cli -c 'helpers.mass_update_devices_plugin("wazo-aastra-3.3.1-SP2", "wazo-aastra-3.3.1-SP4")'
```

Or, if you also want to synchronize (i.e. reboot) them at the same time:

```shell
wazo-provd-cli -c 'helpers.mass_update_devices_plugin("wazo-aastra-3.3.1-SP2", "wazo-aastra-3.3.1-SP4", synchronize=True)'
```

You can check that all went well by looking at output of ``GET /devices``.

## Advanced Configuration

### DHCP Integration

DHCP integration is enabled by default without the possibility to disable it.

What DHCP integration does is that, for every DHCP request made by one of your
phones, the DHCP server sends information about the request to ``provd``, which
can then use this information to update its device database.

This feature is useful for phones which lack information in their TFTP/HTTP
requests. For example, without DHCP integration, it's impossible to extract
model information for phones from the Cisco 7900 series. Without the model
information extracted, there's chance your device won't be automatically
associated to the best plugin.

This feature can also be useful if your phones are not always getting the same IP
addresses, for one reason or another. Again, this is useful only for some phones,
like the Cisco 7900; it has no effect for Aastra 6700.

### NAT

The provisioning server has partial support for environment where the telephony devices are behind a [NAT](http://en.wikipedia.org/wiki/NAT).

By default, each time the provisioning server receives an HTTP/TFTP request from a device, it makes sure that only one device has the source IP address of the request. This is not a desirable behaviour when the provisioning server is used in a NAT environment, since in this case, it's normal that more than 1 devices have the same source IP address (from the point of view of the server).

If *all* your devices used on your Wazo are behind a NAT, you should disable this behaviour by setting the ``nat`` option to ``yes`` with ``PUT /asterisk/sip/general``.

Enabling the NAT option will also improve the performance of the provisioning server in this scenario.

If you have many devices behind a NAT, you should also check the security section to make sure the IP address of your NAT equipment doesn't get banned unintentionally.

### Limitations

* You must only have phones from the following brands:

  * Aastra
  * Cisco SPA
  * Yealink

* All your devices must be behind the NAT (the devices may be grouped behind different NAT equipment, not necessarily the same one)
* You must provision the devices via REST API ``PUT /lines/{line_id}/devices/{device_id}``. Using
  the 6-digit provisioning code on the phone will produce unexpected results (i.e. the wrong device
  will be provisioned)

### Security

By design, the auto-provisioning process is vulnerable to:

* Leakage of sensitive information: some files that are served by the provisioning server contains
  sensitive information, e.g. SIP credentials that are used by SIP phones to make calls. Depending
  on your network configuration and the amount of information an attacker has on your telephony
  ecosystem (phone vendor, MAC address, etc.), he could retrieve the content of some files
  containing sensitive information.
* Denial-of-service attack: in its default configuration, each time the provisioning server identify
  a request coming from a new device, it creates a new device object in its database. An attacker
  could spoof requests to the provisioning server to create a huge amount of devices, creating a
  denial-of-service condition.

That said, starting from XiVO 16.08, XiVO adds [Fail2ban](http://www.fail2ban.org/) support to the
provisioning server to drastically lower the likelihood of such attacks. Every time a request for a
file potentially containing sensitive information is requested, a log line is appended to the
`/var/log/wazo-provd-fail2ban.log` file, which is monitored by fail2ban. The same thing
happens when a new device is automatically created by the provisioning server.

The fail2ban configuration for the provisioning server is located at
`/etc/fail2ban/jail.d/wazo.conf`. You may want to adjust the ``findtime`` / ``maxretry`` value
if you have special requirements. In particular, if you have many phones behind a NAT equipment,
you'll probably have to adjust these values, since every request coming from your phones behind your
NAT will appear to the provisioning server as coming from the same source IP address, and this IP
address will then be more likely to get banned promptly if you, for example, reboot all your phones
at the same time. Another solution would be to add your IP address to the list of ignored IP address
of fail2ban. See the fail2ban(1) man page for more information.

### System Requirements

Wazo 16.08 or later is required. You also need to use compatible wazo-provd plugins. Here's the list
of official plugins which are compatible:

Python 3 plugins Plugins for Wazo 22.16+
```ShellSession
+------------------|---------+
| Plugin family    | Version |
+==================+=========+
| wazo-aastra      | >= 1.6  |
+------------------|---------+
| wazo-cisco-sccp  | >= 1.1  |
+------------------|---------+
| wazo-cisco-spa   | >= 1.0  |
+------------------|---------+
| wazo-digium      | >= 1.0  |
+------------------|---------+
| wazo-polycom     | >= 1.7  |
+------------------|---------+
| wazo-snom        | >= 1.6  |
+------------------|---------+
| wazo-yealink     | >= 1.26 |
+------------------|---------+
```

Old Python 2 plugins for Wazo 16.08 to 22.15
```ShellSession
+------------------|---------+
| Plugin family    | Version |
+==================+=========+
| xivo-aastra      | >= 1.6  |
+------------------|---------+
| xivo-cisco-sccp  | >= 1.1  |
+------------------|---------+
| xivo-cisco-spa   | >= 1.0  |
+------------------|---------+
| xivo-digium      | >= 1.0  |
+------------------|---------+
| xivo-polycom     | >= 1.7  |
+------------------|---------+
| xivo-snom        | >= 1.6  |
+------------------|---------+
| xivo-yealink     | >= 1.26 |
+------------------|---------+
```
