---
title: Profiling Python Programs
---

## Profiling CPU/Time Usage {#profiling-cputime-usage}

Here's an example on how to profile wazo-auth for CPU/time usage:

1. Stop the monit daemon:

   ```shell
   service monit stop
   ```

2. Stop the process you want to profile, i.e. wazo-auth:

   ```shell
   service wazo-auth stop
   ```

3. Start the service in foreground mode running with the profiler:

   ```shell
   python -m cProfile -o test.profile /usr/bin/xivo-auth -f
   ```

   This will create a file named `test.profile` when the process terminates.

   To profile wazo-confgend, you must use this command instead of the one above:

   ```shell
   twistd -p test.profile --profiler=cprofile --savestats -no --python=/usr/bin/wazo-confgend
   ```

   Note that profiling multi-threaded program (wazo-agid, wazo-confd) doesn't work reliably.

   The [Debugging Daemons](/uc-doc/contributors/debug_daemon) section documents how to launch the
   various Wazo services in foreground/debug mode.

4. Examine the result of the profiling:

   ```shell
   $ python -m pstats test.profile
   Welcome to the profile statistics browser.
   % sort time
   % stats 15
   ...
   % sort cumulative
   % stats 15
   ```

## Measuring Code Coverage {#measuring-code-coverage}

Here's an example on how to measure the code coverage of wazo-auth.

This can be useful when you suspect a piece of code to be unused and you want to have additional
information about it.

1. Install the following packages:

   ```shell
   apt-get install python-pip build-essential python-dev
   ```

2. Install coverage via pip:

   ```shell
   pip install coverage
   ```

3. Run the program in foreground mode with `coverage run`:

   ```shell
   service monit stop
   service wazo-auth stop
   coverage erase
   coverage run /usr/bin/wazo-auth -f
   ```

   The [Debugging Daemons](/uc-doc/contributors/debug_daemon) section documents how to launch the
   various Wazo service in foreground/debug mode.

4. After the process terminates, use `coverage html` to generate an HTML coverage report:

   ```shell
   coverage html --include='*wazo_calld*'
   ```

   This will generate an `htlmcov` directory in the current directory.

5. Browse the coverage report.

   Either copy the directory onto your computer and open it with a web browser, or start a web
   server on the Wazo:

   ```shell
   cd htmlcov
   python -m SimpleHTTPServer
   ```

   Then open the page from your computer (i.e. not on the Wazo):

   ```shell
   firefox http://<wazo-hostname>:8000
   ```

## External Links {#external-links}

- [Official python documentation](http://docs.python.org/library/profile.html)
- [coverage.py](http://nedbatchelder.com/code/coverage/)
