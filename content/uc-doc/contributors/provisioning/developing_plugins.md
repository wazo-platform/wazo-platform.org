---
title: Developing Provisioning Plugins
---

Here is an example of how to develop a provisioning plugin for Digium
phones. You can find all the code [on
Github](https://github.com/wazo-platform/wazo-provd-plugins/tree/master/plugins/xivo-digium).

## <a name="phone-analysis"></a>Phone Analysis

Here\'s a non-exhaustive list of what a phone may or may not support:

-   Language
-   Timezone
-   UTF-8
-   Reboot of the phone (SIP notify ?)
-   Simple call
-   Blind transfer
-   Attended transfer
-   Firmware upgrade
-   Multiple lines
-   DTMF (RTP ? SIP ?)
-   MWI (voicemail indication)
-   Voicemail button
-   Call on hold
-   Function keys
-   Call interception (with BLF)
-   NTP

## <a name="dhcp-configuration"></a>DHCP Configuration

In `wazo-provd-plugins/provisioning/dhcpd-update/dhcp/dhcpd_update`:

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

In
`wazo-provd-plugins/provisioning/dhcpd-update/dhcp/dhcpd_subnet.conf.middle`:

    # Digium
    allow members of "DigiumD40";
    allow members of "DigiumD50";
    allow members of "DigiumD70";

You can check the logs in `/var/log/syslog`:

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

## <a name="update-the-dhcp-configuration"></a>Update the DHCP configuration

To upload the new DHCP configuration on `provd.wazo.community`, in
`wazo-provd-plugins/dhcpd-update`:

    make upload

To download the DHCP configuration on the Wazo server, run:

    dhcpcd-update -d

## <a name="plugin-creation"></a>Plugin creation

In `wazo-provd-plugins/plugins`, create the directory tree:

    xivo-digium/
        build.py
        1.1.0.0/
            plugin-info
            entry.py
            pkgs/
                pkgs.db
        common/
            common.py
            var/
                tftpboot/
                    Digium/

In `build.py`:

    # -*- coding: UTF-8 -*-

    from subprocess import check_call

    @target('1.1.0.0', 'xivo-digium-1.1.0.0')
    def build_1_1_0_0(path):
        check_call(['rsync', '-rlp', '--exclude', '.*',
                    'common/', path])
        check_call(['rsync', '-rlp', '--exclude', '.*',
                    '1.1.0.0/', path])

In `1.1.0.0/plugin-info`:

    {
        "version": "0.3",
        "description": "Plugin for Digium D40, D50 and D70 in version 1.1.0.0.",
        "description_fr": "Greffon pour Digium D40, D50 et D70 en version 1.1.0.0.",
        "capabilities": {
            "Digium, D40, 1.1.0.0": {
                "sip.lines": 2
            },
            "Digium, D50, 1.1.0.0": {
                "sip.lines": 4
            },
            "Digium, D70, 1.1.0.0": {
                "sip.lines": 6
            }
        }
    }

In `1.1.0.0/entry.py`:

    # -*- coding: UTF-8 -*-
    common = {}
    execfile_('common.py', common)
    VERSION = u'1.1.0.0.48178'
    class DigiumPlugin(common['BaseDigiumPlugin']):
        IS_PLUGIN = True
        pg_associator = common['DigiumPgAssociator'](VERSION)

In `1.1.0.0/pkgs/pkgs.db`, put the informations needed to download the
firmwares:

    [pkg_firmware]
    description: Firmware for all Digium phones
    description_fr: Micrologiciel pour tous les téléphones Digium
    version: 1.1.0.0
    files: firmware
    install: digium-fw

    [install_digium-fw]
    a-b: untar $FILE1
    b-c: cp */*.eff firmware/

    [file_firmware]
    url: http://downloads.digium.com/pub/telephony/res_digium_phone/firmware/firmware_1_1_0_0_package.tar.gz
    size: 100111361
    sha1sum: 1d44148b996eaf270fd35995f3c5d69ff0438c5b

In `common/common.py`, put the code needed to extract informations about
the phone:

``` {.sourceCode .python}
class DigiumDHCPDeviceInfoExtractor(object):

    _VDI_REGEX = re.compile(r'^digium_(D\d\d)_([\d_]+)$')

    def extract(self, request, request_type):
        return defer.succeed(self._do_extract(request))

    def _do_extract(self, request):
        options = request['options']
        if 60 in options:
            return self._extract_from_vdi(options[60])

    def _extract_from_vdi(self, vdi):
        # Vendor Class Identifier:
        #   digium_D40_1_0_5_46476
        #   digium_D40_1_1_0_0_48178
        #   digium_D70_1_0_5_46476
        #   digium_D70_1_1_0_0_48178
        match = self._VDI_REGEX.match(vdi)
        if match:
            model = match.group(1).decode('ascii')
            fw_version = match.group(2).replace('_', '.').decode('ascii')
            dev_info = {u'vendor': u'Digium',
                        u'model': model,
                        u'version': fw_version}
            return dev_info


class DigiumHTTPDeviceInfoExtractor(object):

    _PATH_REGEX = re.compile(r'^/Digium/(?:([a-fA-F\d]{12})\.cfg)?')

    def extract(self, request, request_type):
        return defer.succeed(self._do_extract(request))

    def _do_extract(self, request):
        match = self._PATH_REGEX.match(request.path)
        if match:
            dev_info = {u'vendor': u'Digium'}
            raw_mac = match.group(1)
            if raw_mac and raw_mac != '000000000000':
                mac = norm_mac(raw_mac.decode('ascii'))
                dev_info[u'mac'] = mac
            return dev_info
```

You should see in the logs (`/var/log/wazo-provd.log`):

    provd[1090]: Processing HTTP request: /Digium/000fd3054848.cfg
    provd[1090]: <11> Extracted device info: {u'ip': u'10.42.1.100', u'mac': u'00:0f:d3:05:48:48', u'vendor': u'Digium'}
    provd[1090]: <11> Retrieved device id: 254374beec8d40209ff70393326b0b13
    provd[1090]: <11> Routing request to plugin xivo-digium-1.1.0.0

Still in `common/common.py`, put the code needed to associate the phone
with the plugin:

``` {.sourceCode .python}
class DigiumPgAssociator(BasePgAssociator):

    _MODELS = [u'D40', u'D50', u'D70']

    def __init__(self, version):
        BasePgAssociator.__init__(self)
        self._version = version

    def _do_associate(self, vendor, model, version):
        if vendor == u'Digium':
            if model in self._MODELS:
                if version == self._version:
                    return FULL_SUPPORT
                return COMPLETE_SUPPORT
            return PROBABLE_SUPPORT
        return IMPROBABLE_SUPPORT
```

Then, the last piece: the generation of the phone configuration:

``` {.sourceCode .python}
class BaseDigiumPlugin(StandardPlugin):

    _ENCODING = 'UTF-8'
    _CONTACT_TEMPLATE = 'contact.tpl'

    def __init__(self, app, plugin_dir, gen_cfg, spec_cfg):
        StandardPlugin.__init__(self, app, plugin_dir, gen_cfg, spec_cfg)

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
        raw_config['XX_lang'] = raw_config.get(u'locale')

        path = os.path.join(self._digium_dir, filename)
        contact_path = os.path.join(self._digium_dir, contact_filename)
        self._tpl_helper.dump(tpl, raw_config, path, self._ENCODING)
        self._tpl_helper.dump(contact_tpl, raw_config, contact_path, self._ENCODING)

    def deconfigure(self, device):
        filenames = [
            self._dev_specific_filename(device),
            self._dev_contact_filename(device)
        ]

        for filename in filenames:
            path = os.path.join(self._digium_dir, filename)
            try:
                os.remove(path)
            except OSError as e:
                logger.info('error while removing file %s: %s', path, e)

    if hasattr(synchronize, 'standard_sip_synchronize'):
        def synchronize(self, device, raw_config):
            return synchronize.standard_sip_synchronize(device)

    else:
        # backward compatibility with older wazo-provd server
        def synchronize(self, device, raw_config):
            try:
                ip = device[u'ip'].encode('ascii')
            except KeyError:
                return defer.fail(Exception('IP address needed for device synchronization'))
            else:
                sync_service = synchronize.get_sync_service()
                if sync_service is None or sync_service.TYPE != 'AsteriskAMI':
                    return defer.fail(Exception('Incompatible sync service: %s' % sync_service))
                else:
                    return threads.deferToThread(sync_service.sip_notify, ip, 'check-sync')

    def get_remote_state_trigger_filename(self, device):
        if u'mac' not in device:
            return None

        return self._dev_specific_filename(device)

    def is_sensitive_filename(self, filename):
        return bool(self._SENSITIVE_FILENAME_REGEX.match(filename))

    def _check_device(self, device):
        if u'mac' not in device:
            raise Exception('MAC address needed to configure device')

    def _get_main_proxy_ip(self, raw_config):
        if raw_config[u'sip_lines']:
            line_no = min(int(x) for x in raw_config[u'sip_lines'].keys())
            line_no = str(line_no)
            return raw_config[u'sip_lines'][line_no][u'proxy_ip']
        else:
            return raw_config[u'ip']


    def _format_mac(self, device):
         return format_mac(device[u'mac'], separator='', uppercase=False)

    _SENSITIVE_FILENAME_REGEX = re.compile(r'^[0-9a-f]{12}\.cfg$')

    def _dev_specific_filename(self, device):
        filename = '%s.cfg' % self._format_mac(device)
        return filename

    def _dev_contact_filename(self, device):
        contact_filename = '%s-contacts.xml' % self._format_mac(device)
        return contact_filename

    def _transform_funckeys(self, raw_config):
        return dict(
            (int(k), v) for k, v in raw_config['funckeys'].iteritems()
        )
```

Then you can create the configuration templates with Jinja syntax. Here
are some examples:

-   [base.tpl](https://github.com/wazo-platform/wazo-provd-plugins/blob/master/plugins/xivo-digium/common/templates/base.tpl)
-   [contact.tpl](https://github.com/wazo-platform/wazo-provd-plugins/blob/master/plugins/xivo-digium/common/templates/contact.tpl)
-   [D40.tpl](https://github.com/wazo-platform/wazo-provd-plugins/blob/master/plugins/xivo-digium/1.4.0.0/templates/D40.tpl)

## <a name="upload-the-plugin-on-provd.wazo.community"></a>Upload the plugin on `provd.wazo.community`

First, change the source of your plugins (cf.
[Alternative plugins repository](/uc-doc/administration/provisioning/basic_configuration#alternative-plugins-repo))

For a development version:

    cd xivo-skaro/provisioning/plugins
    make upload

For a stable version:

    cd xivo-skaro/provisioning/plugins
    make download-stable
    cd _build
    cp dev/xivo-digium-1.1.0.0-0.3.tar.bz2 stable/
    cd ..
    make upload-stable

More details about this in [Managing Plugins](/uc-doc/contributors/provisioning/managing_plugins).
