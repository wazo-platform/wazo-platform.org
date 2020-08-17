---
title: Introduction
---

wazo-auth is a scalable, extendable and configurable authentication
service. It uses an HTTP interface to emit tokens to users who can then
use those tokens to identify and authenticate themselves with other
services compatible with wazo-auth.

The HTTP API reference is at <http://api.wazo.community>.

- [developer](/uc-doc/system/wazo-auth/developer)
- [stock_plugins](/uc-doc/system/wazo-auth/stock_plugins)

Usage
=====

wazo-auth is used through HTTP requests, using HTTPS. As a user, the most common operation is to get
a new token. This is done with the POST method.

Alice retrieves a token using her username/password:

    $ # Alice creates a new token, using the wazo_user backend, expiring in 10 minutes
    $ curl -k -X POST -H 'Content-Type: application/json' -u 'alice:s3cre7' "https://localhost/api/auth/0.1/token" -d '{"backend": "wazo_user", "expiration": 600}';echo
    {"data": {"issued_at": "2015-06-05T10:16:58.557553", "utc_issued_at": "2015-06-05T15:16:58.557553", "token": "1823c1ee-6c6a-0cdc-d869-964a7f08a744", "auth_id": "63f3dc3c-865d-419e-bec2-e18c4b118224", "xivo_user_uuid": "63f3dc3c-865d-419e-bec2-e18c4b118224", "expires_at": "2015-06-05T11:16:58.557595", "utc_expires_at": "2015-06-05T16:16:58.557595"}}

In this example Alice used here login `alice` and password `s3cre7`. The
authentication source is determined by the
[backend](/uc-doc/system/wazo-auth/stock_plugins) in the POST
data.

Alice could also have specified an expiration time on her POST request.
The expiration value is the number of seconds before the token expires.

After retrieving her token, Alice can query other services that use
wazo-auth and send her token to those service. Those services can then
use this token on Alice\'s behalf to access her personal storage.

If Alice wants to revoke her token before its expiration:

    $ curl -k -X DELETE -H 'Content-Type: application/json' "https://localhost/api/auth/0.1/token/1823c1ee-6c6a-0cdc-d869-964a7f08a744"

See <http://api.wazo.community> for more details about the HTTP API.

See [Service Authentication](/uc-doc/system/service_authentication) for details
about the authentication process.

Usage for services using wazo-auth
==================================

A service that requires authentication and identification can use
wazo-auth to externalise the burden of authentication. The new service
can then accept a token as part of its operations to authenticate the
user using the service.

Once a service receives a token from one of its user, it will need to
check the validity of that token. There are 2 forms of verification, one
that only checks if the token is valid and the other returns information
about this token\'s session if it is valid.

Checking if a token is valid:

    $ curl -k -i -X HEAD -H 'Content-Type: application/json' "https://localhost/api/auth/0.1/token/1823c1ee-6c6a-0cdc-d869-964a7f08a744"
    HTTP/1.1 204 NO CONTENT
    Content-Type: text/html; charset=utf-8
    Content-Length: 0
    Date: Fri, 05 Jun 2015 14:49:50 GMT
    Server: pcm-dev-0

    $ # get more information about this token
    $ curl -k -X GET -H 'Content-Type: application/json' "https://localhost/api/auth/0.1/token/1823c1ee-6c6a-0cdc-d869-964a7f08a744";echo
    {"data": {"issued_at": "2015-06-05T10:16:58.557553", "utc_issued_at": "2015-06-05T15:16:58.557553", "token": "1823c1ee-6c6a-0cdc-d869-964a7f08a744", "auth_id": "63f3dc3c-865d-419e-bec2-e18c4b118224", "xivo_user_uuid": "63f3dc3c-865d-419e-bec2-e18c4b118224", "expires_at": "2015-06-05T11:16:58.557595", "utc_expires_at": "2015-06-05T16:16:58.557595"}}

Launching wazo-auth
===================

    usage: wazo-auth [-h] [-c CONFIG_FILE] [-u USER] [-d] [-f] [-l LOG_LEVEL]

    optional arguments:
      -h, --help            show this help message and exit
      -c CONFIG_FILE, --config-file CONFIG_FILE
                            The path to the config file
      -u USER, --user USER  User to run the daemon
      -d, --debug           Log debug messages
      -l LOG_LEVEL, --log-level LOG_LEVEL
                            Logs messages with LOG_LEVEL details. Must be one of:
                            critical, error, warning, info, debug. Default: None

Configuration
=============

Policies
--------

Policies can be assigned to backends in order to generate the
appropriate permissions for a token created with this backend.

To change to policy associated to a backend, add a new configuration
file in `/etc/wazo-auth/conf.d` with the following content:

```YAML
backend_policies:
  <backend_name>: <policy_name>
```

-   backend\_name: The name of the backend to associate to a new policy
-   policy\_name: The name of the policy to assign to the backend

#:exclamation: Each backend may support different variables. A policy tailored for a
user oriented backend will probably not be usable if assigned to an
administrator backend.

Policies
========

A policy is a list of ACL templates that is used to generate the ACL of
a token. Policies can be created, deleted or modified using the REST
API.

ACL templates
-------------

ACL templates use [jinja2
templates](http://jinja.pocoo.org/docs/2.9/templates/#). Each backend is
responsible of supplying a list of variables to the template engine for
rendering.

A backend supplying the following variables:

```Javascript
{"uuid": "fd64193f-7260-4299-9bc2-87c0106e5302",
 "lines": [1, 42],
 "agent": {"id": 50, "number": "1001"}}
```

With the following ACL templates:

```ini
confd.users.{{ uuid }}.read
{% for line in lines %}confd.lines.{{ line }}.#:{% endfor %}
dird.me.#
{% if agent %}agentd.agents.by-id.{{ agent.id }}.read{% endif %}
```

#:exclamation: When using `for` loops to create ACL, make sure to add a `:` separator
at the end of each ACL

Would create tokens with the following ACL:

```ini
confd.users.fd64193f-7260-4299-9bc2-87c0106e5302.read
confd.lines.1.#
confd.lines.42.#
dird.me.#
agentd.agentd.by-id.50.read
```

HTTP API Reference
==================

The complete HTTP API documentation is at <http://api.wazo.community>.

See also the
[wazo-auth changelog](/uc-doc/api_sdk/rest_api/changelog).

Development
===========

See [wazo-auth Developer's Guide](/uc-doc/system/wazo-auth/developer).
