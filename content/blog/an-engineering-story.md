Title: An engineering story
Date: 2012-09-29 16:12
Author: xilun
Category: Hardware
Slug: an-engineering-story
Status: published

To be able to track interesting quality metrics of our upcoming XiVO
Office product (XiVO IPBX Open Hardware project), we have decided to add
temperature sensors to our current XIOH pcb.

In computers, the typical way to report the temperature to the main
operating system is through SMBus. This is suitable in our case: we
already have an MSP430 microcontroller that handles the power sequence
and is connected to the SMBus of the board. We will connect some diodes
to the MSP430 to measure the temperature. So the time has come to make
use of the SMBus between the MSP and the EP80579 (our main System On
Chip), for temperature measurements and also other purposes.

The MSP430 does not have a full featured SMBus controller, only a
generic I2C one. SMBus is a variant of I2C, with additional electrical
and timing constraints in the physical layer and definition of the
messages at the network layer level.

Although formatting and parsing SMBus messages is easy, properly using
the I2C controller of the MSP430 in a multi-master environment is not
without pitfalls, even if we did not care about the SMBus timing
constraints. To do it with the needed reliability, it is necessary to
have a detailed knowledge of the whole system and to take into
consideration all kind of interactions on the bus and in the chips. In
our business, the reliability wanted by the customers is typically high
enough that it makes sense to build robust systems instead of rushing a
collapsing sandcastle to market. Plus, in that particular case, we are
dealing with the subsystem that brings and keeps the whole board
running, and for which the cost to debug in the field is absurdly high.

All complex chips come with various design errors, and the MSP430 is no
exception. On the exact version that we use, there are 6 documented
errors affecting the I2C controller, of which 4 clearly apply to our
board, 1 clearly does not apply, and one required careful system
analysis to determine that the preconditions to this erroneous behavior
could not happen in our system.

On top of the 4 errata applying to the I2C controller, we have to deal
with errata for other parts of the MSP430, plus some detailled aspects
that are not errata but are also limiting the way we can make a reliable
use of the chip for the tasks we want.Failure to properly take all those
details into consideration would lead to eventual faults of various
natures, probably including MSP430 crashes impossible to diagnose and
leading to spurious shutdowns, systems stuck in the powered state, or
any random behavior and degradation of system functions.

The impact could be full-scale, with potential consequences on:
availability, maintainability, safety, security, and reliability!

It is worthwhile to note that one of the errata that could have the
biggest consequences can only be handled by using one specific software
architecture to drive the I2C controller, and that specific software
architecture is not the first thing that comes to mind in our
preexisting firmware. This is a case where iteration on the design of
the I2C code would have meant its complete rewrite.

Complex systems, even moderately so, need a careful design, especially
on components that are critical for business or technical reasons.
Wishful thinking never produces high reliability and neither does
excessive reliance on luck. Modeling, even informally, sometimes pays.

</p>

