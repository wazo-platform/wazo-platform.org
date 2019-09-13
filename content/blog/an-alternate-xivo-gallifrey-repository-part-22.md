Title: An alternate XiVO gallifrey repository (part 2/2)
Date: 2011-04-27 05:47
Author: dachary
Category: XiVO IPBX
Slug: an-alternate-xivo-gallifrey-repository-part-22
Status: published

#### composing gallifrey

The gallifrey repository is made of packages built from the GIT
repositories, some extracted from the official repository because they
are not under GIT and others built for the occasion (kernel-modules and
meta-packages). The source of each package is documented in
**/var/cache/packaging-farm/build/gallifrey/Makefile** which is the
meta-package that depends on all the others:

~~~
#
# Submitted from the GIT repositories
#
# for dir in asterisk dahdi-linux asterisk-sounds-gsm-de-de asterisk-sounds-wav-en-us asterisk-sounds-wav-es-es asterisk-sounds-wav-fr-ca \
#       prompts-xivo prompts asternic-stats agid base-config ctiservers ctiwebclient extra fetchfw \
#       lib-python provisioning queues-logger sysconfd utils web-interface ; do packaging-farm DIRECTORY=$dir submit ; done
#
# Retrieved from dak.proformatique.com because they are not yet in the GIT repositories
# deb-src http://dak.proformatique.com/debian/ lenny-xivo-gallifrey-dev main
# for package in asterisk-chan-capi libasterisk-perl libpri misdn-kernel misdn-user \
#                sangoma-wanpipe spandsp pf-xivo pf-xivo-backup  ; \
#                do ( rm -fr $package ; mkdir $package ; cd $package ; apt-get source $package ) ; done
#
# Hand made packages
#
# gallifrey
# dahdi-linux-modules
# sangoma-wanpipe-modules
# misdn-kernel-modules
#
~~~


The hand made packages (i.e. Makefiles) can be retrieved from their
respective repositories:

-   http://gallifrey.dachary.org/packaging-farm/gallifrey/Makefile
-   http://gallifrey.dachary.org/packaging-farm/dahdi-linux-modules/Makefile
-   http://gallifrey.dachary.org/packaging-farm/misdn-kernel-modules/Makefile
-   http://gallifrey.dachary.org/packaging-farm/sangoma-wanpipe-modules/Makefile

Mirroring the http://gallifrey.dachary.org/packaging-farm/ directory is
enough to get all the information required to re-install a
packaging-farm from scratch.

#### comparing repositories

In order to make sure that the new [gallifrey
repository](http://gallifrey.dachary.org/packaging-farm/gallifrey/gnulinux/debian/)
does not deviate from the [existing
dak](http://dak.proformatique.com/debian/dists/lenny-xivo-gallifrey-dev/),
the packages it contains were extracted from sources and compared.

~~~
# deb-src http://dak.proformatique.com/debian/ lenny-xivo-gallifrey-dev main
dak:
        mkdir -p dak
        apt-get update
        cd dak ; awk '/^Package/{print $$2}' /var/lib/apt/lists/dak.proformatique.com_debian_dists_lenny-xivo-gallifrey-dev_main_source_Sources | \
        while read package ; do ( rm -fr $$package ; mkdir $$package ; cd $$package ; apt-get source $$package ) ; done

farm:
        rm -fr farm ; mkdir -p farm
        cd farm ; for package in `ls /var/lib/packaging-farm` ; do \
                if [ -f "`echo /var/lib/packaging-farm/$$package/gnulinux/debian/i386/lenny/src/*.dsc`" ] ; then \
                        ( \
                                mkdir $$package ; cd $$package ; \
                                dpkg-source -x /var/lib/packaging-farm/$$package/gnulinux/debian/i386/lenny/src/*.dsc ; \
                        ) \
                fi ; \
        done

diff:
        cd farm ; for package in * ; do \
                if [ -d ../dak/$$package ] ; then \
                        farm_dir=`find $$package/* -maxdepth 0 -type d` ; \
                        dak_dir=`find ../dak/$$package/* -maxdepth 0 -type d` ; \
                        diff -ur $$dak_dir $$farm_dir ; \
                else \
                        echo $$package not in dak ; \
                fi ; \
        done > /var/www/diff/diff-`date +%Y-%m-%d`.txt
        cd dak ; for package in * ; do \
                if [ ! -d ../farm/$$package ] ; then \
                        echo $$package not in farm ; \
                fi ; \
        done >> /var/www/diff/diff-`date +%Y-%m-%d`.txt

.PHONY: dak farm
~~~


The result is [archived with a
timestamp](http://gallifrey.dachary.org/diff/).According to Nicolas
Hicher, the numerous SVN tag substitutions that are missing because of
the migration to GIT will be harmless:

~~~
pf_magic_pickupmark
-       $Revision: 10011 $
-       $Date: 2011-01-21 17:22:28 +0100 (Fri, 21 Jan 2011) $
+       $Revision$
+       $Date$
~~~


#### packaging-farm release 1.2.39

A few [issues](http://packaging-farm.dachary.org/#Issue) were reported
against the latest packaging-farm, but they were not fixed because they
are not blocking. Other problems required immediate attention and they
were fixed in the [1.2.39](http://packaging-farm.dachary.org/download/)
release

~~~
* home/www/packaging-farm/packaging-farm/lib/Makefile:
        kill all processes left over in a chroot before trying to umount
        [dd63f7ecef41] 

        * home/www/packaging-farm/packaging-farm/debian/changelog, home/www
        /packaging-farm/packaging-farm/debian/control, home/www/packaging-
        farm/packaging-farm/lib/Makefile, home/www/packaging-farm/packaging-
        farm/lib/debian/official-op.sh, home/www/packaging-farm/packaging-
        farm/lib/debian/submit.sh, home/www/packaging-farm/packaging-
        farm/lib/kernel-module/depends.sh:
        add support for wheezy
        [8f9a40627f0b]

        * home/www/packaging-farm/packaging-farm/lib/report.sh:
        add support for debian src format 3.0 by recognizing the
        .debian.tar.gz
        [36b30f22e4d8]

        * home/www/packaging-farm/packaging-farm/etc/packaging-farm.conf:
        change the semantic and example of SIGN_debian
        [d3215a3a920f]

        * home/www/packaging-farm/packaging-farm/submit/submit-xivo.sh:
        preserve epoch from version, if any
        [6deaae005d9a]

        * home/www/packaging-farm/packaging-farm/bin/packaging-farm.1:
        document the updating of the chroots and add a section on
        troubleshooting
        [2af56b21eb6a]
~~~


</p>

