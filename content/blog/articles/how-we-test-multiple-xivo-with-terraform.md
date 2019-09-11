Title: How we test multiple XiVO with Terraform
Date: 2016-06-06 15:00
Author: sduthil
Slug: how-we-test-multiple-xivo-with-terraform
Status: published

We are very fond of tests when developing XiVO, especially automated ones :)
Currently, we have three levels of tests: unit-tests (very small), integration
tests (medium size) and acceptance tests (large tests, which take a few hours to
run). Acceptance tests also include manual tests, which we love hating of doing:
manual testing takes us about half a day of 4 people, before each release. Of
course we hate running manual tests when a machine could do it for us, so we're
always wanting to automate them out.

On our journey towards the eradication of manual tests, we've encountered a
quite friendly software called Terraform. It allows us to automatically deploy
and configure XiVO instances, which is very helpful when testing in an
almost-real environment. We'll introduce it and show you how we can deploy two
XiVO with High Availability (HA) enabled, in about 250 lines of scripts and
configuration.

[Terraform](https://terraform.io) is written in Go by HashiCorp and allows you
to deploy virtual machines, containers, databases and a lot of other instances
on a variety of providers.

We use [OpenStack](https://openstack.org) to host virtual machines, and it
happens Terraform can talk to OpenStack to automatically create new virtual
machines.

Who is going to glue this all together? Our trusted friend
[Jenkins](https://jenkins.io) (which you can meet on
[http://jenkins.xivo.io](http://jenkins.xivo.io)) is the perfect candidate.
Here's the summary of [his job](http://jenkins.xivo.io/job/daily-acceptance-ha):

![The steps of the Jenkins job: clone, terraform, configure, test](/public/jenkins-terraform.svg)

1. Jenkins will fetch the latest code from our
   [Github repositories](https://github.com/xivo-pbx) (and [xivo-terraform](https://github.com/sboily/xivo-terraform), because tests or the deploying scripts might change
2. Jenkins gets ready to test and swears at us for doing such a boring job
3. Jenkins creates the configuration files for Terraform and runs `terraform apply`
4. Terraform tells OpenStack to create 2 Debian virtual machines, then installs XiVO on them, which takes about 15 minutes.
5. Jenkins finalizes the configuration of the XiVO by enabling the HA between the two machines.
6. Jenkins may now run the automatic tests for the HA, such as verifying data
replication, shutting down the master, etc.

We'll get a bit more in details of the Terraform configuration files. Here goes the main one, `xivo.tf`:

```
provider "openstack" {
    user_name = "${var.user_name}"
    password = "${var.password}"
    tenant_name = "${var.tenant_name}"
    domain_name = "${var.domain_name}"
    auth_url  = "${var.auth_url}"
}

resource "openstack_compute_instance_v2" "xivo" {
    name = "xivo-test-ha${count.index}"
    region = "${var.region}"
    image_id = "${var.image_id}"
    flavor_id = "${var.flavor_id}"
    key_pair = "${var.key_pair}"

    count = "${var.count}"

    security_groups = [
        "default"
    ]

    user_data = "${file(\"files/cloud-init.txt\")}"

    network {
        name = "${var.network}"
    }

    connection {
        user = "root"
        key_file = "${var.key_file}"
    }

    provisioner "local-exec" {
        command =  "echo ${count.index}:${self.network.0.fixed_ip_v4} >> private_ips.txt ; sleep 2"
    }

    provisioner "file" {
        source = "private_ips.txt"
        destination = "/tmp/private_ips.txt"
    }

    provisioner "remote-exec" {
        inline = [
            "wget --no-check-certificate https://raw.githubusercontent.com/sboily/xivo-terraform/master/bin/xivo_install_aws -O /tmp/xivo_install_aws",
            "bash /tmp/xivo_install_aws"
        ]
    }

}

output "ips" {
   value = "${join(\" \",openstack_compute_instance_v2.xivo.*.access_ip_v4)}"
}
```

Variables `${var.something}` are defined in a separate file, `vars.tf`, looking like:

```
variable "count" {
  default = 2
}

variable "user_name" {
    description = "Openstack username."
}

...
```

What, no values? No, that's only the definition of the variables. The values are set in a third file `terraform.tfvars`, looking like:

```
user_name = "jenkins"
password = "secret"
tenant_name = "jenkins"
auth_url = "http://openstack:5000/v3"
key_pair = "jenkins"
key_file = "/home/me/.ssh/id_rsa"
network = "provider"
```

There are three interesting bits in `xivo.tf`:

```
command =  "echo ${count.index}:${self.network.0.fixed_ip_v4} >> private_ips.txt ; sleep 2"
```

This will create a file containing the IP address of the two machines Terraform created on OpenStack, looking like:

```
1:10.0.0.1
0:10.0.0.2
```

We decided `0` would be the master and `1` would be the slave. All the code we
use to connect to the newly created machines rely on these two lines to know
where the machines are, because the IP addresses are not fixed.

```
user_data = "${file(\"files/cloud-init.txt\")}"
```

When the machine starts, a little software called [Cloud-Init](https://cloudinit.readthedocs.io/) will make a HTTP request to get its configuration and do some changes on the machine, such as setting the hostname, allowing SSH connections, etc. The above line tells Openstack which configuration to expose to Cloud-Init.


```
provisioner "remote-exec" {
    inline = [
        "wget --no-check-certificate https://raw.githubusercontent.com/sboily/xivo-terraform/master/bin/xivo_install_aws -O /tmp/xivo_install_aws",
        "bash /tmp/xivo_install_aws"
    ]
}
```

This script will be run after the machine is started, that will:

* install XiVO
* configure the wizard
* configure the HA

Don't hesitate to [take a look](https://github.com/sboily/xivo-terraform/tree/master/bin/xivo_install_aws), it's very straightforward.
