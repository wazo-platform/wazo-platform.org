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

Recordings are located in `/var/lib/wazo/sounds/tenants/<tenant_uuid>/monitor`

**Warning**: Since 21.02, renaming or removing a file in this repository will break CDR recordings
API


Recording can be retrieved using the call-logd API. You can download recordings individually for a given
call or download many recordings at the same time.

#### Downloading a single recording

Downloading a single recording can be done using the following resource.

`https://<WAZO STACK HOSTNAME>/api/call-logd/1.0/cdr/<CDR ID>/recordings/<RECORDING UUID>/media`

The CDR ID and recording UUID can be retrieved from the `/cdr` resource.

Here's an example of the response of a `GET` on `/cdr`

```javascript
{
  "items": [
    {
      "id": 2060,
      "tenant_uuid": "2c34c282-433e-4bb8-8d56-fec14ff7e1e9",
      "start": "2021-05-14T17:47:15.632882+00:00",
      "end": "2021-05-14T17:47:22.979637+00:00",
      "answered": true,
      "answer": "2021-05-14T17:47:18.146089+00:00",
      "duration": 4,
      "call_direction": "internal",
      "destination_extension": "1011",
      "destination_internal_context": "inside",
      "destination_internal_extension": "1011",
      "destination_line_id": 76,
      "destination_name": "Anastasia Romanov",
      "destination_user_uuid": "def42192-837a-41e0-aa4e-86390e46eb17",
      "requested_name": "Anastasia Romanov",
      "requested_context": "inside",
      "requested_extension":"1011",
      "requested_internal_context": "inside",
      "requested_internal_extension": "1011",
      "source_extension": "1015",
      "source_internal_context": "inside",
      "source_internal_extension": "1015",
      "source_line_id": 52,
      "source_name": "Olga Romanov",
      "source_user_uuid": "b2e98781-7118-4010-8da3-b93b1b7e1389",
      "tags": [
        "olga"
      ],
      "recordings": [
        {
          "uuid": "5ea37d0b-0823-4d2b-a18c-b9082e551b50",
          "start_time": "2021-05-14T17:47:16.701984+00:00",
          "end_time": "2021-05-14T17:47:22.979637+00:00",
          "deleted": false,
          "filename": "2021-05-14T17_47_16UTC-2060-5ea37d0b-0823-4d2b-a18c-b9082e551b50.wav"
        }
      ]
    }
  ],
  "total": 887,
  "filtered": 887
}
```

All of the call's information can be viewed, including the ID of the CDR, 2060 here, and the UUID of the recording,
5ea37d0b-0823-4d2b-a18c-b9082e551b50. There can be multiple recordings on a single call depending on the call and
the configuration.

The curl command to download this recording would be the following.

```
curl -X GET --header 'Accept: audio/wav' --header 'X-Auth-Token: <ACCESS TOKEN>' 'https://<WAZO STACK HOSTNAME>/api/call-logd/1.0/cdr/2060/recordings/5ea37d0b-0823-4d2b-a18c-b9082e551b50/media' --output <MY FILE.wav>
```

#### Bulk downloads

If you want to export a large selection of recordings to be consumed externally you can use the bulk download API.

First you need to create an export, see the [API documentation](https://wazo-platform.org/documentation/console/cdr) for all the available options for the export.

```
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'Wazo-Tenant: <TENANT UUID>' --header 'X-Auth-Token: ACCESS TOKEN' -d '{}' 'https://<WAZO STACK HOSTNAME>/api/call-logd/1.0/cdr/recordings/media/export?from=2021-04-01T00%3A00%3A00-0500&until=2021-05-01T00%3A00%3A00-0500&recurse=false&email=<USERNAME%40DOMAIN>'
```

The result will contain the UUID of you export. You can use that UUID to download the export or query it's progression.

To known the status of you export you can use the following command

```
curl -X GET --header 'Accept: application/json' --header 'X-Auth-Token: <ACCESS TOKEN>' 'https://<WAZO STACK HOSTNAME>/api/call-logd/1.0/exports/<EXPORT UUID>'
```

One the export reaches the status `finished` a mail will be sent to the email address that was in the query string of the POST with the link that
can be used to download the archive.
