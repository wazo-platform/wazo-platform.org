Title: Installing the Wazo Class 4 engine with Ansible
Date: 2020-02-18
Author: Fabio Tranchitella and Aleksandar Sosic
Category: Wazo Platform C4
Tags: wazo-platform, c4, ansible
Slug: install-wazo-c4-with-ansible
Status: published


# Installing the Wazo Class 4 engine with Ansible


## Introduction
In our pursuit of enabling companies to build their IP communication infrastructure and deliver innovative communication services with our open-source, API-centric solutions Wazo's Class 4 engine can be easily deployed with different methods:

* **Docker compose:** run the platform on a single machine using the Docker images together with docker-compose.
* **Kubernetes:** install the platform using our Helm chart and run the platform on your Kubernetes cluster.
* **Ansible-based deployment:** install the platform on a set of Debian Buster machines, either bare-metal or virtual machines, using our Ansible recipes.

So, beside the fast containerized way with docker-compose or helm chart for Kubernetes, Wazo's C4 can be deployed with Ansible on virtual machines or bare-metal.


## Wazo Platform C4 solution
We've already introduced our C4 platform in a previous [blog post](/blog/wazo-platform-c4-overview). Our SBC and Routing solution has in the last month grown and matured with the introduction of RTP Engine, Consul and the automatic configuration of Kamailio nodes as the architecture scales.

The Class 4 engine is made of several components:

1. SBC (Kamailio)
2. Router (Kamailio)
3. Media Proxy (RTPengine)
4. Router API (`wazo-router-confd`)
5. PostgreSQL
6. Redis

If you use the Ansible recipes you need at least two hosts as you cannot run the SBC and the Router on the same machine.


## What is Ansible?

[Ansible](https://www.ansible.com/) is an open-source software provisioning, configuration management, and application-deployment tool similar to Chef, Puppet or Salt.

It is for sure the simplest and the easiest to get started with because it's `"just SSH"`. It uses SSH to connect to servers and run the configured Tasks.

If you're new to Ansible, the best way to get started is reading the documentation from the official website:

* [Getting started](https://docs.ansible.com/ansible/latest/user_guide/intro_getting_started.html)
* [Best practices](https://docs.ansible.com/ansible/latest/user_guide/playbooks_best_practices.html)
* [Ansible Workshops](https://ansible.github.io/workshops/)
* [Ansible FAQ](https://docs.ansible.com/ansible/latest/reference_appendices/faq.html)


## Prerequisites

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
sbc_1 ansible_ssh_host=192.0.2.1 ansible_ssh_port=22
sbc_2 ansible_ssh_host=192.0.2.2 ansible_ssh_port=22
```

Define one or more routers:

```Ini
[router_host]
router_1 ansible_ssh_host=192.0.2.3 ansible_ssh_port=22
router_2 ansible_ssh_host=192.0.2.4 ansible_ssh_port=22
```

Define one or more Media Proxies:

```Ini
[rtpengine_host]
rtpengine_1 ansible_ssh_host=192.0.2.5 ansible_ssh_port=22
rtpengine_2 ansible_ssh_host=192.0.2.6 ansible_ssh_port=22
```

Define, optionally, additional hosts for the database services:

```Ini
[database_host]
database_1 ansible_ssh_host=192.0.2.7 ansible_ssh_port=22

[redis_host]
redis_1 ansible_ssh_host=192.0.2.8 ansible_ssh_port=22
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


## Configuration

Configure your Class 4 engine with your deployment-specific settings, as follows:

```Ini
[database:vars]
postgresql_listen_addresses = *

[router:vars]
router_api_db_host = 192.0.2.7
router_api_redis_host = 192.0.2.8
router_dburl_dialog = redis://192.0.2.8:6379/2

[sbc:vars]
sbc_advertise_address = c4.wazo.cloud:5060
sbc_dispatcher_list = "1 sip:192.0.2.3:5060 16 10\n1 sip:192.0.2.4:5060 16 10"
sbc_dburl_dialog = redis://192.0.2.8:6379/2

[sbc_1_host:vars]
sbc_advertise_address = <PUBLIC IP ADDRESS OF THE SBC> # example: 198.51.100.2
sbc_advertise_port = 5060
rtpengine_public_address = 198.51.100.1

[sbc_2_host:vars]
sbc_advertise_address = <PUBLIC IP ADDRESS OF THE SBC> # example: 198.51.100.3
sbc_advertise_port = 5060

[rtpengine_1]
rtpengine_public_address = <PUBLIC IP ADDRESS OF THE MEDIA PROXY> # example: 198.51.100.1

[rtpengine_2]
rtpengine_public_address = <PUBLIC IP ADDRESS OF THE MEDIA PROXY> # example: 198.51.100.2
```

The various variables that can be customized are described at <https://github.com/wazo-platform/wazo-ansible/blob/master/README.md#variables>.

By default, Wazo Platform will install the development version. To install
the latest stable version, activate the following settings in your inventory:

```Ini
[c4:vars]
wazo_distribution = pelican-buster
wazo_distribution_upgrade = pelican-buster
```


## Installation

Launch the installation by running the following command:

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


## Conclusions
Wazo Platform C4 is easily deployable with our Ansible recipes on bare-metal or virtual machines as you can see, just following a few simple steps. For detailed informations and other install methods please refer to [the official Wazo C4 Install guide](https://wazo-platform.org/install/class-4).
