# Install the Class 4 engine

## Supported environments

The Class 4 engine supports the following deployment environments:

- **Ansible-based deployment**: install the platform on a set of Debian Buster machines, either bare-metal or virtual machines, using our Ansible recipes.
- **Docker compose**: run the platform on a single machine using the Docker images together with docker-compose.
- **Kubernetes**: install the platform using our Helm chart and run the platform on your Kubernetes cluster.

## Ansible-based deployment

The Class 4 engine is made of several components:

1. SBC (Kamailio)
2. Router (Kamailio)
3. Media Proxy (RTPengine)
4. Router API (`wazo-router-confd`)
5. PostgreSQL
6. Redis

If you use the Ansible recipes you need at least two hosts as you cannot run the SBC and the Router on the same machine.

To install the Class 4 engine in an all-in-one setup, do the following steps:

1. Install a Debian 10 Buster system with a default locale with an UTF-8 charset on each host you want to use, either bare metal or virtual machine.

2. Run the following commands as root on the Debian systems to provision sudo, git and Ansible:

```ShellSession
# apt-get install -yq sudo git ansible
```

3. Get the Wazo Platform installer and its dependencies:

```ShellSession
# git clone https://github.com/wazo-platform/wazo-ansible.git
# cd wazo-ansible
# ansible-galaxy install -r requirements-postgresql.yml
```

4. Create the Ansible inventory in `inventories/c4` to specify your hosts and your preferences, as follows:

Define one or more SBCs:

```Ini
[sbc_host]
sbc_1 ansible_ssh_host=10.0.1.1 ansible_ssh_port=22
sbc_2 ansible_ssh_host=10.0.1.1 ansible_ssh_port=22
```

Define one or more routers:

```Ini
[router_host]
router_1 ansible_ssh_host=10.0.2.1 ansible_ssh_port=22
router_2 ansible_ssh_host=10.0.2.2 ansible_ssh_port=22
```

Define one or more Media Proxies:

```Ini
[rtpengine_host]
rtpengine_1 ansible_ssh_host=10.0.3.1 ansible_ssh_port=22
rtpengine_2 ansible_ssh_host=10.0.3.2 ansible_ssh_port=22
```

Define, optionally, additional hosts for the database services:

```Ini
[database_host]
database_1 ansible_ssh_host=10.0.4.1 ansible_ssh_port=22

[redis_host]
redis_1 ansible_ssh_host=10.0.4.2 ansible_ssh_port=22
```

Assign the roles to the aforementioned hosts assigning them to the following groups:

```Ini
[sbc:children]
sbc_host

[router:children]
router_host

[router_api:children]
router_host

[rtpengine:children]
rtpengine_host

[database:children]
database_host

[redis:children]
redis_host

[c4:children]
sbc
router
router_api
rtpengine
database
redis
```

Configure your Class 4 engine with your deployment-specific settings, as follows:

```Ini
[database:vars]
postgresql_listen_addresses = *

[router:vars]
router_api_db_host = 10.0.4.1
router_api_redis_host = 10.0.4.2
router_dburl_dialog = redis://10.0.4.2:6379/2

[sbc:vars]
sbc_advertise_address = c4.wazo.cloud:5060
sbc_dispatcher_list = "1 sip:10.0.2.1:5060 16 10\n1 sip:10.0.2.2:5060 16 10"
sbc_dburl_dialog = redis://10.0.4.2:6379/2

[sbc_1_host:vars]
sbc_advertise_address = <PUBLIC IP ADDRESS OF THE SBC> # example: 1.2.3.4
sbc_advertise_port = 5060
rtpengine_public_address = 3.8.157.6

[sbc_2_host:vars]
sbc_advertise_address = <PUBLIC IP ADDRESS OF THE SBC> # example: 1.2.3.4
sbc_advertise_port = 5060

[rtpengine_1]
rtpengine_public_address = <PUBLIC IP ADDRESS OF THE MEDIA PROXY> # example: 1.2.3.4

[rtpengine_2]
rtpengine_public_address = <PUBLIC IP ADDRESS OF THE MEDIA PROXY> # example: 1.2.3.4
```

The various variables that can be customized are described at <https://github.com/wazo-platform/wazo-ansible/blob/master/README.md#variables>.

By default, Wazo Platform will install the development version. To install
the latest stable version, activate the following settings in your inventory:

```Ini
[c4:vars]
wazo_distribution = wazo-dev-buster
wazo_distribution_upgrade = wazo-dev-buster
```

5. Launch the installation by running the following command:

```ShellSession
# ansible-playbook -i inventories/c4 c4.yml
```

If you want to test the Class 4 engine on a single host, you can use Vagrant to provision two virtual machines using the provided `Vagrantfile`: 

```Ruby
# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  config.vm.box = "debian/buster64"
  config.vm.define :router do |t|
  end
  config.vm.define :sbc do |t|
end
```

You can now run:

```ShellSession
$ vargrant up
```

You can install the SBC and the Router, together with their dependencies, on the two virtual machines running:

```ShellSession
$ ansible-playbook -i inventories/c4-sbc-vagrant c4-sbc.yaml
$ ansible-playbook -i inventories/c4-router-vagrant c4-router.yaml
```

## Docker compose

The Wazo Project provides Docker containers for all the components of the Class 4 platform.
You can run a full instance of the platform on a single host using docker-compose.

To run the Class 4 engine using docker-compose, do the following steps:

1. Get the Class 4 engine docker-compose git repository:

```ShellSession
$ git clone https://github.com/wazo-platform/wazo-c4.git
$ cd wazo-c4
```

2. Run docker-compose:

```ShellSession
$ docker-compose up -d
```

The following services are started by docker compose:

- consul
- redis
- router-confd
- rtpe
- rtpe_secondary
- sbc
- sbc_secondary
- router
- router_secondary
- carrier
- wazo-tester

The following ports are exposed to the host:

- Consul RPC server (8300)
- Consul DNS (8600, TCP and UDP)
- Consul HTTP API (8500)
- PostgreSQL (5432)
- Redis (6379)
- Router confd (8000)
- SBC (5060, UDP only)

You can now access the management and configuration API using the following base URL:
http://localhost:8000
