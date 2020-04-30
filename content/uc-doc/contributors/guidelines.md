---
title: Wazo Guidelines
---

## <a name="inter-process-communication"></a>Inter-process communication

Our current goal is to use only two means of communication between Wazo
processes:

-   a REST API over HTTP for synchronous commands
-   a software bus (RabbitMQ) for asynchronous events

Each component should have its own REST API and its own events and can
communicate with every other component from across a network only via
those means.

## <a name="service-api"></a>Service API

The current [xivo-dao](https://github.com/wazo-platform/xivo-dao) Git
repository contains the basis of the future services Python API. The API
is split between different resources available in Wazo, such as users,
groups, schedules\... For each resource, there are different modules :

-   service: the public module, providing possible actions. It contains
    only business logic and no technical logic. There must be no file
    name, no SQL queries and no URLs in this module.
-   dao: the private Data Access Object. It knows where to get data and
    how to update it, such as SQL queries, file names, URLs, but has no
    business logic.
-   model: the public class used to represent the resource. It must be
    self-contained and have almost no methods, except for computed
    fields based on other fields in the same object.
-   notifier: private, it knows to whom and in which format events must
    be sent.
-   validator: private, it checks input parameters from the service
    module.

## <a name="definition-of-wazo-daemon"></a>Definition of Wazo Daemon

The goal is to make Wazo as elastic as possible, i.e. the Wazo services
need to be able to run on separate machines and still talk to each
other.

To be in accordance with our goal, a Wazo daemon must (if applicable):

-   Offer a REST API (with encryption, authentication and accepting
    cross-site requests)
-   Be able to read and send events on a software bus
-   Be able to run inside a container, such as Docker, and be separated
    from the Wazo server
-   Offer a configuration file in YAML format.
-   Access the Wazo database through the `xivo-dao` library
-   Have a configurable level of logging
-   Have its own log file
-   Be extendable through the use of plugins
-   Not run with system privileges
-   Be installable from source
-   Service discovery with consul

Currently, none of the Wazo daemons meet these expectations; it is a
work in progress.
