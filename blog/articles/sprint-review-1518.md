Title: Sprint Review 15.18
Date: 2015-11-13 12:00:00
Author: sduthil
Category: XiVO IPBX
Tags: XiVO, development
Slug: sprint-review-1518
Status: published

Hi everyone, this release was delayed by a week because we moved our development
office in another spot in Quebec City. It's smaller, but more adapted to our
team size (there are 6 of us now, and the previous office was designed for more
than 10 people). And we managed to keep [all our
phones](http://blog.xivo.io/we-are-6-and-yes-we-have-more-than-150-phones.html).
Also, we've been told it was hard to know when the next release was due, so
we've added the planned release dates in the
[Roadmap](http://projects.xivo.io/projects/xivo/roadmap). Here are the news for
the version 15.18 of XiVO.

New features in this sprint
---------------------------

**REST API:** A new API for managing SCCP accounts has been added. The API can
be used for creating SCCP accounts and associating them with users on a XiVO
server. This API also offers third parties, such as developers or
administrators, the flexibility of configuring all of the advanced SCCP
parameters offered by asterisk. This new API helps us expand on our goal of
offering a more customizable and flexible system ideal for use in a wide range
of environments, such as cloud infrastructures.

**Fax:** The fax feature in the XiVO Client may now be used with encryption and
NAT. We are fixing these issues so that we can make the XiVO Client encryption
usable by default, to allow the new authentication system to be used (which will
allow LDAP authentication).

Ongoing features
----------------

**HTTPS:** We continue to extend the use of encryption for communication between
XiVO components. From this version, consul and xivo-agent may only communicate
over HTTPS. The goal is to allow XiVO components to be installed on different
machines without sending important information in clear text, so that the load
may be easily balanced in order to increase the maximum number of calls that
XiVO can sustain.

**Lines:** We are revamping the web interface in a similar fashion to what was done for
voicemails. The goal is to make configuration of advanced parameters easier while
still keeping the interface simple.

**CTI:** We are also working on making XiVO Client statuses to be visible across
multiple XiVO servers. This means that we can see whether a user is on the phone
or available, even if he is registered on another XiVO server.

**Caller ID:** Finally, we are changing the system of incoming caller ID lookup,
so that it includes your personal contacts. This means that, when one of your
personal contacts calls you, instead of seeing only her number, you will see her
name (that you entered) along with her number.

Technical features
------------------

**Polycom phones:** the new firmwares VVX 5.3.1 and SoundStation 4.0.9 are available.

**Snom phones:** the new firmware 8.7.5.28 is available.

---

See you at the next sprint review.

Sources:

* [XiVO 15.18 Roadmap](http://projects.xivo.io/versions/234" XiVO 15.18 Roadmap")
* [xivo-confd Changelog](http://documentation.xivo.io/en/latest/api_sdk/rest_api/confd/changelog.html)
