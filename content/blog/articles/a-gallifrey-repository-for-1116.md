Title: A gallifrey repository for 1.1.16
Date: 2011-06-13 08:40
Author: dachary
Category: XiVO IPBX
Tags: packages
Slug: a-gallifrey-repository-for-1116
Status: published

#### upgrading packaging-farm

After the upgrade of packaging-farm to version 1.2.42, the [gallifrey
Makefile](http://gallifrey.dachary.org/packaging-farm/gallifrey/Makefile)
was updated to add a *update* target that updates the git repositories
and schedules for build the packages that have been changed since the
last build.

~~~
update:
        #
        # Submitted from the GIT repositories
        #
        for dir in chan_sccp asterisk dahdi-linux dahdi-tools asterisk-sounds-gsm-de-de asterisk-sounds-wav-en-us asterisk-sounds-wav-es-es asterisk-sounds-wav-fr-ca prompts-xivo prompts asternic-stats agid base-config ctiservers ctiwebclient extra fetchfw lib-python provisioning queues-logger sysconfd utils web-interface ; do packaging-farm DIRECTORY=$$dir submit ; done
        #
        # When symbolic links needs to be resolved before building the source package
        #
        for dir in app_nv_faxdetect app_fax ami_aoriginate module_xivo res_config_sqlite ; do RSYNC_OPTIONS=--copy-unsafe-links packaging-farm DIRECTORY=$$dir submit ; done
        # 
        # Retrieved from dak.proformatique.com because they are not in the GIT repositories
        # deb-src http://dak.proformatique.com/debian/ lenny-xivo-gallifrey-dev main
        # virtual packages : pf-xivo pf-xivo-backup
        #cd /var/cache/packaging-farm/sources ; for package in asterisk-chan-capi libasterisk-perl libpri misdn-kernel misdn-user sangoma-wanpipe spandsp pf-xivo pf-xivo-backup  ; do ( rm -fr $$package ; mkdir $$package ; cd $$package ; apt-get source $$package ) ; done ; packaging-farm generate
~~~


Updating the repository can be done with

~~~
packaging-farm --cd gallifrey PACKAGE= update ; packaging-farm gallifrey
~~~


#### building gallifrey 1.1.16

It failed to build *asterisk-chan-sccp*

~~~
packaging-farm --cd gallifrey PACKAGE= update ; packaging-farm gallifrey
~~~


after building successfully the following

~~~
1115:packaging-farm --cd pf-xivo-base-config all
   3867:packaging-farm --cd pf-xivo-cti-server all
   6655:packaging-farm --cd pf-xivo-utils all
   9311:packaging-farm --cd pf-xivo-web-interface all
~~~


The log of the error is:

~~~
Applying patch fix_hidden_callplane_on_transfer
patching file src/sccp_channel.c
Hunk #1 FAILED at 1556.
1 out of 1 hunk FAILED -- rejects in file src/sccp_channel.c
patching file src/sccp_indicate.c
Hunk #1 FAILED at 146.
1 out of 1 hunk FAILED -- rejects in file src/sccp_indicate.c
Patch fix_hidden_callplane_on_transfer does not apply (enforce with -f)
make[3]: *** [debian/stamp-patched] Error 1
make[3]: Leaving directory `/usr/src/asterisk-chan-sccp-0~prerelease+svn2187+pf.xivo.1.1.16~20110\
608.195041.34405d1'
dpkg-buildpackage: failure: debian/rules build gave error exit status 2
~~~


and a bug report was filled by Nicolas Hicher so that the developers are
aware of the issue.As an interim solution, he removed the faulty patch
from the git repository and the submission was run again:

~~~
packaging-farm --cd gallifrey PACKAGE= update ; packaging-farm gallifrey
~~~


and resumed where it left. The ntp package was installed to ensure the
date on the VM is correct. It was 13 minutes ahead in the future and it
created some confusion when synchronizing with the external repositories
was required and did not produce the intended effects.Since each package
name contains the XiVO version, if it changes ( in
*/var/cache/packaging-farm/VCS/sources/xivo-gallifrey/VERSION* ) all
packages must be rebuilt, regardless of the fact that their content
changed. The [packaging-farm
2.0.0](http://hg.packaging-farm.dachary.org/rev/97cac490cb5d) version
contains a patch that implements this behavior.

#### packaging-farm 2.0.0

This version marks the completion of the groundwork that was necessary
to ensure that the software provides the minimal set of functionalities
required to build the XiVO repositories. All the files were reviewed as
well as the packaging instructions.

The HTML / PHP reporting was removed and packaging-farm is now command
line oriented only and has no web interface. A web interface could be
added in the form of a webservice supported by a javascript based
client. But it would not be an evolution of the interface that was
removed.

The license was upgraded from GPLv2+ (i.e. GPLv2 that can be upgraded to
any later version at the user option) to AGPLv3+ (web service oriented
license that ensure the propagation of the modifications when the
service is deployed).

The package was converted to
[dh7](http://en.wikipedia.org/wiki/Debhelper#Overview) and
[DebSrc3.0](http://wiki.debian.org/Projects/DebSrc3.0). All lintian
warnings were fixed. An [Intent To
Package](http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=630358) was
sent to schedule the inclusion in Debian GNU/Linux.

</p>

