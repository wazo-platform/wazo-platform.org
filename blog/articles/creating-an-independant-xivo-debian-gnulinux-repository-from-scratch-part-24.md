Title: Creating an independant XiVO Debian GNU/Linux repository from scratch (part 2/4)
Date: 2011-02-14 17:20
Author: dachary
Category: XiVO IPBX
Slug: creating-an-independant-xivo-debian-gnulinux-repository-from-scratch-part-24
Status: published

#### Source package dependencies

The[misdn-user](http://xivo.dachary.org/packaging-farm/misdn-user/gnulinux/debian/i386/lenny/src/)package
depends on
the[misdn-kernel](http://xivo.dachary.org/packaging-farm/misdn-kernel/gnulinux/debian/i386/lenny/src/)package.
Therefore, when misdn-kernel is updated, it may be necessaryto rebuild
the misdn-user package. There are no standard DebianGNU/Linux tools to
compute the dependency graph between two source packages. And it's not
astrivial as it seems, mainly because a source package creates one or
more binary packages.For instance misdn-user depends on misdn-headers
which is created by the misdn-kernel package.A
[script](http://packaging-farm.dachary.org/packaging-farm/packaging-farm/lib/debian/depends.sh)
wascreated to compute the source package dependencies. Its input is a
set of debian/control filesand its output is a set of Makefile rules
such as:

~~~
misdn-kernel ::
misdn-user ::  misdn-kernel
~~~


Note the *::* which allows for additional dependencies to appear later
in the Makefile. Thisgraph is abstract and would not be of any use
unless it is associated to actions such as:

~~~
misdn-kernel :: /var/cache/packaging-farm/depends/misdn-kernel
/var/cache/packaging-farm/depends/misdn-kernel :: /var/cache/packaging-farm/sources/misdn-kernel/*/debian/control
        packaging-farm --cd misdn-kernel all
        touch $@
~~~


The
[depend.sh](http://packaging-farm.dachary.org/packaging-farm/packaging-farm/lib/debian/depends.sh)
script createsthe above snippet for each package. The
`packaging-farm --cd misdn-kernel all` command creates all the
packagesfor misdn-kernel. If it succeeds, the
`/var/cache/packaging-farm/depends/misdn-kernel` timestamp is updatedand
the package is considered up to date. When a newer version of the
package is uploaded to the
`/var/cache/packaging-farm/sources/misdn-kernel`directory, the
`/var/cache/packaging-farm/sources/misdn-kernel/*/debian/control` file
will have a modificationtime more recent than the timestamp, thus
triggering the rebuild of all depending packages in the graph.

The last set of lines created by depend.sh are source lists that allow
each package to gain access to themost recently built version of the
other packages:

~~~
define debian_SOURCE_LIST_APPEND
echo "deb http://localhost/packaging-farm/misdn-kernel/gnulinux/debian/${ARCHITECTURE}/${DISTRIBUTION}/src ./" >> $$source_list ; \\
echo "deb http://localhost/packaging-farm/misdn-user/gnulinux/debian/${ARCHITECTURE}/${DISTRIBUTION}/src ./" >> $$source_list ; \\
: finished
endef
~~~


It would be tempting to ensure that each package is given the source
list it needs and nothing more. However, unlessthe number of packages
handled on a single packaging farm grows over 100, it is probably
overkill. There are lessthan 50 package currently in XiVO.

A [new version of
packaging-farm](http://packaging-farm.dachary.org/download/packaging-farm_1.2.30.dsc)
was published today, including support fordependencies, so that it can
be used to continue building a standalone XiVO repository.

#### XiVO repository for i386 and x86\_64

With the newer installation of the packaging-farm including dependency
handling, another attempt to createa i386 based gallifrey repository for
lenny was made. For each package a command similar to

~~~
packaging-farm misdn-kernel
~~~


was run. It is using the dependency graph to build the package and all
the packages it depends on before it.In the end a few packages could not
be built. Some of them because of trivial dependency problems thatwere
[reported to Nicolas
Hicher](https://projects.proformatique.com/issues/1942) who agreed to
fix them momentarily.Another, more serious, is found in the
sangoma-wanpipe package. It relates to the fact that it pulls
dependenciesbased on the kernel flavor. The native host is amd64 /
x86\_64 based and it fails when attempting to build in a i386chroot.
There probably are workarounds already implemented and looking into
pbuilder is probably the best lead.The [i386 gallifrey
repository](http://xivo.dachary.org/packaging-farm/gallifrey/gnulinux/debian/i386/lenny/src/)
nowcontains more packages and there should be no major obstacle to
complete it once the dependency and architecture problemsare
resolved.Nicolas Hicher is almost done with porting the [skaro XiVO
packages to
squeeze](http://dak.proformatique.com/debian/dists/squeeze-xivo-skaro-dev/).
An attempt was made to buildthem for x86\_64. The [result is still
incomplete](http://xivo.dachary.org/packaging-farm/skaro/gnulinux/debian/x86_64/squeeze/src/)
but it should run when the last dependency problems are resolved.

</p>

