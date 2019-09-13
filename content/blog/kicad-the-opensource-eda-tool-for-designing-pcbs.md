Title: KiCAD: The OpenSource EDA tool for designing PCBs
Date: 2010-05-20 14:49
Author: xcarcelle
Category: Hardware
Slug: kicad-the-opensource-eda-tool-for-designing-pcbs
Status: published

This post aims at presenting KiCAD ^\[<span
id="rev-pnote-21-1">[1](#pnote-21-1)</span>\]^, THE OpenSource EDA tool
for CAD file used to design PCB (Printed Circuit Boards) originally
designed and written by Jean-Pierre Charras, a researcher at LIS
(Laboratoire des Images et des Signaux) and a teacher at IUT de Saint
Martin d'Hères (France), in the field of electrical engineering and
image processing.KiCAD aims at being a tool equivalent to the
"closed-non-free" CAD software like Atium Protel, Eagle, Cadence with
the benefit of a free and open-source with a community of developer and
early-user implementing KiCAD for industrial hardware design of PCB up
to 10layers and a growing collection of component footprints and
reference in the library (the standard footprints like SOTs, QFPs, BGAs
are crucial to have the maximum support of the ICs, chips of the silicon
manufacturers)

Kicad is a set of four softwares and a project manager:

-   Eeschema: Schematic entry.
-   Pcbnew:Board editor.
-   Gerbview: GERBER viewer (photoplotter documents).
-   Cvpcb: footprint selector for components used in the circuit design.
-   Kicad: project manager.

KiCAD early-users and developers can participate to the project on the
subversion ^\[<span id="rev-pnote-21-2">[2](#pnote-21-2)</span>\]^

A bug tracker ^\[<span id="rev-pnote-21-3">[3](#pnote-21-3)</span>\]^ is
up and running for feedbacks from the users (GUI optimization for GNU
users and Windows users mainly).

From our XiVO IPBX OpenHardware project point of view, we are also using
KiCAD mainly for small PCB and Schematics of your interfaces between
each functionnal block. The screen-shot below presents the KiCAD
Eeschema to implement the TDM connexion between the CPU and the ISDN
chip:

![XiVO ISDN TDM Connexions
Prototyping](/images/blog/.KiCAD_XiVO_PCB_Prototyping_XHFC_4SU_TDM_Bus_m.jpg "XiVO ISDN TDM Connexions Prototyping, mai 2010")

The right-side toolbar is for selecting the object to include in the
schematic (component, power, ground, wires ...), the top part toolbar is
there for the sheet preferences and settings and for the interaction
with the PCB editor and gerber exporter and viewer.

<div class="footnotes">

#### Notes

\[<span id="pnote-21-1">[1](#rev-pnote-21-1)</span>\]
http://www.lis.inpg.fr/realise\_au\_lis/kicad/

\[<span id="pnote-21-2">[2](#rev-pnote-21-2)</span>\]
http://kicad.svn.sourceforge.net/viewvc/kicad/

\[<span id="pnote-21-3">[3](#rev-pnote-21-3)</span>\]
https://bugs.launchpad.net/kicad

</div>

</p>

