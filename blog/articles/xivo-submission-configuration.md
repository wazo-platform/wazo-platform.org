Title: XiVO submission configuration
Date: 2011-09-12 08:12
Author: dachary
Category: XiVO IPBX
Tags: packages
Slug: xivo-submission-configuration
Status: published

#### clearing the generated sources

When some environment variables used by submit-xivo.sh change value, the
whole source directory [must be
regenerated](http://packaging-farm.dachary.org/trac/ticket/21). For
instance, the VERSION\_FLAVOR variable change the name of each source
package. If the maintainer forgets to remove
/var/cache/packaging-farm/sources, a mix of packages using different
naming conventions is used and creates a very confusing situation.

Although it would be possible and safe to wipe out the cache (i.e.
/var/cache/packaging-farm/sources) each time the environment changes,
that would be overkill. For instance if setting VERBOSE=true has this
effect, it would be inconvenient. Instead, a set of [variables is chosen
and their content written into a file after each
run](http://packaging-farm.dachary.org/trac/changeset/5a601108bb90a2bbf2dfbdd2a330700d980c2e23)
of submit-xivo.sh. When submit-xivo.sh is run, the content of the file
from the previous run is matched against the values of the variables in
the environment. If it turns out that they are not the same, the
directory /var/cache/packaging-farm/sources is removed and will be fully
repopuplated.

#### example file

Although each environment variable for the submit-xivo.sh script is
documented in the submit-xivo.sh manual page, it is much more convenient
to change values from a commented configuration file that shows all the
expected default values. The **/etc/packaging-farm/submit-xivo.conf**
file was created for this purpose.

~~~
#
# The submit-xivo.sh(1) configuration file. 
# In the following each line starting with #export shows the default
# value of the corresponding environment variable. For instance
# export XIVO=skaro shows that the default value of the "XIVO" variable
# is the string "skaro". 
# The line can be uncommented and the value changed. The change will take
# effect which the next packaging-farm(1) command is run.
#
########################################################################
#
# The name of the skaro distribution. Can be one of skaro, gallifrey.
#
#export XIVO=skaro
#
########################################################################
#
# A Debian GNU/Linux suite. Can be one of squeeze, lenny.
#
#export SUITE=squeeze
#
########################################################################
#
# The directory in which the source and debian repositories will be
# cloned.
#
#export VCS_DIR=/var/cache/packaging-farm/VCS
#
########################################################################
#
# The directory in which the resulting source packages will be stored.
#
# PACKAGES_DIR=/var/cache/packaging-farm/sources
#
########################################################################
#
# The content of this variable is appended to the value found in the
# VERSION file and may be used to distinguish from a development
# version and a production version for instance.  VERSION_FLAVOR=-dev
#
#export VERSION_FLAVOR=
#
########################################################################
#
# By default each source version number is created by computing the
# current time and extracting the last commit hash from the source
# repository (see the VERSION section above.  If VERSION_COMPUTE is
# set to false then the current time and last commit hash are not used
# when generating the version number.
#
#export VERSION_COMPUTE=true
#
########################################################################
#
# The gitrevision(7) from which both source and debian git will be
# checked out. If the GIT_REVISION designates a branch, the latest
# changes will be pulled from it.  If  GIT_REVISION  designates  a
# tag, it will be checked out.
#
#export GIT_REVISION=master
#
########################################################################
#
# The SOURCE_GIT and DEBIAN_GIT repositories will be pulled only if
# the last pull occured more than GIT_CACHE_MINUTES minutes ago.  By
# default it is pull every time (i.e. if the last pull occured more
# than zero minutes ago). It can be used to reduce the number of pull
# occuring when running many submit-xivo in sequence.
#
#export GIT_CACHE_MINUTES=0
#
########################################################################
#
# The directory containing the source code repositories for each XiVO
# suite.
#
#export SOURCE_GIT=git://git.proformatique.com/official
#
########################################################################
#
# the directory name within the SOURCE_GIT repository where the
# sources can be found.  The package name will be infered from the
# content of the Makefile.pkg file within this directory. For instance
# DIRECTORY=web-interface submit-xivo.sh will submit the package
# pf-xivo-web-interface
#
#export DIRECTORY=
#
########################################################################
#
# The directory containing the Debian GNU/Linux repositories for each
# XiVO suite.
#
#export DEBIAN_GIT=git://git.proformatique.com/official
#
########################################################################
#
# the directory name within the DEBIAN_GIT repository where the
# package can be found.  The submit-xivo.sh command will not attempt
# to locate a source in the SOURCE_GIT repository. It will submit a
# package that has the same name as the content of the NOSOURCE=
# variable. For instance NOSOURCE=pf-xivo will submit the pf-xivo
# package. The version number of the package is either the one found
# in the debian/changelog, if it contains the con- tent of the VERSION
# file found in the SOURCE_GIT repository. For instance if the first
# line of the debian/changelog contains 8:1.1.16~5 and the VERSION
# file contains 1.1.16 it won't be mod- ified. However, if VERSION
# contains 1.1.17 a debian/changelog line will be added, preserving
# the epoch and will contain 8:1.1.17.
#
#export NOSOURCE=
#
########################################################################
#
# If set to true, no changes will be committed to the Debian GNU/Linux
# repository if a debian/changelog entry is added.
#
#export GIT_DRY_RUN=false
#
########################################################################
#
# The mail used when generating a debian/changelog entry.
#
#export DEBEMAIL=technique@proformatique.com
#
########################################################################
#
# The user name used when generating a debian/changelog entry.
#
#export DEBFULLNAME="Proformatique Maintainance Team"
#
########################################################################
#
# Before the debian directory is assembled with the source directory,
# a copy is made using rsync(1).  The content of the RSYNC_OPTIONS
# variable is given in argument to the rsync command. For instance it
# may be used to collect the actual content of symbolic links pointing
# outside of the source directory.
#
# for dir in app_nv_faxdetect app_fax ami_aoriginate module_xivo res_config_sqlite ;
#  do RSYNC_OPTIONS=--copy-unsafe-links packaging-farm DIRECTORY=$dir submit ;
# done
#
#export RSYNC_OPTIONS=
~~~


The inclusion of the configuration file is documented in the
submit-xivo.sh manual page:

~~~
When this script is called as a side effect of packaging-farm(1) it can
       be   configured   system  wide  using  the  /etc/packaging-farm/submit-
       xivo.conf example configuration file, which can then be included in the
       global packaging-farm.conf(5) file located in /etc/packaging-farm/pack-
       aging-farm.conf For instance, the line

              export VERSION_COMPUTE=false

       can be added to override the default.
~~~


</p>

