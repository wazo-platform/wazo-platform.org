Title: HTTP/TFTP requests processing in provd - part 2
Date: 2012-04-12 12:40
Author: hexanol
Category: Software
Slug: httptftp-requests-processing-in-provd-part-2
Status: published

Let's take the same example as we did last time, i.e. let's say we have
a xivo-aastra plugin installed.

So we plug a brand new Aastra 6731i on our network. The phone then does
the following HTTP request:

~~~
GET /Aastra/aastra.cfg HTTP/1.1
User-Agent: Aastra6731i MAC:00-11-22-33-44-55 V:3.2.2.1136-SIP
~~~


The "device info extraction" step is then able to extract the following
information:

~~~
{'vendor': 'Aastra', 'model': '6731i', 'version': '3.2.2.1136',
 'mac': '00:11:22:33:44:55', 'ip': '192.168.1.100'}
~~~


This information is then passed to a "device retriever" object. Here's a
pseudo code version of what it looks like:

~~~
def process_request(request):
    device_info = device_info_extractor.extract(request)
    device = device_retriever.retrieve(device_info)
    ...
~~~


A device object can be seen as a superset of a device info object. Both
are dictionaries, but the device object can contain keys that the device
infoobject never will, like an "id", a "plugin" and a "config" key.

Let's see in more details what happens in this "device retriever"
object:

[![Device
retriever](/images/blog/provd/.device-retriever_m.jpg "Device retriever, avr. 2012")](/images/blog/provd/device-retriever.png "Device retriever")

The device retriever will ask one at a time the different other device
retrievers until one returns something. In our example, since the provd
serverdoesn't know yet about our Aastra, the "mac device retriever" will
returns nothing because there is no device with the MAC address
00:11:22:33:44:55 in the device database, then the "SN (serial number)
device retriever" will returns nothing because no SN is used with
Aastra, then the "ip device retriever" will also returns nothing, and
finally, the "add device retriever" will add the new device to the
database and return it.

On the next requests of our Aastra, the "mac device retriever" will
search for a device with the given MAC and will then return the device
object that was added previously.

From what we just learned, we can see that it's at this step that
devices are automatically added to provd. That said, the automatic
plugin association and automatic config association (taken from a
"template" config) is not done at this step but later on, which is
something we'll see in more details in my next blog post.

If provd had to support only Aastra phones, only the "mac device
retriever" and the "add device retriever" would be needed (and some part
of provd would be a whole lot simpler also). That said, the reality is
more complex. Some phones are only doing TFTP requests, which means no
User-Agent header and little information to extract for some requests,
sometimes only the IP address. This is where the "ip device retriever"
comes in handy. It's usually able to find the right device by only using
the IP address. This is possible because provd always try to maintain
the most up to date info about IP address used by devices.

That said, for some devices, there is some scenarios where the system
just isn't powerful enough:

-   you power on a new Linksys/Cisco SPA3102, which is given the
    192.168.1.101 IP address by the DHCP server
-   the phone then ask the /spa3102.cfg file via TFTP
-   provd knows the request came from a Linksys SPA3102 with the
    192.168.1.101 IP address, but doesn't know the MAC address. No
    worry, it still adds it to the device database.
-   the phone then ask the /001122334477.xml file, still via TFTP.
-   provd is able to retrieve the device by using the IP address, and
    now knows that the device behind the request has the MAC
    00:11:22:33:44:77
-   the phone is unplugged from the network
-   a couple of days later, the phone is power on again. This time, the
    DHCP server gives it the 192.168.1.102 IP address
-   the phone then ask the /spa3102.cfg file via TFTP
-   the only information that can used to retrieve the device is the
    IP address. That said, no device in the device database use this
    IP address. provd will then create a new device, believing its a
    new device.
-   the phone then ask the /001122334477.xml file
-   provd is then able to retrieve the first device by using the
    MAC address. It then updates the IP address information of
    this device. Unfortunately, the previous step created a device in
    the database for nothing.

The system still works in these cases. The only problem is that you get
junk devices in provd device's database, and these can only be removed
manually. They are not causing any real harm except then adding some
confusion as to why theses devices are in the database.

There is a way to get by this problem, and it's called "dhcp
integration". Yes. Just believe me.

So that's all folks. Next time, if your brain still hasn't suffered from
an epileptic seizure, get ready because we'll be talking about the
"device updating" step.

</p>

