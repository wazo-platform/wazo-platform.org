---
title: Contributing to the Documentation
---

-   [Documentation guideline](#documentation-guideline)
    -   [Language](#language)
    -   [Sections](#sections)
    -   [Lists](#lists)
    -   [Literal blocks](#literal-blocks)
    -   [Inline markup](#inline-markup)
    -   [Others](#others)

Wazo documentation is generated with Sphinx. The source code is
available on GitHub at <https://github.com/wazo-platform/wazo-doc>

Provided you already have Python installed on your system. You need
first to install [Sphinx](http://sphinx.pocoo.org/) :
`easy_install -U Sphinx`[^1].

Quick Reference

-   <http://docutils.sourceforge.net/docs/user/rst/cheatsheet.txt>
-   <http://docutils.sourceforge.net/docs/user/rst/quickref.html>
-   <http://openalea.gforge.inria.fr/doc/openalea/doc/_build/html/source/sphinx/rest_syntax.html>

Documentation guideline
=======================

Here\'s the guideline/conventions to follow for the Wazo documentation.

Language
--------

The documentation must be written in english, and only in english.

Sections
--------

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

Punctuation characters should be exactly as long as the section text.

Correct:

    Section1
    ========

Incorrect:

    Section2
    ==========

There should be 2 empty lines between sections, except when an empty
section is followed by another section.

Correct:

    Section1
    ========

    Foo.


    Section2
    ========

    Bar.

Correct:

    Section1
    ========

    Foo.


    .. _target:

    Section2
    ========

    Bar.

Correct:

    Section1
    ========

    Subsection1
    -----------

    Foo.

Incorrect:

    Section1
    ========

    Foo.

    Section2
    ========

    Bar.

Lists
-----

Bullet lists:

    * First item
    * Second item

Autonumbered lists:

    #. First item
    #. Second item

Literal blocks
--------------

Use `::` on the same line as the line containing text when possible.

The literal blocks must be indented with three spaces.

Correct:

    Bla bla bla::

       apt-get update

Incorrect:

    Bla bla bla:

    ::

       apt-get update

Inline markup
-------------

Use the following roles when applicable:

-   `:file:` for file, i.e.:

        The :file:`/dev/null` file.

-   `:menuselection:` for interface menu:

        The :menuselection:`Configuration --> Management --> Certificates` page.

-   `:guilabel:` for designating a specific GUI element:

        The :guilabel:`Action` column.

Others
------

-   There must be no warning nor error messages when building the
    documentation with `make html`.
-   There should be one and only one newline character at the end of
    each file
-   There should be no trailing whitespace at the end of lines
-   Paragraphs must be wrapped and lines should be at most 100
    characters long

[^1]: `easy_install` can be found in the debian package
    python-setuptools : `sudo apt-get install python-setuptools`
