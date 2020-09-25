---
title: Asterisk 13 to 14 Upgrade Notes
---

- [Changes Between Asterisk 13 and 14](#changes-between-asterisk-13-and-14)

You might be impacted by the upgrade to Asterisk 14 if you have:

- custom Asterisk configuration (other than custom dialplan)
- custom application using AMI or ARI
- custom Asterisk modules (e.g. codec_g729a.so)

If you find yourself in one of these cases, you should make sure that your customizations still work
with Asterisk 14.

In particular, if you are using custom Asterisk modules, you\'ll need to either obtain the Asterisk
14 version of these modules or recompile them against Asterisk 14. Not doing so usually leads to
major instability issues in Asterisk.

If you are upgrading from Asterisk 11, you should also check the
[Asterisk 11 to 13 upgrade notes](/uc-doc/upgrade/upgrade_notes_details/15-13/asterisk_13).

# Changes Between Asterisk 13 and 14

Some of the more common changes to look for:

- AMI: The Command action now sends the output from the CLI command as a series of Output headers
  for each line instead of as a block of text with the `--END COMMAND--` delimiter to match the
  output from other actions.

You can see the complete list of changes from the Asterisk website:

- <https://wiki.asterisk.org/wiki/display/AST/Upgrading+to+Asterisk+14>
- <https://github.com/asterisk/asterisk/blob/14/CHANGES>
