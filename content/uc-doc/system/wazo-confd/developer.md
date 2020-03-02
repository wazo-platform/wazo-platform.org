---
title: 'Developer\''s Guide (wazo-confd)'
---

wazo-confd resources are organised through a plugin mechanism. There are
2 main plugin categories:

Resource plugins

:   A plugin that manages a resource (e.g. users, extensions,
    voicemails, etc). A resource plugin exposes the 4 basic CRUD
    operations (Create, Read, Update, Delete) in order to operate on a
    resource in a RESTful manner.

Association plugins

:   A plugin for associating or dissociating 2 resources (e.g a user and
    a line). An association plugin exposes an HTTP action for
    associating (either `POST` or `PUT`) and another for dissociating
    (`DELETE`)

The following diagram outlines the most important parts of a plugin:

![Plugin architecture of
wazo-confd](images/wazo-confd-plugin-architecture.png)

Resource

:   Class that receives and handles HTTP requests. Resources use
    [flask-restful](http://flask-restful.readthedocs.org) for handling
    requests.

    There are 2 kinds of resources: [ListResource]{.title-ref} for root
    URLs and [ItemResource]{.title-ref} for URLs that have an ID.
    [ListResource]{.title-ref} will handle creating a resource (`POST`)
    and searching through a list of available resources (`GET`).
    [ItemResource]{.title-ref} handles fetching a single item (`GET`),
    updating (`PUT`) and deleting (`DELETE`).

Service

:   Class that handles business logic for a resource, such as what to do
    in order to get, create, update, or delete a resource.
    [Service]{.title-ref} classes do not manipulate data directly.
    Instead, they coordinate what to do via other objects.

    There are 2 kinds of services: [CRUDService]{.title-ref} for basic
    CRUD operations in [Resource plugins]{.title-ref}, and
    [AssociationService]{.title-ref} for association/dissociation
    operations in [Association plugins]{.title-ref}.

Dao

:   Data Access Object. Knows how to get data and how to manipulate it,
    such as SQL queries, files, etc.

Notifier

:   Sends events after an operation has completed. An event will be sent
    in a messaging queue for each CRUD operation. Certain resources also
    need to send events to other daemons in order to reload some
    configuration data. (i.e. asterisk needs to reload the dialplan when
    an extension is updated)

Validator

:   Makes sure that a resource\'s data does not contain any errors
    before doing something with it. A [Validator]{.title-ref} can be
    used for validating input data or business rules.
