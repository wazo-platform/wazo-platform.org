Title: Automatically originating call with cron and XiVO 1.2
Date: 2011-12-14 19:02
Author: hexanol
Category: XiVO IPBX
Slug: automatically-originating-call-with-cron-and-xivo-12
Status: published

This bit of dialplan simply set the name part of the caller ID and then
call our phone, which in our example is SIP/abcdef. Note that we dial
the phone directly instead of jumping into the standard XiVO dialplan,
because we don't want the voicemail of the user to answer the call if it
isn't answered in time.

Now that this is done, we load the dialplan we just added previously
with the following command:

~~~
asterisk -rx "dialplan reload"
~~~


Next step before writing our cron job is to test out the command that
will make our automatic call origination works. This use the "channel
originate" command available from the asterisk 1.8 CLI. Let's try it
out:

~~~
asterisk -rx "channel originate Local/s@daily-scrum exten 1051"
~~~


This makes our SIP/abcdef phone ring, showing that "Daily Scrum" is
calling us, and once we answer the call, we are bridged into our
conference room at extension 1051.

So we reach the last step on our journey; writing our cron job. Let's
create a file at */etc/cron.d/daily-scrum* and write the following line:

~~~
0 9 * * 1-5 root   /usr/sbin/asterisk -rx "channel originate Local/s@daily-scrum exten 1051"
~~~


This cron job will launch our asterisk command every day of the week at
9:00 AM.

So that's it. Starting from this setup, it's possible to do other
things. For example, paging and autoanswering a group of phones and then
playing a sound file is just a bit of custom dialplan away.

Note that to make this work in XiVO 1.1, the dialplan shown here need to
be modified (the "same" syntax is not supported in asterisk 1.4) and the
"channel originate" command be replaced by "originate".

</p>

