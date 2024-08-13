---
title: 'Kamailio HA: dispatcher and dmq modules'
date: 2019-11-15
authors: ftranchitella
category: Wazo Platform C4
tags: [wazo-platform, c4, ha, kamailio, sip]
slug: kamailio-ha-dispatcher-and-dmq
status: published
---

# Kamailio HA with dispatcher and dmq modules

This is the first of a series of blog posts about the HA features of the [Wazo Platform C4](/blog/wazo-platform-c4-overview). In this article, we concentrate on the routing component which is composed of a scalable set of [Kamailio](https://www.kamailio.org/) instances denominated routers.

The routers are not accessed directly from carriers nor the termination IPBXs, as they are behind the SBC infrastructure. We assume then the routers are on an internal, non-externally accessible network segment and communicate with the SBC using the SIP protocol over UDP.

<!-- truncate -->

## Stateful load balancing of the routers from the SBC with failover

When a new SIP message reaches our SBC and satisfies our strict requirements regarding security and validation and thus it is ready to be forwarded to the routing layer, the target host is selected from a list managed using the [dispatcher module](https://kamailio.org/docs/modules/stable/modules/dispatcher.html).

This module offers SIP load balancer and SIP traffic dispatcher functionalities. It supports several different dispatching algorithms that you can choose from, for example: round-robin, weight based load balancing, call load distribution, and hashing over SIP message attributes. It also supports the auto-discovery of active/inactive gateways, which allows us to scale the routing layers and supporting health checks to detect dead routers.

And even more important, it is very lightweight, therefore suitable for handling the heavy SIP traffic of a C4 infrastructure.

This is our configuration of the dispatcher module:

```Javascript
loadmodule "dispatcher.so"

# ----- dispatcher params -----
modparam("dispatcher", "list_file", "/etc/kamailio/dispatcher.list")
modparam("dispatcher", "flags", 2)
modparam("dispatcher", "force_dst", 1)
modparam("dispatcher", "ds_hash_size", 9)
modparam("dispatcher", "ds_ping_interval", 5)
modparam("dispatcher", "xavp_dst", "_dsdst_")
modparam("dispatcher", "xavp_ctx", "_dsctx_")
modparam("dispatcher", "ds_probing_mode", 1)
```

We define the location of the `dispatcher.list` file, which contains the list of routers, managed using XHTTP calls to Kamailio to update the list and reload it, but we omit this part because it is outside the scope of this article. We also define several settings related to the dispatcher module, most notably:

- `flags = 2`, to support failover
- `force_dst = 1` to overwrite the destination URI, even if it is already set
- `ds_ping_interval = 5` to ping the routers every 5 seconds using an `OPTIONS` message as Keep-Alive
- `xavp_dst` and `xavp_ctx` are the `xavp` variables used to store the result of the selection of destinations by the dispatcher module
- `ds_probing_mode = 1` to run health checks on all the routers

The `request_route` of our SBC instance is using the `DISPATCH` route to route messages outside dialogs.

```Javascript
request_route {
    ...

    # relay the messages
    route(DISPATCH);
}

# Dispatch requests
route[DISPATCH] {
    # hash over callid dispatching on gateways group '1', up to two results
    if (!ds_select_dst("1", DISPATCHER_ALG, "2")) {
        send_reply("404", "No destination");
        exit;
    }
    # we've got more than one result, we can store the failover router in a dlg_var
    if ($xavp(_dsctx_=>cnt) >= 2) {
        $dlg_var(du_primary) = $xavp(_dsdst_[0]=>uri);
        $dlg_var(du_secondary) = $xavp(_dsdst_[1]=>uri);
    }
    route(RELAY);
    exit;
}
```

We use the `ds_select_dst` function from the `dispatcher` module to request up to two destination gateways for the SIP message being processed by the SBC. We store in a `dlg_var` the results in order to use them in case of failure while processing in-dialog messages.

The failover itself is managed by the failure route, defined as follows:

```Javascript
# Manage failure routing cases
failure_route[MANAGE_FAILURE] {
    if (t_is_canceled()) {
        exit;
    }
    # next destination - only for 500 or local timeout
    if (t_check_status("500") or (t_branch_timeout() and !t_branch_replied())) {
        # failure of the first message of the dialog
        if (ds_next_dst()) {
            route(RELAY);
            exit;
        }
        # failure of an in-dialog message, we use dlg_var where we stored the secondary router
        else if (defined $dlg_var(du_secondary) && !strempty($dlg_var(du_secondary))) {
            # relay the packet to the secondary router
            $du = $dlg_var(du_secondary);
            $dlg_var(du_secondary) = "";
            route(RELAY);
            exit;
        }
    }
}
```

As you can see we manage the failover in two different ways:

- Using the `ds_next_dst` function for failure while routing the first `INVITE` of a dialog; it uses the current state of the `ds_select_dst` function stored in the `xavp` variables.
- Using the previously stored address of the secondary router, recovering it from the dialog variables, for failure whilee routing the subsequent SIP messages within a dialog.

For further reference, you can read the complete configuration file of our SBC component on [GitHub](https://github.com/wazo-platform/wazo-c4-sbc).

## Sharing dialogs and htables across the routers using DMQ

In order to be able to failover SIP messages and in-dialog messages across different routers we needed a system to synchronize dialogs, the data structures used by Kamailio to store in-dialog information, as well as the htables vars we use to store the global state of the calls.

Instead of using an external database to store these pieces of information, we decided to use the [DMQ module](https://kamailio.org/docs/modules/stable/modules/dmq.html). It implements a distributed message bus between Kamailio instances to enable the replication of data between them, allowing the DMQ nodes to communicate with each other by sending/receiving messages (either by broadcast or directly to a specific node). The system transparently deals with node discovery, consistency, retransmissions, etc.

Using DMQ is pretty straightforward, as you can see from these excerpts of our configuration file:

```Javascript

#!define DMQ_PORT 5062
#!define DMQ_LISTEN udp:192.168.1.1:5062
#!define DMQ_SERVER_ADDRESS udp:eth:5062
#!define DMQ_NOTIFICATION_ADDRESS udp:routers.local:5062

listen=DMQ_LISTEN

loadmodule "dmq.so"

# ----- dmq params -----
modparam("dmq", "server_address", DMQ_SERVER_ADDRESS)
modparam("dmq", "notification_address", DMQ_NOTIFICATION_ADDRESS)
modparam("dmq", "multi_notify", 1)
modparam("dmq", "num_workers", 4)
modparam("dmq", "ping_interval", 15)

# ----- htable params -----
modparam("htable", "enable_dmq", 1)
modparam("htable", "dmq_init_sync", 1)

# ----- dialog params -----
modparam("dialog", "enable_dmq", 1)
```

You also need to update your `request_route` to handle DMQ messages:

```Javascript
request_route {
    if ($rm == "KDMQ" && $rp == DMQ_PORT) {
        dmq_handle_message();
        exit;
    }
    ...
}
```

The dialogs are automatically replicated across the DMQ-enabled nodes and it is possible to define which htable is replicated using the DMQ bus updating its definition adding `dmqreplicate=1`, as follows:

```Javascript
modparam("htable", "htable", "ipban=>size=8;autoexpire=300;dmqreplicate=1;")
```

From now on, the routers in our infrastructure will have have a common state represented by htables and dialog states.

For further reference, you can read the complete configuration file of our router component on [GitHub](https://github.com/wazo-platform/wazo-c4-router).

# See it in action

A picture is worth a thousand words! This is the screenshot of a `sngrep` capture of a successfully closed call which experienced failover of the router component managing the dialog:

![sngrep](../static/images/blog/kamailio-ha-dispatcher-and-dmq/1.png)

These are the hosts involved in the call:

- `192.168.128.9`: Carrier
- `192.168.128.4`: SBC node
- `192.168.128.2`: Router 1, managing the call
- `192.168.128.7`: Router 2, router taking over after fail over
- `192.168.128.8`: Termination IPBX

The `Router 1` dies during the call and the `BYE` message sent by the carrier times out as the router doesn't `ACK` it.
After a few tries, the `SBC` triggers failover and forwards the `BYE` message to `Router 2` which handles the termination of the call.
The whole failover process is totally transparent from both the `Carrier` and the `Termination IPBX` point of view.

# Conclusions

As we're focused on delivering a cloud-native telecom solution with all the bells and whistles in the next months, scalability and high availability represent some of the fundamental features in our roadmap.

We are going to publish new articles about the HA features of the Wazo Platform C4 in the next weeks. Stay tuned!
