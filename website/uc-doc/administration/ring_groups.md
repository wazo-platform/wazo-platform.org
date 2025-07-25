---
title: Ring Groups
---

wazo-platform supports a "ring group" feature, a common telephony feature, sometimes also called
"hunting group". Ring groups enable multiple users to be associated with a single extension, such
that calling that extension will ring each user in the group in some configurable order.

## Management

Wazo ring groups can be managed using conventional CRUD operations on the `/groups` endpoint in the
wazo-confd REST API.

- creating a ring group:
  [`POST /groups`](/documentation/api/configuration.html#tag/groups/operation/create_group)
- updating a ring group:
  [`PUT /groups/<group_uuid>`](/documentation/api/configuration.html#tag/groups/operation/update_group)
- deleting a ring group:
  [`DELETE /groups/<group_uuid>`](/documentation/api/configuration.html#tag/groups/operation/delete_group)
- fetching a ring group's configuration:
  [`GET /groups/<group_uuid>`](/documentation/api/configuration.html#tag/groups/operation/get_group)
- listing ring groups:
  [`GET /groups`](/documentation/api/configuration.html#tag/groups/operation/list_groups)
- adding user members to a ring group:
  [`PUT /groups/<group_uuid>/members/users`](/documentation/api/configuration.html#tag/groups/operation/update_group_member_users)
- adding extension members to a ring group:
  [`PUT /groups/<group_uuid>/members/extensions`](/documentation/api/configuration.html#tag/groups/operation/update_group_member_extensions)

Refer to the [API reference](/documentation/api/configuration.html#tag/groups) for more details.

## Group options

Refer to
[the api reference](/documentation/api/configuration.html#tag/groups/operation/update_group) for all
supported group options.

## Relationships

Ring groups can maintain relationships with other wazo resources:

- [extensions](/documentation/api/configuration.html#tag/extensions/operation/list_extensions): ring
  groups can be assigned to extensions, allowing calls to that extension to reach the ring group;
- group members: ring groups may have
  [extension members](/documentation/api/configuration.html#tag/groups/operation/update_group_member_extensions)
  or
  [user members](/documentation/api/configuration.html#tag/groups/operation/update_group_member_users);
- [incalls](/uc-doc/administration/incall): ring groups can be
  [configured as destination of incalls](/documentation/api/configuration.html#tag/incalls/operation/create_incall)
  in order to route external calls to the group;
- [schedules](/uc-doc/administration/schedules): ring groups can be
  [associated with schedules](/documentation/api/configuration.html#tag/groups/operation/associate_group_schedule)
  to control availability of the group and fallback redirections based on time of day and week;
- [call permissions](/uc-doc/administration/call_permissions): ring groups can be
  [associated with call permissions](/documentation/api/configuration.html#tag/groups/operation/associate_group_callpermission)
  to limit which users can call the ring group.
- fallback destinations: ring groups can be
  [configured with fallback destinations](/documentation/api/configuration.html#tag/groups/operation/update_group_fallback)
  to redirect calls in some circumstances;
- [call pickups](/uc-doc/administration/call_pickups): ring groups can be
  [associated with call pickups](/documentation/api/configuration.html#tag/groups/operation/update_call_pickup_target_groups)
  to allow some users to pick up calls to the without being group members;

## Examples

### Minimal ring group

```bash
$ curl -X POST \
  'https://your-wazo-instance/api/confd/1.1/groups' \
  -H 'Content-Type: application/json' \
  -H 'X-Auth-Token: YOUR_AUTH_TOKEN' \
  -d '{
    "label": "Support Team",
  }'
```

All parameters except `label` are optional.

A typical response:

```json
{
  "id": 14,
  "uuid": "81793d97-c430-4b8b-98c5-a626061a6ccd",
  "tenant_uuid": "54eb71f8-1f4b-4ae4-8730-638062fbe521",
  "name": "grp-yourtenant-81793d97-c430-4b8b-98c5-a626061a6ccd",
  "label": "Support Team",
  "preprocess_subroutine": null,
  "ring_strategy": "all",
  "caller_id_mode": null,
  "caller_id_name": null,
  "dtmf_record_toggle": false,
  "timeout": null,
  "user_timeout": 15,
  "retry_delay": 5,
  "music_on_hold": null,
  "ring_in_use": true,
  "mark_answered_elsewhere": false,
  "enabled": true,
  "ignore_forward": false,
  "max_calls": 0,
  "links": [
    {
      "rel": "groups",
      "href": "https://your-wazo-instance/api/confd/1.1/groups/81793d97-c430-4b8b-98c5-a626061a6ccd"
    }
  ],
  "extensions": [],
  "fallbacks": {
    "noanswer_destination": null,
    "congestion_destination": null
  },
  "incalls": [],
  "schedules": [],
  "call_permissions": [],
  "members": {
    "users": [],
    "extensions": []
  }
}
```

See [the API reference](/documentation/api/configuration.html#tag/groups/operation/create_group) for
all supported parameters and their default value.

### Basic ring group with user members

**Preqrequisites**

- two users have been created:
  - Users `alice` with uuid `123e4567-e89b-12d3-a456-426614174000`
  - User `bob` with uuid `123e4567-e89b-12d3-a456-426614174001`
- an extension with id `10` has been created;

Let's start with a slightly less basic ring group:

```bash
$ curl -X POST \
  'https://your-wazo-instance/api/confd/1.1/groups' \
  -H 'Content-Type: application/json' \
  -H 'X-Auth-Token: YOUR_AUTH_TOKEN' \
  -d '{
    "label": "Support Team",
    "ring_strategy": "linear",
    "timeout": 30,
    "user_timeout": 5,
    "retry_delay": 1,
    "enabled": true
  }'
```

This API call will create a basic ring group with a timeout of 30 seconds and a ring strategy of
`linear`. Such a group will ring each member in sequence, for 5 seconds each, with 1 second pause in
between, repeating until a final timeout of 30 seconds.

An example response:

```json
{
  "id": 13,
  "uuid": "6294b075-6ea1-4a85-bea8-d01819de8b7b",
  "tenant_uuid": "54eb71f8-1f4b-4ae4-8730-638062fbe521",
  "name": "grp-yourtenant-6294b075-6ea1-4a85-bea8-d01819de8b7b",
  "label": "Support Team",
  "preprocess_subroutine": null,
  "ring_strategy": "linear",
  "caller_id_mode": null,
  "caller_id_name": null,
  "dtmf_record_toggle": false,
  "timeout": 30,
  "user_timeout": 5,
  "retry_delay": 1,
  "music_on_hold": null,
  "ring_in_use": true,
  "mark_answered_elsewhere": false,
  "enabled": true,
  "ignore_forward": false,
  "max_calls": 0,
  "links": [
    {
      "rel": "groups",
      "href": "https://your-wazo-instance/api/confd/1.1/groups/6294b075-6ea1-4a85-bea8-d01819de8b7b"
    }
  ],
  "extensions": [],
  "fallbacks": {
    "noanswer_destination": null,
    "congestion_destination": null
  },
  "incalls": [],
  "schedules": [],
  "call_permissions": [],
  "members": {
    "users": [],
    "extensions": []
  }
}
```

The group doesn't have any members to take calls yet, and no internal extensions or incalls to allow
any calls to it.

```bash
$ curl -X PUT \
  'https://your-wazo-instance/api/confd/1.1/groups/6294b075-6ea1-4a85-bea8-d01819de8b7b/members/users' \
  -H 'Content-Type: application/json' \
  -H 'X-Auth-Token: YOUR_AUTH_TOKEN' \
  -d '{
    "users": [
      {
        "uuid": "123e4567-e89b-12d3-a456-426614174000"
      },
      {
        "uuid": "123e4567-e89b-12d3-a456-426614174001"
      }
    ]
  }'
```

Now the group has two users as members.

```bash
$ curl -X PUT \
  'https://your-wazo-instance/api/confd/1.1/groups/6294b075-6ea1-4a85-bea8-d01819de8b7b/extensions/10' \
  -H 'Content-Type: application/json' \
  -H 'X-Auth-Token: YOUR_AUTH_TOKEN'

```

Now the group is associated to an existing extension with id `10`. This extension may be any
extension created through the [extensions API](/uc-doc/administration/extensions). This may be an
internal extensions for other users in the system to call, or an extension for an incall allowing
external calls to reach this ring group.

Both member users will receive the call on all their registered lines. If neither answer within the
30 second timeout, the call will reach the timeout condition. Since there are no fallbacks
configured, the caller will simply hear a message informing of this condition and the call will
terminate.

### Ring group with incall

Given a ring group such as the one created in the previous example, we can configure an incall to
reach it from an external number.

First we create an extension in the proper context:

```bash
$ curl -X POST \
  'https://your-wazo-instance/api/confd/1.1/extensions' \
  -H 'Content-Type: application/json' \
  -H 'X-Auth-Token: YOUR_AUTH_TOKEN' \
  -d '{
    "context": "from-external",
    "exten": "555-555-5555",
    "commented": false,
    "enabled": true
  }'
```

An example response:

```json
{
  "id": 10,
  "uuid": "123e4567-e89b-12d3-a456-426614174000",
  "tenant_uuid": "54eb71f8-1f4b-4ae4-8730-638062fbe521",
  "name": "ext-yourtenant-123e4567-e89b-12d3-a456-426614174000",
  "context": "from-external",
  "exten": "555-555-5555",
  "commented": false,
  "enabled": true
}
```

Then we create the incall pointing to the group:

```bash
$ curl -X POST \
  'https://your-wazo-instance/api/confd/1.1/incalls' \
  -H 'Content-Type: application/json' \
  -H 'X-Auth-Token: YOUR_AUTH_TOKEN' \
  -d '{
    "description": "Support Team DID",
    "destination": {
      "type": "group",
      "group_id": 13,
    }
  }'
```

An example response:

```json
{
  "id": 7,
  "tenant_uuid": "54eb71f8-1f4b-4ae4-8730-638062fbe521",
  "preprocess_subroutine": null,
  "greeting_sound": null,
  "caller_id_mode": null,
  "caller_id_name": null,
  "description": null,
  "destination": {
    "group_id": 13,
    "type": "group",
    "ring_time": 30,
    "group_name": "grp-yourtenant-6294b075-6ea1-4a85-bea8-d01819de8b7b",
    "group_label": "Support Team"
  },
  "links": [
    {
      "rel": "incalls",
      "href": "https://your-wazo-instance/api/confd/1.1/incalls/7"
    }
  ],
  "extensions": [],
  "schedules": []
}
```

Then we associate the extension and the incall:

```bash
$ curl -X PUT \
  'https://your-wazo-instance/api/confd/1.1/incalls/7/extensions/10' \
  -H 'Content-Type: application/json' \
  -H 'X-Auth-Token: YOUR_AUTH_TOKEN' \
  -d '{
    "incall_id": 7
  }'
```

Now an inbound call for the number `555-555-5555` will reach the ring group.

### Ring group with fallback destinations

We might want calls to the ring group to use a fallback destinations in some circumstances. If we
set a timeout on the ring group, and no member can take the call within that timeout, then we might
want calls to be redirected to a voicemail, or another extension. Similarly if all group members are
busy.

```bash
$ curl -X PUT \
  'https://your-wazo-instance/api/confd/1.1/groups/6294b075-6ea1-4a85-bea8-d01819de8b7b/fallbacks' \
  -H 'Content-Type: application/json' \
  -H 'X-Auth-Token: YOUR_AUTH_TOKEN' \
  -d '{
    "noanswer_destination": {
      "type": "voicemail",
      "voicemail_id": 1,
      "greeting": "unavailable"
    },
    "congestion_destination": {
      "type": "voicemail",
      "voicemail_id": 1,
      "greeting": "busy"
    }
  }'
```

Now unanswered calls can be redirected to a voicemail instead of simply hanging up.

## Notes

- linear strategy: as of wazo-platform 25.06, an outstanding bug in asterisk's app_queue module
  requires a distinct custom implementation of ring groups under the `linear` ring strategy.
  "linear" ring groups should normally remain at feature parity with other ring strategies.
