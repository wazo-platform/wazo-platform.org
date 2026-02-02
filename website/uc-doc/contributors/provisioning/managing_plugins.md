---
title: Managing Plugins
---

## Git Repository

Most plugin-related files are available in the
[wazo-provd-plugins repository](https://github.com/wazo-platform/wazo-provd-plugins.git). The
following examples are relative to the repository directory tree. Any modifications should be
preceded by a `git pull`.

## Updating a Plugin

We will be using the `wazo-cisco-spa` plugin family as an example on this page

There is one directory per family. Here is the directory structure for `wazo-cisco-spa`:

```shell
plugins/wazo-cisco-spa/
+-- model_name_xxx
+-- model_name_xxx
+-- common
+-- build.py
```

Every plugin has a folder called `common` which regroups common resources used by every model. Every
model has its own folder with its version number.

After modifying a plugin, you must increment the version number. You can modify the file
`plugin-info` to change the version number:

```shell
plugins/wazo-cisco-spa/
+-- model_name_xxx
    +-- plugin-info
```

**Note**: If you ever modify the `common` folder, you must increment the version number of all the
models.

### Use Case: Update Firmwares for a given plugin

Let us suppose we want to update the firmware for wazo-snom from `8.7.3.25` to `8.7.3.25.5`. Here
are the steps to follow :

1. Copy folder `plugins/wazo-snom/8.7.3.25` to `plugins/wazo-snom/8.7.3.25.5`
2. Update `VERSION` number in `plugins/wazo-snom/8.7.3.25.5/entry.py`
3. Update `VERSION` number in `plugins/wazo-snom/8.7.3.25.5/plugin-info`
4. Download the new firmware files (`.bin` files from
   [snom website](https://service.snom.com/spaces/wiki/pages/234331309/Deskphones+Firmware))
5. Update `VERSION` number and URIs in `plugins/wazo-snom/8.7.3.25.5/pkgs/pkgs.db` (with URIs of
   downloaded files from the Snom website)
6. Update sizes and SHA1 checksums in `plugins/wazo-snom/8.7.3.25.5/pkgs/pkgs.db` (using the helper
   script `wazo-tools/dev-tools/check_fw`)
7. Update `plugins/wazo-snom/build.py` (duplicate and update section `8.7.3.25` to `8.7.3.25.5`)

### Test your changes

You have three different methods to test your changes on your development machine.

#### Always increase plugin version (easiest)

If the production version is 0.4, change the plugin version to 0.4.01, make your changes and upload
to testing (see below).

Next modification will change the plugin version to 0.4.02, etc. When you are finished making
changes, change the version to 0.5 and upload one last time.

#### Edit directly on Wazo

Edit the files in `/var/lib/wazo-provd/plugins`

To apply your changes, go in `wazo-provd-cli` and run:

```python
plugins.reload('wazo-cisco-spa-7.5.5')
```

#### Disable plugin caching

Edit `/etc/wazo-provd/config.yml` and add the line:

```yaml
general:
  cache_plugin: true
```

Empty `/var/cache/wazo-provd` and restart provd.

Make your changes in provd-plugins, update the plugin version to the new one and upload to testing
(see below). Now, every time you uninstall/install the plugin, the new plugin will be fetched from
testing, instead of being cached, even without changing the version.

#### Uploading to testing

Before updating a plugin, it must be passed through the testing phase. Once it has been approved it
can be uploaded to the production server.

In the `wazo-provd-plugins` repo, you must merge your changes in the `testing` branch before
uploading the plugins to `provd.wazo.community`:

```shell
git checkout testing
git pull
git merge my-new-branch
git push  # this step is important: it validates that your build is up-to-date and will not remove anything
make upload
```

Afterwards, you must modify the `plugin_server`. This can be changed with `wazo-provd` endpoint
`/provd/configure/plugin_server`.

```
http://provd.wazo.community/plugins/2/testing/
```

You can then update the list of plugins and check the version number for the plugin that you
modified. Don't forget to install the plugin to test it.

#### Mass-install all firmware related to a given plugin

Using wazo-provd-cli on a Wazo server, one can mass-install firmware. Following example installs all
firmware for wazo-snom 8.7.5.35 plugin (note the auto-completion):

```shell
wazo-provd-cli> list(plugins.installed())
['wazo-snom-8.7.5.35',
 'wazo-cisco-sccp-legacy',
 'wazo-snom-8.9.3.40',
 'wazo-aastra-4.2.0',
 'wazo-aastra-3.3.1-SP4',
 'wazo-aastra-3.2.2.1136',
 'wazo-cisco-sccp-9.4',
 'null']
wazo-provd-cli> p = plugins['wazo-snom-8.7.5.35']
wazo-provd-cli> p.install_all()
```

#### Uploading to stable

Once checked, you must synchronize the plugin from `testing` to `stable`. If applicable, you should
also update the archive repo.

To download the stable and archive plugins:

```shell
make download-stable
make download-archive
```

Go to the `plugins/_build` directory and delete the plugins that are going to be updated. Note that
if you are not updating a plugin, but you are instead removing it "once and for all", you should
instead move it to the archive directory:

```shell
rm -fi stable/wazo-cisco-spa*
```

Copy the files from the directory `testing` to `stable`:

```shell
cp testing/wazo-cisco-spa* stable
```

Go back to the `plugins` directory and upload the files to the stable and archive repo:

```shell
make upload-stable
make upload-archive
```

The files are now up-to-date, and you can test by putting back the `stable` url in the
web-interface's configuration:

```
http://provd.wazo.community/plugins/2/stable/
```
