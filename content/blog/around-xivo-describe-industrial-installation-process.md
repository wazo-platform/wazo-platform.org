Title: Around  XiVO - describe industrial installation process
Date: 2012-01-06 18:19
Author: atarakt
Category: General
Tags: PXE
Slug: around-xivo-describe-industrial-installation-process
Status: published

There are four possibilities to install Xivo software :

-   By hand ;)
-   Using an installation script (only for gallifrey and skaro-dev at
    the moment)
-   Using an installation cd (available on http://mirror.xivo.io/iso)
-   Using pxe

<!-- -->

~~~

~~~


We use
[](http://en.wikipedia.org/wiki/Preboot_Execution_Environment "pxe")pxe
for our installations.It is easier, we boot our client on pxe, the rest
of the installation process is automatic

We have 3 sites, 2 in France and 1 in Canada. The easier way for us is
to centralize pxe configuration.

Here is our architecture :

![xivo\_pxe\_arch](/public/.pxe_arch_s.jpg "xivo_pxe_arch, janv. 2012").

You can find debian pxe documentation on
http://d-i.alioth.debian.org/manual/en.i386/ch04s05.html, however you
can find a lot of online (possibly outdated) documentation.

You may find our pxe configuration on our git repositories :

-   our pxe configuration on
    http://git.xivo.io/?p=official/debian-pxelinux.git;a=summary
-   our installation class
    http://git.xivo.io/?p=official/debian-installer.git;a=summary

I will fully explain our configuration in futures posts

</p>

