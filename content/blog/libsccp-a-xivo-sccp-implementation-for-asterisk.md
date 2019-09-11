Title: libsccp, a XiVO SCCP implementation for Asterisk
Date: 2011-12-22 15:01
Author: nbouliane
Category: Software
Slug: libsccp-a-xivo-sccp-implementation-for-asterisk
Status: published

Have you ever heard of SCCP ? It stands for Skinny Call Control Protocol
and it's used to interact with Cisco IP Phones. Asterisk has its own
basic support called chan\_skinny and is one of the first open source
implementation available. There is also a more featured implementation
called chan\_sccp-B, which is a fork of chan\_skinny.

![agile-dashboard.jpg](/public/libsccp/.agile-dashboard_s.jpg "agile-dashboard.jpg, déc. 2011")

Then, why writing another one ? Well, simply because chan\_skinny is
too... skinny! and that chan\_sccp-B is full of bugs, have no clear
roadmap and is not backed by professional developers. Don't worry too
much, we are not rewriting everything from scratch, all the protocol
knowledge is based on chan\_skinny.

In the long run, our goal is to produce a stable, full featured and well
tested code base. To keep our goal in focus, we aim to commit early and
often. In that, you're encouraged to actively participate by playing
with the code, reporting errors and sharing your ideas and needs with
us.

![sccpp.jpg](/public/libsccp/.sccpp_s.jpg "sccpp.jpg, déc. 2011")

In parallel of the libsccp development, we're building an automated test
environment. Asterisk has a built-in unit-test framework that allow us
to stress the bits and bytes of every line of codes in a non-functional
way. Another tool made by Digium is the Asterisk TestSuite framework.
This powerfull tool allow us to write specific case scenario and replay
it as we like. Furthermore, we wrote a traffic generator for the SCCP
protocol, called SCCPp, that can act as a scriptable softphone. To
orchestrate and automate all this, we are using Jenkins as a continuous
integration tool. In short, [Jenkins](http://jenkins.xivo.io/) is able
to replay all the different level of test automatically everytime
something is modified in the code. All of this is still at an early
stage, and is evolving everyday.

![phone-tested.jpg](/public/libsccp/.phone-tested_s.jpg "phone-tested.jpg, déc. 2011")

For those eager to dig into the code and start using it, you can find
here how to get started and more:<https://wiki.xivo.io/index.php/Sccp>

If you are less comfortable with the 'Do It Yourself', libsccp is also
getting integrated into XiVO Skaro and will be available in the next
week or so.

</p>

