---
title: Call Recording
---

Call recording enables users or administrators to record conversations. The recorded files are
stored on the Wazo server and can be accessed using the CDR API.

There are two methods to record a call:

### On-Demand Call Recording

On-demand call recording occurs when a user initiates the recording during an ongoing call. This can
be done either via the API or by using the `*3` feature code during the call.

### Automatic Call Recording

Automatic call recording is triggered by predefined configurations. This typically happens before
the call is established, based on the configuration of the call's destination or source.

## Enabling Call Recording

Call recording can be enabled in several ways, either by the administrator or the user.

### Administrator

An administrator can enable call recording using the following API call:

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

Users can enable or disable call recording using the `*26` extension on their phone. Additionally,
users can start recording during a call by using the `*3` extension.

## Managing Call Recording Options

### Extensions

The extensions for call recording and online call recording can be retrieved using the following
resource:

- `GET /extensions/features?feature=callrecord`

### User Call Recording Management

To enable or disable call recording for a user (default: `*26`):

1. Find the `extension_id` using `GET /extensions/features?feature=callrecord`.
2. Disable or enable it with `PUT /extensions/features/{extension_id} {"enabled": <true|false>}`.

To enable or disable on-demand call recording (default: `*3`):

- Use `PUT /users/{user_uuid} {"online_call_record_enabled": <true|false>}`.

### Group Call Recording Management

To enable or disable on-demand call recording for a group (default: `*3`):

- Use `PUT /groups/{group_uuid} {"dtmf_record_toggle": <true|false>}`.

This setting controls whether callees in a call group can use on-demand call recording. The caller's
ability to use on-demand call recording depends on their individual configuration.

The group configuration overrides the user configuration for the callee.

### Queue Call Recording Management

To enable or disable on-demand call recording for a queue (default: `*3`):

- Use `PUT /queues/{queue_uuid} {"dtmf_record_toggle": <true|false>}`.

This setting determines whether callees in a queue can use on-demand call recording. The caller's
ability to use on-demand call recording depends on their individual configuration.

The queue configuration overrides the user configuration for the callee.

### Recording Files

Recordings are stored in `/var/lib/wazo/sounds/tenants/<tenant_uuid>/monitor`.

**Warning**: Starting from version 21.02, renaming or deleting files in this directory will break
the CDR recordings API.

Recordings can be retrieved using the call-logd API. You can download individual recordings for a
specific call or download multiple recordings simultaneously.

If a recording is paused and then resumed, only one file will be generated and added to the CDR. If
multiple recordings are needed for a single call, the user must use the `stop` and `start` API.

- `PUT https://<WAZO STACK HOSTNAME>/api/calld/user/me/calls/{call_id}/record/start`
- `PUT https://<WAZO STACK HOSTNAME>/api/calld/user/me/calls/{call_id}/record/stop`

#### Downloading a Single Recording

To download a single recording, use the following resource:

`https://<WAZO STACK HOSTNAME>/api/call-logd/1.0/cdr/<CDR ID>/recordings/<RECORDING UUID>/media`

The CDR ID and recording UUID can be retrieved from the `/cdr` resource.

Here’s an example response from a `GET` request to `/cdr`:

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

All call details are visible, including the CDR ID (`2060` in this example) and the recording UUID
(`5ea37d0b-0823-4d2b-a18c-b9082e551b50`). A single call may have multiple recordings depending on
the call and configuration.

To download this recording, use the following `curl` command:

```bash
curl --insecure -X GET --header 'Accept: audio/wav' --header 'X-Auth-Token: <ACCESS TOKEN>' 'https://<WAZO STACK HOSTNAME>/api/call-logd/1.0/cdr/2060/recordings/5ea37d0b-0823-4d2b-a18c-b9082e551b50/media' --output <MY FILE.wav>
```

#### Bulk Downloads

To export a large number of recordings for external use, you can use the bulk download API.

First, create an export. Refer to the
[API documentation](https://wazo-platform.org/documentation/console/cdr) for all available export
options.

```bash
curl --insecure -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'Wazo-Tenant: <TENANT UUID>' --header 'X-Auth-Token: ACCESS TOKEN' -d '{}' 'https://<WAZO STACK HOSTNAME>/api/call-logd/1.0/cdr/recordings/media/export?from=2021-04-01T00%3A00%3A00-0500&until=2021-05-01T00%3A00%3A00-0500&recurse=false&email=<USERNAME%40DOMAIN>'
```

The response will include the UUID of your export. Use this UUID to download the export or check its
status.

To check the status of your export, use:

```bash
curl --insecure -X GET --header 'Accept: application/json' --header 'X-Auth-Token: <ACCESS TOKEN>' 'https://<WAZO STACK HOSTNAME>/api/call-logd/1.0/exports/<EXPORT UUID>'
```

Once the export status is `finished`, an email will be sent to the address provided in the query
string of the POST request, containing a link to download the archive.

#### Automating Exports

To automate weekly exports of your recordings, follow these steps:

1. **Create a user with the necessary permissions to launch the export:**

   ```bash
   export USER_UUID=$(wazo-auth-cli user create --password <password> <username>)
   export POLICY_UUID=$(wazo-auth-cli policy create --acl call-logd.cdr.recordings.media.export.create auth.tenants.read -- recording_exporter)
   wazo-auth-cli user add --policy ${POLICY_UUID} ${USER_UUID}
   ```

2. **Create a refresh token for the script:**

   ```bash
   wazo-auth-cli -v token create --access_type offline --client_id exporter --auth-username <username> --auth-password <password> 2>&1 | tr ',' '\n' | sed 's/}//g' | grep 'refresh_token' | awk -F': ' '{ print $NF }'
   ```

   Save the refresh token output for the script.

3. **Copy the script to your stack:**

   Replace the `REFRESH_TOKEN` variable with the token you created earlier. Add the tenants to
   export and the email address where the export should be sent.

   ```python
   #!/usr/bin/env python3

   from datetime import datetime, timedelta
   from wazo_auth_client import Client as AuthClient
   from wazo_call_logd_client import Client as CallLogdClient

   ### Configuration start ###
   REFRESH_TOKEN = "<REFRESH_TOKEN>"
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
   start = now - timedelta(days=now.weekday() + 7)   # Monday of the previous week
   end = start + timedelta(days=7)  # Last Monday (or today)
   from_ = datetime(start.year, start.month, start.day, 0, 0, 0).isoformat()
   to = datetime(end.year, end.month, end.day, 0, 0, 0).isoformat()

   call_logd = CallLogdClient(host='localhost', https=False, prefix=None, port=9298, token=token)
   for tenant_uuid, email in TENANTS.items():
       call_logd.cdr.export_recording_media(tenant_uuid=tenant_uuid, email=email, from_=from_, to=to)

   auth.token.revoke(token)
   ```

   Save this script to `/usr/local/bin/recording_export.py` and make it executable:

   ```bash
   chmod +x /usr/local/bin/recording_export.py
   ```

4. **Create a cron job to run the script weekly:**

   The following example runs the script every Monday at 1:22 AM:

   ```
   22 1 * * 1 /usr/local/bin/recording_export.py
   ```
