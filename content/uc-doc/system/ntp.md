---
title: NTP
---

Wazo has a NTP server, that must be synchronized to a reference server. This can be a public one or
customized for specific target networking architecture. Wazo's NTP server is used by default as NTP
server for the devices time reference.

## Usage

Show NTP service status:

```shell
service ntp status
```

Stop NTP service:

```shell
service ntp stop
```

Start NTP service:

```shell
service ntp start
```

Restart NTP service:

```shell
service ntp restart
```

Show NTP synchronization status:

```shell
ntpq -p
```

## Configuring NTP service

1. Edit `/etc/ntp.conf`
2. Give your NTP reference servers:

    ```ascii
    server 192.168.0.1                           # LAN existing NTP Server
    server 0.debian.pool.ntp.org iburst dynamic  # default in ntp.conf
    server 1.debian.pool.ntp.org iburst dynamic  # default in ntp.conf
    ```

3. If no reference server to synchronize to, add this to synchronize locally:

    ```ascii
    server 127.127.1.0              # local clock (LCL)
    fudge 127.127.1.0 stratum 10    # LCL is not very reliable
    ```

4. Restart NTP service
5. Check NTP synchronization status.

**Warning**: If #5 shows that NTP doesn't use NTP configuration in `/etc/ntp.conf`, maybe have you
done a `dhclient` for one of your network interface and the dhcp server that gave the IP address
also gave a NTP server address. Thus you might check if the file `/var/lib/ntp/ntp.conf.dhcp`
exists, if yes, this is used for NTP configuration prior to `/etc/ntp.conf`. Remove it and restart
NTP, check NTP synchronization status, then it should work.
