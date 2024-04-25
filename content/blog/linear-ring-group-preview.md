---
title: Preview of linear ring group feature
date: 2024-04-25T13:17:00
author: The Wazo Authors
category: Wazo Platform
tags: wazo-platform, development
slug: linear-ring-group-preview
status: draft
---

As a companion to the 24.06 sprint review blog post, here's some detail on a feature that is made available behind a feature flag in this sprint.

The linear ring group feature is a reimplementation of our ring group mechanism in order to address a longstanding issue resulting from the existing implementation.

## Some context

The existing implementation is based on Asterisk's `Queue` application from the `app_queue` asterisk module.
This asterisk application is powerful and suitable for the ring group feature, as it allows a call to be notified to and answered by any of a group of participants(the queue members).

This provides support for many ring strategies for our ring groups, from the conventional "ring all"(ring all members concurrently, first to answer wins) to more complex strategies like "fewest calls"(which tracks the completed calls of each members and tries to even the scores).
Of course another conventional strategy is _linear_, that is ringing each member one after the other in a defined order.

Unfortunately, an outstanding bug/limitation of the `app_queue` module is the inability to change a configured queue's ring strategy to `linear` without completely restarting asterisk, which requires all ongoing calls to be interrupted or somehow transfered to another instance, and implies some downtime.
This is of course problematic for high-load deployments of the Wazo Platform, and has been a torn in the foot of many community users as well as commercial partners for a while.

After many attempts to evaluate viable solution paths, and considering undertaking patches to the Asterisk `app_queue` module, we finally found a simpler, more viable solution for us: that of implementing the linear strategy for ring groups without relying on the `Queue` application and the `app_queue` module.

## Some explanation

A call to a ring group will now use alternative dialplan for ring groups configured with the `linear` strategy.
This dialplan simply relies on a sequence of `Dial` application executions, one for each member of the ring group, along with some custom AGIs in our `wazo-agid` component in order to obtain and expose the required information to this dialplan, such as the interfaces of the members of the ring group that should be dialed, and the options that should be used in those `Dial`s according to the group's configured options.

See the code changes in the `xivo-config` and `wazo-agid` repositories for more details.

## What's missing?

The core behavior of a linear ring group is implemented and part of the 24.06 release, but it is hidden behind a feature flag because the new implementation has not yet reached parity with the ring group feature surface.

Notably, proper support for call description records and support for the _ring in use_ option still require some work.

The new implementation can still be used by those who have no need for those features, simply by setting an asterisk global variable to switch on the feature flag.

For example, in an asterisk config file such as `/etc/asterisk/extensions_extra.d/10-wazo_linear_ring_group.conf`:

```
; enable support for wazo linear ring group implementation
; when a ring group is configured with strategy linear
[globals]
WAZO_LINEAR_GROUP_FLAG=1
```

Then ensure this configuration is read by asterisk with a `asterisk -rx 'dialplan reload'` shell command on your wazo instance.

## What's next?
