Title: Automatic tests now extend to XiVO Client
Date: 2012-01-19 16:00
Author: sduthil
Category: Software
Tags: xivo 1.2, xivo, software, skaro, client
Slug: automatic-tests-now-extend-to-xivo-client
Status: published

For months now, we have had our continuous integration tool
[Jenkins](http://jenkins.xivo.io/ "Jenkins") running automatic tests to
detect regression bugs on the XiVO web interface. But the web interface
is not the only interface XiVO offers ; there is a XiVO Client, running
as a stand-alone Qt application on other machines.

Until now, we were running tests on the XiVO Client by hand at the end
of each development iteration. Well, we will still run some of them by
hand for a time, but we now can make most of them run automatically. We
just have to code the tests :-)

Here's what a Lettuce test look like :  

~~~
Scenario: Enable XiVO Client
       Given I am logged in
       Given there is a user "Charles" "Magne"
       When I edit the user "Charles" "Magne"
       When I uncheck the option "Enable XiVO Client"
       When I submit
       When I start the XiVO Client
       Then I can't log in the XiVO Client as "charles", pass "magne"
       When I edit the user "Charles" "Magne"
       When I check the option "Enable XiVO Client"
       When I set the text field "Login" to ""
       When I set the text field "Password" to ""
       When I submit with errors
       When I set the text field "Login" to "charles"
       When I set the text field "Password" to "magne"
       When I submit
       Then I log in the XiVO Client as "charles", pass "magne"
~~~


Let's get a bit more technical to explain how this works.The main
problem was to make our
[Lettuce/Selenium](http://lettuce.it/ "Lettuce/Selenium") automatic
tests in Python communicate with a running instance of the XiVO Client
in C++.

Our first attempt got us to embed the XiVO Client in a C++ library, to
wrap this library into a Python module with
[SWIG](SWIG "http://www.swig.org/"), load this module when running
automatic tests and call some module functions to make the XiVO Client
do what we wanted, for example click on this button or fill that text
field. Of course, [C++ classes
friendship](http://en.wikipedia.org/wiki/Friend_class "C++ classes friendship")
was mandarory to avoid coding getters and setters everywhere. We got the
XiVO Client running within a Python module, but it was blocking the
execution of automatic tests. We then tried to make the XiVO Client run
in its own thread, while automatic tests were running in another.
Unfortunately, the Qt library we use to develop the XiVO Client does not
support running in a secondary thread as far as GUI is involved (and the
XiVO Client is almost only about GUI).

Our second attempt was greatly inspired from the first one, but we tried
to run the XiVO Client in its own process. We replaced calls to the
Python module by an IPC protocol through local domain UNIX sockets.
Basically, the Lettuce process sends the name of the function it is
executing along with its arguments and the XiVO Client reads them,
execute the given function and returns whether the function failed or
succeeded.

This is no more no less than the behavior of a remote control for the
XiVO Client. It does not have many buttons for now, but they are
functional and their number is growing.

[![XiVO Client remote
control](/public/xivosoft/.xivoclient-remotecontrol_m.jpg "XiVO Client remote control, janv. 2012")](/public/xivosoft/xivoclient-remotecontrol.png "XiVO Client remote control")

Of course this remote control "feature" is not released with official
XiVO Client versions. It is only activated when the XiVO Client is
compiled specifically for automatic tests.

For now, we only test the GNU/Linux version of the XiVO Client, even
though it is not the most used version. Ideally, we shoud test all
platform versions. But unless we stumble upon major differences between
different platform versions, we can rely on the [Qt
framework](http://qt.nokia.com/ "Qt framework") quality and its platform
abstraction features.

There is a [documentation
page](https://wiki.xivo.io/index.php/XiVO_1.2-Skaro/CTI_XiVO_Client_Qt_Tester "documentation page")
that explains how to use the remote control feature.

Links :  
[Our Lettuce
tests](https://git.proformatique.com/?p=official/xivo-acceptance.git;a=tree;f=web-interface/features;h=239ee123d5bfabb313efd1f787bb5a7638217396;hb=HEAD "Our Lettuce tests")  
[the XiVO Client git
repository](https://git.proformatique.com/?p=official/xivo-client-qt.git;a=summary "the XiVO Client git repository")

</p>

