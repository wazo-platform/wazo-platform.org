Title: XiVO client packaging, server source policy and packaging-farm updates
Date: 2011-01-31 17:39
Author: dachary
Category: XiVO IPBX
Slug: xivo-client-packaging-server-source-policy-and-packaging-farm-updates
Status: published

#### XiVO Qt client packaging

The resulting packages are then uploaded to a directory that depends on
the operating system :

-   [Debian GNU/Linux i386 and
    amd64](http://downloads.xivo.io/xivo_cti_client/linux/debian/)
-   [Windows](http://downloads.xivo.io/xivo_cti_client/win32/)
-   [MacOsX](http://downloads.xivo.io/xivo_cti_client/macos/)

The Debian GNU/Linux packages are created by a [custom
script](http://git.proformatique.com/?p=official/xivo-client-qt.git;a=blob;f=cross/installer.sh)
that builds the binary .deb file using the binary produced by the
compilation. There is no corresponding source package. The MacOsX .dmg
are created by a [custom
script](http://git.proformatique.com/?p=official/xivo-client-qt.git;a=blob;f=cross/build_config/on-MacOsX-SnowLeopard).

The Windows .exe are created by a
[NSIS](http://en.wikipedia.org/wiki/Nullsoft_Scriptable_Install_System)
[script](http://git.proformatique.com/?p=official/xivo-client-qt.git;a=blob;f=cross/installer_config/win32-shared).

#### Other XiVO clients

The XiVO web interface is made of a JQuery based
[webapp](http://git.proformatique.com/?p=official/xivo-client-web.git)
relying on web services provided by the XiVO server. It is not packaged
on its own : when the user connects to the PHP based web interface (as
found in the web-interface directory of the [git
repository](http://git.xivo.io/xivo-skaro.git/)) the browser loads it as
a side effect.

The XiVO android client is packaged using the Eclipse based toolkit.

#### XiVO server packaging source policy

The [XiVO server sources](http://git.xivo.io/) and the corresponding
Debian GNU/Linux packaging instructions follow an undocumented policy.
The SVN respository containing the packaging instructions is not
published but it can be re-constructed from the Debian GNU/Linux
directories found in the source packages of the [XiVO Debian GNU/Linux
repository](http://dak.proformatique.com/debian/).

-   All packages authored by Avencall start with the pf- prefix (for
    instance pf-xivo-fetchfw)
-   The Debian GNU/Linux package of third party packages (asterisk
    for instance) is a fork of the official package that may or may not
    be synchronized with it. In particular patches applied to the
    upstream in Debian GNU/Linux may or may not be applied in the
    XiVO distribution.
-   A third party package source tree is made of (take a look at the
    freeswitch directory of the [git
    repository](http://git.xivo.io/xivo-skaro.git/) for an example):
    -   tarballs that contains all past and current source archives
    -   fetch\_tarball.sh that will get the latest source archive from
        the official source and place it in the tarballs directory
    -   Makefile.pkg that contains the name of the directory in
        the (unpublished) SVN repository containing the debian package
        (for freeswitch it is : DEB\_PKG = "freeswitch")
    -   prepare\_test\_sources.sh is a script that:
        -   unpacks the source archive
        -   apply the patches (which may be in the debian directory or
            in the source directory) (freeswitch has no patch although
            it contains a call to quilt)

An unpublished tool has been used consistently over the years and rely
on this policy. The purpose of this tool is essentially the same as the
Debian GNU/Linux
[WannaBuild](http://wiki.debian.org/DebianWannaBuildInfrastructure) or
[launchpad](https://launchpad.net/).

#### packaging-farm multi architecture support

A new release of [packaging-farm](http://packaging-farm.dachary.org) was
published Sunday 30 January, including the following features:

-   Basic multi-architecture support : i386 and x86\_64 are supported
    when running the packaging-farm on an x86\_64 platform. It should
    ultimately rely on a slave virtual machine, either running localy or
    on a remote machine.

<!-- -->

-   Support for the currently active
    [ubuntu](https://wiki.ubuntu.com/Releases) releases.

It is still unclear how packaging-farm could be used to create
multi-distribution and multi-architecture packages for XiVO and that
will be my focus for the following weeks.

</p>

