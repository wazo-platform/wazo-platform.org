---
title: Filtering webhook events on user
---

When configuring a webhook, you can set the `user_uuid` parameter. Doing so makes the webhook being
only triggered when events are related to the specified user.

For example, given a webhook on event `user_status_update`, and `user_uuid` is set to user A, the
webhook will only be triggered when user A changes its presence status, not when user B does.

## Supported events

The current list of events that is supported by the `user_uuid` parameter is:

- `agent_paused`
- `agent_status_update`
- `agent_unpaused`
- `call_created`
- `call_ended`
- `call_log_user_created`
- `call_updated`
- `endpoint_status_update`
- `favorite_added`
- `favorite_deleted`
- `relocate_initiated`
- `relocate_answered`
- `relocate_completed`
- `relocate_ended`
- `user_status_update`
- `user_voicemail_message_created`
- `user_voicemail_message_deleted`
- `user_voicemail_message_updated`
- `users_forwards_busy_updated`
- `users_forwards_noanswer_updated`
- `users_forwards_unconditional_updated`
- `users_services_dnd_updated`
- `users_services_incallfilter_updated`

Unsupported events will always trigger the webhook, regardless of the related user.
