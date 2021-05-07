---
title: REST API Conventions
---

## Authentication {#rest-api-authentication}

For all REST APIs, the main way to authenticate is to use an access token obtained from
[wazo-auth](/uc-doc/system/configuration_files#wazo-auth). This token should be given in the
`X-Auth-Token` header in your request. For example:

```shell
curl <options...> -H 'X-Auth-Token: 17496bfa-4653-9d9d-92aa-17def0fa9826' https://<wazo_address>/api/confd/1.1/users
```

Also, your token needs to have the right ACL to give you access to the resource you want. See
[REST API ACL](/uc-doc/api_sdk/rest_api/acl).

See also [service-authentication](/uc-doc/system/service_authentication) for details about the
token-based authentication process.

## HTTP status codes

Standard HTTP status codes are used. For the full definition see
[IANA definition](http://www.iana.org/assignments/http-status-codes/http-status-codes.xml).

- 200: Success
- 201: Created
- 400: Incorrect syntax
- 404: Resource not found
- 406: Not acceptable
- 412: Precondition failed
- 415: Unsupported media type
- 500: Internal server error

See also [Errors](/uc-doc/api_sdk/rest_api/conventions#rest-api-errors) for general explanations
about error codes.

## General URL parameters

Example usage of general parameters:

```
GET http://<wazo_address>/api/confd/1.1/voicemails?limit=X&offset=Y
```

### Parameters

- `order`: Sort the list using a column. See specific resource documentation for columns allowed.
- `direction`: Sort list in ascending (`asc`) or descending (`desc`) order.
- `limit`: Total number of resources to show in the list. Must be a positive integer.
- `offset`: Number of resources to skip over before starting the list. Must be a positive integer.
- `search`: Search resources. Only resources with a field containing the search term will be listed.

## Data representation

### Data retrieved from the REST server

JSON is used to encode returned or sent data. Therefore, the following headers are needed:

- when the request is supposed to return JSON: `Accept = application/json`
- when the request's body contains JSON: `Content-Type = application/json`

**Note**: Optional properties can be added without changing the protocol version in the main list or
in the object list itself. Properties will not be removed, type and name will not be modified.

#### Getting object lists

`GET /1.1/objects`

When returning lists the format is as follows:

- `total`: number of items in total in the system configuration (optional)
- `items`: returned data as an array of object properties list.

Other optional properties can be added later.

`Response data format`

```json
{
  "total": 2,
  "items": [
    {
      "id": "1",
      "prop1": "test"
    },
    {
      "id": "2",
      "prop1": "ssd"
    }
  ]
}
```

#### Getting An Object

Format returned is a list of properties. The object should always have the same attributes set, the
default value being the equivalent to NULL in the content-type format.

`GET /1.1/objects/<id>`

`Response data format`

```json
{
  "id": "1",
  "prop1": "test"
}
```

### Data sent to the REST server

The Wazo REST server implements POST and PUT methods for item creation and update respectively. Data
is created using the POST method via a root URL and is updated using the PUT method via a root URL
suffixed by `/\<id>`. The server expects to receive JSON encoded data. Only one item can be
processed per request. The data format and required data fields are illustrated in the following
example:

`Request data format`

```json
{
  "id": "1",
  "prop1": "test"
}
```

When updating, only the id and updated properties are needed, omitted properties are not updated.
Some properties can also be optional when creating an object.

### Errors {#rest-api-errors}

A request to the web services may return an error. An error will always be associated to an HTTP
error code, and eventually to one or more error messages. The following errors are common to all web
services:

| Error code | Error message   | Description                                                                                                         |
| ---------- | --------------- | ------------------------------------------------------------------------------------------------------------------- |
| 406        | empty           | Accept header missing or contains an unsupported content type                                                       |
| 415        | empty           | Content-Type header missing or contains an unsupported content type                                                 |
| 500        | list of ierrors | An error occured on the server side; the content of the errors message depends of the type of errors which occurred |

The 400, 404 and 412 errors depend on the web service you are requesting. They are separately
described for each of them.

#### wazo-confd errors

The error messages are contained in a JSON list, even if there is only one error message:

```json
[ message_1, message_2, ... ]
```
