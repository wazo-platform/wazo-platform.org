Title: Glimpse of CTI architecture in XiVO 1.1 and 1.2
Date: 2011-05-13 11:41
Author: corentin
Category: XiVO IPBX
Slug: glimpse-of-cti-architecture-in-xivo-11-and-12
Status: published

As a reminder, this is what the CTI world looks like in XiVO 1.1 :

[![cti1.1](/images/blog/.external_cti_architecture_xivo_1.1_m.jpg "cti1.1, mai 2011")](/images/blog/external_cti_architecture_xivo_1.1.png "cti1.1")

The XiVO 1.2 part will be more like :

[![cti1.2](/images/blog/.external_cti_architecture_xivo_1.2_m.jpg "cti1.2, mai 2011")](/images/blog/external_cti_architecture_xivo_1.2.png "cti1.2")

namely :

-   the queue-logger daemon does not exist any more, and the CTI server
    fills the queue-logger database itself
-   the services/features of user lines will be accessed through regular
    XiVO web services instead of direct SQL access

This is of course only a very global view.

At the underneath level,

-   the AMI commands have changed, since the asterisk version will be
    1.8 (instead of 1.4)
-   the CTI protocol between the server and its clients has evolved,
    especially in order to be able to get smaller payload packet sizes.

More details should come in a future blog entry.

</p>

