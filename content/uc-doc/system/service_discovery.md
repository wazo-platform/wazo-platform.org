---
title: Service Discovery
---

Wazo uses [consul](https://consul.io) for service discovery. When a daemon is started, it registers
itself on the configured consul node.

[Consul template](https://github.com/hashicorp/consul-template) may be used to generate the
configuration files for each daemons that requires the availability of another service. Consul
template can also be used to reload the appropriate service.
