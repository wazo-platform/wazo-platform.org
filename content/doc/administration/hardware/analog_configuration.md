---
title: Analog card configuration
---

-   [Limitations](#limitations)
-   [Verifications](#verifications)
-   [Generate DAHDI configuration](#generate-dahdi-configuration)
-   [Configure](#configure)
    -   [DAHDI system.conf
        configuration](#dahdi-system.conf-configuration)
    -   [Asterisk dahdi-channels.conf
        configuration](#asterisk-dahdi-channels.conf-configuration)
-   [Next step](#next-step)
-   [Specific configuration](#analog_card_specific_conf)
    -   [FXS modules](#fxs-modules)
    -   [FXO modules](#fxo-modules)

Limitations
===========

-   Wazo does not support hardware echocanceller on the TDM400 card.
    Users of TDM400 card willing to setup an echocanceller will have to
    use a software echocanceller like OSLEC.

Verifications
=============

Verify that one of the `{wctdm,wctdm24xxp}` module is uncommented in
`/etc/dahdi/modules`{.interpreted-text role="file"} depending on the
card you installed in your server.

If it wasn\'t, do again the step `load_dahdi_modules`{.interpreted-text
role="ref"}

::: {.note}
::: {.admonition-title}
Note
:::

Analog cards work with card module. You must add the appropriate card
module to your analog card. Either:

-   an FXS module (for analog equipment - phones, \...),
-   an FXO module (for analog line)
:::

Generate DAHDI configuration
============================

Issue the command:

    dahdi_genconf

::: {.warning}
::: {.admonition-title}
Warning
:::

it will erase all existing configuration in
`/etc/dahdi/system.conf`{.interpreted-text role="file"} and
`/etc/asterisk/dahdi-channels.conf`{.interpreted-text role="file"} files
!
:::

Configure
=========

DAHDI system.conf configuration
-------------------------------

First step is to check `/etc/dahdi/system.conf`{.interpreted-text
role="file"} file:

-   check the span numbering,

See detailed explanations of this file in the
`system_conf`{.interpreted-text role="ref"} section.

Below is **an example** for a typical FXS analog line span:

    # Span 2: WCTDM/4 "Wildcard TDM400P REV I Board 5"
    fxoks=32
    echocanceller=mg2,32

Asterisk dahdi-channels.conf configuration
------------------------------------------

Then you have to modify the
`/etc/asterisk/dahdi-channels.conf`{.interpreted-text role="file"} file:

-   remove the unused lines like:

        context = default
        group = 63

-   change the `context` and `callerid` lines if needed,
-   the `signalling` should be one of:
    -   `fxo_ks` for **FXS** lines -yes it is the reverse
    -   `fxs_ks` for **FXO** lines - yes it is the reverse

Below is **an example** for a typical french PRI line span:

    ; Span 2: WCTDM/4 "Wildcard TDM400P REV I Board 5"
    signalling=fxo_ks
    callerid="Channel 32" <4032>
    mailbox=4032
    group=5
    context=default
    channel => 32

Next step
=========

Now that you have configured your PRI card:

1.  you must check if you need to follow one of the
    `analog_card_specific_conf`{.interpreted-text role="ref"} sections
    below,
2.  then, if you have another type of card to configure, you can go back
    to the `configure your card <card_configuration>`{.interpreted-text
    role="ref"} section,
3.  if you have configured all your card you have to configure the
    `interco_dahdi_conf`{.interpreted-text role="ref"} in the web
    interface.

Specific configuration {#analog_card_specific_conf}
======================

FXS modules
-----------

If you use **FXS** modules you should create the file
`/etc/modprobe.d/xivo-tdm`{.interpreted-text role="file"} and insert the
line:

    options DAHDI_MODULE_NAME fastringer=1 boostringer=1

Where DAHDI\_MODULE\_NAME is the DAHDI module name of your card (e.g.
wctdm for a TDM400P).

FXO modules
-----------

If you use **FXO** modules you should create file
`/etc/modprobe.d/xivo-tdm`{.interpreted-text role="file"}:

    options DAHDI_MODULE_NAME opermode=FRANCE

Where DAHDI\_MODULE\_NAME is the DAHDI module name of your card (e.g.
wctdm for a TDM400P).
