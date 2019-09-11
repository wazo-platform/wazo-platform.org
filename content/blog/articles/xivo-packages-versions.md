Title: XiVO packages versions
Date: 2011-05-02 14:41
Author: dachary
Category: XiVO IPBX
Tags: packages
Slug: xivo-packages-versions
Status: published

#### package names and multiple distributions

As it is, packaging-farm will create packages with names that are not
dependent on the distribution. It creates a problem that is immediately
visible when trying to build a repository that includes all the
packages: the pool can only accommodate for a single package with a given
name.When building packages for multiple distributions, packaging-farm
should rename the packages built so that they carry the distribution
name. The names must compare in the same order as the distribution
chronology. For instance, *foo-1.2-1* would be renamed into
*foo-1.2-1\~3wheezy*. Such a behavior is intrusive and may not be
appropriate if building for a single distribution. The proposed names
are as follow, for each of the supported distributions, following the
[Debian GNU/Linux
backport](http://backports.debian.org/Contribute/#index5h3) naming
scheme, with the distribution name added for clarity:

~~~
* <a href="https://wiki.ubuntu.com/Releases">Ubuntu</a>
** natty = ~bpo1104natty+1
** maverick = ~bpo1010maverick+1
** lucid = ~bpo1004lucid+1
** etc.
* <a href="http://wiki.debian.org/DebianReleases">Debian GNU/Linux</a>
** wheezy = ~bpo70wheezy+1
** squeeze = ~bpo60squeeze+1
** lenny = ~bpo50lenny+1
** etch = ~bpo40etch+1
** etc.
~~~


For the record, here is the chat log that led to the proposal above.

~~~
(10:29:46 AM) loicd: Hi, I'm facing a problem organizing repositories made with reprepro. A package (the name is xivo) is fit to build for Debian wheezy, unstable & Ubunty maverick and naty, for i386 & amd64, without requiring any change. Because reprepro uses a pool to store the packages, these four packages (for wheezy, unstable, maverick & naty) cannot coexist with the exact same name. I could either a) change the package name by adding the target distribution although these packages are strictly identical, b) make a separate repository for each distribution (which still is useful to aggregate the various architectures). Do you have any advice ?
(10:30:43 AM) twb: FWIW I just use apt-ftparchive
(10:31:44 AM) twb: http://paste.debian.net/115729/
(10:31:49 AM) twb: Not very nice, but it does the job
(10:32:51 AM) loicd: twb: you mean that it is imune to this kind of trouble (the pool) ? (10:34:57 AM) twb: Basically each dir is an apt repo
(10:35:26 AM) twb: So instead of dists/ and pool/x/xivo, you'd just have xivo/ as a repo, and you can point whatever distros you want at it
(10:41:02 AM) loicd: twb: it looks like what I'm after. One drawback of having the same package name for two distro is upgrade. The following use case is broken : a) install wheezy + xivo, b) upgrade to unstable => xivo does not get upgraded. Although the source packages are the same, the resulting .deb are different because the context is different. The ideal situation would be to be able to create .deb with a name that contains the distro in such a way that it upgrades.
(10:41:54 AM) ***OdyX does -1 upload to Debian, then -1~n0 to natty, -1~m0 to maverick -1~l0 to lucid.
(10:44:39 AM) loicd: OdyX: smart :-)
(10:45:24 AM) OdyX: loicd: more or less ~. It means you have to rebuild+upload each time (only source if you upload to PPAs)
(10:46:55 AM) loicd: twb: I actually have the same problem with squeeze + wheezy. 
(10:47:09 AM) twb: loicd: squeeze is BPO's problem, not yours :P
(10:47:20 AM) loicd: -1~s0 = squeeze, -1~w0 
(10:47:24 AM) loicd: that works too
(11:10:37 AM) loicd: twb: actually, it is. The vendor of the software needs to provide squeeze backports to its clients. This happens usually in a rush and before it becomes available to bpo. It actually is a concern shared by most software vendors : the delays between meeting the client request and meeting the debian requirements do not always match.
(11:41:55 AM) loicd: I think I will go for names that use the version number to ensure it compares as expected foo-1.2-1 => foo-1.2-1~7.0wheezy ( wheezy = ~7.0wheezy, squeeze = ~6.0squeeze, lenny = ~5.0lenny etc.). What do you think ? 
(11:42:31 AM) daemonkeeper: why use the codename at all then?
(11:43:45 AM) twb: If the backport doesn't involve a source package change, I don't really see why it's necessary to fuck about at all
(11:45:14 AM) pabs: loicd: don't you want dch --bpo?
(11:45:53 AM) loicd: daemonkeeper: for readability. I agree it's redundant.
(11:46:06 AM) loicd: but it will help the customer support, I suppose
(11:48:37 AM) loicd: twb: because the dependencies change and the binary packages being built are actually different. I agree that it would be completly pointless if they were python sources for instance. But in the case of compiled binaries, if the distribution is being upgraded the binary package must also be upgraded. If it had the same name it would not upgrade and be broken.
(11:49:05 AM) twb: loicd: ah right
(12:07:54 PM) loicd: pabs: thanks for pointing out bpo. I will follow the bpo naming scheme so that it's compatible with bpo. And it's a lot better to adopt an existing convention ;-) http://backports.debian.org/Contribute/#index5h3 :-)
~~~


#### natty support and documentation

Support for [natty](https://wiki.ubuntu.com/NattyNarwhal) was added by
creating a virtual machine using [the server
distribution](http://mirrors.ircam.fr/pub/ubuntu/releases//natty/ubuntu-11.04-server-amd64.iso)
and creating i386 and x86\_64 chroots with:

~~~
pbuilder --create --architecture i386 --basetgz /var/cache/pbuilder/natty-i386.tgz
pbuilder --create --architecture amd64 --basetgz /var/cache/pbuilder/natty-amd64.tgz
~~~


and untaring them into the packaging-farm [rsync
repository](http://packaging-farm.dachary.org/chroot/) for
[i386](http://packaging-farm.dachary.org/chroot/debian/i386/natty/) and
[x86\_64](http://packaging-farm.dachary.org/chroot/debian/x86_64/natty/).The
content of the *packaging-farm.conf* was documented as a manual page:

~~~
NAME
       packaging-farm.conf - define the default environment to build a package


DESCRIPTION
       The  packaging-farm command uses makefiles to run. Each package defines
       variables to influence the way it is built, as described in the packag-
       ing-farm(1)  manual  page.  The	packaging-farm.conf  file  is included
       before the package specific makefile and can be used  to  define  vari-
       ables common to all packages. The packaging-farm.conf is a makefile and
       its syntax depends on GNU make

       There are no default values. If a variable is commented out, it will be
       set to a value that triggers an error.  The default packaging-farm.conf
       file distributed contains sensible defaults, there is no fallback.   If
       they are removed, it is presumably because of a typo or an error and it
       needs to trigger an error instead of silently falling back on an  unex-
       pected default.


VARIABLES
       For  each variable listed below, the values that can be used are listed
       in the comments of the  distributed  packaging-farm.conf  file.	It  is
       important  to  check that a variable does not contain a trailing space.
       Otherwise it will be used and lead to unexpected results.


       DISTRIBUTIONS
	      is the white space separated list of distributions for  which  a
	      package must be built.


       ARCHITECTURES
	      is  the  white space separated list of architectures for which a
	      package must be built.  For each DISTRIBUTION, the package  will
	      be  built  for  all ARCHITECTURES. For instance if DISTRIBUTIONS
	      contains squeeze and maverick and  ARCHITECTURES	contains  i386
	      and   x86_64,  the  package  will  be  built  for  squeeze+i386,
	      squeeze+x86_64, maverick+i386 and maverick+x86_64.  There is  no
	      way  to  ask that only i386 is built for squeeze and only x86_64
	      is built for maverick.


       PACKAGES
	      The list of the packages for which dependencies must  be	calcu-
	      lated with

	      packaging-farm depends

	      so  that	package1  is  always built before package2 if package2
	      depends on package1. It is recommended to not manually set  this
	      variable.   Instead,  the  ${CACHEDIR}/build  (which  is usually
	      /var/cache/packaging-farm/build ) should only  contain  directo-
	      ries  matching  the  names  of  the packages to work on. And the
	      variable can be set with:

	      PACKAGES=$(shell ls ${CACHEDIR}/build)


       AUFS   The AUFS File System (http://aufs.sourceforge.net/) is  used  by
	      the  packaging  farm  to	create a local copy of a chroot with a
	      minimum overhead. If not available (value set  to  no)  a  rsync
	      based  copy  will  be  used  instead.  This uses a lot more disk
	      space.  On  Debian  GNU/Linux,  aufs  is	usually  available  by
	      default and can be loaded with modprobe aufs


       CHROOT_WANTED
	      The  list  of  chroot  that must be loaded in order to build the
	      packages.   They	 are   retrieved    from    rsync://packaging-
	      farm.dachary.org/packaging-farm via the command:

	      packaging-farm chroot-master-sync

	      For instance

	      CHROOT_WANTED=debian/i386/squeeze debian/x86_64/squeeze

	      will retrieve squeeze for the i386 and x86_64 architectures. The
	      chroot repository can be browsed via the web  at	http://packag-
	      ing-farm.dachary.org/chroot/.   The  available chroot must cover
	      all combinations of the DISTRIBUTIONS  and  ARCHITECTURES  vari-
	      ables,  both in the packaging-farm.conf file and in the invivid-
	      ual makefiles of each package. For  instance,  if  a  packaging-
	      farm.conf  has DISTRIBUTIONS=squeeze ARCHITECTURES=i386 only but
	      a package overrides this	with  DISTRIBUTIONS=wheezy  packaging-
	      farm will need debian/i386/wheezy to build it.  If the distribu-
	      tion is omitted, all chroot for a  given	architecture  will  be
	      retrieved.

	      packaging-farm CHROOT_WANTED=debian/i386 chroot-master-sync

	      A  cron  job will synchronize on a daily basis. There is no need
	      to manually run the synchronization, unless a specific update is
	      needed immediately.  After being copied, the chroot will get the
	      /etc/resolv.conf file from the host.


       CHROOT_ROOT
	      Directory in which copies of the CHROOT_WANTED are kept.	As  of
	      May, 2011, if CHROOT_WANTED=debian it will use 5GB.


       SUBMIT The suffix of the submit script that will be used when running:

	      packaging-farm submit

	      The  action  is  carried out by as script named after this vari-
	      able.

	      /var/lib/packaging-farm/submit/submit-${SUBMIT}.sh


TROUBLESHOOTING
       check for trailing spaces in variable values
	      DISTRIBUTIONS=A B with a trailing space is different  from  DIS-
	      TRIBUTIONS=A  B  withing a trailing space and will lead to unex-
	      pected behavior.


SEE ALSO
       submit-xivo.sh(1), packaging-farm(1)


AUTHORS
       Loic Dachary <loic@dachary.org>



				     local		packaging-farm.conf(5)
~~~


The default *packaging-farm.conf* file was self documented and set with
defaultvalues so that the user only need to copy/paste from it without a
need to actuallyunderstand the details.

~~~
########################################################################
#
# White space separated list of the distributions for which the packages
# must be built.
# There must be NO SPACE at the end of the line
#
# DISTRIBUTIONS=lenny squeeze wheezy unstable maverick natty
#
DISTRIBUTIONS=unstable
#
########################################################################
#
# White space separated list of the distributions for which the packages
# must be built. 
# There must be NO SPACE at the end of the line
#
# ARCHITECTURES=i386 x86_64
# 
ARCHITECTURES=x86_64
#
########################################################################
#
# The list of the packages for which dependencies must be calculated
# with
#
# packaging-farm depends
#
# so that package1 is always built before package2 if package2 depends
# on package1. It is recommended to not manually set this variable.
# Instead, the ${CACHEDIR}/build (which is usually 
# /var/cache/packaging-farm/build ) should only contain directories
# matching the names of the packages to work on.
# There must be NO SPACE at the end of the line
#
# PACKAGES=package1 package2
#
PACKAGES=$(shell ls ${CACHEDIR}/build)
#
########################################################################
#
# The AUFS File System (http://aufs.sourceforge.net/) is used by the
# packaging farm to create a local copy of a chroot with a minimum
# overhead. If not available (value set to no) a rsync based copy will
# be used instead. This uses a lot more disk space.
# On Debian GNU/Linux, aufs is usually available by default and
# can be loaded with modprobe aufs
#
#AUFS=yes
AUFS=no
#
########################################################################
#
# The list of chroot that must be loaded in order to build the
# packages. They are retrieved from rsync://packaging-farm.dachary.org/packaging-farm
# For instance:
# CHROOT_WANTED=debian/i386/squeeze debian/x86_64/squeeze 
# will retrieve squeeze for the i386 and x86_64 architectures.
#
# The values are:
#
# debian/i386/lenny
# debian/i386/maverick
# debian/i386/natty
# debian/i386/squeeze
# debian/i386/unstable
# debian/i386/wheezy
# debian/x86_64/lenny
# debian/x86_64/maverick
# debian/x86_64/natty
# debian/x86_64/squeeze
# debian/x86_64/unstable
# debian/x86_64/wheezy
#
# There must be NO SPACE at the end of the line
#
# Retreive all of debian
# CHROOT_WANTED=debian
# Retreive all of i386 debian
# CHROOT_WANTED=debian/i386
# Retreive all of x86_64 debian
# CHROOT_WANTED=debian/x86_64
#
CHROOT_WANTED=debian/x86_64/unstable
#
########################################################################
#
# Directory in which copies of the CHROOT_WANTED 
# are kept.
#
CHROOT_ROOT=/chroot
#
########################################################################
#
# The suffix of the submit script that will be used
# when running:
#
# packaging-farm submit
#
######
# Read man submit-xivo.sh(1) for more information
# SUBMIT=xivo
#####
# Not yet documented.
# SUBMIT=pokersource
#
SUBMIT=none
#
########################################################################
#
# If set, the debsign(1) command will be called to
# sign the package, if it is built successfully.
#
# debsign ${SIGN_debian} *.changes
#
# It should specify the key with which the package should be
# signed. The meta-packages will use SIGN_WITH to sign
# the packages.
#
#SIGN_debian=-kABCDEFGH
SIGN_debian=
#
########################################################################
#
# Sign the packages of the repository created for a meta-package
# See reprepro(1) for more information.
#
#SIGN_WITH=SignWith: yes
SIGN_WITH=
#
~~~


</p>

