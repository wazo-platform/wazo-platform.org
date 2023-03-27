---
title: 'Introduction'
---

The `HA (High Availability)` solution in Wazo makes it possible to maintain basic telephony function
whether your main Wazo server is running or not. When running a Wazo HA cluster, users are
guaranteed to never experience a downtime of more than 5 minutes of their basic telephony service.

The HA solution in Wazo is based on a 2-nodes "master and slave" architecture. In the normal
situation, both the master and slave nodes are running in parallel, the slave acting as a "hot
standby", and all the telephony services are provided by the master node. If the master fails or
must be shutdown for maintenance, then the telephony devices automatically communicate with the
slave node instead of the master one. Once the master is up again, the telephony devices failback to
the master node. Both the failover and the failback operation are done automatically, i.e. without
any user intervention, although an administrator might want to run some manual operations after
failback as to, for example, make sure any voicemail messages that were left on the slave are copied
back to the master.

## Prerequisites

The HA in Wazo only works with telephony devices (i.e. phones) that support the notion of a primary
and backup telephony server.

- Phones must be able to reach the master and the slave (take special care if master and slave are
  not in the same subnet)
- If firewalling, the master must be allowed to join the slave on ports 22 and 5432
- If firewalling, the slave must be allowed to join the master with an ICMP ping
- Trunk registration timeout (`expiry`) should be less than 300 seconds (5 minutes)
- The slave must have no provisioning plugins installed.

The HA solution is guaranteed to work correctly with
[the following devices](/uc-doc/administration/security#devices).

## Quick Summary

- You need two configured Wazo (wizard passed)
- Configure one Wazo as a master -> setup the slave address (VoIP interface)
- Restart services (wazo-service restart) on master
- Configure the other Wazo as a slave -> setup the master address (VoIP interface)
- Configure file synchronization by running the script `xivo-sync -i` on the master
- Start configuration synchronization by running the script
  `xivo-master-slave-db-replication <slave_ip>` on the master
- Resynchronize all your devices

That's it, you now have a HA configuration, and every hour all the configuration done on the master
will be reported to the slave.

## Configuration Details

First thing to do is to [install 2 Wazo](/uc-doc/installation).

**Note**: When you upgrade a node of your cluster, you must also upgrade the other so that they both
are running the same version of Wazo. Otherwise, the replication might not work properly.

You must configure the `HA (High Availability)` with `PUT /ha`

You can configure the master and slave in whatever order you want.

You must also run `xivo-sync -i` on the master to setup file synchronization. Running `xivo-sync -i`
will create a passwordless SSH key on the master, stored under the `/root/.ssh` directory, and will
add it to the `/root/.ssh/authorized_keys` file on the slave. The following directories will then be
rsync'ed every hour:

- /etc/asterisk/extensions_extra.d
- /etc/xivo/asterisk
- /var/lib/asterisk/agi-bin
- /var/lib/asterisk/moh
- /var/lib/wazo/sounds/tenants

**Warning**: When the HA is configured, some changes will be automatically made to the configuration
of Wazo.

SIP expiry value on master and slave will be automatically updated:

- `GET /asterisk/sip/general`
  - `minexpiry`: 3 minutes
  - `maxexpiry`: 5 minutes
  - `defaultexpiry`: 4 minutes

The provisioning server configuration will be automatically updated in order to allow phones to
switch from Wazo power failure.

- `GET /provd/cfg_mgr/configs?q={"X_type": "registrar"}`

  `registrar_backup: <slave ip>, proxy_backup: <slave ip>`

**Warning**: Do not change these values when the HA is configured, as this may cause problems. These
values will be reset to blank when the HA is disabled.

**Note**: For the telephony devices to take the new proxy/registrar settings into account, you must
resynchronize the devices or restart them manually.

### Master node

In choosing the `node_type: master` you must enter the `remote_address` **of the VoIP interface** of
the slave node.

**Note**: You have to restart all services (wazo-service restart) once the master node is
configured.

### Slave node

In choosing the `node_type: slave` you must enter the `remote_address` **of the VoIP interface** of
the master node.

### Replication Configuration

Once master slave configuration is completed, Wazo configuration is replicated from the master node
to the slave every hour (:00).

Replication can be started manually by running the replication scripts on the master:

```shell
xivo-master-slave-db-replication <slave_ip>
xivo-sync
```

The replication does not copy the full Wazo configuration of the master. Notably, these are
excluded:

- All the network configuration
- All the support configuration
- Call logs
- Call center statistics
- Certificates
- HA settings
- Provisioning configuration
- Voicemail messages

Less importantly, these are also excluded:

- Queue logs
- CELs

## Internals

4 scripts are used to manage services and data replication.

- xivo-master-slave-db-replication <slave_ip> is used on the master to replicate the master's data
  on the slave server. It runs on the master.
- xivo-manage-slave-services {start,stop} is used on the slave to start, stop monit and asterisk.
  The services won't be restarted after an upgrade or restart.
- xivo-check-master-status <master_ip> is used to check the status of the master and enable or
  disable services accordingly.
- xivo-sync is used to sync directories from master to slave.

Additionally, 3 files are created and automatically managed to reflect the state of the HA
configuration:

- `/etc/xivo/ha.conf`: contains the json configuration corresponding to the current state of the
  node when HA is enabled
- `/var/lib/wazo/is-primary`: a sentinel file whose existence reflects the status of the node as a
  primary("master") wazo stack
- `/var/lib/wazo/is-secondary`: a sentinel file whose existence reflects the status of the node as a
  secondary("slave") wazo stack

Those files are created, updated and removed automatically by the wazo services and should not be
changed by the administrators, at the risk of putting the system in an inconsistent state with
unexpected and undesirable results.

## Limitations

When the master node is down, some features are not available and some behave a bit differently.
This includes:

- Call history / call records are not recorded.
- Voicemail messages saved on the master node are not available.
- Custom voicemail greetings recorded on the master node are not available.
- Phone provisioning is disabled, i.e. a phone will always keep the same configuration, even after
  restarting it.
- Phone remote directory is not accessible, because provisioned IP address points to the master.

Note that, on failover and on failback:

- DND, call forwards, call filtering, ..., statuses may be lost if changed recently.
- If you are connected as an agent, then you might need to reconnect as an agent when the master
  goes down.

Additionally, only on failback:

- Voicemail messages are not copied from the slave to the master, i.e. if someone left a message on
  your voicemail when the master was down, you won't be able to consult it once the master is up
  again.
- More generally, custom sounds are not copied back. This includes recordings.

Here's the list of limitations that are more relevant on an administrator standpoint:

- The master status is up or down, there's no middle status. This mean that if Asterisk is crashed
  the Wazo is still up and the failover will NOT happen.

## Troubleshooting {#troubleshooting}

When replicating the database between master and slave, if you encounter problems related to the
system locale, see `postgresql_localization_errors`
