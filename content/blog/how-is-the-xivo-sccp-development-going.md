Title: How is the XiVO-SCCP development going ?
Date: 2012-05-01 15:07
Author: nbouliane
Category: Software
Slug: how-is-the-xivo-sccp-development-going
Status: published

From XiVO 1.2.5 we started to integrate the SCCP management directly
into the web interface.It means that now, people installing a XiVO
server can natively use the SCCP technologywhen creating new lines,
without the need to manually install the sccp channel driver andediting
the configuration file. As the sccp library evolve, the options
available throughthe web interface will also be expanded.

Lately we've been working on the multi-instance per line, which will be
released with XiVO 1.2.7 this week.Basically the multi-instance per line
is the ability to receive or make many calls at the same time.While only
one call can be active at a time, it is possible to keep the other call
alive but on hold.You can then toggle between the calls to pickup any of
them. Which will put the current active call on hold,and will set the
selected call as active.

[![7960-multi-instance1](/images/blog/libsccp/.IMG_20120501_092831_s.jpg "7960-multi-instance1, mai 2012")](/images/blog/libsccp/IMG_20120501_092831.jpg "7960-multi-instance1")

We still have a long list of features we want to write and make
available directly through XiVO.Even though we are still in early
development, I encourage everyone that have CISCO phones to installand
try the SCCP library. Either via XiVO or by manually installing the sccp
channel driver.

For those having CISCO phones that use the SCCP technology, we've put
online a tutorial to help you get this done:
<http://documentation.xivo.io/dev/administration/sccp/sccp.html>

At the bottom of the tutorial, you will also find the list of feature
and telephone type that we actually support.We hope to extend this list
as time goes, but we need your help !

At this point of development, we need more people that use the SCCP
library. As the number of people using itwill increase, the number of
bugs reported will increase and hence the number of fix and enhancement.
At the end, everbody win.

</p>

