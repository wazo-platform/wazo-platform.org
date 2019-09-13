Title: Sprint Review 15.16
Date: 2015-09-28 14:03
Author: sduthil
Category: XiVO IPBX
Tags: XiVO, development
Slug: sprint-review-1516
Status: published

Hello,

### New features in this sprint:

**High Availablity**: Phones can be rebooted and will still be
functional when using a fallback server. The next step will be to
replicate the phone's configuration on to the fallback server, so that
an administrator may still be able to modify the phone's options.

**XiVO Client**: Blind transfers and attended transfers have been added
to the people xlet. The transfer destination may be either a contact's
main phone, or his mobile phone. This feature is one more step towards
replacing the contacts xlet and finishing the unificiation of contacts
in the xivo client

**Voicemails**: We have removed some limitations about the management of
voicemails that were introduced in the last version. The voicemail
system is now fully integrated with the REST API.

### Ongoing features:

**Directories**: we continue working on a new service that will
integrate the new directory infrastructure with phones. The goal is to
make contacts exposed via XiVO's directory attainable via a user's
phone. This means that a user's personal contacts will also be avaible.

**Security**: we have started working on an permission system for our
REST APIs. This will allow a finer grained access to the REST APIs and
reduce the chances of accidentally breaking the rest of the system. For
example, users will be able to modify their function keys, without
having access to the function keys of other users.

**SIP Lines**: We are revamping the extra parameters for sip accounts in
the same way as what has been done for voicemails. This will make it
easier for users to configure advanced features in asterisk.

See you for the next sprint review.

Source: [XiVO 15.16
Roadmap](http://projects.xivo.io/versions/232 "XiVO 15.16 Roadmap")

</p>

