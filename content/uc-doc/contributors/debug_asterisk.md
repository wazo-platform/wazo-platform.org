---
title: Debugging Asterisk
---

## Precondition {#precondition}

To debug asterisk crashes or freezes, you need the following debug packages on your Wazo:

Follow the instructions in the sub-section that matches the version you are currently using.

### Wazo >= 19.13

1. Set your Wazo version:

   ```shell
   export WAZO_VERSION=<current-wazo-version>
   ```

2. Update your Wazo mirrors to be sure not to upgrade Asterisk:

   ```shell
   wazo-dist -a wazo-${WAZO_VERSION}
   ```

3. Install dependencies:

   ```shell
   apt-get update
   apt-get install gdb libc6-dbg
   apt-get install -t wazo-${WAZO_VERSION} asterisk-dbgsym wazo-libsccp-dbg
   ```

4. Switch back to the production mirror:

   ```shell
    wazo-dist -m pelican-bullseye
   ```

### Wazo >= 19.04

1. Set your Wazo version:

   ```shell
   export WAZO_VERSION=<current-wazo-version>
   ```

2. Update your Wazo mirrors to be sure not to upgrade Asterisk:

   ```shell
   wazo-dist -a wazo-${WAZO_VERSION}
   ```

3. Install dependencies:

   ```shell
   apt-get update
   apt-get install gdb libc6-dbg
   apt-get install -t wazo-${WAZO_VERSION} asterisk-dbgsym wazo-libsccp-dbg
   ```

4. Switch back to the production mirror:

   ```shell
   wazo-dist -m pelican-stretch
   ```

### Wazo >= 18.03

1. Set your Wazo version:

   ```shell
   export WAZO_VERSION=<current-wazo-version>
   ```

2. Update your Wazo mirrors to be sure not to upgrade Asterisk:

   ```shell
   wazo-dist -a wazo-${WAZO_VERSION}
   ```

3. Install dependencies:

   ```shell
   apt-get update
   apt-get install gdb libc6-dbg
   apt-get install -t wazo-${WAZO_VERSION} asterisk-dbgsym wazo-libsccp-dbg
   ```

4. Switch back to the production mirror:

   ```shell
   wazo-dist -m phoenix-stretch
   ```

### Wazo >= 17.01

1. Set your Wazo version:

   ```shell
   export WAZO_VERSION=<current-wazo-version>
   ```

2. Update your Wazo mirrors to be sure not to upgrade Asterisk:

   ```shell
   wazo-dist -a wazo-${WAZO_VERSION}
   ```

3. Install dependencies:

   ```shell
   apt-get update
   apt-get install gdb libc6-dbg
   apt-get install -t wazo-${WAZO_VERSION} asterisk-dbg wazo-libsccp-dbg
   ```

4. Switch back to the production mirror:

   ```shell
   wazo-dist phoenix
   ```

## So There is a Problem with Asterisk. Now What ? {#so-there-is-a-problem-with-asterisk-now-what}

1.  Find out the time of the incident from the people most likely to know
2.  Determine if there was a segfault

    1.  The command `grep segfault /var/log/syslog` should return a line such as the following:

        ```log
        Oct 16 16:12:43 xivo-1 kernel: [10295061.047120] asterisk[1255]: segfault at e ip b751aa6b sp b5ef14d4 error 4 in libc-2.11.3.so[b74ad000+140000]
        ```

    2.  Note the exact time of the incident from the segfault line.
    3.  Follow the [Debugging Asterisk Crash](#debugging-asterisk-crash) procedure.

3.  If you observe some of the following common symptoms, follow the
    [Debugging Asterisk Freeze](#debugging-asterisk-freeze) procedure.
    - The output of command `service asterisk status` says Asterisk PBX is running.
    - No more calls are distributed and phones go to `No Service`.
    - Command `core show channels` returns only headers (no data) right before returning
4.  Fetch Asterisk logs for the day of the crash (make sure file was not already logrotated):

    ```shell
    cp -a /var/log/asterisk/full /var/local/`date +"%Y%m%d"`-`hostname`-asterisk-full.log
    ```

5.  Open a new issue on the [bug tracker](https://wazo-dev.atlassian.net) with following information
    - Tracker: Bug
    - Status: New
    - Category: Asterisk
    - In versions: The version of your Wazo installation where the crash/freeze happened
    - Subject : `Asterisk Crash` or `Asterisk Freeze`
    - Description : Add as much context as possible, if possible, a scenario that lead to the issue,
      the date and time of issue, where we can fetch logs and backtrace
    - Attach logs and backtrace (if available) to the ticket (issue must be saved, then edited and
      files attached to a comment).
    - **DO NOT** attach the core file publicly! It may contain sensitive information like passwords
      and should only be shared with people you trust.

## Debugging Asterisk Crash {#debugging-asterisk-crash}

When asterisk crashes, it usually leaves a core file in `/var/spool/asterisk/`.

You can create a backtrace from a core file named `core_file` with:

```shell
gdb -batch -ex "bt full" -ex "thread apply all bt" /usr/sbin/asterisk core_file > bt-threads.txt
```

## Debugging Asterisk Freeze {#debugging-asterisk-freeze}

You can create a backtrace of a running asterisk process with:

```shell
gdb -batch -ex "thread apply all bt" /usr/sbin/asterisk $(pidof asterisk) > bt-threads.txt
```

If your version of asterisk has been compiled with the `DEBUG_THREADS` flag, you can get more
information about locks with:

```shell
asterisk -rx "core show locks" > core-show-locks.txt
```

**Note**: Debugging freeze without this information is usually a lot more difficult.

Optionally, other information that can be interesting:

- the output of `asterisk -rx 'core show channels'`
- the verbose log of asterisk just before the freeze

### Debugging Asterisk Freeze using a core dump

Most of the time Asterisk has been stopped by the `wazo-res-freeze-check` module and a core file
will be available in `/var/spool/asterisk`. The first step is to figure out which threads were
blocking each other.

#### Finding the culprits

1. Extract all back traces from the core dump

```shell
gdb -batch -ex "bt full" -ex "thread apply all bt" /usr/sbin/asterisk core_file > bt-threads.txt
```

2. Find mutexes being waited on

```shell
grep -Eo 'mutex_name=mutex_name@entry=0x[0-9a-z]+' bt-threads.txt | sort | uniq -c
```

This will produce a list of mutex that you can then search for in the `bt-threads.txt` file.

```
     4 mutex_name=mutex_name@entry=0x562d24cc9cfe
     1 mutex_name=mutex_name@entry=0x562d24cca99b
     1 mutex_name=mutex_name@entry=0x562d24ccab82
     1 mutex_name=mutex_name@entry=0x562d24ccb136
     2 mutex_name=mutex_name@entry=0x562d24ccb386
     1 mutex_name=mutex_name@entry=0x562d24ccb9a8
     1 mutex_name=mutex_name@entry=0x562d24ce0e34
     2 mutex_name=mutex_name@entry=0x562d24ce5b51
     9 mutex_name=mutex_name@entry=0x562d24ceca31
    13 mutex_name=mutex_name@entry=0x562d24d0369b
     1 mutex_name=mutex_name@entry=0x562d24d159b5
    20 mutex_name=mutex_name@entry=0x562d24d15bb4
     1 mutex_name=mutex_name@entry=0x7fa1bc3d002a
    10 mutex_name=mutex_name@entry=0x7fa1bce4f2d2
```

3. Following the locks

Starting with the mutex that is being waited on the most, look at one of the thread waiting on this
lock.

In this example we will start with the mutex `0x562d24d15bb4` which was being waited on by 20
threads at the time of the core dump.

In the `bt-threads.txt` file, search for `0x562d24d15bb4` and stop at any of the matches.

```
Thread 175 (Thread 0x7fa186bc9700 (LWP 1680946)):
#0  __lll_lock_wait () at ../sysdeps/unix/sysv/linux/x86_64/lowlevellock.S:103
#1  0x00007fa1c1c457d1 in __GI___pthread_mutex_lock (mutex=mutex@entry=0x562d2713de70) at ../nptl/pthre
ad_mutex_lock.c:115
#2  0x0000562d24b90298 in __ast_pthread_mutex_lock (filename=filename@entry=0x562d24cd0000 "channel.c",
 lineno=lineno@entry=918, func=func@entry=0x562d24cd8d40 <__PRETTY_FUNCTION__.22261> "__ast_channel_all
oc_ap", mutex_name=mutex_name@entry=0x562d24d15bb4 "channels", t=t@entry=0x562d2713de70) at lock.c:326
#3  0x0000562d24ae65da in __ao2_lock (user_data=<optimized out>, lock_how=lock_how@entry=AO2_LOCK_REQ_MUTEX, file=file@entry=0x562d24cd0000 "channel.c", func=func@entry=0x562d24cd8d40 <__PRETTY_FUNCTION__.22261> "__ast_channel_alloc_ap", line=line@entry=918, var=var@entry=0x562d24d15bb4 "channels") at astobj2.c:241
#4  0x0000562d24b22bdf in __ast_channel_alloc_ap (needqueue=<optimized out>, state=0, cid_num=<optimized out>, cid_name=<optimized out>, acctcode=0x562d24d012d2 <__ast_string_field_empty_buffer+2> "", exten=<optimized out>, context=0x7fa1a4c66c38 "default-key-1025-from-extern", assignedids=0x0, requestor=0x7fa16c183490, amaflag=AST_AMA_NONE, endpoint=0x562d2870a1c0, file=0x7fa19f9b22ef "chan_pjsip.c", line=569, function=0x7fa19f9b1a60 <__FUNCTION__.31567> "chan_pjsip_new", name_fmt=0x7fa19f9b26e5 "PJSIP/%s-%08x", ap=0x7fa186bc48d0) at channel.c:918
...
#13 0x0000562d24bb2a7f in pbx_extension_helper (c=c@entry=0x7fa16c183490, context=0x7fa16c183e50 "outcall", exten=exten@entry=0x7fa16c183ea0 "dial", priority=priority@entry=8, label=label@entry=0x0, callerid=callerid@entry=0x7fa16c08afb0 "0134428000", action=E_SPAWN, found=0x7fa186bc8cac, combined_find_spawn=1, con=0x0) at pbx.c:2947
#14 0x0000562d24bb4733 in ast_spawn_extension (combined_find_spawn=1, found=0x7fa186bc8cac, callerid=0x7fa16c08afb0 "0134428000", priority=8, exten=0x7fa16c183ea0 "dial", context=<optimized out>, c=0x7fa16c183490) at pbx.c:4206
#15 __ast_pbx_run (c=c@entry=0x7fa16c183490, args=args@entry=0x0) at pbx.c:4380
#16 0x0000562d24bb5e0b in pbx_thread (data=data@entry=0x7fa16c183490) at pbx.c:4704
#17 0x0000562d24c3a8bf in dummy_start (data=<optimized out>) at utils.c:1572
#18 0x00007fa1c1c42fa3 in start_thread (arg=<optimized out>) at pthread_create.c:486
#19 0x00007fa1c18194cf in clone () at ../sysdeps/unix/sysv/linux/x86_64/clone.S:95
```

Then we want to find the owner of the mutex. Using the address of the underlying `pthread_mutex_t`,
we can find the owner id. This is the `t` field in the second frame.

```sh
gdb /usr/sbin/asterisk core_file
(gdb) p *((pthread_mutex_t *) 0x562d2713de70)
$1 = pthread_mutex_t = {Type = Recursive, Status = Acquired, possibly with waiters, Owner ID = 1677129, Robust = No, Shared = No, Protocol = None}
```

Now back to the `bt-threads.txt` we can search for `1677129` the owner of the `pthread_mutex_t`

```sh
% grep '1677129' bt-threads.txt
[New LWP 1677129]
Thread 135 (Thread 0x7fa137aa0700 (LWP 1677129)):
```

Now back to `gdb` we can move to thread 135 and repeat the same process.

At a certain point you will notice a loop between the threads. All threads that are part of the loop
are part of the freeze.

#### Other threads

Some threads in Asterisk are not started from a user interaction. Once you found which threads are
locked, it can be interesting to find out what triggered the current threads.

In this example on frame 5 we can see that we are most likely in a scheduled thread because of the
name of the function `bridge_channel_ind_thread` searching through the code we can find the type of
it's parameter and then print it using the appropriate cast to find the calling function.

```gdb
#0  __lll_lock_wait () at ../sysdeps/unix/sysv/linux/x86_64/lowlevellock.S:103
#1  0x00007f1bedfd87d1 in __GI___pthread_mutex_lock (mutex=mutex@entry=0x7f1bd48616b0)
    at ../nptl/pthread_mutex_lock.c:115
#2  0x000056105271b298 in __ast_pthread_mutex_lock (filename=filename@entry=0x56105285aff9 "bridge_channel.c",
    lineno=lineno@entry=2885,
    func=func@entry=0x56105285c0f0 <__PRETTY_FUNCTION__.19010> "bridge_channel_internal_join",
    mutex_name=mutex_name@entry=0x561052870b51 "peer", t=t@entry=0x7f1bd48616b0) at lock.c:326
#3  0x00005610526715da in __ao2_lock (user_data=user_data@entry=0x7f1bd48616f0,
    lock_how=lock_how@entry=AO2_LOCK_REQ_MUTEX, file=file@entry=0x56105285aff9 "bridge_channel.c",
    func=func@entry=0x56105285c0f0 <__PRETTY_FUNCTION__.19010> "bridge_channel_internal_join",
    line=line@entry=2885, var=var@entry=0x561052870b51 "peer") at astobj2.c:241
#4  0x000056105269a251 in bridge_channel_internal_join (bridge_channel=bridge_channel@entry=0x7f1bd4694f90)
    at bridge_channel.c:2885
#5  0x00005610526877ad in bridge_channel_ind_thread (data=data@entry=0x7f1bd4694f90) at bridge.c:1823
#6  0x00005610527c58bf in dummy_start (data=<optimized out>) at utils.c:1572
#7  0x00007f1bedfd5fa3 in start_thread (arg=<optimized out>) at pthread_create.c:486
#8  0x00007f1bedbac4cf in clone () at ../sysdeps/unix/sysv/linux/x86_64/clone.S:95
```

Using the `data` parameter from frame 5 and the type from the source code.

```sh
gdb /usr/sbin/asterisk core_file
(gdb) p *((struct ast_bridge_channel *) 0x7fa18c4acc00)
$1 = ... bridge = 0x7fa18c16b080, ...
```

Then searching bt-threads we can find which thread scheduled this one using the bridge address.

```
Thread 143 (Thread 0x7fa136236700 (LWP 1680912)):
#0  futex_wait_cancelable (private=0, expected=0, futex_word=0x7fa136231cd8) at ../sysdeps/unix/sysv/li
nux/futex-internal.h:88
#1  __pthread_cond_wait_common (abstime=0x0, mutex=0x7fa136231c78, cond=0x7fa136231cb0) at pthread_cond
_wait.c:502
#2  __pthread_cond_wait (cond=cond@entry=0x7fa136231cb0, mutex=mutex@entry=0x7fa136231c78) at pthread_c
ond_wait.c:655
#3  0x0000562d24b9030d in __ast_cond_wait (filename=filename@entry=0x562d24ccadb5 "bridge.c", lineno=li
neno@entry=1677, func=func@entry=0x562d24ccdab0 <__PRETTY_FUNCTION__.18917> "bridge_channel_impart_wait
", cond_name=cond_name@entry=0x562d24ccb142 "&cond->cond", mutex_name=mutex_name@entry=0x562d24ccb136 "
&cond->lock", cond=cond@entry=0x7fa136231cb0, t=0x7fa136231c78) at lock.c:588
#4  0x0000562d24afce9b in bridge_channel_impart_wait (cond=0x7fa136231c70) at bridge.c:1677
#5  bridge_impart_internal (cond=0x7fa136231c70, flags=3, features=0x7fa18c034180, swap=0x0, chan=0x7fa
18c0c6b60, bridge=0x7fa18c19dae0) at bridge.c:1925
#6  ast_bridge_impart (bridge=bridge@entry=0x7fa18c16b080, chan=chan@entry=0x7fa18c0c6b60, swap=swap@entry=0x0, features=features@entry=0x7fa18c034180, flags=flags@entry=3) at bridge.c:1965
#7  0x0000562d24c7d0ae in ast_bridge_call_with_flags (chan=chan@entry=0x7fa13ca1ec50, peer=peer@entry=0x7fa18c0c6b60, config=config@entry=0x7fa136232050, flags=flags@entry=0) at features.c:678
#8  0x0000562d24c7d277 in ast_bridge_call (chan=chan@entry=0x7fa13ca1ec50, peer=peer@entry=0x7fa18c0c6b60, config=config@entry=0x7fa136232050) at features.c:733
#9  0x00007fa1bd8a5269 in dial_exec_full (chan=0x7fa13ca1ec50, data=<optimized out>, peerflags=peerflags@entry=0x7fa136232ae0, continue_exec=continue_exec@entry=0x0) at app_dial.c:3331
#10 0x00007fa1bd8a6066 in dial_exec (chan=<optimized out>, data=<optimized out>) at app_dial.c:3399
#11 0x0000562d24bbe262 in pbx_exec (c=c@entry=0x7fa13ca1ec50, app=app@entry=0x562d28e893e0, data=data@entry=0x7fa136233c00 "PJSIP/B3jeYEvK/sip:B3jeYEvK@92.154.43.20:60694;x-ast-orig-host=172.16.200.25:5060,30,b(wazo-pre-dial-hooks^s^1)") at ./include/asterisk/strings.h:67
#12 0x0000562d24bb2a7f in pbx_extension_helper (c=c@entry=0x7fa13ca1ec50, context=0x7fa13ca1f610 "user", exten=exten@entry=0x7fa13ca1f660 "s", priority=priority@entry=44, label=label@entry=0x0, callerid=callerid@entry=0x7fa13c568810 "0386353839", action=E_SPAWN, found=0x7fa136235cac, combined_find_spawn=1, con=0x0) at pbx.c:2947
#13 0x0000562d24bb4733 in ast_spawn_extension (combined_find_spawn=1, found=0x7fa136235cac, callerid=0x7fa13c568810 "0386353839", priority=44, exten=0x7fa13ca1f660 "s", context=<optimized out>, c=0x7fa13ca1ec50) at pbx.c:4206
#14 __ast_pbx_run (c=c@entry=0x7fa13ca1ec50, args=args@entry=0x0) at pbx.c:4380
#15 0x0000562d24bb5e0b in pbx_thread (data=data@entry=0x7fa13ca1ec50) at pbx.c:4704
#16 0x0000562d24c3a8bf in dummy_start (data=<optimized out>) at utils.c:1572
#17 0x00007fa1c1c42fa3 in start_thread (arg=<optimized out>) at pthread_create.c:486
#18 0x00007fa1c18194cf in clone () at ../sysdeps/unix/sysv/linux/x86_64/clone.S:95
```

#### Getting the log for this freeze

Using the thread ID we can filter the full log to extract only the lines from the threads we are
interested in.

```shell
grep -E '(1681007|1680934|1680912)' full
```

## Recompiling Asterisk {#recompiling-asterisk}

It's relatively straightforward to recompile the asterisk version of your Wazo with the
`DEBUG_THREADS` and `DONT_OPTIMIZE` flag, which make debugging an asterisk problem easier.

The steps are:

1.  Uncomment the `deb-src` line for the Wazo sources:

    ```shell
        sed -i 's/^# *deb-src/deb-src/' /etc/apt/sources.list.d/xivo*

    ```

2.  Fetch the asterisk source package:

    ```shell
    mkdir -p ~/ast-rebuild
    cd ~/ast-rebuild
    apt-get update
    apt-get install -y build-essential
    apt-get source asterisk
    ```

3.  Install the build dependencies:

    ```shell
    apt-get build-dep -y asterisk
    ```

4.  Enable the `DEBUG_THREADS` and `DONT_OPTIMIZE` flag:

    ```shell
    cd <asterisk-source-folder>
    vim debian/rules
    ```

5.  Update the changelog by appending `+debug1` in the package version:

    ```shell
    vim debian/changelog
    ```

6.  Rebuild the asterisk binary packages:

    ```shell
    dpkg-buildpackage -us -uc
    ```

This will create a couple of .deb files in the parent directory, which you can install via `dpkg`.

### Recompiling a vanilla version of Asterisk (Wazo \< 17.17) {#recompiling-a-vanilla-version-of-asterisk-wazo-17.17}

It is sometimes useful to produce a "vanilla" version of Asterisk, i.e. a version of Asterisk that
has none of the Wazo patches applied, to make sure that the problem is present in the original
upstream code. This is also sometimes necessary before opening a ticket on the
[Asterisk issue tracker](https://issues.asterisk.org).

The procedure is similar to the one described above. Before calling `dpkg-buildpackage`, you just
need to:

1.  Make sure `quilt` is installed:

    ```shell
    apt-get install -y quilt
    ```

2.  Unapply all the currently applied patches:

    ```shell
    quilt pop -a
    ```

3.  Remove all the lines in the `debian/patches/series` file:

    ```shell
    truncate -s0 debian/patches/series
    ```

When installing a vanilla version of Asterisk, you'll need to stop `monit`, otherwise it will
restart asterisk every few minutes.

### Recompiling a vanilla version of Asterisk (Wazo \>= 19.13) {#recompiling-a-vanilla-version-of-asterisk-wazo-19.13}

It is sometimes useful to produce a "vanilla" version of Asterisk, i.e. a version of Asterisk that
has none of the Wazo patches applied, to make sure that the problem is present in the original
upstream code. This is also sometimes necessary before opening a ticket on the
[Asterisk issue tracker](https://issues.asterisk.org).

Wazo offers a vanilla version of Asterisk, compiled with the `DONT_OPTIMIZE` flag. This makes filing
bug reports to Asterisk much easier.

Note that this version of Asterisk loses some features that are specific to Wazo. The removed
features include:

- Queue skill-based routing
- Voicemail message consultation via REST API
- Call transfers via REST API

To install the vanilla version of Asterisk (replace 19.13 with your current version of Wazo):

```shell
wazo-dist -a wazo-19.13
apt-get update
apt-get install -t wazo-19.13 asterisk-vanilla asterisk-vanilla-dbgsym
xivo-fix-paths-rights
wazo-dist -m pelican-bullseye
```

This command should replace the `asterisk` package with `asterisk-vanilla`.

Once the packages are installed, you can reproduce the crash and extract the backtrace logs from the
core dump file. Those file may then be used to file a bug report to Asterisk.

To revert this modification, reinstall `asterisk` (replace 19.13 with your current version of Wazo):

```shell
wazo-dist -a wazo-19.13
apt-get update
apt-get install -t wazo-19.13 asterisk
xivo-fix-paths-rights
wazo-dist -m pelican-bullseye
```

## Running Asterisk under Valgrind {#running-asterisk-under-valgrind}

1.  Install valgrind:

    ```shell
    apt-get install valgrind
    ```

2.  Recompile asterisk with the `DONT_OPTIMIZE` flag.
3.  Edit `/etc/asterisk/modules.conf` so that asterisk doesn't load unnecessary modules. This step
    is optional. It makes asterisk start (noticeably) faster and often makes the output of valgrind
    easier to analyze, since there's less noise.
4.  Edit `/etc/asterisk/asterisk.conf` and comment the `highpriority` option. This step is optional.
5.  Stop monit and asterisk:

    ```shell
    monit quit
    service asterisk stop
    ```

6.  Stop all unneeded Wazo services. For example, it can be useful to stop wazo-calld, so that it
    won't interact with asterisk via the AMI.
7.  Copy the valgrind.supp file into /tmp. The valgrind.supp file is located in the contrib
    directory of the asterisk source code.
8.  Execute valgrind in the /tmp directory:

    ```shell
    cd /tmp
    valgrind --leak-check=full --log-file=valgrind.txt --suppressions=valgrind.supp --vgdb=no asterisk -G asterisk -U asterisk -fnc
    ```

Note that when you terminate asterisk with Control-C, asterisk does not unload the modules before
exiting. What this means is that you might have lots of "possibly lost" memory errors due to that.
If you already know which modules is responsible for the memory leak/bug, you should explicitly
unload it before terminating asterisk.

Running asterisk under valgrind takes a lots of extra memory, so make sure you have enough RAM.

## External links {#external-links}

- <https://docs.asterisk.org/Development/Debugging>
