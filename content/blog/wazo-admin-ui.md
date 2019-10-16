Title: The new web interface of Wazo
Date: 2017-05-11
Author: The Wazo Authors
Category: Wazo
Slug: wazo-admin-ui
Status: published

Wazo 17.07 is the first release embedding the future replacement of the administration web interface of Wazo.

The current admin interface of Wazo is aging, and its internal design is significantly slowing down the development of other components. We've been extracting logic from this admin interface in the last years into REST APIs, and we're now confident enough that we can start a much lighter version of the admin interface, entirely supported by the REST APIs.

So, you can try this admin interface by visiting `https://<wazo_ip>/admin`.

# Login

Once you enter the same credentials as the other admin interface, you'll see a small Plugins menu on the left: this is where you choose what you want to see in the admin interface: no more frighteningly long list of menus, you can select only what you need.

![login.png](/images/blog/wazo-admin-ui/login.png "Login screenshot")

# Plugins

![plugins.png](/images/blog/wazo-admin-ui/plugins.png "Plugins screenshot")

The recommended minimal plugins at this time are:

- Users
- Extensions
- Contexts
- Devices

We intend to allow third-party developers to create their own plugins for Wazo, so that features are not restricted by the core team. We will also setup a global market of plugins, so that people can share their plugins.

# New features

This new admin interface also brings its share of features, that were only available via the REST APIs until now, but were too costly to integrate into the current admin interface.

## Users with multiline

REST API released in 16.10

Until now, users created with the admin interface could only have one line, and one device... The new form for users allows you to add multiple lines to the same user, so that multiple devices ring at the same time, or to mix web-based phones (WebRTC), software phones and conventional physical phones. This kind of setup required the use of call groups, which brought its share of pain for integrators, and multi-line users was a recurrent need.

![user-list.png](/images/blog/wazo-admin-ui/user-list.png "User list screenshot")
![user-edit.png](/images/blog/wazo-admin-ui/user-edit.png "User screenshot with multiple lines")

## IVR

REST API released in [16.16](sprint-review-1616)

Another feature request we've heard often is a graphical form to create simple IVR... Here it is:

![ivr.png](/images/blog/wazo-admin-ui/ivr.png "IVR screenshot")

## Parking lots

REST API released in [17.01](sprint-review-1701)

Parking lots is the same feature as the previous parking: put an incoming call on hold in a defined extension, so that someone else can pick up the incoming call later. Except that we can now have multiple ranges of extensions: there was previously only one range (default was 701-749), and we can now create multiple ranges.

![parking_lot-edit.png](/images/blog/wazo-admin-ui/parking_lot-edit.png "Parking Lot Screenshot")

## CDR

REST API released in [17.06](sprint-review-1706)

The current interface is really insufficient for reading call logs: there was only a small CSV file with very few details that is quite hard to query, when looking for a specific call. The CDR plugin brings a clearer view of call logs.

![cdr.png](/images/blog/wazo-admin-ui/cdr.png "CDR screenshot")

# Limitations (as of 17.07)

The new admin interface is not yet ready to completely replace the current admin interface, and is still in active development. You may encounter weird behaviors or missing features. Here are the main limitations:

- You should not use any plugin without the Extensions and Contexts plugins, because you will be missing very useful guides for selecting valid extensions and contexts. Dependencies between plugins should be added.
- Parking lots will not show any already configured parking, because the underlying system is totally different. A future automatic migration should take care of this.
- The switchboard plugin will not show any already configured switchboard, because the underlying system is totally different. And there is no working operator interface for those kinds of switchboards as of yet.
- The Outcalls and Trunks plugins are not yet usable.
- The Voicemails form is not usable yet, but the plugin is useful for setting up voicemail destination on IVR for example.
- Plugins are not replicated on a High Availability setup.

# Technicals

The new admin interface is built with Python, Flask, WTForms, Admin-LTE, Bootstrap.
The plugin system uses the underlying Debian package system, that offers some guarantees about consistency and conflict detection.
