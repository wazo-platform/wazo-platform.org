---
title: Jitsi
---

-   [Requirements](#requirements)
-   [Add Jitsi plugin on Wazo](#add-jitsi-plugin-on-wazo)
-   [Configuring Jitsi](#configuring-jitsi)

Jitsi (<http://jitsi.org/>) is an opensource softphone (previously SIP
Communicator).

Wazo now support Jitsi sofphones provisioning. Here are the steps to
follow :

Requirements
============

This how to needs :

1.  Jitsi installed,
2.  SIP line created

Add Jitsi plugin on Wazo
========================

Install the Jitsi plugin you want to use : e.g.:

    xivo-jitsi-1

You can now launch your Jitsi softphone

Configuring Jitsi
=================

1.  Launch Jitsi,
2.  If you don\'t have any accounts configured Jitsi will launch a
    windows and you can click
3.  Use online provisioning. Otherwise go to Tools -\> Options -\>
    Advanced -\> Provisioing, Click on Enable provisioning
4.  Select Manually specify a provisioning URI,
5.  Enter the folowing URI where \<provd\_ip\> is the VoIP interface IP
    address of your Wazo and \<provd\_port\> is the provd port (default
    : 8667) :

        http://<provd_ip>:<provd_port>/jitsi?uuid=${uuid}

6.  When done, quit Jitsi,
7.  Launch Jitsi again,

> -   You should now be connected with in autoprov mode,
> -   You could see a new device in the devices list,

8.  You can now provision the phones by typing the provisioning code
    (you get it in the Lines list),
9.  Quit Jitsi again (configuration syncing is not available with the
    Jitsi plugin)
10. And launch Jitsi again : you should now be connected with you phone
    account
