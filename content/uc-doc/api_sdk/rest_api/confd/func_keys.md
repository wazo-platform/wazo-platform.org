---
title: Function Keys
---

Function keys can be used as shortcuts for dialing a number, or accomplishing other menial tasks, by
pushing a button on the phone. A function key's action is determined by its destination.

Function keys can be added directly on a user, or in a template. Templates are useful for creating a
set of common function keys that can be used by the same group of people.

This page only describes the data models used by the REST API. Consult the
[API documentation](https://wazo-platform.org/documentation) for further details on URLs.

## Function Key Template

### Parameters

| Field | Type                          | Required | Value                                                                                                     |
| ----- | ----------------------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| name  | string                        | No       | A name for the template.                                                                                  |
| keys  | [Function Key](#function-key) | No       | A collection of function keys under the form `{"position": "funckey"}`. See the example for more details. |

### Example

```json
{
  "name": "Example template",
  "keys": {
    "1": {
      "destination": {
        "type": "user",
        "user_id": 34
      }
    },
    "2": {
      "blf": true,
      "label": "Call mom",
      "destination": {
        "type": "custom",
        "exten": "5551234567"
      }
    }
  }
}
```

## Function Key {#function-key}

### Description

| Field       | Type                        | Required | Value                                                 |
| ----------- | --------------------------- | -------- | ----------------------------------------------------- |
| blf         | boolean                     | No       | Turn on BLF when there is activity on the destination |
| label       | string                      | No       | Label to display next to the function key             |
| destination | [Destination](#destination) | Yes      | Destination to call                                   |

### Example

```json
{
  "blf": true,
  "label": "Call john",
  "destination": {
    "type": "user",
    "user_id": 34
  }
}
```

## Destination {#destination}

A destination determines the number to dial when using a function key. Destinations are composed of
a parameter named `type` and any additional parameters required by its type.

Available destination types:

- `agent`: An agent
- `bsfilter`: Boss/Secretary filter
- `conference`: Conference room
- `custom`: A custom number to dial
- `forward`: Forward a call towards another number
- `group`: A group
- `groupmember`: Join or leave a group
- `onlinerec`: Record a conversation during a call
- `paging`: A paging
- `park`: Park a call
- `park_position`: Pick up a parked call
- `queue`: Call queue
- `service`: A call service
- `transfer`: Transfer a call
- `user`: A User

Here are the parameters required for each destination:

### Agent

| Field    | Type    | Value                                                           |
| -------- | ------- | --------------------------------------------------------------- |
| agent_id | numeric | ID of the agent                                                 |
| action   | string  | What to do with this agent. Valid values: login, logout, toggle |

### BSFilter

| Field            | Type    | Value                   |
| ---------------- | ------- | ----------------------- |
| filter_member_id | numeric | ID of the filter member |

### Conference

| Field         | Type    | Value                |
| ------------- | ------- | -------------------- |
| conference_id | numeric | ID of the conference |

### Custom

| Field | Type   | Value             |
| ----- | ------ | ----------------- |
| exten | string | Extension to dial |

### Forward

| Field   | Type   | Value                                                           |
| ------- | ------ | --------------------------------------------------------------- |
| forward | string | Type of forward. Possible values: busy, noanswer, unconditional |
| exten   | string | Forward destination extension (optional)                        |

### Group

| Field    | Type    | Value           |
| -------- | ------- | --------------- |
| group_id | numeric | ID of the group |

### Group Member

| Field    | Type    | Value                                                         |
| -------- | ------- | ------------------------------------------------------------- |
| group_id | numeric | ID of the group                                               |
| action   | string  | What to do with this group. Valid values: join, leave, toggle |

### Online call recording

No parameters are required for this destination

### Paging

| Field     | Type    | Value            |
| --------- | ------- | ---------------- |
| paging_id | numeric | ID of the paging |

### Parking

| Field          | Type    | Value                 |
| -------------- | ------- | --------------------- |
| parking_lot_id | numeric | ID of the parking lot |

### Parking Position

| Field          | Type           | Value                                  |
| -------------- | -------------- | -------------------------------------- |
| parking_lot_id | numeric        | ID of the parking lot                  |
| position       | numeric string | Position inside the parking to pick up |

### Queue

| Field    | Type    | Value           |
| -------- | ------- | --------------- |
| queue_id | numeric | ID of the queue |

### Service

| Field   | Type   | Value               |
| ------- | ------ | ------------------- |
| service | string | Name of the service |

Currently supported services:

- `phonestatus`: Phone Status
- `recsnd`: Sound Recording
- `callrecord`: Call recording
- `incallfilter`: Incoming call filtering
- `enablednd`: Enable "Do not disturb" mode
- `pickup`: Group Interception
- `calllistening`: Listen to online calls
- `directoryaccess`: Directory access
- `fwdundoall`: Disable all forwaring
- `enablevm`: Enable Voicemail
- `vmusermsg`: Consult the Voicemail
- `vmuserpurge`: Delete messages from voicemail

### Transfer

| Field    | Type   | Value                                              |
| -------- | ------ | -------------------------------------------------- |
| transfer | string | Type of transfer. Possible values: blind, attended |

### User

| Field   | Type    | Value          |
| ------- | ------- | -------------- |
| user_id | numeric | ID of the user |
