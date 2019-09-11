Title: Safeguard against downgrades in XIVO packages
Date: 2011-09-26 09:53
Author: dachary
Category: XiVO IPBX
Tags: packages
Slug: safeguard-against-downgrades-in-xivo-packages
Status: published

#### Safeguard against downgrades in XIVO packages

The following use case creates a [confusing
situation](http://packaging-farm.dachary.org/trac/ticket/23):

-   package-1.1-1 is submitted to the farm and successfully built
-   package-1.0-1 is submitted to the farm : it is a version lower than
    the one already built
-   packaging-farm creates package-1.1-1+build1 instead of package-1.0-1
-   the .orig.tar.gz is package-1.0.orig.tar.gz and a package-1.1.tar.gz
    is created

Although building an older version of a package is not desirable, it
should not claim to succeed while creating a package inconsistent with
the orig.tar.gz file.

The source of the problem comes from the logic that adds a +buildX to
the debian version of a package when a package is rebuilt (for instance
because a package it depends on has been rebuilt). When this logic was
implemented, the possibility that a package with a lower version number
than a previously built package could be submitted was overlooked. It is
not the normal behavior and should be treated as an error. Instead, it
was ignored and lead to confusing results as described in the bug
report.

The general rule is that the packaging-farm should refuse to build a
package with a version lower than a previously build package. The goal
is to prevent downgrades because the installation scripts are not
designed for downgrades. However, this general rule cannot be applied
just by comparing the versions of the existing package ( as found in
/var/lib/packaging-farm ) and the current package ( as found in
/var/cache/packaging-farm/source ). When a package is rebuilt, the
+buildX suffix will always make the existing package more recent than
the current package. The check must therefore proceed in two steps:
first check if the existing package is more recent and then throw an
error if the reason why it is more recent is not just because there is a
+buildX appended to it.

The [associated
patch](http://packaging-farm.dachary.org/trac/changeset/c1e5dff59898ab5ac0f23854f55d752f1c001a05)
also moves the extraction of the existing package version from the
makefile to the debuild.sh script. That avoids duplicating the logic. It
also gives the debuild.sh script the name of the original dsc file in
order to print a meaningfull error message.

</p>

