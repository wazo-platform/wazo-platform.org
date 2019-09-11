Title: Using and Updating a XiVO gallifrey repository
Date: 2011-05-30 12:57
Author: dachary
Category: XiVO IPBX
Tags: packages
Slug: using-and-updating-a-xivo-gallifrey-repository
Status: published

#### Updating the repository

To figure out what needs updating, a query is made on the git
repositories.

~~~
cd /var/cache/packaging-farm/VCS/sources/xivo-gallifrey
git fetch
git log --stat=2000,2000 ..origin/master
~~~


The *--stat* option shows which files are modified and the numbers after
it ensure that they are not truncated. The first component of the file
name designate the directory of interest. For instance

~~~
chan_sccp/patches/fix_forward_on_bad_numbers       |   13 ++
 chan_sccp/patches/fix_useless_channel_unlocks      |  155 ++++++++++++++++++++
~~~


says that we need to re-submit as follows:

~~~
packaging-farm DIRECTORY=chan_sccp submit
~~~


The same should be done for the git repository of the debian packages

~~~
cd /var/cache/packaging-farm/VCS/debian/lenny-xivo-gallifrey
git fetch
git log --stat=2000,2000 ..origin/master
~~~


There was a need to re-submit the following:

~~~
for dir in web-interface chan_sccp ctiservers
do 
  packaging-farm DIRECTORY=$dir submit
done
~~~


and the repository was updated with:

~~~
packaging-farm gallifrey
~~~


after checking what would be done with

~~~
packaging-farm -n gallifrey
~~~


The *-n* flag semantic can be found in the GNU make documentation. The
*packaging-farm* command wraps the *make* command.

#### Packaging farm release

The [1.2.41](http://packaging-farm.dachary.org/download) version of
packaging-farmcontains documentation improvements ( packaging-farm and
packaging-farm.conf manual pages ) about troubleshooting a process that
prevents a directory to umount and using RSYNC options to control what
is being copied when building the package (for instance to ensure that
the symbolic link target is copied instead of the symbolic link).The
dependency graph failed to build the required packages: although it was
accurate, in some cases it missed the corresponding action. As a
consequence the child of the graph were updated but not the topmost
parents.

#### Using XiVO with OVH

A [virtual machine was setup](https://gallifrey-test1.dachary.org/)
using the [gallifrey
repository](http://gallifrey.dachary.org/packaging-farm/gallifrey) and
the following command:

~~~
apt-get install pf-xivo
~~~


The host firewall was configured to send the *5060* port to the virtual
machine and forward the https port to the nginx proxy:

~~~
--- a/shorewall/params
+++ b/shorewall/params
@@ -28,4 +28,5 @@ IP_FAILOVER=66.254.41.119
 VM_DEV_DACHARY=10.10.60.1
 VM_SKARO_XIVO=10.10.60.2
 VM_GALLIFREY_XIVO=10.10.60.3
+VM_GALLIFREY_TEST1=10.10.60.4
 #LAST LINE -- DO NOT REMOVE
diff --git a/shorewall/rules b/shorewall/rules
index 3a7ea65..66161c0 100644
--- a/shorewall/rules
+++ b/shorewall/rules
@@ -39,11 +39,15 @@ ACCEPT              $FW             net             icmp

 SSH(ACCEPT)    net             $FW
 HTTP(ACCEPT)   net             $FW
+HTTPS(ACCEPT)  net             $FW
 # VNC ganeti
 ACCEPT         net             $FW             tcp     11000:11010
 # VNC libvirt
 ACCEPT         net             $FW             tcp     5900:5910

+DNAT           net             loc:$VM_GALLIFREY_TEST1 tcp            5060           -       $IP_FAILOVER
+DNAT           net             loc:$VM_GALLIFREY_TEST1 udp            5060           -       $IP_FAILOVER
+
 # SSH remap
 DNAT           net             loc:$VM_DEV_DACHARY:22 tcp            22001           -       $IP_FAILOVER
 DNAT           net             loc:$VM_SKARO_XIVO:22 tcp             22002           -       $IP_FAILOVER
~~~


The nginx proxy was configured to reverse proxy https:

~~~
diff --git a/nginx/sites-available/gallifrey-test2.dachary.org b/nginx/sites-available/gallifrey-test2.dachary.org
new file mode 100644
index 0000000..2525ff9
--- /dev/null
+++ b/nginx/sites-available/gallifrey-test2.dachary.org
@@ -0,0 +1,13 @@
+server {
+ ssl on;
+ listen 443;
+ server_name gallifrey-test2.dachary.org;
+ access_log  /var/log/nginx/gallifrey.dachary.org.access.log;
+ ssl_certificate /etc/nginx/server.crt;
+ ssl_certificate_key /etc/nginx/server.key;
+
+ location / {
+  proxy_pass https://10.10.70.71:443;
+#  proxy_set_header Host $host;
+ }
+}
~~~


And the corresponding certificates created as instructed in the nginx
documentation.The [IPPI
instructions](https://wiki.xivo.io/index.php/XiVO_1.1-Gallifrey/Trunk_SIP)
were followed to connect the XiVO just created with an [OVH phone
number](http://www.ovh.com/fr/telephonie/). All of the instructiosn
listed for IPPI apply to OVH because they use the same system (Cirpack).
The values for DTMF were left unchanged and NAT set to *Yes*.Debugging
was made convenient with the asterisk console

~~~
$ asterisk -rvvvvv
gallifrey-test1*CLI> sip show registry
Host                            Username       Refresh State                Reg.Time                 
sip.ovh.net:5060                003384452800       105 Registered           Mon, 23 May 2011 11:38:12
~~~


And the actual SIP requests could be viewed with

~~~
gallifrey-test1*CLI> set debug peer trunk_ovh
~~~


which was most convenient to submit the problems to
irc.freenode.net\#xivo and irc.freenode.net\#asterisk.

#### Independent install of XiVO

Nicolas Hicher installed XiVO using

~~~
deb http://gallifrey.dachary.org/packaging-farm/gallifrey/gnulinux/debian gallifrey-lenny main
~~~


and

~~~
apt-get install dahdi-linux-modules-2.6.26-2-486
apt-get install pf-xivo
~~~


(the actual package was adapted to the running kernel) and reported
success

~~~
(11:53:20 AM) atarakt: Installation successful !!!
(11:53:24 AM) atarakt: excellent =)
(11:54:28 AM) atarakt: j'ai un xivo qui tourne
(11:57:37 AM) dachary: oO
(11:57:50 AM) ***dachary débouche le champagne
~~~


</p>

