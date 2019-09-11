Title: Opening the bootloader for OpenHardware projects [3] : Barebox (ex-U-boot v2)
Date: 2010-02-25 11:13
Author: xcarcelle
Category: Hardware
Slug: opening-the-bootloader-for-openhardware-projects-3-barebox-ex-u-boot-v2
Status: published

Following the previous posts about the "open" bootloaders available to
improve and implement advanced features at the boot of your SoC/CPU, we
are, in this post, considering Barebox (formely known as u-boot v2) as
another open bootloader. Barebox aims at giving the developer and
embedded users the best of u-boot (space, easy-to-flash, handy tools)
and the best of the Linux kernel (Kconfig, Kbuild, standards C API,
building methods identical to the kernel with ARCH/CROSS primitives...).

The latest documentation for barebox can be found here [2](2 "2") and
lists the different key features of barebox that can listed as followed:

-   **A posix based file API**: inside barebox the usual
    open/close/read/write/lseek functions are used. This makes it
    familiar to everyone who has programmed under unix systems.

<!-- -->

-   **Usual shell commands** like ls/cd/mkdir/echo/cat,...

<!-- -->

-   **The environment is a file store**. It has currently some
    limitations, of course. The environment is not a real read/write
    filesystem, it is more like a tar archive, or even more like an ar
    archive, because it cannot handle directories. The saveenv command
    saves the files under a certain directory (by default /env) in
    persistent storage (by default /dev/env0). There is a counterpart
    called loadenv, too.

<!-- -->

-   **Real filesystem support**: The loader starts up with mounting a
    ramdisk on /. Then a devfs is mounted on /dev allowing the user (or
    shell commands) to access devices. Apart from these two filesystems
    there is currently one filesystem ported: cramfs. One can mount it
    with the usual mount command.

<!-- -->

-   **Device/driver model**: Devices are no longer described by defines
    in the config file. Instead there are devices which can be
    registered in the board .c file or dynamically allocated. Drivers
    will match upon the devices automatically.

<!-- -->

-   **Clocksource support**: Timekeeping has been simplified by the use
    of the Linux clocksource API. Only one function is needed for a new
    board, no [gs](gs "gs")et\_timer[masked](masked "masked")() or
    reset\_timer[masked](masked "masked")() functions.

<!-- -->

-   **Kconfig and Kernel build system**: Only targets which are really
    needed get recompiled. Parallel builds are no problem anymore. This
    also removes the need for many many ifdefs in the code.

<!-- -->

-   **Simulation target**: barebox can be compiled to run under Linux.
    While this is rather useless in real world this is a great debugging
    and development aid. New features can be easily developped and
    tested on long train journeys and started under gdb. There is a
    console driver for linux which emulates a serial device and a tap
    based ethernet driver. Linux files can be mapped to devices under
    barebox to emulate storage devices.

<!-- -->

-   **Device parameter support**: Each device can have a unlimited
    number of parameters. They can be accessed on the command line with
    &lt;devid&gt;.&lt;param&gt;="...", for example 'eth0.ip=192.168.0.7'
    or 'echo \$eth0.ip'

<!-- -->

-   **Initcalls**: Hooks in the startup process can be archieved
    with \*\_initcall() directives in each file.

<!-- -->

-   **Getopt**: There is a small getopt implementation. Some commands
    got really complicated (both in code and in usage) due to the fact
    that U-Boot only allowed positional parameters.

<!-- -->

-   Editor: Scripts can be edited with a small editor.

Barebox is under GPLv2 licence.

[1](1 "1") : http://barebox.org/[2](2 "2") :
http://barebox.org/documentation/barebox-2010.03.0/

</p>

