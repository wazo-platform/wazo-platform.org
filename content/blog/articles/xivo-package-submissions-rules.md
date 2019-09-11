Title: XiVO package submissions rules
Date: 2011-08-01 21:47
Author: dachary
Category: XiVO IPBX
Tags: packages
Slug: xivo-package-submissions-rules
Status: published

#### conditional update based on version instead of time

The following use case fails if **submit-xivo.sh** does not create a
source package if the timestamp of the last successfull build is more
recent than the latest commit of the debian or source repository.

-   DIRECTORY=package submit-xivo.sh
-   checkout a tag set a day before
-   DIRECTORY=package submit-xivo.sh

This problem was introduced with the implementation of the GIT\_REVISION
variable that allows to chose which tag or branch the debian and source
should be set.Instead of checking for the build timestamp, the version
of the package that should be build is checked against an existing
.diff.gz file in the source directory. If no match is found, the source
package is created.The documentation was updated to reflect this new
behavior:

~~~
When run as DIRECTORY=asterisk submit.xivo.sh will merge  the  asterisk
       sources  with  the  corresponding Debian GNU/Linux package instructions
       and build a source package.


       step 1 - update the git repositories
              the SOURCE_GIT and DEBIAN_GIT repositories  are  pulled  in  the
              VCS_DIR directory.

       step 2 - test dependencies
              if  there exists a .diff.gz file matching the current version of
              the package (see VERSION below), skip step 3 and step 4

       step 3 - merge sources and Debian GNU/Linux package
              the source  and  Debian  package  information  are  copied  from
              VCS_DIR and merged into PACKAGES_DIR

       step 4 - build source package
              without  any attempt at resolving dependencies, a source package
              is built using dpkg-buildpackage
~~~


#### VERSION\_FLAVOR

At the request of Nicolas Hicher, the VERSION\_FLAVOR variable was added
to implement the following:

~~~
VERSIONS
       The XiVO source  packages  have  no  version  information.  The  Debian
       GNU/Linux  package  version  numbers are generated based on the date of
       the last commit in the source directory (not the debian directory), the
       version  of  the  third party source if any, the content of the VERSION
       file from the source directory, followed  by  the  value  of  the  VER-
       SION_FLAVOR   variable   and   its   short   hash.   V.V.V+X.X.X~YYYYM-
       MDD.HHMMSS.HASH will be the version number of a package built from  the
       third  party source version V.V.V for the benefit of XiVO version X.X.X
       where the last commit in the sources was made on YYYYMMDD.HHMMSS.  This
       last  commit  hash  is appended to the version number.  Example: aster-
       isk-1.4.42+1.1.15~20110312.102015.8ff428-1
~~~


and

~~~
VERSION_FLAVOR=
              The content of this variable is appended to the value  found  in
              the  VERSION file and may be used to distinguish from a develop-
              ment version and a production version for instance.
              VERSION_FLAVOR=-dev
~~~


</p>

