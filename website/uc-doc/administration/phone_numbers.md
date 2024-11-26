---
title: Phone Numbers
---

> **New in 24.15.**

A "phone number" resource may be managed through the wazo-confd API under the `/phone-numbers`
endpoint.

This resource is intended to represent and (eventually) centrally manage _phone numbers_, such as
may be dialed through the PSTN, or such as may be found as part of a
[caller ID](/uc-doc/administration/callerid).

Currently, this resource is used allow administrators to provide caller id values for the
[dynamic caller id feature](/uc-doc/administration/callerid#dynamic-caller-id) separately from
incalls or outcalls.

## Creating phone numbers

New phone numbers may be added through a conventional
[POST request to the `/phone-numbers` endpoint](/documentation/api/configuration.html#tag/phone-numbers/operation/create_phone_number):

```shell
# curl -i -H 'X-Auth-Token: <token>' -XPOST https://<stack-url>/api/confd/1.1/phone-numbers -d'
{
    "number": "+18001234567"
}'

HTTP/1.1 201 CREATED
Server: nginx/1.18.0
Date: Thu, 21 Nov 2024 22:45:21 GMT
Content-Type: application/json
Content-Length: 317
Connection: keep-alive
Location: https://localhost/api/confd/1.1/phone-numbers/ae8b8b0d-ae5f-46ae-b739-d5bcc7744cba
Access-Control-Allow-Origin: *
Strict-Transport-Security: max-age=31536000

{
    "uuid": "ae8b8b0d-ae5f-46ae-b739-d5bcc7744cba",
    "tenant_uuid": "54eb71f8-1f4b-4ae4-8730-638062fbe521",
    "number": "+15551234567",
    "caller_id_name": null,
    "main": false,
    "shared": false,
    "links": [
        {
            "rel": "phone_numbers",
            "href": "https://localhost/api/confd/1.1/phone-numbers/ae8b8b0d-ae5f-46ae-b739-d5bcc7744cba"
        }
    ]
}
```

### Bulk creation with phone number ranges

Alternatively, to allow for bulk creation, a contiguous range of phone numbers may be added through
a
[POST request to the `/phone-numbers/ranges` endpoint](/documentation/api/configuration.html#tag/phone-numbers/operation/create_phone_numbers_range):

```shell
# curl -i -H 'X-Auth-Token: <token>' -XPOST https://<stack-url>/api/confd/1.1/phone-numbers/ranges -d '
{
    "start_number": "+18001234560",
    "end_number": "+18001234569"
}'

HTTP/1.1 201 CREATED
Server: nginx/1.18.0
Date: Thu, 21 Nov 2024 22:47:22 GMT
Content-Type: application/json
Content-Length: 1738
Connection: keep-alive
Access-Control-Allow-Origin: *
Strict-Transport-Security: max-age=31536000

{
  "created": [
    {"uuid": "732915ee-0c8e-4764-b85c-166e3d611afc"},
    {"uuid": "7a29179c-eab9-483a-9faf-fa81649ad0d1"},
    {"uuid": "e6546e95-8f12-420a-915d-f1dc8412f5e9"},
    ...
  ],
  "links": [
    {
      "rel": "phone_numbers",
      "href": "https://localhost/api/confd/1.1/phone-numbers/732915ee-0c8e-4764-b85c-166e3d611afc"
    },
    {
      "rel": "phone_numbers",
      "href": "https://localhost/api/confd/1.1/phone-numbers/7a29179c-eab9-483a-9faf-fa81649ad0d1"
    },
    {
      "rel": "phone_numbers",
      "href": "https://localhost/api/confd/1.1/phone-numbers/e6546e95-8f12-420a-915d-f1dc8412f5e9"
    },
    ...
  ],
  "total": 10
}
```

This request creates 10 numbers, starting with `+18001234560` and ending with `+18001234569`. (some
parts of the actual json response ommitted for brevity)

Note that if some numbers already exist matching elements enumerated from that range, they will be
ignored, and only new numbers will be created.

## Updating phone numbers

A phone number may be updated after creation using a conventional
[`PUT` request on the `/phone-numbers/<uuid>` endpoint](/documentation/api/configuration.html#tag/phone-numbers/operation/update_phone_numbers).

```shell
# curl -ki -H 'X-Auth-Token: <token>' -H'Content-Type: application/json' -XPUT https://localhost/api/confd/1.1/phone-numbers/732915ee-0c8e-4764-b85c-166e3d611afc -d'
{
    "number": "+15551234570",
    "caller_id_name": "ACME INC."
}'
HTTP/1.1 204 NO CONTENT
Server: nginx/1.18.0
Date: Thu, 21 Nov 2024 22:52:18 GMT
Content-Type: application/json
Connection: keep-alive
Access-Control-Allow-Origin: *
Strict-Transport-Security: max-age=31536000

```

## Setting a "main" phone number

A single phone number may be set as the "main" phone number for a tenant, representing a "canonical"
phone number for a business.

A phone number flagged as `main` is also automatically flagged as `shared`, implying that this
number is available to all users as a selectable caller id for outgoing calls.

The `main` attribute of a phone number can only be set through a
[`PUT` request to the `/phone-numbers/main` endpoint](/documentation/api/configuration.html#tag/phone-numbers/operation/set_phone_number_main),
ensuring only a single phone number is flagged as `main` per tenant at a time.

```shell
# curl -ki -H 'X-Auth-Token: <token>' -H'Content-Type: application/json' -XPUT https://localhost/api/confd/1.1/phone-numbers/main -d '{"phone_number_uuid": "732915ee-0c8e-4764-b85c-166e3d611afc"}'
HTTP/1.1 204 NO CONTENT
Server: nginx/1.18.0
Date: Thu, 21 Nov 2024 23:11:56 GMT
Content-Type: application/json
Connection: keep-alive
Location: https://localhost/api/confd/1.1/phone-numbers/732915ee-0c8e-4764-b85c-166e3d611afc
Access-Control-Allow-Origin: *
Strict-Transport-Security: max-age=31536000
```

## Deleting phone numbers

Phone numbers may be deleted as any other resource through a
[DELETE request to the `/phone-numbers/<uuid>` endpoint](/documentation/api/configuration.html#tag/phone-numbers/operation/delete_phone_number):

```shell
# curl -H 'X-Auth-Token: <token>' -XDELETE https://<stack-url>/api/confd/1.1/phone-numbers/026dc75a-6699-471c-8b55-0bdc28990a17

HTTP/1.1 204 NO CONTENT
Server: nginx/1.18.0
Date: Thu, 21 Nov 2024 22:49:20 GMT
Content-Type: application/json
Connection: keep-alive
Access-Control-Allow-Origin: *
Strict-Transport-Security: max-age=31536000

```
