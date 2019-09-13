Title: XiVO Call Center Reporting Revamp
Date: 2012-08-02 15:17
Author: pcadotte
Category: Software
Tags: xivo 1.2, xivo, software, reporting
Slug: xivo-call-center-reporting-revamp
Status: published

One of the main feature of XiVO 1.2 is the call center reporting.

Motivation

The first draft of this new feature proved to be hard to maintain and
slow to generate statistics. Furthermore, the format of the cache (files
containing one month of statistics in JSON format) was not easy to
exploit and required more work while viewing daily statistics that would
use raw data instead of the pre generated cache for speed reasons.

![statistic\_queue.png](/images/blog/.statistic_queue_m.jpg "statistic_queue.png, août 2012")

To fix the problems we had with this first version, we decided to
rewrite the cache generation that is not dependent on statistic
configuration, avoiding the need to regenerate the cache every time a
configuration is changed.

The new cache format uses tables in the asterisk database to store
pre-analyzed data. These tables contains call related information (table
stat\_call\_on\_queue) and statistic for each hours of statistic
(stat\_queue\_periodic).

This new format make it a lot faster to generate the cache and easier to
generate tables and graphics in the web interface. Using an hour as the
base time for an entry also fix the problem of overlapping time range
that we had to solve with month based cache, where a week could start in
month n and end in month n + 1.

Difference from the first version for the user

The cache is only generated for complete hours. This means that if you
generate the cache at 12h15 the cache will end at 11h59 and the next
time the cache is generated, it will start at 12h00. The cache is also
continuously generated (once a day) and since the cache is independent
of the configuration, it does not have to be generated each time a
change is made to the configuration.

The way to generate the cache manually at this moment is to run
xivo-stat fill\_db from the command line on the XiVO. The generate cache
option of the web interface will run this action when the old cache
won't be required anymore.

What is done

Currently (version 12.14) all queue counters are now computed using the
new cache. Some errors are still shown on some page that we could not
port to the new system in time but most should be fixed in the next
version.

We are also working on the first agent counter that should be available
in version (12.15) and all other agents counters should be added in the
next 2 versions.

Some changes to the configuration are to expected when our work will be
done with the counters to reflect the new cache generation, but these
changes should be minor and all migration will be handled automatically
as usual.

Work methodology

A second aspect of this second version that was not present in the first
one is that we are also developing tools to generate calls and check the
generated statistics to avoid any regressions in future versions. This
process has been more time consuming than developing the counters
themselves but is a step to better test automation for XiVO.

Documentation

The documentation for call center statistics is
available[here](http://documentation.xivo.io/dev/contact_center/statistics/statistics.html "Call center statistics").

The code

xivo-stat is available at git://git.xivo.io/official/xivo-stat.git

xivo-callgen is available at git://git.xivo.io/official/xivo-callgen.git

</p>

