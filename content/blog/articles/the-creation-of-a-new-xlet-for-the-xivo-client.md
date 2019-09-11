Title: The creation of a new xlet for the XiVO client
Date: 2011-12-30 13:09
Author: pcadotte
Category: Software
Tags: xlet, xivo 1.2, xivo, software, client
Slug: the-creation-of-a-new-xlet-for-the-xivo-client
Status: published

The XiVO client has been designed to be expendable. The plug-in
architecture allows a user to create his own xlet to fulfill his needs.
This short tutorial will guide you through the creation of a simple xlet
and the required configuration to test it.

Getting the sources
-------------------

The first step to creating your own xlet is to get the XiVO client
sources. The sources can be retrieved with the following command:

~~~
git clone git://git.xivo.io/official/xivo-client-qt.git
~~~


The available xlets are in the directory xivoclient/src/xlets you could
create your xlet from scratch but we will use the xletnull as a scaffold
for our new xlet.

Transforming xletnull into something new
----------------------------------------

For this example, we will create a simple xlet that displays channel
information for debugging purposes.

Copy the xletnull directory and give your new directory a significant
name.

~~~
cd xivoclient/src/xlets
cp -R xletnull channellist
~~~


Rename files in the channellist directory to reflect your new xlet name.

~~~
rename 's/xletnull/channellist/' *
~~~


Fix .cpp and .h files by renaming xletnull to your new name. In .h
files, change the include gards to reflect the new file name and rename
the classes. In .cpp files, change the include "xletnull.h" and the
classname

Fix the .pro file, the TARGET line should point to your new xlet

Remove the Makefiles if they are present "rm Makefile\*" in the xlet's
directory

Add your new xlet to the xivoclient/xlets.pro file. Edit the file
xivoclient/xlets.pro. Add src/xlets/channellist to the SUBDIRS array.

Check if it still compiles
--------------------------

Test your changes. From the root of the xivo-client-qt directory run:

~~~
make clean
make
~~~


You should now have a channellist.o and a channellistplugin.o file
xivoclient/obj/ directory.

Tell xivo-ctid about your new xlet
----------------------------------

On your XiVO, edit /etc/pf-xivo/xivo-ctid/allowedxlets.json.Add a line
for your new xlet

~~~
"channellist" : []
~~~


Add the new xlet to your CTI profileIn the web-interface services -&gt;
CTI server -&gt; profilesEdit your profile, select the xlets tab and
click the add buttonSelect your new xlet (you will see a missing
translation error instead of your xlet name but you can still select
it).

Restart xivo-ctid

Try your boilerplate code
-------------------------

When you log in the cti client you should now have an xlet with "sample"
caption and a label displaying "Hello world!"

Now that the boiler plate code is in place, the real work begins. We
will use the client internal API to get warned of new channel events and
display a list of active channels on our XiVO.

Get the work done
-----------------

The implementation of our Xlet will be in the channellist.h and
channellist.cpp files.

-   Change the title of your xlet.

In the constructor of your xlet change the string sent to setTitle to
your desired title.

~~~
`setTitle("Channel List");`
~~~


-   Remove unused widget

For this example we won't need the m\_label member. It can be remove
from the .h and it's initialization from the .cpp.

-   Listening to interesting events

The Baseengine of the XiVO client broadcast many events using Qt
signals, these signals can be catched by any xlets. We connect to 3
signals from the base engine in our constructor, channels and phones
status updates. Both signals are received by the updateChannelList slot.
The string parameter is not used in this example but the same signature
is required to connect a signal to a slot.

To access signals or any other methods of the base engine, we need to
include &lt;baseengine.h&gt; in our xlet. We can then acces the base
engine instance with the b\_engine pointer.

-   Retrieving internal data structures

The current implementation of the XiVO client keeps a hash map of each
interesting object. Updates are received by the CTI server and stored by
the base engine. Available objects are available in
baselib/src/\*info.h.In our example, we use b\_engine-&gt;channels() to
retrieve the list of channels that are in memory whenever we receive a
status update from the CTI server. The old list is then destroyed and a
new one is created from scratch.

![Channel List
xlet](/public/new_xlet/.channellist_small_m.jpg "Channel List xlet, déc. 2011")

The channellist.cpp and channellist.h files are available as attachment

</p>

