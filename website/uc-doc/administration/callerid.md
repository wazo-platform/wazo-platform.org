---
title: Caller ID
---

The Caller ID is what users see on their phones when they emit or receive a call, e.g.
`Rick Sanchez 963-555-9296`.

The Caller ID is composed of two parts: the Caller ID name and the Caller ID number.

In Wazo, the format is: `"Rick Sanchez" <9635559296>`.

## Caller ID for internal calls

Users calling each other will see the Caller ID configured in the `caller_id` field of each user.

## Caller ID for outgoing calls (through a trunk)

There are multiple settings coming into play:

- [Dynamic caller ID selection](/uc-doc/administration/callerid#dynamic-caller-id)
- The calling user's `outgoing_caller_id`
- The outgoing call's `caller_id` (one for each `extension`)
- The trunk's operator rules

The current logic for outgoing calls is:

- If the call uses dynamic caller ID selection use the received Caller ID
- If the call is not emitted by a user: use the outgoing call's Caller ID
- If the call is emitted by a user:
  - If the `outgoing_caller_id` is Default, use the outgoing call's Caller ID
  - If the `outgoing_caller_id` is Anonymous, remove the Caller ID
  - If the `outgoing_caller_id` is set, use it

Once the call is sent into the trunk, the operator may still override the Caller ID before routing
the call to the destination. Each operator has its own rules about Caller ID: some will always
rewrite the Caller ID that is attached to the trunk, others will leave the Caller ID untouched, some
operators will only rewrite the Caller ID if you use an unauthorized Caller ID, etc.

### Anonymous Caller ID

If the user needs to do anonymous calls there are a few things to consider.

The effects of making anonymous calls are as follows:

1. The `From` header is set to `“Anonymous” <sip:anonymous@anonymous.invalid>`
2. The `Privacy` header is added with the value `id`
3. The `P-Asserted-Identity` header is added with the value `tel:<Caller ID number>`

This means that Wazo needs to be able to choose a number to set in the `P-Asserted-Identity` header
for the feature to work.

The prefered way to add a number to the `P-Asserted-Identity` header is to configure the caller ID
field in your outgoing call extension list. If the outgoing call uses multiple trunks it might not
be possible to select a caller ID for the extensions.

If this is not possible the `callerid` field of the `endpoint` section of the trunk can also be
configured.

Finally, the PJSIP `endpoint` options `send_pai` and `trust_id_outbound` can be set to `yes`. This
will send internal information to the provider for all calls made using that trunk instead of a
public phone number.

For more information conserning anonymous caller ID see the following links

- https://www.asterisk.org/asterisk-call-party-privacy-and-header-presentation/
- https://www.ietf.org/rfc/rfc3323.txt
- https://www.ietf.org/rfc/rfc3325.txt

### Dynamic client-side Caller ID selection {#dynamic-caller-id}

Wazo allows the client SIP user agent to specify a caller ID when a call is initiated. This is done
using the `X-Wazo-Selected-Caller-ID` SIP header on the `INVITE` of the call. This method of
selecting the caller ID has precedence over any other caller id selection method.

The `X-Wazo-Selected-Caller-ID` header must follow the following formats, where `+15555551234` and
`John Doe` can be replaced with analogous caller id number and caller id name values:

- `anonymous` (a special value for anonymous calls)
- `+15555551234` (a caller id number with no caller id name)
- `"John Doe" <+15555551234>` (a caller id with both a name and number)

The client can use the REST API resource
[`/api/confd/1.1/users/<uuid>/callerids/outgoing`](/documentation/api/configuration.html#tag/users/operation/list_user_callerid_outgoing)
to list the caller IDs that are available to use.  
This API relies on caller id information registered in other resources of the Wazo system.  
Currently, the values provided through this API are based on those resources:

- [`incalls`](/uc-doc/administration/incall) directly routed to the user(using a `User` destination
  type), yielding caller ids of type `associated`
- [`phone numbers`](/uc-doc/administration/phone_numbers) with the `shared` or `main` flag, yielding
  caller ids of type `shared` and `main` respectively

For example:

```json
{
  "total": 4,
  "items": [
    {
      "number": "+18001234567",
      "type": "main"
    },
    {
      "number": "8191110000",
      "type": "associated"
    },
    {
      "type": "anonymous"
    }
  ]
}
```

**Note**: Most operators will not allow the user to send a caller ID they do not recongnize as
valid. The number must either be a DID that has been bought from the same trunk provider the call is
going through or another number that has been verified by that provider.

Refer to
[outcalls](/uc-doc/administration/interconnections/wazo_with_voip_provider#voip-provider-outcall)
documentation for how to control the routing of outgoing calls.

## Caller ID for incoming calls (from a trunk)

There are multiple settings coming into play, in order of priority:

1. SIP trusting remote-party Caller ID
2. The `caller_id` of endpoint of trunk
3. Caller ID number normalization
4. The Incoming Call's `caller_id_mode`
5. Reverse lookup

### SIP Caller ID

To accept the Caller ID sent via all SIP trunks, modify the `global` SIP template for your tenant

- `PUT /endpoints/sip/templates/<global_template_uuid>`

  ```json
  {
    ...
    "endpoint_section_options": [
      ["trust_id_inbound", "yes"],
    ],
    ...
  }
  ```

This option may also be enabled on specific SIP trunks, instead of globally.

### Trunk Caller ID

The endpoint trunk's `caller_id` option overwrites the incoming Caller ID. Usually, this options is
left blank to leave the incoming Caller ID untouched.

### Caller ID number normalization

See [Incoming caller number display](/uc-doc/installation/postinstall#callerid-num-normalization)
for details.

### Incoming Call Caller ID

The Incoming Call's `caller_id_mode` can prepend, append or overwrite the incoming Caller ID.

### Reverse Lookup

Reverse lookup is the operation of finding a Caller ID name corresponding to the Caller ID number.
Wazo can lookup this information in multiple sources configured in
[wazo-dird contact directories](/uc-doc/administration/contact_directories#reverse-lookups).

This operation is only triggered when the incoming Caller ID has no Caller ID name or when the
Caller ID name equals the Caller ID number.
