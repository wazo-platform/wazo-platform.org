---
title: Voice Compression Card configuration
---

-   [Verifications](#verifications)
-   [Configure](#configure)
-   [Next step](#next-step)
-   [Specific configuration](#vc_card_specific_conf)
    -   [Select the transcoding mode](#select-the-transcoding-mode)

Verifications
=============

Verify that the `wctc4xxp` module is uncommented in
`/etc/dahdi/modules`{.interpreted-text role="file"}.

If it wasn\'t, do again the step [Load the correct DAHDI modules](/uc-doc/administration/hardware/load_modules).

Configure
=========

To configure the card you have to:

1.  Install the card firmware:

        xivo-fetchfw install digium-tc400m

2.  Comment out the following line in
    `/etc/asterisk/modules.conf`{.interpreted-text role="file"}:

        noload = codec_dahdi.so

3.  Restart asterisk:

        service asterisk restart

Next step
=========

Now that you have configured your Voice Compression card:

1.  you must check if you need to follow one of the
    [Specific configuration](/uc-doc/administration/hardware/analog_configuration#vc-card-specific-conf) sections
    below,
2.  then, if you have another type of card to configure, you can go back
    to the [configure your card](/uc-doc/administration/hardware/card_configuration) section.

Specific configuration {#vc-card-specific-conf}
======================

Select the transcoding mode
---------------------------

The Digium TC400 card can be used to transcode:

-   120 G.729a channels,
-   92 G.723.1 channels,
-   or 92 G.729a/G.723.1 channels.

Depending on the codec you want to transcode, you can modify the `mode`
parameter which can take the following value:

-   mode = mixed : this the default value which activates transcoding
    for 92 channels in G.729a or G.723.1 (5.3 Kbit and 6.3 Kbit)
-   mode = g729 : this option activates transcoding for 120 channels in
    G.729a
-   mode = g723 : this option activates transcoding for 92 channels in
    G.723.1 (5.3 Kbit et 6.3 Kbit)

1.  Create the file
    `/etc/modprobe.d/xivo-transcode.conf`{.interpreted-text
    role="file"}:

        touch /etc/modprobe.d/xivo-transcode.conf

2.  And insert the following lines:

        options wctc4xxp mode=g729

3.  Apply the configuration by restarting the services:

        wazo-service restart

4.  Verify that the card is correctly seen by asterisk with the
    `transcoder show` CLI command
    -   this command should show the encoders/decoders registered by the
        TC400 card:

    > \*CLI\> transcoder show 0/0 encoders/decoders of 120 channels are
    > in use.
