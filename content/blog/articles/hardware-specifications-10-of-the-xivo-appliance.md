Title: Hardware specifications 1.0 of the XiVO appliance
Date: 2010-01-25 11:21
Author: xcarcelle
Category: Hardware
Slug: hardware-specifications-10-of-the-xivo-appliance
Status: published

The goal of the XiVO OpenHardware project is to to develop a open-specs,
open-docs appliance from the design of the hardware project to the CAD
files and production files underneath the project. The target of this
appliance is a small IPBX appliance ideal for SOHO requirements in terms
of IP-phone lines as well as analog connectivity for fax/analog lines.

The following bloc diagram expresses the different features targetted on
the XiVO OpenHardware project to allow the appliance to interact with 4
PSTN T0 lines, analog FXO and FXS interfaces as well as usual IP
networks connectivities, storage interfaces and configuration/debugging
interfaces.

![XiVO Hardware
specificatons](/public/.XiVO_Appliance_Hardware_Specifications_m.jpg "XiVO Hardware specificatons, janv. 2010")

-   The CPU is purposely chosen with a x86 architecture to allow a
    smooth porting from the existing XiVO framework into the hardware.
    The BSP is a debian-based Linux and will be easily into this
    CPU architecture. The CPU will probably behaves as a SoC
    intregrating the different controllers for the peripherals. RAM will
    be connected

<!-- -->

-   ISDN Lines: 4 T0 lines which allows 8 simultaneous communications.
    These interfaces will be controlled by a ISDN chip connected to the
    CPU (SPI/TDM interfaces)

<!-- -->

-   Analog phone lines: The appliance is supposed to interact with
    existing PABX and to act as a PABX for the local phones on the
    SOHO network. The FXS (Foreign eXchange Subscriber) interface will
    allow the IPBX to connect to PSTN lines as a subscriber for
    analog/fax needs. The FXO (Foreign eXchange Office) interface will
    allow the IPBX to act as an analog PBX to connect local analog
    phones to the IPBX and allows a SOHO phone environment mixed between
    IP-phones and analog phones.

<!-- -->

-   IP Network: The XiVO IPBX will have 2 100baseT Ethernet interfaces
    for WAN/LAN IP connectivity

<!-- -->

-   Storage: The XiVO IPBX will have external SD, internal HDD storage
    for the BSP config files as well as for the logs, firewall rules...

<!-- -->

-   Debugging/Configuration: The XiVO IPBX will have a USB interface
    (USB host) allowing the connexion of external devices. Also for
    debugging and output console, the XiVO IPBX will have a RS232
    external serial interface as well as on-PCB console ports on
    the CPU.

Next steps: prototyping of the different bloc diagram connected to the
EVB (EValuation Board) of the CPU based on the XiVO framework.

</p>

