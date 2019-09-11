Title: Un système de téléphonie sans matériel ?
Date: 2017-06-12
Author: Sylvain Boily
Category: Wazo
Slug: wazo-unicom-fr
Status: published


On me demande assez régulièrement la différence entre XiVO et Wazo en terme de fonctionnalités. Il en existe maintenant beaucoup, mais une des premières que nous avons mises en œuvre était tout simplement de fournir une interface complètement web orientée utilisateur pour gérer sa téléphonie de tous les jours. Le développement de cette interface se voulait complètement web, utilisant nos APIs et aussi orienté vers l'aspect "CLOUD". Il fallait que cela soit simple à utiliser, simple à mettre en place et que la mobilité soit au rendez-vous. Finalement Unicom est né.

![unicom.png](/public/wazo-unicom/unicom.png "Unicom")

# Unicom

Mais qu'est-ce donc qu'Unicom? J'ai eu beaucoup de discussions et j'avais en tête deux cibles lorsque je l'ai mis à disposition de tous. La première était de fournir un logiciel SaaS (Software as a Service), donc pas de mise à jour à gérer, pas d'installation à faire, une mobilité accrue, mais aussi de montrer une voie possible avec Wazo pour les personnes souhaitant développer leur propre valeur ajoutée autour de Wazo en utilisant nos APIs. Cela permet d'en faire un démonstrateur mais aussi une source à idées permettant d'échanger de manière constructive avec les acteurs du marché.

Pour utiliser Unicom, rien de plus simple, rendez-vous sur le [site web d'Unicom](https://phone.wazo.community) avec un navigateur web récent. Sont supportés:

- Mozilla Firefox
- Chromium
- Chrome
- Opera

Une fois arrivés sur la page, vous allez pouvoir tout simplement configurer votre connexion vers votre Wazo.

![unicom-menu-configuration.png](/public/wazo-unicom/unicom-menu-configuration.png "Unicom menu configuration")

Sélectionner le petit stylo jaune après avoir passé votre souris sur le petit moteur bleu en bas.

![unicom-configuration.png](/public/wazo-unicom/unicom-configuration.png "Unicom configuration")

Dans les paramétrages vous allez simplement mettre l'adresse de votre Wazo (`10.41.0.2` dans l'exemple). Un point important: vous pouvez mettre l'adresse publique ou celle du réseau local. Unicom est simplement une interface web qui permet à votre navigateur web de communiquer directement avec votre Wazo. Aucune donnée ne passe par le serveur de Unicom. Concernant le port, mettez simplement le 443, excepté si vous décidez par exemple d'ouvrir un port spécifique depuis l'extérieur, par exemple le 8443.

Une fois votre configuration terminée vous n'aurez plus qu'à vous connecter.

![unicom-login.png](/public/wazo-unicom/unicom-login.png "Unicom login")

L'interface se tient dans une seule page web et vous offre toutes les fonctionnalités attendues par un système téléphonique moderne.

- Gestion des appels
- Gestion de la présence
- Messagerie instantanée
- Gestion des renvois d'appel
- Boite vocale
- Journaux d'appels
- Contact personnel ou partagé
- Agent de centre d'appel
- etc.

![unicom-vue.png](/public/wazo-unicom/unicom-vue.png "Unicom vue")

Plusieurs subtilités existent dans le logiciel. La première étant que nous supportons deux façons d'utiliser son téléphone. La première façon est qu'Unicom vient se mettre en complément de votre téléphone VoIP branché sur votre Wazo. Quand vous serez connecté sur Unicom, si vous avez simplement un téléphone IP d'une marque X, vous aurez toutes les fonctionnalités à la différence près que vos appels seront pilotés et non directement dans l'interface. (J'y reviens après)

Exemple: Je cherche le contact Jean, je clique dessus pour l'appeler, mon téléphone IP sonne, je le décroche et je suis mis en relation avec Jean. Unicom sera donc un assistant web pour votre téléphone IP.

À la différence, si vous n'avez pas de téléphone IP, vous pouvez choisir dans l'interface de Wazo de créer un utilisateur ayant la capacité d'avoir une ligne avec la technologie WebRTC. Beaucoup de grand mots techniques ici, mais c'est tout simplement avoir de la communication temps réel dans un navigateur web. Dans notre cas avoir son téléphone dans son navigateur web.

L'ergonomie de l'interface sera alors la même, mais vous n'aurez plus besoin d'avoir de téléphone physique, un simple navigateur web avec un micro/casque fera l'affaire. Gros avantage, c'est que vous devenez alors complètement nomade sans avoir à installer aucun logiciel. De plus Wazo supporte le codec Opus permettant d'avoir une meilleure expérience avec cette façon de téléphoner. Personnellement depuis que j'utilise Unicom, je ne touche plus à mes téléphones de bureau. De plus pour le télétravail cette solution est tout simplement magique et extrêmement simple à mettre en œuvre.

Ceci étant comme je le détaille en dessus, je parle soit d'avoir un téléphone physique, soit d'avoir un téléphone dans mon navigateur web, mais pas d'avoir les deux. Et bien voici une autre subtilité de Wazo couplé à Unicom, Wazo supporte la possibilité d'avoir sur un utilisateur du système plusieurs lignes différentes et surtout avec des configurations bien différentes. Par exemple je peux avoir un téléphone Cisco qui utilise le protocole SCCP, mais aussi sur le même numéro mon téléphone web. Il suffira simplement dans l'interface de Wazo d'ajouter une nouvelle ligne à votre utilisateur.

Mais donc dans Unicom, comment ça se passe ? Encore une fois c'est simple, lorsque vous allez vous connecter, Unicom va détecter que vous avez plusieurs lignes et vous demandera laquelle vous souhaitez utiliser. Si vous souhaitez passer sur une autre ligne, il suffira de recharger la page et de refaire votre choix.

![unicom-choice-lines.png](/public/wazo-unicom/unicom-choice-lines.png "Unicom choice lines")

Enfin, dans les détails non visibles, mais qui ont de l'importance, Unicom supporte aussi le chat/présence entre vos différents Wazo. Si vous avez par exemple deux Wazo car un en France et un au Canada, vous pourrez les connecter ensemble et faire en sorte que vos utilisateurs puissent ne pas sentir qu'il existe deux systèmes mais simplement un seul.

Je vous détaillerai dans un autre article d'autres fonctionnalités, en espérant que celle-ci vous donne envie de rejoindre la communauté Wazo. Comme toujours, n'hésitez pas à communiquer avec nous, nous remonter des idées, informations ou même de contribuer à cette formidable aventure!

/sylvain
