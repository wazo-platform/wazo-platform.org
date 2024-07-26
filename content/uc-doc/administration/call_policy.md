---
title: Call Policy
tags: administration,call,policy,api
slug: call-policy
---

There exists multiple ways to constrain calls performed through the Wazo platform.

## Call duration

A common need is to constrain the maximum duration of calls.

Calls consume resources on a system, and are expected to eventually conclude and free those
resources. A call that is never hung up will continue consuming resources indefinitely, which limits
the capacity of the system to support more calls.

Calls that remain connected indefinitely can be the result of technical issues, such as the system
thinking both ends of the call are still connected when they are not. They can also occur if both
ends are actually connected on the call indefinitely, such as a user agent(softphone or hardware
phone device) connected to the call being left unattended .

Multiple settings can be used to avoid such scenarios and control the maximum duration of calls.

The available options can depend on the type of user lines being used.

### SIP endpoints

A user line or a trunk using the SIP protocol is associated with a SIP endpoint.

SIP endpoints support a number of configuration options that can affect call duration.

Those options are supported by way of the
[Asterisk pjsip driver](https://docs.asterisk.org/Asterisk_16_Documentation/API_Documentation/Module_Configuration/res_pjsip)
endpoints configuration.

SIP endpoint options can be configured in two ways:

1. through SIP templates, which can be applied to all or a subset of SIP endpoints in a tenant;  
   each tenant has a `global` SIP template which represent common options which can apply to all SIP
   endpoints. Other templates can specify options for a specific subset of SIP endpoints.  
   See [SIP templates documentation](/uc-doc/administration/sip_templates) for information on how to
   query and configure SIP templates.

2. directly through a SIP endpoint's individual configuration;  
   individual endpoint configuration can be changed through the
   `/api/confd/1.1/endpoints/sip/{sip_uuid}` REST API endpoint.  
   See
   [API reference](/documentation/api/configuration.html#tag/endpoints/operation/update_endpoint_sip)
   for details.

SIP endpoint options relevant for controlling call duration include

- [`rtp_timeout`](https://docs.asterisk.org/Asterisk_16_Documentation/API_Documentation/Module_Configuration/res_pjsip/?h=rtp_timeout#rtp_timeout):
  this option sets a timeout(in seconds) when no RTP traffic is flowing to this endpoint(meaning no
  audio or video path is functionally established between this endpoint and its peer) _while off
  hold_
- [`rtp_hold_timeout`](https://docs.asterisk.org/Asterisk_16_Documentation/API_Documentation/Module_Configuration/res_pjsip/?h=rtp_timeout#rtp_timeout_hold):
  this option sets a timeout(in seconds) when no RTP traffic is flowing to this endpoint(meaning no
  audio or video path is functionally established between this endpoint and its peer) _while
  on-hold_
- `set_var: TIMEOUT(absolute)=<seconds>`: here the `set_var` option of SIP endpoints can be used to
  set an Asterisk channel variable `TIMEOUT(absolute)`, which limits the absolute maximum duration
  of a call with that SIP endpoint; this affects any call, no matter its particular state at the
  expiration of the timeout(i.e. whether there is any kind of activity or not on the call)

**Note**: since wazo platform release 24.08, a `set_var: TIMEOUT(absolute)=36000` option is included
in global SIP templates, thus limiting all calls using SIP endpoints to 10 hours by default. This
timeout value can be changed by changing this option in the endpoint options of the global SIP
template of a tenant.
