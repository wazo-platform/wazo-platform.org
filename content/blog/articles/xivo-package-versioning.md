Title: XiVO package versioning
Date: 2011-08-29 08:37
Author: dachary
Category: XiVO IPBX
Tags: packages
Slug: xivo-package-versioning
Status: published

#### production version conventions

XiVO package release numbers [must not contain the timestamp +
hash](http://packaging-farm.dachary.org/trac/ticket/16). When upgrading
from a development machine to a production machine, the package numbers
for production are lexicographically lower than the package numbers for
development. For instance 1.1.15<a></a> in a special way as documented
in the dpkg-version manual page:

~~~
The lexical compar‐
 ison is a comparison of ASCII values modified so that all the letters sort earlier than all the non-letters and so
 that a tilde sorts before anything, even the end of a part.  For example, the following parts are in sorted order:
 '~~', '~~a', '~', the empty part, 'a'.
~~~


This created somme confusion as demonstrated in the chat log below

~~~
(05:15:22 PM) guillaumeb: dachary: pourquoi on conserve la date/le n° de commit dans les paquets de prod ?
(05:42:23 PM) dachary: guillaumeb: la date c'est pour avoir une numérotation chronologique. Le numéro de hash c'est pour avoir une façon de trouver a quel commit ça correspond dans le git. 
(05:52:32 PM) guillaumeb: dachary: oui, mais pour les releases (du temps de git/nono), on virait le numéro de commit dans la version du paquet
(05:54:16 PM) dachary: guillaumeb: je pourrais rajouter cette fonctionalité dans le script de soumission. Je n'avais pas réalisé qu'elle existait.
(05:55:01 PM) guillaumeb: parce qu'il semble que là ça pose un pb pour les migrations (le script ne doit pas correctement gérer le '~...')
(05:55:58 PM) dachary: guillaumeb: c'est clair que toute déviation du modèle établit est une menace de péter la compatibilité. 
(05:56:28 PM) dachary: guillaumeb: tu peux me décrire l'algo de nono pour la gestion de la numérotation pour la release ? 
(05:57:31 PM) dachary: foo-1.1.1~svn283-1 puis foo-1.1.1-1 ca marcherait pas donc ca doit etre autre chose
(06:04:19 PM) guillaumeb: dachary: je ne connais pas l'algo dans le détail
(06:04:51 PM) guillaumeb: mais par exemple, en 1.1.14, la version de pf-xivo-web-interface était 7:1.1.14-1
(06:05:47 PM) dachary: je vois pas comment faire pour avoir une version inferieure a 1.1.14 en ajoutant qqc a la fin
(06:05:53 PM) dachary: pour moi ca va toujours etre superieur
(06:06:05 PM) dachary: doit y avoir un truc
(06:06:38 PM) yoda1410: le -1 c'est la revision du package
(06:06:43 PM) yoda1410: pas la version du package
(06:07:53 PM) dachary: yoda1410: oui. 7:1.1.14-1 c'est [epoch:]version[-debianversion]
(06:08:06 PM) yoda1410: eh bien ou est le soucis ?
(06:08:16 PM) yoda1410: 1.1.13-7 seras toujours inferieur a 1.1.14-1
(06:08:17 PM) dachary: si tu as 7:1.1.14~svn200-1 pendant le dev
(06:08:30 PM) guillaumeb: yoda1410: oui, mais ça fait partie du numéro de version du paquet
(06:08:37 PM) dachary: yoda1410: ah !
(06:08:50 PM) dachary: yoda1410: c'est pas bete ce que tu dis :-)
(06:09:05 PM) dachary: la version release est *inferieure* a la version de dev
(06:09:12 PM) dachary: mais superieure a la precedente release
(06:09:26 PM) dachary: donc qqn qui aurait une version de dev serait dans la mouise
(06:09:39 PM) dachary: mais qqn qui aurait une version stable a upgrade serait bon
(06:10:04 PM) dachary: dans la mouise => a devoir downgrader (du point de vue de dpkg --compare-version )
(06:10:13 PM) yoda1410: un repository de dev, un repository stable
(06:10:26 PM) yoda1410: potentiellement, tu passes pas vraiment de l'un a l'autre et vice versa
(06:10:57 PM) dachary: si cette incohérence dans le numérotage des version est admise et habituelle, alors pourquoi pas
09:07:20 AM) guillaumeb: comme disait yoda1410 hier, on ne mélange pas les 2 (soit on installe une stable, soit une dev), donc ça ne pose pas vraiment de pb
(09:08:45 AM) dachary: guillaumeb: ok, donc je vais implémenter un truc qui permet de supprimer la génération de timestamp + hash après ~ et ce flag pourra etre mis sur la machine de build qui se charge des release. Ca ira comme ça tu penses ? 
(09:09:15 AM) dachary: je peux faire ça lundi.
~~~


[VERSION\_COMPUTE is
implemented](http://packaging-farm.dachary.org/trac/changeset/da84c60ee1a61fdf728720ba71fb99cdb8e9897f)
to disable the use of a timestamp and short hash when generating the
source version number in submit-xivo.sh. The goal of this variable is to
shorten the XiVO version numbers for production packages, meaning the
development packages will have a lower version number than the
development packages.The manual page was updated with the new option:

~~~
VERSION_COMPUTE=true
              By default each source version number is  created  by  computing
              the  current  time  and extracting the last commit hash from the
              source repository  (see  the  VERSION  section  above.  If  VER-
              SION_COMPUTE is set to false then the current time and last com-
              mit hash are not used when generating the version number.
~~~


#### epoch change

The version 2.0.12 of packaging-farm was installed on the gallifrey
virtual machine instead of the previous 2.0.10 that did not contain the
package version safeguards. When running

~~~
packaging-farm --cd gallifrey update
~~~


The following errors are reported :

~~~
The first line of /var/cache/packaging-farm/VCS/debian/lenny-xivo-gallifrey/asterisk-chan-sccp/trunk/debian/changelog is 'asterisk-chan-sccp (3:0~prerelease+svn2187+pf.xivo.1.1.16~svn11148-6) lenny-xivo-gallifrey-dev; urgency=low' and contains a version (3:0~prerelease+svn2187+pf.xivo.1.1.16~svn11148-6) that is greater or equal (according to dpkg --compare-versions) than the version computed by submit-xivo.sh (3:0~prerelease+svn2187+pf.xivo.1.1.16~20110628.185034.ab4fbbe-1)
The first line of /var/cache/packaging-farm/VCS/debian/lenny-xivo-gallifrey/dahdi-tools/trunk/debian/changelog is 'dahdi-tools (12:2.4.1+pf.xivo.1.1.16~svn10418-1) lenny-xivo-gallifrey-dev; urgency=low' and contains a version (12:2.4.1+pf.xivo.1.1.16~svn10418-1) that is greater or equal (according to dpkg --compare-versions) than the version computed by submit-xivo.sh (12:2.4.1+pf.xivo.1.1.16~20110323.135020.382fcea-1)
The first line of /var/cache/packaging-farm/VCS/debian/lenny-xivo-gallifrey/asterisk-sounds-gsm-de-de/trunk/debian/changelog is 'asterisk-sounds-gsm-de-de (1.0+pf.xivo.1.1.16~svn8396-1) lenny-xivo-gallifrey-dev; urgency=low' and contains a version (1.0+pf.xivo.1.1.16~svn8396-1) that is greater or equal (according to dpkg --compare-versions) than the version computed by submit-xivo.sh (1.0+pf.xivo.1.1.16~20100617.101945.9e0ba42-1)
The first line of /var/cache/packaging-farm/VCS/debian/lenny-xivo-gallifrey/asterisk-sounds-wav-en-us/trunk/debian/changelog is 'asterisk-sounds-wav-en-us (1:1.4.19+pf.xivo.1.1.16~svn8366-1) lenny-xivo-gallifrey-dev; urgency=low' and contains a version (1:1.4.19+pf.xivo.1.1.16~svn8366-1) that is greater or equal (according to dpkg --compare-versions) than the version computed by submit-xivo.sh (1:1.4.19+pf.xivo.1.1.16~20100615.100833.e35f5bc-1)
The first line of /var/cache/packaging-farm/VCS/debian/lenny-xivo-gallifrey/asterisk-sounds-wav-es-es/trunk/debian/changelog is 'asterisk-sounds-wav-es-es (1.4.19+pf.xivo.1.1.16~svn8369-1) lenny-xivo-gallifrey-dev; urgency=low' and contains a version (1.4.19+pf.xivo.1.1.16~svn8369-1) that is greater or equal (according to dpkg --compare-versions) than the version computed by submit-xivo.sh (1.4.19+pf.xivo.1.1.16~20100615.123951.a72913e-1)
The first line of /var/cache/packaging-farm/VCS/debian/lenny-xivo-gallifrey/asterisk-sounds-wav-fr-ca/trunk/debian/changelog is 'asterisk-sounds-wav-fr-ca (1.4.19+pf.xivo.1.1.16~svn8373-1) lenny-xivo-gallifrey-dev; urgency=low' and contains a version (1.4.19+pf.xivo.1.1.16~svn8373-1) that is greater or equal (according to dpkg --compare-versions) than the version computed by submit-xivo.sh (1.4.19+pf.xivo.1.1.16~20100615.131728.8e37c34-1)
The first line of /var/cache/packaging-farm/VCS/debian/lenny-xivo-gallifrey/pf-asterisk-prompts-xivo/trunk/debian/changelog is 'pf-asterisk-prompts-xivo (1.1.16~svn10712-1) lenny-xivo-gallifrey-dev; urgency=low' and contains a version (1.1.16~svn10712-1) that is greater or equal (according to dpkg --compare-versions) than the version computed by submit-xivo.sh (1.1.16~20110505.071312.f112dde-1)
The first line of /var/cache/packaging-farm/VCS/debian/lenny-xivo-gallifrey/pf-asterisk-prompts/trunk/debian/changelog is 'pf-asterisk-prompts (2:1.1.16~svn10715-2) lenny-xivo-gallifrey-dev; urgency=low' and contains a version (2:1.1.16~svn10715-2) that is greater or equal (according to dpkg --compare-versions) than the version computed by submit-xivo.sh (2:1.1.16~20110505.073011.01bf04f-1)
The first line of /var/cache/packaging-farm/VCS/debian/lenny-xivo-gallifrey/pf-asternic-stats/trunk/debian/changelog is 'pf-asternic-stats (3:1.1.16~svn9393-1) lenny-xivo-gallifrey-dev; urgency=low' and contains a version (3:1.1.16~svn9393-1) that is greater or equal (according to dpkg --compare-versions) than the version computed by submit-xivo.sh (3:1.1.16~20101008.160607.3537a3d-1)
The first line of /var/cache/packaging-farm/VCS/debian/lenny-xivo-gallifrey/pf-xivo-agid/trunk/debian/changelog is 'pf-xivo-agid (6:1.1.16~svn11175-1) lenny-xivo-gallifrey-dev; urgency=low' and contains a version (6:1.1.16~svn11175-1) that is greater or equal (according to dpkg --compare-versions) than the version computed by submit-xivo.sh (6:1.1.16~20110701.092341.397e495-1)
The first line of /var/cache/packaging-farm/VCS/debian/lenny-xivo-gallifrey/pf-xivo-base-config/trunk/debian/changelog is 'pf-xivo-base-config (10:1.1.16~svn11120-1) lenny-xivo-gallifrey-dev; urgency=low' and contains a version (10:1.1.16~svn11120-1) that is greater or equal (according to dpkg --compare-versions) than the version computed by submit-xivo.sh (10:1.1.16~20110802.135651.7f1de42-1)
The first line of /var/cache/packaging-farm/VCS/debian/lenny-xivo-gallifrey/pf-xivo-cti-server/trunk/debian/changelog is 'pf-xivo-cti-server (26:1.1.16~svn10937-1) lenny-xivo-gallifrey-dev; urgency=low' and contains a version (26:1.1.16~svn10937-1) that is greater or equal (according to dpkg --compare-versions) than the version computed by submit-xivo.sh (26:1.1.16~20110727.102922.01b04e7-1)
The first line of /var/cache/packaging-farm/VCS/debian/lenny-xivo-gallifrey/pf-xivo-cti-webclient/trunk/debian/changelog is 'pf-xivo-cti-webclient (1:1.1.16~svn9668-1) etch-xivo-dalek-dev; urgency=low' and contains a version (1:1.1.16~svn9668-1) that is greater or equal (according to dpkg --compare-versions) than the version computed by submit-xivo.sh (1:1.1.16~20101130.153620.4f95789-1)
The first line of /var/cache/packaging-farm/VCS/debian/lenny-xivo-gallifrey/pf-xivo-extra/trunk/debian/changelog is 'pf-xivo-extra (1.1.16~svn9928-1) lenny-xivo-gallifrey; urgency=low' and contains a version (1.1.16~svn9928-1) that is greater or equal (according to dpkg --compare-versions) than the version computed by submit-xivo.sh (1.1.16~20110112.094154.13f90a7-1)
The first line of /var/cache/packaging-farm/VCS/debian/lenny-xivo-gallifrey/pf-xivo-fetchfw/trunk/debian/changelog is 'pf-xivo-fetchfw (3:1.1.16~svn11130-1) etch-xivo-gallifrey-dev; urgency=low' and contains a version (3:1.1.16~svn11130-1) that is greater or equal (according to dpkg --compare-versions) than the version computed by submit-xivo.sh (3:1.1.16~20110627.175022.83cded2-1)
The first line of /var/cache/packaging-farm/VCS/debian/lenny-xivo-gallifrey/pf-xivo-lib-python/trunk/debian/changelog is 'pf-xivo-lib-python (19:1.1.16~svn10798-1) lenny-xivo-gallifrey-dev; urgency=low' and contains a version (19:1.1.16~svn10798-1) that is greater or equal (according to dpkg --compare-versions) than the version computed by submit-xivo.sh (19:1.1.16~20110512.142430.c2d6027-1)
The first line of /var/cache/packaging-farm/VCS/debian/lenny-xivo-gallifrey/pf-xivo-provisioning/trunk/debian/changelog is 'pf-xivo-provisioning (4:1.1.16~svn10454-1) lenny-xivo-gallifrey-dev; urgency=low' and contains a version (4:1.1.16~svn10454-1) that is greater or equal (according to dpkg --compare-versions) than the version computed by submit-xivo.sh (4:1.1.16~20110331.175748.85fafed-1)
The first line of /var/cache/packaging-farm/VCS/debian/lenny-xivo-gallifrey/pf-xivo-queues-logger/trunk/debian/changelog is 'pf-xivo-queues-logger (1:1.1.16~svn9930-1) lenny-xivo-gallifrey-dev; urgency=low' and contains a version (1:1.1.16~svn9930-1) that is greater or equal (according to dpkg --compare-versions) than the version computed by submit-xivo.sh (1:1.1.16~20110112.114348.7d798fa-1)
The first line of /var/cache/packaging-farm/VCS/debian/lenny-xivo-gallifrey/pf-xivo-sysconfd/trunk/debian/changelog is 'pf-xivo-sysconfd (1:1.1.16~svn10321-1) lenny-xivo-gallifrey-dev; urgency=low' and contains a version (1:1.1.16~svn10321-1) that is greater or equal (according to dpkg --compare-versions) than the version computed by submit-xivo.sh (1:1.1.16~20110304.195243.b9a73dd-1)
The first line of /var/cache/packaging-farm/VCS/debian/lenny-xivo-gallifrey/pf-xivo-utils/trunk/debian/changelog is 'pf-xivo-utils (3:1.1.16~svn10962-1) lenny-xivo-gallifrey-dev; urgency=low' and contains a version (3:1.1.16~svn10962-1) that is greater or equal (according to dpkg --compare-versions) than the version computed by submit-xivo.sh (3:1.1.16~20110804.084947.d48eca0-1)
The first line of /var/cache/packaging-farm/VCS/debian/lenny-xivo-gallifrey/pf-xivo-web-interface/trunk/debian/changelog is 'pf-xivo-web-interface (7:1.1.16~svn11177-1) lenny-xivo-gallifrey-dev; urgency=low' and contains a version (7:1.1.16~svn11177-1) that is greater or equal (according to dpkg --compare-versions) than the version computed by submit-xivo.sh (7:1.1.16~20110802.135651.7f1de42-1)
The first line of /var/cache/packaging-farm/VCS/debian/lenny-xivo-gallifrey/asterisk-addons/trunk/debian/changelog is 'asterisk-addons (42:1.4.13+pf.xivo.1.1.16~svn10199-6) lenny-xivo-gallifrey-dev; urgency=low' and contains a version (42:1.4.13+pf.xivo.1.1.16~svn10199-6) that is greater or equal (according to dpkg --compare-versions) than the version computed by submit-xivo.sh (42:1.4.13+pf.xivo.1.1.16~20110215.130731.9460139-1)
~~~


The same upgrade was done on the gallifrey development build machine.
The command

~~~
packaging-farm --cd gallifrey update
~~~


did not issue any error message and found a number of updates. However,
when running

~~~
packaging-farm gallifrey
~~~


it failed on sangoma-wanpipe with the following error:

~~~
...
/usr/src/sangoma-wanpipe-3.5.17.dfsg.1/kdrvtmp/sdla_tdmv.c:1504: error: 'DAHDI_MAINT_LOOPSTOP' undeclared (first use in this function)
/usr/src/sangoma-wanpipe-3.5.17.dfsg.1/kdrvtmp/sdla_tdmv.c: In function 'wp_tdmv_rx_dchan':
/usr/src/sangoma-wanpipe-3.5.17.dfsg.1/kdrvtmp/sdla_tdmv.c:2516: error: 'struct dahdi_chan' has no member named 'readbufq'
/usr/src/sangoma-wanpipe-3.5.17.dfsg.1/kdrvtmp/sdla_tdmv.c:2517: error: 'struct dahdi_chan' has no member named 'sel'
/usr/src/sangoma-wanpipe-3.5.17.dfsg.1/kdrvtmp/sdla_tdmv.c:2519: error: 'struct dahdi_chan' has no member named 'eventbufq'
make[6]: *** [/usr/src/sangoma-wanpipe-3.5.17.dfsg.1/kdrvtmp/sdla_tdmv.o] Error 1
make[5]: *** [_module_/usr/src/sangoma-wanpipe-3.5.17.dfsg.1/kdrvtmp] Error 2
make[4]: *** [all] Error 2

---------------------------------------------

make[3]: *** [common-build-impl] Error 1
dpkg-buildpackage: failure: debian/rules build gave error exit status 2
BUILD END packaging-farm --cd sangoma-wanpipe ARCHITECTURE=i386 DISTRIBUTION=lenny chroot-login
~~~


It turns out that the source package for sangoma-wanpipe could only be
found in the existing repositories (it does not have a corresponding git
directory in the repository) and is probably outdated. On the gallifrey
development machine it shows:

~~~
/var/cache/packaging-farm/sources/sangoma-wanpipe:
  total used in directory 13708 available 12287544
  drwxr-xr-x  3 root     root     4096 May 16 05:41 .
  drwxr-xr-x 48 www-data root    12288 Aug 29 05:16 ..
  drwxr-xr-x 19 root     root     4096 May 16 05:41 sangoma-wanpipe-3.5.17.dfsg.1
  -rw-r--r--  1 root     root    15904 May 13 09:07 sangoma-wanpipe_3.5.17.dfsg.1-1+pf.lenny.xivo.gallifrey.dev.27.diff.gz
  -rw-r--r--  1 root     root     1555 May 13 09:07 sangoma-wanpipe_3.5.17.dfsg.1-1+pf.lenny.xivo.gallifrey.dev.27.dsc
  -rw-r--r--  1 root     root 13971782 Nov 25  2010 sangoma-wanpipe_3.5.17.dfsg.1.orig.tar.gz
~~~


where on the gallifrey machine it shows:

~~~
/var/cache/packaging-farm/sources/sangoma-wanpipe:
  total used in directory 14172 available 6490308
  drwxr-xr-x  3 root     root     4096 Jul 28 10:48 .
  drwxr-xr-x 48 www-data root    12288 Aug 29 04:43 ..
  drwxr-xr-x 19 root     root     4096 Jun 27 05:06 sangoma-wanpipe-3.5.20.dfsg.1
  -rw-r--r--  1 root     root     1266 Jun 27 05:16 sangoma-wanpipe_3.5.20.dfsg.1-1+pf.lenny.xivo.gallifrey.dev.27.dsc
  -rw-r--r--  1 root     root 14465725 Jun 27 05:16 sangoma-wanpipe_3.5.20.dfsg.1-1+pf.lenny.xivo.gallifrey.dev.27.tar.gz
~~~


suggesting that a more recent version is available.

#### disk usage optimization

packaging-farm keeps the complete build environment at all times in the
build directory of a package. When disk space must be saved, there
[should be an option to get rid of
it](http://packaging-farm.dachary.org/trac/ticket/17), at the expense of
slowing the build.The [SAVE\_DISK variable is
implemented](http://packaging-farm.dachary.org/trac/changeset/f4a5c380a14996e105f10201e3f5a01784ab1225)
to agressively save space (i.e. the apt archives directory is no longer
saved). The chroot used to build a given distribution for a given
architecture is always umounted and removed.The packaging-farm.conf
manual page was updated:

~~~
SAVE_DISK
              After a package is successfully built, remove all the intermedi-
              ary files if SAVE_DISK=yes.  If SAVE_DISK=no or is missing, more
              disk  space  will be used because a number of intermediary files
              are not removed. For  instance  the  packages  loaded  from  the
              Internet  for  a  Debian GNU/Linux package are kept so that they
              can be reused by another build without the need to download them
              again.
~~~


</p>

