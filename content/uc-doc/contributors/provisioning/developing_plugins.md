---
title: Developing Provisioning Plugins
---

Here is an example of how to develop a provisioning plugin for Digium phones. You can find all the
code
[on GitHub](https://github.com/wazo-platform/wazo-provd-plugins/tree/master/plugins/wazo_digium).

If instead you want to add a model to an existing provisioning plugin, see the
[corresponding guide](/uc-doc/contributors/provisioning/add_phone_to_plugin) instead.

## Phone Analysis {#phone-analysis}

Here's a non-exhaustive list of what a phone may or may not support:

- Language
- Timezone
- UTF-8
- Reboot of the phone (SIP notify ?)
- Simple call
- Blind transfer
- Attended transfer
- Firmware upgrade
- Multiple lines
- DTMF (RTP ? SIP ?)
- MWI (voicemail indication)
- Voicemail button
- Call on hold
- Function keys
- Call interception (with BLF)
- NTP

## DHCP Configuration {#dhcp-configuration}

In `wazo-provd-plugins/provisioning/dhcpd-update/dhcp/dhcpd_update`:

```python
group {
    option tftp-server-name = concat(config-option VOIP.http-server-uri, "/Digium");
    class "DigiumD40" {
        match if substring(option vendor-class-identifier, 0, 10) = "digium_D40";
        log(concat("[", binary-to-ascii(16, 8, ":", hardware), "] ", "BOOT Digium D40"));
    }
    class "DigiumD50" {
        match if substring(option vendor-class-identifier, 0, 10) = "digium_D50";
        log(concat("[", binary-to-ascii(16, 8, ":", hardware), "] ", "BOOT Digium D50"));
    }
    class "DigiumD70" {
        match if substring(option vendor-class-identifier, 0, 10) = "digium_D70";
        log(concat("[", binary-to-ascii(16, 8, ":", hardware), "] ", "BOOT Digium D70"));
    }
}
```

In `wazo-provd-plugins/provisioning/dhcpd-update/dhcp/dhcpd_subnet.conf.middle`:

```shell
# Digium
allow members of "DigiumD40";
allow members of "DigiumD50";
allow members of "DigiumD70";
```

You can check the logs in `/var/log/syslog`:

```shell
dhcpd: [1:0:f:d3:5:48:48] [VENDOR-CLASS-IDENTIFIER: digium_D40_1_1_0_0_48178]
dhcpd: [1:0:f:d3:5:48:48] POOL VoIP
dhcpd: [1:0:f:d3:5:48:48] BOOT Digium D40
dhcpd: DHCPDISCOVER from 00:0f:d3:05:48:48 via eth0
dhcpd: DHCPOFFER on 10.42.1.100 to 00:0f:d3:05:48:48 via eth0
dhcpd: [1:0:f:d3:5:48:48] [VENDOR-CLASS-IDENTIFIER: digium_D40_1_1_0_0_48178]
dhcpd: [1:0:f:d3:5:48:48] POOL VoIP
dhcpd: [1:0:f:d3:5:48:48] BOOT Digium D40
dhcpd: DHCPREQUEST for 10.42.1.100 (10.42.1.1) from 00:0f:d3:05:48:48 via eth0
dhcpd: DHCPACK on 10.42.1.100 to 00:0f:d3:05:48:48 via eth0
```

## Update the DHCP configuration {#update-the-dhcp-configuration}

To upload the new DHCP configuration on `provd.wazo.community`, in
`wazo-provd-plugins/dhcpd-update`:

```shell
make upload
```

To download the DHCP configuration on the Wazo server, run:

```shell
dhcpcd-update -d
```

## Plugin creation {#plugin-creation}

In `wazo-provd-plugins/plugins`, create the directory tree:

```shell
wazo_digium/
    build.py
    1.4.0.0/
        plugin-info
        entry.py
        pkgs/
            pkgs.db
        templates
            D40.tpl
            D50.tpl
            D70.tpl
            firmware.tpl
    common/
        common.py
        var/
            tftpboot/
                Digium/
```

In `build.py`:

```python
# -*- coding: UTF-8 -*-

from subprocess import check_call

@target('1.4.0.0', 'wazo-digium-1.4.0.0')
def build_1_4_0_0(path):
    check_call(['rsync', '-rlp', '--exclude', '.*', 'common/', path])
    check_call(['rsync', '-rlp', '--exclude', '.*',  '1.4.0.0/', path])
```

In `1.4.0.0/plugin-info`:

```json
{
  "version": "1.1.0",
  "description": "Plugin for Digium D40, D50 and D70 in version 1.4.0.0.",
  "description_fr": "Greffon pour Digium D40, D50 et D70 en version 1.4.0.0.",
  "capabilities": {
    "Digium, D40, 1.4.0.0": {
      "lines": 2,
      "high_availability": true,
      "function_keys": 0,
      "expansion_modules": 0,
      "switchboard": false,
      "type": "deskphone",
      "protocol": "sip"
    },
    "Digium, D50, 1.4.0.0": {
      "lines": 4,
      "high_availability": true,
      "function_keys": 0,
      "expansion_modules": 0,
      "switchboard": false,
      "type": "deskphone",
      "protocol": "sip"
    },
    "Digium, D70, 1.4.0.0": {
      "lines": 6,
      "high_availability": true,
      "function_keys": 0,
      "expansion_modules": 0,
      "switchboard": false,
      "type": "deskphone",
      "protocol": "sip"
    }
  }
}
```

In `1.4.0.0/entry.py`:

```python
common = {}
execfile_('common.py', common)
VERSION = '1.4.0.0.57389'
class DigiumPlugin(common['BaseDigiumPlugin']):
    IS_PLUGIN = True
    pg_associator = common['DigiumPgAssociator'](VERSION)
```

In `1.1.0.0/pkgs/pkgs.db`, put the information needed to download the firmware:

```ini
[pkg_firmware]
description: Firmware for all Digium phones
description_fr: Micrologiciel pour tous les téléphones Digium
version: 1.4.0.0
files: firmware
install: digium-fw


[install_digium-fw]
a-b: untar $FILE1
b-c: cp */*.eff Digium/firmware/


[file_firmware]
url: http://downloads.digium.com/pub/telephony/res_digium_phone/firmware/firmware_1_4_0_0_package.tar.gz
size: 101303480
sha1sum: 626273aaf6dd33e1927f3acb4a90f86a6e4e9f25
```

In `common/common.py`, put the code needed to extract information about the phone:

```python
import re
from provd.util import norm_mac, format_mac
from twisted.internet import defer
from provd.servers.http_site import Request
from provd.devices.ident import RequestType, DHCPRequest

class DigiumDHCPDeviceInfoExtractor:

    _VDI_REGEX = re.compile(r'^digium_(D\d\d)_([\d_]+)$')

    def extract(self, request: DHCPRequest, request_type: RequestType):
        return defer.succeed(self._do_extract(request))

    def _do_extract(self, request: DHCPRequest):
        options = request['options']
        if 60 in options:
            return self._extract_from_vdi(options[60])

    def _extract_from_vdi(self, vdi: str):
        # Vendor Class Identifier:
        #   digium_D40_1_0_5_46476
        #   digium_D40_1_1_0_0_48178
        #   digium_D70_1_0_5_46476
        #   digium_D70_1_1_0_0_48178
        match = self._VDI_REGEX.match(vdi)
        if match:
            model = match.group(1)
            fw_version = match.group(2).replace('_', '.')
            return {'vendor': 'Digium', 'model': model, 'version': fw_version}


class DigiumHTTPDeviceInfoExtractor:

    _PATH_REGEX = re.compile(r'^/Digium/(?:([a-fA-F\d]{12})\.cfg)?')

    def extract(self, request: Request, request_type: RequestType):
        return defer.succeed(self._do_extract(request))

    def _do_extract(self, request: Request):
        match = self._PATH_REGEX.match(request.path.decode('ascii'))
        if match:
            dev_info = {'vendor': 'Digium'}
            raw_mac = match.group(1)
            if raw_mac and raw_mac != '000000000000':
                mac = norm_mac(raw_mac)
                dev_info['mac'] = mac
            return dev_info
```

You should see in the logs (`/var/log/wazo-provd.log`):

```shell
provd[1090]: Processing HTTP request: /Digium/000fd3054848.cfg
provd[1090]: <11> Extracted device info: {'ip': '10.42.1.100', 'mac': '00:0f:d3:05:48:48', 'vendor': 'Digium'}
provd[1090]: <11> Retrieved device id: 254374beec8d40209ff70393326b0b13
provd[1090]: <11> Routing request to plugin wazo-digium-1.4.0.0
```

Still in `common/common.py`, put the code needed to associate the phone with the plugin:

```python
from provd.devices.pgasso import BasePgAssociator, DeviceSupport

class DigiumPgAssociator(BasePgAssociator):

    _MODELS = ['D40', 'D45', 'D50', 'D60', 'D62', 'D65', 'D70']

    def __init__(self, version):
        super().__init__()
        self._version = version

    def _do_associate(
        self, vendor: str, model: Optional[str], version: Optional[str]
    ) -> DeviceSupport:
        if vendor == 'Digium':
            if model in self._MODELS:
                if version == self._version:
                    return DeviceSupport.EXACT
                return DeviceSupport.COMPLETE
            return DeviceSupport.PROBABLE
        return DeviceSupport.IMPROBABLE
```

Then, the last piece: the generation of the phone configuration:

```python
import os
import re
import logging

from provd import synchronize
from provd.util import norm_mac, format_mac
from provd.plugins import StandardPlugin, FetchfwPluginHelper, TemplatePluginHelper
from provd.servers.http import HTTPNoListingFileService


logger = logging.getLogger('plugin.wazo_digium')


class BaseDigiumPlugin(StandardPlugin):

    _ENCODING = 'UTF-8'
    _CONTACT_TEMPLATE = 'contact.tpl'
    _SENSITIVE_FILENAME_REGEX = re.compile(r'^[0-9a-f]{12}\.cfg$')

    def __init__(self, app, plugin_dir, gen_cfg, spec_cfg):
        super().__init__(app, plugin_dir, gen_cfg, spec_cfg)

        self._tpl_helper = TemplatePluginHelper(plugin_dir)
        self._digium_dir = os.path.join(self._tftpboot_dir, 'Digium')

        downloaders = FetchfwPluginHelper.new_downloaders(gen_cfg.get('proxies'))
        fetchfw_helper = FetchfwPluginHelper(plugin_dir, downloaders)

        self.services = fetchfw_helper.services()
        self.http_service = HTTPNoListingFileService(self._tftpboot_dir)

    dhcp_dev_info_extractor = DigiumDHCPDeviceInfoExtractor()
    http_dev_info_extractor = DigiumHTTPDeviceInfoExtractor()

    def configure(self, device, raw_config):
        self._check_device(device)

        filename = self._dev_specific_filename(device)
        contact_filename = self._dev_contact_filename(device)

        tpl = self._tpl_helper.get_dev_template(filename, device)
        contact_tpl = self._tpl_helper.get_template(self._CONTACT_TEMPLATE)

        raw_config['XX_mac'] = self._format_mac(device)
        raw_config['XX_main_proxy_ip'] = self._get_main_proxy_ip(raw_config)
        raw_config['XX_funckeys'] = self._transform_funckeys(raw_config)
        raw_config['XX_lang'] = raw_config.get('locale')

        path = os.path.join(self._digium_dir, filename)
        contact_path = os.path.join(self._digium_dir, contact_filename)
        self._tpl_helper.dump(tpl, raw_config, path, self._ENCODING)
        self._tpl_helper.dump(contact_tpl, raw_config, contact_path, self._ENCODING)

    def deconfigure(self, device):
        filenames = [
            self._dev_specific_filename(device),
            self._dev_contact_filename(device),
        ]

        for filename in filenames:
            path = os.path.join(self._digium_dir, filename)
            try:
                os.remove(path)
            except OSError as e:
                logger.info('error while removing file %s: %s', path, e)

    def synchronize(self, device, raw_config):
        return synchronize.standard_sip_synchronize(device)

    def get_remote_state_trigger_filename(self, device):
        if 'mac' not in device:
            return None
        return self._dev_specific_filename(device)

    def is_sensitive_filename(self, filename):
        return bool(self._SENSITIVE_FILENAME_REGEX.match(filename))

    def _check_device(self, device):
        if 'mac' not in device:
            raise Exception('MAC address needed to configure device')

    def _get_main_proxy_ip(self, raw_config):
        if raw_config['sip_lines']:
            line_no = min(int(x) for x in list(raw_config['sip_lines']))
            line_no = str(line_no)
            return raw_config['sip_lines'][line_no]['proxy_ip']
        return raw_config['ip']

    def _format_mac(self, device):
        return format_mac(device['mac'], separator='', uppercase=False)

    def _dev_specific_filename(self, device: Dict[str, str]) -> str:
        return f'{self._format_mac(device)}.cfg'

    def _dev_contact_filename(self, device):
        return f'{self._format_mac(device)}-contacts.xml'

    def _transform_funckeys(self, raw_config):
        return {int(k): v for k, v in raw_config['funckeys'].items()}
```

Then you can create the configuration templates using Jinja templates. Here are some examples:

- [base.tpl](https://github.com/wazo-platform/wazo-provd-plugins/blob/master/plugins/wazo_digium/common/templates/base.tpl)
- [contact.tpl](https://github.com/wazo-platform/wazo-provd-plugins/blob/master/plugins/wazo_digium/common/templates/contact.tpl)
- [D40.tpl](https://github.com/wazo-platform/wazo-provd-plugins/blob/master/plugins/wazo_digium/1.4.0.0/templates/D40.tpl)

## Upload the plugin on `provd.wazo.community` {#upload-the-plugin-on-provd.wazo.community}

First, change the source of your plugins (cf.
[Alternative plugins repository](/uc-doc/administration/provisioning/basic_configuration#alternative-plugins-repo))

For a development version:

```shell
cd wazo-provd-plugins/plugins
make upload
```

For a stable version:

```shell
cd wazo-provd-plugins/plugins
make download-stable
cd _build
cp dev/wazo-digium-1.4.0.0.tar.bz2 stable/
cd ..
make upload-stable
```
