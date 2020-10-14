---
title: Asterisk 15 to 16 Upgrade Notes
---

You might be impacted by the upgrade to Asterisk 16 if you have:

- custom Asterisk configuration (other than custom dialplan)
- custom application using AMI or ARI
- custom Asterisk modules (e.g. `codec_g729a.so`)

If you find yourself in one of these cases, you should make sure that your customizations still work
with Asterisk 16.

In particular, if you are using custom Asterisk modules, you\'ll need to either obtain the Asterisk
16 version of these modules or recompile them against Asterisk 16. Not doing so usually leads to
major instability issues in Asterisk.

The nova compatibility patch has been removed. If you have a file enabling `nova_compatibility` in
your `cel.conf` or `cel.d/*` you will have to remove that line from your configuration.

You can see the complete list of changes from the Asterisk website:

- <https://wiki.asterisk.org/wiki/display/AST/Upgrading+to+Asterisk+16>
- <https://github.com/asterisk/asterisk/blob/16/CHANGES>
