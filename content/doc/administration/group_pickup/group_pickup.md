---
title: Group Pickup
---

-   [Quick Summary](#quick-summary)
-   [Creating a Pickup Group](#creating-a-pickup-group)
-   [Enabling an Interception
    Extension](#enabling-an-interception-extension)
-   [Adding a Function Key to an
    Interceptor](#adding-a-function-key-to-an-interceptor)

Pickup groups allow users to intercept calls directed towards other
users of the group. This is done either by dialing a special extension
or by pressing a function key.

Quick Summary
=============

In order to be able to use group pickup you have to:

:   -   Create a pickup group
    -   Enable an extension to intercept calls
    -   Add a function key to interceptors

Creating a Pickup Group
=======================

-   `POST /callpickups`
-   `POST /callpickups/{callpickup_id}/interceptors/groups`
-   `POST /callpickups/{callpickup_id}/interceptors/users`
-   `POST /callpickups/{callpickup_id}/targets/groups`
-   `POST /callpickups/{callpickup_id}/targets/users`

Enabling an Interception Extension
==================================

The pickup extension can be defined with:

-   `/asterisk/features/general` endpoint and the option key
    `pickupexten`

The default value for group pickup is *\*8*.

::: {.warning}
::: {.admonition-title}
Warning
:::

The directed pickup extension must be enabled when a function key is
used.
:::

If you decide to not use a directed pickup extension, only *\*8* alone
will work (without specifying the extension to pickup). In this case,
you *must* have at least a pickup group with the targets and
interceptors you want for the interception to work. This will also make
it impossible for the function keys to work. See
`directed_pickup`{.interpreted-text role="ref"} for more information.

Adding a Function Key to an Interceptor
=======================================

Assign a function to an interceptor of type `pickup`
