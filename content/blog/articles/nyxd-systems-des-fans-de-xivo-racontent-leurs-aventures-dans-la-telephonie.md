Title: NyXD Systems, des fans de XiVO racontent leurs aventures dans la téléphonie
Date: 2015-01-29 13:57
Author: vdagrain
Category: XiVO Contribution
Tags: NyXD Systems
Slug: nyxd-systems-des-fans-de-xivo-racontent-leurs-aventures-dans-la-telephonie
Status: published

Summary: NyXD Systems is a team passionated for computer science and
telecommunication systems, founded in 2006, near Paris (France). This
interview shows how they made communicate computers, installed a
network, configured a VPN on their routers, set a hosting services.
Exploring XiVO software, they contacted the developers. Thanks to this
meeting, NyXD wrote a tutorial to share their achievements.

*Article en cc by sa 3.0 2015 - par Valérie Dagrain*

#### **Bonjour NyXD Systems, pouvez-vous présenter comment a débuté votre aventure dans la téléphonie?**

![logo2015\_200\_100.png](/public/logo2015_200_100.png "logo2015_200_100.png, janv. 2015")

**"Bonjour Valérie, NyXD Systems est un collectif de jeunes passionnés
d'informatique, télécommunications et T.I, fondé en 2006, près de Paris
(France).**

- "**Je suis Thomas, l'un des rédacteurs du blog de \[NyXD
Systems**|http://retroplace.nyxd.org/\] depuis 2012 et également l'un
des deux membres fondateurs. Nous sommes un groupe de 4 amis:Kevin et
moi avons commencé à bidouiller quand nous étions au lycée vers 2005 et
découvert qu'il était bien plus amusant de faire communiquer des
ordinateurs que de les laisser seuls dans leur coin.

- **Kevin, également rédacteur et je suis l'autre membre fondateur de
[NyXD Systems](/index.php?tag/NyXD%20Systems)**. Ma passion pour
l'informatique m'a rapidement rapproché de Thomas, et nous avons assez
vite eu l'envie de mettre des ordinateurs sur des réseaux dont nous
avions la maîtrise, et surtout la fierté d'utiliser nos propres
solutions... Quand elles marchaient...NyXD Systems est aujourd'hui bien
plus qu'un petit passe-temps d'adolescent, c'est un projet qui me tient
énormément à cœur, et qui m'a permis de m'éclater tout en apprenant.Côté
téléphonie, je suis plus en retrait par rapport à Thomas à vrai dire :
ce n'est pas moi qui mets en place, mais je suis très fier d'avoir sur
mon bureau un téléphone qui fonctionne grâce à notre réseau, des
connexions VPN qui sont configurées sur nos routeurs, et
[XiVO](http://www.xivo.io/) qui tourne sur l'un de nos serveurs. Deux
autres, Claude et Jean nous ont rejoint en 2014.

- **Claude, membre récent de l'équipe de NyXD Systems.Actuellement en
école d'ingénieur par la voie de l'apprentissage**, j'ai eu l'occasion
d'étudier la solution de téléphonie [Asterisk](/index.php?tag/Asterisk)
(logiciel de référence dans la téléphonie open-source). Par le biais de
NyXD Systems, j'ai ainsi l’occasion de mettre en application via un
réseau réel tout ce que j'ai pu apprendre durant mon cursus scolaire.
Tout comme Kevin, je suis également fier d'avoir un téléphone
d'entreprise sur mon bureau, que je peux utiliser de la même manière que
dans le cadre de mon travail d'apprenti chez Orange.

- **Jean, je suis actuellement lycéen et je m’intéresse très fortement à
l’informatique et à l’électronique.** J’ai intégré NyXD Systems en 2014,
suite à la rencontre de Thomas sur un forum d’utilisateurs de Mac
(MacBidouille), et je m’occupe actuellement de réaliser des programmes
et du matériel sur-mesure pour NyXD Systems. Le réseau et la téléphonie
étant des domaines inconnus pour moi, faire partie de l'équipe me permet
de toucher à de nombreux domaines auxquels je n’aurai jamais pu voir "
l’envers du décor".

Voilà comment "nous avons progressivement évolué en obtenant des
serveurs professionnels, ce qui nous a permis d'apprendre, ce que nous
faisons toujours.Nous touchons un peu à tout, Windows, Mac, Linux, et
même si nous avons moins de compétences sur Linux, je me suis vite rendu
compte que XiVO (système de téléphonie open-source) était très
accessible pour un néophyte en terme d'installation de système IPBX",
précise Thomas.

![2015-XiVO-Remercie-NyXDSystems-01-400.png](/public/2015-XiVO-Remercie-NyXDSystems-01-400.png "2015-XiVO-Remercie-NyXDSystems-01-400.png, fév. 2015")

#### **Avec quel matériel de téléphonie avez-vous commencé?**

- "J'ai trouvé par hasard, un lot de téléphones
[Cisco](/index.php?tag/Cisco) IP Phone 7960 dotés d'un firmware SIP, et
très bon marché sur Ebay vers la mi-2013 et c'est là que tout à
commencé. Nous aimons beaucoup ces téléphones notamment car on peut les
voir dans des films et séries diverses, et je les ai côtoyé à plusieurs
reprises dans les grandes entreprises dans lesquelles j'ai travaillé. Je
n'avais jamais touché à la configuration d'un téléphone IP auparavant.
Je me disais "ça a une prise Ethernet, alors ça doit sûrement marcher
comme un ordinateur en réseau !". Malheureusement, il s'est très vite
avéré que non. Mais ces téléphones étant si agréables à utiliser que je
me suis documenté un peu, ne pouvant rester sur un échec. J'ai donc
commencé par chercher comment créer un réseau de téléphonie interne.
J'aurais pu partir d'une solution ex nihilo, mais la téléphonie étant
vraiment un domaine particulier et alors inconnu pour moi, j'ai préféré
m'affranchir de tout un tas de difficultés en partant d'une distribution
packgée, sans pour autant mettre de côté les rouages qui font que ça
marche, pour me concentrer sur la mise en place. Et c'est là que j'ai
découvert [XiVO](http://www.xivo.io/),
[Elastix](/index.php?tag/Elastix), [FreePBX](/index.php?tag/FreePBX),
etc.

![NyXD-400.JPG](/public/NyXD-400.JPG "NyXD-400.JPG, janv. 2015")

- J'ai commencé avec [XiVO](http://www.xivo.io/) à la toute fin 2013
mais certains détails de fonctionnement étaient encore obscurs pour moi
et rapidement une vidéo sur Elastix m'a permis d'en faire plus. **J'ai
donc testé un peu Elastix, puis FreePBX mais avec beaucoup de
difficultés pour finalement revenir sur [XiVO](http://www.xivo.io/) dont
la qualité de l'interface de gestion, les fonctionnalités et la
simplicité d'installation sont très supérieures.**

- Très rapidement, nous avons mis en place un serveur dédié
[Kimsufi](https://www.kimsufi.com/ca/fr/) chez l'hébergeur OVH, nos
téléphones Cisco chez nous avec un firmware en SIP et derrière des
routeurs pfSense avec le package additionnel siproxd (un proxy SIP) nous
permettant d'avoir facilement plusieurs téléphones sur chaque site. La
configuration de chaque téléphone se faisait totalement à la main ce qui
prenait du temps et surtout compliquait énormément toute modification
ultérieure au déploiement puisqu'il fallait obligatoirement se rendre
sur site.

- Nous avons utilisé cette solution pendant quelques mois début 2014,
sans rencontrer particulièrement de problèmes. D'autres téléphones ont
été ajoutés, pour en avoir une petite douzaine en fonctionnement. Nous
arrivions aisément à passer des appels internes et externes mais nous
avions un stock de téléphones Cisco 7941, impossibles à configurer à la
main tel que nous le faisions. C'est à force de voir ces téléphones
inexploités que j'ai eu envie que notre serveur gère le provisioning,
c'est à dire que depuis le serveur on puisse dire "tel utilisateur
possède telle ligne, il faut l'attribuer à tel ou tel téléphone" et que
sans aucune intervention physique, le téléphone "reçoive" cette ligne et
soit opérationnel immédiatement. Ceci s'inscrivait assez facilement dans
notre changement d'infrastructure. Nos sites étant maintenant raccordés
par VPN, nous avons pu rapatrier le serveur de téléphonie en local, au
siège, et provisionner ainsi tous les téléphones du siège, et à travers
les liaisons VPN, les téléphones d'agences".

#### **Dans quel contexte es-tu venu échanger pour la première fois avec les développeurs XIVO?**

- "J'ai eu un problème majeur dans le déploiement de cette nouvelle
version de notre solution basée sur un [XiVO](http://www.xivo.io/)
auto-hébergé. Au niveau du serveur, nous étions reliés à OVH qui est
notre fournisseur de ligne SIP. Nous avons donc une ligne qui nous
permet d'appeler l'extérieur et d'être appelés. Nous interconnectons
cette ligne avec notre serveur qui contient donc une série de règles qui
définissent son comportement lors du passage d'un appel dans un sens ou
dans l'autre. Le problème que j'avais, c'est que j'arrivais à passer des
appels vers l’extérieur, mais pas dans l'autre direction. J'ai donc
tenté deux ou trois réglages à partir de recherches faites sur le web,
sans succès.

- **En décembre 2014, je me suis donc rendu sur le canal IRC de
[XiVO](http://www.xivo.io/) et alors que je m'attendais à discuter avec
des utilisateurs du logiciel, j'ai parlé en réalité avec l'équipe de
développeurs, sans même le savoir au début. Je n'en espérais pas tant !
Et ils m'ont effectivement aidé à résoudre mon problème** alors que je
n'ai aucun lien avec [XiVO](/index.php?tag/XiVO) ou
[Avencall](/index.php?tag/Avencall), ni contrat de maintenance, ni
partenariat. Je suis juste un utilisateur lambda ayant demandé conseil
aux gens qui développent le logiciel qu'il utilise".

#### **Comment ça c'est passé quand le système a marché?**

- "J'ai pu appliquer en direct les informations données par les
développeurs de [XiVO](http://www.xivo.io/) et lorsque ça a fonctionné,
j'étais très content. Non seulement j'avais appris quelque chose
d'intéressant, mais en plus j'ai eu envie d'en rédiger [un tutoriel, un
guide](http://retroplace.nyxd.org/2015/01/28/xivo-auto-hebergement-telephonie-pfsense-ovh/),
car il aurait été dommage de déranger les développeurs à nouveau pour le
même problème en cas de réinstallation complète du serveur. Une façon de
remercier l'équipe.

- Je ne suis pas franchement ce qu'on peut appeler un libriste (même si
j'apprécie, respecte et encourage le Libre) mais dans mon esprit c'est
assez naturel de partager. J'utilise gratuitement un logiciel libre, je
demande de l'aide que l'on m'apporte, alors je n'ai pas envie de garder
cette aide pour moi, mais au contraire, en faire profiter le plus grand
nombre. Ainsi, si quelqu'un d'autre ayant la même difficulté fait une
recherche, il trouvera sûrement des solutions dans ce [guide
NyXD](http://retroplace.nyxd.org/2015/01/28/xivo-auto-hebergement-telephonie-pfsense-ovh/),
continuera d'utiliser le logiciel, ne dérangera pas l'équipe de
développement (qui doit répondre souvent aux mêmes questions), laissant
plus de temps pour se concentrer sur le développement du logiciel
[XiVO](http://www.xivo.io/). De plus, rédiger un
[tutoriel](http://retroplace.nyxd.org/2015/01/28/xivo-auto-hebergement-telephonie-pfsense-ovh/)
permet in fine d’accroître la quantité et la variété de documentation,
ce qui est appréciable pour tout le monde". Découvrir [le
tutoriel](http://retroplace.nyxd.org/2015/01/28/xivo-auto-hebergement-telephonie-pfsense-ovh/).

~~~
<img src="/public/Capture_d_e_cran_2015-01-28_a__09.19.44.png" alt="Capture_d_e_cran_2015-01-28_a__09.19.44.png" title="Capture_d_e_cran_2015-01-28_a__09.19.44.png, janv. 2015" />
~~~


#### **Que souhaitez-vous continuer de faire avec la téléphonie dans l'avenir, pour 2015?**

- "Je compte déjà peaufiner le fonctionnement de notre solution
actuelle. Avant toute chose, nous devons finaliser et fiabiliser notre
nouvelle infrastructure réseau et concomitamment la téléphonie, qui
exploite ce réseau. Nous avons défini les spécifications d'un kit
"agence" comprenant les équipements vitaux pour équiper une agence
nouvellement créée, comme le routeur, l'onduleur, le téléphone, etc.
Nous travaillons à cela quasiment en permanence car nous utilisons
quotidiennement cette infrastructure, et nous aurons a terme accès aux
profils utilisateurs de n'importe qui depuis n'importe où. Ainsi un
utilisateur d'une agence pourra retrouver son environnement de travail
depuis n'importe quel autre site.

- De la prise en compte de la téléphonie dans nos déploiements
découlerait assurément une synergie importante pour nos apprentissages
futurs et notre capacité à maintenir une infrastructure d'entreprise.".

![2015-XiVO-Remercie-NyXDSystems-02-400.png](/public/2015-XiVO-Remercie-NyXDSystems-02-400.png "2015-XiVO-Remercie-NyXDSystems-02-400.png, fév. 2015")

**Toute l'équipe XiVO vous remercie, pour votre tout [nouveau tutoriel
sur
XiVO](http://retroplace.nyxd.org/2015/01/28/xivo-auto-hebergement-telephonie-pfsense-ovh)
ainsi que votre motivation pour cet interview. Vous êtes les premiers à
inaugurer la rubrique des contributeurs XiVO!**

**Sources:**

-   [Tutoriel de NyXD Systems sur
    XiVO](http://retroplace.nyxd.org/2015/01/28/xivo-auto-hebergement-telephonie-pfsense-ovh/)
-   [Documentation](http://documentation.xivo.io/production/) officielle
    XiVO
-   [Forums XiVO](http://projects.xivo.io/projects/xivo/boards) et canal
    IRC \#XiVO, serveur freenode
-   [XiVO pour les nuls](https://xivopourlesnuls.wordpress.com/)
-   [Tutorial Elastix](https://www.youtube.com/watch?v=PDq1LdXAd14)
-   [PABX Asterisk et
    raspberry-pi](http://www.framboise314.fr/decouvrez-la-framboise314-allo-un-pabx-asterisk-dans-votre-raspberry-pi-partie-2)
-   [Asterisk et
    Cisco](http://www.voip-info.org/wiki/view/Asterisk+phone+cisco+79xx)
    et
    [SIP](http://www.voip-info.org/wiki/view/Setup+SiP+on+7940+-+7960)
-   [Manuel Cisco IP
    Phone7940/7960](http://www.cisco.com/c/en/us/td/docs/voice_ip_comm/cuipph/7960g_7940g/sip/english/user/guide/user/sipuget.html)
    et [Manuel Cisco IP Phone
    7941/7961](http://www.google.ca/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0CCkQFjAA&url=http%3A%2F%2Fwww.telovations.com%2Fattachments%2Fcategory%2F87%2FCisco7941_61_UserGuide.pdf&ei=9cXHVJSVBoGwUausgsgL&usg=AFQjCNF2N6ogonRuM85XqTHYOtNpkj6w2w&sig2=aYV3mEQ9PXhg_50UQ5RjNw&bvm=bv.84349003,d.d24)
-   Configuration d'un [poste
    cisco](http://www.tux89.com/telephonie/configuration-d%E2%80%99un-poste-telephonique-cisco-79407960/)
-   [Forums OVH](http://forum.ovh.com/)

</p>

