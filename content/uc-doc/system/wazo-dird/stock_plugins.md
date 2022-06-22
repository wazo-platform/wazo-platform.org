---
title: Stock Plugins Documentation
---

## View Plugins

### default_json

View name: default_json

Purpose: present directory entries in JSON format. The format is detailed in
<https://wazo-platform.org/documentation>.

### headers

View name: headers

Purpose: List headers that will be available in results from `default_json` view.

### personal_view

View name: personal_view

Purpose: Expose REST API to manage personal contacts (create, delete, list).

### phonebook_view

View name: phonebook_view

Purpose: Expose REST API to manage wazo-dird's internal phonebooks.

### aastra_view

View name: aastra_view

Purpose: Expose REST API to search in configured directories for Aastra phone.

### cisco_view

View name: cisco_view

Purpose: Expose REST API to search in configured directories for Cisco phone (see
[CiscoIPPhone_XML_Objects](http://www.cisco.com/c/en/us/td/docs/voice_ip_comm/cuipph/all_models/xsi/8_5_1/xsi_dev_guide/xmlobjects.html)).

### polycom_view

View name: polycom_view

Purpose: Expose REST API to search in configured directories for Polycom phone.

### snom_view

View name: snom_view

Purpose: Expose REST API to search in configured directories for Snom phone.

### thomson_view

View name: thomson_view

Purpose: Expose REST API to search in configured directories for Thomson phone.

### yealink_view

View name: yealink_view

Purpose: Expose REST API to search in configured directories for Yealink phone.

## Service Plugins

### lookup

Service name: lookup

Purpose: Search through multiple data sources, looking for entries matching a word.

#### Configuration

Example (excerpt from the main configuration file):

```yaml
services:
  lookup:
    default:
      sources:
        my_csv: true
      timeout: 0.5
```

The configuration is a dictionary whose keys are profile names and values are configuration specific
to that profile.

For each profile, the configuration keys are:

- sources: The list of source names that are to be used for the lookup
- timeout: The maximum waiting time for an answer from any source. Results from sources that take
  longer to answer are ignored. Default: no timeout.

### favorites

Service name: favorites

Purpose: Mark/unmark contacts as favorites and get the list of all favorites.

### personal {#dird-services-personal}

Service name: personal

Purpose: Add, delete, list personal contacts of users.

### phonebook

Service name: phonebook

Purpose: Add, delete, list phonebooks and phonebook contacts.

#### Configuration

Example (excerpt from the main configuration file):

```yaml
services:
  favorites:
    default:
      sources:
        my_csv: true
      timeout: 0.5
```

The configuration is a dictionary whose keys are profile names and values are configuration specific
to that profile.

For each profile, the configuration keys are:

- sources: The list of source names that are to be used for the lookup
- timeout: The maximum waiting time for an answer from any source. Results from sources that take
  longer to answer are ignored. Default: no timeout.

### reverse

Service name: reverse

Purpose: Search through multiple data sources, looking for the first entry matching an extension.

#### Configuration

Example:

```yaml
services:
  reverse:
    default:
      sources:
        my_csv: true
      timeout: 1
```

The configuration is a dictionary whose keys are profile names and values are configuration specific
to that profile.

For each profile, the configuration keys are:

- sources: The list of source names that are to be used for the reverse lookup
- timeout: The maximum waiting time for an answer from any source. Results from sources that take
  longer to answer are ignored. Default: 1.

### Service Discovery {#service-discovery}

Service name: service_discovery

Purpose: Creates sources when services are registered using service discovery.

To configure new sources, the service needs the following things:

1. A template the for the source configuration file.
2. A set of configuration that will be applied to the template.
3. A set of service and profile that will use the new source.

**Note**: Service discovery is limited to a single service being discovered. This means that
discovering a wazo-confd server will assume that wazo-auth resides on the same host or that the
template is already configured with the appropriate hostname.

#### Template

The template is used to generate the content of the configuration file for the new service. Its
content should be the same as the content of a source for the desired backend.

The location of the templates are configured in the service configuration

Example:

```jinja2
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
  version: '1.1'
  verify_certificate: false
format_columns:
  name: '{firstname} {lastname}'
  phone: '{exten}'
  number: '{exten}'
  reverse: '{firstname} {lastname}'
  voicemail: '{voicemail_number}'
```

Example:

```yaml
services:
  service_discovery:
    template_path: /etc/wazo-dird/templates.d
    services:
      wazo-confd:
        template: confd.yml
```

In this example, the file _/etc/wazo-dird/templates.d/confd.yml_ would be used to create a new
source configuration when a new _wazo-confd_ service is registered.

The following keys are available to use in the templates:

- uuid: The Wazo uuid that was in the service registry notification
- hostname: The advertised host from the remote service
- port: The advertised port from the remote service
- service_id: The login used to query wazo-confd
- service_key: The password used to query wazo-confd

All other fields are configured in the _hosts_ section of the service_discovery service.

#### Host configuration

The host section allow the administrator to configure some information that are not available in the
service discovery to be available in the templates. This will typically be the `service_id` and
`service_key` that are configured with the proper ACL on the remote Wazo.

Example:

```yaml
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

- uuid: the XIVO_UUID of the remote Wazo
- service_id: the web service login on the remote Wazo
- service_key: the secret key of the web service
- datacenter(optional): the name of the consul datacenter on which the other Wazo is running
- token(optional): the token to access service discovery on the remote consul
