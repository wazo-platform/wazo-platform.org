Title: Refresh Token in Wazo
Date: 2019-12-02
Author: Pascal Cadotte Michaud
Category: Wazo
Slug: wazo-auth-refresh-token
tags: wazo-platform, api, authentication
Status: published


# Introduction

As a consumer of the API on wazo-platform the first step you need to do before
almost anything else is to authenticate. The process of authentication on Wazo
is basically creating a token using your username and password. This can be done
using the `/token` API of wazo-auth. Here's an example from the command line.

```sh
curl -k -XPOST -H "Content-Type: application/json" -u "<username>:<password>" "https://<hostname>/api/auth/0.1/token" -d '{"expiration": 3600}'
```

Let's break that down a little to understand what's going on. This is an HTTP
request on the URL `https://<hostname>/api/auth/0.1/token` with the verb POST.
The HTTP header `Content-Type: application/json` indicates that the body of our
request is JSON. The `-u` parameters specifies the username and password we wish
to authenticate with. Finally, the `-d` argument specifies the body of our
request. In this example the expiration of the token is the only parameter.

The response from this request looks like this. The value in `data` `token` is
your access token. You will use it on any subsequent queries using the
`X-Auth-Token` header.

```javascript
{
  "data": {
    "token": "dc93c753-6ced-4433-9abf-fde629a69a07",
    ...
  }
}
```

This basic request is the first building block for more complex scenarios.

Now has you have noticed, your token has an expiration. Which means that at some
point in the future you will want to create a new token to keep using the API.
When the API user is a human writing HTTP request, that is quite simple, all
you've got to do is repeat the token creation process. But if the API consumer
is an application it's not that straight forward. You can either use a very very
long expiration which defeats the point of having an expiration. You can store
the username and password of your user in a variable inside your process to be
able to recreate a new token when the current one expires. But storing your
user's username and password is a bad practice and leaves your users vulnerable
to malicious people. A third but still imperfect solution is to ask the user for
it's password each time the current token expires, which gives your application
a sub-par user experience.


# Introducing Refresh Tokens

A refresh token is a way to create a new access token without specifying the
username and password. This allow application to store a piece of information
that will be used to create a new access token on behalf of the user without
having to commit its password to memory.


## Creating a Refresh Token

Creating a refresh token is just like creating an access token with a few more
arguments.

```sh
curl -k -XPOST -H "Content-Type: application/json" -u "<username>:<password>" "https://<hostname>/api/auth/0.1/token" -d '{"expiration": 3600, "client_id": "example", "access_type": "offline"}'
```

The only change from the access token creation is that two fields are added to
the request body. `client_id` which is an identifier for the application
requesting the refresh token. `access_type` which when given the value `offline`
triggers the creation of the refresh token.

Here's the response you'll get from that requesting

```javascript
{
  "data": {
    "token": "88204f50-0fe8-4163-a90f-9ff867468997",
    "refresh_token": "353fefa1-d013-4633-a7d3-c6cb574ddc26",
    ...
  }
}
```

The `token` field here is an access token that is valid for the expiration that
have been specified on the POST. The `request_token` field is a special token
that can be used to create another access token for that user as if the username
and password had been used.

The refresh token that you just created has no expiration and will keep working
until it is explicitly deleted.


## Creating an Access Token from a Refresh Token

Now that you've created and stored a refresh token you want to be able to use
it. The URL to create an access token from a refresh token is the same again,
with different arguments.

```sh
curl -k -XPOST -H "Content-Type: application/json" "https://<hostname>/api/auth/0.1/token" -d '{"expiration": 3600, "client_id": "example", "refresh_token": "353fefa1-d013-4633-a7d3-c6cb574ddc26"}'
```

The body when creating an access token from a refresh token must contain the
following values. The `refresh_token` of course and the `client_id` which
identifies the application creating the new access token. The `client_id` must
match the `client_id` used when creating the refresh token.


# Difference Between a Refresh Token and an Access Token

A refresh token can ONLY be used to create an access token, if you use it in a
request in an `X-Auth-Token` header you will always get a 401 error. On the
other hand, trying to create a new access token using an access token as if it
was a refresh token will not work either.

Another restriction is that you will not be able to create a new refresh token
without a username and password authentication. All other properties of the
generated access token are the same.


# The Next Steps

The natural following steps for the authentication server will be the addition
of an an OAuth2 interface and to be able to limit the scope of a refresh token
such that all created access tokens are limited to a set of features that were
known to the user when creating the refresh token.


# Conclusion

If you are developing a long lived application that uses Wazo's API use refresh
tokens to offer a nice user experience and avoid storing sensible user data.
