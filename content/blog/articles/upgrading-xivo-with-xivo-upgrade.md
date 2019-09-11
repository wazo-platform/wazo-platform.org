Title: Upgrading XiVO with \"xivo-upgrade\"
Date: 2012-03-29 15:28
Author: cedric
Category: Software
Slug: upgrading-xivo-with-xivo-upgrade
Status: published

In XiVO version 1.2.2, a new package has been introduced, xivo-upgrade.
This new script must be usedto make sure that upgrades are completed
properly. The objective is to minimize differences between machinesand
to control the environment in case of problems.

We had many problems to work around:

-   questions to answer about replacing packaged files that have been
    modified
-   reload services when libraries are modified
-   modify the database schema when needed
-   showing the current and new version when upgrading

We decided to put this system in place to keep upgrades simples and
transparent to the end ~~user~~ admin.The goal being to stay as SIMPLE
as possible!

Too many people are stressed by their IPBX upgrades!![Stress
Man](/public/human_pro/.file0001382919230_s.jpg "Stress Man, mar. 2012")

But not with
XiVO!![Congratulation](/public/human_pro/.file6741271974648_s.jpg "Congratulation, mar. 2012")

No one should be afraid of the side effects of an upgrade!

Technical informations
----------------------

This package allows the administrator to upgrade his XiVO securely and
in a way validated by the dev team.The script executes many steps:

1.  xivo-upgrade upgrade, to get the latest modifications to the upgrade
    process
2.  Upgrade confirmation if upgrades are available:
    -   If the answer is NO, the upgrade is aborted
    -   If the answer is YES, the script continues to the next step

3.  Pre-upgrade scripts are run.
4.  XiVO is upgraded
5.  Post-upgrade scripts are executed.
6.  All XiVO services are restarted in the right order.

Package architecture:

Binaries:

-   xivo-upgrade (Update xivo-upgrade package and
    execute real-xivo-upgrade)
-   real-xivo-upgrade (Execute upgrade of XiVO and restart services)

Libraries path: /usr/share/xivo-upgrade/

Directories:

-   pre-upgrade.d (All files in this directory will be executed before
    upgrading XiVO)
-   post-upgrade.d (All files in this directory will be executed after
    XiVO upgrade)

Current post-install scripts:

-   Update template for device configuration.
-   Update all device configurations to integrate the backup\_proxy\_ip
    from the HA configuration.
-   Set default web-interface language to english.

</p>

