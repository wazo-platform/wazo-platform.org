Title: XiVO is a free software and YES you can contribute !
Date: 2012-06-04 12:31
Author: quintana
Category: General
Slug: xivo-is-a-free-software-and-yes-you-can-contribute
Status: published

One of our customers Medes has contributed an external script for XiVO.
They have enhanced the features (eg. do not disturb, call forward ...)
by creating a new python script. They released the script under the
GPLv3 license. The result of this script is :

![aastra\_resultat.jpg](/images/blog/.aastra_resultat_m.jpg "aastra_resultat.jpg, juin 2012")

To activate this new function, simply change the aastra template in your
provisioning server.

~~~
xml status scroll delay: 2
action uri registered: https://<YOUR_URL>/?identity=$$DISPLAYNAME$$
action uri onhook: https://<YOUR_URL>/?identity=$$DISPLAYNAME$$
action uri poll: https://<YOUR_URL>/?identity=$$DISPLAYNAME$$
action uri poll interval: 60
~~~


For more information about the template go to : [creating custom
templates](http://documentation.xivo.io/production/administration/provisioning/adv_configuration.html#creating-custom-templates)

The code is available on
[gitorious](https://gitorious.org/xivo/xivo-experimental/trees/master/xivoaastrafrommedes)
in our xivo-experimental repository.

</p>

