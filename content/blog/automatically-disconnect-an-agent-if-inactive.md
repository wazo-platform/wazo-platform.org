Title: Automatically Disconnect an Agent if his SIP Account is Inactive
Date: 2015-10-29 09:00
Category: XiVO IPBX
Tags: call center
Slug: automatically-disconnect-an-agent-if-inactive
Author: Nicolas Vdb
Status: published

Hello, my name is Nicolas (h4wk3r on irc #xivo). I am a currently alternating between my studies for
a Master in Computer Engineering and my work in a call center. I could not find any information in
the XiVO CTI when a phone was disconnected, so I worked on a solution for generating this
information. This allows agents to know their phone's status.

Let us imagine the following scenario: An agent in a call center is connected with is softphone 'N.
SIP XXX'. He logs in via his XiVO Client in order to receive calls from his assigned queues. One of
the following 3 events occurs :

A – The softphone is disconnected from asterisk .
B – The agent finishes his day, turns off his softphone but forgets to disconnect his XiVO Client
C – The agent is at home, the VPN tunnel stops

In these 3 examples, the agent cannot know if he can still recieve calls because he does not recieve
any alerts from his XiVO client or from the phone.

I. Standard operation
=====================

Agent's point of view
---------------------------

![photo 1]({filename}/images/blog/agent_disconnect/photo1.png)

Point of view on the XiVO Server
--------------------------------

![photo 2]({filename}/images/blog/agent_disconnect/photo2.png)

II. Anomaly
===========

Agent's point of view
---------------------------

Let us simulate the anomaly. For this simulation, the softphone has been forcefully disconnected.

![photo 3]({filename}/images/blog/agent_disconnect/photo3.png)

**We can see that our agent is still logged in and no other information about the disconnection is
displayed**

Point of view on the XiVO Server
--------------------------------

![photo 4]({filename}/images/blog/agent_disconnect/photo4.png)

We can see that the state of extension 741 is ```UNKNOWN```, but agent 6002 (extension 728) is still
connected.

III. Execution of the script
============================

The script will find out that the SIP account is disconnected and will automatically log out the
agent associated to the extension.

![photo 5]({filename}/images/blog/agent_disconnect/photo5.png)

Accordingly, the agent now knows that he is logged out:

![photo 6]({filename}/images/blog/agent_disconnect/photo6.png)

This script has been deployed in production and has been working successfully since Oct 1st 2015.
You can download this script on [github](https://github.com/h4wk3r/XIVO-Agentoff_if_sipoff).

For further information, you can contact me directly be email (vdbnicolas [at] gmail [dot] com) or
on IRC on irc.freenode.net channel #xivo.

*Article by h4wk3r. Licensed under cc.by.sa 4.0. Revised by Valérie Dagrain. Translated by Gregory Eric Sanderson*
