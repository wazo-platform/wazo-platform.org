---
title: CallerID
---

The CallerID is what users see on their phones when they emit or receive a call, e.g.
`Rick Sanchez 963-555-9296`.

The CallerID is composed of two parts: the CallerID name and the CallerID number.

In Wazo, the format is: `"Rick Sanchez" <9635559296>`.

## CallerID for internal calls

Users calling each other will see the CallerID configured in the `caller_id` field of each user.

## CallerID for outgoing calls (through a trunk)

There are multiple settings coming into play:

- The calling user's `outgoing_caller_id`
- The outgoing call's `caller_id` (one for each `extension`)
- The trunk's operator rules

The current logic for outgoing calls is:

- If the call is not emitted by a user: use the outgoing call's CallerID
- If the call is emitted by a user:
  - If the `outgoing_caller_id` is Default, use the outgoing call's CallerID
  - If the `outgoing_caller_id` is Anonymous, remove the CallerID
  - If the `outgoing_caller_id` is set, use it

Once the call is sent into the trunk, the operator may still override the CallerID before routing
the call to the destination. Each operator has its own rules about CallerID: some will always
rewrite the CallerID that is attached to the trunk, others will leave the CallerID untouched, some
operators will only rewrite the CallerID if you use an unauthorized CallerID, etc.

### Anonymous CallerID

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

Finaly, the PJSIP `endpoint` options `send_pai` and `trust_id_outbound` can be set to `yes`. This
will send internal information to the provider for all calls made using that trunk instead of a
public phone number.

For more information conserning anonymous caller ID see the following links

- https://www.asterisk.org/asterisk-call-party-privacy-and-header-presentation/
- https://www.ietf.org/rfc/rfc3323.txt
- https://www.ietf.org/rfc/rfc3325.txt

## Dynamic Caller ID Choice

Wazo allows the client SIP user agent to specify a caller ID when a call is launched. This is done
using the `X-Wazo-Selected-Caller-ID` SIP header on the `INVITE` of the call. This method of
selecting the caller ID has precedence over any other method for choosing a caller ID.

The `X-Wazo-Selected-Caller-ID` header must have the following format where `5555551234` and
`John Doe` can be replaced with appropriate values:

- `anonymous`
- `5555551234`
- `"John Doe" <5555551234>`

The client can use the resource `/api/confd/1.1/users/<uuid>/callerids/outgoing` to find which
caller ID they can use.

**Note**: The operator will not allow the user to send a caller ID it does not recongnize as valid.
The number must either be a DID that has been bought from that provider or another number that has
been verified by the provider.

## CallerID for incoming calls (from a trunk)

There are multiple settings coming into play, in order of priority:

1. SIP trusting remote-party CallerID
2. The `caller_id` of endpoint of trunk
3. CallerID number normalization
4. The Incoming Call's `caller_id_mode`
5. Reverse lookup

### SIP CallerID

To accept the CallerID sent via all SIP trunks, modify the `global` SIP template for your tenant

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

### Trunk CallerID

The endpoint trunk's `caller_id` option overwrites the incoming CallerID. Usually, this options is
left blank to leave the incoming CallerID untouched.

### CallerID number normalization

See [Incoming caller number display](/uc-doc/installation/postinstall#callerid-num-normalization)
for details.

### Incoming Call CallerID

The Incoming Call's `caller_id_mode` can prepend, append or overwrite the incoming CallerID.

### Reverse Lookup

Reverse lookup is the operation of finding the CallerID name from the CallerID number. Wazo can
lookup this information in multiple sources.

This operation is only triggered when the incoming CallerID has no CallerID name or when the
CallerID name equals the CallerID number.
