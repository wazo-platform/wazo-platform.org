---
title: General
---

Wazo platform provides extensive and extensible support for managing sources of contact
information.  
This support involves both internal implementations of contact directories that wazo-platform users
can automatically benefit from, as well as integrations with common external contact directories
that can serve as sources of information on how to reach people and services both internal and
external to the wazo system.

Given proper configuration within the wazo integration, those integrated directory sources can
provide functionalities such as

- automatic reverse lookups on incoming call numbers
- global search across all configured directories available to a user
- allowing users to use wazo to call registered contact using number available from contact source
- allowing users to keep a list of favorite contacts across all directory sources, which are made
  available for quick access by an appropriate wazo client
- direct search on that specific dirrectory source for matching contact information

## Glossary

- **directory source**: an internal (part of the wazo stack) or external(third-party software
  deployed separately from the wazo platform) provider of contact information, which can be made
  available to wazo users through the wazo-dird component of the wazo platform; alias **directory
  backend**, shorterned form **source** or **backend**
- **contact**: a record of an entity(individual person, organization, service, object) that users
  which to account for in their directories, and which are usually addressable and reachable through
  different methods of communication, including telephony and email. Alias **contact entry**.
- **directory profile**: a configuration object specifying which directory sources are made
  available to a tenant's users, and which functionalities are supported by that source
- **contact attribute**: a named piece of information associated to a contact entry in a directory
  source, such as _name_, _telephoneNumber_, _mobileNumber_, _emailAddress_, etc. Alias **source
  attribute**.
- **caller id**: caller identification information, includes a "caller name" and a "caller number",
  often represented in the format `"Caller Name" <caller number>`, can be carried in an incoming
  call by the calling party and can be overriden/completed by the wazo system using directory
  information(see [**reverse lookup**](#reverse-lookup) section). Alias **caller identification
  information**. See also [Caller ID](/uc-doc/administration/callerid.md).

## Configuring a new directory source

### General configuration steps

Different directory source backends require specific configurations and might require additional
preliminary steps, such as deploying third-party(non-wazo) software, which will not be documented
here.

Given any backend-specific preliminary steps performed, the general steps necessary to setup a
directory source and make it available to wazo users:

1. Make sure any necessary plugin for the directory backend is enabled in the wazo-dird
   configuration
2. Use the source backend API of the backend plugin to create a source entity containing all
   relevant configuration for that backend
3. Update the directory profile of the tenant to include the newly created source, with the relevant
   configuration specifying the supported functionalities of that source for that profile

Following these steps, a wazo user of that tenant should be able to use the newly configured source
for its supported functionalities(depending on the configurations at step 2 and 3).

### Generic source configuration options

All directory source backends require some common configuration options. The value of those options
can vary between directory backends, and the desirable values for those options might depend on the
specifics of a backend to be configured. As such some tweakings specific to each wazo platform
deployment may be required.

- **name**: a name given to that directory source, for purpose of administration. Should be unique
  within a tenant;
- **first_match_columns**: the contact attributes in the directory source that should be used to
  match a search term to a single contact, as for reverse lookups. This usually will include all
  source attributes that may contain a phone number the contact might use to call in a wazo user(see
  [**reverse lookup**](#reverse-lookup));
- **searched_columns**: a list of contact attributes which should be considered when searching all
  contacts matching a given search term. This usually should include any attributes relevant to the
  wazo users and by which the user may attempt to retrieve a contact entry, such as attributes
  referring to a contact's name(including name components) as well as attributes referring to a
  contact's reachable addresses(email, phone numbers);
- **format_columns**: a mapping between contact attributes that should be made available to a wazo
  user, and formatting strings that can refer to the contact attributes available in the directory
  source. This option allows the administrator to transform the contact information available in the
  directory source into a more convenient format to present to the wazo system users. This option is
  also used to affect the result of reverse lookups(see [.#reverse-lookup]).

As a represensative example, the default configuration for the internal wazo directory source looks
like such:

```json
{
    "auth": {
        "host": "localhost",
        "port": 9497,
        "prefix": None,
        "https": False,
        "key_file": "/var/lib/wazo-auth-keys/wazo-dird-wazo-backend-key.yml",
        "version": "0.1",
    },
    "confd": {
        "host": "localhost",
        "port": 9486,
        "prefix": None,
        "https": False,
        "version": "1.1",
    },
    "format_columns": {
        "phone": "{exten}",
        "name": "{firstname} {lastname}",
        "reverse": "{firstname} {lastname}",
    },
    "searched_columns": ["firstname", "lastname", "exten"],
    "first_matched_columns": ["exten", "mobile_phone_number"],
}
```

Ignoring the wazo backend specific options(`"auth"`, `"confd"`), we can see the default values for
the generic options:

```json
...
"format_columns": {
    "phone": "{exten}",
    "name": "{firstname} {lastname}",
    "reverse": "{firstname} {lastname}",
},
...
```

This makes available the `exten` attribute of a wazo source contact as the `phone` field, combines
the `firstname` and `lastname` attributes of the contact into a `name` composite attribute, and
specifies the `reverse` special attribute in order to display the same composite of `firstname` and
`lastname` for the result of a reverse lookup match.

```json
...
"searched_columns": ["firstname", "lastname", "exten"],
...
```

This ensures lookups on the wazo internal source will look at the `firstname`, `lastname` and
`exten` attributes in order to match the user's search term.

```json
...
"first_matched_columns": ["exten", "mobile_phone_number"],
...
```

This ensures a reverse lookup will consider the `exten` and `mobile_phone_number` wazo contact
attributes in order to match an incoming call to an entry in this directory source.

### reverse lookups

The wazo directory subsystem enables better caller number identification through _reverse lookups_
in the configured directory sources. This means that an incoming call which is missing relevant
caller identification information will try to match the caller number to an entry in one of the
directory sources available to the user being called.

For example, if the calling party is a family member of the user, which the user has registered into
their personal directory, and the calling party operator is not providing a relevant caller name in
the caller id information, then a reverse lookup will automatically be triggered, which should
result in the user's personal contact entry being matched by correspondance with the calling party's
number, and the name configured by the user in their personal entry for that contact will be used as
the display name for the caller.

Note that this reverse lookup mechanism does not occur on all calls, but only when the wazo system
sees the incoming caller id as missing a relevant caller name. How this determination is made is
subject to change, but is guided by seeking a balance between providing relevant information to wazo
users, and avoiding wasteful load on system resources from unnecessary and potentially
computationally expensive operations.

Reverse lookups are handled automatically internally by the wazo platform, through the wazo-dird API
endpoint `/directories/reverse/<profile>/<user_uuid>`(where `<profile>` will generally be `default`
and `<user_uuid>` will be the uuid of the user receiving the call).

As mentionned above, two of the general source configuration options are relevant to enable reverse
lookups on a directory source:

- **first_matched_columns** must include all the source contact attributes which may identify a
  phone number which the contact might use to call a wazo user(for example, separate attributes
  specifying the numbers for an office phone line, a home fixed line and a mobile phone); --
  **format_columns** must include a `reverse` member attribute which specifies a format string which
  will be used to provide a value for the display name of a matched contact entry(for example,
  allowing to combine `firstname` and `lastname` attributes from the source contact entry into a
  composite name).

If the `reverse` attribute remains unspecified in the `format_columns` of a source, the reverse
lookup may succeed in matching a contact, but the match will not be used to provide relevant caller
identification for the incoming call, since the information on how to express that identification
information is missing. if the `first_matched_columns` is missing an attribute which may specify a
phone number by which the contact might be calling the wazo user, a reverse lookup may fail to match
the incoming call to the proper contact entry in that source.

[caller id normalisation](/uc-doc/installation/postinstall#callerid-num-normalization) is also part
of the formula to successfully benefit from reverse lookups.

Through a configuration file made available at `/etc/xivo/asterisk/xivo_in_callerid.conf`, one can
specify rules by which incoming call numbers will be matched and transformed into a format that fits
how contact phone numbers are expressed in the directories.

Without proper configuration at this level, an incoming call from a known contact of a user might
fail to match the corresponding entry from the user's directories simply because the phone number of
the incoming call is not expressed in the same format as the one registered in the contact directory
entry.

For example, for a wazo deployment located in France and serving french users, an incoming call
might expose the caller number using the international format, e.g. "+33911223344". However a french
user might intuitively want to register this contact using the conventional national format "09 11
22 33 44". To handle this discrepancy, an `in_callerid` normalisation rule might transform all
incoming call numbers matching the international french number pattern(`(+33)\d{9}`) into the
conventional national format by stripping the international prefix(`+33`) and adding a `0` prefix.

Note that this currently allows a single normalised form of a class of phone numbers to be used to
register contact numbers in all directories of a wazo stack.

See also [Caller ID](/uc-doc/administration/callerid) for more information relative to caller id
handling in the wazo platform.
