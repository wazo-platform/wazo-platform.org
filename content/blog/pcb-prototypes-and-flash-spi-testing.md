Title: PCB prototypes and flash SPI testing
Date: 2011-10-04 16:10
Author: xilun
Category: Hardware
Slug: pcb-prototypes-and-flash-spi-testing
Status: published

On the XiVO Open Hardware side, we have been very busy lately writing
various bits of low level software, preparing the production of the
first prototypes, validating some hardware subsystems and doing all sort
of hardware + low level software debugging.

We are starting again to have things interesting to show, with some cute
photos.

**PCB prototypes**

We recently received our first PCB prototypes for our motherboard:

![XIOH motherboard
prototype](/images/blog/.xioh_motherboard_proto_m.jpg "XIOH motherboard prototype, oct. 2011")

To prepare for testing the first assembled prototypes, we wanted to
somehow test the communication between the EP80579 and the SPI flash.
For now we have a 74LVC125A buffer between the two chips in order to
isolate the flash from the SoC, and we wanted to validate this design.

We previously did a small model of the flash subsystem, A few days ago I
heavily hacked it to make it work. (Well some of the modifications were
probably not really necessary, but now we have a perfect signal quality
:)

![Heavily hacked flash prototype
board](/images/blog/.heavily_hacked_flash_proto_m.jpg "Heavily hacked flash prototype board, oct. 2011")

The next step was to do the same test, this time using one of our spare
naked PCBs dedicated to that kind of testing.We first soldered the flash
and the buffer, then we strapped a HE10 ISP header to replace the
EP80579 SPI drivers by a flash programmer (this is obviously not a
perfect replacement, but we can't do much better...)

Here is a photo of the header being soldered:

![Soldering an SPI header at SoC
position](/images/blog/.soldering_an_SPI_header_at_SoC_position_m.jpg "Soldering an SPI header at SoC position, oct. 2011")

Here is the soldered result, connected to the programmer:

![Testing flash
communication](/images/blog/.testing_flash_communication_m.jpg "Testing flash communication, oct. 2011")

And here is the result:

![SPI flash communication test
results](/images/blog/.flash_comm_test_result_m.jpg "SPI flash communication test results, oct. 2011")

So we are now hopeful that at least the SPI flash communication will
work on our assembled board \\\\o/

</p>

