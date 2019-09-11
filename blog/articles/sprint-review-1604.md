Title: Sprint Review 16.04
Date: 2016-04-04
Author: gsanderson
Category: XiVO IPBX
Tags: XiVO, development
Slug: sprint-review-1604
Status: published

Greetings fellow XiVO fans, it is my pleasure to announce the release of XiVO 16.04.

New features in this sprint
---------------------------

**Fax**: The Fax system in XiVO has been improved, thanks to the XiVO community (thank you Julien Revert). Fax files can be
converted to PDF on reception. Files can also be deposited on a FTP server. Further details on how to configure these
features can be found
[in the documentation](http://documentation.xivo.io/en/latest/administration/fax/fax.html#using-the-ftp-backend)

**Forwards**: The behaviour of the call forwards BLFs is completely consistent across the unconditional, busy and no-answer
forwards. A BLF (Busy Lamp Field) is a small light found next to the function key on a phone. The light helps indicate
to the user if any call forwards are currently active.

**XiVO Client**: The Xlet People has received small mouse improvements: it is now possible to copy contact informations
  to the clipboard, such as the phone number or email via a right click.

**REST API**: New APIs for managing forwards and services have been integrated to the user resource. All call forwards
can now be fully controlled through the REST API. This new API represents an additional step towards our long-term goal
of offering a PBX system that is more flexible, customizable and useful for third party developers.

Technical Features
------------------

**SCCP**: SCCP phones can be configured to use the G.722 codec.

**Digium**: The firmware for Digium cards has been updated to the latest version which supports TE133 and TE435
cards.

**Yealink**: The firmware for V80 has been updated to the latest version. Official support for the Yealink T40P and
  community support for the T27P, T29G and T49G has also been added.


Ongoing features
----------------

**REST API**: We are working on new APIs for managing call transfers and call permissions. Call permissions enable
administrators to control which phone numbers are allowed to be called by users. This will offer third parties more
flexibility when developing applications that control the call flows.

**Web applications**: Work on tools for connecting web applications to XiVO is ongoing. A good example of a Web
  application is a switchboard application, where the operator may answer, hold and transfer calls from his browser,
  effectively controlling his physical phone. This may also be coupled with a WebRTC softphone, in order to have a full
  Web switchboard environment.

---

*My fellow xivoists, as the **Lord of XiVO** allow me to bid you a happy and invigorating farewell. I wish you shall
remain in high spirits until our next fateful encounter, 3 weeks from now. May the freedom of XiVO bless your
communications across the vast VoIP expanse.*

Sources:

* [XiVO 16.04 Upgrade notes](http://documentation.xivo.io/en/latest/upgrade/upgrade.html#id2)
* [XiVO 16.04 Roadmap](http://projects.xivo.io/versions/240)
* [REST API Changelog](http://documentation.xivo.io/en/latest/api_sdk/rest_api/confd/changelog.html)
