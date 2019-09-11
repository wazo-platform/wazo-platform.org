Title: XiVO packaging verbosity and safeguards
Date: 2011-08-15 13:58
Author: dachary
Category: XiVO IPBX
Tags: packages
Slug: xivo-packaging-verbosity-and-safeguards
Status: published

#### package versions

The XiVO package versions are automatically generated in part and follow
the debian conventions as documented in the deb-version(1) manual page.
The automatic numbering occurs in the submit-xivo.sh script as described
below:

~~~
VERSIONS
       The  XiVO source packages have no version information. The Debian GNU/Linux package version numbers are generated based on the date
       of the last commit in the source directory (not the debian directory), the version of the third party source if any, the content of
       the  VERSION  file  from  the  source  directory,  followed  by  the  value  of  the  VERSION_FLAVOR  variable  and its short hash.
       V.V.V+X.X.X~YYYYMMDD.HHMMSS.HASH will be the version number of a package built from the third party source version  V.V.V  for  the
       benefit  of  XiVO version X.X.X where the last commit in the sources was made on YYYYMMDD.HHMMSS. This last commit hash is appended
       to the version number.  Example: asterisk-1.4.42+1.1.15~20110312.102015.8ff428-1

       When merging a source with its matching Debian GNU/Linux package, the first line of the debian/changelog file must contain the com‐
       puted version number. If it does not, a new changelog entry is used with the following template:
              echo "$package (${version}${debian_version}) $component; urgency=low"
              echo
              echo "  * upstream update"
              echo
              echo -n " -- $DEBFULLNAME <$DEBEMAIL>  "
              date '+%a, %d %b %Y %R:%S %z'
              echo

       The  handling  of  the versions for the packages that have no corresponding source such as pf-xivo or pf-xivo-backup is simpler and
       relies on the version found in the VERSION file of the source directory only.
~~~


The XiVO developers were used to a tool that also incremented the Debian
GNU/Linux version. It is no longer the case and instead of having a -0
version number the developer is required to take care of the increment
as any Debian GNU/Linux package would.This created a confusion that led
to inconsistencies in the sequence of the package versions. Because the
submit-xivo.sh script was unable to detect and properly report these
inconsistencies, it created a situation that was very confusing.To avoid
such troubles, a number of safeguards [were
implemented](http://packaging-farm.dachary.org/trac/changeset/bd8626b5f1d43677f9d3ce5990fb4a545a1982e6)
to properly document the following mistakes:

-   a changelog with a mismatched package name
-   a missing version
-   a native package (submit-xivo.sh requires non native packages)
-   a package version that goes back in time

#### verbosity

The packaging-farm script is based on make(1) which is very verbose by
default. The amount of information produced is useful for debugging but
confusing to the developer. The default was [set to
quiet](http://packaging-farm.dachary.org/trac/changeset/5c7ce86716fc16c5ad58910f4c973b081b4a6280)
and can be reverted to verbose as follows:

~~~
QUIET='' packaging-farm target
~~~


This was not documented as it is only useful to debug packaging-farm
itself.

</p>

