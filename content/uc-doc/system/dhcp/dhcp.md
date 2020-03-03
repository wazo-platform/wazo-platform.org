---
title: DHCP Server
---

Wazo includes a DHCP server used for assisting in the provisioning of
phones and other devices. (See
`Basic Configuration <dhcpd-config>`{.interpreted-text role="ref"} for
the basic setup). This section contains additional notes on how to
configure more advanced options that may be helpful when integrating the
server with different VOIP subnets.

Activating DHCP on another interface
====================================

DHCP Server can be activated through `/dhcp` endpoint

By default, it will only answer to DHCP requests coming from the VoIP
subnet. If you need to activate DHCP on an other interface, you have to
fill in the `network_interfaces` field with the interface name , for
example : `eth0`

Changing default DHCP gateway
=============================

By default, the Wazo DHCP server uses the Wazo's IP address as the
routing address. To change this you must create a custom-template:

1.  Create a custom template for the
    `dhcpd_subnet.conf.head` file:

        mkdir -p /etc/xivo/custom-templates/dhcp/etc/dhcp/
        cd /etc/xivo/custom-templates/dhcp/etc/dhcp/
        cp /usr/share/xivo-config/templates/dhcp/etc/dhcp/dhcpd_subnet.conf.head .

2.  Edit the custom template:

        vim dhcpd_subnet.conf.head

3.  In the file, replace the string `#XIVO_NET4_IP#` by the routing
    address of your VoIP network, for example:

        option routers 192.168.2.254;

4.  Re-generate the dhcp configuration:

        xivo-update-config

DHCP server should have been restarted and should now use the new
routing address.

Configuring DHCP server to serve unknown hosts
==============================================

By default, the Wazo DHCP server serves only known hosts. That is:

-   either hosts which MAC address prefix (the
    [OUI](http://en.wikipedia.org/wiki/Organizationally_unique_identifier))
    is known
-   or hosts which Vendor Identifier is known

Known OUIs and Vendor Class Identifiers are declared in
`/etc/dhcp/dhcpd_update/*` files.

If you want your Wazo DHCP server to serve also unknown hosts (like PCs)
follow these instructions:

1.  Create a custom template for the
    `dhcpd_subnet.conf.tail` file:

        mkdir -p /etc/xivo/custom-templates/dhcp/etc/dhcp/
        cd /etc/xivo/custom-templates/dhcp/etc/dhcp/
        cp /usr/share/xivo-config/templates/dhcp/etc/dhcp/dhcpd_subnet.conf.tail .

2.  Edit the custom template:

        vim dhcpd_subnet.conf.tail

3.  And add the following line at the head of the file:

        allow unknown-clients;

4.  Re-generate the dhcp configuration:

        xivo-update-config

DHCP server should have been restarted and should now serve all network
equipments.

DHCP-Relay
==========

If your telephony devices aren't located on the same site and the same
broadcast domain as the Wazo DHCP server, you will have to add the
option *DHCP Relay* to the site's router. This parameter will allow the
DHCP requests from distant devices to be transmitted to the IP address
you specify as DHCP Relay.

#:warning: Please make sure that the IP address used as DHCP Relay is the same as
one of Wazo's interfaces, and that this interface is configured to
listen to DHCP requests (as decribed in previous part). Also verify that
routing is configured between the distant router and the choosen
interface, otherwise DHCP requests will never reach the Wazo server.

Configuring DHCP server for other subnets
=========================================

This section describes how to configure Wazo to serve other subnets that
the VOIP subnet. As you can't use the Web Interface to declare other
subnets (for example to address DATA subnet, or a VOIP subnet that
isn't on the same site that Wazo server), you'll have to do the
following configuration on the Command Line Interface.

Creating "extra subnet" configuration files
---------------------------------------------

First thing to do is to create a directory and to copy into it the
configuration files:

    mkdir /etc/dhcp/dhcpd_sites/
    cp /etc/dhcp/dhcpd_subnet.conf /etc/dhcp/dhcpd_sites/dhcpd_siteXXX.conf
    cp /etc/dhcp/dhcpd_subnet.conf /etc/dhcp/dhcpd_sites/dhcpd_lanDATA.conf

#:exclamation: In this case we'll create 2 files for 2 differents subnets. You can
change the name of the files, and create as many files as you want in
the folder `/etc/dhcp/dhcpd_sites/`. Just
adapt this procedure by changing the name of the file in the different
links.

After creating one or several files in `/etc/dhcp/dhcpd_sites/`, you
have to edit the file `/etc/dhcp/dhcpd_extra.conf` and add the
according include statement like:

    include "/etc/dhcp/dhcpd_sites/dhcpd_siteXXX.conf";
    include "/etc/dhcp/dhcpd_sites/dhcpd_lanDATA.conf";

Adjusting Options of the DHCP server
------------------------------------

Once you have created the subnet in the DHCP server, you must edit each
configuration file (the files in
`/etc/dhcp/dhcpd_sites/`) and modify the
different parameters. In section **subnet**, write the IP subnet and
change the following options (underlined fields in the example):

    subnet 172.30.8.0 netmask 255.255.255.0 {

-   subnet-mask:

        option subnet-mask 255.255.255.0;

-   broadcast-address:

        option broadcast-address 172.30.8.255;

-   routers (specify the IP address of the router that will be the
    default gateway of the site):

        option routers 172.30.8.1;

In section **pool**, modify the options:

    pool {

-   log (add the name of the site or of the subnet):

        log(concat("[", binary-to-ascii(16, 8, ":", hardware), "] POOL VoIP Site XXX"));

-   range (it will define the range of IP address the DHCP server can
    use to address the devices of that subnet):

        range 172.30.8.10 172.30.8.200;

#:warning: Wazo only answers to DHCP requests from
`supported devices <devices>`{.interpreted-text role="ref"}. In case of
you need to address other equipment, use the option *allow
unknown-clients;* in the `/etc/dhcp/dhcpd_sites/` files.

At this point, you can apply the changes of the DHCP server with the
command:

    service isc-dhcp-server restart

After that, Wazo will start to serve the DHCP requests of the devices
located on other sites or other subnets than the VOIP subnet. You will
see in `/var/log/daemon.log` all the DHCP
requests received and how they are handled by Wazo.
