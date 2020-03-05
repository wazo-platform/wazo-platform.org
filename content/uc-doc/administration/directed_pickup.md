---
title: Directed Pickup
---

-   [Custom Line Limitation](#custom-line-limitation)

Directed pickup allows a user to intercept calls made to another user.

For example, if a user with number 1001 is ringing, you can dial \*81001
from your phone and it will intercept (i.e. pickup) the call to this
user.

This feature is disabled by default. The reason behind this choice is
based on the fact that it is possible for any user to pickup any other
user, including users for whom it should not be possible (e.g.
directors). It can be enabled via the `/extensions/features` endpoint.

The extension prefix used for directed pickup can be changed via the
`/extensions/features` endpoint.

Custom Line Limitation
======================

There is a case where directed pickup does not work, which is the
following:

    Given you have a user U with a line of type "customized"
    Given this custom line is using DAHDI technology
    Given this user is a member of group G
    When a call is made to group G
    Then you won't be able to intercept the call made to U by pressing *8<line number of U>

If you find yourself in this situation, you\'ll need to write a bit of
dialplan.

For example, if you have the following:

-   a user with a custom line with number 1001 in context default
-   a custom line with interface `DAHDI/g1/5551234`

Then add the following, or similar:

    [custom_lines]
    exten = line1001,1,NoOp()
    same  = n,Set(__PICKUPMARK=1001%default)
    same  = n,Dial(DAHDI/g1/5551234)
    same  = n,Hangup()

And do a `dialplan reload` in the asterisk CLI.

Then, edit the line of the user and change the interface value to
`Local/line1001@custom_lines`

Note that you\'ll need to update your dialplan if you update the number
of the line or the context.
