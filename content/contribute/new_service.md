# New service guidelines

## Rationale

When writing new service, you need to follow our guidelines to be sure all services in Wazo Platform are in the same vision.

Before writing a new service please add a [wpep](https://github.com/wazo-platform/wpep) to discuss about the service.

## Conventions

### HTTP ports

Wazo Platform uses TCP ports starting from 9486 (used for wazo-confd) upward. When creating a new daemon, pick the next unused port.
See [Network](/uc-doc/contributors/network) for more information.


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
