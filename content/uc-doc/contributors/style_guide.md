---
title: Style Guide
---

## Syntax {#syntax}

### License {#license}

Python files the GPLv3 license. A blank line should separate the license from the imports

#### Example:

```python
# Copyright 2023 The Wazo Authors  (see the AUTHORS file)
# SPDX-License-Identifier: GPL-3.0-or-later

import argparse
```

### Spacing {#spacing}

- Lines should not go further than 80 to 100 characters.
- In Python, indentation blocks use 4 spaces
- Imports should be sorted alphabetically
- Separate module imports and `from` imports with a blank line

#### Example:

```python
import argparse
import datetime
import os
import re
import shutil
import tempfile

from io import StringIO
from urllib.parse import urlencode
```

### General Style Rules

To try and maintain a clean and consistent code base we use `black`, which is a tool that enforces a
slightly stricter subset of Python's [PEP8](https://peps.python.org/pep-0008/) and `flake8`. There
is a good explanation of the rules and reasons on
[its website](https://black.readthedocs.io/en/stable/the_black_code_style/current_style.html). You
can run linters in all projects via `tox` with `tox -e linters` to check if your code is correctly
formatted. The CI will run this automatically too and fail if the code isn't conform.

In newer projects we also have [`pre-commit`](https://pre-commit.com/) to run and apply the fixes
automatically in some cases as well as [`mypy`](https://mypy.readthedocs.io/en/stable/) for static
type checking (see [type checking below](#typing). Pre-commit can be installed via pip
(`pip install pre-commit`) and either run manually via `pre-commit run --all-files` or automatically
as a hook (just run `pre-commit install` in the repo and it will run automatically in future before
each commit). For backwards compatibility it can also be run via `tox -e linters`.

### Strings {#strings}

Avoid using the `+` operator for concatenating strings. Use string interpolation ("f-strings")
instead.

#### Bad Example:

```python
phone_interface = 'SIP' + '/' + username + '-' + password
```

#### Good Example:

```python
phone_interface = f'SIP/{username}-{password}'
```

### Comments {#comments}

Redundant comments should be avoided. Instead, effort should be put on making the code clearer.

#### Bad Example:

```python
# Add the meeting to the calendar only if it was created on a week day
# (monday to friday)
if meeting.day > 0 and meeting.day < 7:
    calendar.add(meeting)
```

#### Good Example:

```python
def created_on_week_day(meeting: Meeting) -> bool:
    return 0 < meeting.day < 7


if created_on_week_day(meeting):
    calendar.add(meeting)
```

### Use functions for clarity

Consider refactoring your statement into a function if it becomes too long, or the meaning isn't
clear.

#### Bad Example:

```python
if price * tax - bonus / reduction + fee < money:
    product.pay(money)
```

#### Good Example:

```python
def calculate_price(price: float, tax: float, bonus: float, reduction: float, fee: float) -> float:
    return price * tax - bonus / reduction + fee

final_price = calculate_price(price, tax, bonus, reduction, fee)

if final_price < money:
    product.pay(money)
```

## Naming {#naming}

- Class names are in `PascalCase` (Upper Camel Case)
- File, method and variable names are in `lower_snake_case`
- "constants" are in `UPPER_CASE`

### Conventions for functions prefixed by `find`:

- Return None when nothing is found
- Return an object when a single entity is found
- Return the first element when multiple entities are found

#### Example:

```python
def find_by_username(username: str) -> User | None:
    users = [user1, user2, user3]
    user_search = [user for user in users if user.username == username]

    if len(user_search) == 0:
        return None

    return user_search[0]
```

### Conventions for functions prefixed by `get`:

- Raise an Exception when nothing is found
- Return an object when a single entity is found
- Return the first element when multiple entities are found

#### Example:

```python
def get_user(user_id: str) -> User:
    users = [user1, user2, user3]
    user_search = [user for user in users if user.userid == user_id]

    if len(user_search) == 0:
        raise UserNotFoundError(user_id)

    return user_search[0]
```

### Conventions for functions prefixed by `find_all`:

- Return an empty list when nothing is found
- Return a list of objects when multiple entities are found

#### Example:

```python
def find_all_users_by_username(username: str) -> list[User]:
    users = [user1, user2, user3]
    user_search = [user for user in users if user.username == username]

    return user_search
```

### Magic numbers {#magic-numbers}

Magic numbers should be avoided. Arbitrary values should be assigned to variables with a clear name.

#### Bad example:

```python
class TestRanking(TestCase):

    def test_ranking(self) -> None:
        rank = Rank(1, 2, 3)

        self.assertEquals(rank.position, 1)
        self.assertEquals(rank.grade, 2)
        self.assertEquals(rank.session, 3)
```

#### Good example:

```python
class TestRanking(TestCase):

    def test_ranking(self) -> None:
        position = 1
        grade = 2
        session = 3

        rank = Rank(position, grade, session)

        self.assertEquals(rank.position, position)
        self.assertEquals(rank.grade, grade)
        self.assertEquals(rank.session, session)
```

### Assertions {#assertions}

Using `assert` in production code is accepted as long as it is _not_ used for validation of
untrusted input. It must only be used to document critical expectations, which if violated would
result in unexpected behavior in the code following the `assert`. It can also be used in combination
with type annotations to provide information to a static type checker for
[type narrowing](https://mypy.readthedocs.io/en/stable/type_narrowing.html).

#### Bad example:

```python
    def get_contacts(self, contact_source_id: str) -> PhonebookSourceInfo:
        try:
            assert database.contact_source_exists(contact_source_id)
        except AssertionError:
            raise LookupError('Contact source id "{contact_source_id}" does not exist')
        ...
```

In this case `assert` is used to validate an expected error condition which must be accounted for
and handled. Instead, simply use a conditional statement(e.g.
`if not database.contact_source_exists(contact_source_id): ...`) to validate those kinds of
conditions and act appropriately.

#### Good example:

```python
    def get_contacts(self, contact_source_id: str) -> PhonebookSourceInfo:
        contact_source = database.get_contact_source(contact_source_id)
        if contact_source['type'] == 'phonebook':
            return get_phonebook_contacts(contact_source)

    def get_phonebook_contacts(self, source_data: dict):
        assert 'phonebook_uuid' in source_data
        phonebook_key = PhonebookKey(uuid=source_data['phonebook_uuid'])
        ...
```

Here, the assertion indicates that the code of `get_phonebook_contacts` expects its input to have a
specific key, and is not designed to be used with arbitrary arguments that do not contain this key,
and that there is no intention to handle such a case. An `AssertionError` resulting from a violation
of that expectation would signal, hopefully during testing, that the function is not used properly
by the surrounding code. This is similar to the use of static type annotations in informing
developers on the intended usage of interfaces and guaranteeing correctness of a part of the
implementation by detecting potential bugs that could otherwise remain silent.

## Tests {#tests}

### Place tests along side the code

Tests for a package are placed in their own folder named `tests` inside the package.

#### Example:

```
├── package1
│   ├── __init__.py
│   ├── mod1.py
│   └── tests/
│       ├── __init__.py
│       └── test_mod1.py
├── package2/
│   ├── __init__.py
│   ├── mod9.py
│   └── tests/
│       ├── __init__.py
│       └── test_mod9.py
```

### Short and clear tests

Unit tests should be short, clear and concise in order to make the test easy to understand. A unit
test is separated into 3 sections:

- Preconditions / Preparations
- Thing to test
- Assertions

Sections are separated by a blank line. Sections that become too big should be split into smaller
functions.

#### Example:

```python
class UserTestCase(TestCase):

    def test_full_name(self) -> None:
        user = User(firstname='Bob', lastname='Marley')
        expected = 'Bob Marley'

        fullname = user.full_name()

        self.assertEquals(expected, fullname)

    def _prepare_expected_user(self, first_name: str, last_name: str, number: str) -> User:
        user = User()
        user.first_name = first_name
        user.last_name = last_name
        user.number = number
        return user

    def _assert_users_are_equal(self, expected_user: User, actual_user: User) -> None:
        self.assertEquals(expected_user.first_name, actual_user.first_name)
        self.assertEquals(expected_user.last_name, actual_user.last_name)
        self.assertEquals(expected_user.number, actual_user.number)

    def test_create_user(self):
        expected = self._prepare_expected_user('Bob', 'Marley', '4185551234')

        user = create_user('Bob', 'Marley', '4185551234')

        self._assert_users_are_equal(expected, user)
```

## Exceptions {#exceptions}

### Don't use exceptions for flow control

Exceptions should not be used for flow control. Raise exceptions only for edge cases, or when
something that isn't usually expected happens.

#### Bad Example:

```python
def is_user_available(user: User) -> bool:
    if user.available():
        return True
    raise Exception("User isn't available")

try:
    is_user_available(user)
except Exception:
    disable_user(user)
```

#### Good Example:

```python
def is_user_available(user: User) -> bool:
    return user.available()


if not is_user_available(user):
    disable_user(user)
```

### Avoid throwing a generic `Exception`

Use one of Python's built-in Exceptions, or create your own custom Exception class. This helps
ensure that the cause of the Exception is clear and allows you to safely catch expected exceptions
and not accidentally silence unexpected ones. A list of exceptions is available on
[the Python documentation website](https://docs.python.org/3/library/exceptions.html).

#### Bad Example:

```python
def get_user(user_id: str) -> User:
    user = session.query(User).get(user_id)

    if not user:
        raise Exception("User not found")
```

#### Good Example:

```python
class UserNotFoundError(LookupError):

    def __init__(self, user_id: str) -> None:
        super().__init__(f"User with id {user_id} not found")

def get_user(user_id: str) -> User:
    user = session.query(User).get(user_id)

    if not user:
        raise UserNotFoundError(userid)
    return user
```

### Always specify an Exception in `except:` blocks

Never use `except:` without specifying any exception type. The reason is that it will also catch
important exceptions, such as `KeyboardInterrupt` and `OutOfMemory` exceptions, making your program
unstoppable or continuously failing, instead of stopping when wanted. This also avoids accidentally
catching unexpected issues which then fail silently.

#### Bad Example:

```python
try:
    get_user(user_id)
except:
    logger.exception("There was an error")
```

#### Good Example:

```python
try:
    get_user(user_id)
except UserNotFoundError as e:
    logger.error(e.message)
    raise
```

## Type Hinting {#typing}

When possible, code should include [type hints](https://peps.python.org/pep-0484) to help avoid
ambiguity, help with debugging and, allow for static type checking. For some common use cases and
more examples, please see [Type hinting examples](/uc-doc/contributors/typing).

### Clarity

Type hinting allows one to clearly identify what a function receives and what it returns. The more
precise you can get with your typing the easier the code will be to understand.

#### Bad Example:

```python
def get_user(user_id):
    user = find_user(user_id)
    if not user:
      raise UserNotFound(user_id)
    return user
```

In this example, it is unclear what we are dealing with. Is the `user_id` a `str`, an `int`, a
`UUID`? What is the `user` we return? A `User` object, a dict (if so what keys?), a name?

#### Good example:

```python
from typing import TypedDict, Union, TYPE_CHECKING

class UserData(TypedDict):
    first_name: str
    last_name: str
    email: str | None


def get_user(user_id: str) -> UserData:
    user = find_user(user_id)
    if not user:
      raise UserNotFound(user_id)
    return user
```

### Running the type checker (mypy) {#typing-checking}

We use [`mypy`](https://mypy.readthedocs.io/en/stable/) to do type checking, and it is run via
[`pre-commit`](https://pre-commit.com/). It can either be run automatically as a git pre-commit hook
(after `pre-commit install` in your repo), manually with `pre-commit run --all-files` or via tox
with `tox -e linters`. It is configured in the `pyproject.toml` file.

### Laziness

Any file that contains type annotations should, ideally, include
`from __future__ import annotations` at the top. This ensures:

- We don't waste effort evaluating types at runtime
- We can use features from later version of Python without errors at runtime
- You can reference classes before they are defined

Always including it will avoid accidentally forgetting it when adding new types too. See more about
[lazy type annotations here](/uc-doc/contributors/typing#lazy-annotations)
