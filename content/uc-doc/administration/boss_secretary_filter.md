---
title: Boss Secretary Filter
---

-   [Quick Summary](#quick-summary)
-   [Creating a Filter](#creating-a-filter)
-   [Usage](#usage)
-   [Function Keys](#function-keys)

The boss secretary filter allow to set a secretary or a boss role to a
user. Filters can then be created to filter calls directed to a boss
using different strategies.

Quick Summary
=============

In order to be able to use the boss secretary filter you have to :

:   -   Select a boss role for one the users
    -   Select a secretary role for one to the users
    -   Create a filter to set a strategy for this boss secretary filter
    -   Add a function key for the user boss and the user secretary

Creating a Filter
=================

The filter is used to associate a boss to one or many secretaries and to
set a ring strategy.

-   Create with `POST /callfilters`

Different ringing strategies can be applied :

:   -   Boss rings first then all secretaries one by one
    -   Boss rings first then secretaries are all ringing simultaneously
    -   Secretaries ring one by one
    -   Secretaries are all ringing simultaneously
    -   Boss and secretaries are ringing simultaneously
    -   Change the caller id if the secretary wants to know which boss
        was initialy called

When one of serial strategies is used, the first secretary called is the
last in the list. The order can be modified by drag and drop in the
list.

Usage
=====

The call filter function can be activated and deactivated by the boss or
the secretary using the \*37 extension. The extension is defined with
`/extensions/features` endpoint.

The call filter has to be activated for each secretary if more than one
is defined for a given boss.

The extension to use is `*37<callfilter member id>`.

In this example, you would set 2 `Func Keys` `*373` and `*374` on the
Boss.

On the secretary `Jina LaPlante` you would set `*373`.

On the secretary `Ptit Nouveau` you would set `*374`.

Function Keys
=============

A more convenient way to active the boss secretary filter is to assign a
function key on the boss\' phone or the secretary\'s phone. In the
user\'s configuration under `Func Keys`. A function key can be added for
each secretaries of a boss.

If supervision is activated, the key will light up when filter is
activated for this secretary. If a secretary also has a function key on
the same boss/secretary combination the function key\'s BLF will be in
sync between each phones.

::: {.warning}
::: {.admonition-title}
Warning
:::

With SCCP phones, you must configure a custom `Func Keys`.
:::
