Title: Creating a Debian GNU/Linux source package from the VCS (2/2)
Date: 2011-03-14 22:04
Author: dachary
Category: XiVO IPBX
Tags: packages
Slug: creating-a-debian-gnulinux-source-package-from-the-vcs-22
Status: published

#### pf-release.sh

The [pf-release.sh shell script](http://xivo.dachary.org/pf-release.sh)
merges the [GIT repository](http://git.xivo.io/xivo-skaro.git/)
containing the sources and the SVN repository containing the debian
packages into a well formed Debian GNU/Linux source package. For
instance

~~~
pf-release.sh lib-javascript squeeze skaro
~~~


would create the *pf-xivo-lib-js* package. The discussion about the
[publication of the private SVN
repostory](https://lists.proformatique.com/pipermail/xivo-dev/2011-March/000012.html)
concluded that it will be bound to a public GIT repository shortly. When
it is ready, the pf-release.sh script will be updated accordingly.In
order to test the *pf-release.sh* code, it can be run with the *TEST*
argument:

~~~
pf-release.sh TEST
~~~


This will simulate border cases using a temporary direcotry to check
that it behaves as expected. Reading the tests (which are embeded in the
script) is currently the only documentation.

#### packaging-farm submission

The output of *pf-release.sh* is stored in a directory that uses the
same conventions as packaging-farm. Because of that, submitting the
package to the host running the packaging farm can be done by copying
the directory as follows:

~~~
rsync -av pf-xivo-lib-js/ packaging-farm.org:/var/lib/packaging-farm/sources/pf-xivo-lib-js/
~~~


#### dependency generation

A recent addition to the packaging-farm was the automatic generation of
dependencies. It calculates which source package depends on other
packages built by the packaging-farm. Support for meta packages was
added to the dependency generation. In the packaging-farm vocabulary, a
meta package is a package that aggregates others but has no sources of
its own. For instance, the meta package *skaro* was created to produce
the [skaro squeeze
repository](http://xivo.dachary.org/packaging-farm/skaro/gnulinux/debian/).
When running the depencency generations as follows:

~~~
packaging-farm depends
~~~


it includes the meta packages in the graph so that skaro can be built
with:

~~~
packaging-farm skaro
~~~


If, for instance, *pf-xivo-lib-js* has been updated as shown with the
*rsync* command above it will be rebuilt because the skaro meta package
depends on it.

#### makefile generation

Each package entering the packaging-farm must have a *Makefile*
associated with it. Setting the variables in this *Makefile* allows the
administrator to tune the behaviour on a per package basis. When a
package is simple enough, its *Makefile* can be automatically generated
as follows:

~~~
packaging-farm makefiles
~~~


#### packaging-farm sensible defaults

The [version 1.2.33](http://packaging-farm.dachary.org/download/) of
packaging-farm includes the modifications above to help reduce the
number of steps required to rebuild a suite or a specific package.
Submitting a package requires four steps:

-   pf-release.sh
-   rsync
-   packaging-farm generate which calls depends and makefiles
-   packaging-farm the\_package

This completes the making of the building blocks enabling the creation
and maintainance of packages based on the XiVO development repository.
The next step will be to document and simplify the usage, reducing the
learning curve to a minimum.

</p>

