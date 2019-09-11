Title: XiVO 1.2 and Asterisk Dialplan
Date: 2011-12-06 02:06
Author: jylebleu
Category: Software
Slug: xivo-12-and-asterisk-dialplan
Status: published

![xivodialplan.jpg](/public/xivosoft/xivodialplan.jpg "xivodialplan.jpg, déc. 2011")

To route a call from origin to destination,
[Asterisk](http://www.asterisk.org/) relies on a so called dialplan. In
XiVO, it is generated using 3 different components

-   XiVO confgen, takes info from the configuration database and
    generate a directory linked to the base config dialplan
-   Base Config dialplan, the dialplan itself
-   Agid, dynamically update the dialplan as setting variables (XIVO\_),
    or compute recording file names.

You'll find this 3 components here :

-   git://git.xivo.io/official/xivo-confgen.git for confgen
-   git://git.xivo.io/official/xivo-skaro.git directory base-config for
    the static part
-   git://git.xivo.io/official/xivo-skaro.git directory agid for the
    dynamic part

You may also have a look at our CI server
[jenkins](http://jenkins.xivo.io/)

</p>

