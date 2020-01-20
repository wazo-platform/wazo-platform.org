# New service guidelines

## Rationale

When writing new service, you need to follow our guidelines to be sure all services in Wazo Platform are in the same vision.

Before writing a new service please add a [wpep](https://github.com/wazo-platform/wpep) to discuss about the service.

## Conventions

### HTTP ports

Wazo Platform uses TCP ports starting from 9486 (used for wazo-confd) upward. When creating a new daemon, pick the next unused port above 9503.

Network Flow table (IN)

| Daemon Name    | Service      | Protocol | Port  | Listen     | Authentication  | Enabled |
| -------------- |:------------:|:--------:| -----:|:----------:|:---------------:|:-------:|
| -              |ICMP          |ICMP      |  -    | 0.0.0.0    | no              | yes     |
|postfix         |SMTP          |TCP       | 25    | 0.0.0.0    | yes             | yes     |
|isc-dhcpd       |DHCP          |UDP       | 67    | 0.0.0.0    | no              | no      |
|isc-dhcpd       |DHCP          |UDP       | 68    | 0.0.0.0    | no              | no      |
|wazo-provd      |TFTP          |UDP       | 69    | 0.0.0.0    | no              | yes     |
|ntpd            |NTP           |UDP       | 123   | 0.0.0.0    | yes             | yes     |
|monit           |HTTP          |TCP       | 2812  | 127.0.0.1  | no              | yes     |
|asterisk        |SIP           |UDP       | 5060  | 0.0.0.0    | yes             | yes     |
|asterisk        |IAX           |UDP       | 4569  | 0.0.0.0    | yes             | yes     |
|asterisk        |SCCP          |TCP       | 2000  | 0.0.0.0    | yes             | yes     |
|asterisk        |AMI           |TCP       | 5038  | 127.0.0.1  | yes             | yes     |
|asterisk        |HTTP          |TCP       | 5039  | 127.0.0.1  | yes             | yes     |
|asterisk        |HTTPS         |TCP       | 5040  | 127.0.0.1  | yes             | yes     |
|sshd            |SSH           |TCP       | 22    | 0.0.0.0    | yes             | yes     |
|nginx           |HTTP          |TCP       | 80    | 0.0.0.0    | yes             | yes     |
|nginx           |HTTPS         |TCP       | 443   | 0.0.0.0    | yes             | yes     |
|munin           |HTTP          |TCP       | 4949  | 127.0.0.1  | no              | yes     |
|postgresql      |SQL           |TCP       | 5432  | 127.0.0.1  | yes             | yes     |
|rabbitMQ        |AMQP          |TCP       | 5672  | 0.0.0.0    | yes             | yes     |
|consul          |Consul RPC    |TCP       | 8300  | 127.0.0.1  | yes             | yes     |
|consul          |Consul SerfLAN|TCP/UDP   | 8301  | 127.0.0.1  | yes             | yes     |
|consul          |Consul SerfWAN|TCP/UDP   | 8302  | 127.0.0.1  | yes             | yes     |
|consul          |Consul HTTP   |TCP       | 8500  | 127.0.0.1  | both            | yes     |
|consul          |Consul HTTPS  |TCP       | 8501  | 127.0.0.1  | both            | yes     |
|wazo-provd      |HTTPS         |TCP       | 8666  | 127.0.0.1  | yes             | yes     |
|wazo-provd      |HTTP          |TCP       | 8667  | 0.0.0.0    | no              | yes     |
|wazo-confgend   |HTTP          |TCP       | 8669  | 127.0.0.1  | no              | yes     |
|xivo-sysconfd   |HTTP          |TCP       | 8668  | 127.0.0.1  | no              | yes     |
|wazo-auth       |HTTPS         |TCP       | 9497  | 0.0.0.0    | both            | yes     |
|wazo-call-logd  |HTTPS         |TCP       | 9298  | 0.0.0.0    | yes             | yes     |
|wazo-dird       |HTTPS         |TCP       | 9489  | 0.0.0.0    | yes             | yes     |
|wazo-webhookd   |HTTPS         |TCP       | 9300  | 0.0.0.0    | yes             | yes     |
|wazo-setupd     |HTTPS         |TCP       | 9302  | 0.0.0.0    | yes             | yes     |
|wazo-chatd      |HTTPS         |TCP       | 9304  | 0.0.0.0    | yes             | yes     |
|wazo-confd      |HTTPS         |TCP       | 9486  | 0.0.0.0    | yes             | yes     |
|wazo-amid       |HTTPS         |TCP       | 9491  | 0.0.0.0    | yes             | yes     |
|wazo-agentd     |HTTPS         |TCP       | 9493  | 0.0.0.0    | yes             | yes     |
|wazo-phoned     |HTTP          |TCP       | 9498  | 0.0.0.0    | IP filtering    | yes     |
|wazo-phoned     |HTTPS         |TCP       | 9499  | 0.0.0.0    | IP filtering    | yes     |
|wazo-calld      |HTTPS         |TCP       | 9500  | 0.0.0.0    | yes             | yes     |
|wazo-websocketd |WSS           |TCP       | 9502  | 0.0.0.0    | yes             | yes     |
|wazo-plugind    |HTTPS         |TCP       | 9503  | 0.0.0.0    | yes             | yes     |

## Checklist

Checklist of things to remember when adding a new service to Wazo Platform:

- The service default user is not root
- The service default user cannot log in to a shell
- The service default user does not have a /home/user, only a /var/lib/user if necessary
- The service default user has write permissions for the default log file
- The service default user has write permissions for the PID file and its directory
- The service default user is part of the consul group if the service needs the default consul config file
- The service is added to wazo-service if necessary
- The service is monitored by monit
- The service is correctly installed on a fresh install
- The service is correctly started on a reboot
- The service is correctly started on a wazo-upgrade
- The service is the correct state (running or stopped) after an upgrade of the slave machine
- The service is documented on wazo-platform.org
- The service config files are copied by xivo-backup
- The service config files are listed in the documentation for files backup
- The service registers with consul for the discovery of services
  - Add an entry to the acceptance test: `daily/service_discovery.feature`
- The ports used are listed in the doc. Ports are not usually used for testing HTTP (8000, 8080, etc.).
- The OpenAPI/Swagger spec is offered at `http://<service_root_api>/<version>/api/api.yml`
- The REST API is accessible via GET `https://wazo/api/<service>`
  - Add an entry to the acceptance test: `daily/http/http.feature`
- The service has packaging instructions for the latest Debian stable
- The versions of the service dependencies are available as Debian packages in Debian stable or Wazo Platform
  - requirements.txt pins package versions equal to Debian packages
  - If a package is not available in Debian, we need to package the version in our repo like the other wazo-<name_dependencies>-packaging.
