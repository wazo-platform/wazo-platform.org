Title: XiVO server packaging in a nutshell
Date: 2011-01-24 18:41
Author: dachary
Category: XiVO IPBX
Slug: xivo-server-packaging-in-a-nutshell
Status: published

Nicolas Hicher is the XiVO release manager that make it happen. His
input comes from a number of sources which are gradually migrated toward
a set of git repositories which will become a central place:

-   git://git.xivo.io/xivo-dalek.git for old stable
-   git://git.xivo.io/xivo-gallifrey.git for stable
-   git://git.xivo.io/xivo-skaro.git for unstable
-   http://git.proformatique.com/ debian fai and XiVO Qt, Web, Android
    clients and more

About ten developers have write access to commit their work on these
repositories. In addition to their daily workload, they integrate
patches andbug fixes contributed to the [XiVO
redmine](https://projects.proformatique.com/projects/xivo/issues).Nicolas
maintains packaging tools deployed on a few virtual machines which
purpose are to produce a [useable Debian
repository](http://dak.proformatique.com/debian/). Although it is
currently updated with [dak](http://wiki.debian.org/DakHowTo) it is
complicated to maintain and will be migrated to
[reprepro](http://mirrorer.alioth.debian.org/) which is easier to deploy
and maintain.

The general idea is to follow the Debian philosophy with regard to
maintaining stable distributions :

-   the unstable (skaro) distribution roughly matches the Debian testing
    distribution: it has been tried to be installable and roughly
    functional, but it contains newly implemented features that may
    require bug fixing when facing real world usage.

<!-- -->

-   the stable (Gallifrey) distribution is only updated for security
    purposes, with the exception of newer asterisk versions.

<!-- -->

-   the old stable (dalek) distribution is kept for historical purposes

The Debian unstable equivalent is the playground of the ten developers
and there is no public URL for it. When one of them wants to update a
package that is being actively developed, he logs in one of the virtual
machines maintained by Nicolas, types a few command to create "dev"
packages. All the developers use deb packaged based operating systems
(Debian GNU/Linux or Ubuntu) and their source list points to the
repositories located on the virtual machines where the "dev" packages
are created. When one of the developers breaks a package, the others are
quick to pick on it. This is both a curse (when it disrupts their work)
and a blessing (because there is a continuous check of the distribution
consistency). In order to help maintain the consistency of the
distribution, strict version dependency is enforced between packages :
if version 1.4.6 is required, version 1.4.7 will be rejected although it
is presumably backward compatible. This policy may be relaxed in the
future at the cost of extra care to ensure backward compatibility.

When the developers are satisfied with the state of the XiVO
distribution, they declare it a release and set a corresponding git
branch (formerly a SVN tag). Nicolas notifies the production (i.e. the
people ensuring that all deployed XiVO installation can rely on the
stability of the existing repositories) that the skaro distribution
(i.e. http://dak.proformatique.com/debian/dists/lenny-xivo-skaro-dev/)
will be broken while the development packages are migrated to skaro. He
then proceeds with the update and tests the resulting repository by
performing an [installation from
scratch](https://wiki.xivo.io/index.php/XiVO_1.1-Gallifrey/Install_XiVO_From_Scratch)
on a virtual machine via PXE. If the virtual machine indeed contains the
expected packages and that the web interface displays, the production
team is notified and does additional tests before launching upgrades
where relevant.

When a packaging problem is found, either by the production team or by
the developers, Nicolas is responsible for fixing it. If a new software
is being deployed, Nicolas is also responsible for creating the
corresponding package from scratch. More often than not, a problem
requires an emergency fix by the developers shortly after a new release
is put in production. In which case the whole process outlined above
needs to be done again.

The packaging process is evolving continuously and the following
improvements are being considered:

-   adding RPM based packages
-   adding support for x86\_64 and leave room for more architectures
-   deploy a reprepro repository to replace
    http://dak.proformatique.com/debian
-   publish and document XiVO packaging tools
-   Debian GNU/Linux squeeze support
-   move as much as possible from the package to the source tree : some
    packages contain so much knowledge that installing from sources is
    difficult and is a serious obstacle for people running distributions
    which are not explicitly supported
-   improve and document the creation of CD based distributions and
    ready to use virtual machines
-   if a single machine is used to build packages, allow to build
    multiple packages in parallel

With these in mind, the following use case should be available to XiVO
developers and packagers:

-   developer side: I'm working alone on my code, it is perfect, ready
    for production. I build the package (or the whole
    corresponding suite) and I publish the package in the corresponding
    development repository, so that it is available for
    other developers.

<!-- -->

-   developer side: I'm not the only one working on the code (or I know
    my work is not satisfactory) but I want to test a killer feature. I
    build the package and publish it on my private repository and I can
    test it without impacting other developers.

<!-- -->

-   packager side: the developers did a lot of work and there are many
    bug fixes, asterisk version 3 has been published and chan\_sccp
    is stable. I build a full release ( tag + build + publish on a
    release candidate repository ). The production team runs tests
    suites and find bugs that are patched by the developers and propose
    new packages. When the loop stabilizes, the release candidate
    replaces the production.

<!-- -->

-   packager side: a new package is to be built, it must be added on
    all repositories. The developer responsible for the code provides
    all the information to:

  
\*\* build the package (dependencies, location of all files etc).

  
\*\* a HOWTO explaining how to test that the resulting software is
working. It needs not be 100% tests but should cover the basics. A
command --version returning the version number is better than nothing.

The analysis of the existing XiVO release management practices and
prospects reveal patterns that are common to a number of software
publishers. At least those who are best served by deploying a dedicated
distribution (repository, ISO or VM) rather than a single software
package. They are in many ways identical to wide spread distributions
such as Ubuntu or Debian GNU/Linux with a fundamental difference: it is
cross distributions (Fedora, Gentoo, Debian GNU/Linux, Suse ...).

The [packaging-farm](http://packaging-farm.dachary.org/) tool has been
developed to address this specific issue and will be used as a base to
help implement the above features. It is based on the following ideas:

#### The input of the farm is a package and its output are repositories for the target distributions.

A Debian GNU/Linux package is a well defined format to transport
software and packaging instructions. Using it to feed the farm saves the
need to define custom conventions. The same goes for the output of the
farm : all distributions define a format to store collections of
packages, in source and binary forms.

#### The environment of a failed package attempt is preserved for debugging.

Each package is built in an pristine environment to minimize side
effects due to previous executions. This environment (chroot or virtual
machine) is destroyed if the packaging operation is a success. It is
preserved if the package fail and the maintainer can chroot or ssh into
it to figure out and fix the problem.

#### A farm can be stacked on top of others.

This really is a property of the fact that each farm creates a well
formed repository for each distribution. A given farm can either build a
package that has been submitted to it and put the result in its output
repository. Or it can copy the content of the repository of a child farm
into its own. For instance, a production farm/repository can be made a
parent of a release candidate farm/repository. When the release
candidate repository is declared final, the production farm/repository
copies the content of the release candidate farm/repository into its
own.

#### A farm delegates the work to a slave machine.

The farm creates environments (aufs based chroots and possibly lxc or
kvm based virtual machines) and submits a source package for building.
It does not assume the native operating system is able to build any kind
of package itself. If a farm runs on a given operating system, it may be
easier to delegate the actual building of the package to a virtual
machine running the native operating system for the targeted
distribution.

#### All package specifications must be maintained manually.

It is difficult to create a package from a given distribution
automatically based on the package specification from another
distribution. The farm does not support this kind of tool.

The implementation is heavily based on Makefiles because it mostly
handles a chain of dependencies for which they are best suited. The
supporting scripts are shell based because it is the language of choice
for Makefiles.

The XiVO client is being packaged by kaou (nick on irc.freenode.net) and
is not covered here. Nor is the process to create virtual machines or
ISO based distributions.

</p>

