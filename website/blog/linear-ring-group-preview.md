---
title: Preview of linear ring group feature
date: 2024-04-25T13:17:00
authors: wazoplatform
category: Wazo Platform
tags: [wazo-platform, development]
slug: linear-ring-group-preview
status: published
---

## Some context

The existing implementation is based on Asterisk's `Queue` application from the `app_queue` asterisk module.
This asterisk application is powerful and suitable for the ring group feature, as it allows a call to ring on a number of destinations simultaneously or following a specific distribution strategy, and be answered by any of a group of participants(the queue members).

<!-- truncate -->

This provides support for many ring strategies for our ring groups, from the conventional "ring all"(ring all members concurrently, first to answer wins) to more complex strategies like "fewest calls"(which tracks the completed calls of each members and tries to even the scores).
Of course another conventional strategy is _linear_, that is ringing each member one after the other in a defined order.

Unfortunately, an outstanding bug/limitation of the `app_queue` module is the inability to change a configured queue's ring strategy to `linear` without completely restarting asterisk, which requires all ongoing calls to be interrupted or somehow transfered to another instance, and implies some downtime.
This is of course problematic for high-load deployments of the Wazo Platform, and has been a torn in the foot of many community users as well as commercial partners for a while.

After many attempts to evaluate viable solution paths, and considering undertaking patches to the Asterisk `app_queue` module, we finally found a simpler, more viable solution for us: that of implementing the linear strategy for ring groups without relying on the `Queue` application and the `app_queue` module.

> **Publication Note**: due to a publishing mistake, this post was left unpublished following its redaction. As it concerns the 24.06 release, the new 24.07 release might imply some changes to the information presented here.
> For up-to-date information on the state of this feature in the latest release, please refer to release notes and related publications for release version 24.07 or later.
>
> As a companion to the 24.06 sprint review blog post, here's some detail on a feature that is made available behind a feature flag in this sprint.
>
> The linear ring group feature is a reimplementation of our ring group feature in order to address a longstanding issue within the existing implementation.

## Some explanation

A call to a ring group will now use an alternative path in the dialplan for ring groups configured with the `linear` strategy.

This dialplan simply relies on a sequence of `Dial` application executions, one for each member of the ring group. This sequence of Dials are supported by custom AGIs in our `wazo-agid` service in order to obtain and expose the required information to this dialplan, such as the interfaces of the members of the ring group that should be dialed, and the options that should be used in those `Dial`s according to the group's configured options.

See the code changes in the [`xivo-config`](https://github.com/wazo-platform/xivo-config/compare/wazo-24.05...wazo-24.06) and [`wazo-agid`](https://github.com/wazo-platform/wazo-agid/compare/wazo-24.05...wazo-24.06) repositories for more details.

## What's missing, and how to use this feature preview?

The core behavior of a linear ring group is implemented and part of the 24.06 release, but it is hidden behind a feature flag because the new implementation has not yet reached parity with the ring group feature surface.

Notably, proper support for call description records and support for the _ring in use_ option of ring groups still require some work.

The new implementation can still be used by those who have no need for those features, simply by setting an asterisk global variable to switch on the feature flag.

For example, in an asterisk config file such as `/etc/asterisk/extensions_extra.d/10-wazo_linear_ring_group.conf`:

```
; enable support for wazo linear ring group implementation
; when a ring group is configured with strategy linear
[globals]
WAZO_LINEAR_GROUP_FLAG=1
```

Then ensure this configuration is read by asterisk by executing a shell command `asterisk -rx 'dialplan reload'` on your wazo instance.

## What's next?

Once the remaining work is done for this new ring group implementation, and the linear ring group is at feature parity with the existing ring group implementation, the feature flag will be removed and the linear ring group implementation will be used automatically when configuring any ring group to the linear strategy.

This implementation does add complexity to the overall ring group feature, and as such may eventually be replaced by an alternative fix for the 'linear' strategy issue.
This is to be considered an implementation detail, and only the new behavior allowing to easily reconfigure a ring group to the linear strategy without a reboot should be expected to be preserved in future versions.

Hopefully this new behavior should satisfy many of the wazo community that were plagued by this issue.
We of course welcome any feedback on this feature preview.
