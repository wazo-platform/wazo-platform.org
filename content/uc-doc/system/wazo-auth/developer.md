---
title: wazo-auth Developer's Guide
---

Architecture
============

wazo-auth contains 3 major components, an HTTP interface, authentication
backends and a storage module. All operations are made through the HTTP
interface, tokens are stored in postgres as well as the persistence for
some of the data attached to tokens. Backends are used to test if a
supplied username/password combination is valid and provide the
xivo-user-uuid.

wazo-auth is made of the following modules and packages.

backend_plugins
----------------

the plugin package contains the wazo-auth backends that are packaged
with wazo-auth.

http_plugins
-------------

The http module is the implementation of the HTTP interface.

-   Validate parameters
-   Calls the backend the check the user authentication
-   Forward instructions to the *token_manager*
-   Handle exceptions and return the appropriate status_code

controller
----------

The controller is the plumbin of wazo-auth, it has no business logic.

-   Start the HTTP application
-   Load all enabled plugins
-   Instanciate the token_manager

token
-----

The token modules contains the business logic of wazo-auth.

-   Creates and delete tokens
-   Creates ACLs for Wazo
-   Schedule token expiration

Plugins
=======

wazo-auth is meant to be easy to extend. This section describes how to
add features to wazo-auth.

Backends
--------

wazo-auth allows its administrator to configure one or many sources of
authentication. Implementing a new kind of authentication is quite
simple.

1.  Create a python module implementing the [backend
    interface](https://github.com/wazo-platform/wazo-auth/blob/master/wazo_auth/interfaces.py).
2.  Install the python module with an entry point *wazo_auth.backends*

An example backend implementation is available
[here](http://github.com/wazo-platform/wazo-auth-example-backend).

External Auth
-------------

wazo-auth allows the user to enable arbitrary external authentication,
store sensible information which can be retrieved later given an
appropriate ACL.

An external authentication plugin is made of the following parts.

1.  A setup.py adding the plugin the the [wazo_auth.http]{.title-ref}
    entry point
2.  A flask_restful class implementing the route for this plugin
3.  A marshmallow model that can filter the stored data to be safe for
    unpriviledged view
4.  A plugin_info dictionary with information that should be displayed
    in UI concerning this plugin

The restful class should do the following:

-   POST: This is where the plugin should setup any information with the
    external service and usually return a validation code and a
    validateion URL to the user.
-   GET: After activating the external authentication, following the
    POST. The GET can be used to retrieve credentials granting access to
    certain resource of the external service.
-   DELETE: Should remove the stored data from wazo-auth
-   PUT: (optional) Could be implemented to modify the scope of the
    generated credentials if the external service allow that kind of
    modification.

### OAuth2 helpers

If the external service uses OAuth2 it is possible to use some helper
functions in the external_auth service.

Those helpers can be used to get notified when the user has accepted
wazo-auth on the external service.

The following helpers are available:

    external_auth_service.register_oauth2_callback(auth_type, user_uuid, state, callback, *args, **kwargs)

-   auth_type: The name of the authentication backend
-   user_uuid: The user UUID of the user creating the external auth
-   state: The state returned from the authorization URL query
-   callback: the callable that should be triggered when the
    authorization is complete
-   args and kwargs: arguments that will be added to the callback
    arguments

When the callback function gets called, its last args will be the
message sent to the redirect URL by the external service.

#:exclamation: The callback is not executed in the main thread. You should take care of
thread synchronization when sharing data structures between threads.

The callback is usually used to create a first token on the external
service.

    external_auth_service.build_oauth2_redirect_url(auth_type)

This helper returns a URL that can be used by the OAuth2Session to
trigger a redirection and receives a callback when the authorization is
complete.

### Example

Files:

    setup.py
    src/plugin.py

```Python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from setuptools import find_packages
from setuptools import setup

setup(
    name='auth_bar',
    version='0.1',

    packages=find_packages(),
    entry_points={
        'wazo_auth.external_auth': [
            'bar = src.plugin:BarPlugin',
        ],
    }
)
```

```Python
# -*- coding: utf-8 -*-

from marshmallow import Schema, fields, pre_load
from flask import request
from wazo_auth import http


class BarService(http.AuthResource):

    auth_type = 'bar'  # Should be the same as the entry point
    authorization_base_url = 'https://accounts.bar.com/oauth/v2/auth'
    token_url = 'https://accounts.bar.com/oauth/v2/token'
    client_id = 'client_id'
    client_secret = 'client_secret'

    def __init__(self, external_auth_service):
        self.external_auth_service = external_auth_service
        self.redirect_uri = self.external_auth_service.build_oauth2_redirect_url(self.auth_type)

    @http.required_acl('auth.users.{user_uuid}.external.bar.delete')
    def delete(self, user_uuid):
        # Remove all stored data for the BAR service for this user
        self.external_auth_service.delete(user_uuid, self.auth_type)
        return '', 204

    @http.required_acl('auth.users.{user_uuid}.external.bar.read')
    def get(self, user_uuid):
        # The GET retrieves all stored data from the service and return the secret that is
        # required to use the Bar service

        # The GET will also need to generate a new token if the current one has expired.
        return self.external_auth_service.get(user_uuid, self.auth_type), 200

    @http.required_acl('auth.users.{user_uuid}.external.bar.create')
    def post(self, user_uuid):
        session = OAuth2Session(self.client_id, scope=self.scope, redirect_uri=self.redirect_uri)
        # Should use the body of the POST and create a token with the Bar service
        data = request.get_json(force=True)
        authorization_url, state = session.authorization_url(
            self.authorization_base_url,
            access_type='offline',
        )
        self.external_auth_service.register_oauth2_callback(
            state,
            self.create_first_token,
            session,
            user_uuid,
       )

       return {'authorization_url': authorization_url}, 201

   def create_first_token(self, session, user_uuid, msg):
       # This callback is triggered when the user authorize wazo-auth using the authorization_url
       token_data = session.fetch_token(
           self.token_url,
           client_secret=self.client_secret['us'],
           code=msg['code'],
       )

       data = {
           'access_token': token_data['access_token'],
           'refresh_token': token_data.get('refresh_token'),
           'token_expiration': get_timestamp_expiration(token_data['expires_in'])
       }

       self.external_auth_service.update(user_uuid, self.auth_type, data)


# When GET /users/:uuid/external is called this model will be used to filter the private data
class BarSafeData(Schema):

    # Only the scope field will be returned
    scope = fields.List(fields.String)

    @pre_load
    def ensure_dict(self, data):
        return data or {}


class BarPlugin(object):

    plugin_info = {'required_acl': ['view-all-contacts', 'list-email-addresses']}

    def load(self, dependencies):
        api = dependencies['api']
        external_auth_service = dependencies['external_auth_service']
        args = (external_auth_service,)

        # If the plugin does not register a safe mode an empty dictionary will be used when doing
        # a GET /users/:uuid/external
        external_auth_service.register_safe_auth_model('bar', BarSafeData)

        api.add_resource(BarService, '/users/<uuid:user_uuid>/external/bar', resource_class_args=args)
```
