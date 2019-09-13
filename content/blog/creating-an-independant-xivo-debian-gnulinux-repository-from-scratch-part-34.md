Title: Creating an independant XiVO Debian GNU/Linux repository from scratch (part 3/4)
Date: 2011-02-21 16:48
Author: dachary
Category: XiVO IPBX
Slug: creating-an-independant-xivo-debian-gnulinux-repository-from-scratch-part-34
Status: published

#### Lenny backports

Nicolas Hicher published newer versions of the gallifrey packages
[addressing the dependency
problems](https://projects.proformatique.com/issues/1942) reported last
week. They can be retrieved from the development repository

~~~
deb-src http://dak.proformatique.com/debian/ lenny-xivo-gallifrey-dev main
~~~


All source packages were downloaded using:

~~~
awk '/^Package/{print $2}' /var/lib/apt/lists/dak.proformatique.com_debian_dists_lenny-xivo-gallifrey-dev_main_source_Sources | while read package ; do ( rm -fr $package ; mkdir $package ; cd $package ; apt-get source $package ) ; done
~~~


the dependencies removed with:

~~~
rm /var/cache/packaging-farm/depends/*
~~~


and the build of all packages relaunched with:

~~~
for i in asterisk asterisk-addons asterisk-app-conference asterisk-chan-capi asterisk-chan-sccp asterisk-sounds-gsm-de-de asterisk-sounds-wav-en-us asterisk-sounds-wav-es-es asterisk-sounds-wav-fr-ca bntools dahdi-linux dahdi-tools libasterisk-perl libpri misdn-kernel misdn-user pf-asterisk-ami-aoriginate pf-asterisk-app-fax pf-asterisk-app-nv-faxdetect pf-asterisk-module-xivo pf-asterisk-prompt-fr pf-asterisk-prompt-fr-xivo pf-asterisk-prompts-xivo pf-asterisk-res-sqlite2 pf-asterisk-res-watchdog pf-asternic-stats pf-sources.list-ldlc pf-xivo pf-xivo-agid pf-xivo-backup pf-xivo-base-config pf-xivo-cti-server pf-xivo-cti-webclient pf-xivo-extra pf-xivo-fetchfw pf-xivo-lib-python pf-xivo-provisioning pf-xivo-queues-logger pf-xivo-sysconfd pf-xivo-utils pf-xivo-web-interface sangoma-wanpipe spandsp gallifrey ; do packaging-farm $i ; done
~~~


Thanks to the dependency graph added to packaging-farm each package is
compiled exactly once. It would be more convenient to be able run
something like

~~~
packaging-farm all
~~~


but such refinements are better addressed when the larger problems are
resolved.

#### Proformatique Debian GNU/Linux lenny packages

It is worth mentionning the existence of a lenny repository containing
packages used by the company for various purposes and not specificaly
for XiVO. It is not needed to properly create the XiVO packages and it
should never be. It can be used by including the following in the source
list:

~~~
deb http://dak.proformatique.com/debian lenny main
~~~


#### XiVO Kernel modules

A few XiVO packages provide kernel modules :
`misdn-kernel, sangoma-wanpipe, divas4linux-melware` and `dahdi-linux`.
The general idea is that each of the create a package designed to be
used by [module-assistant](http://wiki.debian.org/ModuleAssistant). A
kernel module is designed to be loaded in the kernel running on a
specific machine and module-assistant will help build the matching
binary from the kernel module sources. The lenny XiVO repository not
only provides sources for the module, but also supports a few kernel
flavors : `2.6.26-2-486, 2.6.26-2-686-bigmem` and
`2.6.26-2-686`.Unfortunately packaging-farm does not support building
binary kernel packages. It needs to be modified to add a new type to
package and meta-package : kernel-module. Instead of building a source
package, it would run module-assistant as follows:

~~~
module-assistant get --non-inter --text-mode --kvers-list 2.6.26-2-486,2.6.26-2-686-bigmem,2.6.26-2-686 sangoma-wanpipe-source
module-assistant prepare --non-inter --text-mode --kvers-list 2.6.26-2-486,2.6.26-2-686-bigmem,2.6.26-2-686 sangoma-wanpipe-source
KPKG_DEST_DIR=/tmp/a SIGNCHANGES=0 module-assistant build --non-inter --text-mode --kvers-list 2.6.26-2-486,2.6.26-2-686-bigmem,2.6.26-2-686 sangoma-wanpipe-source
~~~


The sangoma-wanpipe package adds another problem : when creating the
packages, it also tries to build a binary kernel module for the kernel
on which the packaging process is run. As a consequence, when in a i386
chroot running on a amd64 host, it cannot find the corresponding kernel
headers and fails. As it is the sangoma-wanpipe package has no way to
override the kernel version chosen. A [patch was
submitted](https://projects.proformatique.com/issues/1977#note-1) to
allows this:

~~~
--- /tmp/rules.orig     2011-02-21 15:59:23.000000000 +0100
+++ rules       2011-02-21 16:18:47.000000000 +0100
@@ -13,7 +13,12 @@
 KPKG_DESTDIR := $(DEB_DESTDIR)

 # fallback for XEN
-MA_OPTIONS=
+#MA_OPTIONS=
+DEB_KVERS=$(shell echo "${DEB_BUILD_OPTIONS}" | perl -ne 'print $$1 if(/.*KVERS=(\S*)/)')
+ifneq ($(DEB_KVERS),)
+KVERS=${DEB_KVERS}
+MA_OPTIONS=--kvers-list ${KVERS}
+endif
 ifeq ($(KVERS),unknown)
 KVERS=$(shell uname -r)
 MA_OPTIONS=--kvers-list $(KVERS)
~~~


so that packaging can be done with:

~~~
DEB_BUILD_OPTIONS=KVERS=2.6.26-2-486 dpkg-buildpackage
~~~


A better solution would be to propose a patch to the author of the
package to completly disablethe build of a binary kernel module. It is
unclear where the original package comes from an amail was sent to Nenad
Corbic &lt;ncorbic@sangoma.com&gt; reporting the patch and asking for
information.

</p>

