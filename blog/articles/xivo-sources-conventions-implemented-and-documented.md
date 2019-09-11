Title: XiVO sources conventions implemented and documented
Date: 2011-03-21 23:49
Author: dachary
Category: XiVO IPBX
Slug: xivo-sources-conventions-implemented-and-documented
Status: published

The [debian GNU/Linux packages repository](http://git.xivo.io/debian)
was made public a few days ago. The
[pf-release.sh](http://xivo.dachary.org/pf-release.sh) shell script
based on the internal SVN repository has been updated to use the public
GIT repository instead.

In order to make it more convenient for the developer to submit a job to
[packaging-farm](http://packaging-farm.dachary.org/) the workflow was
modified. It previously provided a single submission script that was
independent from the building of the package. A new target, `submit` has
been introduced together with a global SUBMIT configuration variable. If
SUBMIT=xivo, the submit target will call the
/usr/lib/packaging-farm/submit/submit-xivo.sh script and expect it to do
something useful based on the environment variables it finds.

During the installation of the Debian GNU/Linux packaging-farm-client
package, the former rsync limit and origin of the chroot used to build
the packages were deprecated in favor of the value of the SUBMIT
configuration variable. It has two choices : the existing
[pokersource](http://pokersource.info/) convention and the XiVO
convention.

A [new release (1.2.34)]() of packaging-farm has been published with
this integration.

~~~
submit-xivo(1)							submit-xivo(1)

NAME
       submit-xivo.sh - create a source package from XiVO repositories

SYNOPSIS
       [DIRECTORY=] submit-xivo.sh

       [VERBOSE=false] [GIT_DRY_RUN=false] \
	 [VCS_DIR=/var/cache/packaging-farm/VCS] \
	 [PACKAGES_DIR=/var/cache/packaging-farm/sources] \
	 [XIVO=skaro] \
	 [SUITE=squeeze] \
	 [SOURCE_GIT=git://git.xivo.io] \
	 [DEBIAN_GIT=git://git.xivo.io/debian] \
	 [DEBEMAIL=technique@proformatique.com] \
	 [DEBFULLNAME="Proformatique Maintainance Team"] \
	 [DIRECTORY=] \
	 submit-xivo.sh [TEST]

DESCRIPTION
       When  run  as DIRECTORY=asterisk submit.xivo.sh will merge the asterisk
       sources with the corresponding Debian  GNU/Linux  package  instructions
       and build a source package.


       step 1 - update the git repositories
	      the  SOURCE_GIT  and  DEBIAN_GIT	repositories are pulled in the
	      VCS_DIR directory.

       step 2 - merge sources and Debian GNU/Linux package
	      the source  and  Debian  package	information  are  copied  from
	      VCS_DIR and merged into PACKAGES_DIR

       step 3 - build source package
	      without  any attempt at resolving dependencies, a source package
	      is built using dpkg-buildpackage

	      When invoked without the	DIRECTORY  environment	variable  set,
	      submit-xivo.sh will display a usage and sample commands that can
	      be copy/pasted to the command line.  It is designed as a	helper
	      to the packaging-farm(1) command the sample commands make use of
	      it.

DEFINITIONS
       SUITE  is the name of a Debian GNU/Linux distribution, such as  squeeze
	      or lenny.


       XIVO   is the name of a XiVO release such as skaro or gallifrey.


       component
	      is  the name of a repository containing a set of packages, as in
	      the reprepro(1) configuration files. A component is of the  form
	      SUITE-xivo-XIVO  For instance, lenny-xivo-dalek, lenny-xivo-gal-
	      lifrey and  squeeze-xivo-skaro.

VERSIONS
       The XiVO source	packages  have	no  version  information.  The	Debian
       GNU/Linux  package  version  numbers are generated based on the date of
       the last commit and its short hash.  YYYYMMDD.HHMMSS.HASH will  be  the
       version	number	of  a package where the last commit in the sources was
       made on YYYYMMDD.HHMMSS. This last commit hash is appended to the  ver-
       sion number.  Example: asterisk-20110312.102015.8ff428-1

       When  merging  a source with its matching Debian GNU/Linux package, the
       first line of the debian/changelog file must contain the computed  ver-
       sion  number.  If  it  does not, a new changelog entry is used with the
       following template:
	      echo "$package (${version}${debian_version}) $component; urgency=low"
	      echo
	      echo "  * upstream update"
	      echo
	      echo -n " -- $DEBFULLNAME <$DEBEMAIL>  "
	      date '+%a, %d %b %Y %R:%S %z'
	      echo

TARBALL CONSISTENCY
       If a source tarball already exists for a given version, it will be left
       untouched.   Although  the  contents would be the same if re-generated,
       the checksum will be different when it is  compressed.  Such  a	change
       introduce  an unnecessary and confusing variance when issuing more than
       one Debian GNU/Linux package for a given source.

NAMESPACES
       git://git.xivo.io source tree
	      contains one repository for each component
	      http://git.xivo.io/xivo-dalek.git
	      http://git.xivo.io/xivo-gallifrey.git
	      http://git.xivo.io/xivo-skaro.git Within	each  repository,  the
	      directories  containing a Makefile.pkg file contain sources that
	      are candidates for packaging.


       git://git.xivo.io/debian package tree
	      contains one repository for each component
	      http://git.xivo.io/debian/lenny-xivo-dalek.git
	      http://git.xivo.io/debian/lenny-xivo-gallifrey.git
	      http://git.xivo.io/debian/squeeze-xivo-skaro.git	 Within   each
	      repository, each directory contains a trunk/debian sub-directory
	      matching the corresponding DEB_PKG in the source directory.


       VCS_DIR tree
	      contains a debian sub-directory where  all  debian  repositories
	      are  cloned and a sources sub-directory where all source reposi-
	      tories are cloned


       PACKAGES_DIR tree
	      for each package found  in  the  VCS_DIR/debian  subdirectories,
	      there  exists a corresponding directory in PACKAGES_DIR with the
	      dsc of the package and a subdirectory with the same name as  the
	      package containing the actual sources.

ENVIRONMENT
       Each  environment  variable  is shown with its default value. It can be
       overriden if set before the  submit-xivo.sh  is	called.  For  instance
       PACKAGES_DIR=/tmp DIRECTORY=asterisk


       XIVO=skaro
	      The  name  of  the skaro distribution. Can be one of skaro, gal-
	      lifrey.


       SUITE=squeeze
	      A Debian GNU/Linux suite. Can be one of squeeze, lenny.


       VCS_DIR=/var/cache/packaging-farm/VCS
	      The directory in which the source and debian  repositories  will
	      be cloned.


       PACKAGES_DIR=/var/cache/packaging-farm/sources
	      The  directory  in  which  the resulting source packages will be
	      stored.


       SOURCE_GIT=git://git.xivo.io
	      The directory containing the source code repositories  for  each
	      XiVO suite.


       DEBIAN_GIT=git://git.xivo.io/debian
	      The  directory  containing the Debian GNU/Linux repositories for
	      each XiVO suite.


       GIT_DRY_RUN=false
	      If set to true, no changes  will	be  committed  to  the	Debian
	      GNU/Linux repository if a debian/changelog entry is added.


       DEBEMAIL=technique@proformatique.com
	      The mail used when generating a debian/changelog entry.


       DEBFULLNAME="Proformatique Maintainance Team"
	      The user name used when generating a debian/changelog entry.

TESTING
       When  run  as  VERBOSE=true submit-xivo.sh TEST a test suite embeded in
       the shell script is run. It uses files created in /tmp exclusively  and
       will not modify anything outside it. All features and bug fixes have an
       associated test case.

AUTHORS
       Loic Dachary <loic@dachary.org>
~~~


</p>

