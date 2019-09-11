Title: Opening the bootloader for OpenHardware projects [1] : Coreboot and the BIOS
Date: 2010-02-15 14:44
Author: xcarcelle
Category: Hardware
Slug: opening-the-bootloader-for-openhardware-projects-1-coreboot-and-the-bios
Status: published

The OpenHardware community had been seeking for more and more openess
lately in the hardware side, as well as in the software side. We see
more and more steps forward of the software side into the configuration
of the hardware (i.e. HDL projects for reconfigurable hardware such as
FPGAs and CPLDs) to reduce the constraints coming from the hardware
configuration.

The hardware part is composed of the schematics, pcb routing files,
gerber production files to enable the open description and output of the
features.

The software part is roughly composed of the bootloader (allowing the
CPU/SoC/uController to boot the memory controller and enable the
peripherals) which will indicate the memory address of the kernel.

In-between the hardware and the software part of the device, the
bootloader is definitely a important "glue" that should be also open to
allow users to implement their own peripherals initialization and boot
optimization of the kernel. For CPU architecture and namely x86
architecture, the booloader also known as the BIOS had been a closed
industry for quite a long time with companies such as American Trends
providing the boot sequence we all know on our PC-environment. The only
options we could have from this BIOS interface are mainly: boot
sequence, CPU frequency clocking, IRQs configuration and some memory
mappings. "Open BIOS" are then a dream of x86-based OpenHardware
projects and coreboot seems now mature enough to make this future true.

Previously known as LinuxBIOS, coreboot [1](1 "1") is a GPL project
developing an OpenSource BIOS firmware for a various number of platforms
and architecture. As we post this message, coreboot is supporting 213
different mainboards.The different supported mainboards "table of
hardware" are available
here:http://www.coreboot.org/Supported\_MotherboardsThe different
chipsets supported are listed in 5 categories: north bridge (fast data
bridge), south bridge(slow data bridge), super I/Os chipsets, CPUs (x86,
PowerPC and emulated QEMU CPUs) and SoCs (AMD Elan SC520 and Intel
Tolapai EP 80579). This list is available
here:http://www.coreboot.org/Supported\_Chipsets\_and\_DevicesThe
different payloads (that we could name also as "second stage loader")
such as the bootloaders and the kernels mainly are listed
here:http://www.coreboot.org/Payloads

Coreboot is now available in version 3 and provide features such as:
express boot sequence (3s to linux console, advanced network booting,
peripherals advanced support.

We will test Coreboot v3 on the targetted x86-based CPU chosen for the
XiVO OpenHardware IPBX and give documentation and feedbacks on the usage
feasability for this appliance in upcoming posts as well as describing
with more details the battle to open the bootloaders (once you open the
bootloader you allow the hardware hackers to play with your device
definitely).

[1](1 "1") : http://www.coreboot.org

</p>

