Title: An alternate XiVO skaro repository
Date: 2011-06-06 11:13
Author: dachary
Category: XiVO IPBX
Tags: packages
Slug: an-alternate-xivo-skaro-repository
Status: published

#### composing skaro

The gallifrey repository is made of packages built from the GIT
repositories, some extracted from the official repository because they
are not under GIT and others built for the occasion (kernel-modules and
meta-packages). The source of each package is documented in
**/var/cache/packaging-farm/build/skaro/Makefile** which is the
meta-package that depends on all the others:

~~~
PACKAGE=skaro
DISTRIBUTIONS=squeeze
COMPONENT=main
ARCHITECTURES=i386 x86_64
# bntools  asterisk-chan-sccp                                                                                                                                                   
CHILD_PACKAGES = asterisk dahdi-linux dahdi-linux-modules dahdi-tools freeswitch libpri pf-xivo-base-config pf-xivo-confgen pf-xivo-cti-server pf-xivo-extra pf-xivo-fetchfw pf-xivo-lib-js pf-xivo-lib-python pf-xivo-monitoring pf-xivo-provisioning pf-xivo-sounds pf-xivo-sysconfd pf-xivo-utils pf-xivo-web-interface pf-asterisk-res-watchdog pf-xivo pf-xivo-backup
#                                                                                                                                                                               
# Waiting to be completed:                                                                                                                                                      
# bntools chan_sccp                                                                                                                                                             
submit:
        #                                                                                                                                                                       
        # Submitted from the GIT repositories                                                                                                                                   
        #                                                                                                                                                                       
        for dir in agid asterisk base-config confgen ctiservers dahdi-linux dahdi-tools extra fetchfw freeswitch lib-javascript lib-python monitoring provisioning sysconfd uti\
ls wanpipe web-interface xivo_ha xivo-sounds ; do packaging-farm DIRECTORY=$$dir submit ; done
        #                                                                                                                                                                       
        # When symbolic links needs to be resolved before building the source package                                                                                           
        #                                                                                                                                                                       
        for dir in res_watchdog ; do RSYNC_OPTIONS=--copy-unsafe-links packaging-farm DIRECTORY=$$dir submit ; done
        #                                                                                                                                                                       
        #                                                                                                                                                                       
        # Retrieved from dak.proformatique.com because they are not in the GIT repositories                                                                                     
        # deb-src http://dak.proformatique.com/debian/ squeeze-xivo-skaro-dev main                                                                                              
        # virtual packages : pf-xivo pf-xivo-backup                                                                                                                             
        for package in libpri pf-xivo pf-xivo-backup  ; do ( rm -fr $$package ; mkdir $$package ; cd $$package ; apt-get source $$package ) ; done

ROLE = meta-package
~~~


The hand made packages (i.e. Makefiles) can be retrieved from their
respective repositories:

-   http://skaro.dachary.org/packaging-farm/skaro/Makefile
-   http://skaro.dachary.org/packaging-farm/dahdi-linux-modules/Makefile

The packages are built for two architectures : i386 and x86\_64

~~~
ARCHITECTURES=i386 x86_64
~~~


Mirroring the http://skaro.dachary.org/packaging-farm/ directory is
enough to get all the information required to re-install a
packaging-farm from scratch.It can be used by adding the following to
/etc/apt/sources.list

~~~
deb http://skaro.dachary.org/packaging-farm/skaro/gnulinux/debian skaro-squeeze main
~~~


#### troubleshooting

The pf-xivo-extra produced an error:

~~~
cp: cannot stat `debian/tmp/README': No such file or directory
dh_install: cp -a debian/tmp/README debian/pf-xivo-extra/usr/share/pf-xivo-extra// returned exit code 1
~~~


Nicolas Hicher logged in the machine and went to debug into the chroot
used to create the package:

~~~
packaging-farm --cd pf-xivo-extra DISTRIBUTION=squeeze ARCHITECTURE=x86_64 chroot-login
~~~


It turns out that the package is not properly built from git. The
submit-xivo.sh corrupted the source distribution when called twice on
the same package. The problem was fixed in the new
[1.2.42](http://packaging-farm.dachary.org/download/) packaging-farm
release.The i386 squeeze chroot had a flaw that forced the installation
of x11 when installing the devscripts package. The chroot was re-created
using the following:

~~~
pbuilder --create --architecture i386 --distribution squeeze --basetgz /var/cache/pbuilder/squeeze-i386.tgz
~~~


The only package that could not be rebuilt was pf-asterisk-res-watchdog
and a bug was reported regarding its [missing build depend to
python](https://projects.xivo.io/issues/2302).

#### managing timestamps when submitting a package

The oneliner that could be used to rebuild XiVO with all the updates
from the git repositories is :

~~~
cd /var/cache/packaging-farm/build/skaro ; make submit ; packaging-farm skaro
~~~


It involves calling submit-xivo.sh for all known packages and therefore
trigger a recompilation of each package, even those that were not
changed since the last compilation. That can be avoided by selecting the
relevant packages, using a method similar to the [one described in a
previous
post](http://blog.xivo.io/index.php?post/2011/05/30/Using-and-Updating-a-XiVO-gallifrey-repository).
To avoid a manual selection, the submit-xivo.sh was modified to do
nothing if it notices that the git repositories do not contain any
commit more recent than the timestamp updated when the last compilation
completed successfully.

~~~
function need_update() {
    local package="$1"
    local dir="$2"
    local suite="$3"
    local xivo="$4"

    if [ ! -f ${DEPENDS_DIR}/${package} ] ; then
        return 0
    else
        modified=$(stat --terse --printf=%Y ${DEPENDS_DIR}/${package})
        (
            cd ${VCS_DIR}/sources/xivo-${xivo}/${dir}
            git log -1 --after=${modified} .
            cd ${VCS_DIR}/debian/${suite}-xivo-${xivo}/${package}
            git log -1 --after=${modified} .
        ) > /tmp/submit$$
        [ -s /tmp/submit$$ ]
        result=$?
        rm /tmp/submit$$
        return $result
    fi
}
~~~


</p>

