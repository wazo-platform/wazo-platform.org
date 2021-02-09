---
title: Interconnect a Wazo to a PBX via an ISDN link
---

The goal of this architecture can be one of:

- start a smooth migration between an old telephony system towards IP telephony with Wazo
- bring new features to the PBX like voicemail, conference, IVR etc.

First, Wazo is to be integrated transparently between the operator and the PBX. Then users or
features are to be migrated from the PBX to the Wazo.

**Warning**: It requires a special call routing configuration on both the Wazo **and the PBX**.

```ascii
ISDN Provider <--> Wazo <--> PBX
```

## Hardware

### General uses

You must have an ISDN card able to support both the provider and PBX ISDN links.

_Example_: If you have two provider links towards the PBX, Wazo should have a 4 spans card: two
towards the provider, and two towards the PBX.

### If you use two cards

If you use two cards, you have to:

- Use a cable for clock synchronization between the cards
- Configure the _wheel_ to define the cards order in the system.

Please refer to the section
[Sync cable](/uc-doc/administration/hardware/pri_configuration#sync-cable)

## Configuration

You have now to configure two files :

1.  `/etc/dahdi/system.conf`
2.  `/etc/asterisk/dahdi-channels.conf`

### system.conf

You mainly need to configure the `timing` parameter on each _span_. As a general rule :

- Provider _span_ - Wazo will get the clock from the provider : the `timing` value is to be
  different from 0 (see [system_conf](/uc-doc/administration/hardware/hardware) section)
- PBX _span_ - Wazo will provide the clock to the PBX : the `timing` value is to be set to 0 (see
  [system_conf](/uc-doc/administration/hardware/hardware) section)

Below is an example with two provider links and two PBX links:

```ini
# Span 1: TE4/0/1 "TE4XXP (PCI) Card 0 Span 1" (MASTER)
span=1,1,0,ccs,hdb3         # Span towards Provider
bchan=1-15,17-31
dchan=16
echocanceller=mg2,1-15,17-31

# Span 2: TE4/0/2 "TE4XXP (PCI) Card 0 Span 2"
span=2,2,0,ccs,hdb3         # Span towards Provider
bchan=32-46,48-62
dchan=47
echocanceller=mg2,32-46,48-62

# Span 3: TE4/0/3 "TE4XXP (PCI) Card 0 Span 3"
span=3,0,0,ccs,hdb3         # Span towards PBX
bchan=63-77,79-93
dchan=78
echocanceller=mg2,63-77,79-93

# Span 4: TE4/0/4 "TE4XXP (PCI) Card 0 Span 4"
span=4,0,0,ccs,hdb3         # Span towards PBX
bchan=94-108,110-124
dchan=109
echocanceller=mg2,94-108,110-124
```

### dahdi-channels.conf

In the file `/etc/asterisk/dahdi-channels.conf`{.interpreted-text role="file"} you need to adjust,
for each span :

- `group` : the group number (e.g. `0` for provider links, `2` for PBX links),
- `context` : the context (e.g. `from-extern` for provider links, `from-pabx` for PBX links)
- `signalling` : `pri_cpe` for provider links, `pri_net` for PBX side

**Warning**: Most of the PBX uses overlap dialing for some destination (digits are sent one by one
instead of by block). In this case, the `overlapdial` parameter has to be activated on the PBX
spans:

```ascii
overlapdial = incoming
```

Below an example of `/etc/asterisk/dahdi-channels.conf`:

```ini
; Span 1: TE4/0/1 "TE4XXP (PCI) Card 0 Span 1" (MASTER)
group=0,11
context=from-extern
switchtype = euroisdn
signalling = pri_cpe
channel => 1-15,17-31

; Span 2: TE4/0/2 "TE4XXP (PCI) Card 0 Span 2"
group=0,12
context=from-extern
switchtype = euroisdn
signalling = pri_cpe
channel => 32-46,48-62

; PBX link #1
; Span 3: TE4/0/3 "TE2XXP (PCI) Card 0 Span 3"
group=2,13
context=from-pabx     ; special context for PBX incoming calls
overlapdial=incoming  ; overlapdial activation
switchtype = euroisdn
signalling = pri_net  ; behave as the NET termination
channel => 63-77,79-93

; PBX link #2
; Span 4: TE4/0/4 "T4XXP (PCI) Card 0 Span 4"
group=2,14
context=from-pabx     ; special context for PBX incoming calls
overlapdial=incoming  ; overlapdial activation
switchtype = euroisdn
signalling = pri_net  ; behave as the NET termination
channel => 94-108,110-124
```

### Passthru function

#### Route PBX incoming calls

We first need to create a route for calls coming from the PBX

# Create a file named `pbx.conf` in the

directory `/etc/asterisk/extensions_extra.d/`{.interpreted-text role="file"}, # Add the following
lines in the file:

```ini
[from-pabx]
exten = _X.,1,NoOp(### Call from PBX ${CARLLERID(num)} towards ${EXTEN} ###)
exten = _X.,n,Goto(default,${EXTEN},1)
```

This dialplan routes incoming calls from the PBX in the `default` context of Wazo. It enables call
from the PBX : _ towards a SIP phone (in `default` context) _ towards outgoing destniation (via the
`to-extern` context included in `default` context)

#### Create the to-pabx context

Create a context named `to-pabx`:

- `POST /contexts {"name": "to-pabx", "type": "outcall"}`

#### Route incoming calls to PBX

In our example, incoming calls on spans 1 and 2 (spans plugged to the provider) are routed by
from-extern context. We are going to create a default route to redirect incoming calls to the PBX.

- `POST /extensions {"exten": "_XXXX", "context": "from-extern"}` (according to the number of digits
  sent by the provider)
- `POST /incalls {"destination": {"type": "customiz", "command": "Goto(to-pabx,${XIVO_DSTNUM},1)}}`
- `PUT /incalls/{incall_id}/extensions/{extension_id}`

#### Create the interconnections

You have to create two interconnections :

- provider side : dahdi/g0
- PBX side : dahdi/g2

The first interconnection :

- `POST /trunks {'name': "t2-operatoeur", "context": "to-extern"}`
- `POST /endpoints/custom {"interface": "dahdi/g0"}`
- `PUT /trunks/{trunk_id}/endpoints/custom/{custom_id}`

The second interconnection :

- `POST /trunks {"name": "t2-pabx", "context": "to-pabx"}`
- `POST /endpoints/custom {"interface": "dahdi/g2"}`
- `PUT /trunks/{trunk_id}/endpoints/custom/{custom_id}`

#### Create outgoing calls

You must create two rules of outgoing calls:

1. Redirect calls to the PBX :

  - `POST /outcalls {"name": "fsc-pabx"}`
  - `PUT /outcalls/{outcall_id}/trunks`
  - `POST /extensions {"exten": "_XXXX", "context": "to-pabx"}`
  - `PUT /outcalls/{outcall_id}/extensions/{extension_id}`

2. Create a rule "fsc-operateur":

  - `POST /outcalls {"name": "fsc-operateur"}`
  - `PUT /outcalls/{outcall_id}/trunks`
  - `POST /extensions {"exten": "_X.", "context": "to-extern"}`
  - `PUT /outcalls/{outcall_id}/extensions/{extension_id}`
