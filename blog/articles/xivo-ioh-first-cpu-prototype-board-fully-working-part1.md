Title: XiVO IOH first CPU prototype board fully working - part1
Date: 2011-12-16 10:06
Author: xcarcelle
Category: Hardware
Slug: xivo-ioh-first-cpu-prototype-board-fully-working-part1
Status: published

Dear followers of our **XiVO IPBX OpenHardware project**, we are happy
to announce that our **first version of our prototype for the CPU
board** (PCB prototyping the CPU and the different interfaces connected
to the CPU) is now fully working and we have a full GNU/Linux system
running on it to start stress-testing our platform (tests of currents
and temperature in a full stress mode). We are now getting closer and
closer to publish a fully-open design of an IPBX running
GNU/Linux/Asterisk/XiVO in OpenHardware.

First we had our **PCB pick-and-placed in our PCB factory** (mainly on a
Fuji machine) and you can see below a screenshot from the precision
placement camera on the machine

![XIOH\_CPU\_Factory\_Cabling\_Screenshot](/public/.20111006_014_m.jpg "XIOH_CPU_Factory_Cabling_Screenshot, déc. 2011")

The main concerns of a PCB design when one wants to first test the just
"pick-and-placed" board is to follow different steps to prevent
undetection of hardware errors of design. These steps are usually (at
least, the ones we followed) the following :

-   **Smoketest** : of the powersupply block doing the different
    voltages level of the board (crucial for a SoC like the one we
    are using) by using different DC external powersuplies for the
    different ATX voltage levels (+12V, -12V, +5V, +5VSBY, +3V3) and
    limiting the current following the Intel EP80579 datasheet. This
    test was positive on each of the voltage level and confirming that
    our power-supply is functionnal in terms of voltage level and
    current limitations
-   **Bringup** : booting the board with a correct DDR2 DIMM (1Go) and
    flashing our version of coreboot build on our 2Mo SPI-flash using a
    dediprog SF100 SPI programer
-   **Connecting the SATA HDD w/ a fully configured Linux kernel** and
    trying to jump from the functionnal coreboot to grub then Linux
    decompression of the image

Please find below, a picture of the lab deployment of the board powered
by external power-supplies and connected to a bus-pirate for the
flashing of our bootloader through SPI connexions.

![XIOH\_CPU\_P4\_test\_1](/public/.20111118_001_m.jpg "XIOH_CPU_P4_test_1, déc. 2011")

Once this smoke-test and bring-up test were fully positive and allowing
us to move to next step with some stress-tests :

-   **Temperature\#**1 : Running a memtest86+ on the DDR2 and testing
    the temperature of the CPU package w/ a temperature sensor
-   **Temperateur\#2** : Running an Intel utility for our SoC (pushing
    the CPU usage to 100% and memory to 50%) and measuring the
    temperature
-   **Temperature\#3** : Putting one of our board into a test metallic
    case and connecting the board w/ 3 parallel GbE interfaces fully
    loaded w/ iperf at 1Gbps and measuring the temperature in the case
    after several hours
-   Bitrate : Iperf'ing the 3xGbE interfaces and measuring the load of
    the CPU and the transfer bitrates

Please find below, a picture of our lab w/ 2 XIOH CPU boards running our
test-program and 3xGbE interfaces connected together one-by-one

![XIOH\_CPU\_P4\_test\_2](/public/.20111125_002_m.jpg "XIOH_CPU_P4_test_2, déc. 2011")

We will update our different tests on the CPU boards and keep you update
on the follow-ups of our design steps.

Xavier Carcelle.

</p>

