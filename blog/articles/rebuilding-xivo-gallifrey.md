Title: Rebuilding XiVO gallifrey
Date: 2011-09-05 08:39
Author: dachary
Category: XiVO IPBX
Tags: packages
Slug: rebuilding-xivo-gallifrey
Status: published

#### rebuilding gallifrey

The /var/cache/packaging-farm/sources directory was removed and

~~~
export VERSION_COMPUTE=false
~~~


set in /etc/packaging-farm/packaging-farm.conf and
`packaging-farm --cd gallifrey rebuild` was run to rebuild gallifrey
from scratch. It took 42 minutes total. The purpose of this complete
rebuild was to get rid of the timestamp and hash that were previously
part of the version number.

#### compatibility between sangoma-wanpipe and dahdi-linux

The build of the gallifrey development packages was blocked because of a
compilation error.

~~~
...
/usr/src/sangoma-wanpipe-3.5.17.dfsg.1/kdrvtmp/sdla_tdmv.c:1504: error: 'DAHDI_MAINT_LOOPSTOP' undeclared (first use in this function)
/usr/src/sangoma-wanpipe-3.5.17.dfsg.1/kdrvtmp/sdla_tdmv.c: In function 'wp_tdmv_rx_dchan':
/usr/src/sangoma-wanpipe-3.5.17.dfsg.1/kdrvtmp/sdla_tdmv.c:2516: error: 'struct dahdi_chan' has no member named 'readbufq'
/usr/src/sangoma-wanpipe-3.5.17.dfsg.1/kdrvtmp/sdla_tdmv.c:2517: error: 'struct dahdi_chan' has no member named 'sel'
/usr/src/sangoma-wanpipe-3.5.17.dfsg.1/kdrvtmp/sdla_tdmv.c:2519: error: 'struct dahdi_chan' has no member named 'eventbufq'
make[6]: *** [/usr/src/sangoma-wanpipe-3.5.17.dfsg.1/kdrvtmp/sdla_tdmv.o] Error 1
make[5]: *** [_module_/usr/src/sangoma-wanpipe-3.5.17.dfsg.1/kdrvtmp] Error 2
make[4]: *** [all] Error 2

---------------------------------------------

make[3]: *** [common-build-impl] Error 1
dpkg-buildpackage: failure: debian/rules build gave error exit status 2
BUILD END packaging-farm --cd sangoma-wanpipe ARCHITECTURE=i386 DISTRIBUTION=lenny chroot-login
~~~


To debug the problem, the following command was used to go in the chroot
where it can be reproduced:

~~~
packaging-farm --cd sangoma-wanpipe ARCHITECTURE=i386 DISTRIBUTION=lenny chroot-login
~~~


The compilation error:

~~~
/usr/src/sangoma-wanpipe-3.5.20.dfsg.1/kdrvtmp/sdla_tdmv.c:352: error: unknown field 'name' specified in initializer
~~~


is in `/usr/src/sangoma-wanpipe-3.5.20.dfsg.1/kdrvtmp/sdla_tdmv.c`

~~~
static const struct dahdi_echocan_ops wp_tdmv_ec_ops = {
        .name = "WANPIPE_HWEC",
        .echocan_free = wp_tdmv_hwec_free,
};
~~~


and comes from the fact that `/usr/include/dahdi/kernel.h` which is part
of

~~~
ii  dahdi-linux-dev                 1:2.5.0+pf.xivo.1.1.18~20110820.120254.7b98919-1 DAHDI telephony interface (source code
~~~


contains

~~~
struct dahdi_echocan_ops {

        /*! \brief Free an echocan state structure.                                                                                                             
         * \param[in,out] ec Pointer to the state structure to free.                                                                                            
         *                                                                                                                                                      
         * \
eturn Nothing.                                                                                                                                     
         */
        void (*echocan_free)(struct dahdi_chan *chan, struct dahdi_echocan_state *ec);
...
~~~


and does not contain the `name` field which means that
`sangoma-wanpipe-3.5.20` is not compatible with
`dahdi-linux-dev 1:2.5.0`

#### kernel-module dependencies

Nicolas Hicher faced a problem because [kernel-modules dependencies did
not work](http://packaging-farm.dachary.org/trac/ticket/19). The
dependency graph generated is wrong: it mentions the stamp files but do
not assemble them properly. As a result the kernel-module is not rebuilt
when the module is rebuilt. The make\_graph and make\_build functions
[are assembled into a single
functio...](are%20assembled%20into%20a%20single%20functionhttp://packaging-farm.dachary.org/trac/changeset/d561c3d271e26651c2f94f96d343d7d33070eb60 "are assembled into a single functionhttp://packaging-farm.dachary.org/trac/changeset/d561c3d271e26651c2f94f96d343d7d33070eb60")|
so that the rule generated lists the timestamp files of the
dependencies.

#### Makefiles moved to /etc/packaging-farm

The fact that Makefiles describing how a given package must be built are
expected to be in /var/cache/packaging-farm [is
confusing](http://packaging-farm.dachary.org/trac/ticket/20). In
addition, they are copied in /var/lib/packaging-farm after the package
is successfully built. As a result the system administrator is led to
think that /var/lib/packaging-farm/package/Makefile is the file to be
edited although it will be overridden the next time a package is
built.The makefiles [are moved from
/var/cache/packaging-farm/build/package/Makefile to
/etc/packaging-farm/package.mk](http://packaging-farm.dachary.org/trac/changeset/6450d8785be6406a5e1d1d205df23be04279f736).
To ensure the compatibility with the existing scripts, a symbolic link
is created from /var/cache/packaging-farm/build/package/Makefile to
/etc/packaging-farm/package.mk by the makefiles.sh script.The manual
page is updated to remove references to the former build directory. The
additional benefit of having the .mk files in /etc/packaging-farm is
that they can be saved by etckeeper and backed up with /etc.The build
machines for gallifrey, gallifrey-dev and skaro were migrated to the new
convention.

</p>

