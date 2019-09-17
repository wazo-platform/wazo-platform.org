Debugging Daemons
=================

To activate debug mode, add `debug: true` in the daemon configuration
file. The output will be available in the daemon\'s log file.

It is also possible to run the Wazo daemon, in command line. This will
allow to run in foreground and debug mode. To see how to use it, type:

```ShellSession
$ xivo-{name} -h
```

Note that it\'s usually a good idea to stop monit before running a
daemon in foreground:

```ShellSession
# systemctl stop monit.service
```

xivo-confgend
-------------

```ShellSession
$ twistd -no -u xivo-confgend -g xivo-confgend --python=/usr/bin/xivo-confgend --logger xivo_confgen.bin.daemon.twistd_logs
```

Note: no debug mode in confgend.

wazo-provd
----------

```ShellSession
$ twistd -no -u wazo-provd -g wazo-provd -r epoll --logger provd.main.twistd_logs wazo-provd -s -v
```

-   -s for logging to stderr
-   -v for verbose

consul
------

```ShellSession
$ sudo -u consul /usr/bin/consul agent -config-dir /etc/consul/xivo -pid-file /var/run/consul/consul.pid
```

Consul logs its output to `/var/log/syslog` to get the output of consul
only use consul monitor:

```ShellSession
$ consul monitor -ca-file=/usr/share/xivo-certs/server.crt -http-addr=https://localhost:8500

2015/08/03 09:48:25 [INFO] consul: cluster leadership acquired
2015/08/03 09:48:25 [INFO] consul: New leader elected: this-xivo
2015/08/03 09:48:26 [INFO] raft: Disabling EnableSingleNode (bootstrap)
2015/08/03 11:04:08 [INFO] agent.rpc: Accepted client: 127.0.0.1:41545
```

### Note

The ca-file can be different when using custom HTTPS certificates.
