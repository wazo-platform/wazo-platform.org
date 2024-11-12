---
title: Service Authentication
---

Wazo services expose more and more resources through REST API, but they also ensure that the access
is restricted to the authorized programs. For this, we use an
[authentication daemon](/uc-doc/system/configuration_files#wazo-auth) who delivers authorizations
via tokens.

## Call flow {#call-flow}

Here is the call flow to access a REST resource of a Wazo service:

1. Create a `username`/`password` (also called `service_id`/`service_key`) with the right
   [ACLs](/uc-doc/api_sdk/rest_api/quickstart#rest-api-acl), via wazo-auth.
2. [Create a token](/uc-doc/system/configuration_files#wazo-auth) with these credentials.
3. [Use this token](/uc-doc/api_sdk/rest_api/conventions#rest-api-authentication) to access the REST
   resource defined by the [ACL](/uc-doc/api_sdk/rest_api/quickstart#rest-api-acl).

![Call flow of service authentication](/images/uc-doc/system/service_authentification/service_authentication_workflow.png)

**service**: Service who needs to access a REST resource.

**wazo-daemon**: Server that exposes a REST resource. This resource must have an attached ACL.

**wazo-auth**: Server that authenticates the Service and validates the required ACL with the token.

Wazo services directly use this system to communicate with each other, as you can see in their Web
Services Access.
