---
title: Archived Upgrade Notes
---

## 2017

### 17.17

- The default NAT option has changed from `no` to `auto_force_rport`. This makes NAT configuration
  easier but has no impact on environments without NAT.
  - In the rare cases where you want to keep `nat=no` you must explicitly change this value in the
    administation interface `Services --> IPBX --> General Settings --> SIP Protocol` in tab
    `Default`. See
    [Asterisk sip.conf sample](https://github.com/asterisk/asterisk/blob/15.1.1/configs/samples/sip.conf.sample#L869)
    for more informations.
- The `sources` section of the `xivo-dird` service configuration has been changed to be a key-value
  setting.

  - If you have configured directories manually in `/etc/xivo-dird` you should update your manual
    configuration:

        ```yaml
        services:
          lookup:
            default:
              sources:
                - source_one
                - source_two
              timeout: 2
        ```

        ```yaml
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

    ```yaml
    enabled_plugins:
      - user_plugin
      - conference_plugin
    ```

    ```yaml
    enabled_plugins:
      user: true
      conference: true
    ```

- There is a new `channelvars` option in `/etc/asterisk/manager.d/99-general.conf`. If you have
  manually configured `channelvars` already, you will have to manually merge the Wazo version with
  your version for them to work together.

### 17.16

- You must update the Wazo Client to 17.16.
- The `enabled_plugins` section of the `wazo-auth` service has been renamed
  `enabled_backend_plugins` and is now a dictionary.
  - If you have hand made configuration to modify the list of enabled backends it should be modified
    see `/etc/wazo-auth/config.yml`
- The `ldap_user` backend in `wazo-auth` is now disabled in the base configuration file.

  - If you are using the `ldap_user` authentication backend a file with the following content should
    be added to `/etc/wazo-auth/conf.d`

    ```yaml
    enabled_backend_plugins:
      ldap_user: true
    ```

- The `enabled_plugins` section of the `xivo-dird` service is now a dictionary.
  - If you have hand made configuration to modify the list of enabled plugins, it should be modified
    see `/etc/xivo-dird/config.yml`
- wazo-admin-ui has been upgraded to python3. All plugins by `Wazo Team` has been migrated, but if
  you have installed a non-official/custom plugin that add something to the new interface, it
  probably broken. To fix this, you must convert your plugin to python3 or wait an available upgrade
  from the maintainer.
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

### 17.14

- `xivo-auth` has been renamed `wazo-auth`
  - If you have developed a `xivo-auth` authentication backend the name of the entry point has
    changed to `wazo_auth.backends`. You should make this modification in your plugin's `setup.py`
    file in the `entry_point` section.
  - If your custom development use service discovery to find `xivo-auth`, you will have to search
    for the `wazo-auth` service instead of `xivo-auth`.
- We released a new version of the CTI client, rebranded as `Wazo Client 17.14.1`. It is compatible
  with all previous versions of Wazo (i.e. not before 16.16).

### 17.13

### 17.12

- Wazo has a new database named `mongooseim`. The
  [backup-restore procedure](/uc-doc/system/backup_restore#backup) has been updated to include this
  new database.

### 17.11

- wazo-plugind REST API version `0.1` has been deprecated and will be removed in Wazo `18.02`. See
  changelog for version [REST API changelog](/uc-doc/api_sdk/rest_api/changelog)

### 17.10

### 17.09

- Codecs can now be customized in the `/etc/asterisk/codecs.d/` directory. If you had custom
  configuration in `/etc/asterisk/codecs.conf` you will have to create a new file in `codecs.d` to
  use your customized configuration. A file named `codecs.conf.dpkg-old` will be left in
  `/etc/asterisk` if this operation is required.
- Provd plugins from the addons repository have been merged into the main plugin repository. If you
  were using the addons repository you can safely switch back to the stable repository. See
  [Alternative plugins repository](/uc-doc/administration/provisioning/basic_configuration#alternative-plugins-repo)
  for more details.
- The command `xivo-call-logs` has been deprecated in favor of `wazo-call-logs`.
- The command `xivo-service` has been deprecated in favor of `wazo-service`.
- If you have a [custom certificate configured](/uc-doc/system/https_certificate), you will need to
  add a new symlink for the new daemon wazo-webhookd:

      ln -s "/etc/xivo/custom/custom-certificate.yml" "/etc/wazo-webhookd/conf.d/010-custom-certificate.yml"

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

### 17.07

### 17.06

- Upgrade from version older than 13.01 are not supported anymore.

### 17.05

- `python-flask-cors` has been updated from 1.10.3 to 3.0.2. Configuration files with custom
  `allow_headers` will have to be updated to the new syntax. The following command can be used to
  see if you have a configuration file which needs to be updated.

    ```shell
    for f in $(find /etc/*/conf.d -name '*.yml'); do grep -H allow_headers $f; done
    ```

  The old config in `/etc/xivo-*/conf.d` looked like:

    ```yaml
    rest_api:
      cors:
        allow_headers: Content-Type, X-Auth-Token
    ```

  The new config in `/etc/xivo-*/conf.d` looks like:

    ```yaml
    rest_api:
      cors:
        allow_headers: ['Content-Type', 'X-Auth-Token']
    ```

### 17.04

### 17.03

### 17.02

- A few more services are now available by default on port TCP/443 (the complete list is documented
  in the [Nginx](/uc-doc/system/nginx) section). This does not pose any additional security risk by
  default, but if you have extra strict requirements about security, they can be manually disabled.

### 17.01
