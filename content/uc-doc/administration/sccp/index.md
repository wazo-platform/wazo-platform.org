---
title: SCCP Configuration
---

## Provisioning

To be able to provision SCCP phones you should :

- activate the [DHCP Server](/uc-doc/system/dhcp),
- activate the
  [DHCP Integration](/uc-doc/administration/provisioning/adv_configuration#dhcp-integration),

Then install a plugin for SCCP Phone

At this point you should have a fully functional DHCP server that provides IP address to your
phones. Depending on what type of CISCO phone you have, you need to install the plugin sccp-legacy,
sccp-9.4 or both.

**Note**: Please refer to the
[Provisioning page](/uc-doc/ecosystem/supported_devices#cisco-provisioning) for more information on
how to install CISCO firmwares.

Once your plugin is installed, you\'ll be able to edit which firmwares and locales you need. If you
are unsure, you can choose all without any problem.

Now if you connect your first SCCP phone, you should be able to see it with `GET /devices`.

When connecting a second SCCP phone, the device will be automatically detected as well.

## Auto-provisioning support

Starting from Wazo 18.07, an SCCP device can be associated to a user by entering the user\'s
provisioning code directlyfrom the SCCP device while in autoprov mode.

There's two settings in `GET /asterisk/sccp/general` influencing the auto-provisioning behaviour:

- the `guest` option must be enabled to allow SCCP devices to connect to the server and allow a
  provisioning code from being dialed from them. Disabling this option can provide some additional
  security if your Wazo is in an hostile environment, at the cost of making auto-provisioning
  support unavailable for SCCP devices.
- the `max_guests` option limits the number of SCCP devices that can simultaneously connect to the
  server in autoprov mode. You should set this value to the maximum number of SCCP devices you
  expect to be in autoprov mode at any moment, unless your Wazo is in an hostile environment, where
  you should probably set it to a fairly low value.

## SCCP General Settings

Review SCCP general settings: `GET /asterisk/sccp/general`

## User creation

The last step is to create a user with a **SCCP line**.

Creating a user with a SCCP line:

- `POST /users`
- `POST /lines`
- `PUT /users/{user_id}/lines/{line_id}`
- `POST /endpoints/sccp`
- `PUT /lines/{line_id}/endpoints/sccp/{sccp_id}`
- `PUT /lines/{line_id}/devices/{device_id}`

Congratulations ! Your SCCP phone is now ready to be called !

## Function keys

With SCCP phones, the only destination type of function keys that can be configured is `custom`

## Direct Media

SCCP Phones support directmedia (direct RTP).

- `PUT /asterisk/sccp/general` options `directmedia: yes`

## Features {#sccp-features}

| Features                     | Supported |
| ---------------------------- | --------- |
| Receive call                 | Yes       |
| Initiate call                | Yes       |
| Hangup call                  | Yes       |
| Transfer call                | Yes       |
| Congestion Signal            | Yes       |
| Autoanswer (custom dialplan) | Yes       |
| Call forward                 | Yes       |
| Multi-instance per line      | Yes       |
| Message waiting indication   | Yes       |
| Music on hold                | Yes       |
| Context per line             | Yes       |
| Paging                       | Yes       |
| Direct RTP                   | Yes       |
| Redial                       | Yes       |
| Speed dial                   | Yes       |
| BLF (Supervision)            | Yes       |
| Resync device configuration  | Yes       |
| Do not disturb (DND)         | Yes       |
| Group listen                 | Yes       |
| Caller ID                    | Yes       |
| Connected line ID            | Yes       |
| Group pickup                 | Yes       |
| Auto-provisioning            | Yes       |
| Multi line                   | Not yet   |
| Codec selection              | Yes       |
| NAT traversal                | Not yet   |
| Type of Service (TOS)        | Manual    |

## Telephone

| Device type | Supported | Firmware version  | Timezone aware |
| ----------- | --------- | ----------------- | -------------- |
| 7905        | Yes       | 8.0.3             | No             |
| 7906        | Yes       | SCCP11.9-4-2SR1-1 | Yes            |
| 7911        | Yes       | SCCP11.9-4-2SR1-1 | Yes            |
| 7912        | Yes       | 8.0.4(080108A)    | No             |
| 7920        | Yes       | 3.0.2             | No             |
| 7921        | Yes       | 1.4.5.3           | Yes            |
| 7931        | Yes       | SCCP31.9-4-2SR1-1 | Yes            |
| 7937        | Testing   |                   |                |
| 7940        | Yes       | 8.1(SR.2)         | No             |
| 7941        | Yes       | SCCP41.9-4-2SR1-1 | Yes            |
| 7941GE      | Yes       | SCCP41.9-4-2SR1-1 | Yes            |
| 7942        | Yes       | SCCP42.9-4-2SR1-1 | Yes            |
| 7945        | Testing   |                   |                |
| 7960        | Yes       | 8.1(SR.2)         | No             |
| 7961        | Yes       | SCCP41.9-4-2SR1-1 | Yes            |
| 7962        | Yes       | SCCP42.9-4-2SR1-1 | Yes            |
| 7965        | Testing   |                   |                |
| 7970        | Testing   |                   |                |
| 7975        | Testing   |                   |                |
| 8941        | Testing   |                   |                |
| 8945        | Testing   |                   |                |
| CIPC        | Yes       | 2.1.2             | Yes            |


Models not listed in the table above won't be able to connect to Asterisk at all. Models listed as
"Testing" are not yet officially supported in Wazo: use them at your own risk.

The `Timezone aware` column indicates if the device supports the timezone tag in its configuration
file, i.e. in the file that the device request to the provisioning server when it boots.
