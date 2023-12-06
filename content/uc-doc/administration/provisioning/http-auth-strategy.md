---
title: Remote Provisioning
---

The provisioning server allows to choose the authentication mechanism to be used in various
environments. Available methods are:

- [Disabled (default)](#disabled)
- [Provisioning Key by Tenant](#provisioning-key-by-tenant)

## Disabled (default) {#disabled}

The authentication system is disabled by default to allow a configuration-free provisioning system.
Wazo will detect devices and set them in autoprov mode according to some criteria (ex: phone
vendors, MAC address, etc..). As mentioned in the
[security](/uc-doc/administration/provisioning/adv_configuration#provd-security) section, guessing
this information could be relatively easy. It's why auto-provisioning without authentication
strategy should only be used locally and not on the Internet.

## Provisioning Key by Tenant {#provisioning-key-by-tenant}

A provisioning key is used to have a secure endpoint to expose device configuration. The key will be
added as a path prefix to all provisioning URLs.

### Change the Authentication Strategy {#change-auth-strategy}

To set the authentication strategy to use a provisioning key:

1. Change the configuration setting in the
   [wazo-provd configuration file](/uc-doc/system/configuration_files#wazo-provd).

   - `/etc/wazo-provd/conf.d/50-http-auth-strategy.yml`

   ```yaml
   general:
     http_auth_strategy: url_key
   ```

2. Restart the provisioning service: `systemctl restart wazo-provd`

**Warning**: To avoid leaking provisioning keys, the
[HTTPS for auto-provisioning](/uc-doc/administration/provisioning/basic_configuration#https-autoprovisioning)
should be used.

### How to Configure

1. Change the authentication strategy to use [`url_key`](#change-auth-strategy)
2. Configure
   [HTTPS for auto-provisioning](/uc-doc/administration/provisioning/basic_configuration#https-autoprovisioning)
   and change the `provision_http_base_url`
3. Generate a provisioning key (random alphanumeric string). The minimum length is 8 characters and
   the maximum is 255 characters.
4. Use wazo-provd API with the right `Wazo-Tenant` header to set the provisioning key for a
   particular tenant. If no tenant is provided, the tenant of the token used will be configured.

   ```http
   PUT /configure/provisioning_key`
   {
     "param": {
       "value": "a1b2c3d4e5f6g7h8"
     }
   }
   ```

5. Manually enter the provisioning URL (including provisioning key) into the device configuration.

   - `https://wazo.example.com/device/provisioning/<provisioning-key>/`

**Note**: Provisioning plugins should be updated to a recent version to use this feature (i.e. a
version released after 2023-10)
