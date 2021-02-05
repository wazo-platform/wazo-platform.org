Profiling Python Programs
=========================

Profiling CPU/Time Usage (single thread)
----------------------------------------

Here's an example on how to profile wazo-auth for CPU/time usage:

1.  Stop the monit daemon:

```ShellSession
# service monit stop
```

2.  Stop the process you want to profile, i.e. wazo-auth:

```ShellSession
# service wazo-auth stop
```

3.  Start the service in foreground mode running with the profiler:

```ShellSession
$ python -m cProfile -o test.profile /usr/bin/wazo-auth -f
```

This will create a file named `test.profile` when the process
terminates.

To profile wazo-confgend, you must use this command instead of the
one above:

```ShellSession
$ twistd -p test.profile --profiler=cprofile --savestats -no --python=/usr/bin/wazo-confgend
```

Note that profiling multi-threaded program (wazo-agid, wazo-confd) doesn't work reliably using this
profiler. To profile multi-threaded programs, read the next section.

The [debug-daemons](/contribute/debug_daemon) section documents how to launch the
various Wazo services in foreground/debug mode.

4.  Examine the result of the profiling:

```ShellSession
$ python -m pstats test.profile
Welcome to the profile statistics browser.
% sort time
% stats 15
...
% sort cumulative
% stats 15
```

Profiling CPU/Time Usage (multiple threads)
-------------------------------------------

Here's an example on how to profile wazo-amid for CPU/time usage:

1.  Stop the monit daemon:

```ShellSession
# service monit stop
```

2.  Stop the process you want to profile, i.e. wazo-amid:

```ShellSession
# service wazo-amid stop
```

3.  Install the profiler

```ShellSession
pip3 install yappi
```

4. Create the profiling stats file. This is necessary because the daemon will drop privileges while
running, and will not be able to write the stats when it stops.

```ShellSession
install -o www-data -g www-data /dev/null /tmp/wazo-amid-profile.callgrind
```

5. Start the service in foreground mode running with the profiler:

```ShellSession
python3 -m yappi -f callgrind -o /tmp/wazo-amid-profile.callgrind.out /usr/bin/wazo-amid
```

This will create a file named `/tmp/wazo-amid-profile.callgrind.out` when the process
terminates.

The [debug-daemons](/contribute/debug_daemon) section documents how to launch the
various Wazo services in foreground/debug mode.

6.  Examine the result of the profiling with a graphical analysis tool like KCacheGrind.

Measuring Code Coverage
-----------------------

Here's an example on how to measure the code coverage of wazo-auth.

This can be useful when you suspect a piece of code to be unused and you
want to have additional information about it.

1.  Install the following packages:

```ShellSession
# apt-get install python-pip build-essential python-dev
```

2.  Install coverage via pip:

```ShellSession
# pip install coverage
```

3.  Run the program in foreground mode with `coverage run`:

```ShellSession
# service monit stop
# service wazo-auth stop
# coverage erase
# coverage run /usr/bin/wazo-auth -f
```

The [debug-daemons](/contribute/debug_daemon) section documents how to launch the
various Wazo service in foreground/debug mode.

4.  After the process terminates, use `coverage html` to generate an
    HTML coverage report:

```ShellSession
$ coverage html --include='*wazo_calld*'
```

This will generate an [htlmcov]{role="file"} directory in the
current directory.

5.  Browse the coverage report.

Either copy the directory onto your computer and open it with a web
browser, or start a web server on the Wazo:

```ShellSession
$ cd htmlcov
$ python -m SimpleHTTPServer
```

Then open the page from your computer (i.e. not on the Wazo):

```ShellSession
$ firefox http://<wazo-hostname>:8000
```

External Links
--------------

-   [Official python
    documentation](http://docs.python.org/library/profile.html)
-   [PyMOTW](https://doughellmann.com/blog/2008/08/31/pymotw-profile-cprofile-pstats/)
-   [coverage.py](http://nedbatchelder.com/code/coverage/)
