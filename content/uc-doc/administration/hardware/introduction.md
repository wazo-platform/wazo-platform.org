---
title: 'Server/Hardware'
---

This section describes how to configure the telephony hardware on a Wazo
server.

#:exclamation: Currently Wazo supports only Digium Telephony Interface cards

The configuration process is the following :

- [chan_dahdi](/uc-doc/administration/hardware/chan_dahdi)
- [load the correct DAHDI modules](/uc-doc/administration/hardware/load_modules)
- [configure and install the echo-canceller](/uc-doc/administration/hardware/echo_canceller)
- [configure the card](/uc-doc/administration/hardware/card_configuration)
- [apply the configuration](/uc-doc/administration/hardware/apply_configuration)


At the end of this page you will also find some general notes and DAHDI.

Notes on configuration files
============================

/etc/dahdi/system.conf {#system_conf}
----------------------

A *span* is created for each card port. Below is an example of a
standard E1 port:

```Ini
span=1,1,0,ccs,hdb3
dchan=16
bchan=1-15,17-31
echocanceller=mg2,1-15,17-31
```

Each span has to be declared with the following information:

    span=<spannum>,<timing>,<LBO>,<framing>,<coding>[,crc4]

-   `spannum` : corresponds to the span number. It starts to 1 and has
    to be incremented by 1 at each new span. This number MUST be unique.
-   `timing` : describes the how this span will be considered regarding
    the synchronization :
    -   0 : do not use this span as a synchronization source,
    -   1 : use this span as the primary synchronization source,
    -   2 : use this span as the secondary synchronization source etc.
-   `LBO` : 0 (not used)
-   `framing` : correct values are `ccs` or `cas`. For ISDN lines, `ccs`
    is used.
-   `coding` : correct values are `hdb3` or `ami`. For example, `hdb3`
    is used for an E1 (PRI) link, whereas `ami` is used for T0 (french
    BRI) link.
-   `crc4` : this is a framing option for PRI lines. For example it is
    rarely use in France.

Note that the `dahdi_genconf` command should usually give you the
correct parameters (if you correctly set the cards jumper). All these
information should be checked with your operator.

/etc/asterisk/chan_dahdi.conf
-----------------------------

This file contains the general parameters of the DAHDI channel. It is
not generated via the `dahdi_genconf` command.

/etc/asterisk/dahdi-channels.conf {#asterisk_dahdi_channel_conf}
---------------------------------

This file contains the parameters of each channel. It is generated via
the `dahdi_genconf` command.

Below is an example of span definition:

```Ini
group=0,11
context=from-extern
switchtype = euroisdn
signalling = pri_cpe
channel => 1-15,17-31
```

Note that parameters are read from top to bottom in a last match fashion
and are applied to the given channels when it reads a line `channel =>`.

Here the channels 1 to 15 and 17 to 31 (it is a typical E1) are set:

-   in groups 0 and 11 (see [DAHDI interconnections](/uc-doc/administration/interconnections/introduction#interco_dahdi_conf))
-   in context `from-extern` : all calls received on these channels will
    be sent in the context `from-extern`
-   and configured with switchtype `euroisdn` and signalling `pri_cpe`

Debug
=====

Check IRQ misses
----------------

It\'s always useful to verify if there isn\'t any *missed IRQ* problem
with the cards.

Check:

```ShellSession
# cat /proc/dahdi/<span number>
```

If the *IRQ misses* counter increments, it\'s not good:

```ShellSession
# cat /proc/dahdi/1
Span 1: WCTDM/0 "Wildcard TDM800P Board 1" (MASTER)
IRQ misses: 1762187
  1 WCTDM/0/0 FXOKS (In use)
  2 WCTDM/0/1 FXOKS (In use)
  3 WCTDM/0/2 FXOKS (In use)
  4 WCTDM/0/3 FXOKS (In use)
```

Digium gives some hints in their *Knowledge Base* here :
<https://support.digium.com/community/s/search/All/Home/IRQ>

PRI Digium cards needs 1000 interruption per seconds. If the system
cannot supply them, it increment the IRQ missed counter.

As indicated in Digium *KB* you should avoid shared IRQ with other
equipments (like HD or NIC interfaces).
