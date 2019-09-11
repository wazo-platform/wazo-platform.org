Title: XiVO 1.2 -*- Queues Diversions -*-
Date: 2011-04-08 09:08
Author: gbour
Tags: xivo 1.2, web-interface, skaro, queues, diversion
Slug: xivo-12-queues-diversions-
Status: published

  
<ins>Asterisk queues</ins> have limited possibilities of
interactions.The only way to know how a call was processed and decide
what to do next is falling back on **\${QUEUESTATUS}** when the call
exits the queue.  

If something goes wrong, \${QUEUESTATUS} is set to one of the following
values: *TIMEOUT*, *FULL*, *JOINEMPTY*, *LEAVEEMPTY*, *JOINUNAVAIL* and
*LEAVEUNAVAIL*. <ins>In XiVO, it fits to queues **No answer** tab.</ins>

Queue diversions
----------------

But in XiVO 1.2 we add a new functionality called **diversions**  
Diversions are preconditions tested *before* a call enter into the
queue. If one precondition **matches**, the incoming call is not sent
into the queue, but rerouted to the destination associated with the
condition. This allows a finer-grained control on how calls are accepted
or not into a queue  
  
Currently, we have defined 4 preconditions. They are evaluated in order,
one after another; the first to be validated is triggering call
rerouting to the associated destination.Here they are:  
  
1. *CTI status presence*.  
calls are diverted if some of queue agents have required statuses.I.e,
if we have more than 50 agents with \*inline\* status, new incoming
calls are transfered to our \*indian\* call center

[![queue-diversion-cti-presences.png](/images/blog/queue-diversions/.queue-diversion-cti-presences_m.jpg "queue-diversion-cti-presences.png, avr. 2011")](/images/blog/queue-diversions/queue-diversion-cti-presences.png "queue-diversion-cti-presences.png")  
2. *CTI status absence*.  
On the contrary, we may want to divert calls when no agents have a
required status.  
I.e, if less than 5 agents with status \*ready to hold\* are logged in
the queue, we considered it to be closed, and redirect calls to a
voicemail

[![queue-diversion-cti-nonpresences.png](/images/blog/queue-diversions/.queue-diversion-cti-nonpresences_m.jpg "queue-diversion-cti-nonpresences.png, avr. 2011")](/images/blog/queue-diversions/queue-diversion-cti-nonpresences.png "queue-diversion-cti-nonpresences.png")  
3. *Estimated waiting time*.  
When the estimated wait time is exceeding a threshold value, we do not
want new calls to enter into the queue (callers do not like to wait!),
It is then possible to redirect them to another destination.  
I.e if the wait time is higher than 5 minutes, redirect incalls to an
IVR

[![queue-diversion-waittime.png](/images/blog/queue-diversions/.queue-diversion-waittime_m.jpg "queue-diversion-waittime.png, avr. 2011")](/images/blog/queue-diversions/queue-diversion-waittime.png "queue-diversion-waittime.png")  
4. *Waiting calls/Available agents* ratio.  
If there are more calls waiting in the queue that available agents can
handle in a relative short delay, new calls will only increase
congestion. With this diversion, you can reroute incoming calls when
this situation arises.I.e, if there is less than 1 agent for 2 waiting
calls, hangup!

[![queue-diversion-ratio.png](/images/blog/queue-diversions/.queue-diversion-ratio_m.jpg "queue-diversion-ratio.png, avr. 2011")](/images/blog/queue-diversions/queue-diversion-ratio.png "queue-diversion-ratio.png")

**NOTE: the ratio is a percent**.

-   A value of 100 means there is 1 agent for 1 call
-   A value of 50 means a call can be handled by 2 agents
-   A value of 200 means there is 1 agent for 2 calls

</p>

