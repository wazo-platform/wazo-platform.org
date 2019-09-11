Title: XIOH prototype version 5: back from factory
Date: 2012-08-22 10:43
Author: xcarcelle
Category: Hardware
Slug: xioh-prototype-version-5-back-from-factory
Status: published

Feedback of the factory
-----------------------

In order to load the factory's pick-and-place machines (2 distinct ones
were used to assemble bottom, then top, then throug-hole components), we
needed an efficient way of sorting the components. Therefore, we created
a database of the correspondence between our BOM and the stickers used
by the factory to load the feeders. See below for an example of one
sticker for one reference used on the top layer.

![XIOHV5\_PCB\_STICK\_EX](/public/XIOHv5/.P1050993_m.jpg "XIOHV5_PCB_STICK_EX, août 2012")

Once all the components were ready and sorted out, they were ready to be
carried at the factory for loading and assembling.

![XIOHV5\_COMPONANTS\_READY](/public/XIOHv5/.20120723_001_m.jpg "XIOHV5_COMPONANTS_READY, août 2012")

As an automatic machine geek, the best part was the loading and
pick-and-place of the several ICs on the board. This part is quite
impressive because of the efficiency of the placing. Afterwards, the PCB
goes through an oven for 10minutes for the final soldering, then cools
down prior to the manual assembly of the through-holes components.

Below is a picture with the various IC packages we are using (CPU, ISDN,
FXO/FXS, micro-controllers...)

![XIOHV5\_LOADING\_ICS](/public/XIOHv5/.20120725_005_m.jpg "XIOHV5_LOADING_ICS, août 2012")

We then prepared the through-holes to be manually assembled by the
factory operators, with a schematic of each component in the best order
to respect the mechanical constraints.

![XIOHV5\_THROUGH\_HOLES](/public/XIOHv5/.20120725_013_m.jpg "XIOHV5_THROUGH_HOLES, août 2012")

The assembling of those throug-holes components can take up to 30minutes
for complex boards. It has to be checked when there are a lot of
connectors (for instance) on a board. The ready-to-test boards were then
placed on shelves for us to start our debugging.

![XIOHV5\_MOUNTING\_THOLES](/public/XIOHv5/.20120725_012_m.jpg "XIOHV5_MOUNTING_THOLES, août 2012")

The first batch of tests was done with 5 of the 50 PCBs in order for us
to start the debugging in our lab.

Debugging the PCBs
------------------

Back to our lab, we were able to start the testing our boards. We did
the following steps in-order:

-   smoke test: testing the power-supply using current-limited power
    supplies for each voltage level, on a special board without the CPU
    assembled (in order to save one in case of short-circuit on
    the board.)
-   flashing the board with our firmwares (programming the
    power-sequence in an MSP430 and a BIOS in an SPI flash.) This
    validates the flashing method and flashing tools/cables.
-   booting-up the CPU and testing the serial console
-   RAM testing: this validates the calibration and initialization of
    the DDR2 controller by our custom firmware.
-   SATA testing: to be able to start the hard drive and the kernel
    image after the complete BIOS boot sequence
-   testing the telco interfaces and phone call features.

![XIOHV5\_DEBUG\_BOARD](/public/XIOHv5/.P1050995_m.jpg "XIOHV5_DEBUG_BOARD, août 2012")

Above is our main whiteboard listing the issues we have on each PCB, and
how to fix those. This is the most exciting (though stressful) part of
hardware development, as we were able to make progress and get results
in a very short time. We were extastic when we got the first board fully
working with the XiVO software running on it!

Final tests
-----------

The rest is mainly software: we got XiVO running with our kernel drivers
and plan to do some stress testing to see how well our boards fare with
time and use.

![XIOHV5\_FULL\_RUNNING](/public/XIOHv5/.20120802_001_m.jpg "XIOHV5_FULL_RUNNING, août 2012")

Next steps
----------

The next steps:

-   finishing the production of the the first 50 PCB batch and start a
    full 4-weeks time period of stress testing on our board to identify
    potential hardware/software bugs,
-   validating the hardware and software,
-   optimizing the production process for the next batches

To be continued soon...

The XiVO Open Hardware team.

</p>

