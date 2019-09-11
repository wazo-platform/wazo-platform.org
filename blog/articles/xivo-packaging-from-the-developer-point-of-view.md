Title: XiVO packaging from the developer point of view
Date: 2011-07-04 12:04
Author: dachary
Category: XiVO IPBX
Tags: packages
Slug: xivo-packaging-from-the-developer-point-of-view
Status: published

#### pre-requistes

The ssh key of the developer must be installed in
/root/.ssh/authorized\_keys on http://skaro.dachary.org/packaging-farm/.

#### workflow

The reference for the following can be found in the packaging-farm,
packaging-farm.conf and submit-xivo.sh manual pages.

-   Guillaume gets work done on the **web-interface** directory of the
    internal SVN
-   It is mirrored every 5 minutes to the [external
    GIT](http://git.xivo.io/xivo-skaro.git/)
-   Guillaume submits the rebuild of the package to skaro.dachary.org

<!-- -->

~~~
ssh -p 22002 -A root@66.254.41.119 packaging-farm DIRECTORY=web-interface submit \; packaging-farm pf-xivo-web-interface
~~~


-   If the build fails, it has a non zero exit status. Guillaume goes
    into the chroot that was preserved after the failure to try and fix
    the issue:

<!-- -->

~~~
ssh -t -p 22002 -A root@66.254.41.119 packaging-farm --cd pf-xivo-web-interface ARCHITECTURE=i386 DISTRIBUTION=squeeze chroot-login
 cd /usr/src
~~~


-   After fixing the issue and rebuilding successfully, a [repository
    containing the resulting
    package](http://skaro.dachary.org/packaging-farm/pf-xivo-web-interface/gnulinux/debian/i386/squeeze/src/)
    can be used by adding the following to the /etc/apt/sources.list
    file:

<!-- -->

~~~
deb http://skaro.dachary.org/packaging-farm/pf-xivo-web-interface/gnulinux/debian/i386/squeeze/src ./
~~~


-   Guillaume conducts a few tests on a virtual machine of his own with
    the newly built package.
-   When satisfied with the result, he decides to update the skaro
    repository by asking the machine to harvest the results of each
    individual package into a global repository:

<!-- -->

~~~
ssh -p 22002 -A root@66.254.41.119 packaging-farm skaro
~~~


-   The updated repository can be used by adding the following to the
    file /etc/apt/sources.list:

<!-- -->

~~~
deb http://skaro.dachary.org/packaging-farm/skaro/gnulinux/debian skaro-squeeze main
~~~


#### debugging on the farm

When in the chroot by running the following command:

~~~
ssh -t -p 22002 -A root@66.254.41.119 packaging-farm --cd pf-xivo-web-interface ARCHITECTURE=i386 DISTRIBUTION=squeeze chroot-login
~~~


new software can be installed and one must not fear to destroy anything
of value. If the chroot becomes messy, it can be re-initialized as
follows, after exiting it.

~~~
ssh -t -p 22002 -A root@66.254.41.119 packaging-farm --cd pf-xivo-web-interface ARCHITECTURE=i386 DISTRIBUTION=squeeze chroot-reinit get/debian
~~~


The **chroot-reinit** target remove the chroot entirely and replaces it
with a virgin copy of the corresponding distribution. The get/debian
target get a clean copy of the sources found in the /usr/src directory.

#### concurrency

All packages can be built in parallel. For instance:

~~~
ssh -p 22002 -A root@66.254.41.119 packaging-farm pf-xivo-web-interface
~~~


can be run at the same time as

~~~
ssh -p 22002 -A root@66.254.41.119 packaging-farm pf-xivo-base-config
~~~


and they will not interfere. However, if both commands trigger the build
of another package because they have it in common in the dependency
graph, the two build may overlap. A package can be built without any
regard to the dependency graph as follows:

~~~
ssh -p 22002 -A root@66.254.41.119 packaging-farm --cd pf-xivo-base-config all
~~~


The general principle is that the **--cd** flag goes to the self
contained directory when the package is being built and ignore the
dependency graph. Without the **--cd** flag, the command will lookup in
the dependency graph to find an entry with the argument name and make
sure all its dependencies are compiled before it.

#### building for a given architecture

Guillaume has a i386 virtual machine but the current skaro packages are
built for x86\_64. The following command was used to [build the package
of interest for
i386](http://skaro.dachary.org/packaging-farm/pf-xivo-web-interface/gnulinux/debian/i386/squeeze/src/)

~~~
rm /var/lib/packaging-farm/depends/pf-xivo-web-interface
ssh -p 22002 -A root@66.254.41.119 packaging-farm DIRECTORY=web-interface submit \; packaging-farm ARCHITECTURES=i386 pf-xivo-web-interface
~~~


#### forcing the build of a package

The **--force** option was implemented and documented to bypass the
dependency graph:

~~~
--force <package-name>
              disregard the dependency graph and perform the action  <package-
              name>  without  any  consideration  to the fact that none of its
              dependencies have changed since the last time it was run.
~~~


#### packaging-farm wish-list

-   [add a lock per
    distribution/architecture](http://packaging-farm.dachary.org/trac/ticket/6)
-   [end of build email/jabber/chat
    notification](http://packaging-farm.dachary.org/trac/ticket/7)

#### listing what can be done

The following command can be used to list all the known variables that
can be used to implement the use case described above:

~~~
ssh -p 22002 -A root@66.254.41.119 packaging-farm --quiet --no-print-directory submit
~~~


It will output something that looks like:

~~~
Create source packages from XiVO repositories.

The debian directories are cloned from git://git.xivo.io/debian into /var/cache/packaging-farm/VCS/debian/squeeze-xivo-skaro
The sources are cloned from git://git.xivo.io into /var/cache/packaging-farm/VCS/sources/xivo-skaro
The packages are created in /var/cache/packaging-farm/sources

Usage:
# submit all known sources but do nothing
for directory in agid asterisk base-config bntools chan_sccp confgen ctiservers dahdi-linux dahdi-tools extra fetchfw freeswitch lib-javascript lib-python libpri monitoring pf-xivo pf-xivo-backup provisioning res_watchdog sysconfd utils wanpipe web-interface xivo-sounds xivo_ha ; do packaging-farm DIRECTORY=$directory submit ; done
# submit a given source and update the repository
packaging-farm DIRECTORY=agid PACKAGE=pf-xivo-agid submit
packaging-farm DIRECTORY=asterisk PACKAGE=asterisk submit
packaging-farm DIRECTORY=base-config PACKAGE=pf-xivo-base-config submit
packaging-farm DIRECTORY=bntools PACKAGE=bntools submit
packaging-farm DIRECTORY=chan_sccp PACKAGE=asterisk-chan-sccp submit
packaging-farm DIRECTORY=confgen PACKAGE=pf-xivo-confgen submit
packaging-farm DIRECTORY=ctiservers PACKAGE=pf-xivo-cti-server submit
packaging-farm DIRECTORY=dahdi-linux PACKAGE=dahdi-linux submit
packaging-farm DIRECTORY=dahdi-tools PACKAGE=dahdi-tools submit
packaging-farm DIRECTORY=extra PACKAGE=pf-xivo-extra submit
packaging-farm DIRECTORY=fetchfw PACKAGE=pf-xivo-fetchfw submit
packaging-farm DIRECTORY=freeswitch PACKAGE=freeswitch submit
packaging-farm DIRECTORY=lib-javascript PACKAGE=pf-xivo-lib-js submit
packaging-farm DIRECTORY=lib-python PACKAGE=pf-xivo-lib-python submit
packaging-farm DIRECTORY=libpri PACKAGE= submit
packaging-farm DIRECTORY=monitoring PACKAGE=pf-xivo-monitoring submit
packaging-farm DIRECTORY=pf-xivo PACKAGE= submit
Can't open /var/cache/packaging-farm/VCS/sources/xivo-skaro/libpri/Makefile.pkg: No such file or directory.
could not match ^DEB_PKG.*?([\w-]+) in file /var/cache/packaging-farm/VCS/sources/xivo-skaro/libpri/Makefile.pkg to extract package name
Can't open /var/cache/packaging-farm/VCS/sources/xivo-skaro/pf-xivo/Makefile.pkg: No such file or directory.
could not match ^DEB_PKG.*?([\w-]+) in file /var/cache/packaging-farm/VCS/sources/xivo-skaro/pf-xivo/Makefile.pkg to extract package name
Can't open /var/cache/packaging-farm/VCS/sources/xivo-skaro/pf-xivo-backup/Makefile.pkg: No such file or directory.
could not match ^DEB_PKG.*?([\w-]+) in file /var/cache/packaging-farm/VCS/sources/xivo-skaro/pf-xivo-backup/Makefile.pkg to extract package name
packaging-farm DIRECTORY=pf-xivo-backup PACKAGE= submit
packaging-farm DIRECTORY=provisioning PACKAGE=pf-xivo-provisioning submit
packaging-farm DIRECTORY=res_watchdog PACKAGE=pf-asterisk-res-watchdog submit
packaging-farm DIRECTORY=sysconfd PACKAGE=pf-xivo-sysconfd submit
packaging-farm DIRECTORY=utils PACKAGE=pf-xivo-utils submit
packaging-farm DIRECTORY=wanpipe PACKAGE=sangoma-wanpipe-source submit
packaging-farm DIRECTORY=web-interface PACKAGE=pf-xivo-web-interface submit
packaging-farm DIRECTORY=xivo-sounds PACKAGE=pf-xivo-sounds submit
packaging-farm DIRECTORY=xivo_ha PACKAGE=pf-xivo-ha submit
~~~


</p>

