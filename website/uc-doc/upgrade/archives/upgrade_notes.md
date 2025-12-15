---
title: Archived Upgrade Notes
---

## 2021

## 21.16 {#21-16}

- Throttling was added in the nginx configuration of the following routes:

  - `/api/auth/0.1/backends`
  - `/api/auth/0.1/status`
  - `/api/confd/1.1/guests/me/meetings/<meeting_uuid>`
  - `/api/confd/1.1/wizard`

  The request rate is limited at 25 requests per second, with an allowed burst of 15 requests. If
  you have any nginx custom configuration (e.g. using certbot), you will be asked a question about
  the `/etc/nginx/sites-available/wazo` configuration file during the upgrade. You _must_ accept the
  maintainer version, then reapply your custom configuration, which is saved in
  `/etc/nginx/sites-available/wazo.dpkg-old`.

- If you installed Wazo Platform before 21.01, you will have an error about an invalid signature.
  See the [troubleshooting](/uc-doc/upgrade#invalid-signature-before-2201-only) section for the fix.

Consult the
[21.16 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.16)
for more information.

## 21.15 {#21-15}

Consult the
[21.15 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.15)
for more information.

## 21.14 {#21-14}

Consult the
[21.14 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.14)
for more information.

## 21.13 {#21-13}

Consult the
[21.13 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.13)
for more information.

## 21.12 {#21-12}

Consult the
[21.12 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.12)
for more information.

## 21.11 {#21-11}

Consult the
[21.11 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.11)
for more information.

## 21.10 {#21-10}

- All Snom, Yealink and Aastra / Mitel phone plugins now use by default the following preferred
  codecs: G711A, G711U, G722 and G729. Other codecs are disabled by default. Administrators wanting
  to use other codecs must define them in
  [custom templates](/documentation/overview/provisioning-admin.html).

- The `wazo-dird` Google backend has migrated from using the deprecated Contacts API to the People
  API. To make valid requests, the Google Cloud application must have either the
  `https://www.googleapis.com/auth/contacts` or the
  `https://www.googleapis.com/auth/contacts.readonly`
  [permissions](https://developers.google.com/people/contacts-api-migration#read). Also, the Google
  Cloud application must enable the People API instead of the Contacts API;
  [here's how to do that](https://support.google.com/googleapi/answer/6158841?hl=en).

Consult the
[21.10 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.10)
for more information.

## 21.09 {#21-09}

- You are now required to have the same access you are attempting to assign to another resource
  (i.e. users/groups). Following this logic, admin now have access to all resources in their tenant
  by default.

Consult the
[21.09 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.09)
for more information.

## 21.08 {#21-08}

Consult the
[21.08 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.08)
for more information.

## 21.07 {#21-07}

Consult the
[21.07 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.07)
for more information.

## 21.06 {#21-06}

- Call recording filenames are now exposed using the CDR API. The filenames on the filesystem are
  now auto-generated using a UUID and an extension only.
- Call recording files are now automatically purged (default: after 1 year). However, call recording
  files that were created before Wazo Platform 21.03 will not be purged automatically. Those
  recording files can be found in `/var/lib/wazo/sounds/tenants/*/monitor` and you can remove the
  **older** files manually without risk.

Consult the
[21.06 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.06)
for more information.

## 21.05 {#21-05}

- `wazo-sysconfd` configuration has been migrated to `/etc/wazo-sysconfd/config.yml`. However, if
  you had modified the `/etc/xivo/sysconfd.conf` configuration file, you should create a new file in
  the `/etc/wazo-sysconfd/conf.d` directory with your changes.

Consult the
[21.05 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.05)
for more information.

## 21.04 {#21-04}

- `xivo-sysconfd` has been renamed to `wazo-sysconfd`
- Call recording will now play a beep when the recording starts and end. This behavior can be
  modified in `/etc/xivo/asterisk/xivo_globals.conf` by modifying the `WAZO_MIXMONITOR_OPTIONS`. See
  the
  [Asterisk documentation](https://docs.asterisk.org/Asterisk_18_Documentation/API_Documentation/Dialplan_Applications/MixMonitor)
  for available options.
- The group resource is now identified by a UUID instead of sequential ID. The API using sequential
  ID will keep working for a while. Policies with permissions for a specific group will have to be
  changed to use the UUID of the group instead of its ID. This only happens if you create policies
  with permissions limited to a specific group.

  For example: `confd.groups.42.read` would have to be updated to use the UUID of the group with
  ID 42.

Consult the
[21.04 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.04)
for more information.

## 21.03 {#21-03}

- Call logs have been moved to wazo-call-logd database. The migration will be automated for everyone
  with less than 10M entries, for the others, the upgrade will ask you to run the
  `wazo-call-logd-migrate-db` command manually to complete the migration. Note that this command can
  take a while to execute.

- The following dialplan variables have been deprecated from the Wazo dialplan

  - `XIVO_GROUPSUB` should be replaced by the `__WAZO_GROUP_SUBROUTINE` variable
  - `XIVO_QUEUESUB` should be replaced by the `__WAZO_QUEUE_SUBROUTINE` variable

- Call recording will now record calls on queues and groups when the answering user has the
  recording option enabled.

Consult the
[21.03 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.03)
for more information.

## 21.02 {#21-02}

Consult the
[21.02 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.02)
for more information.

## 21.01 {#21-01}

- Asterisk version has been updated:
  - [Asterisk 17 to 18 Upgrade Notes](/uc-doc/upgrade/upgrade_notes_details/21-01/asterisk_18)
- Deprecated conference system (`meetme`) has been completely removed. Meetme conferences have not
  been configurable since 18.03 and unusable since 19.17. Note that recordings have been removed
  from backup (i.e. `/var/spool/asterisk/meetme`).
- The way pre-dial handlers can be added in a subroutine has been changed. See
  [pre-dial handlers](/uc-doc/api_sdk/subroutine) for more details.

  - If you used custom dialplan to add the `b` option to the `XIVO_CALLOPTIONS` you should update it
    to use the `wazo-add-pre-dial-hook` subroutine.

    ```dialplan
    ; A subroutine with this line
    same = n,Set(XIVO_CALLOPTIONS=${XIVO_CALLOPTIONS}b(my-subroutine^s^1))
    ; should become
    same = n,GoSub(wazo-add-pre-dial-hook,s,1(my-subroutine))
    ```

- dahdi-linux-modules has been removed by default if no configuration found (i.e.
  `/etc/asterisk/dahdi_channels.conf`). Moreover, wazo-upgrade will stop to upgrade this package by
  default.

Consult the
[21.01 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D21.01)
for more information.

## 2020

### 20.17 {#20-17}

- The recording files for online recording, i.e. recording started during a call, are now stored at
  `/var/lib/wazo/sounds/tenants/*/monitor`. Old recordings are available at
  `/var/spool/asterisk/monitor/` and must be moved manually to the new path.

Consult the
[20.17 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D20.17)
for more information.

### 20.16 {#20-16}

- The `i386` (32 bits) architecture is now deprecated and will be removed in 21.01 from our debian
  repository and CI. See
  [Migrate from i386 to amd64](/uc-doc/upgrade/archives/migrate_i386_to_amd64) for more information.
- wazo-auth ACL template feature has been removed. There are no more rendering template that will be
  done for ACL. Endpoints and fields have been deprecated. See
  [wazo-auth changelog 20.16](https://github.com/wazo-platform/wazo-auth/blob/master/CHANGELOG.md#2016)
- wazo-dird backend plugins now support `match_all` method. See
  [wazo-dird](/uc-doc/system/wazo-dird/developer) for more information
- Asterisk configuration files in `/etc/asterisk` are required to have a name ending with `.conf` to
  be applied.

Consult the
[20.16 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D20.16)
for more information.

### 20.15 {#20-15}

- This version contains a security update for Asterisk. All systems should be upgraded.

  - [AST-2020-002: Outbound INVITE loop on challenge with different nonce](https://downloads.asterisk.org/pub/security/AST-2020-002.html)
  - [AST-2020-001: Remote crash in res_pjsip_session](https://downloads.asterisk.org/pub/security/AST-2020-001.html)

Consult the
[20.15 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D20.15)
for more information.

### 20.14 {#20-14}

- `xivo-stat` command has been renamed to `wazo-stat`

Consult the
[20.14 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D20.14)
for more information.

### 20.13 {#20-13}

- The SIP endpoint configuration has been changed to reflect the Asterisk configuration file. If you
  are using one of the following API, you should update your application to the new body of the
  response before upgrading.

  - `GET /api/confd/1.1/endpoints/sip`
  - `GET /api/confd/1.1/endpoints/sip/<id>`
  - `GET /api/confd/1.1/users/<id>/lines/main/associated/endpoints/sip`
  - `GET /api/confd/1.1/users/<id>/lines/<id>/associated/endpoints/sip`

- The ID field of a SIP endpoint is now a UUID instead of a numerical ID.

- The generated SIP configuration file has changed. If you did manual configuration, your changes
  have to be reviewed to match the new format. If you use a file to add options, you will be able to
  add all options to your endpoint configuration. All options are now available through the API.
  Here is a list of the changes:

  - The name of the registration sections has changed

- The general SIP configuration used to be shared by all tenants. A new template has been created
  for each tenant based on the old general SIP configuration. This new template is labeled `global`
  and can be used to change the configuration of lines and trunks within a tenant.

- When creating a line or a tenant you should use the `global` template if you want your new
  resource to inherit from the `global` SIP configuration of your tenant.

Consult the
[20.13 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D20.13)
for more information.

### 20.12 {#20-12}

Consult the
[20.12 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D20.12)
for more information.

### 20.11 {#20-11}

Consult the
[20.11 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D20.11)
for more information.

### 20.10 {#20-10}

Consult the
[20.10 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D20.10)
for more information.

### 20.09 {#20-09}

- The wazo-confgend module that generates the SIP configuration for `chan_sip` has been removed. If
  you are still using `chan_sip` you will have to remove your custom configuration to use `pjsip`.

- The TLS configuration has been deprecated on the following services. You should always use NGINX
  to proxy communication with wazo-platform services. To follow this change, the listen address has
  been changed to 127.0.0.1 by default.

  - wazo-chatd
  - wazo-plugind
  - wazo-provd
  - wazo-setupd
  - wazo-websocketd

Consult the
[20.09 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D20.09)
for more information.

### 20.08 {#20-08}

- The TLS configuration has been deprecated on the following services. You should always use NGINX
  to proxy communication with wazo-platform services. To follow this change, the listen address has
  been changed to 127.0.0.1 by default.

  - wazo-agentd
  - wazo-calld
  - wazo-call-logd
  - wazo-webhookd

- `wazo-agentd` http configuration section has been moved to the rest_api section, eg:

  ```yaml
  rest_api:
    https:
      listen: <ip>
      port: <port>
  ```

  becomes:

  ```yaml
  rest_api:
    listen: <ip>
    port: <port>
  ```

Consult the
[20.08 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D20.08)
for more information.

### 20.07 {#20-07}

- The TLS configuration has been deprecated on the following services. You should always use NGINX
  to proxy communication with wazo-platform services. To follow this change, the listen address has
  been changed to 127.0.0.1 by default.

  - wazo-confd
  - wazo-dird

Consult the
[20.07 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D20.07)
for more information.

### 20.06 {#20-06}

- The TLS configuration has been deprecated on the following services. You should always use NGINX
  to proxy communication with wazo-platform services. To follow this change, the listen address has
  been changed to 127.0.0.1 by default.

  - wazo-auth

Consult the
[20.06 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D20.06)
for more information.

### 20.05 {#20-05}

- `wazo-amid`, `wazo-plugind` and `wazo-dird` http configuration section have been moved onto the
  rest_api section, eg:

  ```yaml
  rest_api:
    https:
      listen: <ip>
      port: <port>
      certificate: </path/to/cert>
      private_key: </path/to/key>
  ```

  becomes:

  ```yaml
  rest_api:
    listen: <ip>
    port: <port>
    certificate: </path/to/cert>
    private_key: </path/to/key>
  ```

- The TLS configuration has been deprecated on the following services. You should always use NGINX
  to proxy communication with wazo-platform services. To follow this change, the listen address has
  been changed to 127.0.0.1 by default.

  - wazo-amid

- There is now an API to manage SIP transports. This means that the transport of a SIP endpoint is
  not predefined anymore. If you relied on the fact that a SIP endpoint used the transport `wss` to
  know whether or not it is a WebRTC endpoint you should change your logic to check if `webrtc`
  equals to `yes`.

Consult the
[20.05 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D20.05)
for more information.

### 20.04 {#20-04}

- The PJSIP `Global` and `System` configuration options are now configured using
  `/1.1/asterisk/pjsip/global` and `/1.1/asterisk/pjsip/system`. Options added to the
  `/1.1/asterisk/sip/general` that used to be mapped to one of these sections have been migrated to
  the new API and the mapping from chan_sip to chan_pjsip has been removed for those 2 sections.

Consult the
[20.04 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D20.04)
for more information.

### 20.03 {#20-03}

- The email template in wazo-auth now use the incoming HTTP request host and port to fill the
  template instead of the service discovery configuration. If you have a customized template that
  inconditionally uses the port it should be modified for cases where the port is not used.
- The `xivo-aastra-2.6.0.2019` phone provisioning plugin has been removed. The decision was made
  after it was discovered that the firmware was nowhere to be found. If you still want to use it, it
  is in the `archive` phone plugin repository.

Consult the
[20.03 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D20.03)
for more information.

### 20.02 {#20-02}

Consult the
[20.02 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D20.02)
for more information.

### 20.01 {#20-01}

- The default protocol configured for consul is now `HTTP` instead of `HTTPS` since it's only
  available on `localhost`. The `HTTPS` remains available via the port `8501`.

Consult the
[20.01 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D20.01)
for more information.

## 2019

### 19.17 {#19-17}

- The default Ansible installation installs the development version of Wazo Platform. If you have
  not changed the `wazo_distribution_upgrade` variable, all the subsequent upgrades will stay on the
  development version. This is the expected behavior, but it was not visible in the installation
  procedure. To make your Wazo Platform use the stable version, use the following command:

  ```shell
  wazo-dist -m pelican-buster
  ```

  This command will take effect at the next Wazo Platform upgrade.

- `wazo-dird` phone plugins have been migrated to `wazo-phoned`. If you used the phone routes from
  `wazo-dird` directly, you must use the new routes in `wazo-phoned`.
- The conference rooms created in Wazo 18.03 or before (using asterisk `meetme` module) will not
  work anymore because they rely on DAHDI. If you were still using those conference rooms, you must
  create new conference rooms using the conferences API or the `wazo-ui` interface.
- `DAHDI` is not longer a mandatory dependency of Wazo: it will not be installed on new installs
  anymore. Upgraded Wazo Platform will keep DAHDI installed if it was configured in
  `/etc/asterisk/dahdi_channels.conf`. Otherwise, DAHDI will be removed.
- Some dependencies have been removed from the `asterisk` package. If you used one of the following
  modules you must install the `wazo-asterisk-extra-modules` to keep using those modules. Note that
  all modules listed here are disabled by default on Wazo. You have to manually modify
  `/etc/asterisk/modules.conf` to use them.
  - `app_jack`
  - `cdr_pgsql`
  - `cdr_radius`
  - `cdr_tds`
  - `cel_radius`
  - `cel_tds`
  - `chan_also`
  - `chan_console`
  - `chan_mgcp`
  - `chan_motif`
  - `chan_oss`
  - `chan_phone`
  - `chan_skinny`
  - `chan_unistim`
  - `res_calendar_caldav`
  - `res_calendar_ews`
  - `res_calendar_exchange`
  - `res_calendar_icalendar`
  - `res_calendar`
  - `res_snmp`
  - `res_xmpp`

Consult the
[19.17 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D19.17)
for more information.

### 19.16 {#19-16}

- `xivo-amid-client` has been renamed to `wazo-amid-client`
- `wazo-auth` http configuration section have been moved onto the `rest_api` section, eg:

  ```yaml
  rest_api:
    https:
      listen: <ip>
      port: <port>
      certificate: </path/to/cert>
      private_key: </path/to/key>
  ```

  becomes:

  ```yaml
  rest_api:
    listen: <ip>
    port: <port>
    certificate: </path/to/cert>
    private_key: </path/to/key>
  ```

- The default value for Asterisk PJSIP configuration parameter `rtptimeout` has been set to 7200
  seconds on new installs only. The change was done to automatically delete ghost calls that might
  get stuck. If you wish to modify this value, use the `/asterisk/sip/general` endpoint in
  `wazo-confd` API.

Consult the
[19.16 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D19.16)
for more information.

### 19.15 {#19-15}

- We have standardize the stevedore entry point namespace for our python client. If you have custom
  plugins, Be sure to use the full client name for the namespace. (e.g. `auth_client.commands` -->
  `wazo_auth_client.commands`)
- The directed call pickup extension `*8XXXX` has been disabled by default on new installations,
  because it made it possible for any user to pickup any other user, including users for whom it
  should not be possible. This does not apply to upgrades, but if you wish to disable this feature,
  you can do it with `wazo-confd` `/extensions/features` API endpoint.

Consult the
[19.15 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D19.15)
for more information.

### 19.14 {#19-14}

- A new version (v2) of websocket protocol has been created. See
  [Wazo WebSocket](/uc-doc/api_sdk/websocket) for more information

  The v1 is now deprecated and should not be used anymore. Also it does not return the attribute
  `msg` in all payloads as it was always empty.

- `xivo-confgend` has been renamed to `wazo-confgend`
  - The custom configuration files have been moved to `/etc/wazo-confgend/conf.d`
  - The log file has been renamed to `wazo-confgend.log`
  - The plugin entry points have been renamed from `xivo` to `wazo`. Plugins enabled in custom
    configuration files should use the new name.
  - The entry point identifier has been changed from `xivo_confgend` to `wazo_confgend`. If you have
    developed custom plugins for confgend you should use the new identifier in your `setup.py`.
- `xivo-confgend-client` has been renamed to `wazo-confgend-client`
  - If you used the `xivo-confgen` CLI tool you will now have to use `wazo-confgen`
- If you are upgrading a Wazo that was originally installed in 18.03 or earlier, the old directory
  configuration is now replaced with a new profile `default` for each tenant. The migration of the
  old directory configuration must be done manually, since there is no way to automatically detect
  the tenant for each directory configuration. To allow this migration, the old configuration is
  dumped in `/var/backups/xivo/dird_sources.yml` during the upgrade to Wazo Platform 19.14. The
  administrator must then recreate the directory configuration manually using the API or web
  interface.
- There is a [known bug](https://wazo-dev.atlassian.net/browse/WAZO-1254) that will remove
  pre-recorded sound files provided by the `xivo-sounds-*`, .e.g `xivo-sounds-fr-ca`. If you had
  installed one of these packages manually, you need to install the corresponding `wazo-sounds-*`
  package manually, e.g. `wazo-sounds-fr-ca`. Upgrades to Wazo >= 19.15 are not affected by this
  bug.

Consult the
[19.14 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D19.14)
for more information.

### 19.13 {#19-13}

- **Debian has been upgraded from version 9 (stretch) to 10 (buster).** Please consult the following
  detailed upgrade notes for more information:

- [Debian 10 (Buster) Upgrade Notes](/uc-doc/upgrade/upgrade_notes_details/19-13/buster)

- `xivo-amid` has been renamed to `wazo-amid`
  - The custom configuration has been moved to `/etc/wazo-amid/conf.d/`.
  - The log file has been renamed to `wazo-amid.log`.
  - The NGINX proxy has been recreated in `/etc/nginx/locations/https-enabled/wazo-amid`.

Consult the
[19.13 Tickets](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D19.13)
for more information.
