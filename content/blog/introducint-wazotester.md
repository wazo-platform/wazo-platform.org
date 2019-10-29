Title: wazo-tester - an introduction to our SIP testing tool
Date: 2019-10-29
Author: Aleksandar Sosic
Category: Wazo C4
Tags: wazo
Slug: wazo-tester-introduction
Status: published

# wazo-tester - an introduction to our SIP testing tool

## Introduction
In a complex microservice VoIP architecture testing the functionalities or stress testing the whole system becomes a complex task especially if we want to run multiple tests and have a sterile environment for every test run without restarting the whole infrastructure every time. Also, there is a need for testing the architecture under heavy load but in a random way, much more close to real-life usage.

With our experience with scalable VoIP infrastructure and a lot of trials and errors, creating a mess with a lot of bash scripts doing different things preparing the environment for launching sipp tests and scenarios we decided to start from a clean slate and redesign or way to do tests.


## The scenario files
We wanted to have a descriptive method for defining procedures and running tests and came up with a simple YAML configuration file with the following root keys:
* setup
* teardown
* workers

### setup
It contains a list of actions to perform before the real testing. The parameters are the following:
- **type**: for now only `api` is implemented which makes a REST API calls towards our `wazo-router-confd`

### teardown
Contains a list of actions to perform after the SIP tests. As for the setup key, teardown, for now, implements only REST API calls. The delete method of the tenant deletes also the other corresponding elements, that's why we use in our example only the deletion for the tenant.

### workers
It contains the list of workers to be created to perform the tests. It supports the following configuration parameters:

* **number**: the number of instances to run (defaults to `1`)
* **repeat**: the number of times this worker should run (defaults to `1`)
* **timeout**: maximum number of seconds the worker can run before being killed, defaults to `None` (no timeout is enforced)
* **scenario**: the path to the XML sipp scenario to run relative to the YAML configuration file
* **delay**: number of ms of delay before running the workers (defaults to `0`)
* **call_limit**: maximum number of concurrent active calls (`-l` parameter of sipp), defaults to `1`
* **call_number**: maximum number of calls (`-m` parameter of sipp) (defaults to `1`)
* **call_rate**: call rate increment (`-r` parameter of sipp) (defaults to `1`)
* **call\_rate\_period**: call rate period in ms (`-rp` parameter of sipp) (/(defaults to `1000`)
* **values**: key/value map of numerical or string values to be replaced in the XML template.

The parameters which accept numerical values have support for random values expressed as follows:
```
delay:
  min: 1000
  max: 2000
```

Random values are calculated based on the random machine seed number printed by `wazotester` and configurable through the `-s` option to make random tests reproducible.

### Example
This is an example YAML file for running a DID test onto our C4 infrastructure testing the routing:

```setup:
  - type: api
    uri: /tenants/
    method: POST
    store_response: tenant
    payload:
      name: tenant_{random.uuid4}
  - type: api
    uri: /domains/
    method: POST
    store_response: domain
    payload:
      domain: domain-{random.uuid4}
      tenant_id: "{tenant.id}"
  - type: api
    uri: /ipbx/
    method: POST
    store_response: ipbx
    payload:
      ip_fqdn: ipbx.local
      tenant_id: "{tenant.id}"
      domain_id: "{domain.id}"
      customer: "{tenant.id}"
      username: user
      password: pass
      registered: False
  - type: api
    uri: /carriers/
    method: POST
    store_response: carrier
    payload:
      name: carrier_{random.uuid4}
      tenant_id: "{tenant.id}"
  - type: api
    uri: /carrier_trunks/
    method: POST
    store_response: carrier_trunk
    payload:
      name: carrier_trunk_{random.uuid4}
      carrier_id: "{carrier.id}"
      sip_proxy: proxy.somedomain.com
      ip_address: "{ipaddr.ip}"
      registered: True
      auth_username: user
      auth_password: pass
      realm: somerealm.com
      registrar_proxy: registrar-proxy.com
      from_domain: gw.somedomain.com
      expire_seconds: 1800
      retry_seconds: 10
  - type: api
    uri: /dids/
    method: POST
    store_response: did
    payload:
      did_regex: ^39040[0-9]+
      tenant_id: "{tenant.id}"
      ipbx_id: "{ipbx.id}"
      carrier_trunk_id: "{carrier_trunk.id}"

teardown:
  - type: api
    method: DELETE
    uri: "/tenants/{tenant.id}"
    
workers:
  - scenario: "test_did_ok.xml"
    number: 1
    repeat: 2
    timeout: 600
    call_rate: 1
    call_rate_period: 1000
    call_limit: 1
    call_number: 1
    values:
      call_duration: 1000
      to_user: "39040123456"
      to_domain: "anotherdomain.com"
      to_port: "5060"
```

As you can observe we launch a bunch of API calls to define a `tenant`, a `domain`, an `ipbx` machine we will route the traffic to and at the end we create a `did` to match all the calls with this regexp `^39040[0-9]+` and route them to our ipbx.

The `worker` part uses a sipp scenario and calls a user on this number `39040123456` which will match our did rule and with our Kamailio C4 routing will route the call to our ipbx. The `ipbx` will then respond with a predefined scenario and make the sipp test pass.

The `scenario` file is a template sipp XML file which we parse with python and substitute the `values` defined in the `workers` part of our YAML. 

For example, the `%(to_user)s` in our XML example is changed into `39040123456` and only then sipp is run with the generated XML file.

In this way we avoid using CSV files with sipp `-inf` argument.


## Installing wazotester
`wazotester` is a python package easily installable from our pypi server with a simple command:
```$ pip3 install --extra-index-url https://pypi.k8s.wazo.cloud wazotester```

Or from our repository [wazo-tester](https://github.com/wazo-platform/wazo-tester) using `make venv`, entering the environment with `source venv/bin/activate` and then running `make setup`. `wazotester` is then run within the python3 virtual environment.


## Preparing a testing environment
  
The best way to try wazotester is with the Wazo C4 is to run Wazo C4 from our repository [wazo-kamailio-config](https://github.com/wazo-platform/wazo-kamailio-config) using `Docker` with `docker-compose` which runs different containers defined in the `docker-compose.yaml` file.


## Running tests
`wazotester` accepts different parameters from the command line. Running `wazotester --help` will print:
```
Options:
  -t, --target TEXT      IP address of the SIP server to use as target
  -e, --executable TEXT  Command to exec for running sipp
  -d, --directory PATH   Working directory, if not specified a temporary
                         directory is created. 
  -s, --seed INTEGER     Initialize the Python random machine with this seed
                         value.
  -a, --apiurl TEXT      [default: http://router-confd:8000]
  --no-setup             Skip setup step in yaml file
  --no-teardown          Skip teardown step in yaml file
  --help                 Show this message and exit.
  ```

The options are simple and don't need any further explanation.

Once the C4 environment is up and running you can enter the `client` container with:
```$ docker exec -it wazo-kamailio-config_client_1 bash```

Inside the container an example test can be run from the directory `/tests/scenarios/`:
```$ wazotester test_did_ok.yaml```

In the directory `/tests/` of the `client` container you can find a `pytest` file `test_all.py` which triggers all the tests running a simple `make test` from you machine which is a shortcut for the command:
```docker exec wazo-kamailio-config_client_1 pytest /tests/```

