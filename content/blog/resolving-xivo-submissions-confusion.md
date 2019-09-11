Title: resolving XiVO submissions confusion
Date: 2011-09-19 07:15
Author: dachary
Category: XiVO IPBX
Tags: packages
Slug: resolving-xivo-submissions-confusion
Status: published

#### nothing needs to be done

The rules that decide when packaging-farm should work on a package are
explained in the manual pages. However, they have changed a lot while
packaging-farm matured in the past months and they deserve a short
summary.The first step is to submit work to the packaging-farm and this
is done by the submit-xivo.sh script as follows:

~~~
packaging-farm DIRECTORY=asterisk submit
~~~


which is run as a side effect of the command

~~~
rebuild
~~~


which is an alias for running the **rebuild** target of the
**/etc/packaging-farm/gallifrey.mk** Makefile.What it really does is to
use the content of the XiVO git repository to create a Debian GNU/Linux
source package. It uses the debian packaging instructions found in the
git repository and follow them : it does not create rules automatically,
it fully relies on what has been done manually. It does, however,
creates the package version according to a complex set of rules,
explained in the VERSIONS section of the submit-xivo.sh.The asterisk
source package will not be generated each time the

~~~
packaging-farm DIRECTORY=asterisk submit
~~~


is run for two reasons:

-   To save time. It currently takes less than 30 seconds for
    packaging-farm to update the **skaro** build machine when nothing
    needs to be done. If the source packages were always rebuilt it
    would take at least 15 minutes.
-   To avoid checksum errors when reprepro mirrors the packages built
    by packaging-farm. When a **.orig.tar.gz** is built for a given
    version of a package, it is preserved. Even when the content of two
    **.tar.gz** are strictly identical, the file itself has a different
    md5sum signature because of the compression.

The submit-xivo.sh script decides if a source package should be rebuilt
using a simple comparison : if the existing **.dsc** file has the same
path as the one that would be created, it declares there is no need to
re-create it. In other words, the decision to rebuild a source package
solely depends on the version number of the package.Note that when
submit-xivo.sh decides that nothing needs to be done, it does not rely
on the log history of the git repository. It only relies on the version
number. However, when **VERSION\_COMPUTE=true** (which is the default)
the date and time of the last commit from the git repository is used to
create the version number. Therefore there is a relationship between the
history of the git repository and the decision to recreate the source
package because each new commit will create a new version.This
relationship no longer exists when **VERSION\_COMPUTE=false** and
commits to the git repository will not have any consequence on the
decision to rebuild a source package.

#### manually submitted packages

Some packages are not yet in the git repositories and they are completly
outside the control of submit-xivo.sh. As a consequence they must be
submitted manually to packaging farm. The

~~~
rebuild
~~~


command will not submit these packages because:

-   it would create checksum errors when the same package version is
    submitted twice
-   it would uselessly slow down the command when nothing needs update

The list of packages that need manual care is found in the
**/etc/packaging-farm/gallifrey.mk** or **/etc/packaging-farm/skaro.mk**
files:

~~~
cd /var/cache/packaging-farm/sources
for package in asterisk-chan-capi libasterisk-perl libpri misdn-kernel misdn-user sangoma-wanpipe spandsp
do ( rm -fr $package ; mkdir $package ; cd $package ; apt-get source $package 
      rm -f /var/cache/packaging-farm/depends/$package )
done ; packaging-farm generate
~~~


Note however that this is merely a reminder and running it without
evaluating the consequences may lead to checksum errors. The following
should be checked:

-   from which source will the package be retrieved ?
-   which package version will be retrieved ?
-   is the package retrieved compatible with the other package in the
    build farm ?
-   is there already a package with the same version in the
    /var/cache/packaging-farm/source/package directory ?

#### checksum errors

The gallifrey and skaro build machines output is a repository created
with reprepro. It is then mirrored, using reprepro, to mirror.xivo.io.If
the build machines were lost and had to be reinstalled manually, all
packages would be rebuilt. As a consequence, trying to update the mirror
on mirror.xivo.io would lead to checksum errors because both the sources
and binary files would have the same name and different checksum,
because of the same content has a different checksum after compression,
either in a **.tar.gz** or in a **.deb** . The only way to recover from
such a situation would be to :

-   identify all packages that are to be rebuilt by the farm
-   dget from mirror.xivo.io each of them in
    /var/lib/packaging-farm/package
-   rebuild the gallifrey / skaro meta package

Doing so is, in a nutshell, re-importing the packages saved on
mirror.xivo.io back to the build machine, as if it was the result
created with it. The actual restoration of such a catastrophic event is
likely to be more complicated in reality. But the general idea is simple
enough.A more common problem comes from the fact that mirror.xivo.io is
a single reprepro repository that is used to merge unrelated
repositories. For instance gallifrey, gallifrey-dev, skaro, skaro-dev
and so on. Because reprepro has a single package pool shared between all
distributions, if package P-1.1.1-1 has been built on gallifrey and
gallifrey-dev, it will be imported twice with the same version but
different checksum and lead to a checksum error. There are two ways to
avoid this problem:

-   manually ensure that such a case never happens (for instance by
    setting the VERSION\_FLAVOR veriable of submit-xivo.sh to add a
    distinctive string unique to the distribution in the name of
    each package).
-   create a separate reprepro repository for each distribution

#### misleading error message

When nothing needs to be done according to submit-xivo.sh, it shows

~~~
package ${package} was not modified in git since the last package generation
~~~


[although it is unrelated to
git](http://packaging-farm.dachary.org/trac/ticket/22) when
VERSION\_COMPUTE=false.The message explaining that no update is needed
is [moved to the need\_update
function](http://packaging-farm.dachary.org/trac/changeset/d6c8676bd54b95b76ce475d7fe7dbe0d2592aafa)
and displays the exact reason, path included, why no update is required.

</p>

