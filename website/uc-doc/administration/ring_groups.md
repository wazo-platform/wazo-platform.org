---
title: Ring Groups
---

The ring group feature in Wazo is a common telephony feature, sometimes also called "hunting group". It allows multiple users to be associated with a single extension, such that calling that extension will ring each user in the group in some configurable order.

## Management

Wazo ring groups can be managed as a REST API resource through the `wazo-confd` administrative APIs.

- creating a ring group: [`POST /groups`](/documentation/api/configuration.html#tag/groups/operation/create_group)
- updating a ring group: [`PUT /groups/<group_uuid>`](/documentation/api/configuration.html#tag/groups/operation/update_group)
- deleting a ring group: [`DELETE /groups/<group_uuid>`](/documentation/api/configuration.html#tag/groups/operation/delete_group)
- fetching a ring group's configuration: [`GET /groups/<group_uuid>`](/documentation/api/configuration.html#tag/groups/operation/get_group)
- listing ring groups: [`GET /groups`](/documentation/api/configuration.html#tag/groups/operation/list_groups)

## Configuration

### Strategies

Wazo ring groups support a number of "ring strategies", which control the order in which the members of the ring group are called.

- `all`: ring all members concurrently, first to answer wins
- `least_recent`: ring the member which has handled a call the least recently
- `linear`: ring each member one after the other based on a the priority ordering of all members
- `fewest_calls`: ring the member with the fewest completed calls
- `memorized_round_robin`: ring members in a round-robin fashion, starting with the member following the one who answered last
- `random`: ring a random member
- `weight_random`: ring a random member, weighed by a per-member penalty factor

A ring group's strategy can be changed by updating the `ring_strategy` option in its configuration (through [the API](/documentation/api/configuration.html#tag/groups/operation/update_group)).

**Note**: an outstanding bug in asterisk's app_queue module requires a distinct custom implementation of ring groups under the `linear` ring strategy. "linear" ring groups should normally remain at feature parity with other ring strategies.

### Members

Ring groups can be configured with "members" in two ways:

- by associating _wazo users_ to the group ([`PUT /groups/<group_id>/members/users`](/documentation/api/configuration.html#tag/groups/operation/update_group_member_users))
- by associating _extensions_ to the group ([`PUT /groups/<group_id>/members/extensions`](/documentation/api/configuration.html#tag/groups/operation/update_group_member_extensions))

In the first case, wazo users are associated with the group by refering to their user id.
In the second case, extensions are associated with the group by specifying an extension and a priority in a specific asterisk context.

User members of a ring group will be called through all of their configured lines simultaneously. However, most of the features normally associated with dialing a user are bypassed when user members are called through a ring group.

Extensions members enable any wazo entity with an internal extension, or any asterisk dialplan extensions, to be invoked through the ring group.
If a user's internal extension is specified as an extension member, dialing the group would invoke the complete user dialplan when dialing that extension, just as if the user's internal extension was dialed "normally"(outside a ring group).
This would take into account any feature available from the user dialplan and configured through the user profile, such as call forwards, call permissions, voicemail, DND status, etc.

### Schedule

A ring group can be associated with a schedule ([`PUT /groups/<group_id>/schedule`](/documentation/api/configuration.html#tag/groups/operation/update_group_schedule)).

The schedule controls whether calls to the ring group should ring the group members, or instead ring an alternative fallback destination, depending on the time of day and week.

### Fallback Destinations

Ring groups can be configured with fallback destinations([`PUT /groups/<group_uuid>/fallbacks`](/documentation/api/configuration.html#tag/groups/operation/update_group_fallbacks)):

- `congestion_destination`: the call is redirected to that destination if the ring group is already handling the maximum number of calls determined by the `max_calls` option(defaulting to `0` as unlimited);
- `noanswer_destination`: the call is redirected to that destination if no group member answers for a duration of time determined by the `timeout` option(defaulting to `0` as no timeout).

### Call permissions

[Call permissions](/uc-doc/administration/call_permissions) can be associated with a ring group to limit which users can call the ring group ([`PUT /groups/<group_uuid>/callpermissions/<callpermission_id>`](/documentation/api/configuration.html#tag/groups/operation/update_group_callpermission)).

### Misc Options

Refer to [the api reference](/documentation/api/configuration.html#tag/groups/operation/update_group) for all supported group options.

Additional information:

- `ignore_forward`: this option controls whether to ignore forwardings proposed _by the member's endpoint_ when called, such as forwardings configured on a SIP phone device. This _does not_ affect the forwardings configured through user profiles, nor the fallback redirections configured on the group itself.
  When set to `true`, a member's endpoint proposing a redirection is simply ignored and skipped, ringing other members according to the ring strategy; when `false`, a redirection proposed by a member's endpoint is followed, in effect answering the group call through that forwarding.
