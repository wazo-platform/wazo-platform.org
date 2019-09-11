Title: Testing a XiVO gallifrey repository (2/2)
Date: 2011-05-16 13:27
Author: dachary
Category: XiVO IPBX
Tags: packages
Slug: testing-a-xivo-gallifrey-repository-22
Status: published

#### SVN keyword substitution bug fix

In some of the installed software (ctiservers) the SVN keywords are used
to extract the software version number:

~~~
__version__ = "$Revision$"
~~~


However, since the binaries have been built from a git repository with a
different naming scheme, thisno longer works. Corentin Le Gall fixed the
problem immediately in the internal SVN repository

~~~
------------------------------------------------------------------------
r10824 | kaou | 2011-05-16 11:08:49 +0200 (Mon, 16 May 2011) | 1 line
[bugfix] remove svn-dependent stuff because of git migration
------------------------------------------------------------------------
~~~


The [git repository](http://git.xivo.io/xivo-gallifrey.git/) was
supposed to be updated by a cron job, but it crashed May 9th and was
restarted May 16th by Romain Bignon:

~~~
commit a9f7ebff1a4db73184809a1696eb3b03b82b00f5
Author: Corentin Le Gall <clegall@proformatique.com>
Date:   Mon May 16 09:33:47 2011 +0000

    remove svn-dependent stuff because of git migration

    git-svn-id: https://rcs.lan.proformatique.com/svn/xivo/branches/official/1.1-gallifrey@10825 dc85baef-7018-0410-bfbd-8a639da648bb
~~~


After the git pull, the logs showed that some packages were modified.
They were submitted to the farm:

~~~
packaging-farm DIRECTORY=ctiservers submit
packaging-farm DIRECTORY=asterisk submit
packaging-farm DIRECTORY=agid submit
packaging-farm DIRECTORY=lib-python submit
~~~


and a rebuild of gallifrey was requested.

~~~
packaging-farm gallifrey
~~~


#### collecting symbolic links

A few packages contain symbolic links that point outside of their
directory:

~~~
gwr.py -> ../tools/gwr.py
~~~


When building the source package by assembling the debian directory and
the sourcedirectory, the actual file must be put in the archive instead
of the symbolic link.

~~~
for dir in app_nv_faxdetect app_fax ami_aoriginate module_xivo res_config_sqlite ; 
  do RSYNC_OPTIONS=--copy-unsafe-links packaging-farm DIRECTORY=$dir submit ;
done
~~~


The RSYNC\_OPTIONS variable already existed in the *submit-xivo.sh*
script but was not documented. A chapterwas added to the manual page:

~~~
RSYNC_OPTIONS=
              Before  the debian directory is assembled with the source direc-
              tory, a  copy  is  made  using  rsync(1).  The  content  of  the
              RSYNC_OPTIONS  variable  is  given in argument to the rsync com-
              mand. For instance it may be used to collect the actual  content
              of symbolic links pointing outside of the source directory.
              for dir in app_nv_faxdetect app_fax ami_aoriginate module_xivo res_config_sqlite ;
                do RSYNC_OPTIONS=--copy-unsafe-links packaging-farm DIRECTORY=$dir submit ;
              done
~~~


Before installing *pf-xivo* it was necessary to install the
*dahdi-linux* kernel module.

~~~
apt-get install dahdi-linux-modules-2.6.26-2-686 
apt-get install pf-xivo
~~~


It was then possible to connect to the XiVO web interface:![alternate
XiVO](/public/.Screenshot-5_m.jpg "alternate XiVO, May 2011")

#### gallifrey reference

ganeti instanceA new host is declared in the local DNS

~~~
root@host01:/etc/bind# git diff .
diff --git a/bind/db.10.10 b/bind/db.10.10
index 684d569..ea30300 100644
--- a/bind/db.10.10
+++ b/bind/db.10.10
@@ -4,7 +4,7 @@
 ;
 $TTL    604800
 @       IN      SOA     localhost. root.localhost. (
-        2011041800      ; serial
+        2011051601      ; serial
                          604800         ; Refresh
                           86400         ; Retry
                         2419200         ; Expire
@@ -14,6 +14,9 @@ $TTL    604800
 ;;
 ;; perl -n -e 'print if(s/(\S+)\s+IN\s+A\s+10\.10\.(\d+)\.(\d+)/\3.\2\tIN\tPTR\t\1.farm./)' < db.farm
 ;;
 1.60   IN      PTR     dev.dachary.vm.farm.
 2.60   IN      PTR     skaro.xivo.vm.farm.
 3.60   IN      PTR     gallifrey.xivo.vm.farm.
+4.60   IN      PTR     gallifrey-test1.xivo.vm.farm.
diff --git a/bind/db.farm b/bind/db.farm
index 60da05a..2e4c669 100644
--- a/bind/db.farm
+++ b/bind/db.farm
@@ -4,7 +4,7 @@ $TTL 1h ; default Time-to-Live. defines the duration that the record may be cach
 
 $ORIGIN farm.
 @                       IN      SOA             ns hostmaster (
-                        2011041800      ; serial
+                        2011051601      ; serial
                                 1h              ; refresh - time when the slave will try to refresh the zone from the mast
                                 30m             ; update retry - time between retries if the slave (secondary) (2h)
                                                 ; fails to contact the master when refresh (above) has expired.
@@ -22,3 +22,4 @@ host01                IN      A       10.10.59.10
 dev.dachary.vm         IN      A       10.10.60.1
 skaro.xivo.vm          IN      A       10.10.60.2
 gallifrey.xivo.vm      IN      A       10.10.60.3
+gallifrey-test1.xivo.vm        IN      A       10.10.60.4
~~~


An entry is allocated in the DHCP server, configured with a server to be
used for network boot.

~~~
diff --git a/bind/db.farm b/bind/db.farm
index 60da05a..2e4c669 100644
--- a/bind/db.farm
+++ b/bind/db.farm
@@ -4,7 +4,7 @@ $TTL 1h ; default Time-to-Live. defines the duration that the record may be cach
 
 $ORIGIN farm.
 @                       IN      SOA             ns hostmaster (
-                        2011041800      ; serial
+                        2011051601      ; serial
                                 1h              ; refresh - time when the slave will try to refresh the zone from the mast
                                 30m             ; update retry - time between retries if the slave (secondary) (2h)
                                                 ; fails to contact the master when refresh (above) has expired.
@@ -22,3 +22,4 @@ host01                IN      A       10.10.59.10
 dev.dachary.vm         IN      A       10.10.60.1
 skaro.xivo.vm          IN      A       10.10.60.2
 gallifrey.xivo.vm      IN      A       10.10.60.3
+gallifrey-test1.xivo.vm        IN      A       10.10.60.4
~~~


A ganeti based virtual machine is created with a VNC port enabled:

~~~
gnt-instance add -d -t plain -s 5G -B memory=512M,vcpus=1 \
   -H kvm:boot_order=network,vnc_bind_address=0.0.0.0 -n host01.farm \
   -o debootstrap+default --net 0:mac=52:54:24:1e:63:28 \
   gallifrey-test1.xivo.vm.farm
~~~


At boot time the menu options *Production* and *Gallifrey* are
selected.The firewall was reconfigured to accept HTTPS connections
because it is the default when connecting to thevirtual machine with a
browser (it gets redirected when trying with HTTP):

~~~
diff --git a/shorewall/rules b/shorewall/rules
index 3a7ea65..da38d67 100644
--- a/shorewall/rules
+++ b/shorewall/rules
@@ -39,6 +39,7 @@ ACCEPT                $FW             net             icmp

 SSH(ACCEPT)    net             $FW
 HTTP(ACCEPT)   net             $FW
+HTTPS(ACCEPT)  net             $FW
 # VNC ganeti
 ACCEPT         net             $FW             tcp     11000:11010
 # VNC libvirt
~~~


The nginx reverse proxy was configured to proxy SSL requests, after
generating a certificateaccording to [the SSL
module](http://wiki.nginx.org/HttpSslModule) instructions:

~~~
server {
 ssl on;
 listen 443;
 server_name gallifrey-test1.dachary.org;
 access_log  /var/log/nginx/gallifrey.dachary.org.access.log;
 ssl_certificate /etc/nginx/server.crt;
 ssl_certificate_key /etc/nginx/server.key;

 location / {
  proxy_pass https://gallifrey-test1.xivo.vm.farm:443;
#  proxy_set_header Host $host;       
 }
}
~~~


And the [XiVO web interface](https://gallifrey-test1.dachary.org/) could
be displayed.

</p>

