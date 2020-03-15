---
title: Reporting
---

-   [General Architecture](#general-architecture)
-   [Statistic Data Table Content](#statistic-data-table-content)
    -   [stat\_call\_on\_queue](#stat_call_on_queue)
    -   [Queue Call Status](#queue-call-status)
    -   [stat\_queue\_periodic Table](#stat_queue_periodic-table)
    -   [stat\_agent](#stat_agent)
    -   [stat\_queue](#stat_queue)

You may use your own reporting tools to be able to produce your own
reports provided **you do not use the Wazo server original tables**, but
copy the tables to your own data server. You may use the following
procedure as a template :

-   Allow remote database access on Wazo
-   Create a postgresql account read only on asterisk database
-   Create target tables in your database located on the data server
-   Copy the statistic table content to your data server

General Architecture
====================

![Statistics Architecture](/images/uc-doc/contact_center/reporting/archi.png)

1.  The *queue\_log* table of the *asterisk* database is filled by
    events from Asterisk and by custom dialplan events
2.  *xivo-stat fill\_db* is then used to read data from the *queue\_log*
    table and generate the tables *stat\_call\_on\_queue* and
    *stat\_queue\_periodic*

Statistic Data Table Content
============================

stat\_call\_on\_queue
---------------------

This table is used to store each call individually. Each call received
on a queue generates a single entry in this table containing time
related fields and a foreign key to the agent who answered the call and
another on the queue on which the call was received.

It also contains the status of the call ie. answered, abandoned, full,
etc.

  --------------------------------------------------------------------------------
  Field       Values      Description
  ----------- ----------- --------------------------------------------------------
  id          generated

  callid      numeric     This call id is also used in the CEL table and can be
              value       used to get call detail information

  time        Call time

  ringtime                Ringing duration time in seconds

  talktime                Talk time duration in seconds

  waittime                Wait time duration in seconds

  status                  See status description below

  queue\_id               Id of the queue, the name of the queue can be found in
                          table `stat_queue`, using this name queue details can be
                          found in table `queuefeatures`

  agent\_id               Id of the agent, the agent name can be found in table
                          `stat_agent`, using this name agent details can be found
                          in table `agentfeatures` using the number in the second
                          part of the name Exemple : Agent/1002 is agent with
                          number 1002 in table `agentfeatures`
  --------------------------------------------------------------------------------

Queue Call Status
-----------------

  --------------------------------------------------------------------------------
  Status              Description
  ------------------- ------------------------------------------------------------
  full                Call was not queued because queue was full, happens when the
                      number of calls is greater than the maximum number of calls
                      allowed to wait

  closed              Closed due to the schedule applied to the queue

  joinempty           No agents were available in the queue to take the call
                      (follows the join empty parameter of the queue)

  leaveempty          No agents available while the call was waiting in the qeuue

  divert\_ca\_ratio   Call diverted because the ratio number of agent number of
                      calls waiting configured was exceeded

  divert\_waittime    Call diverted because the maximum expected waiting time
                      configured was exceeded

  answered            Call was answered

  abandoned           Call hangup by the caller

  timeout             Call stayed longer than the maximum time allowed in queue
                      parameter
  --------------------------------------------------------------------------------

stat\_queue\_periodic Table
---------------------------

This table is an aggregation of the queue\_log table.

This table contains counters on each queue for each given period. The
granularity at the time of this writing is an hour and is not
configurable. This table is then used to compute statistics for a given
range of hours, days, week, month or year.

  --------------------------------------------------------------------------------
  Field               Description
  ------------------- ------------------------------------------------------------
  id                  Generated id

  time                time period, all counters are aggregated for an hour

  answered            Number of answered calls during the period

  abandoned           Number of abandoned calls during the period

  total               Total calls received during the period

  full                Number of calls received when queue was full

  closed              Number of calls received on close

  joinempty           Number of calls received no agents available

  leaveempty          Number of calls diverted agents not available during the
                      wait

  divert\_ca\_ratio   Number of calls diverted due to the number of agent number
                      versus calls waiting configured was exceeded

  divert\_waittime    Number of calls diverted because the maximum expected
                      waiting time configured was exceeded

  timeout             Number of calls diverted because the maximum time allowed in
                      queue parameter was exceeded

  queue\_id
  --------------------------------------------------------------------------------

stat\_agent
-----------

This table is used to match agents to an id that is different from the
id in the agent configuration table. This is necessary to avoid loosing
statistics on a deleted agent. This also means that if an agent changes
number ie. Agent/1001 to Agent/1202, the supervisor will have to take
this information into account when viewing the statistics. Affecting an
old number to a another agent also means that the supervisor will have
to ignore entries for this given agent for the period before the number
assignment to the new agent.

stat\_queue
-----------

This table is used to store queues in a table that is different from the
queue configuration table. This is necessary to avoid losing statistics
on a deleted queue. Renaming a queue is also not handled at this time.
