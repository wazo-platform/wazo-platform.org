Title: Around XiVO - pxe and preseeding
Date: 2012-05-30 19:47
Author: atarakt
Tags: PXE
Slug: around-xivo-pxe-and-preseeding
Status: published

Now that we have a functional PXE installation, we want to fully
automatise the installation process. Debian have a useful solution
called 'preseeding'. Preseeding provides a way to set answers to
questions asked during the installation process.

You can find Debian documentation about preseeding on Debian wiki :
http://wiki.debian.org/DebianInstaller/Preseed

We are going to be using the default Debian preseed file. We are going
to configure an HTTP server to serve this file to the Debian installer
using nginx.

~~~
$ apt-get install nginx

$ cat /etc/nginx/sites-enabled/myhost
    server {
      listen 80;
      server_tokens off;
      server_name myhost.mydomain.com;
      root /data;
    
      location / {
        autoindex on;
      }
    }
~~~


and restart the server.

First, we need to create /data directory and get the preseed file from
this directory.

~~~
$ mkdir /data && cd /data
$ wget http://www.debian.org/releases/squeeze/example-preseed.txt -O preseed.cfg
~~~


We only do some small changes in the default file to perform a fully
auto installation :

~~~
* do not create a user account
 
    d-i passwd/make-user boolean false

* add the root password (will be changed after the install process
 
    d-i passwd/root-password password r00tme
    d-i passwd/root-password-again password r00tme

* change the disk path for using in a virtual machine

    d-i partman-auto/disk string /dev/vda

* install a minimal system (without X)

    tasksel tasksel/first multiselect standard
~~~


So, we have to modify
/usr/lib/debian-installer/images/i386/text/boot-screens/menu.cfg to
specify to the installer that it must use a preseed file.

~~~
label squeeze-i386
    menu label squeeze i386
    kernel linux
    append vga=normal initrd=initrd.gz
~~~


must be

~~~
label debian-squeeze                                                                                                                                                                           
    menu label Install Auto Debian Squeeze                                                                                                                                                     
    kernel linux                                                                                                                                                                               
    append initrd=initrd.gz rw auto=true priority=critical url=myhost.mydomain.com/./preseed.cfg locale=en_US.UTF-8 interface=auto hostname=squeeze --
~~~


You can find some explanations about the different parameters on
http://hands.com/d-i/

You have to use a specific url in this case (the "/./" is very
important).

Or if you want to install a XiVO system, you can use this line to use
our preseed

~~~
label XiVO
       menu label XiVO
       kernel linux
       append initrd=initrd.gz rw auto=true priority=critical url=http://mirror.xivo.io classes=skaro locale=en_US.UTF-8 interface=auto hostname=xivo --
~~~


Here, we only have an url. It's because we use a specific structure in
our /data directory (and an entry d-i in our nginx configuration) :

~~~
/data
├── d-i
│   ├── lenny
│   │   ├── classes
│   │   └── lib
│   └── squeeze
│       ├── classes
│       ├── docs
│       └── lib
~~~


You can find our preseed repository on
git://git.xivo.io/official/debian-installer.git

In a next post, I will explain how we use the class to customize our
installation.

</p>

