Title: KiCad walkthrough - Part 2
Date: 2010-09-21 12:04
Author: xilun
Category: Hardware
Slug: kicad-walkthrough-part-2
Status: published

The schematic represents a logical point of view of an electronic
circuit. Before we can design a
[PCB](http://en.wikipedia.org/wiki/Printed_circuit_board "Printed circuit board")
layout matching this circuit, we must specify how each schematic
component will be physically implemented. For example, a 20 pin chip can
come in
[SSOP](http://en.wikipedia.org/wiki/Shrink_Small-Outline_Package "Shrink small-outline package")
or
[DIP](http://en.wikipedia.org/wiki/Dual_in-line_package "Dual in-line package"),
and the board won't look exactly the same in each case (the traces won't
end at the same places).

![DIL20 to 50 mils spaced
traces](/public/dil20.png "DIL20 to 50 mils spaced traces, sept. 2010")
![SSOP20 to 50 mils spaced
traces](/public/ssop20.png "SSOP20 to 50 mils spaced traces, sept. 2010")

The two images above represent 20 traces (50 mils spaced) ending on a
DIL20 package (left) and on a SSOP20 package (right).

![CVpcb icon](/public/cvpcb.png "CVpcb icon, août 2010") In
[KiCad](http://www.kicad-eda.org/), this assignment between schematic
components and module footprint is done with the program named CVpcb.

Before CVpcb can be used, a
[netlist](http://en.wikipedia.org/wiki/Netlist) must be generated. A
netlist is an abstract representation of the electronic circuit, which
focus on describing which pins of the various components are
interconnected (in a set that is called a net), disregarding the details
of how they are connected in the schematic drawing. The schematic
drawing is an abstract representation, and for example the length and
the shape of a connection it includes is irrelevant to how this
connection will eventually be physically implemented on the PCB. So the
netlist is simply the list of all the components plus a list of nets,
each one containing a list of interconnected pins of various components.

The netlist and which footprint to use for each component will later be
the input of the PCB design done with PCBnew. To automatically generate
the netlist with EESchema, click on the generate netlist button
![Generate netlist
button](/public/generate_netlist_button.png "Generate netlist button, sept. 2010")
in the top toolbar: a "Netlist" window appears, in which you just have
to click on the button "Netlist" in the tab Pcbnew while the "Default
format" option is selected. You are then presented with a "Save Netlist
Files" dialog, in which you just have to confirm the filename -- it
should already be correctly selected as &lt;project\_name&gt;.net in the
project directory.

Now that the netlist is generated, we can use CVpcb. Launch it for
example by clicking on its icon ![Run CVpcb
button](/public/run_cvpcb_button.png "Run CVpcb button, sept. 2010")
also in the top toolbar of EESchema.When no affectation has been done
before for the current project, CVpcb immediatly warns that a
&lt;project\_name&gt;.cmp file does not exist -- this is not a problem,
it will be created by CVpcb when you save.

Now for each schematic component you can assign a PCB footprint. Select
the component on the left then double click on the footprint you want to
use for it on the right. You can press the first letter of what you are
looking for when one of the two lists is activated.

When you save in CVpcb, it shows a "Save Net and Component List" dialog
defaulting to the same &lt;project\_name&gt;.net file that we created
during netlist generation. This is OK, just overwrite the former: CVpcb
will maintain the same netlist in the saved file, but the file will now
also include schematic components to module footprints affectations. A
&lt;project\_name&gt;.cmp file is also created behind the scene, which
contains just the affectations using a different file format.

For our clock buffer, the affectation in CVpcb looks like the following
screen-shoot.

![Clock buffer CVpcb footprint assignment
screenshoot](/public/cvpcb_sshoot.png "Clock buffer CVpcb footprint assignment screenshoot, sept. 2010")

The corresponding .net and .cmp files are attached to this post.

</p>

