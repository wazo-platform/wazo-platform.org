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

A voicemail can be configured to be shared across all users in its tenant.

A use case is for a small company, with no dedicated receptionist, where voicemail management
responsibility is shared between all employees.

All tenant users will have both read and write access (message management) to the shared voicemail.
Voicemail notifications (e.g. new messages, message read, message deleted, etc) will be sent to all
users in the tenant.

The shared voicemail feature has these limitations:

- No granular access control; all users within the tenant will have access to the voicemail
- Only a single shared voicemail can exist per context (typically one per tenant)

There are 2 ways to enable the shared voicemail feature:

1. Create a new shared voicemail
   ([API reference](/documentation/api/configuration.html#tag/voicemails/operation/create_voicemail))

```sh
curl -X POST \
  https://<STACK>:<PORT>/api/confd/1.1/voicemails \
  -H 'Content-Type: application/json' \
  -H 'X-Auth-Token: <TOKEN>' \
  -H 'Wazo-Tenant: <TENANT_UUID>' \
  -d '{
  "name": "Shared Voicemail",
  "number": "8000",
  "context": "default",
  "accesstype": "global"
}'
```

2. Promote an existing voicemail to be shared, by changing its `accesstype` property
   ([API reference](/documentation/api/configuration.html#tag/voicemails/operation/update_voicemail))

```sh
curl -X PUT \
  https://<STACK>:<PORT>/api/confd/1.1/voicemails/<VOICEMAIL_ID> \
  -H 'Content-Type: application/json' \
  -H 'X-Auth-Token: <TOKEN>' \
  -H 'Wazo-Tenant: <TENANT_UUID>' \
  -d '{
    "accesstype": "global"
  }'
```

In both cases, the `accesstype` property must be set to `"global"` to be configured as a shared
voicemail.  
By default, a voicemail is created with an `accesstype` of `personal` and will not be shared.

### Shared voicemail events

Shared voicemails generate tenant-level bus events (as opposed to user-level events for personal
voicemails). All users in the tenant can subscribe to these events.

- when a new message is received: `global_voicemail_message_created`
- when a message is read: `global_voicemail_message_updated`
- when a message is deleted: `global_voicemail_message_deleted`

Those events require an ACL pattern of `events.voicemails.global.messages.#`.

See [wazo-calld events reference](https://api.wazo.io/documentation/events/application/).

### Shared voicemail push notifications

Shared voicemails will generate push notifications just like non-shared (_personal_) voicemails. All
tenant users will receive push notifications for new messages in the shared voicemails.

No additional configuration is required to enable those push notifications (see
[Push notifications](/uc-doc/api_sdk/mobile_push_notification) for general push notifications
support).

### Reading shared voicemail messages

wazo-calld APIs can be used to read messages from all voicemails available to a user, including
personal and shared voicemails (see
[API reference](/documentation/api/application.html#tag/voicemails/paths/~1users~1me~1voicemails~1messages/get)):

```sh
curl https://<STACK>:<PORT>/api/calld/1.0/users/me/voicemails/messages?voicemail_type=all \
  -H 'X-Auth-Token: <TOKEN>'
```

The `voicemail_type` parameter can be one of 3 values:

- `all`: List all messages from both personal and global voicemails
- `personal`: Only list messages from personal voicemail
- `global`: Only list messages from shared voicemail

Omitting the parameter will default to `all`.
