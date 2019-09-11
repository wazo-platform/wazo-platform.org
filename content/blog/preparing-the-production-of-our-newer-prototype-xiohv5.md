Title: Preparing the production of our newer prototype (XIOHv5)
Date: 2012-07-11 10:16
Author: xcarcelle
Category: Hardware
Slug: preparing-the-production-of-our-newer-prototype-xiohv5
Status: published

**The current version of prototype is named XIOHv5** (XiVO IPBX
OpenHardware version5) and is still developed using 10-layers BRD file
and 30+ pages of SCH (schematics) to handle the different blocks of the
design and assemble them in one PCB. **We have been doing several
optimizations and features adding :**-removing one DIMM of DDR2-using a
MSP430 micro-controller to handle the power-sequence (critical feature
for the boot of the CPU EP80579)-space optimization for the power supply
and connectors-changing the format of certain connectors (i.e. UART
RS232 to an RJ45 connector)

Please find below a screenshot of our BRD file (board file in Eagle 6.2)
showing the PCB and displaying the polygons for certain layers

![XIOHv5-BRD-Polygons](/images/blog/XIOHv5/.XIOHv5_PCB_m.jpg "XIOHv5-BRD-Polygons, juil. 2012")

Polygons are signal, power and ground wires that assemble zone of wire
to simplify the design and have wires to handle some currents needs on
some power rails that we have. The power rails are numerous on the board
and they should respect the current level needed by each block diagram
(we will make an up-coming on the power rail organization) and namely
the SoC that carries different functionnal block such as MAC, USB, RAM,
UART, and TDM controller.

The design of these polygons take some times and should checked to be
sure that we don't multiply signals by making polygons of the same
signal with different names. For instance, all GND (ground) polygons
should be connected and named the same.

Once the board and schematics had been finalized and checked (and
double-checked), we did process FAB files for the PCB manufacturing and
below you can see the picture of our PCB on top of a stack of PCBs ready
to be assembled with the 1000+ components and 150+ different references
of parts.

![XIOHv5-PCB-Stickers](/images/blog/XIOHv5/.P1050963_m.jpg "XIOHv5-PCB-Stickers, juil. 2012")

Prior to do the assembling in factory, we need check the package for
each of our references and do a BoM (Bill of Materials) optimization to
handle nicely our stock.

</p>

