---
title: Testing a new SIP phone
---

Let's suppose you have received a brand new SIP phone that is not supported by the provisioning
system of Wazo. You would like to know if it's possible to add auto-provisioning support for it.
That said, you have never tested the phone before.

This guide will help you get through the different steps that are needed to add auto-provisioning
support for a phone to Wazo.

## Prerequisites {#prerequisites}

Before continuing, you'll need the following:

- a private LAN where only your phones and your test machines are connected to it, i.e. a LAN that
  you fully control.

## Configuring a test environment {#configuring-a-test-environment}

Although it's possible to do all the testing directly on a Wazo, it's more comfortable and usually
easier to do on a separate, dedicated machine.

That said, you'll still need a Wazo near, since we'll be doing the call testing part on it and not
on a separate asterisk.

So, for the rest of this guide, we'll suppose you are doing your tests on a _Debian_ server with the
following configuration:

- Installed packages:

  - `isc-dhcp-server`
  - `tftpd-hpa`
  - `apache2`

- Example content of the `/etc/dhcp/dhcpd.conf` file (restart `isc-dhcp-server` after modification):

  ```
  ddns-update-style none;

  default-lease-time 7200;
  max-lease-time 86400;

  log-facility local7;

  subnet 10.34.1.0 netmask 255.255.255.0 {
      authoritative;

      range 10.34.1.200 10.34.1.250;

      option subnet-mask 255.255.255.0;
      option broadcast-address 10.34.1.255;
      option routers 10.34.1.6;

      option ntp-servers 10.34.1.6;
      option domain-name "my-domain.example.org";
      option domain-name-servers 10.34.1.6;

      log(concat("[VCI: ", option vendor-class-identifier, "]"));
  }
  ```

- Example content of the `/etc/default/tftpd-hpa` file (restart `tftpd-hpa` after modifcation):

  ```
  TFTP_USERNAME="tftp"
  TFTP_DIRECTORY="/srv/tftp"
  TFTP_ADDRESS="0.0.0.0:69"
  TFTP_OPTIONS="--secure --verbose"
  ```

With this configuration, files served via TFTP will be in the `/srv/tftp` directory and those served
via HTTP in the `/var/www` directory.

## Testing {#testing}

Adding auto-provisioning support for a phone is mostly a question of finding answers to the
following questions.

1.  _Is it worth the time adding auto-provisioning support for the phone ?_

    Indeed. Adding quality auto-provisioning support for a phone to Wazo requires a non negligible
    amount of work, if you don't meet any real problem and are comfortable with provisioning in
    Wazo. Not all phones are born equal. Some are cheap. Some are old and slow. Some are made to
    work on proprietary system and will only work in degraded mode on anything else.

    That said, if you are uncertain, testing will help you clarifying your idea.

2.  _What is the vendor, model, MAC address and firmware version (if available) of your phone ?_

    Having the vendor and model name is essential when looking for documentation or other
    information. The MAC address will be needed later on for some tests, and it's always good to
    know the firmware version of the phone if you are trying to upgrade to a newer firmware version
    and you're having some troubles, and when reading the documentation.

3.  _Is the official administrator guide/documentation available publicly on the vendor web site ?
    Is it available only after registering and login to the vendor web site ?_

    Having access to the administrator guide/documentation of the phone is also essential. Once
    you've found it, download it and keep the link to the URL. If you can't find it, it's probably
    not worth going further.

4.  _Is the latest firmware of the phone available publicly on the vendor web site ? Is it available
    only after registering and login to the vendor web site ?_

    Good auto-provisioning support means you need to have an easy way to download the latest
    firmware of the phone. Ideally, this mean the firmware is downloadable from an URL, with no
    authentication whatsoever. In the worst case, you'll need to login on some web portal before
    being able to download the firmware, which will be cumbersome to automatize and probably
    fragile. If this is the case, it's probably not worth going further.

5.  _Does the phone need other files, like language files ? If so, are these files available
    publicly on the vendor web site ? After registering ?_

    Although you might not be able to answer to this question yet because you might not know if the
    phone needs such files to be either in English or in French (the two officially supported
    language in Wazo), you'll need to have an easy access to these files if its the case.

6.  _Does the phone supports auto-provisioning via DHCP + HTTP (or TFTP) ?_

    The provisioning system in Wazo is based on the popular method of using a DHCP server to tell
    the phone where to download its configuration files, and a HTTP (or TFTP) server to serve these
    configuration files. Some phones support other methods of provisioning (like TR-069), but that's
    of no use here. Also, if your phone is only configurable via its web interface, although it's
    technically possible to configure it automatically by navigating its web interface, it's an
    **extremely bad** idea since it's impossible to guarantee that you'll still be able to provision
    the phone on the next firmware release.

    If the phone supports both HTTP and TFTP, pick HTTP, it usually works better with the
    provisioning server of Wazo.

7.  _What are the default usernames/passwords on the phone to access administrator menus (phone UI
    and web UI) ? How do you do a factory reset of the phone ?_

    Although this step is optional, it might be handy later to have these kind of information. Try
    to find them now, and note them somewhere.

8.  _What are the DHCP options and their values to send to the phones to tell it where its
    configuration files are located ?_

    Once you know that the phone supports DHCP + HTTP provisioning, the next question is what do you
    need to put in the DHCP response to tell the phone where its configuration files are located.
    Unless the admin documentation of the phone is really poor, this should not be too hard to find.

    Once you have found this information, the easiest way to send it to the phone is to create a
    custom host declaration for the phone in the `/etc/dhcp/dhcpd.conf` file, like in this example:

    ```
    host my-phone {
       hardware ethernet 00:11:22:33:44:55;
       option tftp-server-name "http://169.254.0.1/foobar.cfg";
    }
    ```

9.  _What are the configuration files the phone needs (filename and content) and what do we need to
    put in it for the phone to minimally be able to make and receive calls on Wazo ?_

    Now that you are able to tell your phone where to look for its configuration files, you need to
    write these files with the right content in it. Again, at this step, you'll need to look through
    the documentation or examples to answer this question.

    Note that you only want to have the most basic configuration here, i.e. only configure 1 line,
    with the right SIP registrar and proxy, and the associated username and password.

10. _Do basic telephony services, like transfer, works correctly when using the phone buttons ?_

    On most phones, it's possible to do transfer (both attended and direct), three-way conferences
    or put someone on hold directly from the phone. Do some tests to see if it works correctly.

    Also at this step, it's a good idea to check how the phone handle non-ascii characters, either
    in the caller ID or in its configuration files.

11. _Does other "standard" features work correctly on the phone ?_

    For quality auto-provisioning support, you must find how to configure and make the following
    features work:

    - NTP server
    - MWI
    - function keys (speed dial, BLF, directed pickup / call interception)
    - timezone and DST support
    - multi language
    - DTMF
    - hard keys, like the voicemail hard key on some phone
    - non-ASCII labels (line name, function key label)
    - non-ASCII caller ID
    - backup proxy/registrar
    - paging

Once you have answered all these questions, you'll have a good idea on how the phone works and how
to configure it. Next step would be to start the development of a new provd plugin for your phone
for a specific firmware version.

### IOT Phones {#iot-phones}

- FK = Funckey
- HK = HardKey
- Y = Supported
- MN = Menu
- N = Not supported
- NT = Not tested
- NYT = Not yet tested
- SK = SoftKey

|                                            | model |
| ------------------------------------------ | ----- |
| Provisioning                               | Y     |
| H-A                                        | Y     |
| Directory Wazo                             | Y     |
| Funckeys                                   | 8     |
| **Supported programmable keys**            |       |
| User with supervision function             | Y     |
| Group                                      | Y     |
| Queue                                      | Y     |
| Conference Room with supervision function  | Y     |
| **General Functions**                      |       |
| Online call recording                      | N     |
| Phone status                               | Y     |
| Sound recording                            | Y     |
| Call recording                             | Y     |
| Incoming call filtering                    | Y     |
| Do not disturb                             | Y     |
| Group interception                         | Y     |
| Listen to online calls                     | Y     |
| Directory access                           | Y     |
| Filtering Boss - Secretary                 | Y     |
| **Transfers Functions**                    |       |
| Blind transfer                             | HK    |
| Indirect transfer                          | HK    |
| **Forwards Functions**                     |       |
| Disable all forwarding                     | Y     |
| Enable/Disable forwarding on no answer     | Y     |
| Enable/Disable forwarding on busy          | Y     |
| Enable/Disable forwarding unconditional    | Y     |
| **Voicemail Functions**                    |       |
| Enable voicemail with supervision function | Y     |
| Reach the voicemail                        | Y     |
| Delete messages from voicemail             | Y     |
| **Agent Functions**                        |       |
| Connect/Disconnect a static agent          | Y     |
| Connect a static agent                     | Y     |
| Disconnect a static agent                  | Y     |
| **Parking Functions**                      |       |
| Parking                                    | Y     |
| Parking position                           | Y     |
| **Paging Functions**                       |       |
| Paging                                     | Y     |
