---
title: Call Permissions
---

Call permissions can be used for:

- denying a user from calling a specific extension
- denying a user of a group from calling a specific extension
- denying a specific extension on a specific outgoing call from being called

More than one extension can match a given call permission, either by specifying more than one
extension for that permission or by using extension patterns.

You can also create permissions that allow a specific extension to be called instead of being
denied. This make it possible to create a general "deny all" permission and then an "allow for some"
one.

Finally, instead of unconditionally denying calling a specific extension, call permissions can
instead challenge the user for a password to be able to call that extension.

As you can see, you can do a lot of things with Wazo's call permissions. They can be used to create
fairly complex rules. That said, it is probably _not_ a good idea to so because it's pretty sure
you'll get it somehow wrong.

# Examples

## Denying a user from calling a specific extension

- Create with `POST /callpermissions`
- Associate with `PUT /users/{user_uuid}/callpermissions/{callpermission_id}`

#:exclamation: User's `call_permission_password` overwrite all call permissions password for the
user.

#:warning: The extension can be anything but it will only work if it's the extension of a user or an
extension that pass through an outgoing call. It does _not_ work, for example, if the extension is
the number of a conference room.

## Denying a user of a group from calling a specific extension

First, you must create a group and add the user to this group. Note that groups aren't required to
have a number.

Then,

- Create with `POST /callpermissions`
- Associate with `PUT /groups/{group_id}/callpermissions/{callpermission_id}`

## Denying users from calling a specific extension on a specific outgoing call

- Create with `POST /callpermissions`
- Associate with `PUT /outcalls/{outcall_id}/callpermissions/{callpermission_id}`

Note that selecting both a user and an outgoing call for the same call permission doesn't mean the
call permission applies only to that user. In fact, it means that the user can't call that extension
and that the extension can't be called on the specific outgoing call. This in redundant and you will
get the same result by not selecting the user.
