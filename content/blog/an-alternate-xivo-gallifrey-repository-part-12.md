Title: An alternate XiVO gallifrey repository (part 1/2)
Date: 2011-04-18 16:40
Author: dachary
Category: XiVO IPBX
Tags: packages
Slug: an-alternate-xivo-gallifrey-repository-part-12
Status: published

#### Kernel module dependencies

When binary kernel modules need to be rebuilt, a Makefile containing
*ROLE = kernel-module* is created for the packaging-farm to work with,
as explained in the manual page. It depends on the source package
providing the *MODULE = module-source* package. A script was added to
the global dependency computation facility of packaging-farm

~~~
packaging-farm depends
~~~


to figure out if the source package is known. If it is a dependency, it
is added to the */var/cache/packaing-farm/depends.mk* file so that it is
rebuilt before the binary kernel modules.

#### Gallifrey dedicated farm.

A [dedicated virtual
machine](http://gallifrey.dachary.org/packaging-farm/) was created to
host the making of gallifrey packages and the resulting repository. It
has been installed from scratch, using the latest
[packaging-farm](http://packaging-farm.dachary.org/download/) package.It
turned out that the submission form of *submit-xivo.sh(1)* relies on
being able to find some dependencies of the source package being
submitted, such as *cdbs* or *quilt*. Although the *dpkg-buildpackage
-d* command is used (which is supposed to be insensitive to the lack of
source dependencies), it could not work unless it is able to interpret
the *debian/rules* file. The *cdbs* and *quilt* dependencies were added
to the packaging-farm package and all general purpose dependencies
should be as well.

#### Patching debian configuration

When something is not right with the debian package, it can be patched
directly on the farm instead of going thru the repository. It may be
useful as a temporary measure when the correct patch is still unclear.

~~~
cd /var/cache/packaging-farm/sources/PACKAGE
# fix something in PACKAGE/debian/rules
dpkg-source -b PACKAGE
~~~


Note that once the fix is correct, it must be saved because the sources
will be overriden when

~~~
packaging-farm DIRECTORY=PACKAGE submit
~~~


is run.This method was used to produce patches for
[asterisk](https://projects.proformatique.com/issues/2194),
[dahdi-linux](https://projects.proformatique.com/issues/2195) and
[dahdi-tools](https://projects.proformatique.com/issues/2196).

#### Configuring packaging-farm

In order for the packages to be signed, a GPG key is generated, without
a password and added tothe *packaging-farm.conf* file (see below
SIGN\_debian=-kD08ED067 )

~~~
gpg --gen-key
~~~


The */etc/packaging-farm/packaging-farm.conf* was modified for
*gallifrey* as follows:

~~~
#
# Exclusively built for lenny
#
DISTRIBUTIONS=lenny
#
# Exclusively built for i386
#
ARCHITECTURES=i386
#
# Source submission porcess configuration
#
SUBMIT=xivo
#
# gallifrey only ships for lenny
#
export SUITE=lenny
export XIVO=gallifrey
#
# List of subdirectories of CHROOT_SOURCE that are cached
# localy in CHROOT_ROOT on a daily basis with
# packaging-farm chroot-master-sync
#
CHROOT_WANTED=debian/i386/lenny
#
# Signing related options for Debian GNU/Linux
# See dpkg-buildpackage(1) for more information
#
SIGN_debian=-kD08ED067
#
# Signing related options for Debian GNU/Linux
# See reprepro(1) for more information
#
SIGN_WITH=SignWith: yes
~~~


#### Collecting gallifrey modules.

The *gallifrey* sources and debian packages are to be found in the
following repositories:

~~~
http://git.xivo.io/xivo-gallifrey.git/ sources
http://git.xivo.io/debian/lenny-xivo-gallifrey.git/ debian packages
~~~


And the following were submitted :

~~~
for dir in dahdi-linux asterisk-sounds-gsm-de-de asterisk-sounds-wav-en-us asterisk-sounds-wav-es-es asterisk-sounds-wav-fr-ca prompts-xivo prompts asternic-stats agid base-config ctiservers ctiwebclient extra fetchfw lib-python provisioning queues-logger sysconfd utils web-interface ; do packaging-farm DIRECTORY=$dir submit ; done
~~~


However, some of them were rebuilt manually:

~~~
dahdi-linux-modules libasterisk-perl libpri misdn-kernel misdn-kernel-modules pf-asterisk-prompt-fr-xivo pf-xivo pf-xivo-backup sangoma-wanpipe sangoma-wanpipe-modules spandsp
~~~


and must be retrieved from the development repository:

~~~
deb-src http://dak.proformatique.com/debian/ lenny-xivo-gallifrey-dev main
~~~


using the method laid out in the [Creating an independant XiVO Debian
GNU/Linux repository from
scratch](http://blog.xivo.io/index.php?post/2011/02/21/Creating-an-independant-XiVO-Debian-GNU/Linux-repository-from-scratch-%28part-3%29)
series.At the moment the development repository is incomplete. But it is
being worked on and the making of the repository will resume when it is
back online.

</p>

