Title: XiVO and Asterisk 13
Date: 2015-07-20 13:49
Author: hexanol
Category: XiVO IPBX
Slug: xivo-and-asterisk-13
Status: published

As some of you may already know, XiVO will soon be powered by [Asterisk
13](https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+Documentation)
instead of Asterisk 11. In fact, the development version of XiVO already
comes with Asterisk 13, so it's just a matter of time before Asterisk 13
makes its way in the official/production version of XiVO.

Why switching from Asterisk 11 to Asterisk 13? Well first of all, this
has to be done sooner or later, since Asterisk 11 will enter a "security
fix only" period starting in October 2016 and Asterisk 13 is the new LTS
(Long Term Support) version. But most importantly, Asterisk 13 comes
with quite a few new features, improvements and bug fixes, and there's
some plan (both short term and long term) on using these new Asterisk
feature to build new features or enhance existing ones in XiVO.

What will the switch to Asterisk 13 brings to XiVO? The first version of
XiVO powered by Asterisk 13 won't bring a lot of changes for the users
and administrators; this should be seen mostly as a technical change.
For the first version of XiVO including Asterisk 13, the goal is to make
sure everything that worked previously is still working well. Once this
is done, the following XiVO versions will begin exploiting the new
features offered by Asterisk 13. For example, Asterisk 13 brings a new
SIP channel driver named
[chan\_pjsip](https://wiki.asterisk.org/wiki/display/AST/Configuring+res_pjsip),
but XiVO will continue using the chan\_sip SIP channel driver in the
short term. Another example is
[ARI](https://wiki.asterisk.org/wiki/pages/viewpage.action?pageId=29395573),
which XiVO will not use at first, but will use in future versions, for
example to bring improvements to the call center feature or remove a few
limitations with the current switchboard implementation.

That said, there's a lot of technical changes between Asterisk 11 and
Asterisk 13, and the passage to Asterisk 13 in XiVO will affect some
users, especially users which have developed custom applications around
XiVO or Asterisk. You'll want to review the [XiVO upgrade
notes](http://documentation.xivo.io/en/latest/upgrade/15.13/asterisk_13.html)
to see if you are impacted or not.

If you are eager to try out XiVO with Asterisk 13, you can install the
development version of XiVO on a test machine using the [installation
script
method](http://documentation.xivo.io/en/stable/installation/installsystem.html#installing-from-a-minimal-debian-installation)
and executing the script as "bash xivo\_install\_current.sh -d".

![Asterisk13.png](/images/blog/Asterisk13.png "Asterisk13.png, juil. 2015")

</p>

