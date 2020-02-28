---
title: Call Recording
---

-   [Enabling](#enabling)
    -   [Administrator](#administrator)
    -   [User](#user)
-   [Call Recording Management](#call-recording-management)
    -   [Extensions](#extensions)
    -   [Disable user call control
        management](#disable-user-call-control-management)
    -   [Files](#files)
        -   [File names](#file-names)
        -   [File extensions](#file-extensions)

Call recording allow the user of the administrator to record a user\'s
conversation. Recorded files are stored on the Wazo server and are
accessible using the web interface.

Enabling
========

There are many ways to enable call recording. It can be done by the
administrator or the user himself.

Administrator
-------------

The administrator can enable call recording from the user form in the
web interface.

-   With `PUT /users/{user_uuid} {"call_record_enabled": True}`

User
----

The user can enable and disable call recording using the
[\*26]{.title-ref} extension on its phone. The user can also enable call
recording during a call using the [\*3]{.title-ref} extension during the
conversation.

Call Recording Management
=========================

Extensions
----------

The extensions for call recording and online call recording are
available in the web interface in the extension form.

-   With `/extensions/features` endpoint and `feature: callrecord`

Disable user call control management
------------------------------------

To disable call recording for user, disable the [Call
recording]{.title-ref} extension in the web interface.

To disable online call recording, uncheck the [Enable online call
recording]{.title-ref} option in the user form.

-   With `PUT /users/{user_uuid} {"online_call_record_enabled": False}`

Files
-----

Recorded files are not available for the now with REST API.

Recordings are located in
`/var/spool/asterisk/monitor`{.interpreted-text role="file"}

### File names

The file names for call recording can be customized using
[Jinja2](http://jinja.pocoo.org/docs/2.9/templates/) templates.

The following variables can be used in the file name:

-   srcnum: The caller ID number of the caller
-   dstnum: The called extension
-   timestamp: A unix timestamp
-   local\_time: The formated date in the server\'s timezone
-   utc\_time: The formated date in UTC
-   base\_context: The context in which this call entered the Wazo
    dialplan
-   tenant\_uuid: The tenant UUID of the user or the outgoing call

::: {.note}
::: {.admonition-title}
Note
:::

You **must** restart wazo-agid to take any config change into effect:

systemctl restart wazo-agid
:::

Example 1:

Creating recording in a sub-directory for each entity

A file with the following content in
`/etc/wazo-agid/conf.d/call_recording.yml`{.interpreted-text
role="file"}:

``` {.sourceCode .yaml}
call_recording:
  filename_template: "{{ tenant_uuid }}/{{ utc_time }}-{{ srcnum }}-{{ dstnum }}"
```

This configuration would write the files in
`/var/spool/asterisk/monitor/<tenant_uuid>/`{.interpreted-text
role="file"}. The name of the files would be
`<utc_time>-<srcnum>-<dstnum>.wav`{.interpreted-text role="file"}

Example 2:

Creating recording in another directory

A file with the following content in
`/etc/wazo-agid/conf.d/call_recording.yml`{.interpreted-text
role="file"}:

``` {.sourceCode .yaml}
call_recording:
  filename_template: "/home/pcm/call/user-{{ srcnum }}-{{ dstnum }}-{{ timestamp }}"
```

This configuration would write the files in the
`/home/pcm/call`{.interpreted-text role="file"} directory. The name of
the files would be
`user-<srcnum>-<dstnum>-<timestamp>.wav`{.interpreted-text role="file"}.
Which is the default with another location.

::: {.note}
::: {.admonition-title}
Note
:::

recording that are not directly in
`/var/spool/asterisk/monitor`{.interpreted-text role="file"} will not be
shown in the web interface.
:::

::: {.note}
::: {.admonition-title}
Note
:::

Asterisk needs write permission to be able to write the recordings in
the configured directory.
:::

The filename for online call recording cannot be configured from the
configuration file but can be modified using a pre-process subroutine.

The file format is always
`auto-timestamp-<TOUCH_MIXMONITOR>.wav`{.interpreted-text role="file"}.
`TOUCH_MIXMONITOR` is a channel variable that can be set before the call
starts.

### File extensions

For online call recording, the file format can be modified using the
`TOUCH_MIXMONITOR_FORMAT` channel variable.

For call recording the default value is `wav` and can be modified with a
configuration file.

Example:

Add a file names `/etc/wazo-agid/conf.d/recording.yml`{.interpreted-text
role="file"} with the following content:

``` {.sourceCode .yaml}
call-recording:
  filename_extension: wav
```
