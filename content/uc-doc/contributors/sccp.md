---
title: SCCP
---

wazo-libsccp is an alternative SCCP channel driver for Asterisk. It was
originally based on chan_skinny.

This page is intended for developers and people interested in using
wazo-libsccp on something other than Wazo.

## Installation from the git repository

#:warning: If you just want to use your SCCP phones with Wazo, refer to
[sccp-configuration](/uc-doc/administration/sccp/sccp) instead.

The following packages are required to compile wazo-libsccp on Debian.

-   build-essential
-   asterisk-dev

<!-- -->

    apt-get update && apt-get install build-essential asterisk-dev

    git clone https://github.com/wazo-platform/wazo-libsccp.git
    cd wazo-libsccp
    make
    make install

## Configuration

#:warning: If you just want to use your SCCP phones with Wazo, refer to
`sccp-configuration` instead.

See
[sccp.conf.sample](https://raw.github.com/wazo-platform/wazo-libsccp/master/configs/sccp.conf.sample)
for a configuration file example.

## FAQ

    Q. When is this *feature X* will be available?
    A. The order in which we implement features is based on our client needs. Write
       us an email that clearly explain your setup and what you would like to do and we
       will see what we can do. We don't provide any timeline.

    Q. I want to use the Page() application to call many phones at the same time.
    A. Here a Page() example for a one way call (half-duplex):

    exten => 1000,1,Verbose(2, Paging to external cisco phone)
    same => n,Page(sccp/100/autoanswer&sccp/101/autoanswer,i,120 )

    ...for a two-way call (full-duplex):

    exten => 1000,1,Verbose(2, Paging to external cisco phone)
    same => n,Page(sccp/100/autoanswer&sccp/101/autoanswer,di,120 )

## Network Configuration for 7920/7921

Here's how to to configure a hostapd based AP on a Debian host so that
both a 7920 and 7921 Wi-Fi phone can connect to it.

The 7920 is older than the 7921 and is pretty limited in its Wi-Fi
functionnality:

-   802.11b
-   WPA (no WPA2)
-   TKIP (no CCMP/AES)

Which means that the most secure WLAN you can set up if you want both
phones to connect to it is not that secure.

1.  Make sure you have a wireless NIC capable of master mode.
2.  If needed, install the firmware-<vendor> package. For example, if
    you have a ralink card like I do:

        apt-get install firmware-ralink

3.  Install the other dependencies:

        apt-get install wireless-tools hostapd bridge-utils

4.  Create an hostapd configuration file in
    `/etc/hostapd/hostapd.sccp.conf` with
    content:
    `hostapd.sccp.conf<resources/hostapd.sccp.conf>`
5.  Update the following parameters (if applicable) in the configuration
    file:
    -   interface
    -   ssid
    -   channel
    -   wpa_passphrase
6.  Create a new stanza in `/etc/network/interfaces`:

        iface wlan-sccp inet manual
             hostapd /etc/hostapd/hostapd.sccp.conf

7.  Up the interface:

        ifup wlan0=wlan-sccp

8.  Configure your 7920/7921 to connect to the network.

    To unlock the phone's configuration menu on the 7921:

    -   Press the Navigation Button downwards to enter SETTINGS mode
    -   Navigate to and select Network Profiles
    -   Unlock the IP phone's configuration menu by pressing **#.
        The padlock icon on the top-right of the screen will change from
        closed to open.

    When asked for the authentication mode, select something like
    "Auto" or "AKM".

    You don't have to enter anything for the username/password.

9.  You'll probably want to bridge your wlan0 interface with another
    interface, for example a VLAN interface:

        brctl addbr br0
        brctl addif br0 wlan0
        brctl addif br0 eth0.341
        ip link set br0 up

10. If you are using virtualbox and your guest interface is bridged to
    eth0.341, you'll need to change its configuration and bridge it
    with br0 instead, else it won't work properly.

## Adding Support for a New Phone

This section describes the requirements to consider that a SCCP phone is
working with Wazo libsccp.

### Basic functionality

-   Register on Asterisk
-   SCCP reset [restart]
-   Call history
-   Date time display
-   HA

### Telephony

These test should be done with and without direct media enabled

-   Emit a call
-   Receive a call
-   Receive and transfer a call
-   Emit a call and transfer the call
-   Hold and resume a call
-   Features (*0 and others)
-   Receive 2 calls simultaneously
-   Emit 2 calls simultaneously
-   DTMF on an external IVR

### Function keys

-   Redial
-   DND
-   Hold
-   Resume
-   New call
-   End call
-   Call forward (Enable)
-   Call forward (Disable)
-   Try each button in each mode (on hook, in progress, etc)

### Optional options to test and document

-   Phone book
-   Caller ID and other display i18n
-   MWI
-   Speeddial/BLF
