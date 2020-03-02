---
title: Stock Plugins Documentation
---

-   [View Plugins](#view-plugins)
    -   [default\_json](#default_json)
    -   [headers](#headers)
    -   [personal\_view](#personal_view)
    -   [phonebook\_view](#phonebook_view)
    -   [aastra\_view](#aastra_view)
    -   [cisco\_view](#cisco_view)
    -   [polycom\_view](#polycom_view)
    -   [snom\_view](#snom_view)
    -   [thomson\_view](#thomson_view)
    -   [yealink\_view](#yealink_view)
-   [Service Plugins](#service-plugins)
    -   [lookup](#lookup)
        -   [Configuration](#configuration)
    -   [favorites](#favorites)
    -   [personal](#dird_services_personal)
    -   [phonebook](#phonebook)
        -   [Configuration](#configuration-1)
    -   [reverse](#reverse)
        -   [Configuration](#configuration-2)
    -   [Service Discovery](#service-discovery)
        -   [Template](#template)
        -   [Host configuration](#host-configuration)

View Plugins
============

default\_json
-------------

View name: default\_json

Purpose: present directory entries in JSON format. The format is
detailed in <http://api.wazo.community>.

headers
-------

View name: headers

Purpose: List headers that will be available in results from
`default_json` view.

personal\_view
--------------

View name: personal\_view

Purpose: Expose REST API to manage personal contacts (create, delete,
list).

phonebook\_view
---------------

View name: phonebook\_view

Purpose: Expose REST API to manage wazo-dird\'s internal phonebooks.

aastra\_view
------------

View name: aastra\_view

Purpose: Expose REST API to search in configured directories for Aastra
phone.

cisco\_view
-----------

View name: cisco\_view

Purpose: Expose REST API to search in configured directories for Cisco
phone (see
[CiscoIPPhone\_XML\_Objects](http://www.cisco.com/c/en/us/td/docs/voice_ip_comm/cuipph/all_models/xsi/8_5_1/xsi_dev_guide/xmlobjects.html)).

polycom\_view
-------------

View name: polycom\_view

Purpose: Expose REST API to search in configured directories for Polycom
phone.

snom\_view
----------

View name: snom\_view

Purpose: Expose REST API to search in configured directories for Snom
phone.

thomson\_view
-------------

View name: thomson\_view

Purpose: Expose REST API to search in configured directories for Thomson
phone.

yealink\_view
-------------

View name: yealink\_view

Purpose: Expose REST API to search in configured directories for Yealink
phone.

Service Plugins
===============

lookup
------

Service name: lookup

Purpose: Search through multiple data sources, looking for entries
matching a word.

### Configuration

Example (excerpt from the main configuration file):

``` {.sourceCode .yaml}
services:
    lookup:
        default:
            sources:
                my_csv: true
            timeout: 0.5
```

The configuration is a dictionary whose keys are profile names and
values are configuration specific to that profile.

For each profile, the configuration keys are:

sources

:   The list of source names that are to be used for the lookup

timeout

:   The maximum waiting time for an answer from any source. Results from
    sources that take longer to answer are ignored. Default: no timeout.

favorites
---------

Service name: favorites

Purpose: Mark/unmark contacts as favorites and get the list of all
favorites.

personal {#dird_services_personal}
--------

Service name: personal

Purpose: Add, delete, list personal contacts of users.

phonebook
---------

Service name: phonebook

Purpose: Add, delete, list phonebooks and phonebook contacts.

### Configuration

Example (excerpt from the main configuration file):

``` {.sourceCode .yaml}
services:
    favorites:
        default:
            sources:
                my_csv: true
            timeout: 0.5
```

The configuration is a dictionary whose keys are profile names and
values are configuration specific to that profile.

For each profile, the configuration keys are:

sources

:   The list of source names that are to be used for the lookup

timeout

:   The maximum waiting time for an answer from any source. Results from
    sources that take longer to answer are ignored. Default: no timeout.

reverse
-------

Service name: reverse

Purpose: Search through multiple data sources, looking for the first
entry matching an extension.

### Configuration

Example:

``` {.sourceCode .yaml}
services:
    reverse:
        default:
            sources:
                my_csv: true
            timeout: 1
```

The configuration is a dictionary whose keys are profile names and
values are configuration specific to that profile.

For each profile, the configuration keys are:

sources

:   The list of source names that are to be used for the reverse lookup

timeout

:   The maximum waiting time for an answer from any source. Results from
    sources that take longer to answer are ignored. Default: 1.

Service Discovery
-----------------

Service name: service\_discovery

Purpose: Creates sources when services are registered using service
discovery.

To configure new sources, the service needs the following things:

1.  A template the for the source configuration file.
2.  A set of configuration that will be applied to the template.
3.  A set of service and profile that will use the new source.

::: {.note}
::: {.admonition-title}
Note
:::

Service discovery is limited to a single service being discovered. This
means that discovering a wazo-confd server will assume that wazo-auth
resides on the same host or that the template is already configured with
the appropriate hostname.
:::

### Template

The template is used to generate the content of the configuration file
for the new service. Its content should be the same as the content of a
source for the desired backend.

The location of the templates are configured in the service
configuration

Example:

``` {.sourceCode .yaml}
type: wazo
name: wazo-{{ uuid }}
searched_columns:
- firstname
- lastname
first_matched_columns:
- exten
auth:
  host: {{ hostname }}
  port: 9497
  username: {{ service_id }}
  password: {{ service_key }}
  verify_certificate: false
confd:
  host: {{ hostname }}
  port: {{ port }}
  version: "1.1"
  verify_certificate: false
format_columns:
  name: "{firstname} {lastname}"
  phone: "{exten}"
  number: "{exten}"
  reverse: "{firstname} {lastname}"
  voicemail: "{voicemail_number}"
```

Example:

``` {.sourceCode .yaml}
services:
  service_discovery:
    template_path: /etc/wazo-dird/templates.d
    services:
      wazo-confd:
        template: confd.yml
```

In this example, the file */etc/wazo-dird/templates.d/confd.yml* would
be used to create a new source configuration when a new *wazo-confd*
service is registered.

The following keys are available to use in the templates:

-   uuid: The Wazo uuid that was in the service registry notification
-   hostname: The advertised host from the remote service
-   port: The advertised port from the remote service
-   service\_id: The login used to query wazo-confd
-   service\_key: The password used to query wazo-confd

All other fields are configured in the *hosts* section of the
service\_discovery service.

### Host configuration

The host section allow the administrator to configure some information
that are not available in the service discovery to be available in the
templates. This will typically be the *service\_id* and *service\_key*
that are configured with the proper ACL on the remote Wazo.

Example:

``` {.sourceCode .yaml}
services:
  service_discovery:
    hosts:
      ff791b0e-3d28-4b4d-bb90-2724c0a248cb:
        uuid: ff791b0e-3d28-4b4d-bb90-2724c0a248cb
        service_id: some-service-name
        service_key: secre7
        datacenter: dc1
        token: 3f031816-84a6-3960-fcd1-9cca67eacde2
```

-   uuid: the XIVO\_UUID of the remote Wazo
-   service\_id: the web service login on the remote Wazo
-   service\_key: the secret key of the web service
-   datacenter(optional): the name of the consul datacenter on which the
    other Wazo is running
-   token(optional): the token to access service discovery on the remote
    consul
