Profiling Python Programs
=========================

Profiling CPU/Time Usage
------------------------

Here\'s an example on how to profile wazo-auth for CPU/time usage:

1.  Stop the monit daemon:

        service monit stop

2.  Stop the process you want to profile, i.e. wazo-auth:

        service wazo-auth stop

3.  Start the service in foreground mode running with the profiler:

        python -m cProfile -o test.profile /usr/bin/xivo-auth -f

    This will create a file named `test.profile` when the process
    terminates.

    To profile xivo-confgend, you must use this command instead of the
    one above:

        twistd -p test.profile --profiler=cprofile --savestats -no --python=/usr/bin/xivo-confgend

    Note that profiling multi-threaded program (wazo-agid, wazo-confd)
    doesn\'t work reliably.

    The [debug-daemons]{role="ref"} section documents how to launch the
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

Measuring Code Coverage
-----------------------

Here\'s an example on how to measure the code coverage of wazo-auth.

This can be useful when you suspect a piece of code to be unused and you
want to have additional information about it.

1.  Install the following packages:

        apt-get install python-pip build-essential python-dev

2.  Install coverage via pip:

        pip install coverage

3.  Run the program in foreground mode with `coverage run`:

```ShellSession
service monit stop
service wazo-auth stop
coverage erase
coverage run /usr/bin/wazo-auth -f
```

The [debug-daemons](/contribute/debug_daemon) section documents how to launch the
various Wazo service in foreground/debug mode.

4.  After the process terminates, use `coverage html` to generate an
    HTML coverage report:

        coverage html --include='*wazo_calld*'

This will generate an [htlmcov]{role="file"} directory in the
current directory.

5.  Browse the coverage report.

Either copy the directory onto your computer and open it with a web
browser, or start a web server on the Wazo:

        cd htmlcov
        python -m SimpleHTTPServer

Then open the page from your computer (i.e. not on the Wazo):

        firefox http://<wazo-hostname>:8000

External Links
--------------

-   [Official python
    documentation](http://docs.python.org/library/profile.html)
-   [PyMOTW](http://blog.doughellmann.com/2008/08/pymotw-profile-cprofile-pstats.html)
-   [coverage.py](http://nedbatchelder.com/code/coverage/)
