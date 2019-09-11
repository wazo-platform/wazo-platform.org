Title: How we test xivo-dird
Date: 2014-12-03 21:23
Author: pcadotte
Slug: how-we-test-xivo-dird
Status: published

XiVO dird is a new directory service in XiVO. It will be used as the
entry pointfor lookups and reverse lookups in the near future. Dird is
the first service inXiVO that is developed with the objective of being
runnable on a separate machine.This objective made it essential to make
the service configurable so that dirdis not tied to an existing XiVO
installation.

Making the borders clear around xivo-dird made it possible to test
against dird'sinterface more easily than what used to be possible with
other services in XiVO.

Like any other service in XiVO, xivo-dird has a unit test suite that we
strive tomake as complete as possible. We also wrote a suite of
integration tests that canbe executed from a development machine without
a full installation of XiVO. Theintegration test suite uses xivo-dird as
a black box, changing the input only, typicallyconfiguration files,
files, web services or other resources depending on the testedback-end.
These tests are higher level than unit tests but not as high as the
oneswe usually have in xivo-acceptance that requires and sometimes test
manycomponents at the same time.

Some of the tools we use for the integration tests include:

-   docker to launch and stop xivo-dird quickly with different
    configuration
-   fig to coordinate our launched services, it starts all containers
    with the proper arguments to allow the whole system to work
-   nosetests to run the test suite
-   jenkins to execute the tests and report problems

The way these tests are structured, is quite simple at the moment. At
the rootof the xivo-dird project, an integration\_tests directory can be
found. In thisdirectory, there is a Makefile, a Dockerfile, an assets
folder and a suitefolder. Here's a quick description of each of these
elements.

**Dockerfile**

This is the file to build the test image that is used by the test suite.
It generatesa runnable docker container using the current branch.

**Makefile**

The Makefile is a helper to build the test image and pull somedocker
dependencies. make test-image can be used to generate a freshtest image
ready for testing.

**assets**

This directory contains many set of runnable configuration that areused
by the test suite. An asset consists of a fig.yml file to describethe
environment in which we want to run dird as well as allconfiguration
files that are required for this given test.

Here is an example of an asset directory:

~~~
% tree assets/xivo_users_multiple_xivo 
assets/xivo_users_multiple_xivo
├── confd_data
│   ├── america
│   │   └── 1.1
│   │       ├── infos
│   │       └── users
│   ├── asia
│   │   └── 1.1
│   │       ├── infos
│   │       └── users
│   ├── europe
│   │   └── 1.1
│   │       ├── infos
│   │       └── users
│   └── run_confd
├── etc
│   └── xivo-dird
│       ├── config.yml
│       └── sources.d
│           ├── america.yml
│           ├── asia.yml
│           └── europe.yml
└── fig.yml

10 directories, 12 files
~~~


**suite**

All integration test are in this directory, each TestCase class hasan
asset field that map the test to an asset. The BaseDirdIntegrationTestis
responsible of launching and stopping the environment for each testcase.

Here is an example fig file for the asset shown above:

~~~
% cat assets/xivo_users_multiple_xivo/fig.yml
dird:
  image: dird-test
  ports:
    - "9489:9489"
  volumes:
    - "./etc/xivo-dird:/etc/xivo-dird"
  links:
    - "america"
    - "asia"
    - "europe"
america:
  image: python:2.7
  volumes:
    - "./confd_data:/tmp"
  command: "/tmp/run_confd america"
europe:
  image: python:2.7
  volumes:
    - "./confd_data:/tmp"
  command: "/tmp/run_confd europe"
asia:
  image: python:2.7
  volumes:
    - "./confd_data:/tmp"
  command: "/tmp/run_confd asia"
~~~


The resulting architecture used for the test would look like the
following diagram.

![architecture.png](/images/blog/architecture/architecture.png "architecture.png, déc. 2014")

Since xivo-confd is not docker ready at the moment, we mocked the confd
serverwith a python SimpleHTTPServer and some static files. This allowed
us to havepredictable results for our tests without having to launch and
configure awhole XiVO server and still be able to test some common
cases, such as servernot started, 404 errors, etc.

Once we know that all of our back-end and that the core of dird is
completelytested, only one acceptance test is required to test the whole
chain ofinteraction.

This mode of testing is still new to our team, we will see if the
theoreticaladvantages that we get from this kind of segmentation is as
good in practice asit is on paper.

Detailed instructions are available in xivo-dird's README for those who
want totry running the test suite.

References:

-   [XiVO](http://xivo.io "XiVO")
-   [XiVO
    documentation](http://documentation.xivo.io "XiVO documentation")
-   [xivo-dird
    documentation](http://documentation.xivo.io/dev/system/xivo-dird/xivo-dird.html "dird documentation")
-   [xivo-dird source
    code](http://github.com/xivo-pbx/xivo-dird "dird source code")
-   [fig](http://www.fig.sh "fig")
-   [docker](http://docker.com "docker")

</p>

