---
title: Supported Devices
---

`wazo-provd` plugins for these devices can be installed from the
`"Supported devices" repository <alternative-plugins-repo>`{.interpreted-text
role="ref"}.

## Aastra

Aastra has been acquired by Mitel in 2014. In Wazo, the 6700 series and
6800 series phones are still referenced as Aastra phones, for historical
and compatibility reasons.

### 6700i series

  --------------------------------------------------------------------------------------------
                                     6731i       6735i   6737i      6739i      6755i   6757i
  ---------------------------------- ----------- ------- ---------- ---------- ------- -------
  Provisioning                       Y           Y       Y          Y          Y       Y

  H-A                                Y           Y       Y          Y          Y       Y

  Directory XIVO                     Y           Y       Y          Y          Y       Y

  Funckeys                           8           26      30         55         26      30

                                     **Suppo   rted    grammabl   e keys**
                                                 pro

  User with supervision function     Y           Y       Y          Y          Y       Y

  Group                              Y           Y       Y          Y          Y       Y

  Queue                              Y           Y       Y          Y          Y       Y

  Conference Room with supervision   Y           Y       Y          Y          Y       Y
  function

  **General Functions**

  Online call recording              N           N       N          N          N       N

  Phone status                       Y           Y       Y          Y          Y       Y

  Sound recording                    Y           Y       Y          Y          Y       Y

  Call recording                     Y           Y       Y          Y          Y       Y

  Incoming call filtering            Y           Y       Y          Y          Y       Y

  Do not disturb                     Y           Y       Y          Y          Y       Y

  Group interception                 Y           Y       Y          Y          Y       Y

  Listen to online calls             Y           Y       Y          Y          Y       Y

  Directory access                   Y           Y       Y          Y          Y       Y

  Filtering Boss - Secretary         Y           Y       Y          Y          Y       Y

  **Transfers Functions**

  Blind transfer                     HK          Y       Y          HK         Y       Y

  Indirect transfer                  HK          Y       Y          HK         Y       Y

  **Forwards Functions**

  Disable all forwarding             Y           Y       Y          Y          Y       Y

  Enable/Disable forwarding on no    Y           Y       Y          Y          Y       Y
  answer

  Enable/Disable forwarding on busy  Y           Y       Y          Y          Y       Y

  Enable/Disable forwarding          Y           Y       Y          Y          Y       Y
  unconditional

  **Voicemail Functions**

  Enable voicemail with supervision  Y           Y       Y          Y          Y       Y
  function

  Reach the voicemail                Y           Y       Y          HK         Y       Y

  Delete messages from voicemail     Y           Y       Y          Y          Y       Y

  **Agent Functions**

  Connect/Disconnect a static agent  Y           Y       Y          Y          Y       Y

  Connect a static agent             Y           Y       Y          Y          Y       Y

  Disconnect a static agent          Y           Y       Y          Y          Y       Y

  **Parking Functions**

  Parking                            Y           Y       Y          Y          Y       Y

  Parking position                   Y           Y       Y          Y          Y       Y

  **Paging Functions**

  Paging                             Y           Y       Y          Y          Y       Y
  --------------------------------------------------------------------------------------------

  Model    Tested[^1]   Fkeys[^2]   Wazo HA[^3]
  -------- ------------ ----------- -------------
  6730i    No           8           Yes
  6753i    Yes          6           Yes
  6757i    Yes          30          Yes
  9143i    Yes          7           Yes
  9480i    No           6           Yes
  9480CT   No           6           Yes

Supported expansion modules:

-   Aastra® M670i (for Aastra® 35i/37i/39i/53i/55i/57i)
-   Aastra® M675i (for Aastra® 35i/37i/39i/55i/57i)

### 6800i series

  ----------------------------------------------------------------------------------
                                           6863i       6865i   6867i      6869i
  ---------------------------------------- ----------- ------- ---------- ----------
  Provisioning                             Y           Y       Y          NT

  H-A                                      Y           Y       Y          Y

  Directory XIVO                           Y           Y       Y          Y

  Funckeys                                 0           8       38         68

                                           **Suppo   rted    grammabl   e keys**
                                                       pro

  User with supervision function           N           Y       Y          Y

  Group                                    N           Y       Y          Y

  Queue                                    N           Y       Y          Y

  Conference Room with supervision         N           Y       Y          Y
  function

  **General Functions**

  Online call recording                    N           Y       Y          Y

  Phone status                             N           Y       Y          Y

  Sound recording                          N           Y       Y          Y

  Call recording                           N           Y       Y          Y

  Incoming call filtering                  N           Y       Y          Y

  Do not disturb                           N           Y       Y          Y

  Group interception                       N           Y       Y          Y

  Listen to online calls                   N           Y       Y          Y

  Directory access                         N           Y       Y          Y

  Filtering Boss - Secretary               N           Y       Y          Y

  **Transfers Functions**

  Blind transfer                           HK          HK      HK         HK

  Indirect transfer                        HK          HK      HK         HK

  **Forwards Functions**

  Disable all forwarding                   N           Y       Y          Y

  Enable/Disable forwarding on no answer   N           Y       Y          Y

  Enable/Disable forwarding on busy        N           Y       Y          Y

  Enable/Disable forwarding unconditional  N           Y       Y          Y

  **Voicemail Functions**

  Enable voicemail with supervision        N           Y       Y          Y
  function

  Reach the voicemail                      N           Y       Y          Y

  Delete messages from voicemail           N           Y       Y          Y

  **Agent Functions**

  Connect/Disconnect a static agent        N           Y       Y          Y

  Connect a static agent                   N           Y       Y          Y

  Disconnect a static agent                N           Y       Y          Y

  **Parking Functions**

  Parking                                  N           Y       Y          Y

  Parking position                         N           Y       Y          Y

  **Paging Functions**

  Paging                                   N           Y       Y          Y
  ----------------------------------------------------------------------------------

Supported expansion modules:

-   Aastra® M680 (for Aastra® 6865i/6867i/6869i)
-   Aastra® M685 (for Aastra® 6865i/6867i/6869i)

### DECT Infrastructure

  -------------------------------------
                      RFP35    RFP36
  ------------------- -------- --------
  Provisioning        N        N

  H-A                 N        N

  Directory XIVO      N        N

  Funckeys            0        0
  -------------------------------------

## Alcatel-Lucent

IP Touch series:

  Model                   Tested[^4]   Fkeys[^5]   Wazo HA[^6]
  ----------------------- ------------ ----------- -------------
  4008 Extended Edition   Yes          4           No
  4018 Extended Edition   Yes          4           No

Note that you *must not* download the firmware for these phones unless
you agree to the fact it comes from a non-official source.

For the plugin to work fully, you need these additional packages:

    apt-get install p7zip python-pexpect telnet

## Avaya

1200 series IP Deskphones (previously known as Nortel IP Phones):

  Model     Tested[^7]   Fkeys[^8]   Wazo HA[^9]
  --------- ------------ ----------- -------------
  1220 IP   Yes          0           No
  1230 IP   No           0           No

## <a name="cisco-provisioning"><a>Cisco

Cisco Small Business SPA300 series:

  Model    Tested[^10]   Fkeys[^11]   Wazo HA[^12]
  -------- ------------- ------------ --------------
  SPA301   No            1            No
  SPA303   No            3            No

#:exclamation: Function keys are shared with line keys for all SPA phones

Cisco Small Business SPA500 series:

  Model      Tested[^13]   Fkeys[^14]   Wazo HA[^15]
  ---------- ------------- ------------ --------------
  SPA501G    Yes           8            No
  SPA502G    No            1            No
  SPA504G    Yes           4            No
  SPA508G    Yes           8            No
  SPA509G    No            12           No
  SPA512G    No            1            No
  SPA514G    No            4            No
  SPA525G    Yes           5            No
  SPA525G2   No            5            No

The SPA500 expansion module is supported.

Cisco Small Business IP Phones (previously known as Linksys IP Phones)

  Model    Tested[^16]   Fkeys[^17]   Wazo HA[^18]
  -------- ------------- ------------ --------------
  SPA901   No            1            No
  SPA921   No            1            No
  SPA922   No            1            No
  SPA941   No            4            No
  SPA942   Yes           4            No
  SPA962   Yes           6            No

#:exclamation: You must install the firmware of each SPA9xx phones you are using since
they reboot in loop when they can't find their firmware.

The SPA932 expansion module is supported.

ATAs:

  Model     Tested[^19]   Fkeys[^20]   Wazo HA[^21]
  --------- ------------- ------------ --------------
  PAP2      No            0            No
  SPA2102   No            0            No
  SPA8800   No            0            No
  SPA112    No            0            No

> For best results, activate `dhcp-integration`{.interpreted-text
> role="ref"} on your Wazo.

#:exclamation: These devices can be used to connect Faxes. For better success with
faxes some parameters must be changed. You can read the
`fax-analog-gateway`{.interpreted-text role="ref"} section.

#:exclamation: If you want to manually resynchronize the configuration from the ATA
device you should use the following url:

<http://ATA_IP/admin/resync?http://WAZO_IP:8667/CONF_FILE>

> where :
>
> > -   *ATA_IP* is the IP address of the ATA,
> > -   *WAZO_IP* is the IP address of your Wazo,
> > -   *CONF_FILE* is one of `spa2102.cfg`, `spa8000.cfg`

### ATAs

  ------------------------------------------------
                      SPA122   SPA3102   SPA8000
  ------------------- -------- --------- ---------
  Provisioning        Y        Y         Y

  H-A                 N        N         N

  Directory XIVO      N        N         N

  Funckeys            0        0         0
  ------------------------------------------------

For best results, activate `dhcp-integration`{.interpreted-text
role="ref"} on your Wazo.

These devices can be used to connect faxes. For better success with
faxes some parameters must be changed. You can read the
`fax-analog-gateway`{.interpreted-text role="ref"} section.

#:exclamation: If you want to manually resynchronize the configuration from the ATA
device you should use the following url:

<http://ATA_IP/admin/resync?http://WAZO_IP:8667/CONF_FILE>

> where :
>
> > -   *ATA_IP* is the IP address of the ATA,
> > -   *WAZO_IP* is the IP address of your Wazo,
> > -   *CONF_FILE* is one of `spa3102.cfg`, `spa8000.cfg`

### Cisco 7900 Series

<table>
<colgroup>
<col style="width: 29%" />
<col style="width: 5%" />
<col style="width: 5%" />
<col style="width: 5%" />
<col style="width: 5%" />
<col style="width: 5%" />
<col style="width: 5%" />
<col style="width: 5%" />
<col style="width: 5%" />
<col style="width: 7%" />
<col style="width: 5%" />
<col style="width: 5%" />
<col style="width: 5%" />
<col style="width: 5%" />
</colgroup>
<thead>
<tr class="header">
<th></th>
<th>7905G</th>
<th>7906G</th>
<th>7911G</th>
<th>7912G</th>
<th>7920</th>
<th>7921G</th>
<th>7940G</th>
<th>7941G</th>
<th>7941G-GE</th>
<th>7942G</th>
<th>7960G</th>
<th>7961G</th>
<th>7962G</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Provisioning</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="even">
<td>H-A</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NT</td>
<td>NT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="odd">
<td>Directory XIVO</td>
<td>FK</td>
<td>FK</td>
<td>FK</td>
<td>FK</td>
<td>N</td>
<td>N</td>
<td>FK</td>
<td>FK</td>
<td>FK</td>
<td>FK</td>
<td>FK</td>
<td>FK</td>
<td>FK</td>
</tr>
<tr class="even">
<td>Funckeys</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>1</td>
<td>1</td>
<td>1</td>
<td>1</td>
<td>5</td>
<td>5</td>
<td>5</td>
</tr>
<tr class="odd">
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td><blockquote>
<p>**S</p>
</blockquote></td>
<td>upported</td>
<td>program</td>
<td>mable ke</td>
<td>ys**</td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>User with supervision function</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
</tr>
<tr class="odd">
<td>Group</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
</tr>
<tr class="even">
<td>Queue</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
</tr>
<tr class="odd">
<td>Conference Room with supervision function</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
</tr>
<tr class="even">
<td><strong>General Functions</strong></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td>Online call recording</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
</tr>
<tr class="even">
<td>Phone status</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
</tr>
<tr class="odd">
<td>Sound recording</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
</tr>
<tr class="even">
<td>Call recording</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
</tr>
<tr class="odd">
<td>Incoming call filtering</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
</tr>
<tr class="even">
<td>Do not disturb</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>N</td>
<td>N</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
</tr>
<tr class="odd">
<td>Group interception</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
</tr>
<tr class="even">
<td>Listen to online calls</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
</tr>
<tr class="odd">
<td>Directory access</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="even">
<td>Filtering Boss - Secretary</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
</tr>
<tr class="odd">
<td><strong>Transfers Functions</strong></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>Blind transfer</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
</tr>
<tr class="odd">
<td>Indirect transfer</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
</tr>
<tr class="even">
<td><strong>Forwards Functions</strong></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td>Disable all forwarding</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
</tr>
<tr class="even">
<td>Enable/Disable forwarding on no answer</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
</tr>
<tr class="odd">
<td>Enable/Disable forwarding on busy</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
</tr>
<tr class="even">
<td>Enable/Disable forwarding unconditional</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
</tr>
<tr class="odd">
<td><strong>Voicemail Functions</strong></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>Enable voicemail with supervision function</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
</tr>
<tr class="odd">
<td>Reach the voicemail</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>N</td>
<td>N</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
</tr>
<tr class="even">
<td>Delete messages from voicemail</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
</tr>
<tr class="odd">
<td><strong>Agent Functions</strong></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>Connect/Disconnect a static agent</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
</tr>
<tr class="odd">
<td>Connect a static agent</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
</tr>
<tr class="even">
<td>Disconnect a static agent</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
</tr>
<tr class="odd">
<td><strong>Parking Functions</strong></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>Parking</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
</tr>
<tr class="odd">
<td>Parking position</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
</tr>
<tr class="even">
<td><strong>Paging Functions</strong></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td>Paging</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
</tr>
</tbody>
</table>

#:warning: These phones can only be used in SCCP mode. They are limited to the
`features supported in Wazo's SCCP implementation <sccp-features>`.

<!-- ::: {#cisco-provisioning} -->
To install firmware for xivo-cisco-sccp plugins, you need to manually
download the firmware files from the Cisco website and save them in the
`/var/lib/wazo-provd/plugins/$plugin-name/var/cache` directory.

File permissions should be modified to make the files readable to
`wazo-provd`:

-   [chmod 640 <filename>]{.title-ref}
-   [chown wazo-provd:wazo-provd <filename>]{.title-ref}

This directory is created by Wazo when you install the plugin (i.e.
xivo-cisco-sccp-legacy). If you create the directory manually, the
installation will fail.

#:warning: Access to Cisco firmware updates requires a Cisco account with
sufficient privileges. The account requires paying for the service and
remains under the responsibility of the client or partner. The Wazo
authors is not responsible for these firmwares and does not offer any
updates.

For example, if you have installed the `xivo-cisco-sccp-legacy` plugin
and you want to install the `7940-7960-fw`, `networklocale` and
`userlocale_fr_FR` package, you must:

-   Go to <http://www.cisco.com>
-   Click on "Log In" in the top right corner of the page, and then
    log in
-   Click on the "Support" menu
-   Click on the "Downloads" tab, then on "Voice & Unified
    Communications"
-   Select "IP Telephony", then "Unified Communications Endpoints",
    then the model of your phone (in this example, the 7940G)
-   Click on "Skinny Client Control Protocol (SCCP) software"
-   Choose the same version as the one shown in the plugin
-   Download the file with an extension ending in ".zip", which is
    usually the last file in the list
-   In the Wazo web interface, you'll then be able to click on the
    "install" button for the firmware

The procedure is similar for the network locale and the user locale
package, but:

-   Instead of clicking on "Skinny Client Control Protocol (SCCP)
    software", click on "Unified Communications Manager Endpoints
    Locale Installer"
-   Click on "Linux"
-   Choose the same version of the one shown in the plugin
-   For the network locale, download the file named
    "po-locale-combined-network.cop.sgn"
-   For the user locale, download the file named
    "po-locale-$locale-name.cop.sgn, for example
    "po-locale-fr_FR.cop.sgn" for the "fr_FR" locale
-   Both files must be placed in
    `/var/lib/wazo-provd/plugins/$plugin-name/var/cache`{.interpreted-text
    role="file"} directory. Then install them in the Wazo Web Interface.

#:exclamation: Currently user and network locale 11.5.1 should be used for plugins
xivo-sccp-legacy and xivo-cisco-sccp-9.4

## Digium

  --------------------------------------------------------------------
                                               D40     D50     D70
  -------------------------------------------- ------- ------- -------
  Provisioning                                 Y       NYT     Y

  H-A                                          Y       NYT     Y

  Directory XIVO                               N       NYT     N

  Funckeys                                     2       14      106

  **Supported programmable keys**

  User with supervision function               N       NYT     N

  Group                                        Y       NYT     Y

  Queue                                        Y       NYT     Y

  Conference Room with supervision function    Y       NYT     Y

  **General Functions**

  Online call recording                        N       NYT     N

  Phone status                                 Y       NYT     Y

  Sound recording                              Y       NYT     Y

  Call recording                               Y       NYT     Y

  Incoming call filtering                      Y       NYT     Y

  Do not disturb                               HK      NYT     HK

  Group interception                           Y       NYT     Y

  Listen to online calls                       N       NYT     N

  Directory access                             N       NYT     N

  Filtering Boss - Secretary                   Y       NYT     Y

  **Transfers Functions**

  Blind transfer                               HK      NYT     HK

  Indirect transfer                            HK      NYT     HK

  **Forwards Functions**

  Disable all forwarding                       Y       NYT     Y

  Enable/Disable forwarding on no answer       Y       NYT     Y

  Enable/Disable forwarding on busy            Y       NYT     Y

  Enable/Disable forwarding unconditional      Y       NYT     Y

  **Voicemail Functions**

  Enable voicemail with supervision function   Y       NYT     Y

  Reach the voicemail                          HK      NYT     HK

  Delete messages from voicemail               Y       NYT     Y

  **Agent Functions**

  Connect/Disconnect a static agent            Y       NYT     Y

  Connect a static agent                       Y       NYT     Y

  Disconnect a static agent                    Y       NYT     Y

  **Parking Functions**

  Parking                                      N       NYT     N

  Parking position                             N       NYT     N

  **Paging Functions**

  Paging                                       Y       NYT     Y
  --------------------------------------------------------------------

#:exclamation: Some function keys are shared with line keys

Particularities:

-   For best results, activate `dhcp-integration`{.interpreted-text
    role="ref"} on your Wazo.
-   Impossible to do directed pickup using a BLF function key.
-   Only supports DTMF in RFC2833 mode.
-   Does not work reliably with Cisco ESW520 PoE switch. When connected
    to such a switch, the D40 tends to reboot randomly, and the D70 does
    not boot at all.
-   It's important to not edit the phone configuration via the phones'
    web interface when using these phones with Wazo.
-   Paging doesn't work.

## Fanvil

  Model   Tested[^22]   Fkeys[^23]   Wazo HA[^24]
  ------- ------------- ------------ --------------
  C62P    Yes           5            Yes

## Gigaset

Also known as Siemens.

  Model         Tested[^25]   Fkeys[^26]   Wazo HA[^27]
  ------------- ------------- ------------ --------------
  C470 IP       No            0            No
  C475 IP       No            0            No
  C590 IP       No            0            No
  C595 IP       No            0            No
  C610 IP       No            0            No
  C610A IP      No            0            No
  S675 IP       No            0            No
  S685 IP       No            0            No
  N300 IP       No            0            No
  N300A IP      No            0            No
  N510 IP PRO   No            0            No

## Jitsi

  Model   Tested[^28]   Fkeys[^29]   Wazo HA[^30]
  ------- ------------- ------------ --------------
  Jitsi   Yes           ---        No

## Mitel

The Mitel 6700 Series and 6800 Series SIP Phones are supported in Wazo.
See the [Aastra](#aastra) section.

## Patton

The following analog VoIP gateways are supported:

  --------------------------------------------------------------------------------------------
                                SN4112   SN4114   SN4116   SN4118   SN4316   SN4324   SN4332
  ----------------------------- -------- -------- -------- -------- -------- -------- --------
  Provisioning                  Y        Y        Y        Y        Y        Y        Y

  H-A                           Y        Y        Y        Y        Y        Y        Y
  --------------------------------------------------------------------------------------------

Wazo only supports configuring the FXS ports of these gateways. It does
not support configuring the FXO ports. If you have a gateway on which
you would like to configure the FXO ports, you'll need to write the FXO
ports configuration manually by creating a `custom template
<provd-custom-templates>`{.interpreted-text role="ref"} for your
gateway.

It's only possible to enter a provisioning code on the first FXS port
of a gateway. For example, if you have a gateway with 8 FXS ports, the
first port can be configured by dialing a provisioning code from it, but
ports 2 to 7 can only be configured via the Wazo web interface. Also, if
you dial the
`"reset to autoprov" extension <reset-to-autoprov-device>`{.interpreted-text
role="ref"} from any port, the configuration of all the ports will be
reset, not just the port on which the extension was dialed. These
limitations might go away in the future.

These gateways are configured with a few regional parameters (France by
default). These parameters are easy to change by writing a
`custom template <provd-custom-templates>`{.interpreted-text
role="ref"}.

Telnet access and web access are enabled by default. You should change
the default password by setting an administrator password via a Wazo
"template device".

By downloading and installing the Patton firmwares, you agree to the
[Patton Electronics Company
conditions](http://www.patton.com/legal/eula.asp).

To provision a gateway that was previously configured manually, use the
following commands on your gateway (configure mode), replacing WAZO_IP
by the IP address of your Wazo server:

    profile provisioning PF_PROVISIONING_CONFIG
      destination configuration
      location 1 http://WAZO_IP:8667/$(system.mac).cfg
      activation reload graceful
      exit
    provisioning execute PF_PROVISIONING_CONFIG

## Panasonic

Panasonic KX-HTXXX series:

+----------+-------------+------------+--------------+
| Model    | Tested[^31] | Fkeys[^32] | Wazo HA[^33] |
+==========+=============+============+==============+
| KX-HT113 | > No        | > ---      | > No         |
+----------+-------------+------------+--------------+
| KX-HT123 | > No        | > ---      | > No         |
+----------+-------------+------------+--------------+
| KX-HT133 | > No        | > ---      | > No         |
+----------+-------------+------------+--------------+
| KX-HT136 | > No        | > ---      | > No         |
+----------+-------------+------------+--------------+

#:exclamation: This phone is for testing for the moment

## Polycom

<table style="width:100%;">
<colgroup>
<col style="width: 21%" />
<col style="width: 4%" />
<col style="width: 4%" />
<col style="width: 4%" />
<col style="width: 4%" />
<col style="width: 4%" />
<col style="width: 4%" />
<col style="width: 5%" />
<col style="width: 5%" />
<col style="width: 5%" />
<col style="width: 4%" />
<col style="width: 4%" />
<col style="width: 4%" />
<col style="width: 4%" />
<col style="width: 4%" />
<col style="width: 4%" />
<col style="width: 4%" />
<col style="width: 4%" />
</colgroup>
<thead>
<tr class="header">
<th></th>
<th>**|SoundP</th>
<th>oint IP**</th>
<th></th>
<th></th>
<th></th>
<th></th>
<th>**|SoundSt</th>
<th>ation IP**</th>
<th></th>
<th>**|Busin</th>
<th>ess Media</th>
<th>Phone**</th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td></td>
<td>SPIP331</td>
<td>SPIP335</td>
<td>SPIP450</td>
<td>SPIP550</td>
<td>SPIP560</td>
<td>SPIP650</td>
<td>SPIP5000</td>
<td>SPIP6000</td>
<td>SPIP7000</td>
<td>VVX101</td>
<td>VVX201</td>
<td>VVX300</td>
<td>VVX310</td>
<td>VVX400</td>
<td>VVX410</td>
<td>VVX500</td>
<td>VVX600</td>
</tr>
<tr class="even">
<td>Provisioning</td>
<td>NT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NT</td>
<td>NT</td>
<td>NT</td>
<td>Y</td>
<td>NT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
</tr>
<tr class="odd">
<td>H-A</td>
<td>N</td>
<td>Y</td>
<td>N</td>
<td>Y</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>N</td>
</tr>
<tr class="even">
<td>Directory XIVO</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>FK</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>FK</td>
<td>FK</td>
<td>FK</td>
<td>FK</td>
<td>FK</td>
<td>N</td>
</tr>
<tr class="odd">
<td>Funckeys</td>
<td>N</td>
<td>0</td>
<td>2</td>
<td>3</td>
<td>3</td>
<td>47</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>6</td>
<td>6</td>
<td>12</td>
<td>12</td>
<td>12</td>
<td>0</td>
</tr>
<tr class="even">
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td><blockquote>
<p>**Sup</p>
</blockquote></td>
<td>ported pro</td>
<td>grammable k</td>
<td>eys**</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td>User with supervision function</td>
<td>NYT</td>
<td>N</td>
<td>NYT</td>
<td>Y</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
</tr>
<tr class="even">
<td>Group</td>
<td>NYT</td>
<td>N</td>
<td>NYT</td>
<td>Y</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
</tr>
<tr class="odd">
<td>Queue</td>
<td>NYT</td>
<td>N</td>
<td>NYT</td>
<td>Y</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
</tr>
<tr class="even">
<td>Conference Room with supervision function</td>
<td>NYT</td>
<td>N</td>
<td>NYT</td>
<td>Y</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
</tr>
<tr class="odd">
<td><strong>General Functions</strong></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>Online call recording</td>
<td>NYT</td>
<td>N</td>
<td>NYT</td>
<td>N</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>NYT</td>
</tr>
<tr class="odd">
<td>Phone status</td>
<td>NYT</td>
<td>N</td>
<td>NYT</td>
<td>Y</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
</tr>
<tr class="even">
<td>Sound recording</td>
<td>NYT</td>
<td>N</td>
<td>NYT</td>
<td>Y</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
</tr>
<tr class="odd">
<td>Call recording</td>
<td>NYT</td>
<td>N</td>
<td>NYT</td>
<td>Y</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
</tr>
<tr class="even">
<td>Incoming call filtering</td>
<td>NYT</td>
<td>N</td>
<td>NYT</td>
<td>Y</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
</tr>
<tr class="odd">
<td>Do not disturb</td>
<td>NYT</td>
<td>SK</td>
<td>NYT</td>
<td>HK</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>NYT</td>
</tr>
<tr class="even">
<td>Group interception</td>
<td>NYT</td>
<td>N</td>
<td>NYT</td>
<td>Y</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
</tr>
<tr class="odd">
<td>Listen to online calls</td>
<td>NYT</td>
<td>N</td>
<td>NYT</td>
<td>Y</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
</tr>
<tr class="even">
<td>Directory access</td>
<td>NYT</td>
<td>N</td>
<td>NYT</td>
<td>Y</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
</tr>
<tr class="odd">
<td>Filtering Boss - Secretary</td>
<td>NYT</td>
<td>N</td>
<td>NYT</td>
<td>Y</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
</tr>
<tr class="even">
<td><strong>Transfers Functions</strong></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td>Blind transfer</td>
<td>NYT</td>
<td>SK</td>
<td>NYT</td>
<td>N</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>SK</td>
<td>SK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>SK</td>
<td>NYT</td>
</tr>
<tr class="even">
<td>Indirect transfer</td>
<td>NYT</td>
<td>SK</td>
<td>NYT</td>
<td>HK</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>SK</td>
<td>SK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>SK</td>
<td>NYT</td>
</tr>
<tr class="odd">
<td><strong>Forwards Functions</strong></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>Disable all forwarding</td>
<td>NYT</td>
<td>N</td>
<td>NYT</td>
<td>Y</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
</tr>
<tr class="odd">
<td>Enable/Disable forwarding on no answer</td>
<td>NYT</td>
<td>SK</td>
<td>NYT</td>
<td>Y</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
</tr>
<tr class="even">
<td>Enable/Disable forwarding on busy</td>
<td>NYT</td>
<td>SK</td>
<td>NYT</td>
<td>Y</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
</tr>
<tr class="odd">
<td>Enable/Disable forwarding unconditional</td>
<td>NYT</td>
<td>SK</td>
<td>NYT</td>
<td>Y</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
</tr>
<tr class="even">
<td><strong>Voicemail Functions</strong></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td>Enable voicemail with supervision function</td>
<td>NYT</td>
<td>N</td>
<td>NYT</td>
<td>Y</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
</tr>
<tr class="even">
<td>Reach the voicemail</td>
<td>NYT</td>
<td>SK</td>
<td>NYT</td>
<td>HK</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>SK</td>
<td>SK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>SK</td>
<td>NYT</td>
</tr>
<tr class="odd">
<td>Delete messages from voicemail</td>
<td>NYT</td>
<td>N</td>
<td>NYT</td>
<td>Y</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
</tr>
<tr class="even">
<td><strong>Agent Functions</strong></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td>Connect/Disconnect a static agent</td>
<td>NYT</td>
<td>N</td>
<td>NYT</td>
<td>Y</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
</tr>
<tr class="even">
<td>Connect a static agent</td>
<td>NYT</td>
<td>N</td>
<td>NYT</td>
<td>Y</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
</tr>
<tr class="odd">
<td>Disconnect a static agent</td>
<td>NYT</td>
<td>N</td>
<td>NYT</td>
<td>Y</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
</tr>
<tr class="even">
<td><strong>Parking Functions</strong></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td>Parking</td>
<td>NYT</td>
<td>N</td>
<td>NYT</td>
<td>N</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
</tr>
<tr class="even">
<td>Parking position</td>
<td>NYT</td>
<td>N</td>
<td>NYT</td>
<td>N</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
</tr>
<tr class="odd">
<td><strong>Paging Functions</strong></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>Paging</td>
<td>NYT</td>
<td>N</td>
<td>NYT</td>
<td>Y</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
</tr>
</tbody>
</table>

Particularities:

-   The latest Polycom firmwares can take a lot of time to download and
    install due to their size (~650 MiB). For this reason, these files
    are explicitly excluded from the Wazo backups.
-   For directed call pickup to work via the BLF function keys, you need
    to make sure that the option `notifycid` is `yes` for `wazo-confd`
    endpoint `/asterisk/sip/general`

    Also, directed call pickup via a BLF function key will not work if
    the extension number of the supervised user is different from its
    caller ID number.

-   Default password is **9486** (i.e. the word "xivo" on a telephone
    keypad).
-   On the VVX101 and VVX201, to have the two line keys mapped to the
    same SIP line, create a
    `custom template <provd-custom-templates>`{.interpreted-text
    role="ref"} with the following content:

        {% extends 'base.tpl' -%}

        {% block remote_phonebook -%}
        {% endblock -%}

        {% block model_specific_parameters -%}
        reg.1.lineKeys="2"
        {% endblock -%}

    This is especially useful on the VVX101 since it supports a maximum
    of 1 SIP line and does not support function keys.

#:exclamation: (Wazo HA cluster) BLF function key saved on the master node are not
available.

Supported expansion modules:

-   Polycom® VVX Color Expansion (for Polycom® VVX
    300/310/400/410/500/600)
-   Polycom® VVX Paper Expansion (for Polycom® VVX
    300/310/400/410/500/600)
-   Polycom® SoundPoint IP Backlit (for Polycom® SoundPoint 650)

#:warning: Polycom® VVX® Camera are not supported.

  Model     Tested[^34]   Fkeys[^35]   Wazo HA[^36]
  --------- ------------- ------------ --------------
  SPIP320   No            0            No
  SPIP321   No            0            No
  SPIP330   No            0            No
  SPIP430   No            0            No
  SPIP501   Yes           0            No
  SPIP600   No            0            No
  SPIP601   No            0            No
  SPIP670   No            47           No

SoundStation IP:

  Model      Tested[^37]   Fkeys[^38]   Wazo HA[^39]
  ---------- ------------- ------------ --------------
  SPIP4000   No            0            No

Others:

  Model     Tested[^40]   Fkeys[^41]   Wazo HA[^42]
  --------- ------------- ------------ --------------
  VVX1500   No            0            No

## Snom

  Model   Tested[^43]   Fkeys[^44]   Wazo HA[^45]
  ------- ------------- ------------ --------------
  300     No            6            Yes
  320     Yes           12           Yes
  360     No            ---        Yes
  820     Yes           4            Yes
  MP      No            ---        Yes
  PA1     No            0            Yes

#:warning: If you are using Snom phones with HA, you should not assign multiple
lines to the same device.

There's a known issue with the provisioning of Snom phones in Wazo:

-   After a factory reset of a phone, if no language and timezone are
    set for the "default config device" (`/provd/cfg_mgr/configs`),
    you will be forced to select a default language and timezone on the
    phone UI.

<table>
<colgroup>
<col style="width: 36%" />
<col style="width: 7%" />
<col style="width: 6%" />
<col style="width: 6%" />
<col style="width: 6%" />
<col style="width: 6%" />
<col style="width: 5%" />
<col style="width: 5%" />
<col style="width: 5%" />
<col style="width: 6%" />
<col style="width: 6%" />
</colgroup>
<thead>
<tr class="header">
<th></th>
<th>370</th>
<th>710</th>
<th>715</th>
<th>720</th>
<th>D725</th>
<th>D745</th>
<th>760</th>
<th>D765</th>
<th>821</th>
<th>870</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Provisioning</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="even">
<td>H-A</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="odd">
<td>Directory XIVO</td>
<td>HK</td>
<td>SK</td>
<td>SK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
</tr>
<tr class="even">
<td>Funckeys</td>
<td>12</td>
<td>5</td>
<td>5</td>
<td>18</td>
<td>18</td>
<td>32</td>
<td>16</td>
<td>16</td>
<td>12</td>
<td>15</td>
</tr>
<tr class="odd">
<td></td>
<td><blockquote>
<p>**S</p>
</blockquote></td>
<td>upported</td>
<td>program</td>
<td>mable ke</td>
<td>ys**</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>User with supervision function</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="odd">
<td>Group</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="even">
<td>Queue</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="odd">
<td>Conference Room with supervision function</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="even">
<td><strong>General Functions</strong></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td>Online call recording</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
</tr>
<tr class="even">
<td>Phone status</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="odd">
<td>Sound recording</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="even">
<td>Call recording</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="odd">
<td>Incoming call filtering</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="even">
<td>Do not disturb</td>
<td>HK</td>
<td>SK</td>
<td>SK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
</tr>
<tr class="odd">
<td>Group interception</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="even">
<td>Listen to online calls</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="odd">
<td>Directory access</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="even">
<td>Filtering Boss - Secretary</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="odd">
<td><strong>Transfers Functions</strong></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>Blind transfer</td>
<td>Y</td>
<td>SK</td>
<td>SK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
</tr>
<tr class="odd">
<td>Indirect transfer</td>
<td>Y</td>
<td>SK</td>
<td>SK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
</tr>
<tr class="even">
<td><strong>Forwards Functions</strong></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td>Disable all forwarding</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="even">
<td>Enable/Disable forwarding on no answer</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="odd">
<td>Enable/Disable forwarding on busy</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="even">
<td>Enable/Disable forwarding unconditional</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="odd">
<td><strong>Voicemail Functions</strong></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>Enable voicemail with supervision function</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="odd">
<td>Reach the voicemail</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
</tr>
<tr class="even">
<td>Delete messages from voicemail</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="odd">
<td><strong>Agent Functions</strong></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>Connect/Disconnect a static agent</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="odd">
<td>Connect a static agent</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="even">
<td>Disconnect a static agent</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="odd">
<td><strong>Parking Functions</strong></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>Parking</td>
<td>Y</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="odd">
<td>Parking position</td>
<td>Y</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="even">
<td><strong>Paging Functions</strong></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td>Paging</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
</tr>
</tbody>
</table>

Supported expansion modules:

-   Snom® Vision (for Snom® 7xx series and Snom® 8xx series)
-   Snom® D7 (for Snom® 7xx series)

#:exclamation: For some models, function keys are shared with line keys

There's the following known limitations/issues with the provisioning of
Snom phones in Wazo:

-   If you are using Snom phones with
    `HA <high-availability>`{.interpreted-text role="ref"}, you should
    not assign multiple lines to the same device.
-   The Snom D745 has limited space for function key labels: long labels
    might be split in a suboptimal way.
-   When using a D7 expansion module, the function key label will not be
    shown on the first reboot or resynchronization. You'll need to
    reboot or resynchronize the phone a second time for the label to be
    shown properly.
-   After a factory reset of a phone, if no language and timezone are
    set for the "default config device", you will be forced to select
    a default language and timezone on the phone UI.

## Technicolor

Previously known as Thomson:

  Model    Tested[^46]   Fkeys[^47]   Wazo HA[^48]
  -------- ------------- ------------ --------------
  ST2022   No            ---        ---
  ST2030   Yes           10           Yes

#:exclamation: Function keys are shared with line keys

## Yealink

<table style="width:100%;">
<colgroup>
<col style="width: 27%" />
<col style="width: 4%" />
<col style="width: 6%" />
<col style="width: 4%" />
<col style="width: 4%" />
<col style="width: 6%" />
<col style="width: 4%" />
<col style="width: 4%" />
<col style="width: 4%" />
<col style="width: 6%" />
<col style="width: 4%" />
<col style="width: 4%" />
<col style="width: 4%" />
<col style="width: 4%" />
<col style="width: 4%" />
<col style="width: 4%" />
<col style="width: 4%" />
</colgroup>
<thead>
<tr class="header">
<th></th>
<th>T19P</th>
<th>T19P E2</th>
<th>T20P</th>
<th>T21P</th>
<th>T21P E2</th>
<th>T22P</th>
<th>T26P</th>
<th>T28P</th>
<th>T32G</th>
<th>T38G</th>
<th>T40P</th>
<th>T41P</th>
<th>T42G</th>
<th>T46G</th>
<th>T48G</th>
<th>W52P</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Provisioning</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="even">
<td>H-A</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="odd">
<td>Directory XIVO</td>
<td>N</td>
<td>Y</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
</tr>
<tr class="even">
<td>Funckeys</td>
<td>0</td>
<td>0</td>
<td>2</td>
<td>2</td>
<td>2</td>
<td>3</td>
<td>13</td>
<td>16</td>
<td>3</td>
<td>16</td>
<td>3</td>
<td>15</td>
<td>15</td>
<td>27</td>
<td>27</td>
<td>0</td>
</tr>
<tr class="odd">
<td></td>
<td></td>
<td><blockquote>
<p>**Supp</p>
</blockquote></td>
<td>orted p</td>
<td>rogramm</td>
<td>able keys*</td>
<td><ul>
<li></li>
</ul></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>User with supervision function</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>N</td>
</tr>
<tr class="odd">
<td>Group</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>N</td>
</tr>
<tr class="even">
<td>Queue</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>N</td>
</tr>
<tr class="odd">
<td>Conference Room with supervision function</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>N</td>
</tr>
<tr class="even">
<td><strong>General Functions</strong></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td>Online call recording</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>NYT</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
<td>N</td>
</tr>
<tr class="even">
<td>Phone status</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>N</td>
</tr>
<tr class="odd">
<td>Sound recording</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>N</td>
</tr>
<tr class="even">
<td>Call recording</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>N</td>
</tr>
<tr class="odd">
<td>Incoming call filtering</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>N</td>
</tr>
<tr class="even">
<td>Do not disturb</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>NYT</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>N</td>
</tr>
<tr class="odd">
<td>Group interception</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>N</td>
</tr>
<tr class="even">
<td>Listen to online calls</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>N</td>
</tr>
<tr class="odd">
<td>Directory access</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>N</td>
</tr>
<tr class="even">
<td>Filtering Boss - Secretary</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>N</td>
</tr>
<tr class="odd">
<td><strong>Transfers Functions</strong></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>Blind transfer</td>
<td>SK</td>
<td>SK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>NYT</td>
<td>HK</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>HK</td>
<td>HK</td>
<td>SK</td>
</tr>
<tr class="odd">
<td>Indirect transfer</td>
<td>SK</td>
<td>SK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>NYT</td>
<td>HK</td>
<td>SK</td>
<td>SK</td>
<td>SK</td>
<td>HK</td>
<td>HK</td>
<td>SK</td>
</tr>
<tr class="even">
<td><strong>Forwards Functions</strong></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td>Disable all forwarding</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>N</td>
</tr>
<tr class="even">
<td>Enable/Disable forwarding on no answer</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>N</td>
</tr>
<tr class="odd">
<td>Enable/Disable forwarding on busy</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>N</td>
</tr>
<tr class="even">
<td>Enable/Disable forwarding unconditional</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>N</td>
</tr>
<tr class="odd">
<td><strong>Voicemail Functions</strong></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>Enable voicemail with supervision function</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>N</td>
</tr>
<tr class="odd">
<td>Reach the voicemail</td>
<td>N</td>
<td>N</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>NYT</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
<td>HK</td>
</tr>
<tr class="even">
<td>Delete messages from voicemail</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>N</td>
</tr>
<tr class="odd">
<td><strong>Agent Functions</strong></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>Connect/Disconnect a static agent</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>N</td>
</tr>
<tr class="odd">
<td>Connect a static agent</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>N</td>
</tr>
<tr class="even">
<td>Disconnect a static agent</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>N</td>
</tr>
<tr class="odd">
<td><strong>Parking Functions</strong></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="even">
<td>Parking</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>N</td>
</tr>
<tr class="odd">
<td>Parking position</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>N</td>
</tr>
<tr class="even">
<td><strong>Paging Functions</strong></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr class="odd">
<td>Paging</td>
<td>N</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>NYT</td>
<td>N</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>Y</td>
<td>N</td>
</tr>
</tbody>
</table>

Regarding the W52P (DECT), there is firmware for both the base station
and the handset. The base and the handset are [probably going to work if
they are not using the same firmware
version](http://forum.yealink.com/forum/showthread.php?tid=2489),
although this does not seem to be officially recommended. By default, a
base station will try to upgrade the firmware of an handset over the air
(OTA) if the following conditions are met:

-   Handset with firmware 26.40.0.15 or later
-   Base station with firmware 25.40.0.15 or later
-   Handset with hardware 26.0.0.6 or later

Otherwise, you'll have to manually upgrade the handset firmware via
USB.

In all cases, you should consult the Yealink documentation on [Upgrading
W52x Handset
Firmware](http://www.yealink.com/Upload/W52P/2013124/Upgrading%20W52x%20Handset%20Firmware.zip).

#:exclamation: Some function keys are shared with line keys

Supported expansion modules:

-   Yealink® EXP38 (for Yealink® T26P/T28P)
-   Yealink® EXP39 (for Yealink® T26P/T28P)
-   Yealink® EXP40 (for Yealink® T46G/T48G)

  Model   Tested[^49]   Fkeys[^50]   Wazo HA[^51]   Plugin
  ------- ------------- ------------ -------------- ------------------
  CP860   No            0            ---          xivo-yealink-v72
  T23P    No            3            ---          xivo-yealink-v80
  T23G    Yes           3            Yes            xivo-yealink-v80
  T27P    Yes           21           Yes            xivo-yealink-v80
  T29G    No            27           ---          xivo-yealink-v80
  T49G    Yes           29           Yes            xivo-yealink-v80

#:exclamation: Some function keys are shared with line keys

## Zenitel

  Model        Tested[^52]   Fkeys[^53]   Wazo HA[^54]
  ------------ ------------- ------------ --------------
  IP station   Yes           1            No

[^1]: `Tested` means the device has been tested by the Wazo development
    team and that the developers have access to this device.

[^2]: `Fkeys` is the number of programmable function keys that you can
    configure from the Wazo web interface. It is not necessarily the
    same as the number of physical function keys the device has (for
    example, a 6757i has 12 physical keys but you can configure 30
    function keys because of the page system).

[^3]: `Wazo HA` means the device is confirmed to work with
    `Wazo HA <high-availability>`{.interpreted-text role="ref"}.

[^4]: `Tested` means the device has been tested by the Wazo development
    team and that the developers have access to this device.

[^5]: `Fkeys` is the number of programmable function keys that you can
    configure from the Wazo web interface. It is not necessarily the
    same as the number of physical function keys the device has (for
    example, a 6757i has 12 physical keys but you can configure 30
    function keys because of the page system).

[^6]: `Wazo HA` means the device is confirmed to work with
    `Wazo HA <high-availability>`{.interpreted-text role="ref"}.

[^7]: `Tested` means the device has been tested by the Wazo development
    team and that the developers have access to this device.

[^8]: `Fkeys` is the number of programmable function keys that you can
    configure from the Wazo web interface. It is not necessarily the
    same as the number of physical function keys the device has (for
    example, a 6757i has 12 physical keys but you can configure 30
    function keys because of the page system).

[^9]: `Wazo HA` means the device is confirmed to work with
    `Wazo HA <high-availability>`{.interpreted-text role="ref"}.

[^10]: `Tested` means the device has been tested by the Wazo development
    team and that the developers have access to this device.

[^11]: `Fkeys` is the number of programmable function keys that you can
    configure from the Wazo web interface. It is not necessarily the
    same as the number of physical function keys the device has (for
    example, a 6757i has 12 physical keys but you can configure 30
    function keys because of the page system).

[^12]: `Wazo HA` means the device is confirmed to work with
    `Wazo HA <high-availability>`{.interpreted-text role="ref"}.

[^13]: `Tested` means the device has been tested by the Wazo development
    team and that the developers have access to this device.

[^14]: `Fkeys` is the number of programmable function keys that you can
    configure from the Wazo web interface. It is not necessarily the
    same as the number of physical function keys the device has (for
    example, a 6757i has 12 physical keys but you can configure 30
    function keys because of the page system).

[^15]: `Wazo HA` means the device is confirmed to work with
    `Wazo HA <high-availability>`{.interpreted-text role="ref"}.

[^16]: `Tested` means the device has been tested by the Wazo development
    team and that the developers have access to this device.

[^17]: `Fkeys` is the number of programmable function keys that you can
    configure from the Wazo web interface. It is not necessarily the
    same as the number of physical function keys the device has (for
    example, a 6757i has 12 physical keys but you can configure 30
    function keys because of the page system).

[^18]: `Wazo HA` means the device is confirmed to work with
    `Wazo HA <high-availability>`{.interpreted-text role="ref"}.

[^19]: `Tested` means the device has been tested by the Wazo development
    team and that the developers have access to this device.

[^20]: `Fkeys` is the number of programmable function keys that you can
    configure from the Wazo web interface. It is not necessarily the
    same as the number of physical function keys the device has (for
    example, a 6757i has 12 physical keys but you can configure 30
    function keys because of the page system).

[^21]: `Wazo HA` means the device is confirmed to work with
    `Wazo HA <high-availability>`{.interpreted-text role="ref"}.

[^22]: `Tested` means the device has been tested by the Wazo development
    team and that the developers have access to this device.

[^23]: `Fkeys` is the number of programmable function keys that you can
    configure from the Wazo web interface. It is not necessarily the
    same as the number of physical function keys the device has (for
    example, a 6757i has 12 physical keys but you can configure 30
    function keys because of the page system).

[^24]: `Wazo HA` means the device is confirmed to work with
    `Wazo HA <high-availability>`{.interpreted-text role="ref"}.

[^25]: `Tested` means the device has been tested by the Wazo development
    team and that the developers have access to this device.

[^26]: `Fkeys` is the number of programmable function keys that you can
    configure from the Wazo web interface. It is not necessarily the
    same as the number of physical function keys the device has (for
    example, a 6757i has 12 physical keys but you can configure 30
    function keys because of the page system).

[^27]: `Wazo HA` means the device is confirmed to work with
    `Wazo HA <high-availability>`{.interpreted-text role="ref"}.

[^28]: `Tested` means the device has been tested by the Wazo development
    team and that the developers have access to this device.

[^29]: `Fkeys` is the number of programmable function keys that you can
    configure from the Wazo web interface. It is not necessarily the
    same as the number of physical function keys the device has (for
    example, a 6757i has 12 physical keys but you can configure 30
    function keys because of the page system).

[^30]: `Wazo HA` means the device is confirmed to work with
    `Wazo HA <high-availability>`{.interpreted-text role="ref"}.

[^31]: `Tested` means the device has been tested by the Wazo development
    team and that the developers have access to this device.

[^32]: `Fkeys` is the number of programmable function keys that you can
    configure from the Wazo web interface. It is not necessarily the
    same as the number of physical function keys the device has (for
    example, a 6757i has 12 physical keys but you can configure 30
    function keys because of the page system).

[^33]: `Wazo HA` means the device is confirmed to work with
    `Wazo HA <high-availability>`{.interpreted-text role="ref"}.

[^34]: `Tested` means the device has been tested by the Wazo development
    team and that the developers have access to this device.

[^35]: `Fkeys` is the number of programmable function keys that you can
    configure from the Wazo web interface. It is not necessarily the
    same as the number of physical function keys the device has (for
    example, a 6757i has 12 physical keys but you can configure 30
    function keys because of the page system).

[^36]: `Wazo HA` means the device is confirmed to work with
    `Wazo HA <high-availability>`{.interpreted-text role="ref"}.

[^37]: `Tested` means the device has been tested by the Wazo development
    team and that the developers have access to this device.

[^38]: `Fkeys` is the number of programmable function keys that you can
    configure from the Wazo web interface. It is not necessarily the
    same as the number of physical function keys the device has (for
    example, a 6757i has 12 physical keys but you can configure 30
    function keys because of the page system).

[^39]: `Wazo HA` means the device is confirmed to work with
    `Wazo HA <high-availability>`{.interpreted-text role="ref"}.

[^40]: `Tested` means the device has been tested by the Wazo development
    team and that the developers have access to this device.

[^41]: `Fkeys` is the number of programmable function keys that you can
    configure from the Wazo web interface. It is not necessarily the
    same as the number of physical function keys the device has (for
    example, a 6757i has 12 physical keys but you can configure 30
    function keys because of the page system).

[^42]: `Wazo HA` means the device is confirmed to work with
    `Wazo HA <high-availability>`{.interpreted-text role="ref"}.

[^43]: `Tested` means the device has been tested by the Wazo development
    team and that the developers have access to this device.

[^44]: `Fkeys` is the number of programmable function keys that you can
    configure from the Wazo web interface. It is not necessarily the
    same as the number of physical function keys the device has (for
    example, a 6757i has 12 physical keys but you can configure 30
    function keys because of the page system).

[^45]: `Wazo HA` means the device is confirmed to work with
    `Wazo HA <high-availability>`{.interpreted-text role="ref"}.

[^46]: `Tested` means the device has been tested by the Wazo development
    team and that the developers have access to this device.

[^47]: `Fkeys` is the number of programmable function keys that you can
    configure from the Wazo web interface. It is not necessarily the
    same as the number of physical function keys the device has (for
    example, a 6757i has 12 physical keys but you can configure 30
    function keys because of the page system).

[^48]: `Wazo HA` means the device is confirmed to work with
    `Wazo HA <high-availability>`{.interpreted-text role="ref"}.

[^49]: `Tested` means the device has been tested by the Wazo development
    team and that the developers have access to this device.

[^50]: `Fkeys` is the number of programmable function keys that you can
    configure from the Wazo web interface. It is not necessarily the
    same as the number of physical function keys the device has (for
    example, a 6757i has 12 physical keys but you can configure 30
    function keys because of the page system).

[^51]: `Wazo HA` means the device is confirmed to work with
    `Wazo HA <high-availability>`{.interpreted-text role="ref"}.

[^52]: `Tested` means the device has been tested by the Wazo development
    team and that the developers have access to this device.

[^53]: `Fkeys` is the number of programmable function keys that you can
    configure from the Wazo web interface. It is not necessarily the
    same as the number of physical function keys the device has (for
    example, a 6757i has 12 physical keys but you can configure 30
    function keys because of the page system).

[^54]: `Wazo HA` means the device is confirmed to work with
    `Wazo HA <high-availability>`{.interpreted-text role="ref"}.
