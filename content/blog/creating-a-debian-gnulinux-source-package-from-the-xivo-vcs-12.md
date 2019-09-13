Title: Creating a Debian GNU/Linux source package from the XiVO VCS (1/2)
Date: 2011-03-07 19:10
Author: dachary
Category: XiVO IPBX
Tags: packages
Slug: creating-a-debian-gnulinux-source-package-from-the-xivo-vcs-12
Status: published

#### Source GIT structure

The [GIT repository](http://git.xivo.io/xivo-skaro.git/) can be
extracted as follows:

~~~
git clone git://git.xivo.io/xivo-skaro.git
~~~


It contains a directory for each source package found in the [skaro
repository](http://dak.proformatique.com/debian/dists/squeeze-xivo-skaro-dev/).
The names of the directories are mapped to the package names as follows:

~~~
agid -> pf-xivo-agid
app_nv_faxdetect -> pf-asterisk-app-nv-faxdetect
asterisk -> asterisk
base-config -> pf-xivo-base-config
bntools -> bntools
chan_sccp -> asterisk-chan-sccp
confgen -> pf-xivo-confgen
ctiservers -> pf-xivo-cti-server
dahdi-linux -> dahdi-linux
dahdi-tools -> dahdi-tools
extra -> pf-xivo-extra
fetchfw -> pf-xivo-fetchfw
freeswitch -> freeswitch
lib-javascript -> pf-xivo-lib-js
lib-python -> pf-xivo-lib-python
monitoring -> pf-xivo-monitoring
provisioning -> pf-xivo-provisioning
queues-logger -> pf-xivo-queues-logger
res_watchdog -> pf-asterisk-res-watchdog
sysconfd -> pf-xivo-sysconfd
utils -> pf-xivo-utils
web-interface -> pf-xivo-web-interface
xivo-sounds -> pf-xivo-sounds
~~~


The mapping is found in the `*/Makefile.pkg` file, in the `DEB_PKG`
variable, such as

~~~
DEB_PKG="pf-xivo-monitoring"
~~~


There are two sets of directories : the software imported from a third
party (asterisk, for instance) and the software developped natively.The
source tarbal of a native package is created from a tar of the
directory, not including the directory name. For instance, the
[pf-xivo-cti-server
tarbal](http://dak.proformatique.com/debian/pool/main/p/pf-xivo-cti-server/pf-xivo-cti-server_1.2~svn10269.orig.tar.gz)
contains:

~~~
-rw-r--r--    root/root        305 ./Makefile.pkg
 -rw-r--r--    root/root       6922 ./xivo_daemon.conf
 -rw-r--r--    root/root      35068 ./LICENSE
 drwxr-xr-x    root/root          0 ./xivo_ctiservers/
 -rw-r--r--    root/root       8011 ./xivo_ctiservers/cti_trunklist.py
 -rw-r--r--    root/root      13509 ./xivo_ctiservers/xivo_phones.py
 -rw-r--r--    root/root       3199 ./xivo_ctiservers/cti_presence.py
...
~~~


The source tarbal of a third party package is created with a tar of the
`patches` and `tarballs` directories alone. The rest of the files are
used during the development cycle ( such as asterisk/fetch\_tarball.sh
to synchronize with the asterisk upstream ) and are out of the scope of
this discussion. For instance, the content of the [dahdi-linux
tarbal](http://dak.proformatique.com/debian/pool/main/d/dahdi-linux/dahdi-linux_2.4.1.0+dfsg+pf.xivo.1.2~svn10330.orig.tar.gz)
is as follows:

~~~
drwxr-xr-x    root/root          0 ./patches/
 -rw-r--r--    root/root       1106 ./patches/enable_oslec.diff
 -rw-r--r--    root/root        776 ./patches/no_firmware_download
 -rw-r--r--    root/root         39 ./patches/series
 -rw-r--r--    root/root    1147443 ./dahdi-linux_2.4.1.0+dfsg.orig.tar.gz
~~~


Note that the tarbal is moved up one directory and the `tarballs`
directory does not show. The actual content of the corresponding GIT
repository is as follows:

~~~
dahdi-linux/prepare_test_sources
dahdi-linux/sources.pkg
dahdi-linux/SOURCE-VERSION
dahdi-linux/AUTOBUILD-IGNORE
dahdi-linux/Makefile.pkg
dahdi-linux/tarballs
dahdi-linux/tarballs/dahdi-linux_2.4.1+dfsg.orig.tar.gz
dahdi-linux/fetch_sources
dahdi-linux/patches/series
dahdi-linux/patches/no_firmware_download
~~~


None of the source directories contain version numbers. A convention
involving a SVN version number (a SVN repository is used behind the GIT)
and the content of the `VERSION` file (1.2 for skaro) is used to
generate a version (such as the `1.2~svn10330` part of
`dahdi-linux_2.4.1.0+dfsg+pf.xivo.1.2~svn10330.orig.tar.gz`). A simpler
convention is [being
discussed](https://lists.proformatique.com/pipermail/xivo-dev/2011-March/000008.html)
to cope with two issues:

-   the SVN version is not available to the general public
-   the global version number (1.2 for skaro) is redundant and could be
    ignored

The directory `tools` is not a package. It contains files shared and
duplicated in some native packages. For instance `gwr.py`:

~~~
app_nv_faxdetect/gwr.py -> ../tools/gwr.py
 res_watchdog/gwr.py -> ../tools/gwr.py
 tools/gwr.py
~~~


In order to ensure the inclusion of the file itself when the tarbal is
created, the `-h` is used to store the content of the symbolic link
instead of the symbolic link itself.Some sources, such as `libpri` are
unmodified ports of the standard package and do not require special
handling.

#### Debian package SVN structure

The Debian GNU/Linux package are stored in an internal SVN and its
publication is [being
discussed](https://lists.proformatique.com/pipermail/xivo-dev/2011-March/000012.html).
The information can be retrieved from the source packages but the
history is lost to the general public. The SVN tree is structured using
a path named after the XiVO version and the Debian GNU/Linux version it
is based on. For instance:

~~~
package=asterisk
    suite=squeeze
    xivo=skaro

    means the packaging information will be found in

    packages/branches/official/${suite}-xivo-${xivo}/${package}/trunk/debian
~~~


If the version found in `debian/changelog` does not reflect the source
version number (for instance 2.4.1.0+dfsg+pf.xivo.1.2\~svn10330 in the
chapter above), a new changelog entry will be created to match it. When
this sanity check is done (and assuming the source tarbal is available
in the upper directory), the source package can be created with:

~~~
dpkg-buildpackage -S -uc -us
~~~


Although most packages contain a
[debian/control.in](http://cdbs-doc.duckcorp.org/en/cdbs-doc.xhtml)
file, the corresponding `debian/control` is commited to in the SVN
repository. The CDBS documentation suggests it is not a mature feature
and it could probably be ignored. The newer [debhelper version
7](http://en.wikipedia.org/wiki/Debhelper#Overview) could prefered to
CDBS in the future.

#### Implementing the source package logic

A [shell script stub has been
created](http://xivo.dachary.org/pf-release.sh) to implement the logic
described above, together with embeded tests. When the SVN containing
the Debian GNU/Linux packaging information will be available, it will
create the source packages that can be fed to
[http://packaging-farm.dachary.org/](packaging-farm) in order to create
a [XiVO skaro
repository](http://xivo.dachary.org/packaging-farm/skaro/gnulinux/debian/)
described in the [series on building an independant XiVO
repository](http://blog.xivo.io/index.php?post/2011/02/22/Creating-an-independant-XiVO-Debian-GNU/Linux-repository-from-scratch-%28part-4/4%29).In
the second part of this entry, the script will be complete and a the
XiVO skaro repository updated.

</p>

