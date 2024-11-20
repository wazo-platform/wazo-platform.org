---
title: Configuring a phonebook directory
---

The phonebook directory source enables wazo administrators to maintain custom contact directories
directly within the wazo platform database. Those directories can then be made available to the wazo
platform users in the same tenant of the stack.

Phonebooks are managed by the wazo-dird component

## Provisioning a new phonebook

Provisioning new phonebook directories follows the general process of any directory source. Since
the underlying entity storing the contacts is also managed by wazo, and not an external entity,
additional APIs and maintenance workflows must be considered.

As a summary, provisioning a new phonebook directory would follow these general steps:

1. [Creating the phonebook entity](#creating-and-initializing-phonebooks)
2. Filling the new phonebook with contact entries()
3. Creating a phonebook _source_ entity pointing to the underlying phonebook created at step 1
4. Updating the directory profile with the new phonebook source

Steps 3 and 4 should follow
[the general guidelines provided in the general section](/uc-doc/administration/contact_directories#configuring-a-new-directory-source),
similarly to any contact directory source.

### Creating phonebooks

The first step to providing a phonebook directory source to users is to create the underlying
structure holding the contact information in the database. This is done through the
[`/phonebooks`](/documentation/api/contact.html#tag/phonebook) API. This API can also be used for
other administrative operations, such as retrieving or updating the phonebook details, adding,
updating or removing contact entries from the phonebook, and deleting the phonebook entirely. As an
administrative API, the ACL permissions for this API should only be provided to administrative
users.

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

A succesful outcome would result in a response similar to this:

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

### Initializing phonebooks with contacts

As part of the creation of a new phonebook, wazo administrators might want to fill the new phonebook
with contact entries. The
[`/phonebooks/<uuid:phonebook_uuid>/contacts`](/documentation/api/contact.html#tag/phonebook/operation/create_phonebook_contact)
endpoint enables creating a single contact using a `POST` request, while the
[`/phonebooks/<uuid:phonebook_uuid>/contacts/import`](/documentation/api/contact.html#tag/phonebook/operation/import_phonebook)
endpoint can be used to perform a bulk import of contacts using a `POST` request containing a CSV
listing of contact information, where each line will correspond to a new contact.

Phonebook contact entries can have any desirable attribute, as long as they are string values. The
`id` attribute is reserved and will be generated as a uuid value, which can be used to subsequently
retrieve, edit or delete the contact entry.

### Managing contacts

Once created, phonebook contacts can also be retrieved, edited and deleted using the
`/phonebooks/<uuid:phonebook_uuid>/contacts` family of endpoints.

- [`GET /phonebooks/<uuid:phonebook_uuid>/contacts`](/documentation/api/contact.html#tag/phonebook/paths/~1phonebooks~1%7Bphonebook_uuid%7D~1contacts/get)
  can list all contacts inside a phonebook
- [`GET /phonebooks/<uuid:phonebook_uuid>/contacts/<uuid:contact_id>`](https://wazo-platform.org/documentation/api/contact.html#tag/phonebook/paths/~1phonebooks~1%7Bphonebook_uuid%7D~1contacts~1%7Bcontact_id%7D/get)
  can retrieve a single contact
- [`PUT /phonebooks/<uuid:phonebook_uuid>/contacts/<uuid:contact_id>`](/documentation/api/contact.html#tag/phonebook/paths/~1phonebooks~1%7Bphonebook_uuid%7D~1contacts/get)
  can modify a single contact
- [`DELETE /phonebooks/<uuid:phonebook_uuid>/contacts/<uuid:contact_id>`](/documentation/api/contact.html#tag/phonebook/paths/~1phonebooks~1%7Bphonebook_uuid%7D~1contacts~1%7Bcontact_id%7D/delete)
  can delete a single contact

Client applications(users) will use a
[different API to retrieve contacts](#retrieving-contacts-from-a-client-application).

### Exposing a phonebook source

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
HTTP/1.1 201 Created
...
```

This creates a phonebook source pointing to a phonebook with uuid
`6818c114-beed-432c-81dd-16b2998823d4`, previously created through the `/phonebooks` API (see
[above](#creating-and-initializing-phonebooks)). This phonebook example is expected to contain
contacts with fields "number", "mobile", "extension", "number_other", "firstname", "lastname" and
"email". The actual fields of the contacts depends only what is provided when
[creating or importing contacts](#initializing-phonebooks-with-contacts).

See [general documentation](/uc-doc/administration/contact_directories) for more details on the
meaning of the fields.

Once such a phonebook source entity is created for the new phonebook, this source must be exposed to
users through a profile resource. See the
[general documentation for more details on the required API flow](/uc-doc/administration/contact_directories).

## Maintaining phonebooks

### Updating phonebooks

Phonebooks details can be modified using the `/phonebooks` API. Phonebook sources configuration can
be modified using the `/phonebooks/sources` API (see [above](#exposing-a-phonebook-source) and
[general documentation on source configuration](/uc-doc/administration/contact_directories)).

```bash
curl -i -XPUT -H "Wazo-Tenant: $tenant_uuid" -H "X-Auth-Token: $auth_token" https://localhost/api/dird/backends/phonebook/sources/6818c114-beed-432c-81dd-16b2998823d4 -d'\
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
HTTP/1.1 200 OK
...
```

### Deleting phonebooks

Phonebooks can be deleted using the `/phonebooks` API.

```bash
curl -i -XDELETE -H "Wazo-Tenant: $tenant_uuid" -H "X-Auth-Token: $auth_token" https://localhost/api/phonebooks/6818c114-beed-432c-81dd-16b2998823d4
HTTP/1.1 204 NO CONTENT
...
```

This will also delete any associated phonebook source entity pointing to that phonebook (through the
`phonebook_uuid` attribute).

Alternatively, a phonebook source entity can be deleted directly without deleting the underlying
phonebook and its contacts, using the `/phonebooks/sources` API.

```bash
$ curl -i -XDELETE -H "Wazo-Tenant: $tenant_uuid" -H "X-Auth-Token: $auth_token" https://localhost/api/dird/backends/phonebook/sources/6818c114-beed-432c-81dd-16b2998823d4
HTTP/1.1 204 NO CONTENT
...
```

A phonebook _source_ cannot exist without an underlying phonebook to point to, while a phonebook
(and its contacts) can exist without any phonebook _source_ pointing to it (though it would not be
accessible by end users through end user APIs described
[below](#retrieving-contacts-from-a-client-application)).

## Using a phonebook

### Retrieving contacts from a client application

Once a phonebook is properly provisioned and filled with contacts, client applications can now use
the appropriate API to retrieve those contacts from the phonebook source. This relies on the
phonebook source API, specifically a `GET` request on the
`/backends/phonebook/sources/<uuid:source_uuid>/contacts` endpoint.

A client application would first need to identify the relevant `source_uuid`, by querying the
`/directories/<profile name>/sources` endpoint using a `GET` request, which would yield the list of
directory sources exposed through the profile. Using the conventional `default` profile, such an
operation would look like

```bash
curl -H "Wazo-Tenant: $tenant_uuid" -H "X-Auth-Token: $auth_token" https://my-stack-host/api/dird/0.1/directories/default/sources
```

and would normally result in a json response similar to the following:

```
{
  "total": 7,
  "filtered": 7,
  "items": [
    ...
    {
      "backend": "phonebook",
      "name": "my phonebook",
      "tenant_uuid": "54eb71f8-1f4b-4ae4-8730-638062fbe521",
      "uuid": "3e9e087c-8956-44a5-a532-64bef499c39c"
    }
  ]
}
```

Using the uuid of the relevant phonebook souce, here `3e9e087c-8956-44a5-a532-64bef499c39c`,
fetching the contacts of that souce would look like

```bash
curl -H "Wazo-Tenant: $tenant_uuid" -H "X-Auth-Token: $auth_token" https://my-stack-host/api/dird/0.1/backends/phonebook/sources/3e9e087c-8956-44a5-a532-64bef499c39c/contacts
```

yielding such a response:

```json
{
  "filtered": 1,
  "items": [
    {
      "firstname": "User",
      "lastname": "McExample",
      "email": "user.mcexample@example.com",
      "phone": "9999999999",
      "mobile_phone": "9991111111",
      "fax": "9191919191",
      "phonebook_uuid": "291e442f-1251-4eab-b795-e2c0725e4ef3",
      "id": "884a0f07-2c64-4367-9dae-d98f007e3f3e"
    }
  ],
  "total": 1
}
```

### See also

- [General contact directory documentation](/uc-doc/administration/contact_directories)
- [Phonebook administration API reference](/documentation/api/contact.html#tag/phonebook)
- [Phonebook source API reference](/documentation/api/contact.html#tag/configuration/operation/create_phonebook_source)
