Title: Understanding the S0/T0/T1/E1 ISDN protocols and lines
Date: 2010-02-08 18:47
Author: xcarcelle
Category: Hardware
Slug: understanding-the-s0t0t1e1-isdn-protocols-and-lines
Status: published

As the XiVO OpenHardware IPBX will be using 4 T0 ISDN lines, it's
important to present and educate reader on how works ISDN lines for IPBX
usage. As the telecommunications world (POTS, PSTN, GSM, ISDN, ADSL) and
the TCP/IP world are now merged into the networks we daily use, we see a
great difference between the knowledge and education of people on the
TCP/IP standards (widely used, massively understood and fine-tuned) and
the telecommunications standards and namely the ISDN (Integrated
Services Digital Network) interfaces used in PBX, IPBX or GSM networks
(E1 lines usually as used in OpenBSC project).

The **ISDN line** is a circuit-switched telephone network system
implemented on ordinary telephony copper wires on the PSTN/POTS network
to carry digital data and digital voice. The line interface is a
four-wire interface and has separated transmitter and receiver with
configurable behaviour. Every line can be switched either into S/T (four
wires - double pair) or Up (two wires - single pair) mode separately. R,
S/T and U(or Up) mode are named like this by the ITU after their current
order on the ISDN hook-up.

The standard ISDN line/hookup architecture looks like:

![ISDN Hookup overview
architecture](/public/.ISDN_1_m.jpg "ISDN Hookup overview architecture, fév. 2010")

TE: Terminal Equipment

TA: Terminal Adapter

NT: Network Terminator

S/T: Usually using 4-wires (2 pairs)

U: Usually using 2-wires (1 pair)

This overview architecture represents the standardized view of and ISDN
architecture. Operators either provide U interfaces (2-wire long
distance; the variants for interconnection to a public network are
called U0 and Uk0) or S/T interfaces (this is typically a by-country
alternative). In the latter case, a Network Termination owned by the
operator is typically installed in the customer premises because the S/T
bus is limited to a few hundred meters. If the operator provides U
interfaces, the customer can still connect its own Network Termination
and use an S/T interface behind it, or alternatively directly connect an
equipment that supports U interfaces. For private direct ISDN
connections up to a few kilometers, the 2 wire Up (Up0/UpN) interface
also exists.

The Universal **ISDN port** is developed according to the ITU-T.430 and
ETSI TBR 003 standards. It consists of the receive and transmit data
pathes with a clock processing unit each, the clock distribution unit.
The block diagram for a standard ISDN port module looks like:

![ISDN Universal ISDN Port
Module](/public/.ISDN_2_m.jpg "ISDN Universal ISDN Port Module, fév. 2010")

TE Mode: Terminal Equipment mode, the TE is always taken as
synchronisation source for ISDN applications (like the CLK is delivered
from the Central Office Switch).

NT Mode: Network Terminator mode, the NT mode 192kHz bit clock and the
8kHz frame clock are derived from FSYNC.

The ISDN line port is based on 3 layers following different standards:

•Layer 1: ITU-T I.430

•Layer 2: ITU-T Q.920, ITU-T Q.921

•Layer 3: ITU-T Q.930 and ITU-T Q.931

At the layer 1, the line is based on the **BRI (Basic Rate Interface)**
which delivers 144kbits/s (for S/T mode) broken into two 64kbits/s B
(Bearer) channel for data and one 16kbits/s D (Delta) channel for
signaling. The overhead is then added to the 144kbits/s (for a total of
196kbits/s) due to Frame Synchronization, Echo Channel (echo of the
D-channel received in NT mode to detect collision on the TX for the
D-channel when the S/T bus is shared) and Electrical Balancing bits. BRI
are popular in Europe and Japan. The B-channel uses a standard 64 kbit/s
datarate voice channel of 8 bits sampled at 8 kHz with G.711 encoding.
B-Channels can also be used to carry data, since they are nothing more
than digital channels. T0 (or S0) refers then to a BRI ISDN line
provided by the carrier to connect the IPBX to the public network.

The raw interface available with BRI is called T0 (in Europe). Some ISDN
carriers provide S0 interface (like the Duo/Itoo service in France for
several end-devices that can communicate between each other).In France,
the "Numeris" service provides a TNR (Terminaison Numerique de Reseau
with device such as the Sagem TNR IPS 4G) end-device that does the
conversion between the U interface and the T interface. The TNA
(Terminaison Numerique d'Abonne) does the conversion between the T
interface and the S interface. In most countries, except North-America,
the carrier provides the TNR end-device and the TNA device is provided
by the end-user customer (usually the PBX interface).

**PRI (Primary Rate Interface)** are more popular in North American ISDN
carriers,

In Europe we see PRI E1 lines carrying 30 B-channels and 1 D-channel
(2048 kbits/s)

In North-America, we see PRI T1 lines carrying 23 B-channels and 1
D-channel (1544 kbits/s).

Japan also has PRI J1 lines similar to T1 lines with 23-B+1-D.

The ISDN controller chip on the hardware will be connected to the CPU
through two buses (SPI bus to control the chip and transmit D-channel
from the CPU and the PCM (also named TDM bus) bus to transmit D-channels
data with the ISDN lines). The number of simultaneous calls then had to
be calculated with the choice of the ISDN capability and the codec used
on those ones.

This blog post aims at giving an overview of the ISDN interface used on
the IPBX and namely in the XiVO Hardware in order to understand the
hardware project as well as the protocols used into XiVo Hardware.

Annexes to the article:

**More acronyms:**LAP-D: Link Access Procedure on the D-channel  
HDLC: High-level Data-Link Control  
TNR (France): Terminaison Numérique de Réseau  
TNA (france):Terminaison Numérique d'Abonné  
CSMA-CR: Carrier Sense Multiple Acess-Contention Resolution  
TEI: Terminal Endpoint Identifier  
SAPI: Service Access Point Identifier  
CEPI: Connection EndPoint Identifier  

**Multiplexing value of 64kbits/s-channels:**T0: 2B+1DEurope:
2048kbits/s (30), 8448kbits/s (120), 34 368kbits/s (480), 139 264kbits/s
(1960)North-America: 1544kbits/s (24), 6312kbits/s (96), 44 736kbits/s
(1584)

**HDLC Frames Format:**  
F (Flag) | Ad (Adresses) | C (Controle) | CALL REQUEST | FCS (Frame
Controle Sequence) | F(Flag) |

</p>

