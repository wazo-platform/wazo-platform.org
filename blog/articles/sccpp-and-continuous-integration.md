Title: SCCPp and continuous integration
Date: 2012-02-20 14:17
Author: nbouliane
Category: Software
Slug: sccpp-and-continuous-integration
Status: published

SCCPp is a small tool that we developed in parallel of our Asterisk sccp
channel. Its main purpose is to imitate a real cisco phone in a pure
virtual way. One of the main goal behind it is to be able to do
continuous integration. By coupling SCCPp with Asterisk testsuite and
Jenkins we are able to automate tests that we would normally do
manually. This way, when a commit is pushed, it trigger a task that
launch the script responsible to update and compile the source, to pass
every test in the list and to report if something went wrong.

Only basic test are implemented via SCCPp at the present moment. We can
simulate the full protocol exchange involved when a phone connect and
authenticate itself to the server. Another supported option is the
stress test of a configured device. In this mode, SCCPp start two
threads and dial the device at random interval. The goal here is to pass
through as much code as possible and to make sure there is no regression
in the code under known scenarios.

SCCPp doesn't support the RTP protocol (Real-Time Transport Protocol) at
the present moment. What it mean is that we can't simulate the
transportation of the voice from a device to another. The development of
SCCPp is still at an early stage, and many more features will be added
in the future.

As the complexity of the libsccp increase, we need more tests to ensure
that a change in the code, such a bug fix, do not introduce new faults.
Functional testing is only one part of the solution, even if it's a
powerful one to ensure that specific cases work well, it says nothing
about the internal. The other half of the solution is to unit test the
code. This is a method by which individual units of source code are
tested to ensure they perform properly. Fortunately, Asterisk has its
own framework that allow us to easily write unit test and to trigger
them to see if they pass correctly. In another post, we will present
what can be done with this Asterisk unit test framework and how it can
help to do TDD (Test Driven Development).

If you are interested to play with SCCPp, you can get the source code at
this address:
[http://git.proformatique.com/?p=off...](http://git.proformatique.com/?p=official/sccpp.git;a=summary "http://git.proformatique.com/?p=official/sccpp.git;a=summary")

</p>

