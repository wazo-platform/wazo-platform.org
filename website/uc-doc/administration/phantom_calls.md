---
title: Phantom calls
---

Dead calls, zombie calls, or phantom calls, are calls which linger in the system without any users
present in the call or otherwise benefiting. Generally, the endpoints of the call are
unavailable/unresponsive.

Dead calls may occur in the system if call peers (user endpoints) become disconnected or terminated
without a chance to signal their change of status through normal means (e.g. a SIP BYE message in
the ongoing SIP session). In such cases, the system may take some time to realize the endpoint is
not available in the call. If a single endpoint remains available in a call, the user behind that
endpoint may be waiting for the call peer to come back, or for the call to terminate. If no
endpoints remain available in the call (e.g. all endpoints were disconnected from a common network
issue), then the call's system resources may persist until the system recognizes the change in state
of the endpoints.

Various settings may help control the handling of such situations.

- Asterisk channel timeout
- SIP transport timeouts
- SIP global timers
- SIP endpoints RTP timeouts
- SIP endpoints session timers

## Settings

### Asterisk channel timeout

An absolute timeout on maximum call duration can be defined by way of the Asterisk's
`TIMEOUT(absolute)` channel setting. This provides an unconditional maximum duration for _all_
calls. By default, user endpoints are set up with a `TIMEOUT(absolute)` value of `36000`, or 10
hours, [through a `set_var` pjsip endpoint option](/uc-doc/administration/sip_templates). This
setting may be adjusted in the default SIP templates, or by defining a new SIP template and
overriding this setting.

### SIP transport timeouts

SIP transports have timeout configurations depending on the transport type.

For TCP-based timeouts, including websocket transports for webrtc,
[TCP keepalive settings](https://docs.asterisk.org/Latest_API/API_Documentation/Module_Configuration/res_pjsip/#tcp_keepalive_enable)
may be useful to detect broken connections.

```
# curl --header 'Content-Type: application/json' -H 'X-Auth-Token:'$TOKEN -XPUT 'https://wazo.example.com/api/confd/1.1/sip/transports/{transport_uuid} -d
{
  "name": "transport-tcp",
  "options": [
    [
      "protocol",
      "tcp"
    ],
    [
      "tcp_keepalive_enable",
      "yes"
    ],
    [
      "tcp_keepalive_time",
      "60"
    ],
    [
      "tcp_keepalive_intvl",
      "10"
    ],
    [
      "tcp_keepalive_probes",
      "3"
    ]
  ]
}
```

This example enables keepalives on a SIP TCP transport. The first keepalive probe would be sent 60
seconds after the last data packet was received, and the probe would be sent every 10 seconds up to
3 times before the connection is considered dead and is terminated.

For websocket transports (e.g. `transport-wss` for webrtc), the
[pjsip transport setting `websocket_write_timeout`](https://docs.asterisk.org/Latest_API/API_Documentation/Module_Configuration/res_pjsip/?h=websocket_write_timeout#method)
may also be useful.  
Its value is in milliseconds. A lower value means dead websocket connections are terminated faster,
but also means slow connections/slow processing endpoints may get disconnected.

### SIP global timers

The [SIP protocol specification](https://www.rfc-editor.org/rfc/rfc3261.html#page-265) relies on
configurable timers to define timeouts for SIP transactions. These timer settings are global,
affecting all endpoints.

`timer_t1` is a reference value used to compute other timers, and should be close to the average
network roundtrip time of SIP endpoints. This timer is only used directly for UDP transports.

```
$ ping <sip endpoint IP>
...
8 packets transmitted, 8 received, 0% packet loss, time 7011ms
rtt min/avg/max/mdev = 26.547/27.170/27.623/0.332 ms
```

Here, an endpoint's average latency is 27ms. The minimal value for `timer_t1` is 100ms, but the
default value is 500ms. Deployments in such low latency network conditions should benefit from
having `timer_t1` set to 100ms.

`timer_b` is the timer used as the timeout for INVITE transactions. It is conventionally set to
`64*timer_t1`. Assuming `timer_t1` is 100ms, `timer_b` would be 6400ms. This means a SIP INVITE
request (call attempt) will fail after 6.4 seconds.

### SIP RTP timeouts

RTP timeout settings on sip endpoints define expectations on the continuous flow of RTP traffic.

Some endpoints may stop sending RTP packets in some conditions, such as when put on mute. In this
case, a low `rtp_timeout` may cause those endpoints to be disconnected undesirably.

However, if SIP endpoints in use usually keep sending RTP packets in all normal situations, a low
`rtp_timeout` value may make sense to quickly detect unavailable endpoints or otherwise problematic
configurations (e.g. networking issues preventing end-to-end RTP flow). `rtp_timeout_hold` controls
the timeout on RTP traffic when an endpoint is in a hold state, to account for the RTP traffic
pattern of devices when no audio is to be generated (similar to mute).

```
# curl --header 'Content-Type: application/json' -H 'X-Auth-Token:'$TOKEN -XPUT 'https://wazo.example.com/api/confd/1.1/endpoints/sip/templates/$global_sip_template_uuid' -d '{
    ...
    "endpoint_section_options": [
        ["rtp_timeout", "60"],
        ["rtp_timeout_hold", "120"]
    ]
}'
```

Here, modifying the global sip template to set `rtp_timeout` to 60s and `rtp_timeout_hold` to 120s.
This ensures an endpoint generating no RTP traffic for 60s, or 120s in hold state, will be
considered dead and disconnected.

See [documentation on sip templates](/uc-doc/administration/sip_templates) for general information
on how to configure sip templates.

### SIP endpoint session timers

[RFC-4028](https://www.rfc-editor.org/rfc/rfc4028.html) defines the SIP protocol session timer
extension, which implements periodic refresh of SIP sessions through re-INVITEs. This ensures long
SIP sessions are refreshed periodically, which helps detect unavailable endpoints.

By default, the global sip template sets the endpoint section option `timers` to `yes`. This means
only endpoints explicitly supporting the session timer extension will see session timers used to
refresh the session. The refresh interval and timeout can be negotiated by supporting endpoints,
with the wazo server proposing `timers_session_expires` but accepting values no lower than
`timers_min_se` (both options in seconds).

However, the default webrtc sip template sets `timers` to `always`. This ensures session timers are
used by the wazo server even if the endpoint has no explicit support for session timers. In this
case, the wazo server will send re-INVITEs in ongoing SIP sessions periodically, and expect
acknowledgement from the endpoint. If the endpoint fails to acknowledge the INVITE, the endpoint
will be considered unavailable after the timeout value in seconds set by `timers_session_expires`.

The smallest configurable value for `timers_session_expires` and `timers_min_se` is 90, meaning an
unresponsive endpoint cannot be detected in less than 1m30s using session timers.

```
# curl --header 'Content-Type: application/json' -H 'X-Auth-Token:'$TOKEN -XPUT 'https://wazo.example.com/api/confd/1.1/endpoints/sip/templates/$global_sip_template_uuid' -d '{
    ...
    "endpoint_section_options": [
        ["timers", "always"],
        ["timers_session_expires", "300"]
    ]
}'
```

Here, modifying the global sip template to ensure session timers are always in use, with a periodic
refresh of 5 minutes. Dead calls with unresponsive endpoints should last no longer than 5 minutes.

## Conclusion

`TIMEOUT(absolute)` asterisk channel setting sets an absolute maximum duration for _all_ calls. This
can be set per endpoint through sip templates `set_var` endpoint section option.

TCP keepalive may be defined on TCP-based SIP transports (protocol `tcp`, `tls`, `ws`, `wss`) to
detect broken tcp connections.

Global sip timer parameters `timer_t1` and `timer_b` can be adjusted to set timing expectations for
SIP transactions which affect how quickly endpoints are considered unresponsive.

`websocket_write_timeout` can control throughput expectations on websocket transports.

RTP timeout settings may be adjusted to lower values when endpoints are expected to keep a
continuous flow of RTP traffic in all normal circumstances.

SIP session timers should be enabled on all endpoints, and may be forced even if endpoints have no
explicit support, but cannot detect unavailable endpoints in less than 1m30s.

A combination of those settings tested in and adjusted based on real or simulated production
environments should help provide optimal behavior when dealing with network instabilities and
resource leaks from so-called "phantom calls".

## See also

- [wazo documentation on sip templates](/uc-doc/administration/sip_templates)
- [SIP RFC](https://www.rfc-editor.org/rfc/rfc3261.html#page-265)
- [SIP session timer RFC](https://www.rfc-editor.org/rfc/rfc4028.html)
- [asterisk pjsip configuration documentation](https://docs.asterisk.org/Latest_API/API_Documentation/Module_Configuration/res_pjsip/)
