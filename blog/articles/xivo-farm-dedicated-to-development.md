Title: XiVO farm dedicated to development
Date: 2011-07-25 09:56
Author: dachary
Category: XiVO IPBX
Tags: packages
Slug: xivo-farm-dedicated-to-development
Status: published

#### XiVO submission with git version

The
[submit-xivo.sh](http://packaging-farm.dachary.org/trac/browser/submit/submit-xivo.sh?rev=934db22f985be6f102a327222a54c833380f3b13)
script uses whatever GIT version it finds to be the default. The
behavior was
[changed](http://packaging-farm.dachary.org/trac/changeset/866f47eb8cd8b43f6956fe0d326d9e77cc212a9b/)
to allow an optional specification of the GIT revision, as documented in
the **submit-xivo.sh(1)** manual page.

~~~
GIT_REVISION=master
              The gitrevision(7) from which both source and debian git will be
              checked out. If the value of this  variable  is  different  from
              what  it was the last time packaging-farm(1) was run, the depen-
              dency graph is cleared and all packages will be rebuild  regard-
              less.
~~~


The version [2.0.7](http://packaging-farm.dachary.org/download/) has
been published with this modification.

#### separated repository versus dedicated farm

The pro and cons of were discussed with Nicolas Hicher on IRC.It was
decided that creating a dedicated farm virtual machine was the best
option.

### separated repositories

A packaging-farm meta package would be created under the name
gallifrey-dev with a configuration [similar to
gallifrey](http://gallifrey.dachary.org/packaging-farm/gallifrey/Makefile).
The developer would use **packaging-farm gallifrey-dev** and the
packager would use **packaging-farm gallifrey**

### pro

-   some packages that are not active are shared and do not need to be
    rebuilt twice
-   less hardware resources used (spare 1GB RAM and 30GB disk)
-   no need to maintain two machines / operating systems

### cons

-   if a developer works on a package (say asterisk), the package would
    be rebuild three times if the following sequence of commands occur :
    packaging-farm gallifrey-dev ; packaging-farm gallifrey ;
    packaging-farm gallifrey-dev
-   the implementation of the package submission that allows to chose
    which GIT branch the packages are extracted from in the
    packaging-farm needs to be fine grained to avoid submitting a
    package just because the chosen branch changes
-   if the production repository is being prepared, the added delay
    involved when a developer and the release manager alternatively
    update the repository may be an annoying drawback
-   a given package is going to be build a number of times with the
    exact same version. This will create checksum errors in the
    mirroring of the repositories. It would require a modification of
    the submission script to always increment the debian version number.

### dedicated farm

A duplicate of the gallifrey VM is created. The release manager uses a
machine when stabilizing a XiVO version and always builds from a given
GIT version. The developers use another machine which is always built
from the master branch.

### pro

-   the implementation of the package submission that allows to chose
    which GIT branch the packages are extracted from in the
    packaging-farm can resubmit everything when the GIT version changes
    because this is a rare event. It is a simpler implementation.
-   there is no overhead because of duplicate builds and therefore no
    checksum errors when mirroring the repository

### cons

-   more hardware resources required (1GB RAM + 30GB disk)
-   more machines to maintain : /etc/packaging-farm/packaging-farm.conf
    and /var/cache/packaging-farm/build/gallifrey/Makefile must be
    manually updated to be kept in sync
-   more machine names to remember for the release manager. The
    developers still only know one machine and need not be aware of the
    machine dedicated to the building of the release.

#### cloning the gallifrey VM

-   create a snapshot of the LVM volume containing the gallifrey VM disk

<!-- -->

~~~
lvcreate --snapshot --size 1G --name tmp /dev/all/f3e8d23f-21c0-417d-9b5e-91bb4da9b926.disk0
~~~


-   create a LVM volume of the same size as the gallifrey VM disk

<!-- -->

~~~
lvcreate --size 30G --name dev all
~~~


-   copy the snapshot to the new disk with low priority I/O

<!-- -->

~~~
ionice -c3 dd if=/dev/all/tmp of=/dev/all/dev bs=1024k
~~~


-   remove the snapshot

<!-- -->

~~~
lvremove /dev/all/tmp
~~~


-   assign an IP to the gallifrey-dev future VM

<!-- -->

~~~
root@host01:~# grep y-dev /etc/bind/db.farm
gallifrey-dev.xivo.vm	IN	A	10.10.60.6
~~~


-   create a random MAC for the gallifrey-dev future VM

<!-- -->

~~~
MACADDR="52:54:$(dd if=/dev/urandom count=1 2>/dev/null | md5sum | sed 's/^\(..\)\(..\)\(..\)\(..\).*$/\1:\2:\3:\4/')"; echo $MACADDR
~~~


-   add a DHCP entry binding the MAC to the IP in
    **/etc/dhcp/dhcpd.conf**

<!-- -->

~~~
host gallifrey-dev.xivo.vm.farm {
        hardware ethernet 52:54:86:b3:3f:10;
        fixed-address gallifrey-dev.xivo.vm.farm;
        option subnet-mask 255.255.255.0;
    }
~~~


-   reload bind and dhcp

<!-- -->

~~~
/etc/init.d/bind9 reload
/etc/init.d/isc-dhcp-server restart
~~~


-   create the gallifrey-dev VM by adopting the dev LVM volume

<!-- -->

~~~
gnt-instance add -n host01.farm -B memory=4G -o debootstrap+default -t plain --disk 0:adopt=dev --no-install --net 0:mac=52:54:86:b3:3f:10 gallifrey-dev.xivo.vm.farm
~~~


-   bind the SSH port of the new VM to 22006

<!-- -->

~~~
in /etc/shorewall/rules
DNAT           net             loc:$VM_GALLIFREY_DEV_XIVO:22 tcp     22006           -       $IP_FAILOVER
in /etc/shorewall/params
VM_GALLIFREY_DEV_XIVO=10.10.60.6
~~~


-   reload shorewall

<!-- -->

~~~
shorewall restart ; sleep 30 && shorewall clear
~~~


-   start the gallifrey-dev VM

<!-- -->

~~~
gnt-instance start gallifrey-dev.xivo.vm.farm
~~~


-   balloon down the gallifrey-dev VM memory to 1G

<!-- -->

~~~
echo balloon 1024 | socat - unix:/var/run/ganeti/kvm-hypervisor/ctrl/gallifrey-dev.xivo.vm.farm.monitor
~~~


-   add nginx reverse proxy in
    /etc/nginx/sites-available/gallifrey-dev.dachary.org

<!-- -->

~~~
server {
 listen 80;
 server_name gallifrey-dev.dachary.org;
 access_log  /var/log/nginx/gallifrey-dev.dachary.org.access.log;

 location / {
  proxy_pass   http://gallifrey-dev.xivo.vm.farm;
 }
}
~~~


-   reload nginx

<!-- -->

~~~
/etc/init.d/nginx reload
~~~


</p>

