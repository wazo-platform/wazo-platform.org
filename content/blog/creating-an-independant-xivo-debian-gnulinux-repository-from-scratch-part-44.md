Title: Creating an independant XiVO Debian GNU/Linux repository from scratch (part 4/4)
Date: 2011-02-22 18:19
Author: dachary
Category: XiVO IPBX
Slug: creating-an-independant-xivo-debian-gnulinux-repository-from-scratch-part-44
Status: published

#### Kernel modules support

In Debian GNU/Linux kernel modules are packaged as a `modulename-source`
package which contains the source of the kernel module. When someone
needs a given kernel module, it is customary to invoque the
[module-assistant](http://wiki.debian.org/ModuleAssistant) utility to
compile the module from sources so that it matches the currently running
kernel and install it on the fly. However, this operation requires the
installation of a full fledged development environment and this is
resource consuming. For this reason, XiVO chose to distribute binary
packages for the most common kernel flavors :
`2.6.26-2-486, 2.6.26-2-686-bigmem` and `2.6.26-2-686`.This logic does
not match the existing package types (named ROLES) already implemented
in packaging-farm (packages and meta-packages) and a new one was
introduced : kernel-module. Here is a sample Makefile snippet used for
`dahdi-linux`:

~~~
ROLE=kernel-module
PACKAGE=dahdi-linux-modules
MODULE=dahdi-linux-source
DISTRIBUTIONS=lenny
ARCHITECTURES=i386
~~~


The default `ROLE` is overriden to specify that module-assistant should
be used against the designated `MODULE` (i.e. `dahdi-linux-source` which
is a package created from the `dahdi-linux` source package). It will
create a binary kernel module packages for the i386/lenny combination:

~~~
KVERS_i386_lenny=2.6.26-2-486 2.6.26-2-686-bigmem 2.6.26-2-686
~~~


The list is hardcoded in packaging-farm. The resulting packages can be
found in their respective repositories for
[misdn-kernel](http://xivo.dachary.org/packaging-farm/misdn-kernel-modules/gnulinux/debian/i386/lenny/src/),
[dahdi-linux](http://xivo.dachary.org/packaging-farm/dahdi-linux-modules/gnulinux/debian/i386/lenny/src/)
and
[sangoma-wanpipe](http://xivo.dachary.org/packaging-farm/sangoma-wanpipe-modules/gnulinux/debian/i386/lenny/src/).

#### reprepro support

Each package created with packaging-farm has its own standalone
repository with indices created by
[dpkg-scanpackage](http://www.debian.org/doc/manuals/repository-howto/repository-howto#id443712).
They are conveniently used when packages depend on each other (see the
implementation of package dependencies in a previous post) to ensure
that the latest version is used. However, they fail to provide the
automatic architecture multiplexing provided by
[dak](http://wiki.debian.org/DakHowTo) repositories. On i386 the
following line is valid

~~~
deb http://xivo.dachary.org/packaging-farm/dahdi-linux-modules/gnulinux/debian/i386/lenny/src ./
~~~


but it needs to be changed to (note the x86\_64)

~~~
deb http://xivo.dachary.org/packaging-farm/dahdi-linux-modules/gnulinux/debian/x86_64/lenny/src ./
~~~


if the architecture is different. The
[reprepro](http://mirrorer.alioth.debian.org/) utility has been
[added](http://packaging-farm.dachary.org/packaging-farm/packaging-farm/lib/meta-package/reprepro.sh)
as a new way to index the packages when building a `meta-package`. It
creates a repository that is located higher in the packaging-farm
directory hierachy (immediatly above the architecture/distribut/src
part) and that could be used as follows:

~~~
deb http://xivo.dachary.org/packaging-farm/dahdi-linux-modules/gnulinux/debian gallifrey-lenny main
~~~


#### Conclusion

This repository should now be a viable replacement for the official
[lenny-xivo-gallifrey-dev](http://dak.proformatique.com/debian/dists/lenny-xivo-gallifrey-dev/).
This concludes the series on building an independant repository for
XiVO. The resulting tools and the repository itself certainly need to be
polished but the serious issues (requiring more than a few hours to
overcome) have been addressed.

</p>

