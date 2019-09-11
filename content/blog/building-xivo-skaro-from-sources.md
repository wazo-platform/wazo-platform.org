Title: building XiVO skaro from sources
Date: 2011-03-29 14:45
Author: dachary
Category: XiVO IPBX
Tags: packages
Slug: building-xivo-skaro-from-sources
Status: published

#### packaging-farm documentation

The XiVO package submission [was
documented](http://blog.xivo.io/index.php?post/2011/03/22/XiVO-sources-conventions-implemented-and-documented)
but the packaging-farm command line that is used to build the submitted
packages was not. An extensive manual page was written, focusing on the
developer and the packager point of view. It does not go into the
details of the packaging-farm implementation but should be enough for
most purposes.

~~~
packaging-farm(1)					     packaging-farm(1)



NAME
       packaging-farm - build package from sources for multiple distributions


SYNOPSIS
       packaging-farm SUBMIT=xivo [OPTIONS] submit

       packaging-farm SUBMIT=pokersource [OPTIONS] submit

       packaging-farm generate

       packaging-farm [OPTIONS] package_name


DESCRIPTION
       The  first  forms  packaging-farm SUBMIT=... submit creates job request
       for packaging-farm and stores it in /var/cache/packaging-farm/sources

       For instance

	      packaging-farm SUBMIT=xivo DIRECTORY=asterisk submit

       will    create	 a    source	package    in	 /var/cache/packaging-
       farm/sources/asterisk

       The   last   form   builds   the   package_name	package  as  found  in
       /var/cache/packaging-farm/sources   and	 stores    the	  result    in
       /var/lib/packaging-farm	as  repositories specific to each distribution
       that can be browsed at http://localhost/packaging-farm/

       For instance packaging-farm asterisk would  create  a  i386  repository
       that can be added to the /etc/apt/sources.list file as:

	      deb http://localhost/packaging-farm/asterisk/gnulinux/debian/i386/squeeze/src ./
	      deb-src http://localhost/packaging-farm/asterisk/gnulinux/debian/i386/squeeze/src ./

       The form before last

	      packaging-farm SUBMIT=xivo DIRECTORY=asterisk submit

       recomputes the dependency graph at /var/cache/packaging-farm/depends.mk
       by scanning /var/cache/packaging-farm/sources and creates  the  default
       Makefiles if needed in /var/cache/packaging-farm/build


BUILD FILES
       The  packaging  farm jobs are described in files found in the directory
       /var/cache/packaging-farm/build under a directory named after the pack-
       age.  It  contains a Makefile which instructs packaging-farm about what
       needs to be done. When a new source is submitted to the farm with pack-
       aging-farm  submit  a  default Makefile is created if it does not exist
       yet.

       For  example,  /var/cache/packaging-farm/build/asterisk/Makefile   con-
       tains:
	      PACKAGE=asterisk
	      LIBDIR ?= /usr/lib/packaging-farm
	      include /usr/lib/packaging-farm/Makefile

       The  following variables can be set in the Makefile. They are common to
       all packages.


       ROLE   the default value is package and it can be set  to  meta-package
	      (see  the META PACKAGES section for more information) or kernel-
	      module (see the KERNEL MODULE section for more information).


       PACKAGE
	      is the name of the meta package and it must match  the  name  of
	      the directory in which the Makefile is found.


       DISTRIBUTIONS
	      is  the  white space separated list of distributions for which a
	      package must be built.  The default value can be displayed  with
	      packaging-farm  --var  DISTRIBUTIONS  and  the list of supported
	      distributions can be displayed with  packaging-farm  --var  SUP-
	      PORTED_DISTRIBUTIONS


       ARCHITECTURES
	      is  the  white space separated list of architectures for which a
	      package must be built.  The default value can be displayed  with
	      packaging-farm  --var  ARCHITECTURES  and  the list of supported
	      architectures can be displayed with  packaging-farm  --var  SUP-
	      PORTED_ARCHITECTURES


META PACKAGES
       A  meta	package  is the aggregation of packages into a repository that
       has the same format as the official repositories. The definition of the
       meta package is found in the /var/cache/packaging-farm/build

       For  instance,  the  skaro  meta package can be defined by creating the
       /var/cache/packaging-farm/build/skaro/Makefile with the following  con-
       tent:

	      PACKAGE=skaro
	      DISTRIBUTIONS=squeeze
	      COMPONENT=main
	      ARCHITECTURES=i386 x86_64
	      CHILD_PACKAGES = asterisk dahdi-linux

	      ROLE = meta-package

	      LIBDIR ?= /usr/lib/packaging-farm
	      include ${LIBDIR}/Makefile

       and  the  resulting  repository	can  be added to /etc/apt/sources.list
       with:

	      deb http://localhost/packaging-farm/asterisk/gnulinux/debian skaro-squeeze main
	      deb-src http://localhost/packaging-farm/asterisk/gnulinux/debian skaro-squeeze main


       CHILD_PACKAGES
	      the white space separated list of packages to be aggregated into
	      the  meta-package.  The  list of known packages can be displayed
	      with packaging-farm --var PACKAGES


       COMPONENT
	      is the component, in the Debian GNU/Linux sense, provided by the
	      meta package. It must be a single string.


KERNEL MODULES
       Binary  kernel  modules	are  built  from kernel module source packages
       using module-assistant(1).

       For instance  /var/cache/packaging-farm/build/dahdi-linux-modules/Make-
       file contains:

	      ROLE=kernel-module
	      PACKAGE=dahdi-linux-modules
	      MODULE=dahdi-linux-source
	      DISTRIBUTIONS=squeeze
	      ARCHITECTURES=i386 x86_64
	      LIBDIR ?= /usr/lib/packaging-farm
	      include ${LIBDIR}/Makefile


       MODULE the  package that will be given to module-assistant(1) to create
	      binary kernel module packages.


DEPENDENCIES
       packaging-farm needs a dependency graph to  figure  out	which  package
       needs to be built in order for the others to succeed. This is done with

	      packaging-farm depends

       and  must  be  run manually when modifying a meta package (see the META
       PACKAGES section). It is run as part of

	      packaging-farm submit

       The dependency graph is output in  /var/cache/packaging-farm/depends.mk
       and  the  dependency  timestamps that remember what was built is in the
       directory  /var/cache/packaging-farm/depends  For   instance   a   file
       /var/cache/packaging-farm/depends/asterisk dated march 28th, 2011 means
       that asterisk was successfully built on that date.


DEBUGGING
       The output is extremely verbose. If the build of a package (say	aster-
       isk) fails for a given distribution (say squeeze) for a given architec-
       ture (say i386), it is archived at /var/cache/packaging-farm/build/ask-
       terisk/build/squeeze-i386.out

       When run from the command line, the output from 'BUILD START' to 'BUILD
       END' is displayed in case of a failure  and  the  relevant  message  is
       likely  to be in the last few lines. The error handling policy through-
       out packaging-farm is to abort as soon as a failure occurs.

       The chroot used to build the package can be entered for further	inves-
       tigation with the command:

	      packaging-farm --cd asterisk DISTRIBUTION=squeeze ARCHITECTURE=x86_64 chroot-login

       Note that the content of the chroot will be reset to a virgin installa-
       tion when the next build of the packag is run with

	      packaging-farm asterisk

       Note that the chroot must be exited before  running  a  new  build.  If
       still in the chroot, the build will fail.


USE CASE : IMPORT PACKAGE
       Paul  wants  to	build the package libpri found at http://dak.proforma-
       tique.com/debian

       He add the
	      deb-src http://dak.proformatique.com/debian squeeze-xivo-skaro-dev main
       line in /etc/apt/sources.list.

       He downloads it into the sources directory of packaging-farm:
	      apt-get update
	      mkdir /var/cache/packaging-farm/sources/libpri
	      cd /var/cache/packaging-farm/sources/libpri
	      apt-get source libpri
	      packaging-farm generate

       He builds the package for the default distributions and architectures:
	      packaging-farm libpri


SEE ALSO
       submit-xivo.sh(1)


AUTHORS
       Loic Dachary <loic@gnu.org>



				     local		     packaging-farm(1)
~~~


#### packaging-farm 1.2.35

A new release was
[published](http://packaging-farm.dachary.org/download) with the manual
page displayed above and the following bug fixes and improvements.The
BUILD START and BUILD END markers are added to the output so that it is
easier for the developer to figure out the relevant errors. It is also
used by the showerrors target. The showerrors target is run after
building a package so that the command line user does not need to dig in
the verbose output to find the source of the problem. The showerrors
target was added to display the build log of a given package for a given
architecture and a given distribution, if and only if it failed to
build. The ARCHITECTURES variable is exported so that packging-farm -
-var ARCHITECTURES can be used to display the default value.
submit-xivo.sh creates a new entry in the debian/changelog when
processing a package. If this entry is not committed because
GIT\_DRY\_RUN=true was set, it will prevent a git pull. The command git
reset --hard HEAD is run to get rid of such pending modifications. The
.orig.tar.gz created contained a spurious directory named after the
package : it was removed and its content moved back to the root. A third
party package is detected when a \*-VERSION file is found in the sources
directory instead of SOURCE- VERSION which is more restrictive

#### XiVO bug fixes and versions

While attempting to recompile the XiVO packages, the following bugs were
filled together with the patches fixing them.

-   [freeswitch patch : cdbs dependency + version insensitive
    package](https://projects.proformatique.com/issues/2125)
-   [dahdi-linux patch : version insensitive
    packaging](https://projects.proformatique.com/issues/2120)
-   [asterisk patch : misdn depencencies in
    skaro-squeeze](https://projects.proformatique.com/issues/2129)
-   [dahdi-tools patch : version insensitive
    packaging](https://projects.proformatique.com/issues/2121)

Discussing with Nicolas Hicher on irc.freenode.net\#xivo about these
patches led to a debate about the versions of the packages which was
brought to [the development mailing list]()The
[libpri](http://downloads.asterisk.org/pub/telephony/libpri/) library is
not yet available in the xivo skaro source repositories and it was
imported as described in the corresponding use case in the
packaging-farm manual page.

#### Architecture

A draft workflow description for packaging-farm was drawn. However, it
turns out to be at a level of detail that most packaging-farm users
would find useless. It would belong to an implementor guide.

~~~
============== net =============

       +---------------+        +-----------------+
       |  Debian GIT   |        |   Sources GIT   |
       +------+--------+        +--------+--------+
              |                          |
              v                          v            === /var/cache/packaging-farm ==
       +---------------+        +------------------+
       |  VCS/debian   |        |  VCS/sources     |
       +-------------+-+        +--+---------------+
                     |             |
                     v             v
                    +----------------+
                    ( submit-xivo.sh )
                    +--+-------------+
                       |            v
                       |           +------------------+
                       v           |  sources/skaro   +------>------->----------------+
                       |           +------------------+                               |
       +--------------------+                                                         |
       | sources/asterisk   +-------------------------------->------->----------------+
       +--------------------+                                                         |
                                                                                      |
       +--------------------+                           +-------------------------+   |
       | depends.mk         +-------------<-------------(  packaging-farm depends )-<-+
       +--+-----------------+                           +-------------------------+   |
          |                                                                           |
          |                                             +-------------------------+   |
          |              +---------------------------+--( packaging-farm generate )-<-+
          |              |                           |  +-------------------------+
          |              v                           v
          |              |                           |
          v     +--------+-----------+     +---------+---------+
          |     | build/asterisk     |     |  build/skaro      |
          |     +--------+-----------+     +-------+-----------+
          |              v                         v
          |              |                         |             +----------------------+
          +-------------->----------->-------------+-------------( packaging-farm skaro )
                                                                 +-+--------+-----------+
         === /var/cache/packaging-farm/build/{asterisk,skaro} ==   |        |
                                                                   |        |
         +---------------------------------------+        +--------v--------v-----------+
         |    build/debian/i386/squeeze          <--------( packaging-farm chroot-login )
         +---------------------------------------+        +-----------------------------+
         +---------------------------------------+        +-----------------------------+
         | build/debian/i386/squeeze/usr/src     <--------( packaging-farm all          )
         +---------------------------------------+        +-----------------------------+
                                                               |        |
         === /var/cache/packaging-farm/build/asterisk ==       |        |
           etc...                                              |        |
         ===== /var/lib/packaging-farm =================       |        |
                                                               v        v
          +------------------+                                 |        |
          |  asterisk        +------------------<--------------+        |
          +------------------+                                          |
          +------------------+                                          |
          |  skaro           +------------------<-----------------------+
          +------------------+


         ===== target system ===========================

         deb http://xivo.dachary.org/packaging-farm/skaro/gnulinux/debian skaro-squeeze main
         deb-src http://xivo.dachary.org/packaging-farm/skaro/gnulinux/debian skaro-squeeze main
~~~


</p>

