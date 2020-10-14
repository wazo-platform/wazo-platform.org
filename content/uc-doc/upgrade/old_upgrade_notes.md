---
title: Archived Upgrade Notes
---

## 2017

### 17.17

- The default NAT option has changed from `no` to `auto_force_rport`. This makes NAT configuration
  easier but has no impact on environments without NAT.
  - In the rare cases where you want to keep `nat=no` you must explicitly change this value in the
    administation interface
    `Services --> IPBX --> General Settings --> SIP Protocol`{.interpreted-text
    role="menuselection"} in tab [Default]{.title-ref}. See
    [Asterisk sip.conf sample](https://github.com/asterisk/asterisk/blob/15.1.1/configs/samples/sip.conf.sample#L869)
    for more informations.
- The `sources` section of the `xivo-dird` service configuration has been changed to be a key-value
  setting.

  - If you have configured directories manually in `/etc/xivo-dird` you should update your manual
    configuration:

  ```{.sourceCode .yaml}
  services:
    lookup:
      default:
        sources:
          - source_one
          - source_two
        timeout: 2
  ```

  ```{.sourceCode .yaml}
  services:
    lookup:
      default:
        sources:
          source_one: true
          source_two: true
        timeout: 2
  ```

- The `enabled_plugins` section of the `xivo-confd` service configuration has been changed. If you
  have configured enabled plugins manually you should update your manual configuration

  - This section is now a key-value setting.
  - All plugins have been renamed without the suffix `_plugins`.

  ```{.sourceCode .yaml}
  enabled_plugins:
    - user_plugin
    - conference_plugin
  ```

  ```{.sourceCode .yaml}
  enabled_plugins:
    user: true
    conference: true
  ```

- There is a new `channelvars` option in `/etc/asterisk/manager.d/99-general.conf`. If you have
  manually configured `channelvars` already, you will have to manually merge the Wazo version with
  your version for them to work together.

### 17.16

- You must update the Wazo Client to 17.16.
- The _enabled_plugins_ section of the `wazo-auth` service has been renamed
  _enabled_backend_plugins_ and is now a dictionary.
  - If you have hand made configuration to modify the list of enabled backends it should be modified
    see `/etc/wazo-auth/config.yml`
- The _ldap_user_ backend in `wazo-auth` is now disabled in the base configuration file.

  - If you are using the `ldap_user` authentication backend a file with the following content should
    be added to `/etc/wazo-auth/conf.d`

    ```{.sourceCode .yaml}
    enabled_backend_plugins:
      ldap_user: true
    ```

- The _enabled_plugins_ section of the `xivo-dird` service is now a dictionary.
  - If you have hand made configuration to modify the list of enabled plugins, it should be modified
    see `/etc/xivo-dird/config.yml`
- wazo-admin-ui has been upgraded to python3. All plugins by [Wazo Team]{.title-ref} has been
  migrated, but if you have installed a non-official/custom plugin that add something to the new
  interface, it probably broken. To fix this, you must convert your plugin to python3 or wait an
  available upgrade from the maintainer.
- If you have setup a custom X.509 certificate for HTTPS (e.g. from Let's Encrypt), you have to
  update your config in `/etc/xivo/custom/custom-certificate.yml`, according to the
  [updated documentation](/uc-doc/system/https_certificate), namely for the config regarding
  `websocketd`.

### 17.15

- `xivo-call-logd` has been renamed `wazo-call-logd`
  - The custom configuration has been moved to `/etc/wazo-call-logd/conf.d/`.
  - The log file has been renamed to `wazo-call-logd.log`.
  - The NGINX proxy has been recreated in `/etc/nginx/locations/https-enabled/wazo-call-logd`
- `Asterisk` has been upgraded to version 15.0.0
  - If you have installed asterisk modules manually, you will have to install the asterisk 15
    version, otherwise Asterisk will crash when starting.

Consult the [17.15 Roadmap](https://projects.wazo.community/versions/268) for more information.

### 17.14

- `xivo-auth` has been renamed `wazo-auth`
  - If you have developed a `xivo-auth` authentication backend the name of the entry point has
    changed to `wazo_auth.backends`. You should make this modification in your plugin's `setup.py`
    file in the `entry_point` section.
  - If your custom development use service discovery to find `xivo-auth`, you will have to search
    for the `wazo-auth` service instead of `xivo-auth`.
- We released a new version of the CTI client, rebranded as [Wazo Client 17.14.1]{.title-ref}. It is
  compatible with all previous versions of Wazo (i.e. not before 16.16).

Consult the [17.14 Roadmap](https://projects.wazo.community/versions/267) for more information.

### 17.13

Consult the [17.13 Roadmap](https://projects.wazo.community/versions/266) for more information.

### 17.12

- Wazo has a new database named `mongooseim`. The
  [backup-restore procedure](/uc-doc/system/backup_restore#backup) has been updated to include this
  new database.

Consult the [17.12 Roadmap](https://projects.wazo.community/versions/265) for more information.

### 17.11

- wazo-plugind REST API version `0.1` has been deprecated and will be removed in Wazo `18.02`. See
  changelog for version [REST API changelog](/uc-doc/api_sdk/rest_api/changelog)

Consult the [17.11 Roadmap](https://projects.wazo.community/versions/263) for more information.

### 17.10

Consult the [17.10 Roadmap](https://projects.wazo.community/versions/262) for more information.

### 17.09

- Codecs can now be customized in the [/etc/asterisk/codecs.d/]{.title-ref} directory. If you had
  custom configuration in [/etc/asterisk/codecs.conf]{.title-ref} you will have to create a new file
  in [codecs.d]{.title-ref} to use your customized configuration. A file named
  [codecs.conf.dpkg-old]{.title-ref} will be left in [/etc/asterisk]{.title-ref} if this operation
  is required.
- Provd plugins from the addons repository have been merged into the main plugin repository. If you
  were using the addons repository you can safely switch back to the stable repository. See
  [Alternative plugins repository](/uc-doc/administration/provisioning/basic_configuration#alternative-plugins-repo)
  for more details.
- The command `xivo-call-logs` has been deprecated in favor of `wazo-call-logs`.
- The command `xivo-service` has been deprecated in favor of `wazo-service`.
- If you have a [custom certificate configured](/uc-doc/system/https_certificate), you will need to
  add a new symlink for the new daemon wazo-webhookd:

      ln -s "/etc/xivo/custom/custom-certificate.yml" "/etc/wazo-webhookd/conf.d/010-custom-certificate.yml"

Consult the [17.09 Roadmap](https://projects.wazo.community/versions/261) for more information.

### 17.08

- The call logs has been improved by adding `date_end` and `date_answer` informations. If you want
  to add these new informations to the old call logs, you need to regenerate them. For example, to
  regenerate the last month of call logs:

      xivo-call-logs delete -d 30
      xivo-call-logs generate -d 30

  This is only useful if you plan to use the call logs REST API to read calls that have been placed
  before the upgrade.

- If you have setup a custom X.509 certificate for HTTPS (e.g. from Let's Encrypt), you have to
  update your config in `/etc/xivo/custom/custom-certificate.yml`, according to the
  [updated documentation](/uc-doc/system/https_certificate), namely for the config regarding
  `plugind`.

Consult the [17.08 Roadmap](https://projects.wazo.community/versions/260) for more information.

### 17.07

Consult the [17.07 Roadmap](https://projects.wazo.community/versions/259) for more information.

### 17.06

- Upgrade from version older than 13.01 are not supported anymore.

Consult the [17.06 Roadmap](https://projects.wazo.community/versions/258) for more information.

### 17.05

- [python-flask-cors]{.title-ref} has been updated from 1.10.3 to 3.0.2. Configuration files with
  custom [allow_headers]{.title-ref} will have to be updated to the new syntax. The following
  command can be used to see if you have a configuration file which needs to be updated.

  ```{.sourceCode .sh}
  for f in $(find /etc/*/conf.d -name '*.yml'); do grep -H allow_headers $f; done
  ```

  The old config in `/etc/xivo-*/conf.d` looked like:

      rest_api:
        cors:
          allow_headers: Content-Type, X-Auth-Token

  The new config in `/etc/xivo-*/conf.d` looks like:

      rest_api:
        cors:
          allow_headers: ["Content-Type", "X-Auth-Token"]

  See also the reference ticket [#6617](https://projects.wazo.community/issues/6617).

Consult the [17.05 Roadmap](https://projects.wazo.community/versions/257) for more information.

### 17.04

Consult the [17.04 Roadmap](https://projects.wazo.community/versions/256) for more information.

### 17.03

Consult the [17.03 Roadmap](https://projects.wazo.community/versions/255) for more information.

### 17.02

- A few more services are now available by default on port TCP/443 (the complete list is documented
  in the [Nginx](/uc-doc/system/nginx) section). This does not pose any additional security risk by
  default, but if you have extra strict requirements about security, they can be manually disabled.

Consult the [17.02 Roadmap](https://projects.wazo.community/versions/254) for more information.

### 17.01

Consult the [17.01 Roadmap](https://projects.wazo.community/versions/253) for more information.

## 2016

### 16.16

Wazo 16.16 is the _first public release_ of the project under the Wazo name. It is also the first
release of Wazo under the "phoenix" codename.

- A [special procedure](/uc-doc/upgrade/upgrade_notes_details/16-16/xivo_to_wazo) is required to
  upgrade from XiVO to Wazo.
- Asterisk has been upgraded from version 13.11.2 to 14.2.1, which is a major Asterisk upgrade.
- If you are using [custom sheets]{.title-ref} that are stored locally, they _must_ now be readable
  by the system user `xivo-ctid`. Make sure that this user has read access to the UI file of your
  custom sheets.
- Switchboard statistics have been removed. The existing statistics data remain in the database for
  later migration but no more statistics will be collected.
- The `conference` destination type in incalls REST API has been renamed to `meetme`.
- The phonebook has been migrated from the web interface to xivo-dird. The phonebook contacts from
  the web interface have been moved to new dird-phonebooks. For users with many entities on the same
  Wazo, this will create one phonebook for each entity. The configuration has been updated to keep
  the previous behavior. No manual actions are required for installations with only one entity or if
  one phonebook by entity is the desired configuration. If only one phonebook is desired for all
  entities, some of the duplicate phonebooks can be deleted from the web interface and their
  matching configuration can also be removed.
  - The list of phonebooks can be modified in
    `Services --> IPBX --> IPBX services --> Phonebook`{.interpreted-text role="menuselection"}
  - The list of phonebooks sources can be modified in:
    - `Configuration --> Management --> Directories`{.interpreted-text role="menuselection"}
    - `Services --> CTI Server --> Directories --> Definitions`{.interpreted-text
      role="menuselection"}
  - The selected phonebooks for reverse lookups can be modified in
    `Services --> CTI Server --> Directories --> Reverse directories`{.interpreted-text
    role="menuselection"}
  - Direct directories can be modified in
    `Services --> CTI Server --> Directories --> Direct directories`{.interpreted-text
    role="menuselection"}

Please consult the following detailed upgrade notes for more information:

- [XiVO to Wazo Upgrade Notes](/uc-doc/upgrade/upgrade_notes_details/16-16/xivo_to_wazo)
- [Asterisk 13 to 14 Upgrade Notes](/uc-doc/upgrade/upgrade_notes_details/16-16/asterisk_14)

Consult the [16.16 Roadmap](https://projects.wazo.community/versions/252) for more information.

### 16.13

XiVO 16.13 is the _last public release_ of the project under the name XiVO.

- Previously, a user's `DND (Do Not Distrub)`{.interpreted-text role="abbr"} was effective only if
  this user had DND enabled _and_ the DND extension (\*25 by default) was also enabled. Said
  differently, disabling the DND extension meant that no user could effectively be in DND. Starting
  from XiVO 16.13, a user's DND is effective regardless of the state of the DND extension. The
  following features are impacted in the same way: call recording, incoming call filtering, forward
  on non-answer, forward on busy and unconditional forward.
- If you have manually added nginx configuration files to the
  `/etc/nginx/locations/http`{.interpreted-text role="file"} directory, you'll need to move these
  files to `/etc/nginx/locations/http-available`{.interpreted-text role="file"} and then create
  symlinks to them in the `/etc/nginx/locations/http-enabled`{.interpreted-text role="file"}
  directory. This also applies to the https directory. See [Nginx](/uc-doc/system/nginx).
- A regression has been introduced in the switchboard statistics. See
  [issue 6443](http://projects.wazo.community/issues/6443).

Consult the [16.13 Roadmap](https://projects.wazo.community/versions/249) for more information.

### 16.12

Consult the [16.12 Roadmap](https://projects.wazo.community/versions/248) for more information.

### 16.11

- Fax reception: the "log" backend type has been removed. You should remove references to it in your
  `/etc/xivo/asterisk/xivo_fax.conf`{.interpreted-text role="file"} if you were using it. Now, every
  time a fax is processed, a log line is added to `/var/log/xivo-agid.log`{.interpreted-text
  role="file"}.

Consult the [16.11 Roadmap](https://projects.wazo.community/versions/247) for more information.

### 16.10

- The config file `/etc/xivo/xivo-confgend.conf` has been replaced with
  `/etc/xivo-confgend/config.yml` and `/etc/xivo-confgend/conf.d`. Custom modifications to this file
  are not migrated automatically, so manual intervention is required to migrate custom values to the
  `conf.d` directory. The file `/etc/xivo/xivo-confgend/asterisk/contexts.conf` has been moved to
  `/etc/xivo-confgend/templates/contexts.conf`, but custom modification are left untouched. See also
  [Configuration Files](/uc-doc/system/configuration_files) for more details about configuration
  files in XiVO.

Consult the [16.10 Roadmap](https://projects.wazo.community/versions/246) for more information.

### 16.09

- The Wazo Client now uses xivo-ctid-ng to do transfers. Those new transfers cannot be cancelled
  with the `*0` DTMF sequence and there is no interface in the Wazo Client to cancel a transfer for
  profiles other than the switchboard (bug [#6321](http://projects.wazo.community/issues/6321)).
  This will be addressed in a later version.
- Transfers started from the Wazo Client do not respect the `Dial timeout on transfer` option
  anymore (bug [#6322](http://projects.wazo.community/issues/6322)). This feature will be
  reintroduced in a later version.

Consult the [16.09 Roadmap](https://projects.wazo.community/versions/245) for more information.

### 16.08

- cti-protocol is now in version _2.2_
- Some
  [security features have been added to the XiVO provisioning server](/uc-doc/administration/provisioning/adv_configuration#provd-security).
  To benefit from these new features, you'll need to
  [update your xivo-provd plugins to meet the system requirements](/uc-doc/administration/provisioning/adv_configuration#provd-security-requirements).

  If you have many phones that are connected to your XiVO through a NAT equipment, you should review
  the default configuration to make sure that the IP address of your NAT equipment don't get banned
  unintentionally by your XiVO.

- Newly created groups and queues now ignore call forward requests from members by default.
  Previously, call forward requests from members were always followed. This only applies to call
  forward configured directly on the member's phone: call forward configured via \*21 have always
  been ignored in these cases.

  Note that during the upgrade, the previous behaviour is kept for already existing queues and
  groups.

  This behaviour is now configurable per queue/group, via the "Ignore call forward requests from
  members" option under the "Application" tab. We recommend enabling this option.

Consult the [16.08 Roadmap](https://projects.wazo.community/versions/244) for more information.

### 16.07

- If you were affected by the [bug #6213](http://projects.wazo.community/issues/6213), i.e. if your
  agent login time statistics were incorrect since your upgrade to XiVO 15.20 or later, and you want
  to fix your statistics for that period of time, you'll need to
  [manually apply a fix](http://projects.wazo.community/issues/6213#note-3).

Consult the [16.07 Roadmap](https://projects.wazo.community/versions/243) for more information.

### 16.06

Consult the [16.06 Roadmap](https://projects.wazo.community/versions/242) for more information.

### 16.05

- The `view`, `add`, `edit`, `delete` and `deleteall` actions of the "lines" web service provided by
  the web interface have been removed. As a reminder, note that the web services provided by the web
  interface are deprecated.

Consult the [16.05 Roadmap](https://projects.wazo.community/versions/241) for more information.

### 16.04

- cti-protocol is now in version _2.1_
- The field `Rightcall Code`{.interpreted-text role="guilabel"} from
  `Services -> IPBX -> IPBX Settings -> Users`{.interpreted-text role="menuselection"} under
  `Services`{.interpreted-text role="guilabel"} tab will overwrite all password call permissions for
  the user.
- Faxes stored on FTP servers are now converted to PDF by default. See
  [Using the FTP backend](/uc-doc/administration/fax#fax-ftp) if you want to keep the old behavior
  of storing faxes as TIFF files.

Consult the [16.04 Roadmap](https://projects.wazo.community/versions/240) for more information.

### 16.03

- The new section `Services --> Statistics --> Switchboard`{.interpreted-text role="menuselection"}
  in the web interface will only be visible by a non-root administrator after adding the
  corresponding permissions in the administrator configuration.
- Update the switchboard configuration page for the statistics in
  switchboard_configuration_multi_queues.
- The API for associating a line to a device has been replaced. Consult the
  [xivo-confd changelog](/uc-doc/api_sdk/rest_api/changelog) for further details
- The configuration parameters of _xivo_ldap_user_ plugin of _xivo-auth_ has been changed. See
  [xivo_ldap plugin](/uc-doc/system/wazo-auth/stock_plugins#auth-backends-ldap).
- The user's email is now a unique constraint. Every duplicate email will be deleted during the
  migration. (This does not apply to the voicemail's email)

Consult the [16.03 Roadmap](https://projects.wazo.community/versions/239) for more information.

### 16.02

- The experimental _xivo_ldap_voicemail_ plugin of _xivo-auth_ has been removed. Use the new
  [xivo_ldap plugin](/uc-doc/system/wazo-auth/stock_plugins#auth-backends-ldap).
- Bus messages in the _xivo_ exchange are now sent with the content-type
  [application/json]{.title-ref}. Some libraries already do the message conversion based the
  content-type. Kombu users will receive a python dictionnary instead of a string containing json
  when a message is received.
- [xivo-ctid encryption]{.title-ref} is automatically switched on for every XiVO server and Wazo
  Client >= 16.02. If you really don't want encryption, you must disable it manually on the server
  after the upgrade. In that case, Wazo Clients will ask whether to accept the connection the first
  time.

Consult the [16.02 Roadmap](https://projects.wazo.community/versions/238) for more information.

### 16.01

- The page `Configuration --> Management --> Web Services Access --> Acces rights`{.interpreted-text
  role="menuselection"} has been removed. Consequently, every Web Services Access has now all access
  rights on the web services provided by the web interface. These web services are deprecated and
  will be removed soon.
- During the upgrade, if no CA certificates were trusted at the system level, all the CA
  certificates from the ca-certificates package will be added. This is done to resolve an issue with
  installations from the ISO and PXE. In the (rare) case you manually configured the ca-certificates
  package to trust no CA certificates at all, you'll need to manually reconfigure it via
  `dpkg-reconfigure ca-certificates` after the upgrade.
- _xivo-ctid_ uses _xivo-auth_ to authenticate users.
- the [service_discovery]{.title-ref} section of the _xivo-ctid_ configuration has changed. If you
  have set up contact_and_presence_sharing, you should update your xivo-ctid configuration.
- the cti-protocol is now versioned and a message will be displayed if the server and a client have
  incompatible protocol versions.

Consult the [16.01 Roadmap](https://projects.wazo.community/versions/237) for more information.
