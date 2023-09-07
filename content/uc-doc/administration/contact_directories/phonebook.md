---
title: Configuring a phonebook directory
---

The phonebook directory source enables wazo administrators to maintain custom directories of contacts information directly within the wazo platform database.  
Those directories are then available to the users of the stack in the same tenant.


## Creating and initializing phonebooks
The first step to provide a phonebook directory source to users is to create the underlying structure holding the contact information in the database.
Such basic maintenance operations rely on the [`/phonebooks`](/documentation/api/contact.html#tag/phonebook) API.
To [create a new phonebook directory](/documentation/api/contact.html#tag/phonebook/operation/create_phonebook), a http request similar to the following would be made:
```bash
curl -XPOST -H "Wazo-Tenant: $tenant_uuid" -H "X-Auth-Token: $auth_token" -d
{
    "description": "this is a new phonebook",
    "name": "my-phonebook"
}
```

A succesful outcome would result in a response like this:
```
HTTP/1.1 201 OK 
...
{
    "description": "this is a new phonebook",
    "name": "my-phonebook"
    "id": 1,
    "uuid": "6818c114-beed-432c-81dd-16b2998823d4"
}
```

## Updating phonebooks

## Making phonebooks available as directory sources

Once a phonebook has been created and populated with contacts using the aforementionned APIs, the next step for administrators would be to make that phonebook available to wazo platform users by configuring a corresponding directory source, and making that source available to the default profile.

The directory source API enables separation between the administrative APIs of each directory backends from end-user-oriented APIs which wazo platform clients will consume. As such the source API currently allows read-only access to the underlying phonebook.

### Exposing a phonebook source
Use the [dird phonebook source API](/documentation/api/contact.html#tag/configuration/operation/create_phonebook_source) to create a phonebook source in order to expose a phonebook to wazo clients.

```
POST /0.1/backends/phonebook/sources
{
    "name": "my_phonebook",
    "format_columns": {
        "displayname": "{firstname} {lastname}"
    },
    "phonebook_uuid": "00000000-0000-4000-a000-000000000001",
    "searched_columns": [
        "firstname",
        "lastname",
        "number"
    ]
}
```
Here the `phonebook_uuid` refers to an existing phonebook created previously using the aforementioned `/phonebooks` API.

The phonebook contacts can be read directly through the source API by a client([API reference](/api/contact.html#tag/configuration/operation/list_phonebook_source_contacts))

```
GET /0.1/backends/phonebooks/sources/{source_uuid}/contacts?limit=100&offset=0&order=firstname
```

In order for a source to be accessible for lookups, it must be added to a profile.

First, find and get the default profile:
```
GET /0.1/profiles
```
Identify the default profile from the result list(there should normally be one profile), and update that configuration by adding the new source to the list

```
PUT /0.1/profiles/{default_uuid}
{
  "display": {
    "uuid": "{same value}"
  },
  "name": "default",
  "services": {
    "name": {
      "options": {},
      "sources": [
        "string"
      ]
    }
  }
}
```


A client would also want to perform a global lookup of contact information from the sources configured in a profile:
[here](/api/contact.html#tag/directories/operation/lookup_user)
```
GET /0.1/directories/lookup/{profile}/{user_uuid}?search={search query}

```
## See also

- [wazo-dird](/uc-doc/administration/phonebooks/index.md)