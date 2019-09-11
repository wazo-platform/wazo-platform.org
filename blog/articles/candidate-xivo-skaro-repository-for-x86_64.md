Title: Candidate XiVO skaro repository for x86_64
Date: 2011-02-28 21:08
Author: dachary
Category: XiVO IPBX
Slug: candidate-xivo-skaro-repository-for-x86_64
Status: published

#### XiVO skaro repository for x86\_64

Last week Nicolas Hicher completed a release candidate for the [i386
XiVO skaro
repository](http://dak.proformatique.com/debian/dists/squeeze-xivo-skaro-dev/).
Although the repository claims to support the x86\_64/amd64
architecture, the [amd64 packages are
missing](http://dak.proformatique.com/debian/dists/squeeze-xivo-skaro-dev/main/binary-amd64/Packages).
All the source packages were fetched in an attempt to build a x86\_64
repository. The following problems were found and fixed:

-   [dahdi-linux patch for
    squeeze-i386](https://projects.proformatique.com/issues/1998)
-   [spandsp patch for
    squeeze-x86\_64](https://projects.proformatique.com/issues/1999)
-   [asterisk-1.8 unresolved dependency to postgres 8.3 on
    debian/squeeze](https://projects.proformatique.com/issues/2000)
-   [pf-xivo-fetchfw missing dependency for
    skaro](https://projects.proformatique.com/issues/2001)
-   [pf-xivo-provisioning missing dependency for
    skaro](https://projects.proformatique.com/issues/2002)
-   [pf-xivo-confgen missing dependency for
    skaro](https://projects.proformatique.com/issues/2006)

A problem on the [misdn-kernel
modules](https://projects.proformatique.com/issues/2003) was left
unresolved, in the hope that Nicolas Hicher already knows the solution.
A [question](https://projects.proformatique.com/issues/2007) about an
unusual pf-xivo-base-config and pf-xivo-web-interface interdendency was
posted for discussion. None of these problems were blockers and their
resolution was not mandatory.

#### Installation on Debian GNU/Linux squeeze

The resulting repository was added as follows to a fresh install of
Debian GNU/Linux squeeze:

~~~
deb http://xivo.dachary.org/packaging-farm/skaro/gnulinux/debian skaro-squeeze main
~~~


A single package was missing ( `pf-sys-ca` ) and required the addition
of a repository:

~~~
deb http://dak.proformatique.com/debian lenny-dev main
~~~


In the hope of reducing the configuration work,
[preseed](http://wiki.debian.org/DebianInstaller/Preseed) information
was extracted from the [debian-installer XiVO
repository](git://git.proformatique.com/official/debian-installer.git)
and applied as follows:

~~~
wget -O installed.cfg 'http://git.proformatique.com/?p=official/debian-installer.git;a=blob_plain;f=squeeze/installer.cfg;hb=6ee3ad5851ea7c0bb841cbd05e53835f483dd867'
debconf-set-selections < installed.cfg
wget -O pkg.cfg 'http://git.proformatique.com/?p=official/debian-installer.git;a=blob_plain;f=squeeze/pkg.cfg;hb=127c11ffdb8f4ad42f59fce971f274cd0e079745'
debconf-set-selections < pkg.cfg
~~~


The [full log of the shell
session](http://xivo.dachary.org/2011-02-28-manual-installation.txt) was
archived. However, now that the repository is ready, it should be
possible to automatically install XiVO using the scripts from following
repositories:

-   git://git.proformatique.com/official/debian-installer.git
-   git://git.proformatique.com/official/debian-pxelinux.git

#### packaging-farm release

While fixing the XiVO skaro repository, a few problems were found and
fixed in [packaging-farm](http://packaging-farm.dachary.org/) and
released as version 1.2.32. The ChangeLog reads : add architecture to
KVERS variables. load fakeroot in each dist-upgrade. input for apt-get
is /dev/null to avoid input problems. fix dpkg-scan bug when building
for multiple archictures.

</p>

