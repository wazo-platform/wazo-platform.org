# REST API guidelines

## Rationale

When writing new REST APIs, there are multiple ways to achieve the same feature.

The basic can be found here: https://restfulapi.net/

In additional of the following guidelines

## What is in GET /status?

Each component in a daemon must be able to add values inside the body of `/status`.

### Example body

```Javascript
{
  "ari": {
    "status": "ok"
  },
  "bus_consumer": {
    "status": "ok"
  },
  "service_token": {
    "status": "ok"
  },
  "plugins": {
    "voicemails": {
      "cache_items": 12,
      "status": "ok"
    },
    "bad_plugin": {
      "status": "fail"
    }
  }
}
```

### Conventions

* Each key MAY have a `status` subkey. Each value associated to the `status` subkey MUST contain a string. Conventional values for this string are `ok` and `fail`. Other values are acceptable too, depending on the status being reported.

* If the key does not have a `status` value, the status SHOULD be considered `ok`.

* Key names must use `_` (underscore) as word separators.

## REST API status codes

Invalid token = 401
Invalid tenant for the token = 401
Insufficient ACL = 403

## Errors in REST API

### Rationale

Errors should be as informative as possible when presented to the user. Hence, the REST API must give as much information as possible, and this information must be structured. A simple error message is not enough: it can't be translated easily, it does tell a GUI what field caused the error, etc.

### Error structure

When an error occurs during a HTTP request on a REST API, the error returned must be in JSON format, with the following structure:

```Javascript
{
    "error_id": "not-found",  # this field serves as a "sub-status-code", e.g. to distinguish between two different 400 status codes that don't have the same cause
    "message": "No such user ID: 'abcdefg-1234'",  # this should be human-readable
    "resource": "user",  # this helps abstracting the client-side logic, giving back the context of the request
    "resource_id": "abcdefg-1234",  # idem. This field is optional. The value may be a dictionary.
    "timestamp": 1500908147.0837858,  # the timestamp when the error occured
    "details": {
        # as many details as we want about this error, usually what field is invalid and why
    }
}
```

### Error details structure for invalid request

When returning a 400 status code, the error details should have this structure:

```Javascript
{
    ...
    "details": {
        "field1": {
            "constraint_id": "regex",
            "constraint": "[a-z]+",
            "message": "field1 must be lowercase alphabetic"
        },
        "field2": {
            ...
        }
    }
}
```

In case of a nested request, the details should be nested as well. Example:

Request:
```Javascript
{
    "config": {
        "url": "invalid"
    }
}
```

Response:
```Javascript
    "error_id": "invalid-data",
    "message": "Invalid request",
    "resource": "subscription",
    "resource_id": "abcdefg-1234",
    "timestamp": 1500908147.0837858,
    "details": {
        "config": {
            "url": {
                "constraing_id": "url",
                "constraint": {
                    "schemes": ["http", "https"]
                },
                "message": "Invalid URL"
            }
        }
    }
```

## Pagination and collection in REST API

### Parameters

* `direction`: Sort list of items in 'asc' (ascending) or 'desc' (descending) order.
* `limit`: Maximum number of items to return in the list.
* `offset`: Number of items to skip over in the list.
* `order`: Name of the field to use for sorting the list of items returned.
* `recurse`: Should the query include sub-tenants.
* `search`: Search term for filtering a list of items. Only items with a field containing the search term will be returned.

### Collection result

* `items`: Result of objects filtered
* `filtered`: Number of object filtered by the filtering keys except from `limit` and `offset`
* `total`: Number total of objects without filters

```Javascript
{
    ...
    "items": [
        {
            "uuid": "00000000-0000-0000-0000-aaaaaaaaaaaa",
            "name": "My object"
        },
        {
            "uuid": "00000000-0000-0000-0000-bbbbbbbbbbbb",
            "name": "Other object"
        }
     ],
     "filtered": 2,
     "total": 4
    }
}
```
## OpenAPI convention in Rest API

### Endpoints parameters order

1. All type `HEADER`
2. All type `PATH`
3. All type `BODY`
