---
title: Debugging Asterisk
---

## Precondition {#precondition}

To debug asterisk crashes or freezes, you need the following debug
packages on your Wazo:

Follow the instructions in the sub-section that matches the version you are currently using.

### Wazo >= 19.13

1. Set your Wazo version:
    export WAZO_VERSION=<current-wazo-version>

2. Update your Wazo mirrors to be sure not to upgrade Asterisk:
    wazo-dist -a wazo-${WAZO_VERSION}

3. Install dependencies:
    apt-get update
    apt-get install gdb libc6-dbg
    apt-get install -t wazo-${WAZO_VERSION} asterisk-dbg wazo-libsccp-dbg

4. Switch back to the production mirror:
    wazo-dist -m pelican-buster


### Wazo >= 19.04

1. Set your Wazo version:
    export WAZO_VERSION=<current-wazo-version>

2. Update your Wazo mirrors to be sure not to upgrade Asterisk:
    wazo-dist -a wazo-${WAZO_VERSION}

3. Install dependencies:
    apt-get update
    apt-get install gdb libc6-dbg
    apt-get install -t wazo-${WAZO_VERSION} asterisk-dbg wazo-libsccp-dbg

4. Switch back to the production mirror:
    wazo-dist -m pelican-stretch


### Wazo >= 18.03

1. Set your Wazo version:
    export WAZO_VERSION=<current-wazo-version>

2. Update your Wazo mirrors to be sure not to upgrade Asterisk:
    wazo-dist -a wazo-${WAZO_VERSION}

3. Install dependencies:
    apt-get update
    apt-get install gdb libc6-dbg
    apt-get install -t wazo-${WAZO_VERSION} asterisk-dbg wazo-libsccp-dbg

4. Switch back to the production mirror:
    wazo-dist -m phoenix-stretch


### Wazo >= 16.16

1. Set your Wazo version:
    export WAZO_VERSION=<current-wazo-version>

2. Update your Wazo mirrors to be sure not to upgrade Asterisk:
    xivo-dist wazo-${WAZO_VERSION}

3. Install dependencies:
    apt-get update
    apt-get install gdb libc6-dbg
    apt-get install -t wazo-${WAZO_VERSION} asterisk-dbg xivo-libsccp-dbg

4. Switch back to the production mirror:
    xivo-dist phoenix


### XiVO >= 16.01

1. Set your Wazo version:
    export WAZO_VERSION=<current-wazo-version>

2. Update your Wazo mirrors to be sure not to upgrade Asterisk:
    xivo-dist xivo-${WAZO_VERSION}

3. Install dependencies:
    apt-get update
    apt-get install gdb libc6-dbg
    apt-get install -t xivo-${WAZO_VERSION} asterisk-dbg xivo-libsccp-dbg

4. Switch back to the production mirror:
    xivo-dist xivo-five


## So There is a Problem with Asterisk. Now What ? {#so-there-is-a-problem-with-asterisk-now-what}

1.  Find out the time of the incident from the people most likely to
    know
2.  Determine if there was a segfault
    1.  The command `grep segfault /var/log/syslog` should return a line
        such as the following:

            Oct 16 16:12:43 xivo-1 kernel: [10295061.047120] asterisk[1255]: segfault at e ip b751aa6b sp b5ef14d4 error 4 in libc-2.11.3.so[b74ad000+140000]

    2.  Note the exact time of the incident from the segfault line.
    3.  Follow the [Debugging Asterisk Crash](#debugging-asterisk-crash)
        procedure.

3.  If you observe some of the following common symptoms, follow the
    [Debugging Asterisk Freeze](#debugging-asterisk-freeze) procedure.
    -   The output of command `service asterisk status` says Asterisk
        PBX is running.
    -   No more calls are distributed and phones go to `No Service`.
    -   Command `core show channels` returns only headers (no data)
        right before returning
4.  Fetch Asterisk logs for the day of the crash (make sure file was not
    already logrotated):

        cp -a /var/log/asterisk/full /var/local/`date +"%Y%m%d"`-`hostname`-asterisk-full.log

5.  Open a new issue on the
    [bug tracker](https://wazo-dev.atlassian.net)
    with following information
    -   Tracker: Bug
    -   Status: New
    -   Category: Asterisk
    -   In versions: The version of your Wazo installation where the
        crash/freeze happened
    -   Subject : `Asterisk Crash` or `Asterisk Freeze`
    -   Description : Add as much context as possible, if possible, a
        scenario that lead to the issue, the date and time of issue,
        where we can fetch logs and backtrace
    -   Attach logs and backtrace (if available) to the ticket (issue
        must be saved, then edited and files attached to a comment).
    -   **DO NOT** attach the core file publicly! It may contain
        sensitive information like passwords and should only be shared
        with people you trust.

## Debugging Asterisk Crash {#debugging-asterisk-crash}

When asterisk crashes, it usually leaves a core file in
`/var/spool/asterisk/`{.interpreted-text role="file"}.

You can create a backtrace from a core file named `core_file` with:

    gdb -batch -ex "bt full" -ex "thread apply all bt" /usr/sbin/asterisk core_file > bt-threads.txt

## Debugging Asterisk Freeze {#debugging-asterisk-freeze}

You can create a backtrace of a running asterisk process with:

    gdb -batch -ex "thread apply all bt" /usr/sbin/asterisk $(pidof asterisk) > bt-threads.txt

If your version of asterisk has been compiled with the DEBUG\_THREADS
flag, you can get more information about locks with:

    asterisk -rx "core show locks" > core-show-locks.txt

#:exclamation: Debugging freeze without this information is usually a lot more
difficult.

Optionally, other information that can be interesting:

-   the output of `asterisk -rx 'core show channels'`
-   the verbose log of asterisk just before the freeze

## Recompiling Asterisk {#recompiling-asterisk}

It\'s relatively straightforward to recompile the asterisk version of
your Wazo with the DEBUG\_THREADS and DONT\_OPTIMIZE flag, which make
debugging an asterisk problem easier.

The steps are:

1.  Uncomment the `deb-src` line for the Wazo sources:

        sed -i 's/^# *deb-src/deb-src/' /etc/apt/sources.list.d/xivo*

2.  Fetch the asterisk source package:

        mkdir -p ~/ast-rebuild
        cd ~/ast-rebuild
        apt-get update
        apt-get install -y build-essential
        apt-get source asterisk

3.  Install the build dependencies:

        apt-get build-dep -y asterisk

4.  Enable the DEBUG\_THREADS and DONT\_OPTIMIZE flag:

        cd <asterisk-source-folder>
        vim debian/rules

5.  Update the changelog by appending `+debug1` in the package version:

        vim debian/changelog

6.  Rebuild the asterisk binary packages:

        dpkg-buildpackage -us -uc

This will create a couple of .deb files in the parent directory, which
you can install via dpkg.

### Recompiling a vanilla version of Asterisk (Wazo \< 17.17) {#recompiling-a-vanilla-version-of-asterisk-wazo-17.17}

It is sometimes useful to produce a \"vanilla\" version of Asterisk,
i.e. a version of Asterisk that has none of the Wazo patches applied, to
make sure that the problem is present in the original upstream code.
This is also sometimes necessary before opening a ticket on the
[Asterisk issue tracker](https://issues.asterisk.org).

The procedure is similar to the one described above. Before calling
`dpkg-buildpackage`, you just need to:

1.  Make sure `quilt` is installed:

        apt-get install -y quilt

2.  Unapply all the currently applied patches:

        quilt pop -a

3.  Remove all the lines in the `debian/patches/series` file:

        truncate -s0 debian/patches/series

When installing a vanilla version of Asterisk on a XiVO 16.08 or
earlier, you\'ll need to stop monit, otherwise it will restart asterisk
every few minutes.

### Recompiling a vanilla version of Asterisk (Wazo \>= 19.13) {#recompiling-a-vanilla-version-of-asterisk-wazo-19.13}

It is sometimes useful to produce a \"vanilla\" version of Asterisk,
i.e. a version of Asterisk that has none of the Wazo patches applied, to
make sure that the problem is present in the original upstream code.
This is also sometimes necessary before opening a ticket on the
[Asterisk issue tracker](https://issues.asterisk.org).

Wazo offers a vanilla version of Asterisk, compiled with the
DONT\_OPTIMIZE flag. This makes filing bug reports to Asterisk much
easier.

Note that this version of Asterisk loses some features that are specific
to Wazo. The removed features include:

-   Queue skill-based routing
-   Voicemail message consultation via REST API
-   Call transfers via REST API

To install the vanilla version of Asterisk (replace 19.13 with your
current version of Wazo):

    wazo-dist -a wazo-19.13
    apt-get update
    apt-get install -t wazo-19.13 asterisk-vanilla asterisk-vanilla-dbg
    xivo-fix-paths-rights
    wazo-dist -m pelican-buster

This command should replace the `asterisk` package with
`asterisk-vanilla`.

Once the packages are installed, you can reproduce the crash and extract
the backtrace logs from the core dump file. Those file may then be used
to file a bug report to Asterisk.

To revert this modification, reinstall `asterisk` (replace 19.13 with
your current version of Wazo):

    wazo-dist -a wazo-19.13
    apt-get update
    apt-get install -t wazo-19.13 asterisk
    xivo-fix-paths-rights
    wazo-dist -m pelican-buster

## Running Asterisk under Valgrind {#running-asterisk-under-valgrind}

1.  Install valgrind:

        apt-get install valgrind

2.  Recompile asterisk with the DONT\_OPTIMIZE flag.
3.  Edit `/etc/asterisk/modules.conf`{.interpreted-text role="file"} so
    that asterisk doesn\'t load unnecessary modules. This step is
    optional. It makes asterisk start (noticeably) faster and often
    makes the output of valgrind easier to analyze, since there\'s less
    noise.
4.  Edit `/etc/asterisk/asterisk.conf`{.interpreted-text role="file"}
    and comment the `highpriority` option. This step is optional.
5.  Stop monit and asterisk:

        monit quit
        service asterisk stop

6.  Stop all unneeded Wazo services. For example, it can be useful to
    stop wazo-calld, so that it won\'t interact with asterisk via the
    AMI.
7.  Copy the valgrind.supp file into /tmp. The valgrind.supp file is
    located in the contrib directory of the asterisk source code.
8.  Execute valgrind in the /tmp directory:

        cd /tmp
        valgrind --leak-check=full --log-file=valgrind.txt --suppressions=valgrind.supp --vgdb=no asterisk -G asterisk -U asterisk -fnc

Note that when you terminate asterisk with Control-C, asterisk does not
unload the modules before exiting. What this means is that you might
have lots of \"possibly lost\" memory errors due to that. If you already
know which modules is responsible for the memory leak/bug, you should
explicitly unload it before terminating asterisk.

Running asterisk under valgrind takes a lots of extra memory, so make
sure you have enough RAM.

## Visualizing asterisk deadlocks

It has recently come to our attention that a freeze would sometimes
occur in the asterisk application shipped with Wazo Platform.

When the freeze happened, no new calls would be accepted and most of the
current calls would freeze. A manual restart of the asterisk process
would then be required for the situation to get back to normal.

As you can understand, that's quite an unpleasant situation for a
telephony system like Wazo Platform.

So we began investigating on what was causing the freeze, knowing it was
probably some deadlocks occuring in the asterisk process.Fortunately for
us, asterisk provides some compile time flags that help with debugging
such conditions. This is documented [on the asterisk
wiki](https://wiki.asterisk.org/wiki/display/AST/Getting+a+Backtrace).

After recompiling the Wazo Platform version of asterisk with the `DEBUG_THREADS`
and `DONT_OPTIMIZE` flags, and with the help of some other people, we
were able to reproduce the freeze and get some information about the
various locks held by the various threads of the frozen asterisk process
via the `core show locks` command.

The output of the `core show locks` command looks like this:

```Log
=======================================================================
=== Currently Held Locks ==============================================
=======================================================================
===
=== <pending> <lock#> (<file>): <lock type> <line num> <function> <lock name> <lock addr> (times locked)
=== Thread ID: 0xb71ffb70 (tps_processing_function started at [  457] taskprocessor.c ast_taskprocessor_get())
=== ---> Lock #0 (event.c): RDLOCK 1488 handle_event &(&ast_event_subs[event_types[i]])->lock 0x822aa78 (1)
	/usr/sbin/asterisk(ast_bt_get_addresses+0x19) [0x812a024]
	/usr/sbin/asterisk(__ast_rwlock_rdlock+0xae) [0x8125263]
	/usr/sbin/asterisk() [0x80ef7a5]
	/usr/sbin/asterisk() [0x8194305]
	/usr/sbin/asterisk() [0x81a5939]
	/lib/i686/cmov/libpthread.so.0(+0x5955) [0xb7324955]
	/lib/i686/cmov/libc.so.6(clone+0x5e) [0xb75361de]
=== ---> Lock #1 (chan_agent.c): MUTEX 421 device_state_cb &(&agents)->lock 0xb64fab48 (1)
	/usr/sbin/asterisk(ast_bt_get_addresses+0x19) [0x812a024]
	/usr/sbin/asterisk(__ast_pthread_mutex_trylock+0xae) [0x8123886]
	/usr/lib/asterisk/modules/chan_agent.so(+0x2f8b) [0xb64e7f8b]
	/usr/sbin/asterisk() [0x80ef81d]
	/usr/sbin/asterisk() [0x8194305]
	/usr/sbin/asterisk() [0x81a5939]
	/lib/i686/cmov/libpthread.so.0(+0x5955) [0xb7324955]
	/lib/i686/cmov/libc.so.6(clone+0x5e) [0xb75361de]
=== ---> Waiting for Lock #2 (chan_agent.c): MUTEX 430 device_state_cb &p->lock 0x96a1a60 (1)
	/usr/sbin/asterisk(ast_bt_get_addresses+0x19) [0x812a024]
	/usr/sbin/asterisk(__ast_pthread_mutex_lock+0xae) [0x812351e]
	/usr/lib/asterisk/modules/chan_agent.so(+0x2fea) [0xb64e7fea]
	/usr/sbin/asterisk() [0x80ef81d]
	/usr/sbin/asterisk() [0x8194305]
	/usr/sbin/asterisk() [0x81a5939]
	/lib/i686/cmov/libpthread.so.0(+0x5955) [0xb7324955]
	/lib/i686/cmov/libc.so.6(clone+0x5e) [0xb75361de]
=== --- ---> Locked Here: chan_agent.c line 516 (agent_lock_owner)
=== -------------------------------------------------------------------
===
=== Thread ID: 0xb6cffb70 (do_devstate_changes  started at [  726] devicestate.c ast_device_state_engine_init())
=== ---> Lock #0 (astobj2.c): MUTEX 661 internal_ao2_callback c 0x9551498 (1)
	/usr/sbin/asterisk(ast_bt_get_addresses+0x19) [0x812a024]
	/usr/sbin/asterisk(__ast_pthread_mutex_lock+0xae) [0x812351e]
	/usr/sbin/asterisk(__ao2_lock+0x48) [0x8087fe4]
	/usr/sbin/asterisk() [0x8088b19]
	/usr/sbin/asterisk(__ao2_callback+0x56) [0x8088fa4]
	/usr/sbin/asterisk(__ao2_find+0x29) [0x80890c0]
	/usr/sbin/asterisk() [0x80afe6c]
	/usr/sbin/asterisk(ast_channel_get_by_name_prefix+0x28) [0x80aff2c]
	/usr/sbin/asterisk(ast_parse_device_state+0x43) [0x80dfc3e]
	/usr/sbin/asterisk() [0x80dff2d]
	/usr/sbin/asterisk() [0x80e03ac]
	/usr/sbin/asterisk() [0x80e0702]
	/usr/sbin/asterisk() [0x81a5939]
	/lib/i686/cmov/libpthread.so.0(+0x5955) [0xb7324955]
	/lib/i686/cmov/libc.so.6(clone+0x5e) [0xb75361de]
=== ---> Waiting for Lock #1 (channel.c): MUTEX 1703 ast_channel_cmp_cb chan 0xae044858 (1)
	/usr/sbin/asterisk(ast_bt_get_addresses+0x19) [0x812a024]
	/usr/sbin/asterisk(__ast_pthread_mutex_lock+0xae) [0x812351e]
	/usr/sbin/asterisk(__ao2_lock+0x48) [0x8087fe4]
	/usr/sbin/asterisk() [0x80afa11]
	/usr/sbin/asterisk() [0x8088bdf]
	/usr/sbin/asterisk(__ao2_callback+0x56) [0x8088fa4]
	/usr/sbin/asterisk(__ao2_find+0x29) [0x80890c0]
	/usr/sbin/asterisk() [0x80afe6c]
	/usr/sbin/asterisk(ast_channel_get_by_name_prefix+0x28) [0x80aff2c]
	/usr/sbin/asterisk(ast_parse_device_state+0x43) [0x80dfc3e]
	/usr/sbin/asterisk() [0x80dff2d]
	/usr/sbin/asterisk() [0x80e03ac]
	/usr/sbin/asterisk() [0x80e0702]
	/usr/sbin/asterisk() [0x81a5939]
	/lib/i686/cmov/libpthread.so.0(+0x5955) [0xb7324955]
	/lib/i686/cmov/libc.so.6(clone+0x5e) [0xb75361de]
=== --- ---> Locked Here: channel.c line 3767 (__ast_read)
=== --- ---> Locked Here: chan_agent.c line 515 (agent_lock_owner)
=== -------------------------------------------------------------------
...
```

and it continues this way for a total of 363 lines.

The big advantage of this representation is that you have a lot of info
to help with precise diagnostics and debugging. But there is a downside
to this:it is quite hard to quickly get the "big picture" of which
thread is waiting for which other thread, etc.

Since it seemed like there were no tools to help us with getting the big
picture, we wrote a really simple python script that takes the output of
the "core show locks" command and outputs a directed graph in [DOT
language](http://www.graphviz.org/content/dot-language) of the relations
between the threads. The generated graph is then fed to
[graphviz](http://www.graphviz.org/Home.php) to generate an image like
this:

[![Asterisk Deadlock](/images/blog/graph-locks_m.jpg "Asterisk Deadlock, oct. 2012")](/images/blog/graph-locks.png "Asterisk Deadlock")

Each node represents a thread, labeled with its thread ID, and edges
represent a "is waiting for" relation.

From the above image, we clearly see that there's a deadlock between
thread 0xaeb2db70 and thread 0xb6cffb70 since both are waiting for each
other. We also see a bunch of other threads waiting directly or
indirectly on the deadlocked threads, showing the generalized freeze of
the asterisk process.

The script, which is named graph\_ast\_locks.py, can be found in [the
xivo-tools
repository](https://github.com/wazo-platform/xivo-tools/tree/master/scripts).
Given you have the output of a "core show locks" invocation, and that
you have graphviz installed, you can then run the following command to
generate a graph in svg format:

```
graph_ast_locks.py core-show-locks.txt | circo -Tsvg -o graph-locks.svg
```

## External links {#external-links}

-   <https://wiki.asterisk.org/wiki/display/AST/Debugging>
-   <https://wiki.asterisk.org/wiki/display/AST/Valgrind>
