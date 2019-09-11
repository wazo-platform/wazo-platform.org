Title: Creating an independant XiVO Debian GNU/Linux repository from scratch (part 1/4)
Date: 2011-02-07 21:40
Author: dachary
Category: XiVO IPBX
Slug: creating-an-independant-xivo-debian-gnulinux-repository-from-scratch-part-14
Status: published

#### Extracting XiVO Gallifrey for Debian lenny

After creating a virtual machine based on the recently published
DebianGNU/Linux squeeze, packaging-farm is installed from the
repository. Anothersource is added to extract the XiVO packages in
source form. Here we focuson *main* but the same principle can be done
for others.

~~~
deb http://dak.proformatique.com/debian/ lenny-xivo-gallifrey main
deb-src http://dak.proformatique.com/debian/ lenny-xivo-gallifrey main
~~~


packaging-farm expects to find package sources in
/var/cache/packaging-farm/sourceswithin a directory that is named after
the package. This hierarchy was build withthe following:

~~~
awk '/^Package/{print $2}' /var/lib/apt/lists/dak.proformatique.com_debian_dists_lenny-xivo-gallifrey_main_source_Sources | 
while read package 
do 
  ( rm -fr $package ; mkdir $package ; cd $package ; apt-get source $package )
done
~~~


In addition, a list of all known packages must be added to
/etc/packaging-farm/packaging-farm.conf and a variable containing the
directory where the chroot must be stored. The chroot is preserved if
the build fail, for debuging purpose. To keep the structure consistent,
a directory named after the package is created in /usr/src
(/usr/src/asterisk, /usr/src/dahdi-linux etc.). Each directory must
contain a Makefile that may contain exceptions or additional build
instructions for the farm. Since there is no need for such tweaking at
the moment, the Makefiles are generated:

~~~
for package in asterisk asterisk-addons asterisk-app-conference asterisk-chan-capi asterisk-chan-sccp asterisk-sounds-gsm-de-de asterisk-sounds-wav-en-us asterisk-sounds-wav-es-es asterisk-sounds-wav-fr-ca bntools dahdi-linux dahdi-tools libasterisk-perl libpri misdn-kernel misdn-user pf-asterisk-ami-aoriginate pf-asterisk-app-fax pf-asterisk-app-nv-faxdetect pf-asterisk-module-xivo pf-asterisk-prompt-fr pf-asterisk-prompt-fr-xivo pf-asterisk-prompts-xivo pf-asterisk-res-sqlite2 pf-asterisk-res-watchdog pf-asternic-stats pf-sources.list-ldlc pf-xivo pf-xivo-agid pf-xivo-backup pf-xivo-base-config pf-xivo-cti-server pf-xivo-cti-webclient pf-xivo-extra pf-xivo-fetchfw pf-xivo-lib-python pf-xivo-provisioning pf-xivo-queues-logger pf-xivo-sysconfd pf-xivo-utils pf-xivo-web-interface sangoma-wanpipe spandsp ; do
cat > /usr/src/$package/Makefile <<EOF
PACKAGE=$package
DISTRIBUTIONS=lenny
ARCHITECTURES=i386
LIBDIR ?= /usr/lib/packaging-farm
include \${LIBDIR}/Makefile
EOF
done
~~~


#### Source package dependencies

The packaging-farm does not know anything about source package
dependencies. For instance a number of XiVO packages depend on asterisk,
therefore they need to be rebuilt if a new asterisk package is
published. In preparation for a patch submission to add support for
source package dependencies, a set of shell commands have been performed
to generate a set of dependencies written as Makefile entries:

~~~
# these lines are approximations that won't work out of the box
# list all packages for each source package
cat  */*/debian/control | perl -ne 'print "$1|" if(s/^Package:\s*(.*)\s*//)'
# map package to corresponding source package
cat /tmp/list_of_source_packages | while read package ; do cat $package/*/debian/control | perl -ne 's/[.-]/_/g; print "$1='$package'\
" if(s/^Package:\s*(.*)\s*//)' ; done
# create the makefile entries
for package in asterisk asterisk-addons asterisk-app-conference asterisk-chan-capi asterisk-chan-sccp asterisk-sounds-gsm-de-de asterisk-sounds-wav-en-us asterisk-sounds-wav-es-es asterisk-sounds-wav-fr-ca bntools dahdi-linux dahdi-tools libasterisk-perl libpri misdn-kernel misdn-user pf-asterisk-ami-aoriginate pf-asterisk-app-fax pf-asterisk-app-nv-faxdetect pf-asterisk-module-xivo pf-asterisk-prompt-fr pf-asterisk-prompt-fr-xivo pf-asterisk-prompts-xivo pf-asterisk-res-sqlite2 pf-asterisk-res-watchdog pf-asternic-stats pf-sources.list-ldlc pf-xivo pf-xivo-agid pf-xivo-backup pf-xivo-base-config pf-xivo-cti-server pf-xivo-cti-webclient pf-xivo-extra pf-xivo-fetchfw pf-xivo-lib-python pf-xivo-provisioning pf-xivo-queues-logger pf-xivo-sysconfd pf-xivo-utils pf-xivo-web-interface sangoma-wanpipe spandsp ; do echo -n "$package :: " ; perl -ne 'if(/^Build-Depends/) { while(/(asterisk-mysql|asterisk-mp3|asterisk-ooh323c|asterisk-app-conference|asterisk-app-conference-dbg|asterisk|asterisk-common|asterisk-dev|asterisk-sounds-main|asterisk-web-vmail|asterisk-config|asterisk-classic|asterisk-classic-dbg|asterisk-chan-capi|asterisk-chan-capi-dbg|asterisk-chan-sccp|asterisk-chan-sccp-dbg|asterisk-sounds-gsm-de-de|asterisk-sounds-wav-en-us|asterisk-sounds-wav-es-es|asterisk-sounds-wav-fr-ca|bntools|pf-asterisk-res-bnfos|dahdi-linux-source|dahdi-linux-modules-common|dahdi-linux-dev|dahdi-tools|libtonezone1|libtonezone-dev|libasterisk-perl|libpri-dev|libpri1.4|misdn-kernel-source|misdn|misdn-headers|misdn-utils|misdn-dbg|libmisdn0|libmisdn-dev|libisdnnet0|libisdnnet-dev|pf-asterisk-ami-aoriginate|pf-asterisk-app-fax|pf-asterisk-app-fax-dbg|pf-asterisk-app-nv-faxdetect|pf-asterisk-module-xivo|pf-asterisk-prompt-fr|pf-asterisk-prompt-fr-xivo|pf-asterisk-prompt-fr-fr-xivo|pf-asterisk-prompt-fr-ca-xivo|pf-asterisk-res-sqlite2|pf-asterisk-res-sqlite2-dbg|pf-asterisk-res-watchdog|pf-asternic-stats|pf-sources.list-ldlc-xivo-1.1-gallifrey|pf-xivo-agid|pf-xivo-backup|pf-xivo-base-config|pf-xivo-cti-server|pf-xivo-cti-webclient|pf-xivo-extra|pf-xivo-fetchfw|pf-xivo-lib-python|pf-xivo|pf-xivo-debug-tools|pf-xivo-provisioning|pf-xivo-queues-logger|pf-xivo-sysconfd|pf-xivo-utils|pf-xivo-web-interface|pf-xivo-web-interface-config|sangoma-wanpipe-tools|sangoma-dbg|sangoma-wanpipe-source|libspandsp3|libspandsp-dev|libspandsp3-dbg|libspandsp-doc)/g) { print "$1\
"; } }' < /var/cache/packaging-farm/sources/$package/*/debian/control | sort -u | while read source ; do echo -n ' ' ; eval echo -n \$$(echo $source | sed -e 's/[.-]/_/g') ; done ; echo ; done
~~~


created:

~~~
# level 4
pf-asterisk-ami-aoriginate ::  asterisk
pf-asterisk-app-fax ::  asterisk spandsp
pf-asterisk-app-nv-faxdetect ::  asterisk
pf-asterisk-module-xivo ::  asterisk
pf-asterisk-res-sqlite2 ::  asterisk
pf-asterisk-res-watchdog ::  asterisk
asterisk-addons ::  asterisk
asterisk-app-conference ::  asterisk
asterisk-chan-capi ::  asterisk
asterisk-chan-sccp ::  asterisk
bntools ::  asterisk
# level 3
asterisk ::  dahdi-linux misdn-user libpri dahdi-tools misdn-kernel
# level 2
dahdi-tools ::  dahdi-linux
sangoma-wanpipe ::  dahdi-linux
misdn-user ::  misdn-kernel
# level 1
asterisk-sounds-gsm-de-de asterisk-sounds-wav-en-us asterisk-sounds-wav-es-es asterisk-sounds-wav-fr-ca dahdi-linux libasterisk-perl libpri misdn-kernel pf-asterisk-prompt-fr pf-asterisk-prompt-fr-xivo pf-asterisk-prompts-xivo pf-asternic-stats pf-sources.list-ldlc pf-xivo pf-xivo-agid pf-xivo-backup pf-xivo-base-config pf-xivo-cti-server pf-xivo-cti-webclient pf-xivo-extra pf-xivo-fetchfw pf-xivo-lib-python pf-xivo-provisioning pf-xivo-queues-logger pf-xivo-sysconfd pf-xivo-utils pf-xivo-web-interface spandsp  ::
~~~


The dependencies were used to figure out the manual order in which the
packages must be built. After checking that all packages without
dependencies could be successfully built
([misdn-kernel](http://xivo.dachary.org/packaging-farm/misdn-kernel/gnulinux/debian/i386/lenny/src/),
[dahdi-linux](http://xivo.dachary.org/packaging-farm/dahdi-linux/gnulinux/debian/i386/lenny/src/)
and [more](http://xivo.dachary.org/packaging-farm/)), the idea was to
encode the dependencies in the Makefile for each package.

~~~
for i in asterisk-sounds-gsm-de-de asterisk-sounds-wav-en-us asterisk-sounds-wav-es-es asterisk-sounds-wav-fr-ca dahdi-linux libasterisk-perl libpri misdn-kernel pf-asterisk-prompt-fr pf-asterisk-prompt-fr-xivo pf-asterisk-prompts-xivo pf-asternic-stats pf-sources.list-ldlc pf-xivo pf-xivo-agid pf-xivo-backup pf-xivo-base-config pf-xivo-cti-server pf-xivo-cti-webclient pf-xivo-extra pf-xivo-fetchfw pf-xivo-lib-python pf-xivo-provisioning pf-xivo-queues-logger pf-xivo-sysconfd pf-xivo-utils pf-xivo-web-interface spandsp  ; do ( echo --------------------------- ; echo $i ; cd $i ; make all ) ; done
~~~


In packaging-farm, when a package is built, a new debian repository is
created just for this package and only contains its package. In the case
of misdn-user the repository of misdn-kernel (see above : it depends on
it) would need to be added to the description of the misdn-user package.
Although this may be fine for a few packages, four level of dependencies
makes it tedious and error prone. It would be unwise to try it manually.

#### Aggregation of the results

XiVO is made of dozens of packages and it would be most inconvenient to
add so many lines to a source list. Instead, a [galifrey meta
package](http://xivo.dachary.org/packaging-farm/gallifrey/Makefile) is
created in the packaging-farm with the sole purpose of copying all
packages in a [single
repository](http://xivo.dachary.org/packaging-farm/gallifrey/gnulinux/debian/i386/lenny/src/).
The following line could be added to a virgin Debian GNU/linux lenny
source list and should now be equivalent to its counterpart on
http://dak.proformatique.com/debian/

~~~
deb http://xivo.dachary.org/packaging-farm/gallifrey/gnulinux/debian/i386/lenny/src/ ./
deb-src http://xivo.dachary.org/packaging-farm/gallifrey/gnulinux/debian/i386/lenny/src/ ./
~~~


#### Implementing dependency handling in packaging-farm

Although an i386 repository is now available for the XiVO packages which
solely depend on Debian GNU/Linux lenny, it would be tedious to manually
arrange the packaging-farm to accommodate for the four level of
dependencies. Instead packaging-farm should be modified to handle
interdepencies of packages. Although it would be possible to arrange for
the other operations to be supported by a specific tool (for instance
importing all the packages from a known repository), such an operation
is not frequent and the time to properly write such a tool and make sure
it works as expected probably outweights the benefit.

</p>

