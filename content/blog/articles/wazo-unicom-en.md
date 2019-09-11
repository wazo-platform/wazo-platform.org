Title: No hardware for your phone system?
Date: 2017-06-12
Author: Sylvain Boily
Category: Wazo
Slug: wazo-unicom-en
Status: published


I am asked quite regularly the difference between XiVO and Wazo in terms of features. There are now many, but one of the first that we implemented was simply to provide a completely user-oriented web interface to manage your day to day telephony. The development of this interface was completely web-based, using our APIs and meant to be "cloud" based. It had to be simple to use, easy to set up and mobility was a requirement. Finally Unicom was born.

![unicom.png](/public/wazo-unicom/unicom.png "Unicom")

# Unicom

But what is Unicom? I had a lot of discussions and I had in mind two targets when I made it available to everyone. The first was to provide Software as a Service (SaaS) software, meaning: no upgrade to manage, no installation to do, increased mobility; but also to show that it was possible to develop new tools that would bring more value-added services, using Wazo and its APIs. This makes it a demonstration and also a source of ideas to exchange with the market players.

Getting started with Unicom is quite simple, visit the [Unicom website](https://phone.wazo.community) with a recent web browser.

- Mozilla Firefox
- Chromium
- Chrome
- Opera

Once on the page, you will be able to simply configure your connection to your Wazo server.

![unicom-menu-configuration.png](/public/wazo-unicom/unicom-menu-configuration.png "Unicom configuration menu")

Select the small yellow pen after moving your mouse over the small blue gear at the bottom.

![unicom-configuration.png](/public/wazo-unicom/unicom-configuration.png "Unicom configuration")

In the settings you will simply put the address of your Wazo (`10.41.0.2` in the example). One important point: you can put the public address or the local network address. Unicom is simply a web interface that allows your web browser to communicate directly with your Wazo. No data passes through the machine serving Unicom. Regarding the port, simply put the 443, except if you decide for example to open a specific port from the outside. For example, 8443.

Once your configuration is complete you will only have to connect.

![unicom-login.png](/public/wazo-unicom/unicom-login.png "Unicom login")

The interface is in a single web page and offers all the features expected by a modern telephone system:

- Call management
- Presence management
- Instant messaging
- Management of call forwarding
- Visual voicemail management
- Call logs
- Personal and shared contacts
- Call center agent
- etc.

![unicom-vue.png](/public/wazo-unicom/unicom-vue.png "Unicom view")

There are many subtleties in the software. The first being that we support two ways to use your phone. The first way is that Unicom comes to complement your VoIP phone connected to your Wazo. When you are connected to Unicom, if you simply have an X-brand IP phone, you will have all the functionality with the difference that your calls will be controlled and not directly in the interface. (more on that later)

Example: If I'm looking for contact "Jean", I click on its name to call him, my IP phone rings, I pick it up and I am put in contact with Jean. Unicom will therefore be a web assistant for your IP phone.

If you do not have IP phone and you chose the Wazo interface to create a user with the ability to have a line with WebRTC technology. Lots of big technical words here, but it's just having real-time communication in a web browser. In this case, your phone is in your web browser.

The user interface will then be the same, but you will no longer need to have physical phone. A simple web browser with a microphone / headset will do the trick. Big advantage is that you then become completely mobile without having to install any software. In addition, Wazo supports the Opus codec for a better experience with this way of calling. I've been using Unicom personally and I no longer touch my desk phones. Moreover for remote work this solution is simply magical and extremely simple to implement.

That being said, it's still possible to work in hybrid mode. Well here is another subtlety of Wazo coupled with Unicom, Wazo supports the possibility of having several lines attached to the same user and especially with very different configurations. For example I can have a Cisco phone that uses the SCCP protocol but also on the same number my web phone. All you need is to configure a new line on your user in the administration UI.

So, how does that work in Unicom? Again it's simple, when you log in, Unicom will detect that you have multiple lines and will ask which one you want to use. If you want to switch to another line, simply reload the page and select another line.

![unicom-choice-lines.png](/public/wazo-unicom/unicom-choice-lines.png "Unicom line selection")

Finally, in the details that are not visible, but which are of importance, Unicom also supports the chat / presence sharing between your different Wazo servers. If you have two Wazos, for example one in France and one in Canada, you can connect them together and make sure that your users do not feel that there are two systems but only one.

I will publish more details on other features in future articles, hoping that this one makes you want to join the Wazo community. As always, do not hesitate to contact us, give us feeback, ideas, information or even contribute to this wonderful adventure!

/sylvain
