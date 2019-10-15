Visualizing asterisk deadlocks
==============================

It has recently come to our attention that a freeze would sometimes
occur in the asterisk application shipped with XiVO.

When the freeze happened, no new calls would be accepted and most of the
current calls would freeze. A manual restart of the asterisk process
would then be required for the situation to get back to normal.

As you can understand, that's quite an unpleasant situation for a
telephony system like XiVO.

So we began investigating on what was causing the freeze, knowing it was
probably some deadlocks occuring in the asterisk process.Fortunately for
us, asterisk provides some compile time flags that help with debugging
such conditions. This is documented [on the asterisk
wiki](https://wiki.asterisk.org/wiki/display/AST/Getting+a+Backtrace).

After recompiling the XiVO version of asterisk with the DEBUG\_THREADS
and DONT\_OPTIMIZE flags, and with the help of some other people, we
were able to reproduce the freeze and get some information about the
various locks held by the various threads of the frozen asterisk process
via the "coreshow locks" command.

The output of the "core show locks" command looks like this:

~~~
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
~~~


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

[![Asterisk
Deadlock](/images/blog/.graph-locks_m.jpg "Asterisk Deadlock, oct. 2012")](/images/blog/graph-locks.png "Asterisk Deadlock")

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

~~~
graph_ast_locks.py core-show-locks.txt | circo -Tsvg -o graph-locks.svg
~~~
