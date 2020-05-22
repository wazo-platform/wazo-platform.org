---
title: Contributing to the Documentation
---

Wazo documentation is generated with GatbsyJS. The source code is
available on GitHub at <https://github.com/wazo-platform/wazo-platform.org>

## Documentation guideline {#documentation-guideline}

Here\'s the guideline/conventions to follow for the Wazo documentation.

### Language {#language}

The documentation must be written in english, and only in english.

### Sections {#sections}

The top section of each file must be capitalized using the following
rule: capitalization of all words, except for articles, prepositions,
conjunctions, and forms of to be.

Correct:

    The Vitamins are in My Fresh California Raisins

Incorrect:

    The Vitamins Are In My Fresh California Raisins

Use the following punctuation characters:

-   `*` with overline, for \"file title\"
-   `=`, for sections
-   `-`, for subsections
-   `^`, for subsubsections

There should be 2 empty lines between sections, except when an empty
section is followed by another section.

Correct:

    ## Section1

    Foo.


    ## Section2

    Bar.

Correct:

    ## Section1

    Foo.


    .. _target:

    ## Section2

    Bar.

Correct:

    ## Section1

    ### Subsection1

    Foo.

Incorrect:

    ## Section1

    Foo.

    ## Section2

    Bar.

### Lists {#lists}

Bullet lists:

    - First item
    - Second item
    - ...

Autonumbered lists:

    1. First item
    2. Second item
    3. ...

### Literal blocks {#literal-blocks}

Use `::` on the same line as the line containing text when possible.

The literal blocks must be indented with three spaces.

Correct:

    Bla bla bla::

       apt-get update

Incorrect:

    Bla bla bla:

    ::

       apt-get update

### Inline markup {#inline-markup}

Use the following roles when applicable:

-   `:file:` for file, i.e.:

        The :file:`/dev/null` file.

-   `:menuselection:` for interface menu:

        The :menuselection:`Configuration --> Management --> Certificates` page.

-   `:guilabel:` for designating a specific GUI element:

        The :guilabel:`Action` column.

### Others {#others}

-   There must be no warning nor error messages when building the
    documentation with `make html`.
-   There should be one and only one newline character at the end of
    each file
-   There should be no trailing whitespace at the end of lines
-   Paragraphs must be wrapped and lines should be at most 100
    characters long

[^1]: `easy_install` can be found in the debian package
    python-setuptools : `sudo apt-get install python-setuptools`
