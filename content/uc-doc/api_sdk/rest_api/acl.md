---
title: REST API Permissions
---

-   [Syntax](#syntax)
    -   [Substitutions](#substitutions)
    -   [Example](#example)
-   [Available ACLs](#available-acls)

The tokens delivered by `wazo-auth`{.interpreted-text role="ref"} have a
list of permissions associated (ACL), that determine which REST
resources are authorized for this token. Each REST resource has an
associated required ACL. When you try to access to a REST resource, this
resource requests wazo-auth with your token and the required ACL to
validate the access.

Syntax
======

An ACL contains 3 parts separated by dot (`.`)

-   \`service\`: name of service, without prefix `xivo-` (e.g.
    `wazo-confd` -\> `confd`).
-   \`resource\`: name of resource separated by dot (`.`) (e.g.
    `/users/17/lines` -\> `users.17.lines`).
-   \`action\`: action performed on resource. Generally, this is the
    following schema:

    > -   `get` -\> `read`
    > -   `put` -\> `update`
    > -   `post` -\> `create`
    > -   `delete` -\> `delete`

Substitutions
-------------

There are 3 substitution values for an ACL.

-   `*`: replace only one word between dot.
-   `#`: replace one or multiple words.
-   `me`: replace the `user_uuid` from sent token.

Example
-------

The ACL `confd.users.me.#.read` will have access to the following REST
resources:

    GET /users/{user_id}/cti
    GET /users/{user_id}/funckeys
    GET /users/{user_id}/funckeys/{position}
    GET /users/{user_id}/funckeys/templates
    GET /users/{user_id}/lines
    GET /users/{user_id}/lines/{line_id}
    GET /users/{user_id}/voicemail

-   \`service\`: `confd`
-   \`resource\`: `users.me.#`
-   \`action\`: `read`

The ACL `confd.users.me.funckeys.*.*` will have access to the following
REST resources:

    DELETE /users/{user_id}funckeys/{position}
    GET /users/{user_id}funckeys/{position}
    PUT /users/{user_id}funckeys/{position}
    GET /users/{user_id}funckeys/templates

-   \`service\`: `confd`
-   \`resource\`: `users.me.funckeys.*`
-   \`action\`: `*`

Where `{user_id}` is the user uuid from the token.

Available ACLs
==============

The ACL corresponding to each resource is documented in
<http://auth.wazo.community>. Some resources may not have any associated
ACL yet, so you must use `{service}.#` instead.
