---
title: Message Bus
---

-   [Usage](#usage)
    -   [Websocket](#websocket)
    -   [Direct AMQP connection](#direct-amqp-connection)
    -   [Example](#example)
    -   [Notes](#notes)
-   [Changelog](#bus-changelog)
    -   [19.05](#section)
    -   [19.04](#section-1)
    -   [19.03](#section-2)
    -   [19.02](#section-3)
    -   [18.04](#section-4)
    -   [18.02](#section-5)
    -   [17.17](#section-6)
    -   [17.16](#section-7)
    -   [17.14](#section-8)
    -   [17.08](#section-9)
    -   [17.01](#section-10)
    -   [16.08](#section-11)
    -   [16.07](#section-12)
    -   [15.20](#section-13)
    -   [15.17](#section-14)
-   [Events](#bus-events)
    -   [AMI events](#bus-ami_events)
    -   [auth\_user\_external\_auth\_added](#bus-external-auth-added)
    -   [auth\_user\_external\_auth\_authorized](#bus-external-auth-authorized)
    -   [auth\_user\_external\_auth\_deleted](#bus-external-auth-deleted)
    -   [auth\_tenant\_created](#bus-auth-tenant-created)
    -   [auth\_tenant\_deleted](#bus-auth-tenant-deleted)
    -   [auth\_tenant\_updated](#bus-auth-tenant-updated)
    -   [call\_form\_result](#bus-call_form_result)
    -   [agent\_status\_update](#bus-agent_status_update)
    -   [call\_created, call\_updated, call\_ended](#bus-call_created)
    -   [call\_held](#bus-call_held_event)
    -   [call\_resumed](#bus-call_resumed_event)
    -   [conference\_participant\_joined,
        conference\_participant\_left[]{#bus-conference-participant-joined}](#bus-conference-participant-left)
    -   [conference\_participant\_muted,
        conference\_participant\_unmuted[]{#bus-conference-participant-muted}](#bus-conference-participant-unmuted)
    -   [conference\_record\_started,
        conference\_record\_stopped[]{#bus-conference-record-started}](#bus-conference-record-stopped)
    -   [conference\_participant\_talk\_started,
        conference\_participant\_talk\_stopped[]{#bus-conference-participant-talk-started}](#bus-conference-participant-talk-stopped)
    -   [favorite\_added](#bus-favorite_added)
    -   [favorite\_deleted](#bus-favorite_deleted)
    -   [fax\_outbound\_created,
        fax\_outbound\_user\_created[]{#fax-outbound-created}](#fax-outbound-user-created)
    -   [fax\_outbound\_succeeded,
        fax\_outbound\_user\_succeeded[]{#fax-outbound-succeeded}](#fax-outbound-user-succeeded)
    -   [fax\_outbound\_failed,
        fax\_outbound\_user\_failed[]{#fax-outbound-failed}](#fax-outbound-user-failed)
    -   [plugin\_install\_progress](#bus-plugin_install_progress)
    -   [plugin\_uninstall\_progress](#bus-plugin_uninstall_progress)
    -   [relocate\_initiated, relocate\_answered, relocate\_completed,
        relocate\_ended[]{#bus-relocate_completed}[]{#bus-relocate_answered}[]{#bus-relocate_initiated}](#bus-relocate_ended)
    -   [user\_created](#bus-user_created)
    -   [user\_deleted](#bus-user_deleted)
    -   [user\_edited](#bus-user_edited)
    -   [[users\_forwards]()\<forward\_name\>\_updated](#bus-users_forwards_forward_updated)
    -   [[users\_services]()\<service\_name\>\_updated](#bus-users_services_service_updated)
    -   [service\_registered\_event](#bus-service_registered_event)
    -   [service\_deregistered\_event](#bus-service_deregistered_event)
    -   [user\_voicemail\_message\_created](#user_voicemail_message_created)

The message bus is used to receive events from Wazo. It is provided by
an
[AMQP](http://en.wikipedia.org/wiki/Advanced_Message_Queuing_Protocol)
0-9-1 broker (namely,
[RabbitMQ](http://previous.rabbitmq.com/v2_8_x/documentation.html)) that
is integrated in Wazo.

Usage
=====

Websocket
---------

The easiest way to listen for events is to use the
`Wazo WebSocket <wazo-websocketd>`{.interpreted-text role="ref"}.

Direct AMQP connection
----------------------

At the moment, the AMQP broker only listen on the 127.0.0.1 address.
This means that if you want to connect to the AMQP broker from a distant
machine, you must modify the RabbitMQ server configuration, which is not
yet an officially supported operation. All events are sent to the *xivo*
exchange.

Otherwise, the default connection information is:

-   Virtual host: /
-   User name: guest
-   User password: guest
-   Port: 5672
-   Exchange name: xivo
-   Exchange type: topic

Example
-------

Here\'s an example of a simple client, in python, listening for
`bus-call_created`{.interpreted-text role="ref"} events:

    import kombu

    from kombu.mixins import ConsumerMixin

    EXCHANGE = kombu.Exchange('xivo', type='topic')
    ROUTING_KEY = 'calls.*'


    class C(ConsumerMixin):

        def __init__(self, connection):
            self.connection = connection

        def get_consumers(self, Consumer, channel):
            return [Consumer(kombu.Queue(exchange=EXCHANGE, routing_key=ROUTING_KEY),
                    callbacks=[self.on_message])]

        def on_message(self, body, message):
            print('Received:', body)
            message.ack()


    def main():
        with kombu.Connection('amqp://guest:guest@localhost:5672//') as conn:
            try:
                C(conn).run()
            except KeyboardInterrupt:
                return


    main()

If you are new to AMQP, you might want to look at the [RabbitMQ
tutorial](http://previous.rabbitmq.com/v2_8_x/getstarted.html).

Notes
-----

Things to be aware when writing a client/consumer:

-   The published messages are not persistent. When the AMQP broker
    stops, the messages that are still in queues will be lost.

Changelog {#bus-changelog}
=========

19.05
-----

-   The following messages have been deleted:
    -   chat\_message\_event
    -   chat\_message\_received
    -   chat\_message\_sent
    -   endpoint\_status\_update
    -   user\_status\_update

19.04
-----

-   The following messages have been added:
    -   `fax_outbound_created <fax-outbound-created>`{.interpreted-text
        role="ref"}
    -   `fax_outbound_user_created <fax-outbound-user-created>`{.interpreted-text
        role="ref"}
    -   `fax_outbound_succeeded <fax-outbound-succeeded>`{.interpreted-text
        role="ref"}
    -   `fax_outbound_user_succeeded <fax-outbound-user-succeeded>`{.interpreted-text
        role="ref"}
    -   `fax_outbound_failed <fax-outbound-failed>`{.interpreted-text
        role="ref"}
    -   `fax_outbound_user_failed <fax-outbound-user-failed>`{.interpreted-text
        role="ref"}

19.03
-----

-   The following messages have been added:
    -   `conference_record_started <bus-conference-record-started>`{.interpreted-text
        role="ref"}
    -   `conference_record_stopped <bus-conference-record-stopped>`{.interpreted-text
        role="ref"}
    -   `conference_participant_talk_started <bus-conference-participant-talk-started>`{.interpreted-text
        role="ref"}
    -   `conference_participant_talk_stopped <bus-conference-participant-talk-stopped>`{.interpreted-text
        role="ref"}

19.02
-----

-   The following messages have been added:
    -   `conference_participant_joined <bus-conference-participant-joined>`{.interpreted-text
        role="ref"}
    -   `conference_participant_left <bus-conference-participant-left>`{.interpreted-text
        role="ref"}
    -   `conference_participant_muted <bus-conference-participant-muted>`{.interpreted-text
        role="ref"}
    -   `conference_participant_unmuted <bus-conference-participant-unmuted>`{.interpreted-text
        role="ref"}

18.04
-----

-   The following messages have been added:
    -   `auth_tenant_created <bus-auth-tenant-created>`{.interpreted-text
        role="ref"}
    -   `auth_tenant_deleted <bus-auth-tenant-deleted>`{.interpreted-text
        role="ref"}
    -   `auth_tenant_updated <bus-auth-tenant-updated>`{.interpreted-text
        role="ref"}

18.02
-----

-   The following message has been added:
    -   `auth_user_external_auth_authorized <bus-external-auth-authorized>`{.interpreted-text
        role="ref"}

17.17
-----

-   The following messages have been added:
    -   `auth_user_external_auth_added <bus-external-auth-added>`{.interpreted-text
        role="ref"}
    -   `auth_user_external_auth_deleted <bus-external-auth-deleted>`{.interpreted-text
        role="ref"}

17.16
-----

-   The following messages have been added:
    -   `relocate_initiated <bus-relocate_initiated>`{.interpreted-text
        role="ref"}
    -   `relocate_answered <bus-relocate_answered>`{.interpreted-text
        role="ref"}
    -   `relocate_completed <bus-relocate_completed>`{.interpreted-text
        role="ref"}
    -   `relocate_ended <bus-relocate_ended>`{.interpreted-text
        role="ref"}

17.14
-----

-   The chat\_message\_sent bus message has been added.
-   The chat\_message\_received bus message has been added.
-   The chat\_message\_event bus message has been deprecated.

17.08
-----

-   The `bus-plugin_install_progress`{.interpreted-text role="ref"} bus
    message has been added.
-   The `bus-plugin_uninstall_progress`{.interpreted-text role="ref"}
    bus message has been added.

17.01
-----

-   The `bus-favorite_added`{.interpreted-text role="ref"} bus message
    has been added.
-   The `bus-favorite_deleted`{.interpreted-text role="ref"} bus message
    has been added.

16.08
-----

-   The `bus-call_held_event`{.interpreted-text role="ref"} bus message
    has been added.
-   The `bus-call_resumed_event`{.interpreted-text role="ref"} bus
    message has been added.
-   The user\_status\_update bus message now uses the user\'s UUID
    instead of the user\'s ID.

16.07
-----

-   The `bus-user_created`{.interpreted-text role="ref"} bus message has
    been added.
-   The `bus-user_edited`{.interpreted-text role="ref"} bus message has
    been added.
-   The `bus-user_deleted`{.interpreted-text role="ref"} bus message has
    been added.

15.20
-----

-   The chat\_message\_event bus message has been added.

15.17
-----

-   The `bus-service_registered_event`{.interpreted-text role="ref"} and
    `bus-service_deregistered_event`{.interpreted-text role="ref"} bus
    messages have been added.

Events {#bus-events}
======

Events that are sent to the bus use a JSON serialization format with the
content-type [application/json]{.title-ref}. For example, the CTI
call\_form\_result event looks like this:

    {"name": "call_form_result",
     "origin_uuid": "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3",
     "data": {...}}

All events have the same basic structure, namely, a JSON object with 4
keys:

name

:   A string representing the name of the event. Each event type has a
    unique name.

required\_acl (optional)

:   Either a string or null. Currently used by wazo-websocketd to
    determine if a client can receive the event or not. See the
    `ws-events-acl`{.interpreted-text role="ref"} section for more
    information.

origin\_uuid

:   The uuid to identify the message producer.

data

:   The data specific part of the event. This is documented on a per
    event type; if not this is assumed to be null.

AMI events {#bus-ami_events}
----------

All AMI events are broadcasted on the bus.

-   routing key: ami.\<event name\>
-   event specific data: a dictionary with the content of the AMI event

Example event with binding key QueueMemberStatus:

    {
        "name": "QueueMemberStatus",
        "origin_uuid": "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3",
        "data": {
            "Status": "1",
            "Penalty": "0",
            "CallsTaken": "0",
            "Skills": "",
            "MemberName": "sip\/m3ylhs",
            "Queue": "petak",
            "LastCall": "0",
            "Membership": "static",
            "Location": "sip\/m3ylhs",
            "Privilege": "agent,all",
            "Paused": "0",
            "StateInterface": "sip\/m4ylhs"
        }
    }

auth\_user\_external\_auth\_added {#bus-external-auth-added}
---------------------------------

This event is sent when a user adds an external authentication to its
account.

-   routing\_key:
    auth.users.{user\_uuid}.external.{external\_auth\_name}.created
-   event specific data:
    -   user\_uuid: The user\'s UUID
    -   external\_auth\_name: The name of the external service

Example:

    {
      "name": "auth_user_external_auth_added",
      "origin_uuid": "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3",
      "data": {
        "user_uuid": "a1e05585-1421-4397-bd59-9cf9725888e9",
        "external_auth_name": "zoho"
      }
    }

auth\_user\_external\_auth\_authorized {#bus-external-auth-authorized}
--------------------------------------

This event is sent when a user authorizes an oauth2 request on an
external authentication plugin.

-   routing\_key:
    auth.users.{user\_uuid}.external.{external\_auth\_name}.authorized
-   event specific data:
    -   user\_uuid: The user\'s UUID
    -   external\_auth\_name: The name of the external service

Example:

    {
      "name": "auth_user_external_auth_authorized",
      "origin_uuid": "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3",
      "data": {
        "user_uuid": "a1e05585-1421-4397-bd59-9cf9725888e9",
        "external_auth_name": "zoho"
      }
    }

auth\_user\_external\_auth\_deleted {#bus-external-auth-deleted}
-----------------------------------

This event is sent when a user removes an external authentication from
its account.

-   routing\_key:
    auth.users.{user\_uuid}.external.{external\_auth\_name}.deleted
-   event specific data:
    -   user\_uuid: The user\'s UUID
    -   external\_auth\_name: The name of the external service

Example:

    {
      "name": "auth_user_external_auth_deleted",
      "origin_uuid": "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3",
      "data": {
        "user_uuid": "a1e05585-1421-4397-bd59-9cf9725888e9",
        "external_auth_name": "zoho"
      }
    }

auth\_tenant\_created {#bus-auth-tenant-created}
---------------------

This event is published when a tenant is created

-   routing\_key: auth.tenants.{tenant\_uuid}.created
-   event specific data:
    -   uuid: The tenant\'s UUID
    -   name: The name of the tenant

Example:

``` {.sourceCode .javascript}
{
  "name": "auth_tenant_created",
  "origin_uuid": "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3",
  "data": {
    "uuid": "a1e05585-1421-4397-bd59-9cf9725888e9",
    "name": "<name>"
  }
}
```

auth\_tenant\_deleted {#bus-auth-tenant-deleted}
---------------------

This event is published when a tenant is deleted

-   routing\_key: auth.tenants.{tenant\_uuid}.deleted
-   event specific data:
    -   uuid: The tenant\'s UUID

Example:

``` {.sourceCode .javascript}
{
  "name": "auth_tenant_deleted",
  "origin_uuid": "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3",
  "data": {
    "uuid": "a1e05585-1421-4397-bd59-9cf9725888e9",
  }
}
```

auth\_tenant\_updated {#bus-auth-tenant-updated}
---------------------

This event is published when a tenant is updated

-   routing\_key: auth.tenants.{tenant\_uuid}.updated
-   event specific data:
    -   uuid: The tenant\'s UUID
    -   name: The name of the tenant

Example:

``` {.sourceCode .javascript}
{
  "name": "auth_tenant_updated",
  "origin_uuid": "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3",
  "data": {
    "uuid": "a1e05585-1421-4397-bd59-9cf9725888e9",
    "name": "<name>"
  }
}
```

call\_form\_result {#bus-call_form_result}
------------------

The call\_form\_result event is sent when a custom call form is
submitted via REST API.

-   routing key: call\_form\_result
-   event specific data: a dictionary with 2 keys:
    -   user\_id: an integer corresponding to the user ID of the client
        who saved the call form
    -   variables: a dictionary holding the content of the form

Example:

    {
        "name": "call_form_result",
        "origin_uuid": "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3",
        "data": {
            "user_id": 40,
            "variables": {
                "firstname": "John",
                "lastname": "Doe"
            }
        }
    }

agent\_status\_update {#bus-agent_status_update}
---------------------

The agent\_status\_update is sent when an agent is logged in or logged
out.

-   routing key: status.agent
-   required ACL: events.statuses.agents
-   event specific data: a dictionary with 3 keys:
    -   agent\_id: an integer corresponding to the agent ID of the agent
        who\'s status changed
    -   status: a string identifying the status
    -   xivo\_id: the uuid of the xivo

Example:

    {
        "name": "agent_status_update",
        "required_acl": "events.statuses.agents",
        "origin_uuid": "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3",
        "data": {
            "agent_id": 42,
            "xivo_id": "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3",
            "status": "logged_in"
        }
    }

call\_created, call\_updated, call\_ended {#bus-call_created}
-----------------------------------------

The events `call_created`, `call_updated`, `call_ended` are sent when a
call handled by wazo-calld is received, connected or hung up.

-   routing key: calls.call.created, calls.call.updated,
    calls.call.ended
-   required ACL: events.calls.\<user\_uuid\>
-   event specific data: a dictionary with the same fields as the REST
    API model of Call (See <http://api.wazo.community>, section
    wazo-calld)

Example:

    {
        "name": "call_created",
        "required_acl": "events.calls.2e752722-0864-4665-887d-a78a024cf7c7",
        "origin_uuid": "08c56466-8f29-45c7-9856-92bf1ba89b82",
        "data": {
            "bridges": [],
            "call_id": "1455123422.8",
            "caller_id_name": "Some One",
            "caller_id_number": "1001",
            "creation_time": "2016-02-10T11:57:02.592-0500",
            "status": "Ring",
            "talking_to": {},
            "user_uuid": "2e752722-0864-4665-887d-a78a024cf7c7"
        }
    }

call\_held {#bus-call_held_event}
----------

This message is sent when a call is placed on hold

-   routing key: calls.hold.created
-   event specific data:
    -   call\_id: The asterisk channel unique ID

Example:

``` {.sourceCode .javascript}
{"name": "call_held",
 "origin_uuid": "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3",
 "data": {"call_id": "1465572129.31"}}
```

call\_resumed {#bus-call_resumed_event}
-------------

This message is sent when a call is resumed from hold

-   routing key: calls.hold.deleted
-   event specific data:
    -   call\_id: The asterisk channel unique ID

Example:

``` {.sourceCode .javascript}
{"name": "call_resumed",
 "origin_uuid": "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3",
 "data": {"call_id": "1465572129.31"}}
```

conference\_participant\_joined, conference\_participant\_left[]{#bus-conference-participant-joined} {#bus-conference-participant-left}
----------------------------------------------------------------------------------------------------

Those events are send when a participant joins or leaves a conference
room.

-   routing keys:
    -   `conferences.<conference_id>.participants.joined`
    -   `conferences.<conference_id>.participants.left`
-   required ACLs:
    -   `events.conferences.<conference_id>.participants.joined`
    -   `events.conferences.<conference_id>.participants.left`
-   event specific data:
    -   `id`: The ID of the participant inside the conference
    -   `caller_id_name`: The CallerID name of the participant
    -   `caller_id_num`: The CallerID number of the participant
    -   `muted`: Is the participant muted?
    -   `answered_time`: Elapsed seconds since the participant joined
        the conference
    -   `admin`: Is the participant and admin of the conference?
    -   `language`: The language of the participant
    -   `call_id`: The ID of the call, usable in the `/calls` endpoints
        of `wazo-calld`
    -   `conference_id`: The ID of the conference

Example:

``` {.sourceCode .javascript}
{
    "name": "conference_participant_joined",
    "origin_uuid": "08c56466-8f29-45c7-9856-92bf1ba89b82",
    "required_acl": "events.conferences.1.participants.joined",
    "data": {
        "admin": false,
        "answered_time": 0,
        "call_id": "1547576420.11",
        "caller_id_name": "Bernard Marx",
        "conference_id": 1,
        "id": "1547576420.11",
        "language": "fr_FR",
        "muted": false
    }
}
```

conference\_participant\_muted, conference\_participant\_unmuted[]{#bus-conference-participant-muted} {#bus-conference-participant-unmuted}
-----------------------------------------------------------------------------------------------------

Those events are send when a participant joins or leaves a conference
room.

-   routing key for both events:
    -   `conferences.<conference_id>.participants.mute`
-   required ACL for both events:
    -   `events.conferences.<conference_id>.participants.mute`
-   event specific data:
    -   `id`: The ID of the participant inside the conference
    -   `caller_id_name`: The CallerID name of the participant
    -   `caller_id_num`: The CallerID number of the participant
    -   `muted`: Is the participant muted?
    -   `admin`: Is the participant and admin of the conference?
    -   `language`: The language of the participant
    -   `call_id`: The ID of the call, usable in the `/calls` endpoints
        of `wazo-calld`
    -   `conference_id`: The ID of the conference

Example:

``` {.sourceCode .javascript}
{
    "name": "conference_participant_muted",
    "origin_uuid": "08c56466-8f29-45c7-9856-92bf1ba89b82",
    "required_acl": "events.conferences.1.participants.mute",
    "data": {
        "admin": false,
        "call_id": "1547576420.11",
        "caller_id_name": "Bernard Marx",
        "conference_id": 1,
        "id": "1547576420.11",
        "language": "fr_FR",
        "muted": true
    }
}
```

conference\_record\_started, conference\_record\_stopped[]{#bus-conference-record-started} {#bus-conference-record-stopped}
------------------------------------------------------------------------------------------

Those events are send when a participant joins or leaves a conference
room.

-   routing key for both events:
    -   `conferences.<conference_id>.record`
-   required ACL for both events:
    -   `events.conferences.<conference_id>.record`
-   event specific data:
    -   `id`: The ID of the conference

Example:

``` {.sourceCode .javascript}
{
    "name": "conference_record_started",
    "origin_uuid": "08c56466-8f29-45c7-9856-92bf1ba89b82",
    "required_acl": "events.conferences.1.record",
    "data": {
        "id": 1
    }
}
```

conference\_participant\_talk\_started, conference\_participant\_talk\_stopped[]{#bus-conference-participant-talk-started} {#bus-conference-participant-talk-stopped}
--------------------------------------------------------------------------------------------------------------------------

Those events are send when a participant joins or leaves a conference
room.

-   routing key for both events:
    -   `conferences.<conference_id>.participants.talk`
-   required ACL for both events:
    -   `events.conferences.<conference_id>.participants.talk`
-   event specific data:
    -   `id`: The ID of the conference

Example:

``` {.sourceCode .javascript}
{
    "name": "conference_participant_talk_started",
    "origin_uuid": "08c56466-8f29-45c7-9856-92bf1ba89b82",
    "required_acl": "events.conferences.1.participants.talk",
    "data": {
        "admin": false,
        "call_id": "1547576420.11",
        "caller_id_name": "Bernard Marx",
        "conference_id": 1,
        "id": "1547576420.11",
        "language": "fr_FR",
        "muted": false
    }
}
```

favorite\_added {#bus-favorite_added}
---------------

The `favorite_added` event is published when a contact is marked as a
favorite by a user.

-   routing key: directory.\<user\_uuid\>.favorite.created
-   required ACL: events.directory.\<user\_uuid\>.favorite.created
-   event specific data:

    > -   xivo\_id: The user\'s Wazo server UUID
    > -   user\_uuid: The user\'s UUID
    > -   source: The source in which this contact can be found
    > -   source\_entry\_id: The ID of the contact within this source

Example:

``` {.sourceCode .javascript}
{
    "name": "favorite_added",
    "origin_uuid": "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3",
    "data": {
        "xivo_uuid": "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3",
        "user_uuid": "8e58d2a7-cfed-4c2e-ac72-14e0b5c26dc2",
        "source": "internal",
        "source_entry_id": 42
    }
}
```

favorite\_deleted {#bus-favorite_deleted}
-----------------

The `favorite_deleted` event is published when a favorited contact is
marked a not favorite by a user

-   routing key: directory.\<user\_uuid\>.favorite.deleted
-   required ACL: events.directory.\<user\_uuid\>.favorite.deleted
-   event specific data:

    > -   xivo\_id: The user\'s Wazo server UUID
    > -   user\_uuid: The user\'s UUID
    > -   source: The source in which this contact can be found
    > -   source\_entry\_id: The ID of the contact within this source

Example:

``` {.sourceCode .javascript}
{
    "name": "favorite_deleted",
    "origin_uuid": "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3",
    "data": {
        "xivo_uuid": "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3",
        "user_uuid": "8e58d2a7-cfed-4c2e-ac72-14e0b5c26dc2",
        "source": "internal",
        "source_entry_id": 42
    }
}
```

fax\_outbound\_created, fax\_outbound\_user\_created[]{#fax-outbound-created} {#fax-outbound-user-created}
-----------------------------------------------------------------------------

Those event are published when a fax is being sent.
`fax_outbound_user_created` is only sent if the fax was sent by a user.

-   routing key: `faxes.outbound.created` and
    `faxes.outbound.users.{user_uuid}.created`
-   required ACL: `events.faxes.outbound.created` and
    `events.faxes.outbound.users.{user_uuid}.created`
-   event specific data:

    > -   `id`: The fax ID
    > -   `call_id`: The ID of the call that sent the fax
    > -   `extension`: The extension where the fax was sent
    > -   `context`: The context where the fax was sent
    > -   `caller_id`: The Caller ID presented to the fax recipient
    > -   `user_uuid`: The UUID of the user that sent the fax
    > -   `tenant_uuid`: The tenant UUID from where the fax was sent

Example:

``` {.sourceCode .javascript}
{
    "name": "fax_outbound_created",
    "origin_uuid": "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3",
    "data": {
        "id": "1234567.89",
        "call_id": "1234567.89",
        "context": "internal",
        "extension": "1234",
        "caller_id": "fax sender <5551234>",
        "user_uuid": "3c616e3a-611b-4703-bea8-9be4fc4c9fe4",
        "tenant_uuid": "bd72b051-fd14-40be-9c3d-6b5fe65271ca",
    }
}
```

fax\_outbound\_succeeded, fax\_outbound\_user\_succeeded[]{#fax-outbound-succeeded} {#fax-outbound-user-succeeded}
-----------------------------------------------------------------------------------

This event is published when a fax was successfully sent.
`fax_outbound_user_succeeded` is only sent if the fax was sent by a
user.

-   routing key: `faxes.outbound.succeeded` and
    `faxes.outbound.users.{user_uuid}.succeeded`
-   required ACL: `events.faxes.outbound.succeeded` and
    `events.faxes.outbound.users.{user_uuid}.succeeded`
-   event specific data:

    > -   `id`: The fax ID
    > -   `call_id`: The ID of the call that sent the fax
    > -   `extension`: The extension where the fax was sent
    > -   `context`: The context where the fax was sent
    > -   `caller_id`: The Caller ID presented to the fax recipient
    > -   `user_uuid`: The UUID of the user that sent the fax
    > -   `tenant_uuid`: The tenant UUID from where the fax was sent

Example:

``` {.sourceCode .javascript}
{
    "name": "fax_outbound_succeeded",
    "origin_uuid": "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3",
    "data": {
        "id": "1234567.89",
        "call_id": "1234567.89",
        "context": "internal",
        "extension": "1234",
        "caller_id": "fax sender <5551234>",
        "user_uuid": "3c616e3a-611b-4703-bea8-9be4fc4c9fe4",
        "tenant_uuid": "bd72b051-fd14-40be-9c3d-6b5fe65271ca"
    }
}
```

fax\_outbound\_failed, fax\_outbound\_user\_failed[]{#fax-outbound-failed} {#fax-outbound-user-failed}
--------------------------------------------------------------------------

This event is published when a fax was successfully sent.
`fax_outbound_user_created` is only sent if the fax was sent by a user.

-   routing key: `faxes.outbound.failed` and
    `faxes.outbound.users.{user_uuid}.failed`
-   required ACL: `events.faxes.outbound.failed` and
    `events.faxes.outbound.users.{user_uuid}.failed`
-   event specific data:

    > -   `id`: The fax ID
    > -   `call_id`: The ID of the call that sent the fax
    > -   `extension`: The extension where the fax was sent
    > -   `context`: The context where the fax was sent
    > -   `caller_id`: The Caller ID presented to the fax recipient
    > -   `user_uuid`: The UUID of the user that sent the fax
    > -   `tenant_uuid`: The tenant UUID from where the fax was sent
    > -   `error`: An explanation of the fax failure

Example:

``` {.sourceCode .javascript}
{
    "name": "fax_outbound_failed",
    "origin_uuid": "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3",
    "data": {
        "id": "1234567.89",
        "call_id": "1234567.89",
        "context": "internal",
        "extension": "1234",
        "caller_id": "fax sender <5551234>",
        "user_uuid": "3c616e3a-611b-4703-bea8-9be4fc4c9fe4",
        "tenant_uuid": "bd72b051-fd14-40be-9c3d-6b5fe65271ca",
        "error": "recipient did not answer"
    }
}
```

plugin\_install\_progress {#bus-plugin_install_progress}
-------------------------

The [plugin\_install\_progress]{.title-ref} event is published during
the installation of a plugin.

-   routing key: [plugin.install.\<uuid\>.\<status\>]{.title-ref}
-   required ACL:
    [events.plugin.install.\<uuid\>.\<status\>]{.title-ref}
-   event specific data:
    -   uuid: The installation task UUID
    -   status: The status of the installation

Example:

``` {.sourceCode .javascript}
{
    "name": "plugin_install_progress",
    "origin_uuid": "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3",
    "data": {
        "uuid": "8e58d2a7-cfed-4c2e-ac72-14e0b5c26dc2",
        "status": "completed"
    }
}
```

plugin\_uninstall\_progress {#bus-plugin_uninstall_progress}
---------------------------

The [plugin\_uninstall\_progress]{.title-ref} event is published during
the removal of a plugin.

-   routing key: [plugin.uninstall.\<uuid\>.\<status\>]{.title-ref}
-   required ACL:
    [events.plugin.uninstall.\<uuid\>.\<status\>]{.title-ref}
-   event specific data:
    -   uuid: The removal task UUID
    -   status: The status of the removal

Example:

``` {.sourceCode .javascript}
{
    "name": "plugin_uninstall_progress",
    "origin_uuid": "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3",
    "data": {
        "uuid": "8e58d2a7-cfed-4c2e-ac72-14e0b5c26dc2",
        "status": "removing"
    }
}
```

relocate\_initiated, relocate\_answered, relocate\_completed, relocate\_ended[]{#bus-relocate_completed}[]{#bus-relocate_answered}[]{#bus-relocate_initiated} {#bus-relocate_ended}
-------------------------------------------------------------------------------------------------------------------------------------------------------------

Those events are published during the different steps of a relocate
operation.

-   routing key: `calls.relocate.XXX` where `XXX` is the event, e.g.
    `calls.relocate.completed`
-   headers:
    -   `"user_uuid:XXX": True` where `XXX` is the initiator\'s user
        UUID
-   required ACL: `events.relocates.XXX` where XXX is the initiator\'s
    user UUID
-   event specific data: a relocate object, see
    <http://api.wazo.community>, section `wazo-calld`.

Example:

``` {.sourceCode .javascript}
{
    "name": "relocate_completed",
    "origin_uuid": "cc5d0d76-687e-40a7-81cf-75e0540d1787",
    "data": {
        "uuid": "2fb9efc0-95d3-463b-9042-e2cf2183a303",
        "completions": [
          "answer"
        ],
        "relocated_call": "132456789.1",
        "initiator_call": "132456789.2",
        "recipient_call": "132456789.3",
        "initiator": "b459e3c9-b0a9-43a6-86ff-b4f7d00f6737",
    }
}
```

user\_created {#bus-user_created}
-------------

The [user\_created]{.title-ref} event is published when a new user is
created.

-   routing key: [config.user.created]{.title-ref}
-   event specific data: a dictionary with 2 keys
    -   id: the ID of the created user
    -   uuid: the UUID of the created user

Example:

``` {.sourceCode .javascript}
{
    "name": "user_created",
    "origin_uuid": "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3",
    "data": {
        "id": 42,
        "uuid": "8e58d2a7-cfed-4c2e-ac72-14e0b5c26dc2"
    }
}
```

user\_deleted {#bus-user_deleted}
-------------

The [user\_deleted]{.title-ref} event is published when a user is
deleted.

-   routing key: [config.user.deleted]{.title-ref}
-   event specific data: a dictionary with 2 keys
    -   id: the ID of the deleted user
    -   uuid: the UUID of the deleted user

Example:

``` {.sourceCode .javascript}
{
    "name": "user_deleted",
    "origin_uuid": "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3",
    "data": {
        "id": 42,
        "uuid": "8e58d2a7-cfed-4c2e-ac72-14e0b5c26dc2"
    }
}
```

user\_edited {#bus-user_edited}
------------

The [user\_edited]{.title-ref} event is published when a user is
modified.

-   routing key: [config.user.edited]{.title-ref}
-   event specific data: a dictionary with 2 keys
    -   id: the ID of the modified user
    -   uuid: the UUID of the modified user

Example:

``` {.sourceCode .javascript}
{
    "name": "user_edited",
    "origin_uuid": "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3",
    "data": {
        "id": 42,
        "uuid": "8e58d2a7-cfed-4c2e-ac72-14e0b5c26dc2"
    }
}
```

[users\_forwards]()\<forward\_name\>\_updated {#bus-users_forwards_forward_updated}
---------------------------------------------

The [users\_forwards]()\<forward\_name\>\_updated is sent when a user
changes his forward using REST API.

-   forward\_name:
    -   busy
    -   noanswer
    -   unconditional
-   routing key:
    config.users.\<user\_uuid\>.forwards.\<forward\_name\>.updated
-   required ACL:
    events.config.users.\<user\_uuid\>.forwards.\<forward\_name\>.updated
-   event specific data: a dictionary with 3 keys
    -   user\_uuid: the user uuid
    -   enabled: the state of the forward
    -   destination: the destination of the forward

Example:

    {
        "name": "users_forwards_busy_updated",
        "required_acl": "events.config.users.a1223fe6-bff8-4fb6-a982-f9157dea5094.forwards.busy.updated",
        "origin_uuid": "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3",
        "data": {
            "user_uuid": "a1223fe6-bff8-4fb6-a982-f9157dea5094",
            "enabled": true
            "destination": "1234"
        }
    }

[users\_services]()\<service\_name\>\_updated {#bus-users_services_service_updated}
---------------------------------------------

The [users\_services]()\<service\_name\>\_updated is sent when a user
changes his service using REST API.

-   service\_name:
    -   dnd
    -   incallfilter
-   routing key:
    config.users.\<user\_uuid\>.services.\<service\_name\>.updated
-   required ACL:
    events.config.users.\<user\_uuid\>.services.\<service\_name\>.updated
-   event specific data: a dictionary with 2 keys
    -   user\_uuid: the user uuid
    -   enabled: the state of the service

Example:

    {
        "name": "users_services_dnd_updated",
        "required_acl": "events.config.users.a1223fe6-bff8-4fb6-a982-f9157dea5094.services.dnd.updated",
        "origin_uuid": "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3",
        "data": {
            "user_uuid": "a1223fe6-bff8-4fb6-a982-f9157dea5094",
            "enabled": true
        }
    }

service\_registered\_event {#bus-service_registered_event}
--------------------------

The service\_registered\_event is sent when a service is started.

-   routing key: service.registered.\<service\_name\>
-   event specific data: a dictionary with 5 keys
    -   service\_name: The name of the started service
    -   service\_id: The consul ID of the started service
    -   address: The advertised address of the started service
    -   port: The advertised port of the started service
    -   tags: The advertised Consul tags of the started service

Example:

``` {.sourceCode .javascript}
{
    "name": "service_registered_event",
    "origin_uuid": "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3",
    "data": {
        "service_name": "wazo-dird",
        "service_id": "8e58d2a7-cfed-4c2e-ac72-14e0b5c26dc2",
        "address": "192.168.1.42",
        "port": 9495,
        "tags": ["wazo-dird", "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3", "Québec"]
    }
}
```

service\_deregistered\_event {#bus-service_deregistered_event}
----------------------------

The service\_deregistered\_event is sent when a service is stopped.

-   routing key: service.deregistered.\<service\_name\>
-   event specific data: a dictionary with 3 keys
    -   service\_name: The name of the stopped service
    -   service\_id: The consul ID of the stopped service
    -   tags: The advertised Consul tags of the stopped service

Example:

``` {.sourceCode .javascript}
{
    "name": "service_deregistered_event",
    "origin_uuid": "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3",
    "data": {
        "service_name": "wazo-dird",
        "service_id": "8e58d2a7-cfed-4c2e-ac72-14e0b5c26dc2",
        "tags": ["wazo-dird", "ca7f87e9-c2c8-5fad-ba1b-c3140ebb9be3", "Québec"]
    }
}
```

user\_voicemail\_message\_created
---------------------------------

The events `user_voicemail_message_created`,
`user_voicemail_message_updated`, `user_voicemail_message_deleted` are
sent when a message is left, updated or deleted from a voicemail. A
distinct message is generated for each user associated to the voicemail:
if the voicemail is not associated to any user, no message is generated.

-   routing key: voicemails.messages.created,
    voicemails.messages.updated, voicemails.messages.deleted
-   required ACL: events.users.\<user\_uuid\>.voicemails
-   event specific data: a dictionary with the same fields as the REST
    API model of VoicemailMessage (See <http://api.wazo.community>,
    section wazo-calld)

Example:

    {
        "name": "user_voicemail_message_created",
        "required_acl": "events.users.8a709eb7-897f-4183-aa3b-ffa2a74e7e37.voicemails",
        "origin_uuid": "3b13295f-9f93-4c19-bd52-015a928a8a2a",
        "data": {
            "voicemail_id": 1,
            "message": {
                "timestamp": 1479226725,
                "caller_id_num": "1001",
                "caller_id_name": "Alice",
                "duration": 0,
                "folder": {
                    "type": "new",
                    "id": 1,
                    "name": "inbox"
                },
                "id": "1479226725-00000003"
            },
            "user_uuid": "8a709eb7-897f-4183-aa3b-ffa2a74e7e37",
            "message_id": "1479226725-00000003"
        }
    }
