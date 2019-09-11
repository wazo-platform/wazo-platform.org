Title: Choosing the right CPU/SoC for an OpenHardware IPBX
Date: 2010-02-01 10:56
Author: xcarcelle
Category: Hardware
Slug: choosing-the-right-cpusoc-for-an-openhardware-ipbx
Status: published

Once one starts an OpenHardware project, you should be thinking about
the core of the device to be designed and namely the CPU/SoC
(System-on-Chip integrating the CPU and the peripherals controllers
built-in the chip). The CPU/SoC is the core of the system and will be
holding the BSP (BoardSupportPackage) with the Linux kernel and the
different drivers/controllers (kernel modules and drivers) and the IPBX
software core system (XiVO and Asterisk in this case) communicating with
the ISDN/FXO/FXS interfaces.

Ideally, to integrate the OpenHardware issue to the core of the device,
the CPU/SoC has to be as open (as in "open specifications", "open
datasheet" or "open HDL source code") as possible. Then several issues
has to be clarified such as:

-The smooth technical gap for users and developers to integrate, use and
hack with the OpenHardware IPBX

-How open can the CPU/SoC be opened ? The next step will be to use
"OpenCores" CPU based on FPGA platform (such as the ones used for
OpenPattern project, the Milkymist Softcore integrating lm32 or the USRP
platform used to integrate the GnuRadio framework)

-What platform is "more" for existing CPU/SoC outhere between
x86/ARM/MIPS/others?

Lots of the current IPBX projects are mainly using the Blackfin DSP
(i.e. the Astfin project) from AnalogDevices that allows advanced DSP
(Digital Signal Processing) functions but lacks openess in terms of
specifications/data-sheets as this point.

Our current objectives is to target an x86 platform that smooths downs
the porting of the existing XiVO framework or the integration of a
ARM/MIPS CPU/SoC with open specifications.

</p>

