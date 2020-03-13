---
title: Archived Upgrade Notes
---

## 2017

### 17.17

-   The default NAT option has changed from `no` to `auto_force_rport`.
    This makes NAT configuration easier but has no impact on
    environments without NAT.
    -   In the rare cases where you want to keep `nat=no` you must
        explicitly change this value in the administation interface
        `Services --> IPBX --> General Settings --> SIP Protocol`{.interpreted-text
        role="menuselection"} in tab [Default]{.title-ref}. See
        [Asterisk sip.conf
        sample](https://github.com/asterisk/asterisk/blob/15.1.1/configs/samples/sip.conf.sample#L869)
        for more informations.
-   The `sources` section of the `xivo-dird` service configuration has
    been changed to be a key-value setting.

    -   If you have configured directories manually in `/etc/xivo-dird`
        you should update your manual configuration:

    ``` {.sourceCode .yaml}
    services:
      lookup:
        default:
          sources:
            - source_one
            - source_two
          timeout: 2
    ```

    ``` {.sourceCode .yaml}
    services:
      lookup:
        default:
          sources:
            source_one: true
            source_two: true
          timeout: 2
    ```

-   The `enabled_plugins` section of the `xivo-confd` service
    configuration has been changed. If you have configured enabled
    plugins manually you should update your manual configuration

    -   This section is now a key-value setting.
    -   All plugins have been renamed without the suffix `_plugins`.

    ``` {.sourceCode .yaml}
    enabled_plugins:
      - user_plugin
      - conference_plugin
    ```

    ``` {.sourceCode .yaml}
    enabled_plugins:
      user: true
      conference: true
    ```

-   There is a new `channelvars` option in
    `/etc/asterisk/manager.d/99-general.conf`. If you have manually
    configured `channelvars` already, you will have to manually merge
    the Wazo version with your version for them to work together.

### 17.16

-   You must update the Wazo Client to 17.16.
-   The *enabled_plugins* section of the `wazo-auth` service has been
    renamed *enabled_backend_plugins* and is now a dictionary.
    -   If you have hand made configuration to modify the list of
        enabled backends it should be modified see
        `/etc/wazo-auth/config.yml`
-   The *ldap_user* backend in `wazo-auth` is now disabled in the base
    configuration file.
    -   If you are using the `ldap_user` authentication backend a file
        with the following content should be added to
        `/etc/wazo-auth/conf.d`

        ``` {.sourceCode .yaml}
        enabled_backend_plugins:
          ldap_user: true
        ```

-   The *enabled_plugins* section of the `xivo-dird` service is now a
    dictionary.
    -   If you have hand made configuration to modify the list of
        enabled plugins, it should be modified see
        `/etc/xivo-dird/config.yml`
-   wazo-admin-ui has been upgraded to python3. All plugins by [Wazo
    Team]{.title-ref} has been migrated, but if you have installed a
    non-official/custom plugin that add something to the new interface,
    it probably broken. To fix this, you must convert your plugin to
    python3 or wait an available upgrade from the maintainer.
-   If you have setup a custom X.509 certificate for HTTPS (e.g. from
    Let's Encrypt), you have to update your config in
    `/etc/xivo/custom/custom-certificate.yml`, according to the `updated
    documentation <https_certificate>`{.interpreted-text role="ref"},
    namely for the config regarding `websocketd`.

### 17.15

-   `xivo-call-logd` has been renamed `wazo-call-logd`
    -   The custom configuration has been moved to
        `/etc/wazo-call-logd/conf.d/`.
    -   The log file has been renamed to `wazo-call-logd.log`.
    -   The NGINX proxy has been recreated in
        `/etc/nginx/locations/https-enabled/wazo-call-logd`
-   `Asterisk` has been upgraded to version 15.0.0
    -   If you have installed asterisk modules manually, you will have
        to install the asterisk 15 version, otherwise Asterisk will
        crash when starting.

Consult the [17.15
Roadmap](https://projects.wazo.community/versions/268) for more
information.

### 17.14

-   `xivo-auth` has been renamed `wazo-auth`
    -   If you have developed a `xivo-auth` authentication backend the
        name of the entry point has changed to `wazo_auth.backends`. You
        should make this modification in your plugin's `setup.py` file
        in the `entry_point` section.
    -   If your custom development use service discovery to find
        `xivo-auth`, you will have to search for the `wazo-auth` service
        instead of `xivo-auth`.
-   We released a new version of the CTI client, rebranded as [Wazo
    Client 17.14.1]{.title-ref}. It is compatible with all previous
    versions of Wazo (i.e. not before 16.16).

Consult the [17.14
Roadmap](https://projects.wazo.community/versions/267) for more
information.

### 17.13

Consult the [17.13
Roadmap](https://projects.wazo.community/versions/266) for more
information.

### 17.12

-   Wazo has a new database named `mongooseim`. The
    `backup-restore procedure<backup>`{.interpreted-text role="ref"} has
    been updated to include this new database.

Consult the [17.12
Roadmap](https://projects.wazo.community/versions/265) for more
information.

### 17.11

-   wazo-plugind REST API version `0.1` has been deprecated and will be
    removed in Wazo `18.02`. See changelog for version
    `rest-api_changelog`{.interpreted-text role="ref"}

Consult the [17.11
Roadmap](https://projects.wazo.community/versions/263) for more
information.

### 17.10

Consult the [17.10
Roadmap](https://projects.wazo.community/versions/262) for more
information.

### 17.09

-   Codecs can now be customized in the
    [/etc/asterisk/codecs.d/]{.title-ref} directory. If you had custom
    configuration in [/etc/asterisk/codecs.conf]{.title-ref} you will
    have to create a new file in [codecs.d]{.title-ref} to use your
    customized configuration. A file named
    [codecs.conf.dpkg-old]{.title-ref} will be left in
    [/etc/asterisk]{.title-ref} if this operation is required.
-   Provd plugins from the addons repository have been merged into the
    main plugin repository. If you were using the addons repository you
    can safely switch back to the stable repository. See
    `alternative-plugins-repo`{.interpreted-text role="ref"} for more
    details.
-   The command `xivo-call-logs` has been deprecated in favor of
    `wazo-call-logs`.
-   The command `xivo-service` has been deprecated in favor of
    `wazo-service`.
-   If you have a
    `custom certificate configured<https_certificate>`{.interpreted-text
    role="ref"}, you will need to add a new symlink for the new daemon
    wazo-webhookd:

        ln -s "/etc/xivo/custom/custom-certificate.yml" "/etc/wazo-webhookd/conf.d/010-custom-certificate.yml"

Consult the [17.09
Roadmap](https://projects.wazo.community/versions/261) for more
information.

### 17.08

-   The call logs has been improved by adding `date_end` and
    `date_answer` informations. If you want to add these new
    informations to the old call logs, you need to regenerate them. For
    example, to regenerate the last month of call logs:

        xivo-call-logs delete -d 30
        xivo-call-logs generate -d 30

    This is only useful if you plan to use the call logs REST API to
    read calls that have been placed before the upgrade.

-   If you have setup a custom X.509 certificate for HTTPS (e.g. from
    Let's Encrypt), you have to update your config in
    `/etc/xivo/custom/custom-certificate.yml`, according to the `updated
    documentation <https_certificate>`{.interpreted-text role="ref"},
    namely for the config regarding `plugind`.

Consult the [17.08
Roadmap](https://projects.wazo.community/versions/260) for more
information.

### 17.07

Consult the [17.07
Roadmap](https://projects.wazo.community/versions/259) for more
information.

### 17.06

-   Upgrade from version older than 13.01 are not supported anymore.

Consult the [17.06
Roadmap](https://projects.wazo.community/versions/258) for more
information.

### 17.05

-   [python-flask-cors]{.title-ref} has been updated from 1.10.3 to
    3.0.2. Configuration files with custom [allow_headers]{.title-ref}
    will have to be updated to the new syntax. The following command can
    be used to see if you have a configuration file which needs to be
    updated.

    ``` {.sourceCode .sh}
    for f in $(find /etc/*/conf.d -name '*.yml'); do grep -H allow_headers $f; done
    ```

    The old config in `/etc/xivo-*/conf.d` looked like:

        rest_api:
          cors:
            allow_headers: Content-Type, X-Auth-Token

    The new config in `/etc/xivo-*/conf.d` looks like:

        rest_api:
          cors:
            allow_headers: ["Content-Type", "X-Auth-Token"]

    See also the reference ticket
    [#6617](https://projects.wazo.community/issues/6617).

Consult the [17.05
Roadmap](https://projects.wazo.community/versions/257) for more
information.

### 17.04

Consult the [17.04
Roadmap](https://projects.wazo.community/versions/256) for more
information.

### 17.03

Consult the [17.03
Roadmap](https://projects.wazo.community/versions/255) for more
information.

### 17.02

-   A few more services are now available by default on port TCP/443
    (the complete list is documented in the `nginx`{.interpreted-text
    role="ref"} section). This does not pose any additional security
    risk by default, but if you have extra strict requirements about
    security, they can be manually disabled.

Consult the [17.02
Roadmap](https://projects.wazo.community/versions/254) for more
information.

### 17.01

Consult the [17.01
Roadmap](https://projects.wazo.community/versions/253) for more
information.

## 2016

### 16.16

Wazo 16.16 is the *first public release* of the project under the Wazo
name. It is also the first release of Wazo under the "phoenix"
codename.

-   A `special procedure <xivo-to-wazo>`{.interpreted-text role="ref"}
    is required to upgrade from XiVO to Wazo.
-   Asterisk has been upgraded from version 13.11.2 to 14.2.1, which is
    a major Asterisk upgrade.
-   If you are using [custom sheets]{.title-ref} that are stored
    locally, they *must* now be readable by the system user `xivo-ctid`.
    Make sure that this user has read access to the UI file of your
    custom sheets.
-   Switchboard statistics have been removed. The existing statistics
    data remain in the database for later migration but no more
    statistics will be collected.
-   The `conference` destination type in incalls REST API has been
    renamed to `meetme`.
-   The phonebook has been migrated from the web interface to xivo-dird.
    The phonebook contacts from the web interface have been moved to new
    dird-phonebooks. For users with many entities on the same Wazo, this
    will create one phonebook for each entity. The configuration has
    been updated to keep the previous behavior. No manual actions are
    required for installations with only one entity or if one phonebook
    by entity is the desired configuration. If only one phonebook is
    desired for all entities, some of the duplicate phonebooks can be
    deleted from the web interface and their matching configuration can
    also be removed.
    -   The list of phonebooks can be modified in
        `Services --> IPBX --> IPBX services --> Phonebook`{.interpreted-text
        role="menuselection"}
    -   The list of phonebooks sources can be modified in:
        -   `Configuration --> Management --> Directories`{.interpreted-text
            role="menuselection"}
        -   `Services --> CTI Server --> Directories --> Definitions`{.interpreted-text
            role="menuselection"}
    -   The selected phonebooks for reverse lookups can be modified in
        `Services --> CTI Server --> Directories --> Reverse directories`{.interpreted-text
        role="menuselection"}
    -   Direct directories can be modified in
        `Services --> CTI Server --> Directories --> Direct directories`{.interpreted-text
        role="menuselection"}

Please consult the following detailed upgrade notes for more
information:

- [XiVO to Wazo Upgrade Notes](/uc-doc/upgrade/16.16/xivo_to_wazo)
- [Asterisk 13 to 14 Upgrade Notes](/upgrade/16.16/asterisk_14/16.16/asterisk_14)

Consult the [16.16
Roadmap](https://projects.wazo.community/versions/252) for more
information.

### 16.13

XiVO 16.13 is the *last public release* of the project under the name
XiVO.

-   Previously, a user's `DND (Do Not Distrub)`{.interpreted-text
    role="abbr"} was effective only if this user had DND enabled *and*
    the DND extension (*25 by default) was also enabled. Said
    differently, disabling the DND extension meant that no user could
    effectively be in DND. Starting from XiVO 16.13, a user's DND is
    effective regardless of the state of the DND extension. The
    following features are impacted in the same way: call recording,
    incoming call filtering, forward on non-answer, forward on busy and
    unconditional forward.
-   If you have manually added nginx configuration files to the
    `/etc/nginx/locations/http`{.interpreted-text role="file"}
    directory, you'll need to move these files to
    `/etc/nginx/locations/http-available`{.interpreted-text role="file"}
    and then create symlinks to them in the
    `/etc/nginx/locations/http-enabled`{.interpreted-text role="file"}
    directory. This also applies to the https directory. See
    `nginx`{.interpreted-text role="ref"}.
-   A regression has been introduced in the switchboard statistics. See
    [issue 6443](http://projects.wazo.community/issues/6443).

Consult the [16.13
Roadmap](https://projects.wazo.community/versions/249) for more
information.

### 16.12

Consult the [16.12
Roadmap](https://projects.wazo.community/versions/248) for more
information.

### 16.11

-   Fax reception: the "log" backend type has been removed. You should
    remove references to it in your
    `/etc/xivo/asterisk/xivo_fax.conf`{.interpreted-text role="file"} if
    you were using it. Now, every time a fax is processed, a log line is
    added to `/var/log/xivo-agid.log`{.interpreted-text role="file"}.

Consult the [16.11
Roadmap](https://projects.wazo.community/versions/247) for more
information.

### 16.10

-   The config file `/etc/xivo/xivo-confgend.conf` has been replaced
    with `/etc/xivo-confgend/config.yml` and
    `/etc/xivo-confgend/conf.d`. Custom modifications to this file are
    not migrated automatically, so manual intervention is required to
    migrate custom values to the `conf.d` directory. The file
    `/etc/xivo/xivo-confgend/asterisk/contexts.conf` has been moved to
    `/etc/xivo-confgend/templates/contexts.conf`, but custom
    modification are left untouched. See also
    `configuration-files`{.interpreted-text role="ref"} for more details
    about configuration files in XiVO.

Consult the [16.10
Roadmap](https://projects.wazo.community/versions/246) for more
information.

### 16.09

-   The Wazo Client now uses xivo-ctid-ng to do transfers. Those new
    transfers cannot be cancelled with the `*0` DTMF sequence and there
    is no interface in the Wazo Client to cancel a transfer for profiles
    other than the switchboard (bug
    [#6321](http://projects.wazo.community/issues/6321)). This will be
    addressed in a later version.
-   Transfers started from the Wazo Client do not respect the
    `Dial timeout on transfer` option anymore (bug
    [#6322](http://projects.wazo.community/issues/6322)). This feature
    will be reintroduced in a later version.

Consult the [16.09
Roadmap](https://projects.wazo.community/versions/245) for more
information.

### 16.08

-   cti-protocol is now in version *2.2*
-   Some
    `security features have been added to the XiVO provisioning server <provd-security>`{.interpreted-text
    role="ref"}. To benefit from these new features, you'll need to
    `update your xivo-provd plugins to meet
    the system requirements <provd-security-requirements>`{.interpreted-text
    role="ref"}.

    If you have many phones that are connected to your XiVO through a
    NAT equipment, you should review the default configuration to make
    sure that the IP address of your NAT equipment don't get banned
    unintentionally by your XiVO.

-   Newly created groups and queues now ignore call forward requests
    from members by default. Previously, call forward requests from
    members were always followed. This only applies to call forward
    configured directly on the member's phone: call forward configured
    via *21 have always been ignored in these cases.

    Note that during the upgrade, the previous behaviour is kept for
    already existing queues and groups.

    This behaviour is now configurable per queue/group, via the "Ignore
    call forward requests from members" option under the
    "Application" tab. We recommend enabling this option.

Consult the [16.08
Roadmap](https://projects.wazo.community/versions/244) for more
information.

### 16.07

-   If you were affected by the [bug
    #6213](http://projects.wazo.community/issues/6213), i.e. if your
    agent login time statistics were incorrect since your upgrade to
    XiVO 15.20 or later, and you want to fix your statistics for that
    period of time, you'll need to [manually apply a
    fix](http://projects.wazo.community/issues/6213#note-3).

Consult the [16.07
Roadmap](https://projects.wazo.community/versions/243) for more
information.

### 16.06

Consult the [16.06
Roadmap](https://projects.wazo.community/versions/242) for more
information.

### 16.05

-   The `view`, `add`, `edit`, `delete` and `deleteall` actions of the
    "lines" web service provided by the web interface have been
    removed. As a reminder, note that the web services provided by the
    web interface are deprecated.

Consult the [16.05
Roadmap](https://projects.wazo.community/versions/241) for more
information.

### 16.04

-   cti-protocol is now in version *2.1*
-   The field `Rightcall Code`{.interpreted-text role="guilabel"} from
    `Services -> IPBX -> IPBX Settings ->
    Users`{.interpreted-text role="menuselection"} under
    `Services`{.interpreted-text role="guilabel"} tab will overwrite all
    password call permissions for the user.
-   Faxes stored on FTP servers are now converted to PDF by default. See
    `fax-ftp`{.interpreted-text role="ref"} if you want to keep the old
    behavior of storing faxes as TIFF files.

Consult the [16.04
Roadmap](https://projects.wazo.community/versions/240) for more
information.

### 16.03

-   The new section
    `Services --> Statistics --> Switchboard`{.interpreted-text
    role="menuselection"} in the web interface will only be visible by a
    non-root administrator after adding the corresponding permissions in
    the administrator configuration.
-   Update the switchboard configuration page for the statistics in
    switchboard_configuration_multi_queues.
-   The API for associating a line to a device has been replaced.
    Consult the `xivo-confd
    changelog <rest-api_changelog>`{.interpreted-text role="ref"} for
    further details
-   The configuration parameters of *xivo_ldap_user* plugin of
    *xivo-auth* has been changed. See
    `xivo_ldap plugin <auth-backends-ldap>`{.interpreted-text
    role="ref"}.
-   The user's email is now a unique constraint. Every duplicate email
    will be deleted during the migration. (This does not apply to the
    voicemail's email)

Consult the [16.03
Roadmap](https://projects.wazo.community/versions/239) for more
information.

### 16.02

-   The experimental *xivo_ldap_voicemail* plugin of *xivo-auth* has
    been removed. Use the new
    `xivo_ldap plugin <auth-backends-ldap>`{.interpreted-text
    role="ref"}.
-   Bus messages in the *xivo* exchange are now sent with the
    content-type [application/json]{.title-ref}. Some libraries already
    do the message conversion based the content-type. Kombu users will
    receive a python dictionnary instead of a string containing json
    when a message is received.
-   [xivo-ctid encryption]{.title-ref} is automatically switched on for
    every XiVO server and Wazo Client >= 16.02. If you really don't
    want encryption, you must disable it manually on the server after
    the upgrade. In that case, Wazo Clients will ask whether to accept
    the connection the first time.

Consult the [16.02
Roadmap](https://projects.wazo.community/versions/238) for more
information.

### 16.01

-   The page
    `Configuration --> Management --> Web Services Access --> Acces rights`{.interpreted-text
    role="menuselection"} has been removed. Consequently, every Web
    Services Access has now all access rights on the web services
    provided by the web interface. These web services are deprecated and
    will be removed soon.
-   During the upgrade, if no CA certificates were trusted at the system
    level, all the CA certificates from the ca-certificates package will
    be added. This is done to resolve an issue with installations from
    the ISO and PXE. In the (rare) case you manually configured the
    ca-certificates package to trust no CA certificates at all, you'll
    need to manually reconfigure it via
    `dpkg-reconfigure ca-certificates` after the upgrade.
-   *xivo-ctid* uses *xivo-auth* to authenticate users.
-   the [service_discovery]{.title-ref} section of the *xivo-ctid*
    configuration has changed. If you have set up
    contact_and_presence_sharing, you should update your xivo-ctid
    configuration.
-   the cti-protocol is now versioned and a message will be displayed if
    the server and a client have incompatible protocol versions.

Consult the [16.01
Roadmap](https://projects.wazo.community/versions/237) for more
information.

## 2015

## 15.20

Consult the [15.20
Roadmap](https://projects.wazo.community/versions/214)

-   Debian has been upgraded from version 7 (wheezy) to 8 (jessie).
-   CSV webservices in the web interface have been removed. Please use
    the `confd-api`{.interpreted-text role="ref"} instead.
-   The CSV import format has been changed. Consult
    `15_20_csv_import_upgrade_notes`{.interpreted-text role="ref"} for
    further details.
-   xivo-ctid now uses STARTTLS for the client connections.
    -   For users already using the CTIS protocol the client can be
        configured to use the default port (5003)

Please consult the following detailed upgrade notes for more
information:

- [15.20/jessie](15.20/jessie)
- [15.20/csv](15.20/csv)

## 15.19

Consult the [15.19
Roadmap](https://projects.wazo.community/versions/236)

-   The sound file
    `/usr/share/asterisk/sounds/fr_FR/une.wav`{.interpreted-text
    role="file"} has been moved to
    `/usr/share/asterisk/sounds/fr_FR/digits/1F.wav`{.interpreted-text
    role="file"}.
-   If you would like to use the new ["transfer to voicemail"
    feature](http://projects.wazo.community/issues/5905) from the People
    Xlet, you'll need to update your directory definition and your
    directory display, i.e.:
    -   edit your "internal" directory definition (Services / CTI
        server / Directories / Definitions) and add a field
        "voicemail" with value "voicemail_number"
    -   edit your display (Services / CTI server / Directories / Display
        filters) and add a row with title "Voicemail", field type
        "voicemail" and field name "voicemail"
    -   restart xivo-dird
-   It is now possible to send an email to a user with a configured
    email address in the *people* xlet. See dird-integration-views to
    add the appropriate field to your configured displays.
-   The *Contacts* xlet (aka. *Search*) has been removed in favor of the
    people-xlet. You may need to do some manual configuration in the
    directories for the People Xlet to be fully functional. See
    `the detailed upgrade notes <15_19_people_xlet_upgrade_notes>`{.interpreted-text
    role="ref"} for more details.
-   If you need context separation in the People Xlet, you will have to
    **manually configure** xivo-dird to keep it working, see
    `15-19-dird-context-separation`{.interpreted-text role="ref"}. This
    procedure is only temporary, later versions will handle the context
    separation automatically.
-   xivo-agentd now uses mandatory token authentication for its REST
    API. If you have custom development using this service, update your
    program accordingly.
-   Some actions that used to be available in the *contact* xlets are
    not implemented in the *people* xlet yet.
    -   Cancel transfer is only available using the *switchboard* xlet
    -   Hanging up a call is only possible using the *switchboard* xlet
    -   Call interception is not available anymore
    -   Conference room invitation is not available anymore

Please consult the following detailed upgrade notes for more
information:

- [15.19/people-xlet-directory](15.19/people-xlet-directory)
- [15.19/context-separation](15.19/context-separation)

## 15.18

Consult the [15.18
Roadmap](https://projects.wazo.community/versions/234)

-   The provd_pycli command (deprecated in 15.06) has been removed in
    favor of xivo-provd-cli. If you have custom scripts referencing
    provd_pycli, you'll need to update them.
-   The xivo-agentctl command (deprecated in 15.06) has been removed in
    favor of xivo-agentd-cli. If you have custom scripts referencing
    xivo-agentctl, you'll need to update them.
-   xivo-agentd now uses HTTPS. If you have custom development using
    this service, update your configuration accordingly. The
    xivo-agentd-client library, used to interact with xivo-agentd, has
    also been updated to use HTTPS by default.
-   xivo-confd ports 50050 and 50051 have been removed. Please use 9486
    and 9487 instead

**Configuration File Upgrade Notes**

The file format of configuration files for daemons exposing an HTTP/S
API has changed. The following services have been affected :

> -   xivo-agentd
> -   xivo-amid
> -   xivo-auth
> -   xivo-confd
> -   xivo-ctid
> -   xivo-dird
> -   xivo-dird-phoned

Ports and listening addresses are now organised in the following
fashion:

``` {.sourceCode .yaml}
rest_api:
  https:
    enabled: true
    port: 9486
    listen: 0.0.0.0
    certificate: /usr/share/xivo-certs/server.crt
    private_key: /usr/share/xivo-certs/server.key
    ciphers: "ALL:!aNULL:!eNULL:!LOW:!EXP:!RC4:!3DES:!SEED:+HIGH:+MEDIUM"
  http:
    enabled: true
    port: 9487
    listen: 127.0.0.1
```

If you have any custom configuration files for these daemons, please
modify them accordingly. Consult `network_ports`{.interpreted-text
role="ref"} for further details on which network services are available
for each daemon.

## 15.17

Consult the [15.17
Roadmap](https://projects.wazo.community/versions/233)

-   Online call recording is now done via
    [automixmon](https://wiki.asterisk.org/wiki/display/AST/One-Touch+Features)
    instead of automon. This has no impact unless you have custom
    dialplan that is passing directly the "w" or "W" option to the
    Dial or Queue application. In these cases, you should modify your
    dialplan to pass the "x" or "X" option instead.
-   The remote directory service available from
    `supported phones <supported-devices>`{.interpreted-text role="ref"}
    is now provided by the new unified directory service, i.e.
    xivo-dird. Additional upgrade steps are required to get the full
    benefit of the new directory service.
-   The field `enableautomon` has been renamed to `enableonlinerec` in
    the users web services provided by the web-interface (these web
    services are deprecated).
-   The agent status dashboard now shows that an agent is calling or
    receiving a non ACD call while in wrapup or paused.
-   SIP endpoints created through the REST API will not appear in the
    web interface until they have been associated with a line
-   Due to limitations in the database, only a limited number of
    optional parameters can be configured on a SIP endpoint. Consult the
    `xivo-confd changelog <rest-api_changelog>`{.interpreted-text
    role="ref"} for further details

## 15.16

Consult the [15.16
Roadmap](https://projects.wazo.community/versions/232)

-   The directory column type "mobile" was removed in favor of the new
    "callable" type. If you have hand-written configuration files for
    xivo-dird, in section "views", subsection "displays", all keys
    "type" with value "mobile" must be changed to value
    "callable".
-   The `xivo-auth` backend interface has changed, `get_acls` is now
    `get_consul_acls`. All unofficial back ends must be adapted and
    updated. No action is required for "normal" installations.
-   Voicemails can now be deleted even if they are associated to a user.

## <a name="upgrade_notes_15_15"></a>15.15

Consult the [15.15 Roadmap](https://projects.wazo.community/versions/231)

**Voicemail Upgrade Notes**

> -   Voicemail webservices in the web interface have been removed.
>     Please use the `confd-api`{.interpreted-text role="ref"} instead.
> -   Voicemail IMAP configuration has been migrated to the new
>     `Advanced` tab.
> -   Voicemail option `Disable password checking` has been converted to
>     `Ask password`. The value has also been inverted. (e.g. If
>     `Disable password checking` was false, `Ask password` is true.)
>     `Ask password` is activated by default.
> -   After an upgrade, if ever you have errors when searching for
>     voicemails, please try clearing cookies in your web browser.
> -   A voicemail must be dissociated from any user prior to being
>     deleted. Voicemail are dissociated by editing the user and
>     clicking on the `Delete voicemail` button in the `Voicemail` tab.
>     This constraint will disappear in future versions.
> -   Deleting a user will dissociate any voicemail that was attached,
>     but will not delete it nor any messages.
> -   Creating a line is no longer necessary when attaching a voicemail
>     to a user.
> -   The following fields have been modified when importing a CSV file:

  -------------------------------------------------------------------------
  Old name            New name               Required ?  New default value
  ------------------- ---------------------- ----------- ------------------
  voicemailmailbox    voicemailnumber        yes

  voicemailskippass   voicemailaskpassword   no          1

                      voicemailcontext       yes
  -------------------------------------------------------------------------

**Directories**

> -   Concatenated fields in directories are now done in the directory
>     definitions instead of the displays
> -   The field column in directory displays are now field names from
>     the directory definition. No more [{db-*}]{.title-ref} are
>     required
> -   In the directory definitions fields can be modified using a python
>     format string with the fields comming from the source.
> -   Most of the configuration for xivo-dird is now generated from
>     xivo-confgen using the values in the web interface.
> -   The [remote directory]{.title-ref} xlet has been removed in favor
>     of the new [people]{.title-ref} xlet.

See [wazo-dird-integration]{.title-ref} for more details

### 15.14

-   Consult the [15.14
    Roadmap](https://projects.wazo.community/versions/230)
-   Default password for `xivo-polycom-4.0.4` plugin version >= 1.3 is
    now **9486** (i.e. the word "xivo" on a telephone keypad).
-   Default password for `xivo-polycom-5.3.0` plugin version >= 1.4 is
    now **9486**.
-   Caller id management for users in confd has changed. Consult the
    `xivo-confd changelog <rest-api_changelog>`{.interpreted-text
    role="ref"}.
-   The Local Directory Xlet is replaced with the People Xlet. Contacts
    are automatically migrated to the server. Note that the CSV format
    for importing contacts has changed.

### 15.13

-   Consult the [15.13
    Roadmap](https://projects.wazo.community/versions/229)
-   Asterisk has been upgraded from version 11.17.1 to 13.4.0, which is
    a major Asterisk upgrade.
-   An
    [ARI](https://wiki.asterisk.org/wiki/display/AST/Getting+Started+with+ARI)
    user has been added to `/etc/asterisk/ari.conf`. If you have configured Asterisk HTTP server to bind on
    a publicly reachable address (in
    `/etc/asterisk/http.conf`{.interpreted-text role="file"}), then you
    should update your configuration to prevent unauthorized access on
    your Asterisk.
-   The xivo-dird configuration option
    [source_to_display_columns]{.title-ref} has been removed in favor
    of the new option [format_columns]{.title-ref}. All source
    configuration using the [source_to_display_columns]{.title-ref}
    must be updated. A migration script will automatically modify source
    configuration in the [/etc/xivo-dird/sources.d]{.title-ref}
    directory.

Please consult the following detailed upgrade notes for more
information:

- [15.13/asterisk_13](/uc-doc/upgrade/15.13/asterisk_13)

### 15.12

-   Consult the [15.12
    Roadmap](https://projects.wazo.community/versions/228)
-   The certificate used for HTTPS in the web interface will be
    regenerated if the default certificate was used. Your browser will
    complain about the new certificate, and it is safe to accept it (see
    [#3656](http://projects.wazo.community/issues/5636)). See also
    `https_certificate`{.interpreted-text role="ref"}.
-   If you have an
    `HA configuration <high-availability>`{.interpreted-text
    role="ref"}, then you should run `xivo-sync -i` on the master node
    to setup file synchronization between the master and the slave. File
    synchronization will then be done automatically every hour via rsync
    and ssh.
-   xivo-auth and xivo-dird now use HTTPS, if you have custom
    development using these services, update your configuration
    accordingly.

### 15.11

-   Consult the [15.11
    Roadmap](https://projects.wazo.community/versions/227)
-   The call records older than 365 days will be periodically removed.
    The first automatic purge will occur in the night after the upgrade.
    See `purge_logs`{.interpreted-text role="ref"} for more details.

### 15.10

-   Consult the [15.10
    Roadmap](https://projects.wazo.community/versions/223)

### 15.09

-   Consult the [15.09
    Roadmap](https://projects.wazo.community/versions/226)

### 15.08

-   Consult the [15.08
    Roadmap](https://projects.wazo.community/versions/225)
-   The Dialer Xlet has been integrated in Identity Xlet.

### 15.07

-   Consult the [15.07
    Roadmap](https://projects.wazo.community/versions/224)

### 15.06

-   Consult the [15.06
    Roadmap](https://projects.wazo.community/versions/222)
-   The provd client has been moved into a new python package,
    xivo_provd_client. If you have custom scripts using this client,
    you'll need to update them. See
    <http://projects.wazo.community/issues/5469> for more information.
-   The provd_pycli command name has been deprecated in favor of
    xivo-provd-cli. These 2 commands do the same thing, the only
    difference being the name of the command. The provd_pycli command
    name will be removed in 15.18, so if you have custom scripts
    referencing provd_pycli, you'll need to update them.
-   The xivo-agentctl command name has been deprecated in favor of
    xivo-agentd-cli. These 2 commands do the same thing, the only
    difference being the name of the command. The xivo-agentctl command
    name will be removed in 15.18, so if you have custom scripts
    referencing xivo-agentctl, you'll need to update them.

### 15.05

-   Consult the [15.05
    Roadmap](https://projects.wazo.community/versions/221)
-   The Xlet identity has been modified to follow the new Wazo Client
    design which implies the removal of some details.

### 15.04

-   Consult the [15.04
    Roadmap](https://projects.wazo.community/versions/220)

### 15.03

-   Consult the [15.03
    Roadmap](https://projects.wazo.community/versions/219)

### 15.02

-   Consult the [15.02
    Roadmap](https://projects.wazo.community/versions/218)

### 15.01

-   Consult the [15.01
    Roadmap](https://projects.wazo.community/versions/217)
-   The `confd REST API <confd-api>`{.interpreted-text role="ref"} is
    now more restrictive on HTTP headers. Particularly, the headers
    Accept and Content-Type must be set to (typically)
    `application/json`.
-   The following configuration files have been created:
    -   `/etc/xivo-agid/config.yml`{.interpreted-text role="file"}
    -   `/etc/xivo-call-logd/config.yml`{.interpreted-text role="file"}
    -   `/etc/xivo-amid/config.yml`{.interpreted-text role="file"}
    -   `/etc/xivo-agentd/config.yml`{.interpreted-text role="file"}
