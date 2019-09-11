Title: Testing a XiVO gallifrey repository (1/2)
Date: 2011-05-09 08:57
Author: dachary
Category: XiVO IPBX
Tags: packages
Slug: testing-a-xivo-gallifrey-repository-12
Status: published

#### Methodology

Assuming a host running [Debian GNU/Linux
Squeeze](http://www.debian.org/releases/squeeze/), the general idea is
to boot a virtual machine thatwill auto-install using
[debian-installer](http://www.debian.org/devel/debian-installer/) so
that it uses [a specific
class](http://git.proformatique.com/?p=official/debian-installer.git;a=tree;f=squeeze/classes/skaro-farm;h=155b14e82c906b968d6d42a7b8e20faf0209d687;hb=692498d23dcd2daa173e2ed152010b6c22dd7fda)
that will pull packages from [the
gallifrey](http://xivo.dachary.org/packaging-farm/gallifrey/gnulinux/debian/)
repository [created with
packaging-farm](http://blog.xivo.io/index.php?post/2011/04/27/An-alternate-XiVO-gallifrey-repository-%28part-2/2%29).

#### Virtual machine

The [libvirt](http://libvirt.org/) virtual machine is given 512MB RAM,
8GB RAW disk image, 1CPU.The configuration of libvirt is made to accept
VNC connections from anywhere to gain access tothe console over the
network:

~~~
diff --git a/libvirt/qemu.conf b/libvirt/qemu.conf
index dc8eb83..282e734 100644
--- a/libvirt/qemu.conf
+++ b/libvirt/qemu.conf
@@ -9,7 +9,7 @@
 # NB, strong recommendation to enable TLS + x509 certificate
 # verification when allowing public access
 #
-# vnc_listen = "0.0.0.0"
+vnc_listen = "0.0.0.0"


 # Enable use of TLS encryption on the VNC server. This requires
~~~


#### dhcpd and network boot

The dhcp server is instructed to allow for network boot in
*/etc/dhcp/dhcpd.conf*

~~~
subnet 10.10.70.0 netmask 255.255.255.0 {
        range 10.10.70.70 10.10.70.100;
        filename "pxelinux";
        next-server 10.10.70.254;
        option domain-name "farm";
        option domain-name-servers 10.10.70.254;
        option subnet-mask 255.255.255.0;
        option broadcast-address 10.10.70.255;
        option routers 10.10.70.254;
}
~~~


The TFTP server is installed:

~~~
apt-get install tftpd-hpa
~~~


The kernel and pxelinux configuration files are [copied from a i386
lenny
directory](http://ftp.debian.org/debian/dists/lenny/main/installer-i386/current/images/netboot/debian-installer/i386)
into */var/lib/tftp/*. Actually a more elaborated variation rsync'ed
from a machine on the avencall lan named kenny.avencall.com but this is
not strictly necessary for the test: fai-linux-lenny below is equivalent
to
[linux](http://ftp.debian.org/debian/dists/lenny/main/installer-i386/current/images/netboot/debian-installer/i386/linux)
and fai-initrd-lenny is equivalent to
[initrd](http://ftp.debian.org/debian/dists/lenny/main/installer-i386/current/images/netboot/debian-installer/i386/initrd.gz).The
libvirt configuration of the virtual machineis instructed to boot from
the network:

~~~
<os>
    <type arch='i686' machine='pc-0.12'>hvm</type>
    <boot dev='network'/>
    <boot dev='cdrom'/>
    <boot dev='hd'/>
    <bootmenu enable='no'/>
~~~


When the virtual machine is started with

~~~
virsh start skaro.xivo.vm.test
~~~


it will show the following and be ready to boot from the
network.![d-i](/public/.i_m.jpg "d-i, May 2011")A new entry has been
added to the menu displayed:

~~~
label xivo_gallifrey_farm
        menu label gallifrey-farm
        kernel fai-linux-lenny
        append initrd=fai-initrd-lenny rw auto=true url=http://66.254.41.119 priority=critical locale=en_US.UTF-8 interface=auto netcfg/dhcp_timeout=60 classes=debug,xivo-gallifrey-farm hostname=xivo --
~~~


in the file */var/lib/tftp/pxelinux.cfg/xivo\_devel/xivo\_devel.cfg*
that has beenextracted with

~~~
cd /var/lib/tftp
git clone git://git.proformatique.com/official/debian-pxelinux.git pxelinux.cfg
~~~


and contains all the menu for all the XiVO configurations.

#### Other packages

The [debian-installer
script](http://66.254.41.119/d-i/lenny/classes/xivo-gallifrey-farm/postinst_script)
starts by installing [a package](pf-fai-xivo-1.1-gallifrey-farm) whose
sole purpose is to add files in the /etc/apt/sources.list.d/ so that
packages are extracted from the . The sources of the package are in the
packages/branches/official/lenny/pf-fai/ directory of the internal
rcs.lan.proformatique.com/rcs/svn/common-softwares repository. They can
also be retrieved from the package sources at

~~~
deb-src http://dak.proformatique.com/debian lenny main
~~~


with the command

~~~
apt-get source pf-fai
~~~


#### Installation

All the common files are in the [lenny
directory](http://66.254.41.119/d-i/lenny/), forinstance the
[preseed.cfg](http://66.254.41.119/d-i/lenny/preseed.cfg) and
[installer.cfg](http://66.254.41.119/d-i/lenny/installer.cfg) that sets
the passwords and other package values.

~~~
d-i	passwd/root-password-crypted password $1$NHxfkWun$PMGLFNFtPKwIFT532sinD1
~~~


That should be replaced with a known password, for instance:

~~~
d-i	passwd/root-password password foobar
~~~


otherwise it will be impossible to login.The installation asks for the
disk partition. If it fails,the error logs can be found at
*/var/log/pf-fai/postinst.log*The key of the packaging-farm repository
is addedto
[late\_script](http://66.254.41.119/d-i/lenny/classes/xivo-gallifrey-farm/late_script)

~~~
if [ -x /usr/bin/apt-key ]; then
        apt-get -y install gnupg
        wget http://gallifrey.dachary.org/gallifrey.gpg -O - | apt-key add -
fi
~~~


It also removes any repository added by
[late\_script\_target](http://66.254.41.119/d-i/lenny/late_script_target)
and replace them with the packaging-farm repository:

~~~
deb http://gallifrey.dachary.org/packaging-farm/gallifrey/gnulinux/debian gallifrey-lenny main
~~~


If a script (such as late\_script) fails, the error message can be found
after login on the machine in the */var/log/installer/syslog* file.

#### gallifrey distribution

The [gallifrey
distribution](http://gallifrey.dachary.org/packaging-farm/) has been
updated to include the *misdn-user* package that was missing from the
list although it was already created. The *pf-asterisk-module-xivo*,
*pf-asterisk-res-sqlite2*, *pf-asterisk-ami-aoriginate*,
*asterisk-chan-sccp*, *pf-asterisk-app-fax*,
*pf-asterisk-app-nv-faxdetect* packages were imported into the farm from
the [official
repository](http://dak.proformatique.com/debian/dists/lenny-xivo-gallifrey-dev/)
and added to the list of packages necessary to install gallifrey.

</p>

