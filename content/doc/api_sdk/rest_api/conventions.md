---
title: REST API Conventions
---

-   [Authentication](#rest-api-authentication)
-   [HTTP status codes](#http-status-codes)
-   [General URL parameters](#general-url-parameters)
    -   [Parameters](#parameters)
-   [Data representation](#data-representation)
    -   [Data retrieved from the REST
        server](#data-retrieved-from-the-rest-server)
        -   [Getting object lists](#getting-object-lists)
        -   [Getting An Object](#getting-an-object)
    -   [Data sent to the REST server](#data-sent-to-the-rest-server)
    -   [Errors](#rest_api_errors)

Authentication {#rest-api-authentication}
==============

For all REST APIs, the main way to authenticate is to use an access
token obtained from `wazo-auth`{.interpreted-text role="ref"}. This
token should be given in the `X-Auth-Token` header in your request. For
example:

    curl <options...> -H 'X-Auth-Token: 17496bfa-4653-9d9d-92aa-17def0fa9826' https://<wazo_address>:9486/1.1/users

Also, your token needs to have the right ACLs to give you access to the
resource you want. See `rest-api-acl`{.interpreted-text role="ref"}.

::: {.toctree maxdepth="1"}
acl
:::

See also `service-authentication`{.interpreted-text role="ref"} for
details about the token-based authentication process.

HTTP status codes
=================

Standard HTTP status codes are used. For the full definition see [IANA
definition](http://www.iana.org/assignments/http-status-codes/http-status-codes.xml).

-   200: Success
-   201: Created
-   400: Incorrect syntax
-   404: Resource not found
-   406: Not acceptable
-   412: Precondition failed
-   415: Unsupported media type
-   500: Internal server error

See also `rest_api_errors`{.interpreted-text role="ref"} for general
explanations about error codes.

General URL parameters
======================

Example usage of general parameters:

    GET http://<wazo_address>:9486/1.1/voicemails?limit=X&offset=Y

Parameters
----------

order

:   Sort the list using a column (e.g. \"number\"). See specific
    resource documentation for columns allowed.

direction

:   \'asc\' or \'desc\'. Sort list in ascending (asc) or descending
    (desc) order

limit

:   total number of resources to show in the list. Must be a positive
    integer

offset

:   number of resources to skip over before starting the list. Must be a
    positive integer

search

:   Search resources. Only resources with a field containing the search
    term will be listed.

Data representation
===================

Data retrieved from the REST server
-----------------------------------

JSON is used to encode returned or sent data. Therefore, the following
headers are needed:

-   

    when the request is supposed to return JSON:

    :   Accept = application/json

-   

    when the request\'s body contains JSON:

    :   Content-Type = application/json

::: {.note}
::: {.admonition-title}
Note
:::

Optional properties can be added without changing the protocol version
in the main list or in the object list itself. Properties will not be
removed, type and name will not be modified.
:::

### Getting object lists

`GET /1.1/objects`

When returning lists the format is as follows:

:   -   total - number of items in total in the system configuration
        (optional)
    -   items - returned data as an array of object properties list.

Other optional properties can be added later.

`Response data format`

``` {.sourceCode .javascript}
{
    "total": 2,

    "items":
    [
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

### Getting An Object

Format returned is a list of properties. The object should always have
the same attributes set, the default value being the equivalent to NULL
in the content-type format.

`GET /1.1/objects/<id>`

`Response data format`

``` {.sourceCode .javascript}
{
   "id": "1",
   "prop1": "test"
}
```

Data sent to the REST server
----------------------------

The Wazo REST server implements POST and PUT methods for item creation
and update respectively. Data is created using the POST method via a
root URL and is updated using the PUT method via a root URL suffixed by
/\<id. The server expects to receive JSON encoded data. Only one item
can be processed per request. The data format and required data fields
are illustrated in the following example:

`Request data format`

``` {.sourceCode .javascript}
{
   "id": "1",
   "prop1": "test"
}
```

When updating, only the id and updated properties are needed, omitted
properties are not updated. Some properties can also be optional when
creating an object.

Errors {#rest_api_errors}
------

A request to the web services may return an error. An error will always
be associated to an HTTP error code, and eventually to one or more error
messages. The following errors are common to all web services:

  -------------------------------------------------------------------------
  Error   Error     Description
  code    message   
  ------- --------- -------------------------------------------------------
  406     empty     Accept header missing or contains an unsupported
                    content type

  415     empty     Content-Type header missing or contains an unsupported
                    content type

  500     list of   An error occured on the server side; the content of the
          errors    message depends of the type of errors which occured
  -------------------------------------------------------------------------

The 400, 404 and 412 errors depend on the web service you are
requesting. They are separately described for each of them.

The error messages are contained in a JSON list, even if there is only
one error message:

``` {.sourceCode .javascript}
[ message_1, message_2, ... ]
```
