---
title: User Management
---

The purpose of this page is to explain how to set up a fully operational “telephony” user (with the Wazo API), having the following features/properties:

- Voicemail enabled
- Forward enabled
- Credentials for API usage
- One or more lines (including extensions and SIP endpoints) created
- One or more created DID numbers that allow(s) receiving calls
- Member of a ring groups
- …

Want more information about the user's API, consult the [API documentation](/documentation/api/configuration.html#tag/users/operation/create_user).

## Create User (the old way)

The Wazo REST API historically provides HTTP endpoints helping developers to manage resources at a very low level (i.e. developers manage the resources, one by one).
For example: to create a fully operational “telephony” user, developers must query various endpoints (and so many resources) in a specific order:

- /users
- /lines
- /extensions
- /voicemails
- …

The following requests must be made in the specific chronological order:

### User

- Create the core of the “telephony” user ([API Reference](/documentation/api/configuration.html#tag/users/operation/create_user)):
  ```markdown
  POST /users
  ```

### Line(s)

- Create line ([API Reference](/documentation/api/configuration.html#tag/lines/operation/create_line)):

  ```markdown
  POST /lines
  ```

- Attach the line to the user ([API Reference](/documentation/api/configuration.html#tag/users/operation/associate_user_line)):
  ```markdown
  PUT /users/<user_id>/lines/<line_id>
  ```

### SIP Endpoint(s)

- Create SIP endpoint ([API Reference](/documentation/api/configuration.html#tag/endpoints/operation/create_endpoint_sip)):

  ```markdown
  POST /endpoints/sip
  ```

- Attach trunk to SIP endpoint ([API Reference](/documentation/api/configuration.html#tag/endpoints/operation/associate_trunk_endpoint_sip)):

  ```markdown
  POST /trunks/<trunk_id>/endpoints/sip/<sip_uuid>
  ```

- Attach endpoint to line ([API Reference](/documentation/api/configuration.html#tag/lines/operation/associate_line_endpoint_sip)):
  ```markdown
  PUT /lines/<line_id>/endpoints/sip/<endpoint_uuid>
  ```

### Extension(s)

- Create extension ([API Reference](/documentation/api/configuration.html#tag/extensions/operation/create_line_extension)):

  ```markdown
  POST /extensions
  ```

- Attach extension to line ([API Reference](/documentation/api/configuration.html#tag/extensions/operation/associate_line_extension)):
  ```markdown
  PUT /lines/<line_id>/extensions/<extension_id>
  ```

### Voicemail(s)

- Create voicemail ([API Reference](/documentation/api/configuration.html#tag/voicemails/operation/create_voicemail)):

  ```markdown
  POST /voicemails
  ```

- Attach voicemail to user ([API Reference](/documentation/api/configuration.html#tag/users/operation/associate_user_voicemail)):
  ```markdown
  PUT /users/<user_id>/voicemails/<voicemail_id>
  ```

### Forward(s)

- Define all forwards for user (remove existing user’s forwards) ([API Reference](/documentation/api/configuration.html#tag/users/operation/update_user_forwards)):
  ```markdown
  PUT /users/<user_id>/forwards
  ```

### Fallback(s)

- Define all fallbacks for user (remove existing user’s fallbacks) ([API Reference](/documentation/api/configuration.html#tag/users/operation/update_user_fallback)):
  ```markdown
  PUT /users/<user_id>/fallbacks
  ```

### Agent(s)

- Create agent ([API Reference](/documentation/api/configuration.html#tag/agents/operation/create_agent)):

  ```markdown
  POST /agents
  ```

- Attach agent to user ([API Reference](/documentation/api/configuration.html#tag/users/operation/associate_user_agent)):
  ```markdown
  PUT /users/<user_id>/agents/<agent_id>
  ```

### Group(s) ( including ring group(s) )

- Create group having some users as members (including the new user) ([API Reference](/documentation/api/configuration.html#tag/groups/operation/create_group)):
  ```markdown
  POST /groups
  ```

OR

- Define existing groups for user (this will detach any existing groups already attached to the user) ([API Reference](/documentation/api/configuration.html#tag/users/operation/update_user_groups)):
  ```markdown
  PUT /users/<user_id>/groups
  ```

OR

- Define some users as members (including the new user) (this will detach existing members already attached to the group) ([API Reference](/documentation/api/configuration.html#tag/users/operation/update_group_member_users)):
  ```markdown
  PUT /groups/<group_uuid>/members/users
  ```

### Incall(s)

- Create an incall with ‘user’ as a destination ([API Reference](/documentation/api/configuration.html#tag/incalls/operation/create_incall)):

  ```markdown
  POST /incalls
  ```

- Create an extension, having the context used for the incalls ([API Reference](/documentation/api/configuration.html#tag/extensions/operation/create_extension)):

  ```markdown
  POST /extensions
  ```

- Attach the extension(s) to the incall(s) ([API Reference](/documentation/api/configuration.html#tag/incalls/operation/associate_incall_extension)):
  ```markdown
  POST /incalls/<incall_id>/extensions/<extension_id>
  ```

### Service(s)

- Enable dnd and incallfilter for the user ([API Reference](/documentation/api/configuration.html#tag/users/operation/update_user_services)):
  ```markdown
  PUT /users/<user_id>/services
  ```

### Switchboard(s)

- Create new switchboard with user as member ([API Reference](/documentation/api/configuration.html#tag/switchboards/paths/~1switchboards/post)):
  ```markdown
  POST /switchboards
  ```

OR

- For each existing switchboards needed to be attached to the user:

  - Retrieve one switchboard with its existing members ([API Reference](/documentation/api/configuration.html#tag/switchboards/paths/~1switchboards~1%7Bswitchboard_uuid%7D/get)):

    ```markdown
    GET /switchboards/<switchboard_uuid>
    ```

  - Define members (existing+new user) for the switchboard (erase existing members) ([API Reference](/documentation/api/configuration.html#tag/switchboards/paths/~1switchboards~1%7Bswitchboard_uuid%7D/put)):
    ```markdown
    PUT /switchboards/<switchboard_uuid>/members/users
    ```

### Queue(s)

- Create a queue with user as member ([API Reference](/documentation/api/configuration.html#tag/queues/operation/create_queue)):
  ```markdown
  POST /queues
  ```

OR

- For each existing switchboard needed to be attached to the user:

  - Retrieve one queue with the existing members ([API Reference](/documentation/api/configuration.html#tag/queues/operation/get_queue)):

    ```markdown
    GET /queue/<queue_id>
    ```

  - Associate queue to the user ([API Reference](/documentation/api/configuration.html#tag/queues/operation/update_user_queue_association)):
    ```markdown
    PUT /queues/<queue_id>/members/users/<user_id>
    ```

### Function Key(s)

- Define the func keys for user (erase existing ones already in place for the user) ([API Reference](/documentation/api/configuration.html#tag/users/operation/update_user_func_keys)):
  ```markdown
  PUT /users/<user_id>/funckeys
  ```

OR

- Attach a template of func keys to the user ([API Reference](/documentation/api/configuration.html#tag/users/operation/associate_user_func_key_template)):
  ```markdown
  PUT /users/<user_id>/funckeys/templates/<template_id>
  ```

## Create User (the new way)

As you may see in the previous chapter, there are a lot of steps to follow, in a specific order, to be able to correctly set up a new “telephony” user with all main features enabled.

To help developers to quickly create users and easily understand the information needed, the user creation process has been revamped. This allows developers to use one single endpoint, instead of having to call many endpoints. Also relations and complete validation/rollback are handled at the server-side:

- the attachments (the link between the user and their related resources)
- the rollback in case of errors (if one of the resource creations fails)

**Warning**:
The following resources must be created before, when needed:

- Switchboards
- Groups
- Functions Keys Templates

Below is the only step to create the user.

### A Single `POST` Request

- Create the “telephony” user and all the required resources needed to be fully operational ([API Reference](/documentation/api/configuration.html#tag/users/operation/create_user)):
  ```markdown
  POST /users
  ```
  Voilà! The user and related resources will be created from this single endpoint. If the payload is not right, nothing will be created and you will receive a complete error message.
