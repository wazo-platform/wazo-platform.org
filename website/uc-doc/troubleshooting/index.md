---
title: Troubleshooting
---

The list of current bugs can be found on
[the official Wazo Platform issue tracker](https://wazo-dev.atlassian.net/).

## Transfers using DTMF

When transfering a call using DTMF (\*1) you get an _invalid extension_ error when dialing the
extension.

The workaround to this problem is to create a preprocess subroutine and assign it to the
destinations where you have the problem.

Add a new file `/etc/asterisk/extensions_extra.d/transfer-dtmf.conf` containing the following
dialplan:

```ini
[allow-transfer]
exten = s,1,NoOp(## Setting transfer context ##)
same = n,Set(__TRANSFER_CONTEXT=<internal-context>)
same = n,Return()
```

Do not forget to substitute `<internal-context>` with your internal context.

Some places where you might want to add this preprocess subroutine is on queues and outgoing calls
to be able to transfer the called person to another extension.

## Fax detection {#fax-detection}

Wazo **does not currently support Fax detection**. The following describe a workaround to use this
feature. The behavior is to answer all incoming (external) call, wait for a number of seconds (4 in
this example) : if a fax is detected, receive it otherwise route the call normally.

**Note**: This workaround works only:

- on incoming calls towards an User (and an User only),
- if the incoming trunk is a SIP trunk,
- if the user has a voicemail which is activated and with the email field filled

Be aware that this workaround will probably not survive any upgrade.

1. Add new file `/etc/asterisk/extensions_extra.d/fax-detection.conf` containing the following
   dialplan:

   ```ini
   ;; Fax Detection
   [pre-user-global-faxdetection]
   exten = s,1,NoOp(Answer call to be able to detect fax if call is external AND user has an email configured)
   same  =   n,GotoIf($["${WAZO_CALLORIGIN}" = "extern"]?:return)
   same  =   n,GotoIf(${WAZO_USEREMAIL}?:return)
   same  =   n,Set(FAXOPT(faxdetect)=yes) ; Activate dynamically fax detection
   same  =   n,Answer()
   same  =   n,Wait(4) ; You can change the number of seconds it will wait for fax (4 to 6 is good)
   same  =   n,Set(FAXOPT(faxdetect)=no) ; If no fax was detected deactivate dyamically fax detection (needed if you want directmedia to work)
   same  =   n(return),Return()

   exten = fax,1,NoOp(Fax detected from ${CALLERID(num)} towards ${WAZO_DSTNUM} - will be sent upon reception to ${WAZO_USEREMAIL})
   same  =     n,Gosub(faxtomail,s,1(${WAZO_USEREMAIL}))
   ```

2. In the file `/etc/xivo/asterisk/xivo_globals.conf` set the global user subroutine to
   `pre-user-global-faxdetection` : this subroutine will be executed each time a user is called:

   ```shell
   XIVO_PRESUBR_GLOBAL_USER = pre-user-global-faxdetection
   ```

3. Reload asterisk configuration (for dialplan):

   ```shell
   asterisk -rx 'core reload'
   ```

## Agents receiving two ACD calls

An agent can sometimes receive more than 1 ACD call at the same time, even if the queues he's in
have the `ringinuse` parameter set to `no` (default).

This behaviour is caused by a bug in asterisk:
[ASTERISK-16115](https://issues.asterisk.org/jira/browse/ASTERISK-16115)

It's possible to workaround this bug in Wazo by adding an agent
[subroutine](/uc-doc/api_sdk/subroutine). The subroutine can be either set globally or per agent:

```ini
[pre-limit-agentcallback]
exten = s,1,NoOp()
same  =   n,Set(LOCKED=${LOCK(agentcallback-${XIVO_AGENT_ID})})
same  =   n,GotoIf(${LOCKED}?:not-locked,1)
same  =   n,Set(GROUP(agentcallback)=${XIVO_AGENT_ID})
same  =   n,Set(COUNT=${GROUP_COUNT(${XIVO_AGENT_ID}@agentcallback)})
same  =   n,NoOp(${UNLOCK(agentcallback-${XIVO_AGENT_ID})})
same  =   n,GotoIf($[ ${COUNT} <= 1 ]?:too-many-calls,1)
same  =   n,Return()

exten = not-locked,1,NoOp()
same  =   n,Log(ERROR,Could not obtain lock)
same  =   n,Wait(0.5)
same  =   n,Hangup()

exten = too-many-calls,1,NoOp()
same  =   n,Log(WARNING,Not calling agent ID/${XIVO_AGENT_ID} because already in use)
same  =   n,Wait(0.5)
same  =   n,Hangup()
```

This workaround only applies to queues with agent members; it won't work for queues with user
members.

Also, the subroutine prevent asterisk from calling an agent twice by hanguping the second call. In
the agent statistics, this will be shown as a non-answered call by the agent.

## PostgreSQL localization errors {#postgresql-localization-errors}

The database and the underlying
[database cluster](https://www.postgresql.org/docs/15/creating-cluster.html) used by Wazo is
sensitive to the system locale configuration. The locale used by the database and the database
cluster is set when Wazo is installed. If you change your system locale without particular attention
to PostgreSQL, you might make the database and database cluster temporarily unusable.

When working with locale and PostgreSQL, there's a few useful commands and things to know:

- `locale -a` to see the list of currently available locales on your system
- `locale` to display information about the current locale of your shell
- `grep ^lc_ /etc/postgresql/13/main/postgresql.conf` to see the locale configuration of your
  database cluster
- `sudo -u postgres psql -l` to see the locale of your databases
- the `/etc/locale.gen` file and the associated `locale-gen` command to configure the available
  system locales
- `systemctl restart postgresql.service` to restart your database cluster
- the PostgreSQL log file located at `/var/log/postgresql/postgresql-13-main.log`

**Note**: You can use any locale with Wazo as long as it uses an UTF-8 encoding.

### Database cluster is not starting

If the database cluster doesn't start and you have the following errors in your log file:

```log
LOG:  invalid value for parameter "lc_messages": "en_US.UTF-8"
LOG:  invalid value for parameter "lc_monetary": "en_US.UTF-8"
LOG:  invalid value for parameter "lc_numeric": "en_US.UTF-8"
LOG:  invalid value for parameter "lc_time": "en_US.UTF-8"
FATAL:  configuration file "/etc/postgresql/13/main/postgresql.conf" contains errors
```

Then this usually means that the locale that is configured in `postgresql.conf` (here `en_US.UTF-8`)
is not currently available on your system, i.e. does not show up the output of `locale -a`. You have
two choices to fix this issue:

- either make the locale available by uncommenting it in the `/etc/locale.gen` file and running
  `locale-gen`
- or modify the `/etc/postgresql/13/main/postgresql.conf` file to set the various `lc_*` options to
  a locale that is available on your system

Once this is done, restart your database cluster.

### Can't connect to the database

If the database cluster is up but you get the following error when trying to connect to the
`asterisk` database:

```log
FATAL:  database locale is incompatible with operating system
DETAIL:  The database was initialized with LC_COLLATE "en_US.UTF-8",  which is not recognized by setlocale().
HINT:  Recreate the database with another locale or install the missing locale.
```

Then this usually means that the database locale is not currently available on your system. You have
two choices to fix this issue:

- either make the locale available by uncommenting it in the `/etc/locale.gen` file, running
  `locale-gen` and restarting your database cluster
- or [recreate the database using a different locale](#postgres-change-locale)

### Error during the upgrade

Then you are mostly in one of the cases described above. Check your log file.

### Error while restoring a database backup

If during a database restore, you get the following error:

```log
pg_restore: [archiver (db)] Error while PROCESSING TOC:
pg_restore: [archiver (db)] Error from TOC entry 4203; 1262 24745 DATABASE asterisk asterisk
pg_restore: [archiver (db)] could not execute query: ERROR:  invalid locale name: "en_US.UTF-8"
    Command was: CREATE DATABASE asterisk WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';
```

Then this usually means that your database backup has a locale that is not currently available on
your system. You have two choices to fix this issue:

- either make the locale available by uncommenting it in the `/etc/locale.gen` file, running
  `locale-gen` and restarting your database cluster
- or if you want to restore your backup using a different locale (for example `fr_FR.UTF-8`), then
  restore your backup using the following commands instead:

```shell
$ sudo -u postgres dropdb asterisk
$ sudo -u postgres createdb -l fr_FR.UTF-8 -O asterisk -T template0 asterisk
$ sudo -u postgres pg_restore -d asterisk asterisk-*.dump
```

### Error during master-slave replication

Then the slave database is most likely not using an UTF-8 encoding. You'll need to
[recreate the database using a different locale](#postgres-change-locale)

### Changing the locale (`LC_COLLATE` and `LC_CTYPE`) of the database {#postgres-change-locale}

If you have decided to change the locale of your database, you must:

- make sure that you have enough space on your hard drive, more precisely in the file system holding
  the `/var/lib/postgresql` directory. You'll have, for a moment, two copies of the `asterisk`
  database.
- prepare for a service interruption. The procedure requires the services to be restarted twice, and
  the system performance will be degraded while the database with the new locale is being created,
  which can take a few hours if you have a really large database.
- make sure the new locale is available on your system, i.e. shows up in the output of `locale -a`

Then use the following commands (replacing `fr_FR.UTF-8` by your locale):

```shell
wazo-service restart all
sudo -u postgres createdb -l fr_FR.UTF-8 -O asterisk -T template0 asterisk_newlocale
sudo -u postgres pg_dump asterisk | sudo -u postgres psql -d asterisk_newlocale
wazo-service stop
sudo -u postgres psql <<'EOF'
DROP DATABASE asterisk;
ALTER DATABASE asterisk_newlocale RENAME TO asterisk;
EOF
wazo-service start
```

You should also modify the `/etc/postgresql/13/main/postgresql.conf` file to set the various `lc_*`
options to the new locale value.

For more information, consult the
[official documentation on PostgreSQL localization support](https://www.postgresql.org/docs/15/charset.html).

## Originate a call from the Asterisk console

It is sometimes useful to ring a phone from the asterisk console. For example, if you want to call
the `1234` extension in context `default`:

```asterisk-cli
channel originate Local/1234@default extension 42@xivo-callme
```

## Network packets capture

In some extreme cases, packet capture may be very useful to find out what is happening between Wazo
and other equipment (phones, trunks, etc.)

Local capture, for later analysis:

```shell
# change interface eth0 and filter 'udp port 5060' as you wish
tcpdump -i eth0 -w /tmp/wazo.pcap udp port 5060
```

Remote packet capture, streamed to Wireshark via SSH:

```shell
# install dumpcap on the server wazo.example.com
ssh wazo.example.com apt-get install -y wireshark-common

# run the capture on interface eth0, for SIP packets only (UDP port 5060)
wireshark -k -i <(ssh wazo.example.com "dumpcap -P -i eth0 -w - -f 'udp port 5060'")
```

## Getting help

Sometimes it's just not possible to fix a problem by yourself. In that case, you will most likely
need to get help from someone outside your network.

_ngrok_ can be used to give access to someone outside your network to your Wazo server.

To make that possible, you will have to follow these 4 easy steps.

- Create an account on [ngrok](https://dashboard.ngrok.com/signup)
- Install ngrok on your Wazo server:

On a 32 bit server:

```shell
wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-386.zip
unzip ngrok-stable-linux-386.zip
```

On a 64 bit server:

```shell
wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip
unzip ngrok-stable-linux-amd64.zip
```

- Add your ngrok token (given when you signed up on [ngrok](https://dashboard.ngrok.com/signup))

  ```shell
  ./ngrok authtoken <YOUR AUTH TOKEN>
  ```

- Add SSH and HTTPS access in your _ngrok_ config

  ```shell
  $ cat << EOF >> ~/.ngrok2/ngrok.yml
  tunnels:
    webi:
      addr: 443
      proto: tcp
    ssh:
      addr: 22
      proto: tcp
  EOF
  ```

- Start _ngrok_

  ```shell
  ./ngrok start --all
  ```

The output will show the public URL and ports that are now available to access you server. For
example:

```shell
tcp://0.tcp.ngrok.io:12345 -> localhost:22
tcp://0.tcp.ngrok.io:9876 -> localhost:443
```

means:

- anyone can use this command to SSH into your machine: `ssh root@0.tcp.ngrok.io -p 12345`
- anyone can access the web interface via: `https://0.tcp.ngrok.io:12346`.

To stop _ngrok_ hit Ctrl-C.

**Note**: The ngrok tunnel will not survive a reboot of the server, you'll have to set it up again
after restart.

**Warning** This setup is a typical scenario for a
[man-in-the-middle attack](https://en.wikipedia.org/wiki/Man-in-the-middle_attack). If you don't
trust the Ngrok servers, you should ensure that:

- the HTTPS certificate is the right one, i.e. it has the same fingerprint:
  - on the server:
    `openssl x509 -text -noout -in /usr/share/wazo-certs/server.crt -sha256 -fingerprint | grep Fingerprint`
  - in the browser, check the details of the certificate to see the fingerprint
- the SSH key fingerprint of the server is correct, when SSH asks you upon the first connection
  (TOFU)

## Collecting logs

### Unreproducible issues

When troubleshooting a problem, you may need to send logs of previous dates for analysis.

`wazo-debug collect` simplifies the gathering of logs:

```shell
wazo-debug collect -o /tmp/logs.tar.gz
```

`wazo-debug collect` will gather all available logs of the different Wazo daemons, including
Asterisk, and bundle them into a tarball. You may then send this tarball for analysis.

**Warning**: Be careful before sending the logs in a public place: they may contain sensitive
information, that can be used to connect to your Wazo Platform.

### Reproducible issues

You may use `wazo-debug capture` to log what is happening on the server while reproducing an issue.
This tool will then bundle the capture logs in a tarball. You may then send this tarball for
analysis.

```shell
wazo-debug capture
AGI Debugging Enabled
Starting capture...
Capture started. Hit CTRL-C to stop the capture...
^C
Capture stopped.
AGI Debugging Disabled
Captured files have been stored in /tmp/wazo-debug-capture.tar.gz
```

**Warning**: Be careful before sending the logs in a public place: they may contain sensitive
information, that can be used to connect to your Wazo Platform.

## Asterisk crash

See [Debugging Asterisk](/uc-doc/contributors/debug_asterisk)
