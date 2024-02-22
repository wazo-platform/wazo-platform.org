---
title: Configuring a phonebook directory
---

The phonebook directory source enables wazo administrators to maintain custom contact directories
directly within the wazo platform database.  
Those directories are then available to the users of the stack in the same tenant.

## Creating and initializing phonebooks

The first step to providing a phonebook directory source to users is to create the underlying
structure holding the contact information in the database. This is done through the
[`/phonebooks`](/documentation/api/contact.html#tag/phonebook) API. This API can also be used for
other basic administrative operations, such as retrieving or updating the phonebook details, adding
contact entries to the phonebook, and deleting the phonebook.

To
[create a new phonebook directory](/documentation/api/contact.html#tag/phonebook/operation/create_phonebook),
a http request similar to the following would be made:

```bash
curl -XPOST -H "Wazo-Tenant: $tenant_uuid" -H "X-Auth-Token: $auth_token" https://localhost/api/dird/phonebooks -d'\
{\
    "description": "this is a new phonebook",\
    "name": "my-phonebook"\
}'
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

The `uuid` attribute included in the response can then be used for subsequent retrieval, update or
delete operations on that phonebook, as well as for creating a directory source linked to that
phonebook(see [below](#exposing-a-phonebook-source)).

As part of the creation of a new phonebook, a wazo administrator might want to fill the new
phonebook with contact entries. The
[`/phonebooks/<uuid:phonebook_uuid>/contacts`](/documentation/api/contact.html#tag/phonebook/operation/create_phonebook_contact)
and
[`/phonebooks/<uuid:phonebook_uuid>/contacts/import`](/documentation/api/contact.html#tag/phonebook/operation/import_phonebook)
APIs can be used for that purpose. The `/phonebooks/<uuid:phonebook_uuid>/contacts` endpoint enables
the addition of a single contact to the phonebook, while the
`/phonebooks/<uuid:phonebook_uuid>/contacts/import` endpoint can be used to perform a bulk import of
contacts using a CSV listing of contact information.

## Exposing a phonebook source

To make the phonebook available to users through wazo client applications, the
[dird phonebook source API](/documentation/api/contact.html#tag/configuration/operation/create_phonebook_source)
must be used to create a phonebook "source" entity pointing to the actual phonebook created with the
`/phonebooks` API.

A request similar to the following would be made:

```bash
curl -XPOST -H "Wazo-Tenant: $tenant_uuid" -H "X-Auth-Token: $auth_token" https://localhost/api/dird/backends/phonebook/sources -d'\
{
  "first_matched_columns": [
    "number",
    "mobile",
    "extension",
    "number_other"
  ],
  "format_columns": {
    "phone": "{number}",
    "name": "{firstname} {lastname}",
    "phone_mobile": "{mobile}",
    "reverse": "{firstname} {lastname}"
  },
  "name": "My phonebook source",
  "searched_columns": [
    "firstname",
    "lastname",
    "number",
    "mobile",
    "extension",
    "number_other",
    "email"
  ],
  "phonebook_uuid": "6818c114-beed-432c-81dd-16b2998823d4"
}'
```

This creates a phonebook source pointing to a phonebook with uuid
`6818c114-beed-432c-81dd-16b2998823d4`, previously created through the `/phonebooks` API(see
[above](#creating-and-initializing-phonebooks)).

Once such a phonebook source is created for the new phonebook, this source must be exposed to users
through a profile resource. See the
[general documentation for more details on the required API flow](/uc-doc/administration/contact_directories/general.md).

## Updating phonebooks

## Deleting phonebooks

## See also

- [wazo-dird](/uc-doc/administration/phonebooks/index.md)
