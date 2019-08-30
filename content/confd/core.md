# Plugin Mechanism

`wazo-confd` resources are organized through a plugin mechanism. There are 2
main plugin categories:

* Resource plugins ;
* Association plugins.

## Resource plugins

A plugin that manages a resource (e.g. users, extensions, voicemails, etc). A
resource plugin exposes the 4 basic CRUD operations (Create, Read, Update,
Delete) in order to operate on a resource in a RESTful manner.

## Association plugins

A plugin for associating or dissociating 2 resources (e.g a `user` and a
`line`). An association plugin exposes an HTTP action for associating (either
`POST` or `PUT`) and another for dissociating (`DELETE`)
The following diagram outlines the most important parts of a plugin:

![plugin architecture](http://documentation.wazo.community/en/latest/_images/wazo-confd-plugin-architecture.png)

## Resource

Class that receives and handles HTTP requests. Resources use flask-restful for
handling requests.
There are 2 kinds of resources: ListResource for root URLs and ItemResource for
URLs that have an ID. ListResource will handle creating a resource (`POST`) and
searching through a list of available resources (`GET`).  ItemResource handles
fetching a single item (`GET`), updating (`PUT`) and deleting (`DELETE`).

## Service

Class that handles business logic for a resource, such as what to do in order
to get, create, update, or delete a resource. Service classes do not manipulate
data directly.  Instead, they coordinate what to do via other objects.
There are 2 kinds of services:

* _CRUDService_, for basic CRUD operations in _Resource plugins_ ;
* _AssociationService_, for association/dissociation operations in _Association plugins_.

## Dao

Data Access Object. Knows how to get data and how to manipulate it, such as SQL
queries, files, etc.

## Notifier

Sends events after an operation has completed. An event will be sent in a
messaging queue for each CRUD operation. Certain resources also need to send
events to other daemons in order to reload some configuration data. (i.e.
asterisk needs to reload the dialplan when an extension is updated)

## Validator

Makes sure that a resource’s data does not contain any errors before doing
something with it. A Validator can be used for validating input data or
business rules.


# Run Unit Tests

**requirements:**
```
apt-get install libpq-dev python-dev libffi-dev libyaml-dev
pip install tox
```

Finally:

    tox --recreate -e py27

# Run Integration Tests
[integration-tests]: #run-integration-tests

**requirements:** `docker`, then

```
cd ./integration_tests
pip install -U -r test-requirements.txt
make test-setup
```

Finally:

    make test

## Modified database

**requirement:** update `xivo-manage-db` repository.

    git clone https://github.com/wazo-platform/xivo-manage-db
    MANAGE_DB_DIR=../../xivo-manage-db make update-db

Then, [run integration tests][integration-tests].

## Modified wazo-provd

**requirement:** update `wazo-provd` repository.

    git clone https://github.com/wazo-platform/wazo-provd
    PROVD_DIR=../../wazo-provd make build-provd

Then, [run integration tests][integration-tests].

## Mounting libraries

In case you need to mount libraries (`xivo-dao`, `xivo-bus`, `lib-python`) inside the `wazo-confd` container:

1. Uncomment the `confd` volumes in `./integration_tests/assets/docker-compose.yml`
2. Set the environment variable

       export LOCAL_GIT_REPOS=/parent/directory/to/all/git/repos

3. Execute the steps above to run integration tests

# Profiling

**requirements:**

    pip install gprof2dot
    apt-get install graphviz

Set the `profile` directory configuration **What?**, then process the file the following command:

    gprof2dot -f pstats /path/to/file | dot -Tpng -o output.png
