Title: Sprint review 15.11
Date: 2015-06-12 14:25
Author: sduthil
Category: XiVO IPBX
Tags: XiVO, authentification, consul, development, software, téléphonie, web-interface, xivo
Slug: sprint-review-1511
Status: published

This sprint we have worked on various subjects regarding REST APIs. REST
APIs enable a more customizable and flexible management of XiVO server.
They also enable the development of third-party features. For example,
you could create a new management interface that would replace the
current web interface; or you could prepare a mass-update of all the
users on the server.

### New in this sprint:

-   The fax xlet indicates whether the fax has been successfully sent
    or not. This means that when sending a fax, you see a waiting
    indicator, and after a few seconds, the fax xlet shows a
    confirmation or an error message.

<!-- -->

-   The switchboard newly supports Polycom VVX400 and VVX410. The
    switchboard is now compatible with [8 phone
    models](http://documentation.xivo.io/en/latest/administration/switchboard/switchboard.html#supported-devices "8 phone models")
    from Aastra, Polycom, Snom and Yealink.

<!-- -->

-   Old call records and statistics will be automatically removed
    (default: older than 1 year). Depending on your country, legislation
    may restrict the period of personal data storage. Also, accumulating
    call records and statistics is often useless and
    degrades performances. You have the possibility of developing
    scripts to archive call records and statistics before XiVO
    deletes them.

<!-- -->

-   Documentation for REST APIs are available at <http://api.xivo.io>.
    The documentation was built with
    [Swagger](http://petstore.swagger.io/ "Swagger"). Swagger is a web
    framework specifically aimed at documenting REST APIs. It also
    allows direct interaction with the APIs via the website.

### Also in this sprint, but more technical:

-   Asterisk updated from 11.17.0 to 11.17.1
-   DAHDI updated from 2.10.0 to 2.10.1

### Work done in this sprint, but not yet ready:

-   Function keys will be manageable via a REST API. This will allow
    administrators to manage function keys more easily (creation and
    update), by applying templates of function keys to a set of users.
    In a more distant future, this will also allow users to manage their
    own function keys.

<!-- -->

-   Contacts can be bookmarked and users will be able to list their
    bookmarked contacts. This also opens the way for personal contacts
    to be accessible for each user from anywhere.

<!-- -->

-   Users will be able log in their XiVO Clients using
    LDAP authentication. This will remove the constraint for users to
    remember one more password. It will also reduce the amount of
    configuration needed for each user by the administrator.

<!-- -->

-   REST APIs will be usable from anywhere, but only by
    authorized people/services. Currently most REST APIs are only usable
    from the XiVO server and exposing them to the outside is a bad idea.
    So we are adding an authentication system to these APIs to protect
    them, so that they can be exposed.

See you for the next sprint review.

Source:

[15.11 Roadmap](http://projects.xivo.io/versions/227 "15.11 Roadmap")

</p>

