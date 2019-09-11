Title: KiCad walkthrough - Part 1
Date: 2010-08-23 18:18
Author: xilun
Category: Hardware
Slug: kicad-walkthrough-part-1
Status: published

For our prototyping/validation tests, we need a particular clock buffer.
Unfortunately, it only comes in
[SSOP](http://en.wikipedia.org/wiki/Shrink_Small-Outline_Package "Shrink small-outline package")
or similar packages and we need to plug it to our
[breadboard](http://en.wikipedia.org/wiki/Breadboard).

While we could have used a generic off-the-shelf
[SSOP](http://en.wikipedia.org/wiki/Shrink_Small-Outline_Package "Shrink small-outline package")
to
[DIP](http://en.wikipedia.org/wiki/Dual_in-line_package "Dual in-line package")
[PCB](http://en.wikipedia.org/wiki/Printed_circuit_board "Printed circuit board"),
we preferred, armed with KiCad, to design a specific one that will
perfectly fit on our breadboard between our existing connectors,
minimizing the amount of additional wiring on those sensitive clock
signals. Also, the small PCB will act as a module by integrating
terminations, power, and activation tracks without needing to reserve
horizontal breadboard line for that. As a result it will be easily
replaceable (or entirely skippable) in virtually no time.

The [KiCad suite](http://www.kicad-eda.org/) is splitted in several
programs. "kicad" the executable is a small project manager that permits
to easily launch other programs to edit the right files.

![KiCad project
manager](/public/kicad_project_manager.png "KiCad project manager, août 2010")

-   ![EESchema icon](/public/eeschema.png "EESchema icon, août 2010")
    EESchema is the
    [schematic](http://en.wikipedia.org/wiki/Circuit_diagram) editor.
-   ![CVpcb icon](/public/cvpcb.png "CVpcb icon, août 2010") CVpcb
    allows to assign module footprint (physical package) to
    schematic components.
-   ![PCBnew icon](/public/pcbnew.png "PCBnew icon, août 2010") PCBnew
    is the
    [PCB](http://en.wikipedia.org/wiki/Printed_circuit_board "Printed circuit board") editor.
-   ![GerbView icon](/public/gerbview.png "GerbView icon, août 2010")
    GerbView is a
    [Gerber](http://en.wikipedia.org/wiki/Gerber_File) viewer.

A typical workflow is to use them right in this order. You can also go
back to previous steps to correct things; the changes can be correctly
propagated to the next programs.

To start a project from scratch, launch kicad, press Ctrl-N and name
your project (and select the directory where it will live). Now launch
EESchema by clicking on its icon. The most important tools to draw a
schematic are in the bar on your right and in the Place menu. Among
them, you'll need most:

-   ![Place a component
    icon](/public/place_a_component.png "Place a component icon, août 2010")
    Place a component
-   ![Place a wire
    icon](/public/place_a_wire.png "Place a wire icon, août 2010") Place
    a wire
-   ![Place no connect flag
    icon](/public/place_no_connect_flag.png "Place no connect flag icon, août 2010")
    Place no connect flag
-   ![Place net name
    icon](/public/place_net_name.png "Place net name icon, août 2010")
    Place net name

EESchema takes very little time to get used to. Don't hesitate to
experiment and try a lot of features of this software. To speed you up,
here are a few hints:

-   Components are better selected, when you don't know their symbolic
    name, by using the library browser during insertion: click anywhere
    in the sheet while using the "Place a component" tool, then click on
    the "Select by browser" button, find the component that you want and
    finally click on the ![Insert component in schematic
    icon](/public/insert_component_in_schematic.png "Insert component in schematic icon, août 2010")
    "Insert component in schematic" button at top-right.
-   EESchema UI for edition is mostly based on a contextual menu
    accessible by right clicking;
-   to end a wire "in the air" (for later connection); right click at
    the wanted position when drawing one and select "Wire end";
-   to drag a wire, right click on it and select "Drag wire";
-   to drag a zone, left click-and-drag to select the zone, then right
    click and select "Drag zone";
-   dragging don't disconnect/change existing connections, while
    moving/orienting will disconnect/reconnect things (depending on
    where the module connectors end up);
-   junctions are added automatically if you start/end a wire in the
    middle of another;
-   you can edit the title block in the ![Page settings
    icon](/public/page_settings.png "Page settings icon, août 2010")
    Page settings;
-   learn shortcut keys and use them to be faster;
-   note that KiCad file formats are plain text based, which is
    extremely cool because you can write external scripts to automatize
    certain tasks (moving a lot of references by a given vector comes
    to mind).

The schematic of our module looks like the following screenshoot.

![Clock buffer EESchema schematic
screenshoot](/public/eeschema_sshoot.png "Clock buffer EESchema schematic screenshoot, août 2010")

Here is the corresponding KiCad schematic file:
[pcb\_h100\_clk\_fs\_49fct3805a.sch](/public/pcb_h100_clk_fs_49fct3805a.sch)

The [next article](index.php?post/2010/09/21/KiCad-walkthrough-Part-2)
will be about schematic component to module footprint assignment.
(CVpcb)

</p>

