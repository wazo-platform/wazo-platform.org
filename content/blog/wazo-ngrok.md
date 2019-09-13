Title: Ngrok s'invite dans Wazo
Date: 2017-05-26
Author: Sylvain Boily
Category: Wazo
Slug: wazo-ngrok-fr
Status: published

Click [here](http://blog.wazo.community/wazo-ngrok-en.html) for the english version.

Ngrok est un logiciel permettant de monter simplement un tunnel inversé pour accéder à votre machine depuis internet. C'est sécurisé et simple à utiliser. C'est très pratique pour exposer par exemple une API interne sur internet sans avoir à configurer pleins d'équipements. Cela peut aussi vous permettre de donner la main en SSH simplement à notre équipe pour vous faire un support distant.

![ngrok.png](/images/blog/wazo-ngrok/ngrok.png "Ngrok website")

# Ngrok

Pour utiliser ngrok avec Wazo c'est aussi très simple. La première chose à faire est de vous inscrire sur le [site](http://ngrok.com) (c'est gratuit) et de récupérer votre token d'authentification. Il est nécessaire pour monter des tunnels.

Pour information nous utilisons la version 2.0 de ngrok. Un certain nombre de fonctionnalités ne seront par contre que disponible si vous prenez un compte payant. Je vous y encourage pour aider l'auteur de ce très bon logiciel, en espérant qu'il repassera ngrok 2 en logiciel libre.

Une fois votre token récupéré, il vous suffira d'aller dans le marketplace de Wazo est d'installer le plugin ngrok.

![wazo-plugin.png](/images/blog/wazo-ngrok/wazo-plugin.png "Wazo ngrok plugin")


Quand votre plugin sera installé, vous aurez alors un menu ngrok qui va apparaître et il vous suffira alors d'aller dans la configuration pour y mettre votre token d'authentification et choisir si vous le souhaitez la zone géographique où le tunnel sera hébergé. Pour le cas de la France par exemple, vous pourrez choisir "Europe".


![wazo-ngrok-config.png](/images/blog/wazo-ngrok/wazo-ngrok-config.png "Wazo ngrok config")


Un fois ngrok configuré, vous pourrez alors créer des tunnels en cliquant sur le menu tunnel. Un certain nombre d'options sont disponible, mais attention sur un compte gratuit, vous ne pouvez pas utiliser toutes les options. Par exemple, le TLS et le sous-domaine ne sont pas des options dans le compte gratuit. Si vous souhaitez par exemple monter un tunnel HTTPS pour vous connecter sur l'interface HTTPS de Wazo, il faut activer le TLS. Vous pourrez par contre utiliser le mode TCP de ngrok vers le port 443 pour y accéder sans problème.


![wazo-ngrok-add.png](/images/blog/wazo-ngrok/wazo-ngrok-add.png "Wazo ngrok add tunnel")


Une fois votre tunnel monté, vous pourrez le voir dans la liste et récupérer l'adresse unique que ngrok a créé pour vous. Vous pourrez alors vous en servir pour accéder à votre Wazo.


![wazo-ngrok-tunnel.png](/images/blog/wazo-ngrok/wazo-ngrok-tunnel.png "Wazo ngrok tunnel")


En cas de problème ngrok offre aussi nativement l'inspection de trafic dans son interface de gestion interne. Pour y accéder rien de plus simple, il suffit de créer un tunnel HTTP sur le port 4040 et de vous y connecter.


![ngrok-inspect.png](/images/blog/wazo-ngrok/ngrok-inspect.png "Ngrok inspect")


Je vous laisse découvrir ngrok et profiter de sa simplicité pour vous connecter à votre Wazo.

N'hésitez pas à communiquer avec nous et nous remonter vos remarques sur [le forum Wazo](https://projects.wazo.community/projects/1/boards/8).

Bon Wazo !

/sylvain
