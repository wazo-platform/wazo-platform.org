Title: packaging infrastructure for XiVO
Date: 2011-04-04 10:51
Author: dachary
Category: XiVO IPBX
Tags: packages
Slug: packaging-infrastructure-for-xivo
Status: published

#### Trying out packaging-farm

Nicolas Hicher and Loic Dachary worked together on building the skaro
repository available at:

~~~
deb http://xivo.dachary.org/packaging-farm/skaro/gnulinux/debian skaro-squeeze main
deb-src http://xivo.dachary.org/packaging-farm/skaro/gnulinux/debian skaro-squeeze main
~~~


The goal was to demonstrate the use of the packaging-farm and discover
show stoppers. A few documentation shortcomings led to modifications of
the manual page for packaging-farm. A problem with the handling of the
dependencies was identified and fixed. The [1.2.36
release](http://packaging-farm.dachary.org/downloads/) was published
with the corresponding changes.Nicolas Hicher feels confortable to give
a try to the packaging-farm. That will help uncover real world usage
issues.

#### VM host installation

A hardware (500GB disk, 8GB RAM, Intel(R) Xeon(R) CPU X3430 @ 2.40GHz)
was installed at 66.254.41.119 to be dedicated to XiVO packaging. It was
configured to host kvm based virtual machines using
[ganeti](http://code.google.com/p/ganeti/).To better track the changes,
a git repository was created in /etc and used to archive the
configuration changes described below.

### LVM and DRBD

In squeeze all the software required to run ganeti2 are standard. A year
ago it was significantly more difficult as it required the compilation
of the DRBD from sources, among other things.The second partition of the
disk was set for LVM:

~~~
root@host01:/srv/ganeti# pvs
  PV         VG   Fmt  Attr PSize   PFree
  /dev/sda2  all  lvm2 a-   442.38g 332.38g
~~~


and that was bound to the all volume group:

~~~
root@host01:/srv/ganeti# vgs
  VG   #PV #LV #SN Attr   VSize   VFree
  all    1   3   0 wz--n- 442.38g 332.38g
~~~


The default DRBD configuration was removed so that ganeti can handle it
on its own. It is not used at the moment but will come handy when
another hardware is added.

~~~
mv /etc/drbd.conf /etc/drbd.conf.old
touch /etc/drbd.conf
/etc/init.d/drbd reload
~~~


### Network

A bridge and a fake lo:1 local interface were created in
/etc/network/interfaces:

~~~
auto lo:1
iface lo:1 inet static
	address 10.10.0.10
	netmask 255.255.255.255
	up ip route add blackhole 10.0.0.0/8

auto br0
iface br0 inet static
        address 10.10.0.254
        netmask 255.255.255.255
        bridge_ports none
        bridge_stp off
	bridge_maxwait 5
        up ip route add 10.10.0.254 dev br0
        up ip route add 10.10.60.0/24 dev br0
~~~


### BIND and DHCP

Ganeti hosts and virtual machines names are DNS entries. It would be
possible to use a publicDNS to create them. A local DNS configuration is
created locally instead, toreduce the propagation delays, ensure it can
always be reached and isolate the maintainanceof the name space into a
private network. The top level domain farm was createdand divided into
host??.farm ( bound to 10.10.59.0/24 ) for all the ganeti hostsand
vm.farm ( bound to 10.10.60.0/24 ) for all the virtual machines.

**/etc/bind/named.conf.options**

Do not listen or answer on public IPs.

~~~
allow-recursion { 127.0.0.1; 10.0.0.0/8; };
listen-on { 127.0.0.1; 10.10.0.254; };
~~~


**/etc/bind/named.conf.local**

~~~
zone "10.10.in-addr.arpa" {
    type master;
    file "/etc/bind/db.10.10";
};

zone "farm" {
        type master;
        file "/etc/bind/db.farm";
};
~~~


**/etc/bind/db.10.10**

~~~
; -*- mode: zone; -*-
;
; BIND reverse data file for broadcast zone
;
$TTL    604800
@       IN      SOA     localhost. root.localhost. (
        2011031200      ; serial
                         604800         ; Refresh
                          86400         ; Retry
                        2419200         ; Expire
                         604800 )       ; Negative Cache TTL
@       IN      NS      localhost.

;;
;; perl -n -e 'print if(s/(\S+)\s+IN\s+A\s+10\.10\.(\d+)\.(\d+)/\3.\2\tIN\tPTR\t\1.farm./)' < db.farm
;;
1.60    IN      PTR     dev.dachary.vm.farm.
2.60    IN      PTR     skaro.xivo.vm.farm.
~~~


**/etc/bind/db.farm**

~~~
; -*- mode: zone; -*-
;
$TTL 1h ; default Time-to-Live. defines the duration that the record may be cached (24h)

$ORIGIN farm.
@                       IN      SOA             ns hostmaster (
                        2011031200      ; serial
                                1h              ; refresh - time when the slave will try to refresh the zone from the master (8h)
                                30m             ; update retry - time between retries if the slave (secondary) (2h)
                                                ; fails to contact the master when refresh (above) has expired.
                                2w              ; expiry - time slave will continue to supply authoritative data for the zone (1w)
                                                ; after the master died
                                30m)            ; minimum - time a NAME ERROR = NXDOMAIN record is cached (24h)

                IN      NS      ns

ns              IN      A       10.10.0.254

gnt-cluster     IN      A       10.10.59.1
host01          IN      A       10.10.59.10

dev.dachary.vm  IN      A       10.10.60.1
skaro.xivo.vm   IN      A       10.10.60.2
~~~


A DHCP server is setup for each VM to use.

**/etc/default/isc-dhcp-server**

~~~
INTERFACES="br0"
~~~


**/etc/dhcp/dhcpd.conf**

A MAC address is generated with the following oneliner:

~~~
# MACADDR="52:54:$(dd if=/dev/urandom count=1 2>/dev/null | md5sum | sed 's/^\(..\)\(..\)\(..\)\(..\).*$/\1:\2:\3:\4/')"; echo $MACADDR
~~~


and used to define the entries

~~~
group {
  option domain-name "farm";
  option routers 10.10.0.254;
  option domain-name-servers 10.10.0.254;
  subnet 10.10.0.0 netmask 255.255.0.0 {
    host dev.dachary.vm.farm {
        hardware ethernet 52:54:bf:3d:d4:ef;
        fixed-address dev.dachary.vm.farm;
        option subnet-mask 255.255.255.255;
    }
    host skaro.xivo.vm.farm {
        hardware ethernet 52:54:fb:77:1e:82;
        fixed-address skaro.xivo.vm.farm;
        option subnet-mask 255.255.255.255;
    }
  }
}
~~~


### Cluster and instance creation

The hostname of the machine is host01.farm. When creating a cluster, the
hostname is used to create the first node of the cluster and make it the
master. Its IP set in /etc/hosts to 10.10.59.10. It is permanently set
on eth0 in the /etc/network/interface as follows:

~~~
up ip addr add 10.10.59.10/32 broadcast 10.10.59.255 dev eth0
~~~


The prerequisite to run gnt-cluster init were met:

-   host01.farm is not 127.0.0.1
-   gnt-cluster.host.farm IP is not bound to any interface

The cluster was created with:

~~~
gnt-cluster init --no-etc-hosts --enabled-hypervisors=kvm --nic-parameters link=br0 --master-netdev br0 --vg-name all gnt-cluster.farm
~~~


After downloading the installation CD of Debian GNU/Linux squeeze, the
skaro.xivo.vm.farm instance was created:

~~~
gnt-instance add -d -t plain -s 30G -B memory=512M,vcpus=1 -H kvm:boot_order=cdrom,cdrom_image_path=/srv/ganeti/debian-6.0.1a-amd64-CD-1.iso,vnc_bind_address=0.0.0.0 -n host01.farm -o debootstrap+default --net 0:mac=52:54:fb:77:1e:82 skaro.xivo.vm.farm
~~~


### Copying the development VM

Instead of proceeding with a regular installation, a copy of the VM at
http://xivo.dachary.org/ was made. It was stored in a 13GB bzip2 file:

~~~
root@host01:/srv/ganeti# ls -lh
-rw-r--r-- 1 root root  13G Mar 31 15:39 xivo.dachary.vm.gnt.bz2
~~~


The newly created instance was shutdown

~~~
gnt-instance shutdown --timeout=1 skaro.xivo.vm.farm
~~~


The location of its disk retrieved:

~~~
root@host01:/srv/ganeti# gnt-instance info skaro.xivo.vm.farm | grep /dev/all
      on primary:  /dev/all/97500dbf-ca9e-49b8-a4c9-4d96e5152916.disk0 (254:2)
~~~


and the backup unpacked into it:

~~~
bunzip2 < xivo.dachary.vm.gnt.bz2 > /dev/all/97500dbf-ca9e-49b8-a4c9-4d96e5152916.disk0
~~~


It ended with an error:

~~~
bunzip2: I/O or other error, bailing out.  Possible reason follows.
bunzip2: No space left on device
        Input file = (stdin), output file = (stdout)
~~~


which was ignored. To make sure the restoration was sane, the partition
was checked:

~~~
root@montreal:/srv/ganeti# kpartx -av /dev/all/97500dbf-ca9e-49b8-a4c9-4d96e5152916.disk0
add map all-97500dbf--ca9e--49b8--a4c9--4d96e5152916.disk0p1 (254:3): 0 61865984 linear /dev/all/97500dbf-ca9e-49b8-a4c9-4d96e5152916.disk0 2048
add map all-97500dbf--ca9e--49b8--a4c9--4d96e5152916.disk0p2 (254:4): 0 1046528 linear /dev/all/97500dbf-ca9e-49b8-a4c9-4d96e5152916.disk0 61868032
root@montreal:/srv/ganeti# fsck -f /dev/mapper/all-97500dbf--ca9e--49b8--a4c9--4d96e5152916.disk0p1
fsck from util-linux-ng 2.17.2
e2fsck 1.41.12 (17-May-2010)
Pass 1: Checking inodes, blocks, and sizes
Pass 2: Checking directory structure
Pass 3: Checking directory connectivity
Pass 4: Checking reference counts
Pass 5: Checking group summary information
/dev/mapper/all-97500dbf--ca9e--49b8--a4c9--4d96e5152916.disk0p1: 260424/1925760 files (3.8% non-contiguous), 4826992/7733248 blocks
~~~


#### firewall

A [shorewall](http://shorewall.net/) based firewall was configured based
on the two interface example found at
**/usr/share/doc/shorewall/examples/two-interfaces/** and replacing the
eth1 interface with br0. The idea is that the bridge contains virtual
machines that are treated as if they were machines in the LAN for which
this example was designed.

#### reverse proxy

A [nginx](http://nginx.org/) based reverse proxy was installed on the to
demultiplex the incoming http connections. The first configuration was
added in /etc/nginx/sites-available/skaro.dachary.org to get to the
virtual machine that will eventually replace http://xivo.dachary.org/

~~~
server {
 listen 80;
 server_name skaro.dachary.org;
 access_log  /var/log/nginx/skaro.dachary.org.access.log;

 location / {
  proxy_pass   http://skaro.xivo.vm.farm;
 }
}
~~~


and the HTTP port was accepted in the firewall in /etc/shorewall/rules

~~~
DNAT           net             loc:$VM_SKARO_XIVO:22 tcp             22002           -       $IP_FAILOVER
~~~


</p>

