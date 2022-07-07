Title: How to Authenticate a User From Wazo APIs
Date: 2022-06-22 10:00:00
Author: Pascal Cadotte Michaud
Category: Developer Tutorial
Slug: authenticate-user-wazo-api
OgImage: authenticate-user-wazo-api-og.jpg
Thumbnail: authenticate-user-wazo-api-thumbnail.jpg
Status: published

## Introduction

In this tutorial, we will explain how to authenticate a user and explain the refresh token
mechanism. As an API consumer of Wazo Platform, the first step you need to do before almost anything
else is to authenticate.

## How To Authenticate a User

The process of authentication on Wazo Platform is basically creating a token using your username and
password. This can be done using the `POST /api/auth/0.1/token` API of wazo-auth.

### Create a Token

Here's an example from the command line on how to create a token for a user.

```bash
curl -k -X POST "https://<hostname>/api/auth/0.1/token" \
  -H "Content-Type: application/json" \
  -u "<username>:<password>" \
  -d '{"expiration": 3600}'
```

| Parameter                        | Description                                                                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `Content-Type: application/json` | HTTP header that indicates that the body of our request is JSON.                                                         |
| `-u "<username>:<password>"`     | A parameter that specifies the username and password we wish to authenticate with.                                       |
| `-d '{"expiration": 3600}'`      | A parameter that specifies the body of our request. In this example, we set the expiration of the token to 3600 seconds. |

#### Analysing Create Token Response

The response from this request looks like below. The value in `data.token` is your access token. You
will use it on any subsequent queries using the `X-Auth-Token` header to act as the authenticated
user.

```javascript
{
  "data": {
    "token": "dc93c753-6ced-4433-9abf-fde629a69a07",
    "expires_at": "2022-01-01T00:00:00.000000",
    ...
  }
}
```

Now as you have noticed, your token has an **expiration**. This means that at some point in the
future you will want to create a new token to keep using the API. When the API user is a human
writing an HTTP request, that is quite simple, all you've got to do is repeat the token creation
process.

But if the API consumer is an application, it's not that straightforward. You can't either use a
very very long expiration which defeats the point of having an expiration. You can't store the
username and password of your user because it's a bad practice and leaves your users vulnerable to
malicious people. A third but still imperfect solution is to ask the user for its password each time
the current token expires, which gives your application a sub-par user experience.

### Introducing Refresh Tokens

A refresh token is a way to create a new access token without specifying the username and password.
This allows an application to store a piece of information that will be used to create a new access
token on behalf of the user without having to commit its password to memory.

#### Creating a Refresh Token

Creating a refresh token is just like creating an access token with a few more arguments.

```bash
curl -k -X POST "https://<hostname>/api/auth/0.1/token" \
  -H "Content-Type: application/json" \
  -u "<username>:<password>" \
  -d '{"client_id": "example", "access_type": "offline"}'
```

The only change from the access token creation is that two fields are added to the request body.

| Field         | Description                                                                     |
| ------------- | ------------------------------------------------------------------------------- |
| `client_id`   | Which is an identifier for the application requesting the refresh token         |
| `access_type` | Which when given the value `offline` triggers the creation of the refresh token |

#### Analysing Refresh Token Response

Here's the response you'll get from that request.

```javascript
{
  "data": {
    "token": "88204f50-0fe8-4163-a90f-9ff867468997",
    "refresh_token": "353fefa1-d013-4633-a7d3-c6cb574ddc26",
    "expires_at": "2022-01-01T00:00:00.000000",
    ...
  }
}
```

| Field           | Description                                                                                                                         |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `token`         | Is an access token that is valid for the expiration that has been specified on the POST                                             |
| `request_token` | Is a special token that can be used to create another access token for that user as if the username and password had been&nbsp;used |

> **Important!** The refresh token that you just created has no expiration and will keep working
> until it is explicitly deleted.

### Creating an Access Token from a Refresh Token

Now that you've created and stored a refresh token you want to be able to use it. The endpoint to
create an access token from a refresh token is the same again, with different arguments.

```bash
curl -k -X POST "https://<hostname>/api/auth/0.1/token" \
  -H "Content-Type: application/json" \
  -d '{"expiration": 3600, "client_id": "example", "refresh_token": "353fefa1-d013-4633-a7d3-c6cb574ddc26"}'
```

The body when creating an access token from a refresh token must contain the following values :

- The `refresh_token` of course and the `client_id` which identifies the application creating the
  new access token.
- The `client_id` must match the `client_id` used when creating the refresh token.

## Difference Between a Refresh Token and an Access Token

**A refresh token can ONLY be used to create an access token.** If you use it in a request in an
`X-Auth-Token` header you will always get a 401 error.

**An access token can ONLY be used to authenticate a request.** The access token must be set in
`X-Auth-Token` headers. On the other hand, trying to create a new access token using an access token
as if it was a refresh token will not work either.

## What's Next

You now have the basic requirements to use our Programmable API. It's time to build something great
🎉 !

Want to put into practice what you learn in this tutorial? Try to create a simple application that
manages wazo-auth users. You'll get familiar with all common operations GET, CREATE, UPDATE and
DELETE. See the [Authentication API
specifications](https://wazo-platform.org/documentation/api/authentication.html) for more.

## Conclusion

If you are developing a long-lived application that uses Wazo Platform's API, then you should use
refresh tokens to offer a nice user experience and avoid storing sensitive user data.

## References

* Original content of this tutorial comes from the [Refresh Token in
  Wazo](/blog/wazo-auth-refresh-token) blog post.
* [API specifications](https://wazo-platform.org/documentation/)
