---
title: Kamailio routing with rtjson and http_async_client
date: 2019-11-11
author: Fabio Tranchitella
category: Wazo Platform C4
tags: [wazo-platform, c4, kamailio, sip, routing]
slug: kamailio-routing-with-rtjson-and-http-async-client
status: published
---

# Kamailio routing with RTJSON and HTTP async client

## The problem

In the [Wazo Platform C4](/blog/wazo-platform-c4-overview) we are committed to delivering the most flexible, as well as easy to configure and set up, Softswitch in the market. The SIP router key component is provided by [Kamailio](https://www.kamailio.org/), the leading open-source SIP server.

Our goal was while supporting high degrees of flexibility and ease to configure, to avoid any compromise regarding performances: we aim to support a high number of concurrent calls, high call rates with predictable and linear degradation of performances in case of overload.

<!-- truncate -->

## The solution

To provide flexible, API-driven routing features in the Wazo Platform C4 Softswitch we decided to implement it on the foundations of the [`rtjson`](https://kamailio.org/docs/modules/stable/modules/rtjson.html) module. This module not only allows you to push the routing destination `URI` and the outbound proxy, but it also supports the normalization of the `From` and `To` headers, the insertion of additional headers as well as various settings related to the transaction management and its timers.

Together with the [`http_async_client`](https://kamailio.org/docs/modules/stable/modules/http_async_client.html) Kamailio module, it offers a perfect solution to manage very complex and dynamic routing rules of SIP messages delegating the routing logic to an external, HTTP-based web service. The biggest advantage of `http_async_client` is that, as the name suggests, it is asynchronous: the HTTP request to the API server doesn't block the Kamailio worker process which is immediately released, ready to serve subsequent SIP message requests. As soon as the HTTP request completes and the `http_async_client` worker process managing it collects the response, it resumes the Kamailio transaction and calls the Kamailio `route` designated to manage the API responses, resuming the processing of the SIP message and its transaction.

In order to parse `JSON` response provided by the `API` we use the ubiquitous [`jansson`](https://kamailio.org/docs/modules/stable/modules/jansson.html) module, extracting the `rtjson` payload from the `JSON` response of the API.

## Implementation

### Kamailio side

The [Wazo C4 Router](https://github.com/wazo-platform/wazo-c4-router) is the component responsible for routing SIP messages in the Wazo `class4` infrastructure. The relay of the SIP messages to be routed is managed by the `RELAY_API` route, defined as follows:

```Javascript
route[RELAY_API] {
    $http_req(all) = $null;
    $http_req(suspend) = 1;
    $http_req(timeout) = HTTP_API_TIMEOUT;
    $http_req(method) = "POST";
    $http_req(hdr) = "Content-Type: application/json";
    jansson_set("string", "event", "sip-routing", "$var(http_routing_query)");
    jansson_set("string", "source_ip", $avp(source_ip), "$var(http_routing_query)");
    jansson_set("int", "source_port", $avp(source_port), "$var(http_routing_query)");
    jansson_set("int", "auth", 0, "$var(http_routing_query)");
    jansson_set("string", "call_id", $ci, "$var(http_routing_query)");
    jansson_set("string", "from_name", $fn, "$var(http_routing_query)");
    jansson_set("string", "from_uri", $fu, "$var(http_routing_query)");
    jansson_set("string", "from_tag", $ft, "$var(http_routing_query)");
    jansson_set("string", "to_name", $tn, "$var(http_routing_query)");
    jansson_set("string", "to_uri", $tu, "$var(http_routing_query)");
    jansson_set("string", "to_tag", $tt, "$var(http_routing_query)");
    xlog("L_INFO","API ASYNC ROUTING REQUEST: $var(http_routing_query)\n");
    $http_req(body) = $var(http_routing_query);
    t_newtran();
    http_async_query(HTTP_API_ROUTING_ENDPOINT, "RELAY_API_RESPONSE");
}
```

The `RELAY_API` route creates an asynchronous HTTP request, processed by the `http_async_query` function provided by the `http_async_module`, building a JSON object containing all the information needed by the API to return the routing result according to the `rtjson` format.

We specify the current request shall be suspended (`$http_req(suspend) = 1`) and resumed in the `RELAY_API_RESPONSE` route when the response from API has been collected.

The response route is straightforward:

```Javascript
route[RELAY_API_RESPONSE] {
    if ($http_ok && $http_rs == 200) {
        xlog("L_INFO","API ROUTING RESPONSE: $http_rb\n");
        if (jansson_get("rtjson", $http_rb, "$var(rtjson)")) {
            if (!jansson_get("success", $var(rtjson), "$var(success)") || !$var(success)) {
                send_reply(404, "Not found");
                exit;
            } else {
                rtjson_init_routes("$var(rtjson)");
                rtjson_push_routes();
                # relay the message
                route(RELAY);
                return;
            }
        }
    }
    send_reply(500, "API Not Available");
    exit;
}
```

If the status code of the response is `200 Ok` and the response is a valid `JSON` containing the `rtjson` key, the corresponding value is pushed as routing configuration using the `rtjson_init_routes` and `rtjson_push_routes` functions from the `rtjson` module.

We also support `rtjson`-based routing in outgoing branches thanks to the following `branch_route`:

```Javascript
branch_route[MANAGE_BRANCH] {
    xdbg("new branch [$T_branch_idx] to $ru\n");
    rtjson_update_branch();
}
```

In case of branch failure, if the `rtjson` response contained more than one possible destination and we are using `serial routing` (as we do), we can try the next destination:

```Javascript
failure_route[MANAGE_FAILURE] {
    if (t_is_canceled()) {
        exit;
    }
    if (rtjson_next_route()) {
        route(RELAY);
        exit;
    }
}
```

### API side

The primary programming language at [Wazo](https://wazo.io/) is Python, thus it was an obvious choice to develop the API for the Kamailio Router using it. We decided to use [FastAPI](https://fastapi.tiangolo.com/), a modern, high-performance, Python 3.6+ web framework to build APIs. It is built on the top of `asyncio` and for I/O bound processes it promises similar performances to the ones you can achieve with `golang`, for instance.

Our web service uses a `PostgreSQL` to store the routing configuration and exposes not only the routing end-point but also the end-points needed to configure the Wazo C4 Router instances.

The [Wazo Router Confd](https://github.com/wazo-platform/wazo-router-confd) web service provides the `/kamailio/rtjson` end-point which is queried by the aforementioned `RELAY_API` Kamailio route.

Here you can find an example of the response returned by the API:

```Javascript
{
  "rtjson": {
    "success": true,
    "version": "1.0",
    "routing": "serial",
    "routes": [
      {
        "dst_uri": "sip:carrier:5060",
        "path": "",
        "socket": "",
        "headers": {
          "from": {
            "display": "Caller",
            "uri": "sip:caller@domain.com"
          },
          "to": {
            "display": "Callee",
            "uri": "sip:callee@domain.com"
          },
          "extra": ""
        },
        "branch_flags": 8,
        "fr_timer": 5000,
        "fr_inv_timer": 30000
      }
    ]
  }
}
```

We use `serial` routing, which means the routes are tried by `Kamailio` sequentially, one by one. Additional settings (eg. `success`) are ignored by the `rtjson` module and can be used to provide Kamailio with additional data fields related to the routing request.

# Conclusions

After several stress test sessions in our C4 lab, we determined the overhead of the `rtjson`-based routing using the `async_http_client` module is negligible.

The main advantages of moving complex routing logic out of Kamailio to external APIs are:

- Ease of unit testing the routing logic
- More powerful and rich programming language than the Kamailio config file
- Possibility to scale independently the SIP routing component (Kamailio) and the API web service (FastAPI/Python), in a true micro-service architecture.

The Wazo Platform C4 is in continuous development to offer: our goal is delivering a true cloud-native telecom solution with strong and solid foundations. Stay tuned!
