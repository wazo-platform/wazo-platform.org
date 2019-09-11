Title: Using Reverse Look-ups to Replace Caller IDs
Date: 2012-06-11 11:04
Author: pcadotte
Category: Software
Slug: using-reverse-look-ups-to-replace-caller-ids
Status: published

XiVO directories are a way to store contact information to be able to do
directory look-ups from the XiVO client and from supported phones.
Another useful feature of directories, is the ability to set a reverse
directory and replace incoming caller IDs with information from the
directory.

This article will show you how to setup reverse look-up on your XiVO. It
is assumed that you already have a working directory setup on your XiVO.

The first step is to set the reverse match fields in your directory
configuration. These fields are the one that will be used to search
against the incoming number. Interesting fields for reverse look-up are:

-   phonebooknumber.home.number
-   phonebooknumber.mobile.number
-   phonebooknumber.office.number

![reverse\_1.png](/public/.reverse_1_m.jpg "reverse_1.png, juin 2012")

The second step is to setup the field that will be shown in response to
a reverse look-up. This field is configured in the Mapped fields list.
All you have to do is add a field with the name **reverse** and the
value will be used as the caller ID name of incoming calls.

The last step is to add the configured directory to the list of reverse
directories available for look up. Under reverse directories, in the
related directories section add each directory you want to be able to
access using reverse look-ups. It is usually not interesting to include
internal directory in reverse look-ups since internal users already have
a caller ID.

![reverse\_2.png](/public/.reverse_2_m.jpg "reverse_2.png, juin 2012")

Note that reverse look-up will work as described in version 1.2.10 and
later, another good reason to do a xivo-upgrade.

</p>

