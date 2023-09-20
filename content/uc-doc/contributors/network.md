---
title: Network
---

Network Flow table (IN) :

| Daemon Name     | Service | Protocol | Port  | Listen    | Authentication | Enabled |
| --------------- | ------- | -------- | ----- | --------- | -------------- | ------- |
| \-              | ICMP    | ICMP     | \-    | 0.0.0.0   | no             | yes     |
| postfix         | SMTP    | TCP      | 25    | 0.0.0.0   | yes            | yes     |
| isc-dhcpd       | DHCP    | UDP      | 67    | 0.0.0.0   | no             | no      |
| isc-dhcpd       | DHCP    | UDP      | 68    | 0.0.0.0   | no             | no      |
| wazo-provd      | TFTP    | UDP      | 69    | 0.0.0.0   | no             | yes     |
| ntpd            | NTP     | UDP      | 123   | 0.0.0.0   | yes            | yes     |
| monit           | HTTP    | TCP      | 2812  | 127.0.0.1 | no             | yes     |
| asterisk        | SIP     | UDP      | 5060  | 0.0.0.0   | yes            | yes     |
| asterisk        | IAX     | UDP      | 4569  | 0.0.0.0   | yes            | yes     |
| asterisk        | SCCP    | TCP      | 2000  | 0.0.0.0   | yes            | yes     |
| asterisk        | AMI     | TCP      | 5038  | 127.0.0.1 | yes            | yes     |
| asterisk        | HTTP    | TCP      | 5039  | 127.0.0.1 | yes            | yes     |
| sshd            | SSH     | TCP      | 22    | 0.0.0.0   | yes            | yes     |
| nginx           | HTTP    | TCP      | 80    | 0.0.0.0   | yes            | yes     |
| nginx           | HTTPS   | TCP      | 443   | 0.0.0.0   | yes            | yes     |
| nginx           | HTTP    | TCP      | 8667  | 0.0.0.0   | no            | yes     |
| munin           | HTTP    | TCP      | 4949  | 127.0.0.1 | no             | yes     |
| postgresql      | SQL     | TCP      | 5432  | 127.0.0.1 | yes            | yes     |
| rabbitMQ        | AMQP    | TCP      | 5672  | 0.0.0.0   | yes            | yes     |
| wazo-provd      | HTTP    | TCP      | 8666  | 127.0.0.1 | yes            | yes     |
| wazo-provd      | HTTP    | TCP      | 18667 | 127.0.0.1 | no             | yes     |
| wazo-confgend   | HTTP    | TCP      | 8669  | 127.0.0.1 | no             | yes     |
| wazo-sysconfd   | HTTP    | TCP      | 8668  | 127.0.0.1 | no             | yes     |
| wazo-auth       | HTTP    | TCP      | 9497  | 127.0.0.1 | both           | yes     |
| wazo-call-logd  | HTTP    | TCP      | 9298  | 127.0.0.1 | yes            | yes     |
| wazo-dird       | HTTP    | TCP      | 9489  | 127.0.0.1 | yes            | yes     |
| wazo-webhookd   | HTTP    | TCP      | 9300  | 127.0.0.1 | yes            | yes     |
| wazo-setupd     | HTTP    | TCP      | 9302  | 127.0.0.1 | yes            | yes     |
| wazo-chatd      | HTTP    | TCP      | 9304  | 127.0.0.1 | yes            | yes     |
| wazo-confd      | HTTP    | TCP      | 9486  | 127.0.0.1 | yes            | yes     |
| wazo-amid       | HTTP    | TCP      | 9491  | 127.0.0.1 | yes            | yes     |
| wazo-agentd     | HTTP    | TCP      | 9493  | 127.0.0.1 | yes            | yes     |
| wazo-phoned     | HTTP    | TCP      | 9498  | 0.0.0.0   | IP filtering   | yes     |
| wazo-phoned     | HTTPS   | TCP      | 9499  | 0.0.0.0   | IP filtering   | yes     |
| wazo-calld      | HTTP    | TCP      | 9500  | 127.0.0.1 | yes            | yes     |
| wazo-websocketd | WS      | TCP      | 9502  | 127.0.0.1 | yes            | yes     |
| wazo-plugind    | HTTP    | TCP      | 9503  | 127.0.0.1 | yes            | yes     |
