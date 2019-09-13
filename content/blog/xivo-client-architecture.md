Title: XiVO Client architecture
Date: 2011-09-30 21:14
Author: sduthil
Category: Software
Slug: xivo-client-architecture
Status: published

This blog post extends the diagram presented earlier explaining the
[global architecture of
CTI](/index.php?post/2011/05/13/CTI-external-architecture-in-XiVO-1.1-and-1.2 "CTI global architecture diagram")
in XiVO.

Here is what the XiVO Client looks like from a developer point of
view:![XiVO Client
architecture](/images/blog/.xivoclient_m.jpg "XiVO Client architecture, sept. 2011")

This is the new architecture that will be included in our new
development iteration beginning on Monday, 3rd October.The main change
is the "creation" of the XLetlib, that was previously into the Baselib.
The Baselib will be progressively stripped of everything not necessary:
the goal is to make it a reusable component, which will only manage the
connection with the CTI server.

Everything in the XiVO Client is written in C++ and Qt.

Let's explicit the spaghetti plate above a little :XLets, for XiVO
applets, are plugins to the XiVO Client. Almost every function of the
XiVO Client is pluggable/unpluggable, depending on the server
configuration to allow some XLet to be activated. You can see what XLets
look like in the [XiVO
wiki](https://wiki.xivo.io/index.php/XiVO_1.0-Dalek/Documentation_XiVO_Client "XiVO Client user manual")
(each tab is an XLet).

Each XLet can use the tools available in the XLetlib, that are mainly
GUI elements used to display information in a consistent way within all
XLets. They are also given access to the Baselib "API" (it is an API,
but scarcely documented for the time being), that receives or sends CTI
events and informations to the CTI server, such as "a new phone has
registered to Asterisk", "you have a new telephone message", "I want to
call this number", etc.

Of course, there are some options available to control how the XiVO
Client behaves ; about half of them control GUI aspects and the other
half control how the connection is established to the server. The GUI
related options are some of the things we still have to migrate out of
the Baselib, because someone wanting to connect to the CTI server
through our Baselib does not care that the XiVO Client presence
indicator is 5 pixels wide...

About the communication protocol between the XiVO Client and the CTI
server, everything is JSON encoded. For now, there is no compatibility
between protocol versions, but we're thinking about it. The goal is to
be able to release XiVO Client upgrades without having to wait for the
XiVO distribution to be released, especially if the new version
introduces mainly GUI improvements. But this can't happen if an "old"
server can not talk with a more recent client.

One could think that working on the XiVO Client may be boring, as it's
only easy GUI stuff, placing a button here, making it violet with green
dots for obscure marketing reasons. There's a part of GUI stuff, of
course, but I find the plugins-only, freely movable (in dock mode)
interface concept very interesting, it makes the XiVO Client a potential
swiss-army knife, to which anyone can choose exactly the tools he needs,
no more, no less.

Some links :  
[The XiVO Client git
repository](http://git.proformatique.com/?p=official/xivo-client-qt.git;a=summary "XiVO Client git repository")  
[Developer oriented
documentation](https://wiki.xivo.io/index.php/XiVO_1.2-Skaro/CTI_XiVO_Client_Qt_Developer "XiVO Client developer documentation")  
[IRC
channel](https://wiki.xivo.io/index.php/Support_Community#IRC "IRC channel infos")

</p>

