Title: Authentication in XiVO
Date: 2015-05-25 15:34
Author: pcadotte
Category: Software
Tags: XiVO, authentification, HTTP, consul, directory
Slug: authentication-in-xivo
Status: published

In recent months we have been working on the new XiVO client which
included amajor rework of the directory services in XiVO. A new daemon
is born from thiswork, xivo-dird. One of the challenge of the new
directory service is to allowusers to have access to their favorites and
personal contacts from any device- the current implementation of
personal contacts are stored locally and arelost in a context where
users change seats.

Bringing the personal information to xivo-dird means that some form
ofauthentication is now required. The first step is to be able to use
user'sCTI login and password and to evolve from there to add more
flexibility.

### Meet xivo-auth

xivo-auth is a new service that is going to be used as the single entry
pointfor authentication in XiVO. The first step being the authentication
in xivo-dird.Some of the requirements for xivo-auth is to be able to
implement other forms ofauthentication. The plugin architecture used,
similar to xivo-dird, will makethe development of new authentication
source fast and easy. This mean that LDAPserver, CSV file, Facebook or
Twitter authentication should and will be possibleto implement without
having to modify xivo-auth.

### The internals of xivo-auth

xivo-auth is a simple HTTP server that checks a username and
passwordcombination (though other forms of authentication might appear)
and delivers a tokenthat can be forwarded to other services that require
authentication. Otherservices can validate that token and also forward
it to other services on behalfof the user. Tokens and ACLs are generated
and managed by [consul](https://consul.io "Consul") which is alsoused
for personal data storage.

The following sequence diagram show the interaction when a user
connectsto its XiVO client.

![login.png](/images/blog/architecture/login_cti_via_xivo_auth.png "login.png, mai 2015")

After this step, xivo-ctid has a token with a limited lifetime for this
user.

When a logged-in user performs a lookup in its XiVO client, the user's
token isforwarded to xivo-dird which can return the appropriate results
for this user.

![lookup.png](/images/blog/architecture/lookup_cti_via_dird_xivo_auth.png "lookup.png, mai 2015")

Stay tuned for more information as we implement xivo-auth and the
firstauthentication plugins.

*\* Images created with
[Violet](https://github.com/violetumleditor/violetumleditor "Violet")*

</p>

