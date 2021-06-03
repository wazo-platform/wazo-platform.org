---
title: Call Recording
---

Call recording allows the user or the administrator to record a user's conversation. Recorded files
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

To disable call recording for a user (default: `*26`):

- Find `extension_id` with `GET /extensions/features?feature=callrecord`
- Disabled with `PUT /extensions/features/{extenion_id} {"enabled": false}`

To disable online call recording (default: `*3`):

- With `PUT /users/{user_uuid} {"online_call_record_enabled": false}`

### Files

Recordings are located in `/var/lib/wazo/sounds/tenants/<tenant_uuid>/monitor`

**Warning**: Since 21.02, renaming or removing a file in this repository will break CDR recordings
API

Recording can be retrieved using the call-logd API. You can download recordings individually for a
given call or download many recordings at the same time.

#### Downloading a single recording

Downloading a single recording can be done using the following resource.

`https://<WAZO STACK HOSTNAME>/api/call-logd/1.0/cdr/<CDR ID>/recordings/<RECORDING UUID>/media`

The CDR ID and recording UUID can be retrieved from the `/cdr` resource.

Here's an example of the response of a `GET` on `/cdr`

```json
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
      "requested_extension": "1011",
      "requested_internal_context": "inside",
      "requested_internal_extension": "1011",
      "source_extension": "1015",
      "source_internal_context": "inside",
      "source_internal_extension": "1015",
      "source_line_id": 52,
      "source_name": "Olga Romanov",
      "source_user_uuid": "b2e98781-7118-4010-8da3-b93b1b7e1389",
      "tags": ["olga"],
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

All of the call's information can be viewed, including the ID of the CDR, `2060` here, and the UUID
of the recording, `5ea37d0b-0823-4d2b-a18c-b9082e551b50`. There can be multiple recordings on a
single call depending on the call and the configuration.

The curl command to download this recording would be the following.

```bash
curl -X GET --header 'Accept: audio/wav' --header 'X-Auth-Token: <ACCESS TOKEN>' 'https://<WAZO STACK HOSTNAME>/api/call-logd/1.0/cdr/2060/recordings/5ea37d0b-0823-4d2b-a18c-b9082e551b50/media' --output <MY FILE.wav>
```

#### Bulk downloads

If you want to export a large selection of recordings to be consumed externally, you can use the
bulk download API.

First you need to create an export, see the
[API documentation](https://wazo-platform.org/documentation/console/cdr) for all the available
options for the export.

```bash
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'Wazo-Tenant: <TENANT UUID>' --header 'X-Auth-Token: ACCESS TOKEN' -d '{}' 'https://<WAZO STACK HOSTNAME>/api/call-logd/1.0/cdr/recordings/media/export?from=2021-04-01T00%3A00%3A00-0500&until=2021-05-01T00%3A00%3A00-0500&recurse=false&email=<USERNAME%40DOMAIN>'
```

The result will contain the UUID of your export. You can use that UUID to download the export or
query its progression.

To known the status of you export you can use the following command

```bash
curl -X GET --header 'Accept: application/json' --header 'X-Auth-Token: <ACCESS TOKEN>' 'https://<WAZO STACK HOSTNAME>/api/call-logd/1.0/exports/<EXPORT UUID>'
```

One the export reaches the status `finished`, mail will be sent to the email address that was in the
query string of the POST with the link that can be used to download the archive.

#### Automating an Export

Let's say you want to get your recordings exported every week. Here's how you would do it.

1.  Create a user with the appropriate permissions to launch the export.

    ```bash
    export USER_UUID=$(wazo-auth-cli user create --password <password> <username>)
    export POLICY_UUID=$(wazo-auth-cli policy create --acl call-logd.cdr.recordings.media.export.create auth.tenants.read -- recording_exporter)
    wazo-auth-cli user add --policy ${POLICY_UUID} ${USER_UUID}
    ```

2.  Create a refresh token that will be copied in the script

    ```bash
    wazo-auth-cli -vvv token create --access_type offline --client_id exporter --auth-username <username> --auth-password <password> 2>&1 | grep "'refresh_token'" | sed "s/'/\"/g" | jq .refresh_token
    ```

    The output of this command is your refresh token. Save it for the script.

3.  Copy the script on you stack

    You will need to copy the refresh token you created previously into the `REFRESH_TOKEN` variable
    and add the tenants to export as well as the email address where the export should be sent.

    ```python
    #!/usr/bin/env python3

    from datetime import datetime, timedelta
    from wazo_auth_client import Client as AuthClient
    from wazo_call_logd_client import Client as CallLogdClient

    ### Configuration start ###
    REFRESH_TOKEN="<REFRESH_TOKEN>"
    TENANTS = {
        "<tenant UUID>": "<administrator@this.tenant>",
    }
    ### Configuration end ###

    auth = AuthClient(host='localhost', https=False, prefix=None, port=9497)
    token = auth.token.new(
        backend='wazo_user',
        expiration=60,
        access_type='online',
        client_id='exporter',
        refresh_token=REFRESH_TOKEN,
    )['token']

    now = datetime.now()
    start = now - timedelta(days=now.weekday() + 7)  # Monday of the previous week
    end = start + timedelta(days=7) # Last Monday (or today)
    from_ = datetime(start.year, start.month, start.day, 0, 0, 0).isoformat()
    to = datetime(end.year, end.month, end.day, 0, 0, 0).isoformat()

    call_logd = CallLogdClient(host='localhost', https=False, prefix=None, port=9298, token=token)
    for tenant_uuid, email in TENANTS.items():
        call_logd.cdr.export_recording_media(tenant_uuid=tenant_uuid, email=email, from_=from_, to=to)

    auth.token.revoke(token)
    ```

    You can copy this script to `/usr/local/bin/recording_export.py` and make it executable.

    ```bash
    chmod +x /usr/local/bin/recording_export.py
    ```

4.  Create a cron job to execute the script weekly

    The following example will execute the cron each Monday at 1:22

    ```
    22 1 * * 1 /usr/local/bin/recording_export.py
    ```
