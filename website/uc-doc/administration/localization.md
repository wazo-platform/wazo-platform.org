---
title: Localization
---

Some wazo-platform features sometimes need to rely on geographic context.

For example,

- handling ambiguity when interpreting locale-dependent information such as phone numbers, and
  normalizing such information before further processing or storage;
- providing locale-aware presentation of information such as phone numbers;
- enabling wazo-platform client applications to provide locale-aware user interfaces.

For such purposes and others, the wazo-confd API `/localization` allows setting and reading a
_per-tenant_ geographic context, which is also exposed as a read-only attribute `country` of
[`/users` resources](/documentation/api/configuration.html#tag/users/operation/get_user).

To set the geographic context for a
tenant([wazo-confd API reference](/documentation/api/configuration.html#tag/localization/operation/update_localization)):

```shell
curl -XPUT -H "Content-Type: application/json" -H "X-Auth-Token: $token" -H  "Wazo-Tenant: $tenant_uuid" https://<stack hostname>/api/confd/1.1/localization -d '{"country": "FR"}'
```

To read the geographic context of a
tenant([wazo-confd API reference](/documentation/api/configuration.html#tag/localization/operation/get_localization)):

```shell
curl -XGET -H "X-Auth-Token: $token" -H  "Wazo-Tenant: $tenant_uuid" https://<stack hostname>/api/confd/1.1/localization
```

(where `$token` is an [authentication token](/tutorials/authenticate-user-wazo-api) and
`$tenant_uuid` is the UUID of the tenant)

The purpose of such geographic context information is not limited to a particular use case, and is
meant to enable both present and future use cases.

Current use cases relying on the information from this API include:

- [outgoing caller id number formatting](/uc-doc/administration/callerid#outgoing-caller-id)
- [incoming call reverse lookups](/uc-doc/administration/callerid#reverse-lookup)
- [incoming call blocklist screening](/uc-doc/administration/blocklist)
