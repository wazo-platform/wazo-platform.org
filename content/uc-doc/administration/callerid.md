---
title: CallerID
---

- [CallerID for internal calls](#callerid-for-internal-calls)
- [CallerID for outgoing calls (through a trunk)](#callerid-for-outgoing-calls-through-a-trunk)
- [CallerID for incoming calls (from a trunk)](#callerid-for-incoming-calls-from-a-trunk)
  - [SIP CallerID](#sip-callerid)
  - [Trunk CallerID](#trunk-callerid)
  - [CallerID number normalization](#callerid-number-normalization)
  - [Incoming Call CallerID](#incoming-call-callerid)
  - [Reverse Lookup](#reverse-lookup)

The CallerID is what users see on their phones when they emit or receive a call, e.g.
`Rick Sanchez 963-555-9296`.

The CallerID is composed of two parts: the CallerID name and the CallerID number.

In Wazo, the format is: `"Rick Sanchez" <9635559296>`.

# CallerID for internal calls

Users calling each other will see the CallerID configured in the `caller_id` field of each user.

# CallerID for outgoing calls (through a trunk)

There are multiple settings coming into play:

- The calling user\'s `outgoing_caller_id`
- The outgoing call\'s `caller_id` (one for each `extension`)
- The trunk\'s operator rules

The current logic for outgoing calls is:

- If the call is not emitted by a user: use the outgoing call\'s CallerID
- If the call is emitted by a user:
  - If the `ougoing_caller_id` is Default, use the outgoing call\'s CallerID
  - If the `ougoing_caller_id` is Anonymous, remove the CallerID
  - If the `ougoing_caller_id` is set, use it

Once the call is sent into the trunk, the operator may still override the CallerID before routing
the call to the destination. Each operator has its own rules about CallerID: some will always
rewrite the CallerID that is attached to the trunk, others will leave the CallerID untouched, some
operators will only rewrite the CallerID if you use an unauthorized CallerID, etc.

# CallerID for incoming calls (from a trunk)

There are multiple settings coming into play, in order of priority:

1.  SIP trusting remote-party CallerID
2.  The `caller_id` of endpoint of trunk
3.  CallerID number normalization
4.  The Incoming Call\'s `caller_id_mode`
5.  Reverse lookup

## SIP CallerID

To accept the CallerID sent via all SIP trunks, enable the following option

> - `PUT /asterisk/sip/general {..., "trustrpid": "yes", ...}`

This option may also be enabled on specific SIP trunks, instead of globally.

## Trunk CallerID

The endpoint trunk\'s `caller_id` option overwrites the incoming CallerID. Usually, this options is
left blank to leave the incoming CallerID untouched.

## CallerID number normalization

See [Incoming caller number display](/uc-doc/installation/postinstall#callerid-num-normalization)
for details.

## Incoming Call CallerID

The Incoming Call\'s [caller\_id\_mode]{.title-ref} can prepend, append or overwrite the incoming
CallerID.

## Reverse Lookup

Reverse lookup is the operation of finding the CallerID name from the CallerID number. Wazo can
lookup this information in multiple sources.

This operation is only triggered when the incoming CallerID has no CallerID name or when the
CallerID name equals the CallerID number.
