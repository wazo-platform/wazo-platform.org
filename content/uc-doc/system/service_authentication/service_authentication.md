---
title: Service Authentication
---

Wazo services expose more and more resources through REST API, but they
also ensure that the access is restricted to the authorized programs.
For this, we use an `authentication daemon
<wazo-auth>`{.interpreted-text role="ref"} who delivers authorizations
via tokens.

## <a name="call-flow></a>Call flow

Here is the call flow to access a REST resource of a Wazo service:

1.  Create a username/password (also called service\_id/service\_key)
    with the right `ACLs
    <rest-api-acl>`{.interpreted-text role="ref"}, via wazo-auth.
2.  `Create a token <wazo-auth>`{.interpreted-text role="ref"} with
    these credentials.
3.  `Use this token <rest-api-authentication>`{.interpreted-text
    role="ref"} to access the REST resource defined by the
    `ACL <rest-api-acl>`{.interpreted-text role="ref"}.

![Call flow of service authentication](/images/uc-doc/system/service_authentification/service_authentication_workflow.png)

Service

:   Service who needs to access a REST resource.

xivo-{daemon}

:   Server that exposes a REST resource. This resource must have an
    attached ACL.

wazo-auth

:   Server that authenticates the Service and validates
    the required ACL with the token.

Wazo services directly use this system to communicate with each other,
as you can see in their Web Services Access.
