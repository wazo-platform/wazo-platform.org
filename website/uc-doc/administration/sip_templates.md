---
title: SIP templates
---

SIP templates are configuration templates that define SIP-related options that can be used to
configure SIP endpoints. They are used to generate PJSIP configurations for the Asterisk subsystem
of the Wazo platform.

Those templates form a multiple-inheritance hierarchy, such that a template can inherit from parent
templates, including all options defined in those parent templates while overriding, removing or
adding some options.
This results in a powerful way to configure different classes of SIP devices(hardware phones or
softphones) and support various specific scenarios which require specific configuration.

The SIP template API is part of the `wazo-confd` component.

## Querying SIP templates

SIP templates are available as resources in the `wazo-confd` REST API. They can be listed,
individually queried, updated and removed.

To see the content of a SIP template, the `/confd/1.1/endpoints/sip/templates/<template_uuid>`
endpoint can be
queried([see API reference](/documentation/api/configuration.html#tag/endpoints/operation/get_endpoint_sip_template)).

```
# curl -H 'Content-Type: application/json' -H 'X-Auth-Token:'$TOKEN 'https://wazo.example.com/api/confd/1.1/endpoints/sip/templates/$template_uuid'
{
  "uuid": "19e1f0be-4550-4ebe-99dc-9d4a4c299c72",
  "tenant_uuid": "54eb71f8-1f4b-4ae4-8730-638062fbe521",
  "name": "lp3wc06e",
  "label": "global",
  "aor_section_options": [...],
  "auth_section_options": [...],
  "endpoint_section_options": [
    ...
    ["set_var", "TIMEOUT(absolute)=36000"]
  ],
  "identify_section_options": [...],
  "registration_section_options": [...],
  "registration_outbound_auth_section_options": [...],
  "outbound_auth_section_options": [...],
  "templates": [...],
  "transport": {
    "uuid": "4003f00a-9190-492b-9271-e8ce811e4059"
  },
  "asterisk_id": null,
  "links": [
    {
      "rel": "endpoint_sip_templates",
      "href": "https://wazo.example.com/api/confd/1.1/endpoints/sip/templates/19e1f0be-4550-4ebe-99dc-9d4a4c299c72"
    }
  ]
}
```

As you can see, a SIP template has options structured in multiple 'sections', each corresponding to
a section in the PJSIP configuration(see the
[relevant asterisk/PJSIP documentation](https://docs.asterisk.org/Configuration/Channel-Drivers/SIP/Configuring-res_pjsip/PJSIP-Configuration-Sections-and-Relationships/)).
The options in those sections are represented as `[key, value]` string pairs.

The `transport` field provides a link to a SIP transport configuration.

The `templates` section will refer to the parent templates from which this template inherits, if
any.

## Modifying SIP templates

To modify a SIP template, a `PUT` request can be performed on the template URL with the updated
configuration([see API reference](documentation/api/configuration.html#tag/endpoints/operation/update_endpoint_sip_template)).

```
# curl -H 'Content-Type: application/json' -H 'X-Auth-Token:'$TOKEN -XPUT 'https://wazo.example.com/api/confd/1.1/endpoints/sip/templates/$global_sip_template_uuid' -d $body
```

**Note**: omit the `uuid`, `tenant_uuid`, `links` read-only fields of the template representation
from the body of the `PUT` request.

## Global SIP templates

For options that should be applied to all SIP endpoints by default, a tenant's 'global' SIP template
can be used. This is the template that is applied to a basic SIP endpoint, such as an hardware
phone. Other templates inherit from the 'global' template and override some components for a subset
of SIP endpoints, such as the `webrtc` template for webrtc SIP lines.

### updating the 'global' template

To update the 'global' template of a tenant, we must

- query the tenant configuration for the uuid of the global template for that tenant, then
- query the current configuration of the template, then
- apply the updated configuration of the template

```
# curl -H 'Content-Type: application/json' -H 'X-Auth-Token:'$TOKEN 'https://wazo.example.com/api/confd/1.1/tenants/$tenant_uuid'
{
  "uuid": "54eb71f8-1f4b-4ae4-8730-638062fbe521",
  "sip_templates_generated": true,
  "global_sip_template_uuid": "19e1f0be-4550-4ebe-99dc-9d4a4c299c72",
  "webrtc_sip_template_uuid": "83ae01a1-f495-42d6-ba04-942e25cc72e5",
  "registration_trunk_sip_template_uuid": "4e56d330-402f-43f7-bb90-98335d2cc70d",
  "meeting_guest_sip_template_uuid": "d0f32aa4-265e-4f5d-8ff1-e8101facfcf0"
}
# export global_sip_template_uuid=19e1f0be-4550-4ebe-99dc-9d4a4c299c72
# curl --header 'Content-Type: application/json' -H 'X-Auth-Token:'$TOKEN 'https://wazo.example.com/api/confd/1.1/endpoints/sip/templates/$global_sip_template_uuid'
<json representation of the sip template configuration>

# export body=<updated json representation of the sip template configuration>
# curl --header 'Content-Type: application/json' -H 'X-Auth-Token:'$TOKEN -XPUT 'https://wazo.example.com/api/confd/1.1/endpoints/sip/templates/$global_sip_template_uuid' -d $body
```

As you can see, a tenant has an associated 'global' SIP template, as well as a 'webrtc' SIP
template, a 'registration trunk' SIP template and a 'meeting guest' SIP template.
