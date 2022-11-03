---
title: Extending Wazo with Plugins
date: 2017-06-26
author: Pascal Cadotte Michaud
category: Wazo
slug: extending-wazo-plugins-en
status: published
---


One of the strengths of Wazo is that the administrator can modify the system to add new features or override default behaviors that are not appropriate to its use case. There are many ways to extend Wazo.

Currently, you can:

* Add dialplan files with hooks for each destination
* Add python code to extend the functionality of most services
* Add files to the system or install packages to get more features

One of the aspect that was still cruelly missing was a way to distribute and easily install those extensions. Having to download a zip file, extract it and copy files wherever they are required is not ideal, especially when it comes to removing an extension.

Wazo plugins will fill that gap.


# Meet wazo-plugind

Plugind is a service that we developed to help manage third party plugins as well as official plugins. At the moment we are using plugins to add features to the new administration interface, but in the future we will be able to ship complete features using plugins. We could still package and enable official features with our services, the way we always did, but we think that the only way to get a good and flexible plugin system that will be usable by the community is to use it ourselves.


# What is a plugin

Since there was already many ways to extend Wazo, one might ask, what is a plugin anyway? A plugin is a bundle of extensions that have been developed using already existing extension points.  For example, an extension to manage the followme module in asterisk could do the following things.

* Add a menu to the administration UI
* Add the dialplan to be able to use that feature
* Enable the asterisk module

What plugind does is wrap the plugin into a Debian package to be able to install, remove and eventually upgrade it without having to keep track of what you've done to your system. The requirements to build such a plugin will be covered in another post.


# What does plugind do?

If plugins are not part of plugind and plugins are Debian packages, what does plugind do then? Plugind makes operations on plugins available using a REST API. This makes operations available to the administration UI.

![admin_ui_plugins.png](../../images/blog/admin_ui_plugins.png "Interface example")

At the moment plugins can be:

* installed
* listed
* removed


# Plugin distribution

Plugin distribution is still in progress. Only plugins in a git repository accessible to wazo-plugind are installable at the moment. The plugin menu in the administration UI is a list of known available plugins. More ways to install will become available soon. One of them will be the market that will allow wazo-plugind to install a plugin without having to build it first.


# What's next?

The future versions of plugind will add more functionality to make the process of customizing your Wazo installation more enjoyable. We are going to add an interface to the application market to be able to list available applications and know if your installed version is the most recent. Dependencies between plugins, to be able to group many features into a single distribution. All PBXinaflash plugins could be installed as one package using a package depending on all of it's individual features.

We also hope that this system will help the community add and distribute features for the Wazo system independently from our development.
