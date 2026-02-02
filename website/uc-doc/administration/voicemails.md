---
title: Voicemail Configuration
---

## General Configuration {#voicemail-general-configuration}

The global voicemail configuration is provided by `/asterisk/voicemail` endpoints

To customize the email sent when a voicemail is received, you can use a few variables. The complete
list is available on the
[Asterisk wiki](https://docs.asterisk.org/Configuration/Dialplan/Variables/Channel-Variables/Asterisk-Standard-Channel-Variables/VoiceMail-Channel-Variables/).

## Deleting a voicemail

- Deleting a voicemail is irreversible. It deletes all messages associated with that voicemail.
- If the voicemail contains messages, the message waiting indication on the phone will not be
  deactivated until the next phone reboot.

## Disable password checking

Unchecking the option `ask_password` field allows you to skip password checking for the voicemail
only when it is consulted from an internal context.

- when calling the voicemail with `*98`
- when calling the voicemail with `*99<voicemail number>`

**Warning**: If the `*99` extension is enabled and a user does not have a password on its voicemail,
anyone from the same context will be able to listen to its messages, change its password and
greeting messages.

**Warning**: For security reasons, an incoming call with
`{"destination": {"application": "voicemail"}}` with the same context as the voicemail should be
avoided if a voicemail has no password.

## Configuring a tenant-level shared voicemail

A voicemail can be configured to be shared across all users in its tenant. The principal use-case
for this shared voicemail is for micro-tenants where you want all its users to be able to administer
the voicemail.

Think for example a small company with no dedicated receptionist/dispatcher and wants all its users
to be notified on new messages and be able to administer them.

The shared voicemail feature has these few limitations:

- No granular access control; all users within the tenant will have access to the voicemail
- Only a single shared voicemail can exist within a tenant

There are 2 ways to enable the shared voicemail feature:

1. Create a new shared voicemail

```sh
curl -x POST \
  https://<STACK>:<PORT>/api/confd/1.1/voicemails \
  -H 'X-Auth-Token: <TOKEN>' \
  -H 'Wazo-Tenant: <TENANT_UUID>' \
  -d '{
  "accesstype": "global",
  <...>
}'
```

2. Promote an existent voicemail to be shared

```sh
curl -x PUT \
  https://<STACK>:<PORT>/api/confd/1.1/voicemails/<VOICEMAIL_ID> \
  -H 'X-Auth-Token: <TOKEN>' \
  -H 'Wazo-Tenant: <TENANT_UUID>' \
  -d '{
    "accesstype": "global",
    <...>
  }'
```

In both cases, the `accesstype` property must be the value `global` to be configured as a shared
voicemail. By default, the property will be of value `personal` and will not be shared.

## Shared voicemail notifications

No additional configuration is required to enable push notifications when receiving a new message in
a shared voicemail. It is configured out-of-the-box.

## Reading shared voicemail messages

A new endpoint was added to `wazo-calld` to handle messages in various voicemail inboxes.

```sh
curl https://<STACK>:<PORT>/api/calld/1.0/users/me/voicemails/messages?voicemail_type=all \
  -H 'X-Auth-Token: <TOKEN>'
```

The `voicemail_type` parameter must be one of 3 values

- `all`: List all messages from both personal and global voicemails (default behavior when omitted)
- `personal`: Only list messages from personal voicemail
- `global`: Only list messages from shared voicemail
