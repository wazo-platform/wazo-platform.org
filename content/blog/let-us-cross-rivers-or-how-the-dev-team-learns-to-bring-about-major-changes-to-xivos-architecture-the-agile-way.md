Title: Let us cross rivers or how the dev team learns to bring about major changes to XiVO's architecture, the agile way.
Date: 2012-09-17 19:24
Author: jpgelinas
Category: Software
Slug: let-us-cross-rivers-or-how-the-dev-team-learns-to-bring-about-major-changes-to-xivos-architecture-the-agile-way
Status: published

XiVO has been around for over five years now and its use has greatly
evolved since then. From small installations of a few users, XiVO
evolved to support installations of hundreds of users and more recently
major contact centers. We now see XiVO installations with a few
thousands of users, multiple agents, queues and contexts and call
volumes ever increasing. This growth has brought the XiVO dev team new
challenges concerning the architecture of XiVO as not all parts of XiVO
were ready for this kind of sollicitation. We knew it. We knew there
were some bottlenecks we would need to adress.

We are agile and this means, among other things, that we do not build
bridges before we need to cross rivers. Now we're there. We need a
bridge! The XiVO dev team has been working hard in the last months to
overcome some of the major challenges of XiVO.

One of these challenges is linked with the decentralized/multi-component
nature of XiVO. Indeed as you can read in an [older
post](/index.php?post/2012/06/11/XiVO-Architecture), XiVO is a rich
multi-component ecosystem with way too many inter-relations. This has
been a work in progress for a while now were the mission is to reduce
the number of inter-relations as much as possible by better defining
each component's jurisdiction.

We recently had to tackle a very specific challenge where XiVO's use of
Asterisk's AMI could disrupt basic telephony (A calls B). For people who
don't know, AMI stands for Asterisk Manager Interface and is an Asterisk
component allowing custom clients to connect and interact with Asterisk
via a socket. In the XiVO ecosystem, the CTI daemon (CTId) is the major
consumer of Asterisk's AMI. The CTId is a monothreaded python daemon
responsible of handling XiVO client connections. The more users on a
given XiVO installation, the more XiVO clients can potentially connect
to the CTId and thus, the more traffic the CTId exchanges with the AMI.
This traffic can be quite impressive when considering a XiVO
installation under heavy telephony load. The CTId's event loop is a
synchronous blocking loop and while in this loop, the CTId cannot handle
any other jobs. This weakness would not be so terrible if the CTId
wasn't doing anything else than handling XiVO clients connections as it
would only impact those connections and nothing else. This specific
issue is still a major one and we'll adress how we handled it in a later
post.

Now if you remember the [schema of XiVO's
architecture](/images/blog/xivosoft/xivo_architecture.png) in our [previously
cited post](/index.php?post/2012/06/11/XiVO-Architecture), you can see
an interconnection between the CTId and the AGI. This relation handled
mainly the reverse directory lookups, used to display a callerID of
incoming call matching a number in a directory. Now this was a major
issue as it meant that any calls passed while the CTId was 'blocked' at
handling AMI traffic would not go through: A cannot call B anymore!

This was not much of an issue when a typical XiVO installation was
populated with a few users as it almost never happened that calls would
be blocked because of reverse directory lookups (or happened not often
enough for users to even notice and signal the issue). With growing XiVO
installations, it became obviously disruptive.

The solution was to remove anything from the CTId that could impact
telephony. From this perspective, any calls to the AGI in the CTId where
moved to nothing else than the AGId, the daemon responsible for handling
communications with Asterisk's AGI. It seems quite obvious when you
think of it and one might ask Why oh why was it not already that way? An
ever evolving XiVO dev team with five years at developping XiVO,
learning a whole lot along the way has to be the only responsible
answer.

XiVO is becoming more mature every day and so is its development team,
producing a software ecosystem always stronger, more mature and more
robust. We love building bridges, bring in the rivers!

</p>

