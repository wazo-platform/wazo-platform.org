Title: Opening the bootloader for OpenHardware projects [2] : U-boot - ''Das Unterseeboot\"
Date: 2010-02-23 09:57
Author: xcarcelle
Category: Hardware
Slug: opening-the-bootloader-for-openhardware-projects-2-u-boot-das-unterseeboot
Status: published

This series of posts are dedicated to the different opensource
bootloaders available out-there that are or can be used for OpenHardware
project such as the XiVO IPBX we are currently developping.

This second post on the bootloaders available will present U-boot, one
the widely used bootloader for embedded systems. **U-boot stands for
''Das Unterseeboot"** meaning "the submarine" in German and it's also
known as "Das U-Boot -- the Universal Boot Loader".

U-boot is currently supporting a vast range of architectures such as:
including PPC, ARM, AVR32, MIPS, x86, 68k, Nios, and MicroBlaze
(soft-core for Xilinx FPGAs).

The main advantages of the different OpenSource bootloader solutions are
that they allow "userspace" features at the boot such as: interactive
commands (CLI type usually), environment variables(IP, PATH, R/W
permissions...), command scripting(typically shell scripts - namely used
in uboot-v2 a.k.a. barebox and that we will cover in the next post) and
booting from external media (or network fot TFTP rootfs and images
updates for example).

Einfochips [1](1 "1") provides a great documentation guide on how to
port uboot to a new architecture / platform with a stress on the
different files provided by u-boot and the cross-compilation issue for
the targetted platform/board/cpu.

Usually u-boot is stored (i.e. resides in the beginning memory area of
the flash - internal to the CPU or external-flash) in the beginning area
of the flash. This memory address (sector or block) is defined by by the
board for the very early stage of the boot (in board/xxx/init.S). The
start-up code of the processor is then defined (in cpu/arch/start.S -
like in cpu/bf533/start.S for the Blackfin processor). The boot sequence
symbols are usually noticeable as they are prefixed like "\_start".

First stage loader: U-boot initializes the CPU and the different
peripherals on the board to allows to jump the the memory (DRAM)
subsystems. The processor core is designed to fetch instructions
starting from \_START\_ADDRESS\_ . The core then attempts to execute the
instructions found here. Because this is the top of the memory range,
the instruction found here must be an unconditional branch instruction.
This core has to be hard-coded to configure the upper memory region so
that it is accessible without programming the external bus controller,
to which Flash memory is usually attached. This forces the requirement
to branch to a location within this address space because the processor
is incapable of addressing memory anywhere else until our bootloader
code initializes additional memory regions.

Second stage loader: U-boot loads itself in the RAM (SDRAM, NVRAM in the
CPU RAM or external RAM) and receives the command to boot the kernel
image. The kernel image is then uncompressed, u-boot loads it to the
memory and gives control to the kernel. The kernel will continue the
execution without u-boot.

This post is just a first description of U-boot and we will get more
details for specific architectures with x86 platform that we are
targetting for the XiVO IPBX project.

[1](1 "1") :
http://www.einfochips.com/designers-corner/U-boot%20Porting%20guide.pdf

</p>

