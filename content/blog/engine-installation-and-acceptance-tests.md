Title: Development environment for Wazo Platform and acceptance tests
Date: 2019-11-20
Author: Mehdi Abaakouk
Category: Wazo Platform
Tags: wazo-platform, development
Slug: engine-installation-acceptance-tests
Status: published


# Run acceptance tests on freshly installed virtual machine

This guide will show how to quickly get a development environment of
Wazo Platform inside a virtual machine to run the acceptance tests. To do so,
we will use libvirt, virt-installer and the Wazo Platform iso.

## Requirements

I'm currently running Debian Buster and installed the following packages:

```ShellSession
$ sudo apt install libvirt-daemon libvirt-client git virtinst
```

Do the equivalent commands for your Linux distribution.

## Create a dedicated network for your Wazo Platform instance

This creates an isolated network, the outgoing traffic will go through my `eno1`
network interfaces (don't forget to replace it with your own) thanks to the NAT
automatically configured by libvirtd.

```ShellSession
cat > wazo-network.xml <<EOF
<network>
  <name>wazo</name>
  <forward dev='eno1' mode='nat'>
    <nat>
      <port start='1024' end='65535'/>
    </nat>
    <interface dev='eno1'/>
  </forward>
  <bridge name='virbr1' stp='on' delay='0'/>
  <domain name='wazo'/>
  <ip address='10.10.10.1' netmask='255.255.255.0'>
    <dhcp>
      <range start='10.10.10.128' end='10.10.10.254'/>
    </dhcp>
  </ip>
</network>
EOF

$ sudo virsh net-define wazo-network.xml
Network wazo defined from wazo-network.xml

$ sudo virsh net-autostart wazo
Network wazo marked as autostarted

$ sudo virsh net-start wazo
Network wazo started

$ sudo virsh net-list --all
 Name        State    Autostart   Persistent
----------------------------------------------
 default     active   yes         yes
 wazo        active   yes         yes

```

## Install the virtual machine

Download this [preseed.cfg](../misc/preseed.cfg) file to automatically install Debian 10 and run:

```ShellSession
$ sudo virt-install \
     --virt-type kvm \
     --name wazo-acceptance \
     --memory 2048 \
     --disk size=20 \
     --os-variant debian10 \
     --network network=wazo \
     --graphics none \
     --console pty,target_type=serial \
     --location 'http://ftp.debian.org/debian/dists/buster/main/installer-amd64/' \
     --initrd-inject=preseed.cfg \
     --extra-args 'console=ttyS0,115200n8 serial'
```

The default login/password are wazo/superpass

Then the Debian installation is finished, the server reboot.

You can retrieve the IP address of the your virtual machine with:

```ShellSession
$ sudo virsh net-dhcp-leases wazo
 Expiry Time           MAC address         Protocol   IP address        Hostname          Client ID or DUID
----------------------------------------------------------------------------------------------------------------
 2019-07-15 16:48:18   52:54:00:de:45:05   ipv4       10.10.10.150/24   debian            01:52:54:00:de:45:05
```

You can continue the installation:

```ShellSession
$ ssh wazo@10.10.10.150

# git clone https://github.com/wazo-platform/wazo-ansible.git
# cd wazo-ansible
# ansible-galaxy install -r requirements-postgresql.yml
# ansible-playbook -i inventories/uc-engine uc-engine.yml
...
```

The Wazo Platform engine is now ready.

## Run acceptance tests

Acceptance tests need the Wazo Platform engine to be configured and
some resources need to be created, to do so:

```ShellSession
$ git clone https://github.com/wazo-pbx/wazo-acceptance
$ cd wazo-acceptance
$ tox -e setup -- <virtual_machine_ip>
```

Now everything is ready you can run just one test like this:

```ShellSession
$ tox -e behave -- features/daily/line.feature
```

Or run all of them with:

```ShellSession
$ tox -e behave
```
