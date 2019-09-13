Title: XiVO high availability
Date: 2012-03-14 18:40
Author: pcadotte
Slug: xivo-high-availability
Status: published

High availability is available in XiVO since version 1.2.3. The current
use cases is to be able to get telephony service back in less than 5
minutes in case of a network or power failure on the master XiVO.

The architecture is pretty simple at the time of this writing. The
configuration database is replicated every hours to a slave XiVO. The
slave XiVO pings the master XiVO every 30 seconds and launches asterisk
if the master is down. The slave will also stop asterisk if the master
is turned back up. The check (a ping) is pretty simple at the moment,
this means that a fail-over will not happen if asterisk or any other
service has crashed, monit should be able to restart the crashed service
in most cases anyway.

To enable this feature, go to *Configuration, High availability*. Choose
master node on the master and enter the slave's IP address in the remote
address field. On the slave, choose slave node and enter the master's IP
address in the remote address field.

![ha\_master.png](/images/blog/.ha_master_m.jpg "ha_master.png, mar. 2012")

There is no way to trigger a synchronization between master and slave
from the web interface, a work around is to launch
xivo-master-slave-db-replication &lt;slave-ip&gt; on the master XiVO.
This might be useful if you just finished your configuration and want to
trigger a first replication or for test purposes.

Some limitations:

-   This solution uses the backup registrar from the phones, see the
    [documentation](http://documentation.xivo.io "documentation") for
    supported phones.
-   Voice mail messages are not replicated between master and slave. A
    solution is to attach the message and to mail it in the notification
    and delete the message from the server when high availability
    is enabled.
-   CEL are not replicated between master and slave. Calls on the slave
    are logged on the slave and calls on the master are logged on
    the master.

</p>

