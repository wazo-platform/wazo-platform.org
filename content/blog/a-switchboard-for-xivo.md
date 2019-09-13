Title: A Switchboard for XiVO
Date: 2012-12-14 18:44
Author: pcadotte
Category: Software
Slug: a-switchboard-for-xivo
Status: published

One of the long time missing feature of XiVO is a good switchboard
interface. We havebeen working on a new switchboard profile for the XiVO
client and this post isan overview of what you might expect in the next
few releases.

![switchboard.png](/images/blog/.switchboard_m.jpg "switchboard.png, déc. 2012")

As we've said before, we are now releasing a new version every two weeks
andeach release must succeed our test suite before being sent into
production.That means that we will have to ship the new switchboard one
piece at a time. Thefirst three user stories of the switchboard will be
available in the nextrelease (12.24). In fact, one of these story was
already implemented in 12.23but we did not send this release into
production since we are replacingchan\_agent with xivo-agent, but that's
another story.

The first user story is to be able to answer an incoming call with a
click ora key press. To accomplish this goal, we created a new xlet
called switchboard,not to be confused with the switchboard profile. The
switchboard xlet issplitted in three sections, incoming calls on the
left, calls on hold on the right andthe current call on the top spanning
from left to right. When a call reachesthe switchboard, it is shown in
the list on the left of the switchboard. Theoperator can then press
enter or click the call to answer it.

The call flow leads us to the next user story, which is to show the
currentcall at the top of the switchboard xlet. The caller id name and
number areavailable and buttons are available for each actions that can
be done on thatcall. Each button also has a key binding to allow fast
call distribution.Actions will be added to this frame until each desired
action is present.At the end of the current sprint, only hangup and hold
will be available.

The third story that we are addressing is the holded call list that is
on theright side of the xlet. These are the calls that have been
answered by theoperator a first time but that have not been distributed
yet (excluding thecurrent call).

All of these new functinnality are planned for version 12.24 that will
bereleased on december 19th.

What are the next steps

-   Call transfers (the contact xlet can already be used to transfer to
    other users)
-   Call tracking (to know what happenned to previously
    distributed calls)

See the documentation for all the details to enable your new XiVO
switchboard.

<http://documentation.xivo.io/dev/administration/switchboard/switchboard.html>

</p>

