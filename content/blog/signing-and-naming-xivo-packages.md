Title: Signing and naming XiVO packages
Date: 2011-04-11 17:15
Author: dachary
Category: XiVO IPBX
Tags: packages
Slug: signing-and-naming-xivo-packages
Status: published

#### signing packages

A GPG
[key](http://packaging-farm.dachary.org/download/packaging-farm.gpg) was
created for [packaging-farm](http://packaging-farm.dachary.org) and used
to sign the [1.2.37](http://packaging-farm.dachary.org/downloads/)
release. It can be imported using:

~~~
curl http://packaging-farm.dachary.org/download/packaging-farm.gpg | sudo apt-key add -
~~~


Two variables were added to the packaging-farm configuration file to
instruct dpkg-buildpackage and repreprothat they must sign the packages
and repositories.If the GPG private key for the packager (as listed in
the debian/changelogfor instance) is found (in the home of the user
building the package)and that SIGN\_debian is provided the packages will
be signed with it.The relevant packaging-farm.conf(5) lines are:

~~~
#
# Signing related options for Debian GNU/Linux
# See dpkg-buildpackage(1) for more information
#
SIGN_debian=-k840233
~~~


If the GPG private key for the packager (as listed in the
debian/changelogfor instance) is found (in the home of the user building
the packages)and that SIGN\_WITH is set the packages and the content of
the repository will be signed with it.The relevant
packaging-farm.conf(5) lines are:

~~~
#
# Signing related options for Debian GNU/Linux
# See reprepro(1) for more information
#
#SIGN_WITH=SignWith: yes
SIGN_WITH=
~~~


#### packages versioning

The package version policy as found in the proformatique internal wiki
is:

### Packages Externes

La source pourra être Debian ou n'importe quel autre source fiable de
ports et backports.Le nom du package devra rester identique à la version
originelle.Nos uploads seront considérés comme des NMU, et le sufixe
utilisé pour la version du package sera selon les cas :

-   +pf.&lt;n&gt; : packages généraux ne faisant partie d'aucun projet
    (&lt;n&gt; étant la révision Proformatique pour la même
    version Debian)
-   +pf.&lt;project&gt;.&lt;ver&gt; : packages contenant des correctifs
    ou améliorations *'spécifiques*' à un projet, comme xivo / eyefar
    / ... (&lt;project&gt; étant le nom du projet commercial et
    &lt;ver&gt; la version du projet (et pas du composant en question))

Dans d'un sufixe contenant une version qui n'est pas finale, il faut
rajouter l'information de révision (SVN par exemple) de cette façon
:.&lt;project&gt;.&lt;ver&gt;\~&lt;rev&gt; (avec &lt;ver&gt; la version
de la dernière release / branche stable, et &lt;rev&gt; du style "svn42"
/ "baz42" / "rc3" / ...)Examples :

-   1.6.8p12-4 -&gt; 1.6.8p12-4+pf.1, puis 1.6.8p12-4+pf.2, ...
-   1.6.8p12-4 -&gt; 1.6.8p12-4+pf.xivo.0.5, puis
    1.6.8p12-4+pf.xivo.0.5<a></a>svn103
-   (cas d'une nouvelle version upstream) 1.6.8p12-4 -&gt;
    1.6.10-0+pf.1, ...

### Packages Proformatique

Nous n'utiliserons pas de packages natifs, vu que ce ne seront
généralement pas les même personnes qui feront la dev et le packaging.
Les données de packaging pourront cependant être mis dans un RCS séparé
si besoin.Le nom du package suivra la forme : pf-&lt;project/usage&gt;
(avec &lt;project&gt; le nom du projet éventuellement suivi du
sous-projet : &lt;project&gt;-&lt;subproject&gt;, ou &lt;usage&gt; pour
un usage spécifique comme les meta-packages)La version suivra la forme :
&lt;ver&gt;-&lt;debver&gt; ou &lt;ver&gt;\~&lt;rev&gt;-&lt;debver&gt;
(avec &lt;ver&gt; et &lt;rev&gt; comme pour les packages externes)Par
exemple paquet *pf-xivo-web-interface* version *1.2.3\~svn123-1* pour du
developpement ou *1.2.3-1* pour une release.Le Maintainer du package
sera : *Proformatique Maintainance Team
&lt;technique@proformatique.com&gt;*On ajoutera dans les Uploaders la
liste de toutes les personnes attachées à son entretient.

### implementation in submit-xivo.sh

After discussions with Nicolas Hicher and Sylvain Boily, the package
version numbers produced by
[submit-xivo.sh](http://packaging-farm.dachary.org/packaging-farm/packaging-farm/submit/submit-xivo.sh)
must start with the upstream version and ends with a version number
computed from the date and a mercurial hash. It is computed for packages
for which a \*-VERSION file found in the corresponding [source
directory](http://git.xivo.io/xivo-skaro.git/).

</p>

