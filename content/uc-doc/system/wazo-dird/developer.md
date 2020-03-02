---
title: 'wazo-dird developer\''s guide'
---

-   [Back-End](#dird-back-end)
    -   [Implementation details](#implementation-details)
    -   [Example](#example)
-   [Service](#dird-service)
    -   [Implementation details](#implementation-details-1)
    -   [Example](#example-1)
-   [View](#dird-view)
    -   [Implementation details](#implementation-details-2)
    -   [Example](#example-2)

![wazo-dird startup flow](images/startup.png)

The wazo-dird architecture uses plugins as extension points for most of
its job. It uses
[stevedore](http://docs.openstack.org/developer/stevedore/) to do the
plugin instantiation and discovery and
[ABC](https://docs.python.org/2/library/abc.html) classes to define the
required interface.

Plugins in wazo-dird use setuptools\' entry points. That means that
installing a new plugin to wazo-dird requires an entry point in the
plugin\'s setup.py. Each entry point\'s [namespace]{.title-ref} is
documented in the appropriate documentation section. These entry points
allow wazo-dird to be able to discover and load extensions packaged with
wazo-dird or installed separately.

Each kind of plugin does a specific job. There are three kinds of
plugins in dird.

1.  `dird-back-end`{.interpreted-text role="ref"}
2.  `dird-service`{.interpreted-text role="ref"}
3.  `dird-view`{.interpreted-text role="ref"}

![wazo-dird HTTP query](images/query.png)

All plugins are instantiated by the core. The core then keeps a
catalogue of loaded extensions that can be supplied to other extensions.

The following setup.py shows an example of a python library that add a
plugin of each kind to wazo-dird:

``` {.sourceCode .python}
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from setuptools import setup
from setuptools import find_packages


setup(
    name='Wazo dird plugin sample',
    version='0.0.1',

    description='An example program',

    packages=find_packages(),

    entry_points={
        'wazo_dird.services': [
            'my_service = dummy:DummyServicePlugin',
        ],
        'wazo_dird.backends': [
            'my_backend = dummy:DummyBackend',
        ],
        'wazo_dird.views': [
            'my_view = dummy:DummyView',
        ],
    }
)
```

Back-End {#dird-back-end}
========

Back-ends are used to query directories. Each back-end implements a way
to query a given directory. Each instance of a given back-end is called
a source. Sources are used by the services to get results from each
configured directory.

Given one LDAP back-end, I can configure a source from the LDAP at
alpha.example.com and another source from the other LDAP at
beta.example.com. Both of these sources use the LDAP back-end.

Implementation details
----------------------

-   Namespace: `wazo_dird.backends`
-   Abstract source plugin:
    [BaseSourcePlugin](https://github.com/wazo-platform/wazo-dird/blob/master/wazo_dird/plugins/base_plugins.py#L67)
-   Methods:
    -   `name`: the name of the source, typically retrieved from the
        configuration injected to `load()`
    -   `load(args)`: set up resources used by the plugin, depending on
        the config. `args` is a dictionary containing:
        -   key `config`: the source configuration for this instance of
            the back-end
        -   key `main_config`: the whole configuration of wazo-dird
    -   `unload()`: free resources used by the plugin.
    -   `search(term, args)`: The search method returns a list of
        dictionary.
        -   Empty values should be `None`, instead of empty string.
        -   `args` is a dictionary containing:
            -   key `token_infos`: data associated to the authentication
                token (see `wazo-auth`{.interpreted-text role="ref"})
    -   `first_match(term, args)`: The first\_match method returns a
        dictionary.
        -   Empty values should be `None`, instead of empty string.
        -   `args` is a dictionary containing:
            -   key `token_infos`: data associated to the authentication
                token (see `wazo-auth`{.interpreted-text role="ref"})
    -   `list(uids, args)`: The list method returns a list of dictionary
        from a list of uids. Each uid is a string identifying a contact
        within the source.
        -   `args` is a dictionary containing:
            -   key `token_infos`: data associated to the authentication
                token (see `wazo-auth`{.interpreted-text role="ref"})

The implementation of the back-end should take these values into account
and return results accordingly.

Example
-------

The following example add a backend that will return random names and
number.

`dummy.py`:

``` {.sourceCode .python}
# -*- coding: utf-8 -*-

import logging

logger = logging.getLogger(__name__)

class DummyBackendPlugin(object):

    def name(self):
        return 'my_local_dummy'

    def load(self, args):
        logger.info('dummy backend loaded')

    def unload(self):
        logger.info('dummy backend unloaded')

    def search(self, term, args):
        nb_results = random.randint(1, 20)
        return _random_list(nb_results)

    def list(self, unique_ids):
        return _random_list(len(unique_ids))

    def _random_list(self, nb_results):
        columns = ['Firstname', 'Lastname', 'Number']
        return [_random_entry(columns) for _ in xrange(nb_results)]

    def _random_entry(self, columns):
        random_stuff = [_random_string() for _ in xrange(len(columns))]
        return dict(zip(columns, random_stuff))

    def _random_string(self):
        return ''.join(random.choice(string.lowercase) for _ in xrange(5))
```

Service {#dird-service}
=======

Service plugins add new functionality to the dird server. These
functionalities are available to views. When loaded, a service plugin
receives its configuration and a dictionary of available sources.

Some service examples that come to mind include:

-   A lookup service to search through all configured sources.
-   A reverse lookup service to search through all configured sources
    and return a specific field of the first matching result.

Implementation details
----------------------

-   Namespace: `wazo_dird.services`
-   Abstract service plugin:
    [BaseServicePlugin](https://github.com/wazo-platform/wazo-dird/blob/master/wazo_dird/plugins/base_plugins.py#L21)
-   Methods:
    -   `load(args)`: set up resources used by the plugin, depending on
        the config. `args` is a dictionary containing:

        -   key `config`: the whole configuration file in dict form
        -   key `sources`: a dictionary of source names to sources

        `load` must return the service object, which is any kind of
        python object.

    -   `unload()`: free resources used by the plugin.

Example
-------

The following example adds a service that will return an empty list when
used.

`dummy.py`:

``` {.sourceCode .python}
# -*- coding: utf-8 -*-

import logging

from wazo_dird import BaseServicePlugin

logger = logging.getLogger(__name__)

class DummyServicePlugin(BaseServicePlugin):
    """
    This plugin is responsible fow instantiating and returning the
    DummyService. It manages its life time and should take care of
    its cleanup if necessary
    """

    def load(self, args):
        """
        Ignores all provided arguments and instantiate a DummyService that
        is returned to the core
        """
        logger.info('dummy loaded')
        self._service = DummyService()
        return self._service

    def unload(self):
        logger.info('dummy unloaded')


class DummyService(object):
    """
    A very dumb service that will return an empty list every time it is used
    """

    def list(self):
        """
        This function must be called explicitly from the view, `list` is not a
        special method name for wazo-dird
        """
        return []
```

View {#dird-view}
====

View plugins add new routes to the HTTP application in wazo-dird, in
particular the REST API of wazo-dird: they define the URLs to which
wazo-dird will respond and the formatting of data received and sent
through those URLs.

For example, we can define a REST API formatted in JSON with one view
and the same API formatted in XML with another view. Supporting the
directory function of a phone is generally a matter of adding a new view
for the format that the phone consumes.

Implementation details
----------------------

-   Namespace: `wazo_dird.views`
-   Abstract view plugin:
    [BaseViewPlugin](https://github.com/wazo-platform/wazo-dird/blob/master/wazo_dird/plugins/base_plugins.py#L52)
-   Methods:
    -   `load(args)`: set up resources used by the plugin, depending on
        the config. Typically, register routes on Flask. Those routes
        would typically call a service. `args` is a dictionary
        containing:
        -   key `config`: the section of the configuration file for all
            views in dict form
        -   key `services`: a dictionary of services, indexed by name,
            which may be called from a route
        -   key `http_app`: the [Flask application]() instance
        -   key `rest_api`: a [Flask-RestFul Api]() instance
    -   `unload()`: free resources used by the plugin.

Example
-------

The following example adds a simple view: `GET /0.1/directories/ping`
answers `{"message": "pong"}`.

`dummy.py`:

``` {.sourceCode .python}
# -*- coding: utf-8 -*-

import logging

from flask_restful import Resource

logger = logging.getLogger(__name__)


class PingViewPlugin(object):

    name = 'ping'

    def __init__(self):
        logger.debug('dummy view created')

    def load(self, args):
        logger.debug('dummy view args: %s', args)

        args['rest_api'].add_resource(PingView, '/0.1/directories/ping')

    def unload(self):
        logger.debug('dummy view unloaded')


class PingView(Resource):
    """
    Simple API using Flask-Restful: GET /0.1/directories/ping answers "pong"
    """

    def get(self):
        return {'message': 'pong'}
```
