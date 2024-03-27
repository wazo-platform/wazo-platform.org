---
title: Add a phone model to an existing plugin
---

Sometimes, all you want to do is for a plugin to support a phone model that is closely related to
models that are already supported. In that case, all that is necessary to do most of the time is to
add the model to the list of recognized models by that plugin to make it work.

## Preparation

### Knowledge

This guide presumes that you have a basic working knowledge of git. To learn more about git, GitHub
provides a [pretty good tutorial](https://docs.github.com/en/github/using-git).

### Provisioning plugins repository

In order to work on plugins, you have to clone the
[wazo-provd-plugins](https://github.com/wazo-platform/wazo-provd-plugins) repository:

```shell
$ git clone https://github.com/wazo-platform/wazo-provd-plugins.git
Cloning into 'wazo-provd-plugins'...
remote: Enumerating objects: 563, done.
remote: Counting objects: 100% (563/563), done.
remote: Compressing objects: 100% (264/264), done.
remote: Total 10723 (delta 366), reused 440 (delta 278), pack-reused 10160
Receiving objects: 100% (10723/10723), 5.30 MiB | 5.66 MiB/s, done.
Resolving deltas: 100% (6357/6357), done.
```

Then, create a new branch for your plugin:

```shell
$ git checkout -b yealink-v85-add-T4X
Switched to a new branch 'yealink-v85-add-T4X'
```

## Example case: adding the T41S to `wazo-yealink-v85`

We will list the files and highlight where you should make changes for the model to work. We will
add the T41S to the `wazo-yealink-v85` plugin in this example. The information about the number of
line keys, memory keys, SIP accounts, etc. was found in the datasheets available in the
documentation provided on the Yealink website.

### `plugins/wazo-yealink/v85/common.py`

This file contains the main code of the plugin. It is used to match the phone to the plugin using
the HTTP User-Agent, DHCP option 60 or TFTP requests.

In the case of the Yealink plugin, we only want to make sure that the User-Agent is matched by one
of the regular expression defined in the `_UA_REGEX_LIST` variable. If not, it is possible to add a
regular expression to the list. In our example case, the T41S User-Agent is already matched by the
`^[yY]ealink\s+SIP-(\w+)\s+([\d.]+)\s+([\da-fA-F:]{17})$` regular expression.

This file is also used to define the number of line keys, memory keys and SIP accounts for a model.

1. Find the `_NB_LINEKEY` dictionary and add the number of lines for that model.

   Example:

   ```python
   _NB_LINEKEY = {
       # (...)
       'T41S': 15,
       # (...)
   }
   ```

2. Find the `_NB_MEMORYKEY` dictionary and add the number of memory keys for that model.

   Example:

   ```python
   _NB_MEMORYKEY = {
       # (...)
       'T41S': 0,
       # (...)
   }
   ```

3. Find the `_NB_SIP_ACCOUNTS` dictionary and add the number of SIP accounts for that model.

   Example:

   ```python
   _NB_SIP_ACCOUNTS = {
       # (...)
       'T41S': 6,
       # (...)
   }
   ```

### `plugins/wazo-yealink/v85/entry.py`

This file is used to define the supported firmware versions for the model and the firmware filename.

1. Find the `MODEL_VERSIONS` dictionary and add the model.

   Example:

   ```python
   MODEL_VERSIONS = {
       # (...)
       'T41S': '66.85.0.5',
       # (...)
   }
   ```

2. Find the `COMMON_FILES` list and add the correct entry for the `y0000000000xx.cfg` file.

   Example:

   ```python
   COMMON_FILES = [
       # (...)
       {'y000000000066.cfg', 'T46S(T48S,T42S,T41S)-66.85.0.5.rom', 'model.tpl'},
       # (...)
   ]
   ```

If the phone is a DECT model (not the case for the T41S, but we will ignore this fact), you must add
the model to the `COMMON_FILES_DECT` list instead.

Example for the W60B:

```python
COMMON_FILES_DECT = [
    # (...)
    {
        'filename': 'y000000000077.cfg',
        'fw_filename': 'W60B-77.85.0.20.rom',
        'handsets_fw': {
            'w53h': 'W53H-88.85.0.20.rom',
            'w56h': 'W56H-61.85.0.20.rom',
            'w59r': 'W59R-115.85.0.20.rom',
            'cp930w': 'CP930W-87.85.0.20.rom',
        },
        'tpl_filename': 'dect_model.tpl',
    },
]
```

### `plugins/wazo-yealink/v85/pkgs/pkgs.db`

This file is where the firmware download information is located.

We need to add a _package definition_ and a _file definition_.

The _package definition_ is usually at the top of the `pkgs.db` file:

```
[pkg_T46S_T48S_T42S_T41S-fw]
description: Firmware for Yealink T46S T48S T42S and T41S
description_fr: Micrologiciel pour Yealink T46S T48S T42S et T41S
version: 66.85.0.5
files: T46S_T48S_T42S_T41S-fw
install: yealink-fw
```

The `files` option naming is important: it will use the files from the file section with the
corresponding name, prepended by `file_`. So `file_T46S_T48S_T42S_T41S-fw`.

Also, the package will use the `yealink-fw` installation method. It is already in the file, so **you
do not need to add it**, but to be clear this the contents:

```
[install_yealink-fw]
a-b: cp *.rom firmware/
```

As you can see, it will copy the ROM file to the `firmware` directory. The `firmware` directory in
question is located in the `tftpboot` directory in the installed plugin, located at
`/var/lib/wazo-provd/plugins/wazo-yealink-v85/var/tftpboot/firmware`. It is possible to have more
than one step in the installation method. To see how it is done, look at what is done with the
language packages already present in the `pkgs.db` file.

The _file definition_ is usually at the bottom of the `pkgs.db` file:

```
[file_T46S_T48S_T42S_T41S-fw]
filename: T46S(T48S,T42S,T41S)-66.85.0.5.rom
url: https://support.yealink.com/forward2download?path=ZIjHOJbWuW/DFrGTLnGypkTJASVqwzX/x71yaViKhXSKOgYSKl0Pb7N9IXFpYf7YAOhOJmV0fGjbcYgmf0b9uxGdQ1IFTWkfgTz2m4g5Uoy1NWm3/S6JBTsplusSymbolM5UOVemCq9Kf2pvmyoc=
size: 25559152
sha1sum: 091d469ba3ce13b424a5212fb74f0e1b59c31a6a
```

The size is in bytes and the sha1sum is obtained using the `sha1sum` command on a GNU/Linux system.

### `plugins/wazo-yealink/v85/templates/T41S.tpl`

It is necessary to create a `T41S.tpl` file or copy-paste an existing file and rename it to
`T41S.tpl`.Make sure that its content is correct.

In our case it should be:

```jinja2
{% extends 'base.tpl' -%}

{% block model_specific_parameters -%}
gui_lang.url = http://{{ ip }}:{{ http_port }}/lang/T41S-T42S-T53W-T53/004.GUI.French.lang
{% endblock %}

```

If you want to do more advanced modifications to the templates, you can take a look at the
[Jinja2 documentation](https://jinja.palletsprojects.com/en/2.11.x/templates/) to learn more about
how they work. The `base.tpl` file mentioned in the model-specific templates usually contains all
the shared parameters and will be what is output to the phone configuration file.

### `plugins/wazo-yealink/v85/plugin-info`

This file is for metadata. It is used to expose what phones are supported by the plugin, the plugin
version and the features supported by the phones and the plugin.

In our example case, we need to:

1. Add the model to the `description` and to the French translation `description_fr`. In our case,
   we decide to specify that we support the T4X series.

   ```json
   "description": "Plugin for Yealink for CP920, CP960, T2X, T3X, T4X, T5X and W60 series in version V85.",
   "description_fr": "Greffon pour Yealink pour les series CP920, CP960, T2X, T3X, T4X, T5X et W60 en version V85.",
   ```

2. Add the phone model in the `capabilities` key

   ```json
   "Yealink, T41S, 66.85.0.5": {
       "lines": 6,
       "high_availability": true,
       "function_keys": 15,
       "expansion_modules": 0,
       "protocol": "sip"
   },
   ```

   As you can see, we reuse the information that we defined in the `common.py` file. To see the
   supported metadata, take a look at the
   [README.md](https://github.com/wazo-platform/wazo-provd-plugins/blob/master/README.md) file at
   the root of the wazo-provd-plugins repository.

3. Bump the plugin version

   It is necessary for the plugin version to be incremented, otherwise the plugin will not be
   rebuilt one merged into the main branch. To do so, increment the last digit of the `version` key.

## Final steps

Commit everything you have done in git with the format `plugin-name: changes` as the commit message.
For example, `yealink-v85: add T41S support`.

You are now ready to open the pull request on GitHub. To see how to open a Pull request, GitHub
again provides
[a tutorial](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests) on this
subject.
