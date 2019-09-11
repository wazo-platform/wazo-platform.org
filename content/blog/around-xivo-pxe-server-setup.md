Title: Around XiVO - pxe server setup
Date: 2012-03-01 20:07
Author: atarakt
Category: Software
Tags: PXE
Slug: around-xivo-pxe-server-setup
Status: published

This is the second part of the description of the XiVO installation
process.

I'm going to describe how to setup a simple pxe server.

You need to have 2 services enabled on your server, dhcp and tftp.

Dhcp is used to give ip parameters to join the tftp server from the
client,the tftp server serves the files needed to install a debian
system.

On debian system, you have to install isc-dhcp-server, here is a
minimaldhcp configuration:

~~~
#/etc/dhcp/dhcpd.conf
ddns-update-style none;
option domain-name "mydomain.com";
option domain-name-servers 10.10.32.1;
default-lease-time 600;
max-lease-time 7200;
log-facility local7;
subnet 10.10.32.0 netmask 255.255.255.0 {
    range 10.10.32.10 10.10.32.20;
    option routers 10.10.32.1;
    next-server 10.10.32.1;
    option tftp-server-name "10.10.32.1";
    filename "pxelinux.0";
}
~~~


You can test your dhcp configuration by booting a machine on pxe to
ensurethat the dhcp configuration is functionnal :

~~~
Mar  1 13:44:16 arkham dhcpd: DHCPDISCOVER from 52:54:00:d3:44:27 via br1
   Mar  1 13:44:17 arkham dhcpd: DHCPOFFER on 10.10.32.10 to 52:54:00:d3:44:27 via br1
   Mar  1 13:44:17 arkham dhcpd: DHCPDISCOVER from 52:54:00:d3:44:27 via br1
   Mar  1 13:44:17 arkham dhcpd: DHCPOFFER on 10.10.32.10 to 52:54:00:d3:44:27 via br1
   Mar  1 13:44:19 arkham dhcpd: DHCPREQUEST for 10.10.32.10 (10.10.32.1) from 52:54:00:d3:44:27 via br1
   Mar  1 13:44:19 arkham dhcpd: DHCPACK on 10.10.32.10 to 52:54:00:d3:44:27 via br1
~~~


Now we have to install and configure a tftp server, we're going to
installtftpd-hpa. You have to install debian-installer-4.0-netboot-i386
too. Thispackage provide all the files used to install a fresh debian
system by pxe.

You have to modify tftp\_directory on /etc/default/tftpd-hpa:

~~~
TFTP_DIRECTORY="/usr/lib/debian-installer/images/i386/text"
~~~


and restart the tftp server to apply your modification.

You have to edit 2 files to finish your configuration: menu.cfg and
syslinux.cfg

You have to modify include and default path in boot-screens/syslinux.cfg

~~~
# D-I config version 2.0
   include boot-screens/menu.cfg
   default boot-screens/vesamenu.c32
   prompt 0
   timeout 0
~~~


You have to add to boot-screens/menu.cfg

~~~
label squeeze-i386
       menu label squeeze i386
       kernel linux
       append vga=normal initrd=initrd.gz
~~~


You can now test your modification by booting a computer on your subnet,
herethe screen that you should view if your configuration is ok

![pxe\_screen.png](/images/blog/pxe_screen.png "pxe_screen.png, mar. 2012")

In the next post, I will explain an advanced pxe configuration and how
to usepreseeding to execute an automatic installation.

</p>

