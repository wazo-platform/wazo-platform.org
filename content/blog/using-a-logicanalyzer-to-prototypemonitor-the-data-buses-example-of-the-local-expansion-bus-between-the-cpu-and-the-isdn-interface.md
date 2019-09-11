Title: Using a LogicAnalyzer to prototype/monitor the data buses: example of the Local Expansion Bus between the CPU and the ISDN interface
Date: 2010-06-22 14:19
Author: xcarcelle
Category: Hardware
Slug: using-a-logicanalyzer-to-prototypemonitor-the-data-buses-example-of-the-local-expansion-bus-between-the-cpu-and-the-isdn-interface
Status: published

In the process of developing an OpenHardware project, the prototyping
process is quite important and namely the validation of the data buses
exchanging telecommunications data (synchronization, reset, interrupts,
tx/rx data, signaling...) between the different interfaces and chips on
the hardware product.

At this step of, once the analog SP (Signal Processing) is validated,
one can test the data-buses using the so-called "LogicAnalyzer" that
will put the signal on the bus into readable binary data (from the TTL
levels triggered on edges or any other events on the trigger line
chosen).LogicAnalyzer can be quite expensive appliance (such as digital
scope or frequency analyzer) but nowadays affordable device exist also
allowing the hardware designer / tester to monitor the data on one bus.
Such kind of LogicAnalyzer are usually based on 3 parts:

-   EZ-Hook type of connectors to probe the pins/headers on the
    prototype card or PCB (i.e. TP - TestPoint)
-   TTL-to-USB chip to transform the analog signal probed into binary
    signals
-   USB interface to connect the host-PC with the right analyzer
    software (usually unfortunately running for MS)

Please find a list of USB Logic Analyzer available (some supported with
sigrok ^\[<span id="rev-pnote-24-1">[1](#pnote-24-1)</span>\]^

-   USBee SX Test Pod Logic Analyzer ^\[<span
    id="rev-pnote-24-2">[2](#pnote-24-2)</span>\]^ (a HUGE sample buffer
    PC and USB based multifunction logic analyzer)
-   EE Electronics XLA ESLA100 (a cheap 8-channel logic analyzer)
-   ASIX Sigma (a 6 channel logic analyzer with sample rate support up
    to 200 MHz and with 256 Mbit on-board memory)
-   Openbench Logic Sniffer (a FPGA-based logic analyzer, supporting 32
    probes for probing up to 100MHz signals)
-   Braintechnology USB-LPS (a Cypress FX2 based logic analyzer and
    signal generator with up to 16 channels)
-   Buspirate ^\[<span id="rev-pnote-24-3">[3](#pnote-24-3)</span>\]^
-   Intronix Logicport LA1034 (a FPGA-based logic analyzer, capable of
    sampling data on 34 channels at up to 500MHz) ^\[<span
    id="rev-pnote-24-4">[4](#pnote-24-4)</span>\]^

The one we are using for the prototyping of the XiVO OpenHardware IPBX
is a Saleae Logic Analyzer with the 1.0.21 software ^\[<span
id="rev-pnote-24-5">[5](#pnote-24-5)</span>\]^

Below are 2 snapshots of signals probed on the Local Expansion Bus
connecting the CPU with the ISDN chip:

-   /CS: Chip Select signal (to indicate which chip on the LEB should
    be driven)
-   /RD: ReaD signal (from the CPU indicating that the data will be read
    from the ISDN chip registers)
-   /WR: WRite signal (from the CPU indicating that the data will be
    written into the ISDN chip registers)
-   ALE: Address LatchE to indicate which Address of Data to retrieve
-   D0: Bit 0 from the LEB data bus
-   D1: Bit 1 from the LEB data bus
-   D2: Bit 2 from the LEB data bus
-   A8: Address 8 (EX\_ADDR[8](8 "8")) line on the CPU used to trigger
    the scope or the logic analyzer

As one can see in the screenshot below, the A8 line is set on "0" + "1"
which means the triggering is done on upper edge from this signal.

![LEB CPU ISDN LogicAnalyzer
traces](/images/blog/.XiVO_IPBX_LEB_BUS_CPU_ISDN_Snapshot1_m.jpg "LEB CPU ISDN LogicAnalyzer traces, juin 2010")

The view below is a zoomed view of the above screenshot with a focus on
the triggering on A8 line

![LEB CPU ISDN LogicAnalyzer traces
zoom](/images/blog/.XiVO_IPBX_LEB_BUS_CPU_ISDN_Snapshot2_m.jpg "LEB CPU ISDN LogicAnalyzer traces zoom, juin 2010")

<div class="footnotes">

#### Notes

\[<span id="pnote-24-1">[1](#rev-pnote-24-1)</span>\]
http://sigrok.org/wiki/Main\_Page

\[<span id="pnote-24-2">[2](#rev-pnote-24-2)</span>\] http://usbee.com

\[<span id="pnote-24-3">[3](#rev-pnote-24-3)</span>\]
http://dangerousprototypes.com/2009/11/03/bus-pirate-logic-analyzer-mode/

\[<span id="pnote-24-4">[4](#rev-pnote-24-4)</span>\]
http://www.pctestinstruments.com/

\[<span id="pnote-24-5">[5](#rev-pnote-24-5)</span>\]
http://www.saleae.com

</div>

</p>

