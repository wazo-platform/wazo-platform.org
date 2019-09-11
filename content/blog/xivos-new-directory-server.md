Title: XiVO's new directory server
Date: 2014-09-26 15:14
Author: pcadotte
Category: Software
Slug: xivos-new-directory-server
Status: published

Some of you may know that a new version of the [XiVO
client](/images/blog/xivo-client/Contacts.jpg "XiVO client") is being worked
on at the moment. The newlook and feel require some work behind the
scenes to merge all kindof contacts a XiVO user might have into a single
source of information.

What does all this mean ? A personal contact, an entry from an LDAP
server or another XiVO usershould all be available to the user as one
single list of contacts, even if some operations are not available on
all kinds of entries.

We already had a directory xlet that merged XiVO users and remote
directoryentries into a single list. This xlet is used by the
switchboard profile.The directory xlet does most of the heavy lifting of
merging the different contactlists on the client side. This solution is
not ideal for the future of XiVO as we wouldlike to be able to develop a
mobile or web-based version of the client without theburden of rewriting
the same logic.

The first step of our work on this new client is to move this directory
logicback on the server side. To do so, we are creating a new directory
service, namedxivo-dird, that will be responsible of handling all
queries made to all configured directory sources ona XiVO.

This new service will offer a public REST interface. This means that
custom client-side applicationswill be able to integrate the services
provided by xivo-dird easily. We are also making this newservice
runnable without a complete XiVO ecosystem. It will be possible to
installxivo-dird on a dedicated server or in a container. The nature of
the work doneon xivo-dird will also make it easy to run the service in a
distributed manner. Withsome configuration, an administrator will be
able to have many xivo-dird servers running behinda load balancer so
that it may be used by many XiVOs simultaneously. For example:Avencall
has one xivo per office but could use the same xivo-dird proxy for all
offices.

![archi-xivo-dird.svg](/images/blog/architecture/archi-xivo-dird.svg "archi-xivo-dird.svg, sept. 2014")

### Architecture

We are also designing xivo-dird for extensibility and we are trying to
makeplugins as easy as possible to create, making it easier for the
community to contribute.

#### Plugins

Currently planned extension points include:

##### Backends

Backends are plugins that are used to query directory sources. This is
where we find the logicfor retrieving data from a specific kind of
technology. Backends include, but arenot limited to, ldap, csv,
xivo-directory (the internal directory of a
XiVO),xivo-personal-directory (user's personal contact).

##### HTTP views

HTTP views are different URLs that are exposed by the xivo-dird server.
At themoment we know that we will have a json view that will be used by
other XiVOservices to retrieve lookup results. Other views will be added
to support otherneeds. Phones are a good example of consumers that
require a customized view.Adding support for a new brand of phone to
xivo-dird will be a matter of addingthe HTTP view plugin that formats
the lookup results in a way that the phoneunderstands.

#### Core

The core of the application is responsible for loading all of the
plugins.We will probably use a third party library for this job. We have
a proof ofconcept using
[stevedore](http://stevedore.readthedocs.org/en/latest/ "stevedore")at
the moment. Concurrency is also managed by the core.

This kind of architecture will become the reference for other XiVO
services. Having modular servicesthat can be executed independently from
each other will allow us scale therequired parts of XiVO when needed.

You can look at the [github
repository](https://github.com/xivo-pbx/xivo-dird "github repository")to
view the source code and follow our work. Note that the master branch
does not include thiswork yet. The code in other branches are proof of
concepts used to confirm that our architecturecould handle the kind of
load we were aiming for and that our modular architecture could
beachieved but this code is not meant for production and will be
replaced once we write theproduction version.

</p>

