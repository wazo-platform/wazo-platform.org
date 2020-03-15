How to contribute to Wazo Platform code base
============================================

In order to contribute to Wazo Platform you need to be able to
retrieve the source code, edit the code, try your changes and contribute
the code to the Git repository.

# Getting the code

The source code for Wazo Platform is available on
[GitHub](https://github.com/wazo-platform). Our GitHub organization contains
over 200 repositories. Finding the one you want to contribute to can be a
daunting task.

The [documentation page](/documentation) can help you find
which repository you should be working on.
[Asking for help](#asking-for-help) is always an option when looking at the
less popular corners of the source code.

You can then
[clone](https://help.github.com/en/articles/cloning-a-repository) the
desired repositories on you hard drive and start coding.

# Editing the code

Most of Wazo Platform is written in Python, following the
[PEP8](https://www.python.org/dev/peps/pep-0008/) conventions. You can
use a tool such as [flake8](http://flake8.pycqa.org/en/latest/) to
validate that your code respects the standards. Some repositories also
include the appropriate configuration to check your code using the tox
command `tox -e linters`. More details in the [Style Guide](/contribute/style_guide)

Follow the [Guidelines](/contribute/guidelines) to create or improve services.

Respecting coding standards is not sufficient to warrant quality code.
Your contribution should not break any existing tests and when possible,
it should add tests for the code you are adding. We use 3 kind of tests.
unit tests, integration tests and acceptance tests.

If you need to create a new REST API, follow [the REST API guidelines](/contribute/rest).

## Unit tests

Unittests are small tests that exercise a function or method in your
code. These tests should be fast and should not depend on other services
running on your system, such as a database. It should also leave your
environment in the same state, no files laying around.

You can execute unittests with the following command

```ShellSession
$ tox -epy37
```

## Integration tests

Integration tests exercise a service as a black box. Each test uses
the public API of the service to assert that it passes. Our
integration tests use docker to avoid installing too many dependencies
on your system. You can find the integration tests in the
integration\_tests directory of most repositories. Executing the
following command from the root directory of a project should execute
all integration tests.

```ShellSession
$ tox -eintegration
```

If tox is not configured to execute integration tests, you can execute
the following commands.

```ShellSession
$ cd integration_tests
$ make test-setup
$ make test
```

## Acceptance tests

Acceptance tests are longer tests that uses Wazo Platform to test a feature
from end-to-end. These tests are usually longer to execute and require a
dedicated Wazo Platform. As a contributor you are not expected to
execute these tests if you are not contributing to them. Some of the
acceptance tests are automatic
[wazo-acceptance](http://github.com/wazo-platform/wazo-acceptance) and other
are executed manually at the end of each sprint.

## Trying your code

After writing your code and checking that it does not break any tests,
you should try it. The "easiest" way to do so is to use a virtual
machine with a working engine. You should avoid testing in a production
environment to avoid outage for you and your users. To install your test
engine follow the [install](/install) documentation.

Now that you have a test engine, you want to try your code on it. Before
starting I suggest you take a snapshot of your virtual machine to be
able to come back to a clean install whenever needed. Then you can use
[wdk](http://github.com/wazo-platform/wazo-sdk) to update the code running on
your test platform.

The installation instructions for wdk are contained in its
[README](https://github.com/wazo-platform/wazo-sdk/blob/master/README.md) as
well as its usage instructions.

## Debugging and profiling

To debug Asterisk follow [this guide](/contribute/debug_asterisk). To
debug daemons follow [this guide](/contribute/debug_daemon).

To profile python code follow [this guide](/contribute/profile_python).

# Contributing your code

Once you are satisfied with your modifications, you can submit a [pull
request](https://help.github.com/en/articles/creating-a-pull-request-from-a-fork).
At this point you should watch your pull request to see if anyone or
anything comments on it and respond to comments to eventually get your
contribution merged.

## Add new service

If you need to create a new service, follow [the new service guidelines](/contribute/new_service).

## Asking for help

The Wazo Platform developers can be contacted on our
[MatterMost](https://mm.wazo.community/wazo-platform/channels/town-square)
server.
