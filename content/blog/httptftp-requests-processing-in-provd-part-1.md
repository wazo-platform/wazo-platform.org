Title: HTTP/TFTP requests processing in provd - part 1
Date: 2012-02-09 18:35
Author: hexanol
Category: Software
Tags: xivo 1.2, provisioning
Slug: httptftp-requests-processing-in-provd-part-1
Status: published

Well. Yes. provd ask a "device info extractor" object to extract
information from the HTTP request, and that object returns the
information we were expecting. But what is really happening inside that
"device info extractor" ? Let's see:

[![Device info extraction
details](/images/blog/provd/.provd-dev-info-extraction-details_m.jpg "Device info extraction details, fév. 2012")](/images/blog/provd/provd-dev-info-extraction-details.png "Device info extraction details")

The device info extractor object is in fact only merging results from
two others device info extractor.

The "all plugins device info extractor" ask for each installed plugin to
extract info from the request. In this case, thexivo-aastra plugin is of
course able to extract a lot of information by looking at the User-Agent
header, but the xivo-cisco-sccp plugin is of no help. The results are
then merged and returned.

The "standard device info extractor" extract the IP address. It's role
is to only extract trivial information from requests.

From what we learned, we can deduce some properties of device
information extraction in provd.

First, if no plugins are installed, only IP addresses will ever be
extracted.

Next, we can ask ourselves what happens when two plugins returns
different information. Well, the "all plugins device info extractor" is
capable of applying different merge strategies. I won't go into more
details for now.

The last thing we can see is that a bad plugin could make the system
unreliable. You do not want to be in the situation were wrong
information is extracted by a plugin. That is why it's always safer to
only install the plugins you need, and no more.

Now that we know all that, let's see what happens for a request coming
from a Cisco 7940. One of the first request it does is:

~~~
TFTP RRQ SEP554433221100.cnf.xml
~~~


TFTP requests are really simple, especially if you compare them to HTTP
requests. The only interesting information an RRQ (read request) can
have is the filename. But a filename can contains a lot of information.

TFTP requests take a similar flow as HTTP requests in provd. In our
example, the xivo-aastra plugin will return no information from it, but
the xivo-cisco-sccp plugin will be able to extract both the vendor and
the MAC address. For this request, it's not possible to determine the
model nor the firmware version.

So provd knows the request came from a Cisco, and that its MAC address
is 55:44:33:22:11:00. That's not much, but it's better than nothing.

That said, there is a special trick for extracting information about the
model on Cisco 7900 phones. I won't tell you what it is because I'm
getting tired of writing this article, but all I can say is that it's
pretty neat, and it's also useful in some other situation. Well okay,
I'll just say the name: DHCP integration.

That's all folks. We have both seen the best (Aastra 6731i) and the
worst (Cisco 7940) case concerning device info extraction in provd. That
said, even the worst case doesn't pose a real problem. Next time, if I
don't get too many death threat following this article, I'll talk about
the next step of request processing in provd, device retrieving, which
is quite simpler by the way.

</p>

