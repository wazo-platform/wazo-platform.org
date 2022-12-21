---
title: Provisioning Plugins Migration to Python 3 Upgrade Notes
---

You might be impacted by the migration of wazo-provd and the provisioning plugins to Python 3 if:

- You have old plugins that are no longer provided by us installed
- You are using another plugin repository

In those cases, you may have one or many error messages in the wazo-provd logs that look a bit like
this:

```
2022-12-16 11:40:11,370 [3813] (ERROR) (provd.app): Error while loading plugin xivo-polycom-4.0.9
  File "/usr/lib/python3/dist-packages/provd/app.py", line 816, in _pg_load
    self.pg_mgr.load(plugin_id, gen_cfg, spec_cfg)
  File "/usr/lib/python3/dist-packages/provd/plugins.py", line 1144, in load
    self._execplugin(plugin_dir, plugin_globals)
  File "/usr/lib/python3/dist-packages/provd/plugins.py", line 1047, in _execplugin
    exec(compile(f.read(), entry_file, 'exec'), pg_globals)
  File "/var/lib/wazo-provd/plugins/xivo-polycom-4.0.9/entry.py", line 19, in <module>
    execfile_('common.py', common_globals)
  File "/usr/lib/python3/dist-packages/provd/plugins.py", line 1039, in aux
    exec(compile(f.read(), filename, 'exec'), globals, *args, **kwargs)
  File "/var/lib/wazo-provd/plugins/xivo-polycom-4.0.9/common.py", line 206
    except tzinform.TimezoneNotFoundError, e:
                                         ^
SyntaxError: invalid syntax
```

In this case, the plugin is no longer provided by Wazo and is still using Python 2 syntax. The only
possible fixes are:

- Remove the affected plugin
- Manually update the plugin code to fix the issues
- Replace the plugin used by the affected devices by a newer version of the plugin (if available)

## Remove the affected plugins

If you decide to actually remove the plugin, you can use `wazo-provd-cli` to do so. The CLI comes
with helpers that make it easy to do such tasks.

```shell
root@stack:~# wazo-provd-cli
wazo-provd-cli> plugins.uninstall('xivo-polycom-4.0.9')
```

## Manually update the plugin code to fix the issues

One of the possible ways to fix the loading issue is to look at what the Traceback says and to fix
the errors. In our example, it is a simple SyntaxError. The correct syntax is:

```python
except tzinform.TimezoneNotFoundError as e:
```

We then replace the code in the file "/var/lib/wazo-provd/plugins/xivo-polycom-4.0.9/common.py" at
line 206 with the above, then restart wazo-provd with `systemctl restart wazo-provd` and our plugin
should load. If not, it's only a question of repeating the above steps until there are no more
errors on wazo-provd startup.

### Other possible errors due to the Python 3 migration

It is possible that you may encounter other errors due to the changes made to the provisioning
server in preparation for the Python 3 migration. Some changes are:

- The device support constants were replaced with an `Enum`, `DeviceSupport`

  ```python
  from provd.devices.pgasso import BasePgAssociator, DeviceSupport


  class DigiumPgAssociator(BasePgAssociator):

  _MODELS = ['D40', 'D45', 'D50', 'D60', 'D62', 'D65', 'D70']

  def __init__(self, version):
  	super().__init__()
  	self._version = version

  def _do_associate(
  	self, vendor: str, model: Optional[str], version: Optional[str]
  ) -> DeviceSupport:
  	if vendor == 'Digium':
  		if model in self._MODELS:
  			if version == self._version:
  				return DeviceSupport.EXACT
  			return DeviceSupport.COMPLETE
  		return DeviceSupport.PROBABLE
  	return DeviceSupport.IMPROBABLE
  ```

Other changes from Python 2 to 3 include:

- Removing the unicode string prefixes. Strings in Python 3 are unicode by default.
- Removing the `object` inheritance. It is implicit in Python 3.

To see how a provisioning plugin is developed and some examples, you can read the
[guide on developing a plugin](https://wazo-platform.org/uc-doc/contributors/provisioning/developing_plugins).

## Replace the plugin used by the affected devices by a newer version

If the plugin that is failing has an equivalent plugin supported by Wazo but uses a slightly newer
firmware version (in our example, that would be `wazo-polycom-4.0.11`), then we could update the
devices using the old plugin and uninstall it.

```bash
root@stack:~# wazo-provd-cli
wazo-provd-cli> plugins.install('wazo-polycom-4.0.11')
'install' in progress...
    'download' in progress... 0/7735
    'download' done. 7735/7735
'install' done.
wazo-provd-cli> helpers.mass_update_devices_plugin('xivo-polycom-4.0.9', 'wazo-polycom-4.0.11')
Error: plugin xivo-polycom-4.0.9 is not installed
Do you want to proceed anyway? [Y/n] Y
Updating device 06afddf697f24a3eb0e8bc7dd415a57e

wazo-provd-cli>
```
