Title: Prototype PCB for the ISDN and FXO/FXS interfaces
Date: 2010-05-04 13:42
Author: xcarcelle
Category: Hardware
Slug: prototype-pcb-for-the-isdn-and-fxofxs-interfaces
Status: published

As the XiVO IPBX OpenHardware project moves forward, we are now doing
the prototyping of the different fonctionnal bloc of the PCB and namely
the interaction between the CPU and the Telco interfaces (ISDN and
FXO/FXS).In order to do a clean prototyping, it is usually adviced to
use the different EVB (EValuationBoards) and SDK (Software Development
Kits) supplied by the chip manufacturer (CPU, ISDN, FXO/FXS) and try to
do the "proof-of-concept" of the hardware design connecting the
different EVBs and use the SDKs provided to run the SPI and TDM buses
(Master and Slaves) from the CPU.

In our case, we made some intermediate PCBs that can make a clean
connection between the CPU EVB and the ISDN and FXO/FXS interfaces. With
the great help of Mehdi Khairy (that used to work with me on the
OpenPattern project) using KiCAD to route the different PCBs (some
bugfixes sent to the KiCAD bugtracker during the routing at
https://bugs.launchpad.net/kicad).

The ISDN connection from the CPU EVB to the ISDN EVB chip (XHFC-4SU - a
4 T1 lines ISDN frame buffers on-chip from CologneChip) is done using
the following PCB (XHFC-4SU-Protoboard) ;

![XHFC-4SU-Protoboard](/images/blog/.XHFC-4SU_Protoboard_m.jpg "XHFC-4SU-Protoboard, mai 2010")

The FXO/FXS connection from the CPU EVB to the FXO/FXS EVB chip (VE890
EVB from Zarlink implementing 2 FXS and 1 FXO) is done using the
following PCB (Zarlink-VE890-Protoboard) ;

![Zarlink-VE890-Protoboard](/images/blog/.Zarlink_VE890_Protoboard_m.jpg "Zarlink-VE890-Protoboard, mai 2010")

Next posts will be presenting the results and the signal obtained on the
SPI and TDM buses from a Digital Oscilloscope and from a Logic Analyzer
(like the saleae one),

</p>

