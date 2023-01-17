---
title: Type Hinting
---

Here are some examples and basics on typing. More information on the why and how to run type
checking can be found in [our style guide](style_guide.md) This is just a summary and some common
examples, but more examples on Type Hinting in Python can be found in the documentation for
[Python](https://docs.python.org/3.10/library/typing.html) and mypy also has a very helpful
[Cheatsheet](https://mypy.readthedocs.io/en/stable/cheat_sheet_py3.html)

## Basics {#basics}

You can type any variable _at or before_ its definition by placing a `: ` followed by the type after
it, eg. `potato: Potato`,

```python
from idaho import Potato

potato: Potato = Potato()  # Just an example, the type hint here is not required.
```

Any built-in type or class can be used as a type annotation as well as some specialized classes
classed [Generics](#generics)

You can type the return value with a `->` followed by the type between the end of the method and the
`:`, eg `def return_potato() -> Potato: ...`. If the function does not return anything

```python
def my_method(db: Database) -> None:
    self.db: Database = db
```

If there are no `return` statements or values, methods will still transparently return `None` behind
the scenes and thus should be typed with `-> None`. However, if a method _always_ raise an exception
you can use the special `NoReturn` type which indicates the code after will be inaccessible.

```python
from typing import NoReturn

def fail() -> NoReturn:
    raise Exception('This will never return anything')

def do_nothing() -> None:
    pass  # This method does nothing, but still "returns" None as it does not raise an exception.

class MyClass:
    def __init__(self) -> None:  # __init__ returns None
        ...
```

### Typing attributes {#typing-attributes}

```python
class MyClass:
    default_number: int = 1
    will_be_set_later: str = None  # type: ignore[assignment]

    def __init__(self, timeout: int = 15) -> None:
        self.timeout = timeout  # No need to type this as it is inferred from above
        self.names: list[str] = []  # when creating collections, it's important to type future contents
        self.setup()

    def setup(self) -> None:
        self.will_be_set_later = 'hello'
```

### Multiple types (Unions) {#union-types}

If multiple types are accepted they can be specified using the generic `Union`, which can also be
more succinctly expressed using the pipe symbol `|` as of python 3.10. _Note_: this can still be
used on older version of Python in annotation as long as you use
[lazy annotations](#lazy-annotations).

```python
from __future__ import annotations

from typing import Union

alphanumeric_list: list[int | str] = ['a', 1]
alphanumeric_list: list[Union[int, str]] = ['a', 1]
```

### Type classes vs instances {#type-class}

Using a class as the type, it indicates that the variable is an instance of said class. If you
instead wish to say that the variable is the class itself, for example for factories which receive
the class and return an instance, you can use the `type` (or `Type` < 3.9) generic. If the class is
defined in the same file, use [lazy annotations](#lazy-annotations) or put the class name in quotes.

```python
from __future__ import annotations

class MyClass:
    @classmethod
    def from_dict(cls: type[MyClass], data: dict[str, str]) -> MyClass: # or 'MyClass'
        return cls(**data)

def my_factory(factory_class: type[MyClass]) -> MyClass:
    return factory_class.from_dict({'test': 'hello'})

```

### Typing Async methods {#typing-async}

Although async methods and functions technically return coroutines, when using annotations, you
specify the actual return value of the function as if it were not async.

```python
from typing import Awaitable

async def get_user_ids() -> list[int]:
    return [1, 2, 3, 4, 5]

user_ids: list[int] = await get_user_ids()
user_ids_coroutine: Awaitable[list[int]] = get_user_ids()
```

### Type Stubs {#type-stubs}

Type stubs are [stub files (.pyi)](https://mypy.readthedocs.io/en/stable/stubs.html) that contain
the type definitions for libraries that are not themselves typed directly. They can be installed
through pip for type checking. They are less and less required as more and more libraries are using
types, but were used a lot when both Python 2 & 3 support was required. ex: - `types-requests` -
`types-pytz`. The main repo that collects all of these is called
[typeshed](https://github.com/python/typeshed), but stub files can also be included in projects,
even if that is no longer needed as the code can be directly typed.

### Lazy Annotations / `ìf TYPE_CHECKING:` {#lazy-annotations}

You can import `annotations` from `__future__` to delay the evaluation of annotations. Thus, they
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

This allows you to, for example:

- Create `TypedDict` or `Protocol` classes for typing (if these aren’t supported in the current
  version)
- Do some unfortunate workaround for typing in older language versions
- Import things from typing that don’t exist in older versions of Python like `Literal`
- Import things that either aren’t needed or could create problems if imported at runtime (e.g.
  avoid circular import errors).

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

## Parametric typing & Generics {#generics}

[Generics](https://mypy.readthedocs.io/en/stable/generics.html) are types that can be passed
parameters to ensure a useful definition. For example, it’s good to know your method receives a
list, but it’s not super useful if you don’t know what said list contains. So you can pass options
to the `list` type to specify its contents (eg. `list[int | str]`). You can create custom ones, but
a lot of builtin ones exist eg.:

### Generic built-in collections {#built-in-generics}

All the basic types that contain other types can be passed parameters to specify their contents (ie.
`list`, `tuple`, `dict`, `set`). Before Python 3.9 you have to use their capitalised namesakes
imported from `typing` if not using [lazy annotations](#lazy-annotations).

```python
import string

alphabet: list[str] = list(string.ascii_lowercase)
two_numbers: tuple[int, int] = (1, 2)
variable_numbers: tuple[int, ...] = (1, 2, 3, 4)
no_doubles: set[str] = {'a', 'b', 'a'}
scores: dict[str, float] = {'bob': 99, 'fred': 100}
```

_Note_: If you type a `tuple` it will expect exactly those types in that order. If you want to allow
a variable number of items in a tuple, type the first entry and follow it with an `...`, eg.
`tuple[int, ...]`

### Callables {#callables}

When passing around methods as callbacks you can use the built-in generic
`[Callable](https://docs.python.org/3/library/typing.html#typing.Callable)`. The first option is the
arguments and the second is the return value. For more complex cases see [Protocols](#protocols)

```python
from typing import Callable

def my_handler(name: str, timeout: int = 5) -> bool:
    with contextlib.suppress(KeyError):
        # do something
        return True
    return False

def process_handler(handler: Callable[[str, int], bool]) -> None:
    handler('test')

process_hander(my_handler)
```

### Literal values {#literals}

To allow only a specific set of values you can use
`[Literal](https://docs.python.org/3/library/typing.html#typing.Literal)`. It is useful for when you
expect specific strings like `'on'` or `'off'`. The standard library uses this for read/write modes
for example.

```python
from typing import Literal

the_answer: Literal[42] = 42  # No other int is accepted, but 42
mode: Literal['on', 'off'] = 'off'  # Only accept these two strings

def open(filename: str | Path, mode: Literal['rb', 'r']) -> BytesIO | StringIO:
    ...
```

### TypeVar {#typevar}

`[TypeVar](https://docs.python.org/3/library/typing.html#typing.TypeVar)` allows you to reference a
type without knowing it. For example, a generic method that receives a list of items and returns the
first. It doesn't matter what the list contains. Just that you will return the first item if it is
not empty.

```python from typing import TypeVar

T = TypeVar('T')

def get_first(items: list[T]) -> T | None:
    return items[0] if items else None
```

This allows for mypy and other type checkers to replace `T` based on what is passed to the function.
For example if you pass a list of `int` it knows that it we return a single `int` or `None`

## Protocols and structural typing {#protocols-strutural-typing}

(available since Python 3.8)

Protocols are used to implement essentially “static duck typing” 🦆. Where the actual type is not
important so much as what it implements. Do you _need_ a `list` or would anything that is iterable
work?

### Builtin types: {#built-in-types}

- `Iterable` an object that implements `__iter__` or `__getitem__`
- `Sequence` an iterable that defines `__len__` , `__getitem__` and a few others. Eg.

  ```python
  from typing import Sequence

  def check_len(items: Sequence[int], limit: int) -> bool:
      return len(items) <= limit
  ```

### Protocols {#protocols}

Protocols allow you type an object that has a specific signature. eg. implements a given method or
has a given property. You can also use them to handle more complex cases of callables.

```python
from __future__ import annotations

from typing import Protocol

class ComplexCallable(Protocol):
    def __call__(self, x: int = ..., /, timeout: int = 12) -> float:
        ...
```

## Typing Dynamic patterns {#typing-dynamic}

### Mixins {#typing-mixins}

Mixins can be challenging to type if they have implicit dependency on other interfaces (i.e. expect
the inheriting class to implement other methods used by the mixin implementation). Intersection
types are not supported yet, but would allow specifying a self-type that combines the mixin’s
interfaces.

Intersection types are equivalent to ad-hoc subclasses of the types in the intersection. To type a
mixin properly, the implicit dependencies must be made explicit, for example through a separate
protocol or ABC defining the required interface, which the mixin can subclass.

### `Self` with inheritance {#typing-self}

`Self` was introduced in 3.11, but is equivalent to `Self = TypeVar("Self", bound="MyClass")`. This
can be important for class methods that return instances of themselves because simply using the
class name with result in issues if the class is extended. In simple cases you can return the class
itself, but `Self` is a safer option.

```python
from typing import Self  # Self was added in 3.11

# For the same result on Python < 3.11 you can create a TypeVar bound to the class.
# Self = TypeVar("Self", bound="ParentClass")

class ParentClass:
   def return_self(self: Self) -> Self:
       return self

class ChildClass(ParentClass):
    def return_self(self: Self) -> Self:
        # If we had used `-> ParentClass` this would then return the wrong type as it is now `ChildClass`
        return super().return_self()
```

### Type Aliases {#type-aliases}

You can easily create aliases for types by simply assigning them to variables. They can also be
explicitly typed with `TypeAlias`, but it changes nothing functionally. This is no different than
manually specifying the type each time, but can be more readable especially when types get
complicated and it can avoid copy/paste errors and ensure the type is always the same.

```python
from typing import TypeAlias

HandleFunction = Callable[[FastAGI, DictCursor, list], None]
SetupFunction: TypeAlias = Callable[[DictCursor], None]
```

### Extra specificity with [New Types](https://mypy.readthedocs.io/en/stable/more_types.html#newtypes) {#new-types}

`[NewType](https://mypy.readthedocs.io/en/stable/more_types.html#newtypes)` can be used to add
increased specificity to a type allowing for a distinction between it and other values of the same
base type. For example, if you have a functions that frequently use User IDs and you want to
indicate that this is different from standard integers you can create a new `UserID` type and the
type checker will indicate an error if it instead receives simply an `int`.

```python
from typing import NewType

UserId = NewType('UserId', int)

def get_user(user_id: UserId) -> User:
    return User(user_id)


get_user(42)          # invalid
get_user(UserId(42))  # valid
```

This also enables quickly creating a thin abstraction over the underlying type, which helps reduce
future refactoring. The actual implementation type can later be changed(for example to a custom
class implementation) without breaking typing consistency everywhere and having to rewrite all
interfaces.

## Integrating into workflow {#integrating-into-workflow}

### Config {#config}

You can configure `mypy` with the rest of the tool in the `pyproject.toml` file. Here is an example
config entry for a fully typed or new project.

```python
[tool.mypy]
python_version = "3.10"
show_error_codes = true
check_untyped_defs = true
warn_unused_configs = true
disallow_untyped_calls = true
disallow_untyped_defs = true
disallow_incomplete_defs = true
warn_unused_ignores = true
strict_equality = true
strict_concatenate = true
no_warn_no_return = true

[[tool.mypy.overrides]]
module = [
    "*.tests.*",
    "integration_tests.suite.*",
]
disallow_untyped_defs = false
disallow_untyped_calls = false
```

If you want to slowly add typing to an existing project you can start with a more relaxed config
that will allow for some untyped or partially untyped functions.

```python
[tool.mypy]
python_version = "3.10"
show_error_codes = true
check_untyped_defs = true
warn_unused_configs = true
follow_imports = "skip"
ignore_missing_imports = true
```

### **Pre-commit** {#pre-commit}

To Install and run

```bash
pip install pre-commit
# To run automatically as hook
pre-commit install
# To run manually
pre-commit run --all-files
```

Example config:

```yaml
# See https://pre-commit.com for more information
repos:
  - repo: https://github.com/PyCQA/flake8
    rev: '6.0.0'
    hooks:
      - id: flake8
        # Required to make flake8 read from pyproject.toml for now :(
        additional_dependencies: ['flake8-pyproject']
  - repo: https://github.com/psf/black
    rev: 22.12.0
    hooks:
      - id: black
  - repo: https://github.com/pre-commit/mirrors-mypy
    rev: v0.991
    hooks:
      - id: mypy
        language_version: '3.10'
        additional_dependencies:
          # Only include the stubs required for your project
          - 'types-flask'
          - 'types-psycopg2'
          - 'types-pytz'
          - 'types-pyyaml'
          - 'types-requests'
          - 'types-setuptools'
          - 'types-werkzeug'
```

### Tox {#tox}

We can also use `tox` to run mypy with our other linters via `pre-commit`. This allows for a unified
workflow, and it is run in our CI.

```
[testenv:linters]
basepython = python3.10
skip_install = true
deps = pre-commit
commands = pre-commit run --all-files
```

## Editor integrations {#editor-integration}

### PyCharm {#pycharm}

[PyCharm](https://www.jetbrains.com/pycharm/download/#section=linux) supports Type Hinting and code
completion out of the box.

### VSCode {#vscode}

[VSCode](https://code.visualstudio.com/download) supports type checking via the
[Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance) extension
and can be enabled by adding this option to your `settings.json` file.

```json
{"python.analysis.typeCheckingMode": "basic"}  # or "strict"
```

Also, the [mypy plugin](https://marketplace.visualstudio.com/items?itemName=matangover.mypy)
directly
[supports mypy as the type checker](https://code.visualstudio.com/docs/python/linting#_mypy).

### Jedi {#jedi}

VSCode, Vim, Emacs, Kate and many others can also make use of them via
[Jedi](https://github.com/davidhalter/jedi).

## Special cases {#special-cases}

### Unknown type {#unknown-type}

If it is not possible to know what type a function can return, or if it can accept any value, you
can use `TypeVar` to pass through the value or use `Any` which matches any type. Try to avoid `Any`
as much as possible though and instead use TypeVar or [Generics](#generics).

### Ignoring types {#ignoring-types}

In rare cases it might be required to tell type checkers to ignore a line of code.

```python
test: int  # type: ignore
# https://mypy.readthedocs.io/en/stable/error_codes.html#error-codes
test: int = None  # type: ignore[error-code]
```

For example, sometimes variables are set to `None`, but are initialized before anything is run, and
thus are never really `None`. In theses cases, you can ignore the type for assignment only.

```python
from configparser import RawConfigParser

MY_CONFIG: RawConfigParser = None  # type: ignore[assignment]

def is_debug() -> bool:
  return MY_CONFIG['DEBUG'] is True  # mypy knows this is not None


def init() -> None:
    global MY_CONFIG
    with open('config.ini') as f:
        config = RawConfigParser()
        config.read_file(f)
        MY_CONFIG = config
```
