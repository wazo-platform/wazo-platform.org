---
title: Debugging Daemons
---

To activate debug mode, add `debug: true` in the daemon
[configuration file](/uc-doc/system/configuration_files). The output will be available in the
daemon's [log file](/uc-doc/system/log_files).

It is also possible to run the Wazo daemon, in command line. This will allow to run in foreground
and debug mode. To see how to use it, type:

```shell
wazo-{name} -h
```

Note that it's usually a good idea to stop monit before running a daemon in foreground:

```shell
systemctl stop monit.service
```

## wazo-confgend {#wazo-confgend}

```shell
twistd3 -no -u wazo-confgend -g wazo-confgend --python=/usr/bin/wazo-confgend --logger wazo_confgend.bin.daemon.twistd_logs
```

No debug mode in wazo-confgend.

## wazo-provd {#wazo-provd}

```shell
twistd3 -no -u wazo-provd -g wazo-provd --logger provd.main.twistd_logs wazo-provd -s -v
```

- `-s`: for logging to `stderr`
- `-v`: for verbose
