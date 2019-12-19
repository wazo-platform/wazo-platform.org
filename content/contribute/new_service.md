# New service guidelines

## Rationale

When writing new service, you need to follow our guidelines to be sure all services in Wazo are in the same vision.

Before writing a new service please add a [wpep](https://github.com/wazo-platform/wpep) to discuss about the service.

## Checklist

Checklist of things to remember when adding a new service to Wazo

- The default log file has the right to be written by the service
- The PID file and its directory have the right to be written by the service
- The service is added to wazo-service if necessary
- The service is monitored
- The service is installed on a fresh install
- The service is well started on a reboot
- The service is well started on a wazo-upgrade
- The service is in good condition during an update of the slave
- The service is well added to the architectural diagram
- The service is not root by default
- The user of the service cannot log in
- The service user does not have a /home/user, only a /var/lib/user if necessary
- If the service must have the default consul conf file, it is part of the consul group
- The service config files are copied by xivo-backup
- The backup doc specifies that the files are copied
- The service registers with consul for the discovery of services
  - Add an entry to the acceptance test: `daily/service_discovery.feature`
- The ports used are listed in the doc and need to be not the default port of dev server.
- The REST API is accessible via GET `https://wazo/api/<service>`
  - Add an entry to the acceptance test: `daily/http/http.feature`
- The REST API is visible in openAPI/swagger spec in `<service_root_api>/<version>/api/api.yml`
- The service need to be package on the latest debian stable
  - If there is dependencies for this service, the dependencies need to be package on debian
  - The requirements.txt need to have the same dependencies and same version than we have in debian stable
    - If not, we need to package the version in our repo like the other wazo-<name_dependencies>-packaging.
