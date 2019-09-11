Title: XiVO packages with no sources
Date: 2011-07-10 08:54
Author: dachary
Category: XiVO IPBX
Tags: packages
Slug: xivo-packages-with-no-sources
Status: published

#### XiVO packages with no source

The submit-xivo.sh command that is part of packaging-farm was improved
to support the packages that have no source files such as pf-xivo and
pf-xivo-backup.The changes were published as part of the
[2.0.6](http://packaging-farm.dachary.org/download/) release of
packaging-farm.The relevant part of the documentation (man
submit-xivo.sh) explain how to use it:

~~~
NAME
       submit-xivo.sh - create a source package from XiVO repositories


SYNOPSIS
       [DIRECTORY=] submit-xivo.sh

       [NOSOURCE=] submit-xivo.sh

...
NOSOURCE=
       Some packages, such as pf-xivo or pf-xivo-backup do not have  a  corre-
       sponding  source.   They  only  exist as a debian package with no file.
       submit-xivo.sh(1) supports this special case with the NOSOURCE environ-
       ment  variable.  If  it is set and no DIRECTORY environment variable is
       set, it will submit a native debian package from the DEBIAN_GIT  direc-
       tory  matching  the  content  of the NOSOURCE environment variable. For
       instance:

              NOSOURCE=pf-xivo submit-xivo.sh
...
       NOSOURCE=
              the  directory  name  within the DEBIAN_GIT repository where the
              package can be  found.   The  submit-xivo.sh  command  will  not
              attempt to locate a source in the SOURCE_GIT repository. It will
              submit a package that has the same name as the  content  of  the
              NOSOURCE=  variable.  For  instance NOSOURCE=pf-xivo will submit
              the pf-xivo package. The version number of the package is either
              the  one  found in the debian/changelog, if it contains the con-
              tent of the VERSION file found in the SOURCE_GIT repository. For
              instance  if  the  first  line  of the debian/changelog contains
              8:1.1.16~5 and the VERSION file contains 1.1.16 it won't be mod-
              ified.  However,  if  VERSION contains 1.1.17 a debian/changelog
              line will be  added,  preserving  the  epoch  and  will  contain
              8:1.1.17.
~~~


The **/var/cache/packaging-farm/build/gallifrey/Makefile** and
**/var/cache/packaging-farm/build/skaro/Makefile** were updated to take
advantage of this new feature as follows:

~~~
#                                                                                                                                                                     
        # Submitted from the GIT debian repositories                                                                                                                          
        #                                                                                                                                                                     
        cd .. ; for package in pf-xivo pf-xivo-backup ; do packaging-farm NOSOURCE=$$dir submit ; done
~~~


#### bash -e behavior

The -e bash option is expected to end the script being run as soon as an
error occurs. This is a convenient way to throw an exception from a
nested function being run, should an irrecoverable error occur. However,
the following code demonstrate that the -e option is sometime disabled:

~~~
set -ex

  PS4=' ${FUNCNAME[0]}: $LINENO: '

  function f() {
      set -e
      false
      echo $@
  }

  ! f why does it display ? It should stop because of -e
  f
~~~


The -e behavior is [notoriously
tricky](http://mywiki.wooledge.org/BashFAQ/105) and packaging-farm was
written to use it only when it has a is predictable. A question was
[posted on
stackoverflow](http://stackoverflow.com/questions/6640120/why-is-bash-e-disabled-within-a-function-run-with-not)
to explain this specific case. The same question asked on
irc.freenode.net\#bash did not bring any answer.

#### skaro and gallifrey build

Guillaume asked for a shortcut to rebuild the full distribution after
updating a given package for skaro. Instead of running:

~~~
packaging-farm DIRECTORY=confgen submit
packaging-farm ARCHITECTURES=i386 pf-xivo-confgen
packaging-farm skaro
~~~


the following rule was added to
**/var/cache/packaging-farm/build/skaro/Makefile**

~~~
rebuild: update	
        cd .. ;	packaging-farm skaro
~~~


so that it is possible to run

~~~
packaging-farm --cd skaro rebuild
~~~


to achieve the same result. There is some additional overhead because
all newer packages will be rebuilt, not just the one of interest. That
is, if someone updated asterisk since the last rebuild of skaro, it will
also be rebuilt. It is believed that such a case is rare enough and does
not warrant a special case. If it turns out to be wrong, an other, more
specialized, shortcut can be added.

#### rebuilding packages and publishing repositories

~~~
packaging-farm  allows  to  rebuild  the same version of a package. For
       instance, let say foo-1.2 was built and was made available,  either  as
       part  of  the package specific repository created with dpkg-scanpackage
       or as part of a meta package repository created with reprepro(1) A user
       then installs the package using

              apt-get update
              apt-get install foo

       At  this  point  in  time,  the  developer  of foo find a minor bug and
       rebuilds the package on packaging-farm  without  changing  the  version
       number.   packaging-farm  allows  the developer to do that, in the same
       way pbuilder or sbuild does. But that has an important consequence  for
       the  user  who installed the foo package. There now is a new version of
       the foo package that has exactly the same version as the  previous  one
       but  is  not really the same.  The user needs to re-install the package
       by explicitly asking for it as follows:

              apt-get update
              apt-get install --reinstall foo

       Such a behavior is extremely confusing for the casual user. This is why
       it  is  not recommended to advertise the packaging-farm repositories to
       the general public. The recommended method is to create a reprepro mir-
       ror  that  contains  a copy of the packaging-farm repository at a point
       where all package versions have been updated to reflect the  change  of
       the  packages.   The reprepro safeguard ( error : is already registered
       with different checksums! ) provides a simple way to  ensure  that  the
       repository  targeted for the public never publishes the same version of
       the package with different content twice.
~~~


</p>

