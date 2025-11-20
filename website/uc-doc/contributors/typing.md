---
title: Type Hinting
---

This is an introduction on the basics of static typing in Python. More information on the why and
how of static type checking can be found in [our style guide](/uc-doc/contributors/style_guide).

This guide mostly assumes features available in Python 3.11.

Beyond this summary and these examples, more information on type hinting in Python can be found in
the [official Python documentation](https://docs.python.org/3.11/library/typing.html), and the
[mypy type checker documentation](https://mypy.readthedocs.io/en/stable/cheat_sheet_py3.html).

## Basics {#basics}

You can type any variable _at or before_ its definition by placing a `: ` followed by the type after
it, eg. `potato: Potato`,

```python
from idaho import Potato

potato: Potato = Potato()  # Just an example, the type hint here is not required.

```

Any built-in type or class can be used as a type annotation, as well as some specialized classes
subclassed from [Generic](#generics).

You can type the return value with a `->` followed by the type between the end of the method and the
`:`, eg `def return_potato() -> Potato: ...`.

If the function does not return anything, it should be typed with `-> None`.

```python
def my_method(db: Database) -> None:
    self.db: Database = db
```

If there are no `return` statements or values, methods will still transparently return `None` behind
the scenes and thus should be typed with `-> None`.

However, if a method _always_ raises an exception, you can use the special `NoReturn` type to
indicate the method will _not_ return, and any code following a call to the method will be
inaccessible.

See also [assert_never](https://docs.python.org/3.11/library/typing.html#typing.assert_never) to
debug such situations.

```python
from typing import NoReturn, assert_never

def fail() -> NoReturn:
    raise Exception('This will never return anything')

def do_nothing() -> None:
    pass  # This method does nothing, but still "returns" None as it does not raise an exception.

class MyClass:
    def __init__(self) -> None:  # __init__ returns None
        ...

    def do_something(self) -> None:
        try:
            fail()
            assert_never(do_nothing()) # This will never be reached as fail() raises an exception.
        except Exception:
            pass
```

### Typing attributes {#typing-attributes}

```python
from typing import assert_type

class MyClass:
    default_number: int = 1
    will_be_set_later: str = None  # type: ignore[assignment]

    def __init__(self, timeout: int = 15) -> None:
        self.timeout = timeout  # No need to type this as it is inferred from above
        assert_type(self.timeout, int)
        self.names: list[str] = []  # when creating collections, it's important to type future contents
        assert_type(self.will_be_set_later, str)
        self.setup()

    def setup(self) -> None:
        self.will_be_set_later = 'hello'
```

### Multiple types (Unions) {#union-types}

If alternative types are possible, as input or as output, this is a
[type union](https://docs.python.org/3.11/library/typing.html#typing.Union), and can be represented
using the pipe symbol `|`.

An equivalent, legacy syntax uses the generic `typing.Union` type.

```python
from __future__ import annotations

from typing import Union

alphanumeric_list: list[int | str] = ['a', 1]
# equivalent to:
alphanumeric_list: list[Union[int, str]] = ['a', 1]
```

### Typing with classes vs instances {#type-class}

(See [Python reference](https://docs.python.org/3.11/library/typing.html#the-type-of-class-objects))

To indicate that a variable is an instance of a class, you can use the class as the type. If you
instead wish to say that the variable is the class itself, for example for factories which receive
the class and return an instance, you can use the `type` generic. If the class is defined in the
same file, use [lazy annotations](#lazy-annotations) or put the class name in quotes.

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

Thanks to [PEP 0563](https://peps.python.org/pep-0563/), you can import `annotations` from
`__future__` to delay the evaluation of annotations. Thus, they are only evaluated by type checkers
or if you specifically inspect that type in your code.

If you have annotations, it’s always good to use this import:

- It prevents wasted processing of annotations at runtime
- It allows you to use classes that are defined in the same file, or currently being defined, as
  type annotations (forward references)
- It allows you to use features and syntax of later versions of Python if your type checker is run
  with that newer version.

You can also use `if TYPE_CHECKING:` to encompass code that is only necessary for type checking or
that you don’t want to run at runtime.

This allows you to, for example:

- Add imports types/options for typing (if these aren’t supported in the current version)
- Do some unfortunate workaround for typing in older language versions
- Import things from typing that don’t exist in older versions of Python like `StringLiteral`
- Import things that could create problems if imported at runtime (e.g. avoid circular import
  errors).

In general, use `TYPE_CHECKING` only if necessary. Typing-only imports should be treated as any
other import.

#### Example:

```python
# Copyright ...

from __future__ import annotations

import threading
from collections.abc import Callable, Collection
from typing import TYPE_CHECKING, TypedDict

from wazo_auth_client.client import AuthClient  # only needed for type checking

if TYPE_CHECKING:
    from typing import NotRequired

Callback = Callable[[Collection[str]], None]
class CallbackDict(TypedDict):
    method: Callback
    details: bool
    extra: NotRequired[str]


class TokenRenewer:
    def __int__(self, auth_client: AuthClient) -> None:
        self._auth_client = auth_client
        self._callback_lock = threading.Lock()
        self._callbacks: list[CallbackDict] = []

    def subscribe_to_token_change(self, callback: Callback) -> None:
        with self._callback_lock:
            self._callbacks.append({'method': callback, 'details': False})
```

### Typing from the future

If you would like to use typing features have been added to the language in later versions than the
one currently in use for a project, you have two options:

1. You can use [`ìf TYPE_CHECKING` and Lazy Annotations](#lazy-annotations), and run your
   linting/type checker with a more modern version of Python;

2. You can use the [Typing Extensions](https://pypi.org/project/typing-extensions/) library, which
   backports certain types to older versions of Python. However, if you use any imports from that
   library outside an `if TYPE_CHECKING` block, you must add it as a runtime dependency or else you
   will get an `ImportError` at runtime.
   ```python
   from typing_extensions import Self  # For backward compatibility or newer features
   ```

## Parametric typing & Generics {#generics}

[Generics](https://mypy.readthedocs.io/en/stable/generics.html) are types that have _type
parameters_. Those type parameters can be filled by concrete types, to specialize the generic type,
or type variables, to keep the generic type generic.

For example, it’s good to know your method receives a list, but it might be useful to also know what
that list contains. So you can pass arguments to the `list` type to specify its contents, e.g.
`list[int | str]`.

You can create custom generic types, but many builtin types are already generics, such as any
container types(`list`, `tuple`, `dict`, `set`, etc.), or types from `collections.abc` (`Iterable`,
`Sequence`, `Mapping`, `Collection`, ...).

### Generic built-in collections {#built-in-generics}

All the basic types that contain other types can be passed parameters to specify their contents (ie.
`list`, `tuple`, `dict`, `set`).

```python
import string

alphabet: list[str] = list(string.ascii_lowercase)
two_numbers: tuple[int, int] = (1, 2)
variable_numbers: tuple[int, ...] = (1, 2, 3, 4)
no_doubles: set[str] = {'a', 'b', 'a'}
scores: dict[str, float] = {'bob': 99, 'fred': 100}
```

_Note_: If you type a `tuple` it will expect exactly those types in that order. If you want to allow
a variable number of items in a tuple, type the first entry and follow it with an ellipsis (`...`),
eg. `tuple[int, ...]`

### Callables {#callables}

When passing around methods/functions as callbacks, you can use the built-in generic
`[Callable](https://docs.python.org/3.11/library/typing.html#annotating-callables)`. The first
option is the arguments and the second is the return value.

For more complex cases see [Protocols](#protocols).

```python
from collections.abc import Callable

def my_handler(name: str, timeout: int = 5) -> bool:
    with contextlib.suppress(KeyError):
        # do something
        return True
    return False

def process_handler(handler: Callable[[str, int], bool]) -> None:
    if not handler('test', 0):
        raise ValueError("Handler failed")

process_hander(my_handler)
```

### Literal values {#literals}

To allow only a specific set of literal values you can use
`[Literal](https://docs.python.org/3/library/typing.html#typing.Literal)`. It is useful for when you
expect specific strings, like `'on'` or `'off'`, that is as a lightweight alternative to using
[`enum.Enum` classes](https://docs.python.org/3.11/library/enum.html). The standard library uses
this for read/write modes of files for example.

```python
from typing import Literal

the_answer: Literal[42] = 42  # No other int is accepted, but 42
mode: Literal['on', 'off'] = 'off'  # Only accept these two strings

def open(filename: str | Path, mode: Literal['rb', 'r']) -> BytesIO | StringIO:
    ...
```

### TypeVar {#typevar}

`[TypeVar](https://docs.python.org/3/library/typing.html#typing.TypeVar)` allows you to define a
type variable, to reference a type without knowing which one. For example, a generic method that
receives a list of items and returns the first, does not need to know the concrete type of the
items, just that the collection is not empty.

```python
from typing import TypeVar, assert_type

T = TypeVar('T')

def get_first(items: list[T]) -> T | None:
    return items[0] if items else None

assert_type(get_first([1, 2, 3]), int) # all good
```

This allows for mypy and other type checkers to resolve `T` to a concrete type based on what is
passed to the function. For example if you pass a list of `int`, the type checker knows that the
function will return a single `int`, or `None`, because it understands the relation between the
input and the output through the type variable.

In contrast:

```python
def get_first(items: list[Any]) -> Any | None:
    return items[0] if items else None

assert_type(get_first([1, 2, 3]), int) # error: Expression is of type "Any | None", not "int"  [assert-type]
```

This function can also work on any list, but the type checker does not know the relation between the
input list and the output value, only that this function can take a list of anything, and return
anything.

## Protocols and structural typing {#protocols-strutural-typing}

Protocols are used to implement “static duck typing” 🦆.

Duck typing is a term for the practice of writing code that is not so concerned in what an object
_is_, called its "nominal type", as much as what methods and attributes it supports, also called its
"structural type".  
Do you _need_ a `list` object, or would anything that is iterable work?

Protocols builds on this common python pattern, which would traditionally be validated at runtime
using attribute checks, by enabling a mechanism to provide static information, verifiable by type
checkers, on those "duck typing" expectations.

Protocols offer an alternative to abstract base classes (ABCs), which are classes that define a set
of methods and attributes that must be implemented by any class that inherits from them.

By using protocols defined with the `Protocol` base class instead, type checkers will not rely on
inheritance hieararchies to validate type consistency, but on the statically inferrable
structure(methods and attributes) of the objects being passed through Protocol-typed variables.

### Built-in types {#built-in-types}

- [`Iterable`](https://docs.python.org/3.11/library/collections.abc.html#collections.abc.Iterable):
  an object that implements `__iter__` or `__getitem__`
- [`Sequence`](https://docs.python.org/3.11/library/collections.abc.html#collections.abc.Sequence):
  an iterable that defines `__len__` , `__getitem__` and a few others. Eg.

```python
from collections.abc import Sequence

def check_len(items: Sequence[int], limit: int) -> bool:
    return len(items) <= limit

check_len([1, 2, 3], 10) # all good
check_len(5, 2) # error: Argument 1 to "check_len" has incompatible type "int"; expected "Sequence[int]"  [arg-type]

```

### Protocols {#protocols}

Protocols allow you to type code that must deal with values which have a specific interface e.g.
implements a given method or has a given property.

You can also use them to provide type information on callable signatures.

```python
from __future__ import annotations

from typing import Protocol

class ComplexCallable(Protocol):
    def __call__(self, x: int, /, timeout: int = ...) -> float:
        ...

def needs_complex_callable(callable: ComplexCallable) -> None:
    callable(10, timeout=12) # all good


def complex_callable(x: int, /, timeout: int = 12) -> float:
    return x * timeout

def simple_callable(x: int) -> int:
    return x * 2

needs_complex_callable(complex_callable) # all good
needs_complex_callable(simple_callable)
# error: Argument 1 to "needs_complex_callable" has incompatible type "Callable[[int], int]"; expected "ComplexCallable"  [arg-type]
# note: "ComplexCallable.__call__" has type "Callable[[int, DefaultArg(int, 'timeout')], float]"

```

## Typing Dynamic patterns {#typing-dynamic}

### Mixins {#typing-mixins}

Mixins can be challenging to type if they have implicit dependencies on other interfaces (i.e.
expect the inheriting class to implement other methods used by the mixin implementation).
[Intersection types are not supported yet](https://github.com/python/typing/issues/213), which would
allow specifying a self-type that combines the mixin’s interfaces.

Intersection types are equivalent to ad-hoc subclasses of the types in the intersection. To type a
mixin properly, the implicit dependencies on interfaces must be made explicit, for example through a
separate protocol or ABC defining the required interface, which the mixin can subclass.

Example:

```python
from typing import Protocol

class InterfaceA(Protocol):
    def method_a(self) -> None:
        ...

class InterfaceB(Protocol):
    def method_b(self) -> None:
        ...


class Mixin(InterfaceA, InterfaceB):
    def method_c(self) -> None:
        self.method_a()
        self.method_b()
        print("called method_c")


def supports_mixin(mixin: Mixin) -> None:
    mixin.method_a()
    mixin.method_b()
    mixin.method_c()


class ConcreteClass(Mixin):
    def method_a(self) -> None:
        print("method_a")

    def method_b(self) -> None:
        print("method_b")


supports_mixin(ConcreteClass()) # all good
supports_mixin(object()) # not good
```

### `Self` with inheritance {#typing-self}

`Self` allows for a reference to the type of the subject of a method. This allows relating the
parameters and return type of methods to the type of the object on which the method is called,
without specifying the concrete type.

This can be important for class methods that return instances of themselves. Simply using the class
name where the method is defined will result in typing issues if the class is extended.

For example:

```python
from typing import Self

class ParentClass:
   def return_self(self: Self) -> Self:
       return type(self)() # same type as self

class ChildClass(ParentClass):
    def return_self(self: Self) -> Self:
        # If we had used `-> ParentClass` this would then return the wrong type as it is now `ChildClass`
        return super().return_self()
```

### Type Aliases {#type-aliases}

You can easily create aliases for types by simply assigning them to variables. They can also be
explicitly typed with `TypeAlias`, which is sometimes necessary to prevent the type checker
confusing a type alias for use in annotations, with runtime use of type objects.  
Using type aliases is equivalent to repeating the type definition where it is needed. They can be a
simple convenience to avoid repeating large type annotations, and keep type signatures concise.  
They can also provide a more readable name to a complex, otherwise obscure type annotation, and help
specify the intended meaning of a type expressed in low-level types, without actually defining new
types at runtime.  
Finally, they can help refactoring and evolvability of code, by enabling an abstraction over the
actual type used throughout a code base. Changes in a type defined through a type alias may only
require changing the type alias definition, rather than rewriting all uses of the type in the code
base.

```python
from collections.abc import Callable
from typing import TypeAlias

HandleFunction = Callable[[FastAGI, DictCursor, list], None]
SetupFunction: TypeAlias = Callable[[DictCursor], None]
UserId = int
```

### Extra specificity with [New Types](https://mypy.readthedocs.io/en/stable/more_types.html#newtypes) {#new-types}

`[NewType](https://mypy.readthedocs.io/en/stable/more_types.html#newtypes)` can be used to add
increased specificity and type safety to a type alias, by enabling a distinction between a `NewType`
definition and other values of the same base type.

For example, if there are functions that frequently use user IDs as integers, it is desirable to
communicate through type signatures that these functions are actually dealing with user ids, and not
arbitrary integers.

By defining a `UserId` `NewType`, the type checker will complain if plain integers are passed to
functions that expect a `UserId`.

```python
from typing import NewType

UserId = NewType('UserId', int)

def get_user(user_id: UserId) -> User:
    return User(user_id)


get_user(42)          # invalid
get_user(UserId(42))  # valid
```

This creates a quick, thin, low-cost abstraction. The actual implementation type can later be
changed(for example to a custom class implementation) without breaking typing consistency everywhere
and having to rewrite all interfaces.

## Integrating into workflow {#integrating-into-workflow}

### Config {#config}

You can configure `mypy` with the rest of the tools in the `pyproject.toml` file. Here is an example
config entry for a fully typed or new project.

```python
[tool.mypy]
python_version = "3.11"
show_error_codes = true
check_untyped_defs = true
warn_unused_configs = true
disallow_untyped_calls = true
disallow_untyped_defs = true
disallow_incomplete_defs = true
warn_unused_ignores = true
strict_equality = true
extra_checks = true
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
python_version = "3.11"
show_error_codes = true
check_untyped_defs = true
warn_unused_configs = true
ignore_missing_imports = true
```

If you have any settings that are unique to just one particular repo, you should add a comment
separating them from the rest and indicate why the option was added in case it is no longer required
in future.

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
        language_version: '3.11'
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
basepython = python3.11
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
thus are never really `None`. In these cases, you can ignore the type for assignment only.

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
