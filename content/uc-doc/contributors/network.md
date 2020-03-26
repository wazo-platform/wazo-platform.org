---
title: Network
subtitle: Configuration for daemon
---

Network Flow table (IN) :

| Daemon Name      | Service      | Protocol  | Port | Listen    | Authentication | Enabled |
| ---------------- | ------------ | --------- | ---- | --------- | -------------- | ------- |
| \-               | ICMP         | ICMP      | \-   | 0.0.0.0   | no             | yes     |
| postfix          | SMTP         | TCP       | 25   | 0.0.0.0   | yes            | yes     |
| isc-dhcpd        | DHCP         | UDP       | 67   | 0.0.0.0   | no             | no      |
| isc-dhcpd        | DHCP         | UDP       | 68   | 0.0.0.0   | no             | no      |
| wazo-provd       | TFTP         | UDP       | 69   | 0.0.0.0   | no             | yes     |
| ntpd             | NTP          | UDP       | 123  | 0.0.0.0   | yes            | yes     |
| monit            | HTTP         | TCP       | 2812 | 127.0.0.1 | no             | yes     |
| asterisk         | SIP          | UDP       | 5060 | 0.0.0.0   | yes            | yes     |
| asterisk         | IAX          | UDP       | 4569 | 0.0.0.0   | yes            | yes     |
| asterisk         | SCCP         | TCP       | 2000 | 0.0.0.0   | yes            | yes     |
| asterisk         | AMI          | TCP       | 5038 | 127.0.0.1 | yes            | yes     |
| asterisk         | HTTP         | TCP       | 5039 | 127.0.0.1 | yes            | yes     |
| asterisk         | HTTPS        | TCP       | 5040 | 127.0.0.1 | yes            | yes     |
| sshd             | SSH          | TCP       | 22   | 0.0.0.0   | yes            | yes     |
| nginx            | HTTP         | TCP       | 80   | 0.0.0.0   | yes            | yes     |
| nginx            | HTTPS        | TCP       | 443  | 0.0.0.0   | yes            | yes     |
| munin            | HTTP         | TCP       | 4949 | 127.0.0.1 | no             | yes     |
| postgresql       | SQL          | TCP       | 5432 | 127.0.0.1 | yes            | yes     |
| rabbitMQ         | AMQP         | TCP       | 5672 | 0.0.0.0   | yes            | yes     |
| consul           | Consul RPC   | TCP       | 8300 | 127.0.0.1 | yes            | yes     |
| consul           | Consul Serf  | TCP/UDP   | 8301 | 127.0.0.1 | yes            | yes     |
|                  | LAN          |           |      |           |                |         |
| consul           | Consul Serf  | TCP/UDP   | 8302 | 127.0.0.1 | yes            | yes     |
|                  | WAN          |           |      |           |                |         |
| consul           | Consul HTTP  | TCP       | 8500 | 127.0.0.1 | both           | yes     |
| consul           | Consul HTTPS | TCP       | 8501 | 127.0.0.1 | both           | yes     |
| wazo-provd       | HTTPS        | TCP       | 8666 | 127.0.0.1 | yes            | yes     |
| wazo-provd       | HTTP         | TCP       | 8667 | 0.0.0.0   | no             | yes     |
| wazo-confgend    | HTTP         | TCP       | 8669 | 127.0.0.1 | no             | yes     |
| xivo-sysconfd    | HTTP         | TCP       | 8668 | 127.0.0.1 | no             | yes     |
| wazo-auth        | HTTPS        | TCP       | 9497 | 0.0.0.0   | both           | yes     |
| wazo-call-logd   | HTTPS        | TCP       | 9298 | 0.0.0.0   | yes            | yes     |
| wazo-dird        | HTTPS        | TCP       | 9489 | 0.0.0.0   | yes            | yes     |
| wazo-webhookd    | HTTPS        | TCP       | 9300 | 0.0.0.0   | yes            | yes     |
| wazo-setupd      | HTTPS        | TCP       | 9302 | 0.0.0.0   | yes            | yes     |
| wazo-chatd       | HTTPS        | TCP       | 9304 | 0.0.0.0   | yes            | yes     |
| wazo-confd       | HTTPS        | TCP       | 9486 | 0.0.0.0   | yes            | yes     |
| wazo-amid        | HTTP         | TCP       | 9491 | 127.0.0.1 | yes            | yes     |
| wazo-agentd      | HTTPS        | TCP       | 9493 | 0.0.0.0   | yes            | yes     |
| wazo-phoned      | HTTP         | TCP       | 9498 | 0.0.0.0   | IP filtering   | yes     |
| wazo-phoned      | HTTPS        | TCP       | 9499 | 0.0.0.0   | IP filtering   | yes     |
| wazo-calld       | HTTPS        | TCP       | 9500 | 0.0.0.0   | yes            | yes     |
| wazo-websocketd  | WSS          | TCP       | 9502 | 0.0.0.0   | yes            | yes     |
| wazo-plugind     | HTTPS        | TCP       | 9503 | 0.0.0.0   | yes            | yes     |
