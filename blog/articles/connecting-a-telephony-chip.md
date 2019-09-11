Title: Connecting a telephony chip
Date: 2010-04-27 18:20
Author: xilun
Category: Hardware
Slug: connecting-a-telephony-chip
Status: published

------------------------------------------------------------------------

[English version](English%20version "English version")

Several interfaces and connections exist in order to connect an
end-device to a PSTN. Mostly used in Europe: analog, digital
([ISDN](http://en.wikipedia.org/wiki/Integrated_Services_Digital_Network "Integrated Services Digital Network (Wikipedia entry)"))
for 2 communications
([T0](http://en.wikipedia.org/wiki/Basic_rate_interface "Basic Rate Interface (Wikipedia entry)")),
digital for 30 communications
([E1](http://en.wikipedia.org/wiki/Primary_Rate_Interface "Primary Rate Interface (Wikipedia entry)")).
The XiVO IPBX OpenHardware will provide 4 ISDN T0 interfaces (for a
total of 8 simultaneous communications), 1 analog interface for a PSTN
phone or a fax and 1 analog PSTN interface to connect to PSTN carriers.

Some chips are dedicated to such telephony interfaces^\[<span
id="rev-pnote-18-1">[1](#pnote-18-1)</span>\]^, and connect to other
chips of the PCB through:

-   A processor interface bus,^\[<span
    id="rev-pnote-18-2">[2](#pnote-18-2)</span>\]^ for instance an
    [SPI](http://en.wikipedia.org/wiki/Serial_Peripheral_Interface_Bus "Serial Peripheral Interface (Wikipedia entry)")
    bus, or a variant of a parallel local bus (LEB for Intel CPUs, HPI
    for TI DSPs, Local Bus for Freescale MPC8555);
-   A
    [TDM](http://en.wikipedia.org/wiki/Time-division_multiplexing "Time-division multiplexing (Wikipedia entry)")
    bus, also named
    [PCM](http://en.wikipedia.org/wiki/Pulse-code_modulation "Pulse-code modulation (Wikipedia entry)")
    bus;
-   And one trace for the
    [interrupt](http://en.wikipedia.org/wiki/Interrupt "Interrupt (Wikipedia entry)") signal.

The SPI bus is used to configure the chips, request the state of the
line, handle the rings/hang-up/pick-up.^\[<span
id="rev-pnote-18-3">[3](#pnote-18-3)</span>\]^ The SPI bus is used to
send a command to the chip, then wait for a reply. The command/reply
data are transmitted with a binary stream described in each's chip
manual. The SPI bus doesn't allow a spontaneous communication from the
chip handling the line: it can only transmit a reply to a request -
however the interrupt mechanism makes that this is not a problem. If a
variant of parallel local bus is used instead of the SPI bus, it ensures
the very same functions (only the way the messages are exchanged
changes, but the messages themselves do not).

The TDM bus transmits a continuous stream of digital voice data on each
channel, in both direction.^\[<span
id="rev-pnote-18-4">[4](#pnote-18-4)</span>\]^ There are also other
channels for technical data and sometimes signaling data. Independently
from the number of active calls, there is a bidirectionnal transmission
on a predefined number of channels.

Example of a 32 time-slots TDM bus configuration for a 4xT0 interfaces
chip:

-   First T0: channel 0 and 1 carry the sound of the 2 communications,
    channel 2 for the call signaling, channel 3 for the technical data
-   Second T0: channel 4 and 5 carry the sound of the 2 communications,
    channel 6 for the call signaling and channel 7 for the technical
    data

and so on the Third and Fourth T0.

when there is no call on the first T0, the channels 0 and 1 remain
available but silent. The first call on the first T0 will reserve one of
the channel, the second call arriving will book the second channel.

An interrupt signal is sent from the chip to the CPU when an event
occurs. Then, the CPU temporarily interrupts its current task in order
to execute, as soon as possible, a dedicated routine (an interrupt
handler). This routine requests the chip (via the SPI bus) for the
reason of the interrupt sent. As described, all communications on the
SPI bus start from the CPU to the telephony chip
(Master-to-Slave).^\[<span
id="rev-pnote-18-5">[5](#pnote-18-5)</span>\]^ So the interrupt
mechanism is used when the slave chip requires some cares.

------------------------------------------------------------------------

[French version](French%20version "French version")

Différentes liaisons permettent de se brancher au réseau téléphonique
classique. Les plus courantes en Europe sont : analogiques, numériques
([RNIS](http://fr.wikipedia.org/wiki/RNIS "Réseau numérique à intégration de services"))
pour deux communications
([T0](http://fr.wikipedia.org/wiki/Basic_Rate_Interface "Basic Rate Interface (page Wikipédia)")),
numériques pour 30 communications
([E1](http://fr.wikipedia.org/wiki/Primary_Rate_Interface "Primary Rate Interface (page Wikipédia)")).
L'IPBX XiVO OpenHardware disposera de 4 prises RNIS T0 (total : 8
communications simultanées), 1 prise analogique pour y brancher un
téléphone classique ou un fax, et 1 prise pour se brancher sur une ligne
téléphonique analogique.

Les puces dédiées à la réalisation de telles interfaces téléphoniques
dans un équipement numérique peuvent typiquement être connectées aux
autres puces^\[<span id="rev-pnote-18-6">[6](#pnote-18-6)</span>\]^ via
:

-   un bus^\[<span id="rev-pnote-18-7">[7](#pnote-18-7)</span>\]^
    d'interface processeur, par exemple un bus
    [SPI](http://fr.wikipedia.org/wiki/Serial_Peripheral_Interface "Serial Peripheral Interface (page Wikipédia)"),
    ou une variante de bus local parallèle (LEB sur Intel EP80579, HPI
    sur DSP TI, Local Bus sur Freescale MPC8555) ;
-   un bus
    [TDM](http://en.wikipedia.org/wiki/Time-division_multiplexing "Time-division multiplexing (page Wikipédia)"),
    aussi nommé bus
    [PCM](http://fr.wikipedia.org/wiki/Modulation_d%27impulsion_cod%C3%A9e "Pulse-code modulation (page Wikipédia)")
    ;
-   et une piste pour un signal
    d'[interruption](http://fr.wikipedia.org/wiki/Interruption_%28informatique%29 "Interruption (page Wikipédia)").

Le bus SPI est utilisé pour configurer la puce, l'interroger sur l'état
de la ligne, gérer les décrochages/raccrochages/sonneries.^\[<span
id="rev-pnote-18-8">[8](#pnote-18-8)</span>\]^ Le bus SPI fonctionne par
l'envoi d'une commande vers la puce, à laquelle elle peut répondre. Les
commandes et leurs réponses sont transmises sous forme d'une suite de 0
et de 1, organisés selon une convention propre à chaque puce et décrite
dans son manuel. Le bus SPI ne permet pas une communication spontanée
depuis la puce gérant la ligne : elle ne communique dans cette direction
que suite à réception d'une commande - mais le signal d'interruption
fait que cela n'est pas problématique.Si une variante de bus local
parallèle est utilisée à la place du bus SPI, elle assurera exactement
les mêmes fonctions (seule la manière de transmettre les commandes et
réponses change, mais pas ces dernières).

Le bus TDM transmet continuellement le son passant sur chaque canal,
dans les deux sens.^\[<span
id="rev-pnote-18-9">[9](#pnote-18-9)</span>\]^ Il y a de plus
éventuellement des canaux pour des données techniques et dans certains
cas de la signalisation d'appel. Indépendamment du nombre d'appels en
cours, il y a une transmission bidirectionnelle sur un nombre fixé de
canaux transmis par ce bus. Exemple de mise en oeuvre d'une puce gérant
quatre ports T0 avec un bus TDM transportant 32 canaux :

-   pour la première T0 ; les canaux 0 et 1 font passer le son des deux
    communications, le canal 2 la signalisation d'appel, le canal 3 est
    un canal technique
-   pour la deuxième T0 ; les canaux 4 et 5 font passer le son des deux
    communications, le canal 6 la signalisation d'appel, le canal 7 est
    un canal technique
-   et ainsi de suite pour les troisième et quatrième T0.

Lorsqu'il n'y a pas d'appel sur la première T0, les canaux 0 et 1
restent présents mais transmettent du silence. Le premier appel sur la
première T0 réservera un des deux canaux, et un second appel réservera
l'autre.

Un signal d'interruption est envoyé de la puce au processeur quand un
événement s'est produit. Le processeur interrompt alors temporairement
sa tâche en cours pour exécuter au plus tôt une routine dédiée (un
gestionnaire d'interruption). Cette routine interroge la puce (via le
bus SPI) pour savoir ce qui s'est passé. Comme expliqué avant, tous les
dialogues sur le bus SPI débutent dans le sens processeur vers puce
téléphonique.^\[<span id="rev-pnote-18-10">[10](#pnote-18-10)</span>\]^
Le mécanisme des interruptions est donc utilisé lorsque la puce a
quelque chose à dire "spontanément" au processeur.

------------------------------------------------------------------------

<div class="footnotes">

#### Notes

\[<span id="pnote-18-1">[1](#rev-pnote-18-1)</span>\] Even to connect a
*digital* appliance to a *digital* network, the chips implementing the
needed interface are specific, because digital signals can greatly vary
in form.

\[<span id="pnote-18-2">[2](#rev-pnote-18-2)</span>\] A bus is a group
of PCB traces connecting several chips in order for them to communicate,
the role of each trace and the characteristics of the signals should be
well defined.

\[<span id="pnote-18-3">[3](#rev-pnote-18-3)</span>\] The handling of
the rings/hang-up/pick-up is done through the SPI for analog line and in
some case also for digital line and numbering also in this case (the
analog numbering is done through DTMF with frequencies which are simple
sound transmitted like the voice frequencies).

\[<span id="pnote-18-4">[4](#rev-pnote-18-4)</span>\] Technically the
TDM bus is composed of: a clock signal orchestrates the uninterrupted
transmission, which is done through a dedicated signal sent on the
reception side (RX) and one serial signal dedicated to the transmission
side (TX). If ones observes the clock and data sent in each direction,
it will be a continous binary stream. The fourth line, called Frame
Synchronisation (FS), is pulsed at 8kHz (phase locked on the clock
signal). The data between a current Frame Synchronisation and the
following are a constant number of bits, for instance 256. This frame
splits into n-bits consecutive blocks per channel (n=8 for the telephony
system). The majority of chips for telephony applications hold a TDM
bus, and this bus can also be found on certain embedded CPU or DSP chip.
Apart from the telephony world, this kind of bus is also used for some
other types of digital audio transmissions.

\[<span id="pnote-18-5">[5](#rev-pnote-18-5)</span>\] The CPU is Master
on the SPI bus, the telephony chip is in Slave mode on the SPI bus.

\[<span id="pnote-18-6">[6](#rev-pnote-18-6)</span>\] Lorsqu'un
équipement *numérique* dispose, comme pour l'IPBX XiVO OpenHardware,
d'interfaces *numériques*, ces dernières restent pilotées par des puces
dédiées au type d'interface. En effet les signaux transportant
l'information numérique peuvent être de nature très variée et on ne peut
pas connecter n'importe quelle puce numérique à n'importe quel signal
numérique.

\[<span id="pnote-18-7">[7](#rev-pnote-18-7)</span>\] Un bus est un
ensemble de pistes reliant plusieurs puces pour leur permettre de
communiquer, les rôles de chaque piste et les caractéristiques des
signaux étant bien définis.

\[<span id="pnote-18-8">[8](#rev-pnote-18-8)</span>\] La gestion des
décrochages/raccrochages/sonneries se fait par le SPI pour l'analogique,
et dans certains cas aussi pour le numérique, avec la numérotation en
plus dans ce cas (la numérotation en analogique se fait avec des
tonalités, qui ne sont rien de plus qu'un son transmis exactement comme
la voix).

\[<span id="pnote-18-9">[9](#rev-pnote-18-9)</span>\] Techniquement pour
le bus TDM : un signal d'horloge cadence de manière ininterrompue la
transmission, qui se fait via un signal série dédié à la réception et un
signal série dédié à la transmission. Si l'on ne considère que l'horloge
et les données dans chaque sens, on ne voit qu'une suite ininterrompue
de bits. Une quatrième ligne, dite de synchronisation trame, pulse à
8kHZ (en phase avec l'horloge). Les données entre une synchro-trame et
la suivante contiennent un nombre constant de bits, par exemple 256. On
découpe cette trame en blocs de n bits consécutifs par canal (n=8 pour
de la téléphonie). La majorité des puces téléphoniques dispose d'un bus
TDM, bus qu'on retrouve sur certains processeurs embarqués et de
traitement du signal. Hors téléphonie, ce bus est aussi utilisé dans
d'autres contextes audio numérique.

\[<span id="pnote-18-10">[10](#rev-pnote-18-10)</span>\] Le processeur
est maître du bus SPI, la puce téléphonique esclave.

</div>

</p>

