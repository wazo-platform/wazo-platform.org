Title: XiVO 1.2
Date: 2012-02-14 19:35
Author: quintana
Slug: xivo-12
Status: published

As we enter 2012, we continue our development to better meet market
expectations allowing XiVO to be deployed in more companies. XiVO is a
real open and free alternative for your business phone system and it
will allow you to go even further. It is with great pleasure that I
announce the arrival of this new major release of XiVO which is also our
last considering that our development model is replaced by the agile
methodology (SCRUM).

Why do we change ?

Just because we want to be closer to your requests, be able to stand
out, constantly innovate and for this we need a new vision of
development. It's been several months since we changed our habits, our
ways of building software, our vision of what a software is and we will
continue in that direction. We still have a long way to go but it only
makes XiVO better for everyone.

![xivo-web-1-2.png](/public/.xivo-web-1-2_m.jpg "xivo-web-1-2.png, fév. 2012")

In this new release we have upgraded the operating system from Lenny to
Squeeze, updated Asterisk by installing and using the last “Long Term
Supported” 1.8 version. These major changes are not only naturally
bringing us a bunch of new native functionalities but also better
performance and stability.

Regarding XiVO, we reviewed our provisioning server which was designed
at the beginning of XiVO and was not suited any more to the big
architectures we are targeting.

We have refreshed the web interface in terms of functionality and
ergonomics to meet the new functionalities provided by Asterisk. We also
changed the way configuration is done by using a new server dedicated to
configuration management.

The news also made us realize that we were not sure where we go with
mysql and we chose to use Postgres as a basis to save our
configurations.TDM card drivers are also updated when this new release
is installed.

CTI server and XiVO client were also mainly rewritten and refactored.

With this new release we also started to work on refactoring some
features which are not delivered now any more. At first, high
availability and contact center are our current priorities and will be
offered in the next coming releases.Our development method is based on
short iterations of 2 weeks, which will produce a finished and working
product. So every 2 weeks a new release is produced and you will be able
to upgrade and enjoy bug fixes and new features. Do not hesitate to
follow http://projects.xivo.io and http://documentation.xivo.io/ to get
a better view.

We will go through our process in more details in a later post to
describe what we have set up in term of tests, documentation, bug
tracking etc ....

Below what's new in this release at a glance :

-   Asterisk 1.8 (New options, SSL authentication, etc ...)
-   Web interface
    -   New way of defining schedules
        -   Time zones
        -   More than one time slice per schedule
        -   More than one action when on closed
        -   Same schedule can be applied to more than one target
            (incoming calls / internal)
    -   Call pickups groups are more flexible, can include not only
        group of users but also queues and users.
    -   SSL certificates management
        -   Can be created, updated and deleted using the interface. Can
            also be associated to different objects ( SIP accounts, CTI
            server ....)
    -   Ergonomics improvements
        -   On session expiration, last page is displayed on reconnect.
        -   Sort per columns
        -   Automatic id and password generation for user accounts
        -   Edited object reference appears on all tabs
        -   Dynamic search on all objects lists (i.e. group
            members selected)
        -   Error report on CSV import
        -   Displays free extensions (add/edit users, groups ...)
        -   Remembers last search and sort order, per object.
        -   links *create* open in a new tab
        -   Stay on current tab on page reload
-   Sip Accounts (lines) are now separated from users
-   Provisioning is completely redesigned to incorporate new server.
    -   New provisioning server integration
-   Queue penalty
-   MWI remote subscribing
-   Outbound calls redesigned
-   Paging
-   Queue logger daemon removed.

</p>

