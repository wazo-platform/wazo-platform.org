Title: Update from XiVO 13.20
Date: 2013-10-21 17:01
Author: sduthil
Category: XiVO IPBX
Slug: update-from-xivo-1320
Status: published

It's been a while since we gave any updates, but we've been quite
active.

We are currently writing a REST API to configure XiVO, giving access to
asimplified set of the Web interface's controls and replacing thecurrent
Web services. A few examples of what can be done with this API
includelisting users, lines, extensions, devices, voicemails, creating
users, givingthem a SIP line and an extension. The documentation of the
API is available
[online](http://documentation.xivo.io/dev/api_sdk/rest_api/1.1/api-1.1.html "API documentation").

The REST API offers one new feature that is not possible via the Web
interface:associating multiple users to a single SIP line. The main use
case is for multipleusers sharing the same physical phone. They can be
called using the same ordifferent extensions.

The next step to improve the rest api would be to associate a device to
a user,which can currently only be done via the web interface.
unfortunately, thisrequires cleaning and rewriting in python a pretty
big bunch of code fromthe php web interface, mainly because of the
handling of programmablefunction keys, so we are taking the time to do
it right.

This development has three consequences:

- First, we are cleaning the storage systems for users, lines, devices,
etc., which means changing the database schema and removing useless data
caches.

- Second, we are developing a Python interface to configure XiVO, which
our REST API uses, and which eventually third-party Python scripts will
be able to use, once it is documented.

- Third, we're pushing all configuration events into a software bus
(RabbitMQ), so that XiVO components are aware of configuration changes,
and eventually third-party programs may be aware of them as well. Again,
this will be available once it is documented.

We are also going towards upgrading XiVO to the next version of Debian
namedWheezy. The next step is to backport PostgreSQL from Wheezy, so
that thedatabase migration, which is not so simple, is not done at the
same time as thewhole system upgrade.

Finally, we moved all our Git repositories to Github. Some time ago, we
movedsome of our repositories to Gitorious, which we preferred because
it iscompletely based on free software, but we've had a few problems
with it.So we decided to switch to Github. You can now fork us at
<https://github.com/xivo-pbx>.

</p>

