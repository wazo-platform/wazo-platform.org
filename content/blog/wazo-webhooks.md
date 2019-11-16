Title: Webhook coming in Wazo
Date: 2017-05-18
Author: Sylvain Boily
Category: Wazo
Slug: wazo-webhook
Status: published

Depuis plusieurs mois nous travaillons activement pour améliorer Wazo et le rendre le plus ouvert possible. La dernière version 17.07 mets en lumière nos derniers travaux et nos développements actuels autour de Wazo.  Vous découvrirez ainsi : une nouvelle interface web basée sur nos APIs REST, une place de marché pour permettre d'étendre Wazo facilement, des nouvelles fonctionnalités comme les menus vocaux, les lignes multiples pour un utilisateur, etc.

Mais nous avons encore quelques surprises pour vous au cours des prochains mois ! Avec en tête l'objectif de créer une plateforme de téléphonie à votre image, vous permettant de construire votre système sur mesure, il nous est apparu nécessaire de développer un outil rendant possible l'interconnexion avec une plateforme proposant plus de 700 autres produits intéressants sur le marché.

J'ai donc commencé un travail d'un connecteur sur une plateforme appelée Zapier. Pour ceux qui ne connaissent pas rendez-vous directement sur leur [site web](http://zapier.com) et créez vous un compte pour tester, c'est gratuit.

![zapier.png](/images/blog/wazo-webhook/zapier.png "Zapier website")

# Zapier

Zapier est une plateforme cloud, avec des centaines de connecteurs vous permettant de faire 3 choses.

- Un "trigger"
- Une action
- Un "search" (qui est une action aussi)

Le "trigger" est une action à un temps donné. Exemple avec le cas de Wazo, récupère moi mes derniers journaux d'appel. Une petite particularité dans Zapier, c'est qu'un trigger est exécuté par défaut toutes les 5 ou 15 minutes selon votre type de compte. Bien sur il existe aussi un autre type de "trigger" appel "instant trigger" qui lui permet de recevoir un évènement. Le mécanisme de Zapier est appelé REST hooks et ils ont fait un [site web](http://www.resthooks.org) pour en expliquer leur vision.

Une fois que vous avez choisi votre "trigger", zapier vous offre la possibilité avec le résultat d'en faire une action. Les applications Zapier doivent donc offrir un mécanisme de "IN" et de "OUT". Prenons toujours notre exemple avec Wazo, mon "IN" sera donc un trigger de mes journaux d'appels et mon "OUT" sera par exemple une action pour envoyer mes données vers une feuille de calcul Google Sheets.

Le fonctionnement sera alors le suivant: toutes les X minutes, Zapier fera une requête sur mon Wazo, si j'ai eu de nouvelles entrées alors Zapier les enverra sur ma feuille Google. Simple non ?

Donc comment cela se configure ? Premièrement vous devez avoir une compte sur la plateforme Zapier, vous allez simplement cliquer sur "MAKE A ZAP" puis vous allez choisir votre application "IN", c'est à dire votre "trigger".

![zapier-trigger.png](/images/blog/wazo-webhook/zapier-trigger.png "Zapier trigger")

Une fois votre choix fait, vous allez simplement choisir les "triggers" disponible.

![zapier-trigger-choice.png](/images/blog/wazo-webhook/zapier-trigger-choice.png "Zapier trigger choice")

Puis vous allez créer un compte de connexion entre Zapier et votre Wazo. Attention, un prérequis important: votre Wazo doit être accessible par Zapier sur le port 443 pour accéder aux APIs de Wazo.

![zapier-account.png](/images/blog/wazo-webhook/zapier-account.png "Zapier account")

Une fois votre connexion établie vous n'aurez plus qu'à choisir votre application "OUT", c'est à dire l'action souhaitée. À partir du moment où votre "ZAP" est créé, vous n'avez plus rien à faire: Zapier et Wazo travailleront ensemble et automatiseront votre export. Bien sûr ceci est simplement un exemple, je vous laisse parcourir les centaines d'applications et trouver ce qui vous intéresse le plus.

Il est aussi intéressant d'avoir d'autres ouvertures possibles. Cela m'a amené à développer un nouveau service dans Wazo permettant cette ouverture vers de nombreuses applications. Mon prochain exemple sera basé sur un logiciel libre qui monte et se présentant comme une véritable alternative à SLACK qui est une plateforme de communication temps réel (un IRC plus évolué), appelé Mattermost. Il en existe probablement d'autres, mais nous utilisons Mattermost en interne depuis un long moment et donc nous connaissons mieux ce logiciel.

# Mattermost

Si vous souhaitez avoir plus d'informations sur Mattermost, je vous invite à consulter leur site web [directement](http://mattermost.org). Nous utilisons de notre côté la version communautaire et nous sommes globalement toujours à jour.

![mattermost.png](/images/blog/wazo-webhook/mattermost.png "Mattermost screenshot")

Mattermost offre la possibilité comme dans SLACK de faire des webhooks de type "IN" ou "OUT", ça ressemble à Zapier un peu ;). Le webhook de type "IN" est simplement une interface HTTP où l'on va envoyer un message en format JSON. C'est assez basique, mais très simple à mettre en oeuvre.

Pour ce faire, il suffit d'aller dans la console de Mattermost, de choisir "intégrations" et de créer un webhook de type incoming. Vous choisirez alors le canal où vous souhaitez recevoir le message.

![mattermost-webhook.png](/images/blog/wazo-webhook/mattermost-webhook.png "Mattermost webhook")

Un exemple assez simple du message à poster dans votre requête:

    {
      "username": "quintana",
      "text": "Salut c'est sylvain"
    }


Facile :)


Revenons à Wazo ! Comme toujours, quand on développe dans Wazo, il est obligatoire d'offrir une interface REST pour cette fonctionnalité, ce qui permet aussi d'ajouter simplement un plugin dans notre nouvelle interface de gestion.

![wazo-webhook-api.png](/images/blog/wazo-webhook/wazo-webhook-api.png "Wazo webhook API")

Dans le cas de Wazo, voici à quoi cela va ressembler.

![wazo-webhook.png](/images/blog/wazo-webhook/wazo-webhook.png "Wazo webhook")

Comment cela fonctionne ? Nous avons pris l'habitude depuis plusieurs années d'envoyer un évènement dans notre bus (basé sur RabbitMQ) à chaque évènement. Ce qui veut dire par exemple que lorsqu'on reçoit un appel sur son téléphone, nous avons un évènement qui est envoyé dans le bus avec comme nom "call_created".

Voici une idée d'exemple concret avec Mattermost et Wazo. Je souhaite recevoir sur un channel, l'information que mon téléphone sonne. Pour le mettre en œuvre, il suffira alors de:

- Créer un webhook de type incoming sur Mattermost vers un canal défini.
- Récupérer l'adresse de ce webhook.
- Créer un webhook sur Wazo sur l'évènement "call_created" qui enverra sur l'adresse HTTP de Mattermost le JSON décrit ci-dessus.

Ouf on y arrive.

Créer le wekhook sur Wazo, il faut le plugin wehbook de Wazo, puis appuyer sur le petit plus pour en ajouter un nouveau.

![wazo-webhook-create.png](/images/blog/wazo-webhook/wazo-webhook-create.png "Wazo webhook create")

Vous allez entrer un nom, par exemple "Mattermost call created" puis:

- Event Name: "call_created"
- Target: `http://mattermost/hook/monhook`
- Method: "post" (les hooks de mattermost sont des POST)
- Content Type: Nous laisserons du JSON
- Users: Vous allez choisir de quel utilisateur vous souhaitez faire un webhook.
- Template: Notre fameux JSON du dessus.

![wazo-webhook-edit.png](/images/blog/wazo-webhook/wazo-webhook-edit.png "Wazo webhook edit")

Les templates sont basés sur des templates Jinja et vous pouvez donc récupérer les informations du message dans votre template en utilisant la syntaxe `{{ payload }}`. Example: `{{ payload.user_uuid }}`.

Une fois votre webhook terminé, il suffira de recevoir et d'émettre un appel et vous recevrez en temps réel sur votre canal Mattermost l'information donnée.

Exemple avancé:

![mattermost-webhook-example.png](/images/blog/wazo-webhook/mattermost-webhook-example.png "Mattermost webhook example")

J'espère que cette information vous sera utile et vous permettra de mieux comprendre ce que vous allez pouvoir faire avec Wazo très bientôt !

N'hésitez pas à communiquer avec nous et nous remonter vos remarques sur [le forum Wazo](https://wazo-platform.discourse.group).

/sylvain
