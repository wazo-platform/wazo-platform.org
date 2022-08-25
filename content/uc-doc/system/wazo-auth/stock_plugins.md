---
title: Stock Plugins Documentation
---

## wazo_user

Backend name: `wazo_user`

Purpose: Authenticate a user created by wazo-auth. These users do not map to telephony users at the
moment.

## LDAP {#auth-backends-ldap}

Backend name: `ldap_user`

Purpose: Authenticate with an LDAP user. In this case, the LDAP server is used to authenticate while
wazo-auth is used to identify. This means that an LDAP user must match a user present in wazo-auth.

The LDAP backend is configured for each tenant through a
[wazo-auth REST API endpoint](/documentation/api/authentication.html#operation/updateLDAPBackendConfig).

For example, with the given configuration:

```json
{
  "host": "example.org",
  "port": 389,
  "bind_dn": "cn=wazo,dc=example,dc=org",
  "bind_password": "bindpass",
  "user_base_dn": "ou=people,dc=example,dc=org",
  "user_login_attribute": "uid",
  "user_email_attribute": "mail"
}
```

### Service bind authentication flow {#service-bind-authentication-flow}

When an authentication request is received for username `alice`, password `userpass` and a tenant
`my-tenant`, the backend will:

1. The LDAP configuration is searched for the given tenant.
2. Connect to the LDAP server at example.org
3. Do an LDAP "bind" operation with bind DN `cn=wazo,dc=example,dc=org` and password `bindpass`
4. Do an LDAP "search" operation to find an LDAP user matching `alice`, using:
   - the base DN `ou=people,dc=example,dc=org`
   - the default filter `{user_login_attribute}={username}`, which in this case gives `(uid=alice)`
   - a SUBTREE scope
5. If the search returns exactly 1 LDAP user, do an LDAP "bind" operation with the user's DN and the
   password `userpass`
6. If the LDAP "bind" operation is successful, search in wazo-auth a user with an email matching the
   `mail` attribute of the LDAP user. Since Wazo Platform 22.12, the search will fail if the user in
   wazo-auth has upper-case characters in the email address.
7. If a wazo-auth user is found, success

### No service bind authentication flow

The backend can also work in a "no search" mode, for example with the following configuration:

```json
{
  "host": "example.org",
  "port": 389,
  "protocol_security": null,
  "protocol_version": 3,
  "bind_dn": null,
  "bind_password": null,
  "user_base_dn": "ou=people,dc=example,dc=org",
  "user_login_attribute": "uid",
  "user_email_attribute": "mail"
}
```

When the server receives the same authentication request as the service bind authentication flow, it
will fetch the LDAP configuration for the tenant and directly do an LDAP "bind" operation using the
DN `uid=alice,ou=people,dc=example,dc=org` and password `userpass`. The flow then continues at
step 6.

**Note**: User's email and voicemail's email are two separate things. This plugin only use the
user's email.

### Search filters

In the LDAP configuration API, you may have noticed a field named `search_filters`. This field is
only useful when using the [service bind authentication flow](#service-bind-authentication-flow).

The default filter is `{user_login_attribute}={username}`. This allows a simple search that matches
the `user_login_attribute` defined in the tenant's LDAP configuration. `username` comes from the
authentication request. In the example above, the search filter variables would be substituted as
such: `uid=alice`.

**It is important that the search filter allows for only _one_ result**, otherwise wazo-auth will
return a 401. It this thus fair to say that the `{user_login_attribute}={username}` filter should
always be in the filter and that any filter must be built upon it.

Of course, using more complex filters is possible and that is exactly why this feature exists. For
example, you may want to limit what kind of person can log in to wazo-auth. In our example, consider
the `objectClass` for an end user to be `person`. We could then use the following filter:
`(&({user_login_attribute}={username})(objectClass=person))`.

### Configuration

Each tenant has an LDAP configuration. It is not possible for now to have more than one configured
LDAP server (or domain) for a tenant. If you want to do so, it must be done through the LDAP server
itself.

### Explanation behind the `tenant_id` field

When creating a token using the LDAP backend, it is necessary to provide a `tenant_id`. The first
question that may arise is why is it necessary? The answer is pretty simple: it is not possible to
determine which LDAP configuration to use (from all the tenants) before an LDAP server has
authenticated the user. Not having a provided `tenant_id` would mean that we would have to try all
the LDAP servers before finding the right one, which is both a very bad security leak and would be
really slow. Also, usernames on the LDAP server may not match the usernames on wazo-auth.
