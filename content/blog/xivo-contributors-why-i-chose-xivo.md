Title: XiVO contributors: Why I chose XiVO?
Date: 2015-04-13 20:36
Author: vdagrain
Category: XiVO Contribution
Slug: xivo-contributors-why-i-chose-xivo
Status: published

--- *Summary in english*

-   To better know each other skills and projects, we organised a survey
    about XiVO contributors ([in
    french](/index.php?post/2015/04/07/Les-contributeurs-de-la-communaut%C3%A9-XiVO))
    and a meeting with the [1st BarCampIRC about VoIP open
    source](barcamp.org/w/page/94666184/BarCampIRC-Québec) with a
    [report](/images/blog/BarCampIRC-1ereRencontreSurVoIP-CRv01.pdf). During
    this meetings, some contributors send their opinions about "Why I
    chose XiVO". This is the debriefing from d\_raven, a
    XiVO contributor. This is the summary. The full document following
    is in french.

<!-- -->

-   1\. The company's activities
-   2\. The specification and the idea of ​​setting up
-   3\. The costs were astronomical
-   4\. I looked at free and paid solutions
-   5\. After some research, I found XiVO

--- *The full article in french*

Pour mieux connaître les compétences et projets de chacun, nous avons
organisé [un sondage sur les contributeurs
XiVO](/index.php?post/2015/04/07/Les-contributeurs-de-la-communaut%C3%A9-XiVO)
et [une 1ère rencontre avec un BarCampIRC sur la VoIP open
source](barcamp.org/w/page/94666184/BarCampIRC-Québec) dont voici le
[compte-rendu](/images/blog/BarCampIRC-1ereRencontreSurVoIP-CRv01.pdf).
Durant ces rencontres, les contributeurs ont échangé leurs avis, dont
"Pourquoi j'ai choisi XiVO". Ceci est le témoignage de d-raven, un
contributeur.

**1. Les activités de l'entreprise**

-   "Nous gérons environs 20 points de ventes grand public et points de
    ventes en France. Orange gère la formation et l'accès à ses propres
    outils mais notre entreprise est libre pour la mise en place de
    l'infrastructure informatique, réseau et télécom.
-   Nos points de ventes sont reliés à notre système d'information par
    des VPNs que nous gérons nous même. Chaque point de vente possède un
    certain nombre de ligne mais qui sont de simple lignes analogiques
    (avec un accès ADSL par ligne). Aussi, afin de faire évoluer
    l'ensemble et permettre une meilleure collaboration de nos équipes
    de ventes, et surtout d'avoir une meilleure ergonomie dans la
    gestion des appels téléphonique à nos vendeurs, nous avons décidé de
    nous équiper d'un IPBX.
-   *Novembre 2013*: Nous avons donc contacté les équipes de ventes de
    la section entreprise de l'opérateur (OBS), c'est à dire Orange.

**2. Le cahier des charges était simple**

-   Le Système permettant de relier plusieurs sites entre eux
    (environ 25) ; téléphone sur IP uniquement ; possibilité de
    réutiliser (dans certains cas) les postes DECT installés sur place
    (en particulier les points de ventes) ; créer des conférences ;
    créer des groupements de postes ; d’enregistrer à la volée les
    appels ; avoir des stats détaillées des communications ; connaître
    l'état d'un poste (en communication ou pas) ; avoir une fonction ACD
    (si on en a besoin) ; avoir un client sur le poste de l'utilisateur
    permettant d'afficher les appels reçus ; nombre de poste : 80 de
    type DECT et 20 type FIXE ; pas de choix défini pour la marque de
    l'IPBX; possibilité d'avoir un IPBX virtualisable ; mutualiser les
    appels et faire baisser très nettement les coûts de communication.
-   L'idée de mise en place est simple : Pour chaque ordinateur installé
    dans les points de ventes , 1 DECT devait être installé. On avait
    demandé un lien avec Lync (de Microsoft), on pensait pouvoir changer
    l'état du poste (comme étant occupé sur Lync) si quelqu'un appelait
    sur le poste DECT.

**3. Les coûts étaient astronomiques**

-   *Mai 2013*: Après environ 4 mois d'attente, nous avons eu quelques
    réponses vagues. Après 6 mois, nous avons eu 2 devis.
-   115 000 euros pour l'un et 111 000 euros pour l'autre.
-   A cela, il fallait en plus: prévoir les postes DECT et fixes (aucun
    n'est inclus dans les propositions); prévoir les liens
    d'interconnexion pour acheminer les appels voix (donc le trunk
    vers l'opérateur) ; le coût des communications, tout était facturé à
    l'utilisation (temps réel , pas de forfait) ; le prix des serveurs
    pour une des deux propositions était virtualisé mais auquel je
    devais fournir le matériel.

<!-- -->

-   Je leur ai demandé pourquoi ils n'avaient pas inclus la possibilité
    d'enregistrer des appels à la volé. Réponse : « on peut le faire,
    mais c'est une option, il faut rajouter un boîtier sur votre réseau
    et çà vous coûtera environ 40 000 euros !!! »
-   Après encore plusieurs mois de patience, ils sont revenus pour
    savoir si on signait. Je leur ai indiqué que çà ne serait pas le cas
    avec un tel coût. Je leur ai indiqué que je souhaitais vraiment
    l'option d'enregistrement à la volée, mais pas à ce prix. Réponse :
    « Monsieur , le plus simple est d'utiliser un enregistreur de type
    "dictaphone" et de le connecter à votre téléphone s'il possède une
    prise casque jack 3.5 ! » On a mis de côté leurs offres.
-   *Mai 2014*: Ils sont revenus une nouvelle fois pour relancer
    le projet. Ils m'ont demandé de revoir mon cahier des charges ... à
    la baisses certains fonctions étant impossibles à obtenir
    (l'enregistrement pas exemple) sans y mettre les
    moyens (financiers). Je n'ai pas donné suite ... et j'ai décidé de
    chercher une solution plus souple , moins propriétaire et avec
    laquelle on pourrait faire ce que l'on veut.

**4. Du côté des solutions gratuites et payantes**

-   Solution Asterisk:
    <ins>
    Elastix, FreePBX, SwitchVox
    </ins>
    .
-   Solution autre:
    <ins>
    FreeSwitch
    </ins>
    (avec interface graphique :
    <ins>
    FusionPBX / Bluevox
    </ins>
    ),
    <ins>
    3CX
    </ins>
    .
-   Bref, c'était sympa, mais Switchvox n'étant pas disponible
    directement en France, il fallait passer par un revendeur étranger
    et nous étions toujours limité pour certains trucs, car le système
    Asterisk est fermé. 3CX était pas mal, mais bon avoir un IPBX qui
    tourne sous Windows ... c'est pas génial.

**5. Après quelques recherches, j'ai découvert XiVO**

-   J'ai testé le produit, commencé à l'adapter (car j'ai des besoins
    spécifiques et j'aime bien toucher un peu à tout et mâitriser le
    produit que j'utilise).
-   Nous avons alors fait le choix suivant : XiVO comme infrastructure
    principale et 3 liens Trunks (OVH et OPENIP).
-   Nous allons voir pour y ajouter :
    <ins>
    FreeSwitch
    </ins>
    pour le système des réunions (nous souhaitons avoir le double
    système de code pin : organisateur/utilisateur, car ce dernier est
    utilisé pour les conférences sur le système de conférence d'Orange)
    ;
    <ins>
    ICTFax
    </ins>
    pour la partie émission / réception fax (qui ne peut se lier qu'à un
    système FreeSwitch) &lt;- nous souhaitons utiliser la fonction
    email-to-fax (avec accusé de réception) ;
    <ins>
    Kamailio ou repo
    </ins>
    comme serveur proxy , le but étant de permettre à certains
    utilisateurs de se connecter à notre serveur XiVO depuis Internet ,
    sans que ce dernier soit directement relié à Internet (en gros avoir
    un "reverse-proxy" pour la partie SIP de XiVO)

<!-- -->

-   Si nous arrivons à tout intégrer à XiVO (double pin pour les
    conférences et email-to-fax), nous supprimerons les ajouts
    (FreeSwitch et ICTFax).
-   Nous avons déjà commencé à déployer XiVO, pour l'instant, il est en
    local, il n'y a pas encore de poste installé sur les points de vente
    (je viens juste de finir la QOS sur les routeurs). Les postes
    installés sur place (pour essai et mise en production dans certains
    cas): Cisco SPA525G2, Yealink T46G et T48G, Aastra 6867i, Cisco
    SPA112, Gigaset C530IP, Polycom IP 5000.
-   Je vais aussi tester et connecter un Cisco 9971 et un Cisco 7941, et
    deux autres modèles, un Cisco SPA3102 et un DECT Aastra histoire de
    voir ce que çà donne.
-   Tous les postes sont ou seront connectés à XiVO uniquement , aucun
    poste ne sera utilisé sur FreeSwitch (sauf pour tester). Voilà où
    j'en suis en *avril 2015*."

d-raven

*d-raven&gt; je pense que la meilleur façon de convaincre, c'est de
montrer que çà fonctionne !!*

</p>

