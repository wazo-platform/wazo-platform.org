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


### XiVO >= 15.01

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
    [bugtracker](https://projects.wazo.community/projects/xivo/issues/new)
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

## External links {#external-links}

-   <https://wiki.asterisk.org/wiki/display/AST/Debugging>
-   <http://blog.wazo.community/visualizing-asterisk-deadlocks.html>
-   <https://wiki.asterisk.org/wiki/display/AST/Valgrind>
