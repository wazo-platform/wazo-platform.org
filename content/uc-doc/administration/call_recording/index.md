---
title: Call Recording
---

- [Enabling](#enabling)
  - [Administrator](#administrator)
  - [User](#user)
- [Call Recording Management](#call-recording-management)
  - [Extensions](#extensions)
  - [Disable user call control management](#disable-user-call-control-management)
  - [Files](#files)

Call recording allow the user or the administrator to record a user's conversation. Recorded files
are stored on the Wazo server and are accessible using the CDR API.

## Enabling

There are many ways to enable call recording. It can be done by the administrator or the user
itself.

### Administrator

The administrator can enable call recording:

```ascii
PUT /users/{user_uuid}
  {
    "call_record_outgoing_internal_enabled": true,
    "call_record_outgoing_external_enabled": true,
    "call_record_incoming_internal_enabled": true,
    "call_record_incoming_external_enabled": true
  }
```

### User

The user can enable and disable call recording using the `*26` extension on its phone. The user can
also enable call recording during a call using the `*3` extension during the conversation.

## Call Recording Management

### Extensions

The extensions for call recording and online call recording are available with extensions resource:

- `GET /extensions/features?feature=callrecord`

### Disable user call control management

To disable call recording for user (default: `*26`):

- Find `extension_id` with `GET /extensions/features?feature=callrecord`
- Disabled with `PUT /extensions/features/{extenion_id} {"enabled": false}`

To disable online call recording (default: `*3`):

- With `PUT /users/{user_uuid} {"online_call_record_enabled": false}`

### Files

Recorded files are not available for the now with REST API.

Recordings are located in `/var/lib/wazo/sounds/tenants/<tenant_uuid>/monitor`

**Warning**: Since 21.02, renaming or removing a file in this repository will break CDR recordings
API
