Title: XiVO GIT repository re-organisation
Date: 2011-10-17 12:22
Author: dachary
Category: XiVO IPBX
Tags: packages
Slug: xivo-git-repository-re-organisation
Status: published

#### GIT\_DIRECTORY specify the repository to use

~~~
GIT_DIRECTORY=xivo-${XIVO}
              The subdirectory relative to SOURCE_GIT in which the  repository
              is to be found.  The actual clone is composed as follows:

              git clone ${SOURCE_GIT}/${GIT_DIRECTORY}.git

              as of October 2011, there is a single repository named after the
              XIVO variable, hence the default  xivo-${XIVO}  value.  It  will
              progressively be replaced by individual repositories that can be
              used as follows:

              packaging-farm DIRECTORY=pf-xivo-confgen GIT_DIRECTORY=xivo-confgen submit

              so that it uses:

              http://git.proformatique.com/?p=official/xivo-confgen.git

              instead of

              http://git.proformatique.com/?p=official/xivo-skaro.git
~~~


[GIT\_DIRECTORY](http://packaging-farm.dachary.org/trac/changeset/d36f2baef2c601660d3efdef5c3734facef884ff)
specify the repository to use in submit-xivo.sh. Although it is only
applied to the source git directory, the name of the variable does not
contain the word SOURCE. This is in anticipation to the fact that the
debian and source repositories will eventually be merged. Even if this
does not happen, the structure of both repositories is planned to be the
same in the transition phase and the need to distinguish a directory
name that would be different is unlikely.

#### fail to detect package build failure

asterisk-addons [failed to build but packaging-farm thinks it
succeeded](http://packaging-farm.dachary.org/trac/ticket/27). As a
consequence the meta package that depends on it fails and it is not
obvious to track the error back to asterisk-addons. Here is the output
of the build of asterisk-addons:

~~~
...
/usr/share/cdbs/1/rules/buildcore.mk:72: parsing asterisk-addons_1.4.13.orig.tar.gz ...
grep: debian/control.in: No such file or directory
egrep: debian/control.in: No such file or directory
/bin/sh: line 0: cd: build-tree/asterisk-addons-1.4.13: No such file or directory
/bin/sh: line 1: debian/control.in: No such file or directory
        rm -f debian/files
        find .  \( \( -type f -a \
                \( -name '#*#' -o -name '.*~' -o -name '*~' -o -name DEADJOE \
                 -o -name '*.orig' -o -name '*.rej' -o -name '*.bak' \
                 -o -name '.*.orig' -o -name .*.rej -o -name '.SUMS' \
                 -o -name TAGS -o \( -path '*/.deps/*' -a -name '*.P' \) \
                \) -exec rm -f {} \; \) -o \
                \( -type d -a -name autom4te.cache -prune -exec rm -rf {} \; \) \)
/usr/share/cdbs/1/rules/buildcore.mk:72: parsing asterisk-addons_1.4.13.orig.tar.gz ...
grep: debian/control.in: No such file or directory
egrep: debian/control.in: No such file or directory
/bin/sh: line 0: cd: build-tree/asterisk-addons-1.4.13: No such file or directory
make: *** build-tree/asterisk-addons-1.4.13: No such file or directory.  Stop.
 debian/rules build
/usr/share/cdbs/1/rules/buildcore.mk:72: parsing asterisk-addons_1.4.13.orig.tar.gz ...
grep: debian/control.in: No such file or directory
egrep: debian/control.in: No such file or directory
/bin/sh: line 0: cd: build-tree/asterisk-addons-1.4.13: No such file or directory
 debian/rules binary
/usr/share/cdbs/1/rules/buildcore.mk:72: parsing asterisk-addons_1.4.13.orig.tar.gz ...
grep: debian/control.in: No such file or directory
egrep: debian/control.in: No such file or directory
/bin/sh: line 0: cd: build-tree/asterisk-addons-1.4.13: No such file or directory
 dpkg-genchanges -b >../asterisk-addons_1.4.13+pf.xivo.1.1.18-1_i386.changes
dpkg-genchanges: failure: cannot read files list file: No such file or directory
dpkg-buildpackage: failure: dpkg-genchanges gave error exit status 2
BUILD END packaging-farm --cd asterisk-addons ARCHITECTURE=i386 DISTRIBUTION=lenny chroot-login
~~~


When reading the error, it is obvious that the removal of control.in is
the source of the error.The success of a debian package build is tested
by looking for the dpkg-genchanges -b string in the output. This is the
last step of packaging and there cannot be any error after this. Errors
that occur before running dpkg-genchange will end the script immediately
and the string will not be found. However the script looking for
dpkg-genchange did not test for a failed run of dpkg-genchange. It is a
rare condition.The status.sh script [now checks if the run of
dpkg-genchange is
successful](http://packaging-farm.dachary.org/trac/changeset/d3bbab7c88148a9f5670e0f8c598174d392f8ed2).

</p>

