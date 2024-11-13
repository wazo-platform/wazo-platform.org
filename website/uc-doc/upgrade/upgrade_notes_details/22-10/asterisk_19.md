---
title: Asterisk 18 to 19 Upgrade Notes
---

You might be impacted by the upgrade to Asterisk 19 if you have:

- custom Asterisk configuration
- custom application using AMI or ARI
- custom Asterisk modules (e.g. `codec_g729a.so`)

If you find yourself in one of these cases, you should make sure that your customizations still work
with Asterisk 19.

In particular, if you are using custom Asterisk modules, you'll need to either obtain the Asterisk
19 version of these modules or recompile them against Asterisk 19. Not doing so usually leads to
major instability issues in Asterisk.

You can see the complete list of changes from the Asterisk website:

- [https://docs.asterisk.org/Asterisk_19_Documentation/Upgrading](https://docs.asterisk.org/Asterisk_19_Documentation/Upgrading)
