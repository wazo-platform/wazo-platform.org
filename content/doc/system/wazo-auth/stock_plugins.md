---
subtitle: Backends Plugins
title: Stock Plugins Documentation
---

-   [wazo\_user](#wazo_user)
    -   [Supported policy variables](#supported-policy-variables)
-   [LDAP](#auth-backends-ldap)
    -   [Configuration](#configuration)
    -   [Supported policy variables](#supported-policy-variables-1)

wazo\_user
==========

Backend name: `wazo_user`

Purpose: Authenticate a user created by wazo-auth. These users do not
map to telephony users at the moment.

Supported policy variables
--------------------------

-   username: The username of the user
-   groups: A list of groups associated to this user
    -   group.uuid: The group UUID
    -   group.name: The group name
    -   group.users: A list of users associated to this group each user
        having the following fields
        -   username
        -   uuid
-   tenants: A list of tenants associated to this user
    -   tenant.uuid: The tenant UUID
    -   tenant.name: The tenant name
-   uuid: The UUID of the user authenticating
-   voicemails: a list of voicemail ID associated to this user
-   lines: a list of line ID associated to this user
-   extensions: a list of extension ID associated to this user
-   endpoint\_sip: a list of SIP endpoint ID associated to this user
-   endpoing\_sccp: a list of SCCP endpoint ID associated to this user
-   endpoint\_custom: a list of custum endpoint ID associated to this
    user
-   agent: a dictionnary containing the agent\'s property, may be none
    and should be tested with an if before accessing its fields
-   agent.id: an agent id if the user is an agent
-   agent.number: an agent number if the user is an agent

LDAP {#auth-backends-ldap}
====

Backend name: `ldap_user`

Purpose: Authenticate with an LDAP user.

For example, with the given configuration:

``` {.sourceCode .yaml}
enabled_backend_plugins:
    ldap_user: true
ldap:
    uri: ldap://example.org
    bind_dn: cn=wazo,dc=example,dc=org
    bind_password: bindpass
    user_base_dn: ou=people,dc=example,dc=org
    user_login_attribute: uid
    user_email_attribute: mail
```

When an authentication request is received for username `alice` and
password `userpass`, the backend will:

1.  Connect to the LDAP server at example.org
2.  Do an LDAP \"bind\" operation with bind DN
    `cn=wazo,dc=example,dc=org` and password `bindpass`
3.  Do an LDAP \"search\" operation to find an LDAP user matching
    `alice`, using:
    -   the base DN `ou=people,dc=example,dc=org`
    -   the filter `(uid=alice)`
    -   a SUBTREE scope
4.  If the search returns exactly 1 LDAP user, do an LDAP \"bind\"
    operation with the user\'s DN and the password `userpass`
5.  If the LDAP \"bind\" operation is successful, search in Wazo a user
    with an email matching the `mail` attribute of the LDAP user
6.  If a Wazo user is found, success

To use an anonymous bind instead, the following configuration would be
used:

``` {.sourceCode .yaml}
ldap:
    uri: ldap://example.org
    bind_anonymous: True
    user_base_dn: ou=people,dc=example,dc=org
    user_login_attribute: uid
    user_email_attribute: mail
```

The backend can also works in a \"no search\" mode, for example with the
following configuration:

``` {.sourceCode .yaml}
ldap:
    uri: ldap://example.org
    user_base_dn: ou=people,dc=example,dc=org
    user_login_attribute: uid
    user_email_attribute: mail
```

When the server receives the same authentication request as above, it
will directly do an LDAP \"bind\" operation with the DN
`uid=alice,ou=people,dc=example,dc=org` and password `userpass`, and
continue at step 5.

::: {.note}
::: {.admonition-title}
Note
:::

User\'s email and voicemail\'s email are two separate things. This
plugin only use the user\'s email.
:::

Configuration
-------------

`uri`

:   the URI of the LDAP server. Can only contain the scheme, host and
    port of an LDAP URL.

`user_base_dn`

:   the base dn of the user

`user_login_attribute`

:   the attribute to login a user

`user_email_attribute` (optional)

:   the attribute to match with the Wazo user\'s email (default: mail)

`bind_dn` (optional)

:   the bind DN for searching for the user DN.

`bind_password` (optional)

:   the bind password for searching for the user DN.

`bind_anonymous` (optional)

:   use anonymous bind for searching for the user DN (default: false)

Supported policy variables
--------------------------

-   id: The ID of the user authenticating
-   uuid: The UUID of the user authenticating
-   voicemails: a list of voicemail ID associated to this user
-   lines: a list of line ID associated to this user
-   extensions: a list of extension ID associated to this user
-   endpoint\_sip: a list of SIP endpoint ID associated to this user
-   endpoing\_sccp: a list of SCCP endpoint ID associated to this user
-   endpoint\_custom: a list of custum endpoint ID associated to this
    user
-   agent: a dictionnary containing the agent\'s property, may be none
    and should be tested with an if before accessing its fields
-   agent.id: an agent id if the user is an agent
-   agent.number: an agent number if the user is an agent
