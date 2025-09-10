---
title: Service Discovery
---

Wazo can use [consul](https://developer.hashicorp.com/consul) for service discovery. By default it is disabled, but can
be enabled with [Custom Configuration File](/uc-doc/system/configuration_files). Example:

```yaml
consul:
  scheme: http
  host: consul.example.com
  port: 8500
  token: 'the_one_ring'

# All time intervals are in seconds.
service_discovery:
  # Indicates whether of not to use service discovery.
  enabled: true
  # The address that will be received by other services using service discovery.
  # Use "advertise_address: auto" to enable ip address detection based on
  # advertise_address_interface
  advertise_address: auto
  # If advertise_address is "auto" this interface will be used to find the ip
  # address to advertise. Ignored otherwise
  advertise_address_interface: eth0
  advertise_port: 9304
  # The number of seconds that consul will wait between 2 ttl messages to mark
  # this service as up
  ttl_interval: 30
  # The time interval before the service sends a new ttl message to consul
  refresh_interval: 27
  # The time interval to detect that the service is running when starting
  retry_interval: 2
  extra_tags: []
```

With this configuration, when a daemon is started, it registers itself on the configured consul
node.

[Consul template](https://github.com/hashicorp/consul-template) may be used to generate the
configuration files for each daemons that requires the availability of another service. Consul
template can also be used to reload the appropriate service.
