---
title: Asterisk 11 to 13 Upgrade Notes
---

-   [Changes Between Asterisk 11 and
    13](#changes-between-asterisk-11-and-13)
-   [List of Known Bugs And
    Limitations](#list-of-known-bugs-and-limitations)

You might be impacted by the upgrade to Asterisk 13 if you have:

-   custom dialplan
-   custom Asterisk configuration
-   custom application using AGI, AMI or any other Asterisk interface
-   custom application exploiting CEL or queue\_log
-   custom Asterisk modules (e.g. codec\_g729a.so)
-   customized Asterisk in some other way
-   DAHDI trunks using SS7 signaling

If you find yourself in one of these cases, you should make sure that
your customizations still work with Asterisk 13.

Changes Between Asterisk 11 and 13
==================================

Some of the more common changes to look for:

-   SS7 support is not available in the Asterisk package of XiVO between
    version 15.13 and 16.08 inclusively.
-   All channel and global variable names are evaluated in a
    case-sensitive manner. In previous versions of Asterisk, variables
    created and evaluated in the dialplan were evaluated
    case-insensitively, but built-in variables and variable evaluation
    done internally within Asterisk was done case-sensitively.
-   The SetMusicOnHold dialplan application was deprecated and has been
    removed. Users of the application should use the CHANNEL function\'s
    `musicclass` setting instead.
-   The WaitMusicOnHold dialplan application was deprecated and has been
    removed. Users of the application should use MusicOnHold with a
    `duration` parameter instead.
-   The SIPPEER dialplan function no longer supports using a colon as a
    delimiter for parameters. The parameters for the function should be
    delimited using a comma.
-   The SIPCHANINFO dialplan function was deprecated and has been
    removed. Users of the function should use the CHANNEL function
    instead.
-   For SIP, the codec preference order in an SDP during an offer is
    slightly different than previous releases. Prior to Asterisk 13, the
    preference order of codecs used to be:

    1.  Our preferred codec
    2.  Our configured codecs
    3.  Any non-audio joint codecs

    Now, in Asterisk 13, the preference order of codecs is:

    1.  Our preferred codec
    2.  Any joint codecs offered by the inbound offer
    3.  All other codecs that are not the preferred codec and not a
        joint codec offered by the inbound offer

-   Queue strategy `rrmemory` (Round robin memory) now has a predictable
    order. Members will be called in the order that they are added to
    the queue. For agents, this means they will be called in the order
    they are logged.
-   When performing queue pause/unpause on an interface without
    specifying an individual queue, the PAUSEALL/UNPAUSEALL event will
    only be logged if at least one member of any queue exists for that
    interface. This has an impact on the agent performance statistics;
    an agent must be a member of at least 1 queue for its pause time to
    show up in the statistics.

You can see the complete list of changes from the Asterisk website:

-   <https://wiki.asterisk.org/wiki/display/AST/Upgrading+to+Asterisk+12>
-   <https://wiki.asterisk.org/wiki/display/AST/Upgrading+to+Asterisk+13>
-   <http://git.asterisk.org/gitweb/?p=asterisk/asterisk.git;a=blob;f=CHANGES;h=d0363f7c3b03cec5f71b3806535c4f9d2b2baa02;hb=refs/heads/13>

The AGI protocol did not change between Asterisk 11 and Asterisk 13; if
you have custom AGI applications, you only need to make sure that the
dialplan applications and functions you are using from the AGI are still
valid.

List of Known Bugs And Limitations
==================================

List of known bugs and limitations for Asterisk 13 in XiVO:

-   When direct media is active and DTMF are sent using SIP INFO, DTMF
    are not working properly. It is also impossible to do an attended
    transfer from the Wazo Client in these conditions.

    See <http://projects.wazo.community/issues/5692>.
