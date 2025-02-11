---
title: Schedules
---

Schedules are specific time frames that can be defined to open or close a service. Within schedules
you may specify opening days and hours or exceptional days and hours.

A default destination as user, group, etc. can be defined when the schedule is in closed state.

Schedules can be applied to :

- Users
- Groups
- Inbound calls
- Outbound calls
- Queues

## Using Schedule on Users

When you have a schedule associated to a user, if this user is called during a `exception_periods`,
the caller will first hear a prompt saying the call is being transferred before being actually
redirected to the action of the schedule.

If you don't want this prompt to be played, you can change the behaviour by:

1. editing the `/etc/xivo/asterisk/xivo_globals.conf` file and setting the
   `WAZO_FWD_SCHEDULE_OUT_ISDA` to `1`
2. reloading the asterisk dialplan with an `asterisk -rx "dialplan reload"`.
