---
title: Direct media
---

Usually, when two phones have a conversation, the media (the voice and video packets) flows from one
phone to the Wazo Platform, then to the second phone. Direct media makes the media flow directly
from one phone to another, without the Wazo Platform intermediate. This is useful when the Wazo
Platform is not on premise, and the two phones are in the same network.

## Setup

By default, direct media is disabled for all phones. To enable, you need to set an option in the
endpoint configuration:

```json
direct_media: yes
```

You may also set this option on the tenant PJSIP template `global` to apply this to all phones of a
tenant.

**Note**: To configure direct media on SCCP, see [SCCP Direct
Media](uc-doc/administration/sccp/#direct-media)

## Limitations

In order to be effective, the direct media requires:

- the packetization (length of the RTP media packets) to be identical between the two phones. The
  usual packetization time is 20 ms.
- the DTMF features `featuremap` to be disabled: this includes transfers and hangup via DTMF. For
  this, create a file `/etc/asterisk/features.d/50-disable-featuremap.conf`:
  ```ini
  [featuremap]
  blindxfer =
  disconnect =
  atxfer =
  ```
  Then execute the following command:
  ```shell
  asterisk -rx 'module reload features'
  ```
