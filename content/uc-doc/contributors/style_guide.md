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

### Black

When possible, use black to validate your code.

#### Example:

```shell
tox -e black
```

### Avoid backslashes for escaping

When possible, avoid using backslashes to separate lines.

#### Bad Example:

```python
user = session.query(User).filter(User.first_name == first_name)\
                          .filter(User.last_name == last_name)\
                          .filter(User.number == number)\
                          .all()
```

#### Good Example:

```python
user = (session.query(User).filter(User.first_name == first_name)
                           .filter(User.last_name == last_name)
                           .filter(User.number == number)
                           .all())
```

### Strings {#strings}

Avoid using the `+` operator for concatenating strings. Use string interpolation ("f-strings")
instead.

#### Bad Example:

```
phone_interface = 'SIP' + '/' + username + '-' + password
```

#### Good Example:

```
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

### Conditions {#conditions}

Avoid using parenthesis around if statements, unless the statement expands on multiple lines, or you
need to nest your conditions.

#### Bad Examples:

```python
if (x == 3):
    print("condition is true")

if (x == 3 and y == 4):
    print("condition is true")
```

#### Good Examples:

```python
if x == 3:
    print("condition is true")

if x == 3 and y == 4:
    print("condition is true")

if (extremely_long_variable == 3
    and another_long_variable == 4
    and yet_another_variable == 5):

    print("condition is true")

if (2 + 3 + 4) - (1 + 1 + 1) == 6:
    print("condition is true")
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

    def _prepare_expected_user(self, first_name: str, last_name: str, number: int) -> User:
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

When possible code should include type hints to help avoid ambiguity, help with debugging and, allow
for static type checking. More examples on Type Hinting in Python can be found in the documentation
for [Python](https://docs.python.org/3.10/library/typing.html). Mypy also has a very helpful
[Cheatsheet](https://mypy.readthedocs.io/en/stable/cheat_sheet_py3.html)

### Clarity

This allows one to clearly identify what a function receives and what it returns. The more precise
you can get with your typing the easier the code will be to understand.

#### Bad Example:

```python
def get_user(user_id):
    user = find_user(user_id)
    if not user:
      rais UserNotFound(user_id)
    return user
```

In this example, it is unclear what we are dealing with. Is the `user_id` a `str`, an `int`, a
`UUID`? What is the `user` we return? A `User` object, a dict (if so what keys?), a name?

#### Good example:

```python
from typing import TypedDict, Union

UserData = TypedDict('UserData', {'first_name': str, 'last_name': str, 'email': Union[str, None]})


def get_user(user_id: str) -> UserData:
    user = find_user(user_id)
    if not user:
      rais UserNotFound(user_id)
    return user
```

### Running the type checker (mypy) {#typing-checking}

We use [`mypy`](https://mypy.readthedocs.io/en/stable/) to do type checking, and it is run via
[`pre-commit`](https://pre-commit.com/). It can either be run automatically as a git pre-commit hook
(after `pre-commit install` in your repo), manually with `pre-commit run --all-files` or via tox
with `tox -e linters`. It is configured in the `pyproject.toml` file.

### Lazy Annotation / `ìf TYPE_CHECKING:` {#typing-lazy-evaluation}

You can import `annotations` from `__future__` to delay the evaluation of annotations. So, then they
are only evaluated by type checkers or if you specifically inspect that type in your code.

If you have annotations it’s always good to use this import since:

- It prevents wasted processing of annotations at runtime
- It allows you to use classes that are defined in the same file, or currently being defined, as
  type annotations
- It allows you to use features and syntax of later versions of Python if your type checker is run
  with them. E.g. You can use the union operator from Python 3.10 in code that runs in 3.7 at
  runtime so long as your type checking is done with 3.10 or later and you use the lazy evaluation.

You can also use `if TYPE_CHECKING:` to encompass code that is only necessary for type checking or
that you don’t want to run at runtime.

This allows you to for example:

- Create `TypedDict` or `Protocol` classes for typing (if these aren’t supported in the current
  version)
- Do some unfortunate workaround for typing in older languages
- Import things from typing that don’t exist in older versions of Python like `Literal`
- Import things that either aren’t needed or could create problems if imported at runtime.

#### Example:

```python
from __future__ import annotations

import threading
from typing import TYPE_CHECKING


if TYPE_CHECKING:
    from typing import Callable, Collection, TypedDict  # don't exist in 3.7

    from wazo_auth_client.client import AuthClient  # only imported when type checking

    Callback = Callable[[Collection[str]], None]
    CallbackDict = TypedDict('CallbackDict', {'method': Callback, 'details': bool})


class TokenRenewer:
    def __int__(self, auth_client: AuthClient) -> None:
        self._auth_client = auth_client
        self._callback_lock = threading.Lock()
        self._callbacks: list[CallbackDict] = []

    def subscribe_to_token_change(self, callback: Callback) -> None:
        with self._callback_lock:
            self._callbacks.append({'method': callback, 'details': False})

```
