Title: [Prototype] Description of the functionnal buses
Date: 2010-08-03 09:50
Author: xcarcelle
Category: Hardware
Slug: prototype-description-of-the-functionnal-buses
Status: published

As this OpenHardware project moves forward, we are now approaching a
**complete prototyping** of our functionnal blocks and
telecommunications interfaces control from the Linux kernel. The main
functionnal blocks to be tested and validated are in our architecture
based on the following buses:

-   **SPI (Serial Peripheral Interface)** bus between the CPU and the
    FXO/FXS chip
-   **LEB (Local Expansion Bus)** between the CPU and the ISDN chip
-   **TDM (Time Division Multiplexing)** connecting the CPU, ISDN and
    FXO/FXS chip together to transmit the digial streams of voice
    channels
-   **GPIO (General Purpose Input Output)** for the RST (Reset) signals
    and IRQ (Interrupts) signals
-   **CLK (Clock)** signals architecture to be sent to the different
    chips

**Below is a picture of our prototype boards** connected together to
demonstrate the functionnalities of each blocks for our software
development on the Linux kernel modules:

![XiVO IPBX Prototype
WishBoard-108](/images/blog/.20100802_002_m.jpg "XiVO IPBX Prototype WishBoard-108, août 2010")

We have been using the large prototyping breaboard from Wisher (at
farnell.com on:
<http://fr.farnell.com/jsp/search/productdetail.jsp?SKU=1472854>) that
is great to split different wires connectivity on the breadboard.

In the next posts, we will describe the results and work done on each
buses to achieve the first global tests for voice channel routing with
our XiVO IPBX OpenHardware.

</p>

