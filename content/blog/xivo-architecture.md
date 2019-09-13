Title: XiVO Architecture
Date: 2012-06-11 14:56
Author: cedric
Category: XiVO IPBX
Slug: xivo-architecture
Status: published

The architecture of XiVO is still too complicated. As you can see, the
components are virtually all related to each other.

[![XiVO
Architecture](/images/blog/xivosoft/.xivo_architecture_m.jpg "XiVO Architecture, juin 2012")](/images/blog/xivosoft/xivo_architecture.png "XiVO Architecture")

We especially have too many requests from different services to the DB.
Since so many components have direct access to the database, there are
risks of data corruption. We currently are doing our best to simplify
this architecture and to give each component its true purpose. A good
example is CONFGEND which was developed to generate the Asterisk
configuration by getting the information from the DB. It does one single
task and it does it well.

There are many challenges with current XiVO's architecture that we are
adressing or will be working on in the near future. Asterisk's AGI
should not make requests to the CTID. This is why we removed since XiVO
1.2.11 all AGI interraction in the CTID (notice the link between the
CTID and the AGI on the architecture's schema does not exist anymore).
In the same vein, the AGID should have read-only access to the DB and
the CTID should not interact directly with WebServices.

A bunch of bad practices which we are aware of. We are up to the
challenge and integrating this architecture evolution in our 2-weeks
iterations makes it all even more exiting.

</p>

