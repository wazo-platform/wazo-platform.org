---
title: Stack Plugins
description: Documentation on plugin management for wazo-plugind plugins
---

A wazo-platform deployment can be extended with plugins, managed by the
[wazo-plugind](/documentation/overview/plugins.html) component.

Plugins allow third parties to add functionality to Wazo, such as custom dialplan, configuration
files, and service extensions.

## Managing Plugins with wazo-plugind-cli

The `wazo-plugind-cli` command-line tool can be used to manage plugins. It interacts with the
wazo-plugind REST API.

### Listing Plugins

List all installed plugins:

```shell
wazo-plugind-cli -c "list"
```

### Installing Plugins

```shell
wazo-plugind-cli -c "install <method> <source> [--ref reference] [--async]"
```

For example, to install a plugin `official/myplugin` from a github source, with a tag reference for
a specific version:

```shell
wazo-plugind-cli -c "install git https://github.com/myorg/myplugin --ref v1.0"
```

:::note Private plugins

A plugin hosted in a private git repository may be installed if a credential can be embedded in the
URL. For example, a github private plugin can be installed using an access token with the correct
permissions:

```shell
wazo-plugind-cli -c "install git https://<access token>@github.com/myorg/myprivateplugin"
```

This depends on the git hosting service's support for private repository access URLs.

:::

:::note Git versioning

A git plugin may be installed from a specific branch, or a specific reference, using the `--ref`
option. With no `--ref`, the default branch name `master` is used.

A branch is a mutable reference, so installing from a branch may install an arbitrary version of the
plugin source at different moments in time, which may result in installing an unstable version.
Consult the plugin documentation, release notes or commit history of the source repository to
determine if a branch reference is appropriate or a specific tag or commit revision is available.

In general, a fixed reference, such as a tag or a specific commit revision, is preferable to
guarantee a specific version is installed, and that the installation command can safely be reused
with the same expected result.

:::

### Uninstalling Plugins

Uninstall an installed plugin through its full name:

```shell
wazo-plugind-cli -c "uninstall <namespace>/<name>"
```

See [Listing plugins](#listing-plugins) to see installed plugins and their full name.

### Reinstalling Plugins

To reinstall a plugin (e.g. after a system upgrade), [uninstall it](#uninstalling-plugins) first
then [install it](#installing-plugins) again:

```shell
wazo-plugind-cli -c "uninstall <namespace>/<name>"
wazo-plugind-cli -c "install <method> <source> [...]"
```

:::note Reinstalling the same version

If the intent is to ensure the same version of the plugin is reinstalled, make sure the install
command specifies an installation source that corresponds to a fixed version. For example, a git
source should use a specific commit revision or tag as the `--ref` parameter, and not a mutable
branch.

:::

### Upgrading plugins

There is no upgrade command. Upgrading a plugin manually can be done by installing a new version of
the plugin with the same name. When installing a plugin that already exists, the version from the
metadata of the installation target is compared with the version already installed, and the
installation target is installed if the version differs, replacing the previous installation.

```shell
wazo-plugind-cli -c "install git https://github.com/myorg/myplugin --ref <new revision>"
```

Official plugins may be automatically upgraded during wazo-platform upgrades if new versions are
made available.

Custom plugins (outside the "official" namespace) are not automatically upgraded.

Breaking changes between wazo-platform releases may require upgrading plugins to a compatible
version.

### Getting Help

For a complete list of available commands:

```shell
wazo-plugind-cli -c 'help'
```

For usage help on a specific command:

```shell
wazo-plugind-cli -c 'help <command>'
```

## Plugin Maintenance After Upgrades

Plugins may need to be reinstalled or upgraded after upgrading the Wazo stack.

While official plugins may be automatically upgraded during Wazo-Platform upgrades, new
wazo-platform releases may bring breaking changes to custom plugins. If a new compatible version of
a plugin is made available, the plugin will need to be manually upgraded.

Wazo-Platform releases which involve a Debian distribution upgrade likely require upgrading or
reinstalling plugins.

Non-official patch-based plugins require manually reinstalling after each Wazo-Platform upgrade, and
are likely to break without proper maintenance work since they depend on a specific state of the
Wazo-Platform code.

See [Reinstalling](#reinstalling-plugins) and [Upgrading](#upgrading-plugins) instructions.

See [version-specific upgrade notes](/uc-doc/upgrade/upgrade_notes) for specific recommendations.

## See Also

- [wazo-plugind documentation](/documentation/overview/plugins.html) - Plugin system architecture
  and plugin development
- [Plugins contributor guide](/uc-doc/contributors/plugins) - How to create plugins
