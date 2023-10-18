---
title: Remote Provisioning
---

Provisioning server allows to cwchoosingchose the authentication mechanism to be used in various
environments. Available methods are:

- [Disabled (default)](#disabled)
- [Provisioning Key by Tenant](#provisioning-key-by-tenant)

## Disabled (default) {#disabled}

The authentication system is disabled by default to allow a configuration free provisioning system.
Wazo will detect devices and set them in autoprov according to some criteria (ex: phone vendors, MAC
address, etc..). As mentioned in
[security](/uc-doc/administration/provisioning/adv_configuration#provd-security) section, knowing
this information could be relatively easy. It's why auto-provisioning should only be used locally
and not on the internet

## Provisioning Key by Tenant {#provisioning-key-by-tenant}

A provisioning key is used to have a secure endpoint to expose device configuration. The key will be
added as prefix to all provisioning URL.

### Change Authentication Strategy {#change-auth-strategy}

To set authentication strategy to use provisioning key, it must be configured through the
[wazo-provd configuration file](/uc-doc/system/configuration_files#wazo-provd).

- `/etc/wazo-provd/conf.d/50-http-auth-strategy.yml`

```yaml
general:
  http_auth_strategy: url_key
```

**Warning**: To avoid leak provisioning key, only HTTPS endpoint should be used as provisioning URL

### How to Configure

1. Change authentication strategy to use [`url_key`](#change-auth-strategy)
2. Generate a provisioning key (random alphanumeric string)
3. Use `PUT /configure/provisioning_key` with the right `Wazo-Tenant` header to set the provisioning
   key
4. Manually enter the provisioning URL (including provisioning key) into the device configuration.

   - `https://wazo.example.com/device/provisioning/<provisioning-key>/`
