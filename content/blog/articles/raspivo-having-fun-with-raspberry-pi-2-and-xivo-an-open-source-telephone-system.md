Title: Raspivo, having fun with Raspberry Pi 2 and XiVO, an open source telephone system
Date: 2015-06-12 18:40
Author: vdagrain
Category: XiVO Community
Slug: raspivo-having-fun-with-raspberry-pi-2-and-xivo-an-open-source-telephone-system
Status: published

(L'article au complet en français, juste après)

**Raspivo, having fun with Raspberry Pi 2 and XiVO, an open source
telephone system**

-   In 2012 a first attempt was made at integrating a raspberry-pi and
    XiVO, a telephone system based on Asterisk and licensed under GPLv3.
    More info at
    [http://www.raspberry-xivo.org](http://www.raspberry-xivo.org/).
-   Furthermore, the arrival of the raspberry pi version 2 has opened up
    new technical avenues. That's why in may 2015, Jof launched the
    project Raspivo, Raspberry Ri 2 + XiVO = Raspivo. Blog and more info
    at <http://raspivo.io>

**The beggining of the adventure with raspberry pi 2, XiVO and
Raspbian**

-   Iris-Network (http://www.iris-network.fr), a telecommunications
    company based in France, decided to launch a new project combining
    XiVO and Raspberry-pi 2, a low-cost embedded platform.
-   This article summarizes the installation of Raspbian, the
    recompilation of XiVO packages for the ARM platform, and testing
    that was done on incoming and outgoing calls in order to validate
    the quality and the stability of the architecture.

<!-- -->

-   During the tests, 12 simultaneous calls were successfully handled in
    optimal conditions.
-   In order to test the project in real world conditions, the team at
    Iris-Network replaced their internal telephone system, along with
    the hotline platform, with a RPi2 server. So far, everything remains
    stable and running ! Currently, testing is progressing with the help
    of beta-testing customers. In the spirit of sharing and respect for
    the open source philosophy, work on the project has been made
    available to the public by publishing debian packages.

**Installation using the debian repository and raspbian IMG**

-   4 main steps to installing raspivo (RPi2 + XiVO): 1. Install
    Raspbian (Debian for Raspberry Pi); 2. Install any other packages
    you typically need for administering a server; 3. Add the raspivo
    respository; 4. Install raspivo. More information available here (in
    french): [http:
    //www.raspivo.io/installation-depuis-nos-depots.html](http:%20//www.raspivo.io/installation-depuis-nos-depots.html)

<!-- -->

-   From a disk image (IMG): To make installation easier, a complete
    disk image can be downloaded, taking less than 5 minutes to install.
    In the same way as you would install Raspbian, you can also install
    Raspivo thanks to 'dd': dd if=Raspivo-15.10.img of=/dev/sdX
    (replacing sdX with the partition of your sdcard).

<!-- -->

-   The changelog for XiVO is available here
    http://projects.xivo.io/versions/223 and you can find more news on
    raspivo here http://www.raspivo.io/version-1510.html.
-   The project would be grateful to hear from anyone who would be
    interested in testing or any other feedback.
-   "These tutorials will help me during my presentation on raspberry pi
    2 with XiVO for workshops for a local fablab in Quebec" wanda,
    member of http://espace-lab.org; "[Raspivo](Raspivo "Raspivo") is a
    new initiative from the community ! Have fun ! I'm very happy with
    xivo on raspberry pi. " quintana, <http://www.raspberry-xivo.org/>.

<!-- -->

-   Feel free to share and have fun with this open source project and
    the logo [raspivo.io](raspivo.io) ! :)
-   Jof and wanda. Licence CC by sa 4.0

------------------------------------------------------------------------

**Raspivo, s'amuser avec raspberry pi 2 et XiVO système en téléphonie
open source**

-   En 2012, des ateliers ont commencé sur raspberry-pi et XiVO (système
    de téléphonie, basé sur Asterisk et sous licence GPLv3).

Toutes les étapes ici:
[www.raspberry-xivo.org](http://www.raspberry-xivo.org)

-   Avec l'arrivée de la version 2 de raspebrry pi, de nouvelles
    possibilités sont maintenant offertes : en mai 2015 Jof lance
    "raspberry pi 2 + XiVO = raspivo"

Retrouvez les tests et tutoriaux sur mon/notre blog <http://raspivo.io>

**Le début de l'aventure raspberry pi 2, XiVO et Raspbian**

-   Iris-Network (http://www.iris-network.fr), entreprise experte en
    télécommunications, a lancé l'expérience XiVO sur Raspberry-pi 2,
    plate-forme compacte à moindre frais.
-   Cet article présente l'installation de Raspbian, la compilation des
    paquets XiVO compatible pour plateformes ARM, des tests sur les
    appels entrants et sortants pour valider la qualité et la stabilité
    de cette architecture.
-   Lors des tests, 12 appels simultanés ont été effectués dans des
    conditions optimales. Pour passer en conditions réelles, l'équipe
    d'Iris-Network à basculé son système de téléphonie interne ainsi que
    sa plateforme de hotline sur ce RPi2. Tout est fonctionnel et fiable
    ! Actuellement, ces tests continuent avec l'aide de
    clients beta-testeurs.
-   Dans un soucis de partage et de respect de la philosophie
    OpenSource, ce travail est mis à la disposition de la communauté,
    sous forme de paquets Debian.
-   En savoir plus: http://www.raspivo.io/raspivo.html

<!-- -->

-   <ins>
    Installation depuis les dépôts et depuis une image disque
    </ins>
    (IMG)
-   Depuis les dépôts, l'installation de raspivo (RPi2 + XiVO) se
    déroule en 4 étapes: 1. Installation de raspbian (Debian pour
    Raspberry Pi) ; 2. Installation de logiciels typiques pour
    l'administration

3\. Ajout du dépot raspivo ; 4. Installation de raspivo.

-   En savoir plus:
    [www.raspivo.io/installation-depuis-nos-depots.html](http:%20//www.raspivo.io/installation-depuis-nos-depots.html)

<!-- -->

-   <ins>
    Depuis une image disque (IMG):
    </ins>

Pour faciliter le déploiement, une image complete est mise à disposition
: l'installation prend moins de 5 minutes.De même que pour une
installation de Raspbian classique, vous pouvez également installer
Raspivo grace à 'dd' :dd if=Raspivo-15.10.img of=/dev/sdX et en adaptant
bien sur sdX par votre SdCard.

**La version 15.10 de XiVO packagée pour votre Raspberry 2**

-   Voici le changelog http://projects.xivo.io/versions/223 et les
    nouveautés http://www.raspivo.io/version-1510.html
-   Merci de nous envoyer vos témoignages ou vos tests. "Ces tutoriaux
    vont m'aider a présenter raspberry pi 2 avec XiVO, pour des ateliers
    dans un fablab local à Québec" wanda, membre de l'Espace Lab et
    community manager XiVO ; au sujet de Raspivo, "c'est une nouvelle
    initiative de la communauté ! Amusez-vous bien, avec XiVO et le
    raspberry pi. " quintana,
    [www.raspberry-xivo.org](http://www.raspberry-xivo.org/). Merci de
    partager la doc. de ce projet open source et le logo
    [raspivo.io](raspivo.io) ! :)

<!-- -->

-   Jof et wanda. Article en CC by sa 4.0

</p>

