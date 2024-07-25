---
title: Kamailio service discovery with Consul
date: 2019-12-02
author: Fabio Tranchitella
category: Wazo Platform C4
tags: [wazo-platform, c4, consul, kubernetes, cloud, kamailio, sip]
slug: kamailio-consul-service-discovery
status: published
---

# Using Consul for service discovery in Wazo Platform C4

## Introduction

As we started with the deployment of our C4 (Class 4) [SBC and routing solution on a Kubernetes Cluster through a Helm Chart](/blog/wazo-platform-c4-on-kubernetes), we knew that scaling would be a core feature.

Dynamic scaling brought additional complexity in the configuration of our Kamailio components. Having a cloud-native solution meant that we had to find a way to make SBCs and routers auto-configure themselves without human intervention or static configurations, which will bound the size of our architecture.

We wanted to deploy Wazo on different kinds of platforms, not only containerized with Kubernetes but also with Docker compose or on Virtual machines using Ansible recipes. We had to choose a tool that will help us in service discovery and the flexible configuration of our components. That's where we decided that [HashiCorp Consul](https://www.consul.io) was the right tool to use.

<!-- truncate -->

## What is Consul?

The [official](https://www.consul.io) definition of Consul is:

`Consul is a service networking solution to connect and secure services across any runtime platform and public or private cloud`

Consul is a distributed, highly available, and datacenter-aware service discovery and configuration system. It provides different features to provide consistent and detailed information regarding your infrastructure. Among the most relevant features:

- **Service and node discovery:** Using Consul agent or HTTP requests can be used to register a service so that other applications that depend on those services can easily find them through HTTP or DNS.

- **Health checks:** Consul agent can provide different health checks associated with a given service, for example: "is the web service returning a 200 OK?" or "is the memory utilization below 90%?".

- **Key/value storage:** Applications can use Consul's KV store via HTTP API requests for dynamic configuration, flagging, coordination, and many more.

- **Secure Service Communication:** TLS certificates can be generated and distributed through Consul. Intentions (Access Controls) and service segmentation can be managed and changed in real-time.

- **Multi Datacenter:** Consul supports multiple data center out of the box, so no need for additional layers of abstraction to grow to various regions.

Last but not least, it has a flexible and powerful interface that allows users to have an up-to-date view of the infrastructure.

## Wazo Platform C4's service discovery needs

Wazo Platform C4 grew from a single Kamailio instance of our PoC to different components, which we define Session Border Controller (SBC), Router, and RTP Engine (RTPe). With a database (PostgreSQL) and a routing API (wazo-router-confd), it started to be a more complex architecture than the one we used for the MVP.

All of those components are interacting in different ways. We have a SIP, an RTP, and a data flow between them. Also, We split the monolithic Kamailio component into two independent parts, the SBC and Router to be able to scale those two different layers independently.

We wanted to keep it as simple as possible, which is also our development rule number one at Wazo.

Every SIP developer knows that dynamically scaling a SIP/VoIP infrastructure is no easy task, so we defined what the parameters that had to be configurable, such as dispatcher list, domains, and RTPengine list are.

## Service registration

All of our services use HTTP API requests towards Consul for registering and de registering. The data provided to Consul defines the type of the service, the IP and port, and also a Health-Check performed by Consul.

An example of a service registration request follows:

```ShellSession
$ cat > data.json <<EOF
{
    "ID": "$HOSTNAME",
    "Name": "sbc",
    "Tags": ["sbc", "kamailio"],
    "Address": "$IP_ADDRESS",
    "Port": $SIP_PORT,
    "Check": {
        "ID": "XHTTP",
        "Name": "XHTTP API on port 8000",
        "DeregisterCriticalServiceAfter": "10m",
        "Method": "GET",
        "HTTP": "HTTP://$IP_ADDRESS:8000/status",
        "Timeout": "1s",
        "Interval": "10s"
    }
}
EOF

$ curl -i -X PUT -H "Content-Type: application/json" HTTP://${CONSUL_URI}/v1/agent/service/register -d "@data.json"
```

We run that service registration at startup, and in case the service dies, a de-registration call is triggered upon exit as simple as this:

```ShellSession
$ curl -X PUT HTTP://${CONSUL_URI}/v1/agent/service/deregister/$HOSTNAME
```

## Using consul-template

[Consul-template](https://github.com/hashicorp/consul-template) is a template rendering, notifier, and supervisor for Consul also provided by [Hashicorp](https://www.hashicorp.com/).

It's a daemon that runs queries to and listens to events from your Consul cluster and updates different specified templates on the file system. It can optionally run commands after completing the update process.

An example of a template for the dispatcher list on our SBC node follows:

```Javascript
# setid(int) destination(sip uri) flags(int,opt) priority(int,opt) attributes(str,opt)
{{range $index, $service := service "router"}}1 sip:{{.Address}}:{{.Port}} 16 10
{{end}}
```

It queries the consul API for services defined as `router` then lists them in a Kamailio dispatcher format. The format of the template is standard [GoLang templating](https://pkg.go.dev/text/template) with the addition of several [functions](https://github.com/hashicorp/consul-template/blob/master/template/funcs.go).

To run the consul-template daemon, we use the following command:

```ShellSession
$ consul-template \
    -consul-addr "%(CONSUL_URI)s" \
    -template "/consul-templates/dispatcher-list.tpl:/etc/kamailio/dispatcher.list:kamcmd dispatcher.reload"
```

As you can see, `consul-template` uses the dispatcher list template shown above and outputs the data in `/etc/kamailio/dispatcher.list.` After it's done, it also performs `kamcmd dispatcher.reload` to signal to Kamailio on our SBC to reload the dispatcher list.

## What's next?

We now want to use Consul's KV store to keep all the environmental variables in Consul and populate them at boot on our machines instead of using env files in docker-compose or Kubernetes. There's another tool from Hashicorp called [envconsul](https://github.com/hashicorp/envconsul) that provides exactly that functionality.

## Conclusions

Wazo Platform C4 components are now easily scalable and auto-configure themselves thanks to Consul and `consul-template`. Deploying our C4 in Kubernetes is more natural because the elements auto-configure themselves and adapt to the changes in the infrastructure.
