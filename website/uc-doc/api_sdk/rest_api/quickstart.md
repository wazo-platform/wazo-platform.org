---
title: Quickstart
---

## Introduction

Wazo REST APIs are HTTP interfaces that allow you to programmatically interact with Wazo. In order
to access the REST APIs of Wazo, you need:

- a Wazo server up and running
- a browser
- somewhere you can copy-paste text (ids, tokens, etc.)

## REST API Permissions {#rest-api-acl}

First of all, you must have permission to use the REST API. Create a wazo-auth user and policy:

- `POST /users {"purpose": "external_api", "username": "rest-api-test", ...}`
- `POST /policies {"acl": ["confd.#", "auth.#"], ...}`
- `PUT /users/{user_uuid}/policies/{policy_uuid}`

Where:

- `acl`: Each access starts with the REST API service name. Then `#` is a wildcard that gives access
  to every REST API from this service. You may want to delete this account when you're done, to
  reduce risks of unauthorized access.

Save the form, and store the login/password somewhere for later use.

## API console

In this article, we will use `API console` built on Swagger UI:
https://wazo-platform.org/documentation

Choose a service and click on `API console` to explore API. In the top-left, fill the field with
your Wazo hostname: `https://<YOUR_WAZO_IP>`

**Note**: No data will be sent to a third party. All requests are done directly to your server.

Each module is a Python process that serves its own REST API. We will take one of them as example:

- [Configuration - API Console](/documentation/console/configuration) (wazo-confd)

wazo-confd is the daemon responsible for Wazo configuration. Its REST API allows you to read and
modify users, lines, extensions, groups, etc. This is the programmatic equivalent of the Wazo web
interface. However, the wazo-confd REST API is not yet complete, and not all aspects of Wazo
configuration are available in wazo-confd.

## HTTPS certificates

Almost all REST APIs use encryption and are available via HTTPS. Unfortunately, Wazo does not come
with a trusted certificate. So you have to manually trust the self-signed certificate of your Wazo.
To that end:

1. If you see an error like:

   ```markdown
   Failed to load API definition.
   ```

   This is expected. This is the kind of error (quite misleading, admittedly) you get when the
   certificate is not trusted.

2. Copy the URL `https://<YOUR_WAZO_IP>` and paste it in your browser.
3. Accept the HTTPS certificate validation exception.
4. Go back to the `API console`.
5. Now you should see the documentation for the `wazo-confd` API, and a list of sections for the
   configuration REST API, like `funckeys` or `users`

## Use the Configuration REST API

Now that we have access to REST API specifications, we can use them:

1. Go to [Configuration - API Console](/documentation/console/configuration)
2. In the top-left field, enter your stack hostname (ex: `https://mystack.example`)
3. In the top-right field, enter your `username:password` and click to `validate` to obtain a
   temporary token
4. Choose a REST API endpoint, like `users -> GET /users` and click `Try it out`

And that's it, you are ready to use any REST API with your authentication token.

**Note**: Be aware that this token will expire, and that you will need to get a new one when that
happens. You can take a look at [auth.wazo.community](https://auth.wazo.community) for an easier
manual token generation process. Note that the `auth.wazo.community` server will never know the
tokens that you generate, you browser will ask your Wazo directly.

**Warning**: Also, note that this authentication token gives **all permissions** to anyone who knows
it. Same goes for the account password we created earlier. Remember to delete this account, or at
least restrict permissions when you're done.

## What's next

- Check our [REST API Examples](/uc-doc/api_sdk/rest_api/examples) for more elaborate examples of
  how to use the REST APIs of Wazo.
- [REST API Conventions](/uc-doc/api_sdk/rest_api/conventions) are also a good read
- Explore the REST API in Swagger, it also serves as the reference documentation for REST API.

## Something went wrong...

Check [REST API Troubleshooting](/uc-doc/api_sdk/rest_api/troubleshooting).
