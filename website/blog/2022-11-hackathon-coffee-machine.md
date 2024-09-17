---
title: Hackathon 2022 - The Virtual Coffee Machine
date: 2023-01-19 12:00:00
authors: sduthil
category: Hackathon
tags: [web, plugin, coffee, machine, app]
slug: hackathon-2022-virtual-coffee-machine
status: published
---

Like every year, the Wazo hackathon was the occasion to try something new. There were various teams building in various directions, our team said "What if we made a virtual coffee machine? How far can we push Wazo to accomodate specific workflows?"

Our team was composed of [Sylvain Boily](https://github.com/sboily), tinkerer of Doom and founder of Wazo, [Jean-François Gauthier](https://github.com/bogue), able to hide the most dreadful hacks behind delightful UIs and [Sébastien Duthil](https://github.com/sduthil), Wazo's puppet master.

We used the commercial Wazo application to create the Coffee Machine The app usually looks like this:

![wazo-app.svg](../static/images/blog/hackathon-2022/wazo-app.svg 'Wazo app screenshot, showing a mosaic of video streams of conference participants')

<!-- truncate -->

And without further ado, the Coffee Machine looks like this:

![coffee-machine-screenshot.png](../static/images/blog/hackathon-2022/coffee-machine.png "Coffee machine screenshot, showing a list of participant names and durations, a button 'Have a SIP!', and a music player on the right, over a comforting coffee cup image on the background")

The concept is simple: when people working remotely need a break, they make themselves some coffee (in their own kitchen, Wazo does not make coffee yet) and join a common conference room by clicking the "Have a SIP" button. They can see who is already in the conference before they join in. The music player on the top right adds some nice lounge music to the room. An extra button on the left side menu bar allows entering the Coffee Machine.

But here's the best part: our team did not change a single line of code in the Wazo application to get this result. This page was built as a plugin to the Wazo app and the UI is hosted on a different server than the main Wazo app, and all features use the Wazo server API to get the audio working.

Here's how it works in a nutshell:

- the browser loads the Wazo app
- the browser fetches the list of enabled plugins from the Wazo server
- the browser fetches the manifests of each plugin, detailing what to add and where to get the additional UI and code from
- the browser fetches the additional UI elements and code from the server hosting the plugin
- the browser runs the plugin code and displays the plugin UI

Same thing, as a diagram:

![wazo-app-plugin.svg](../static/images/blog/hackathon-2022/wazo-app-plugin.svg 'Flow diagram of the previous explanation')

For the Coffee Machine we needed a few extra API in the Wazo server to add the plugin-specific logic we could not handle in the browser: music start and pause, music volume, relaying server events to a plugin-specific WebSocket. Those APIs were also added in the form of a server plugin.

The code of the Coffee Machine plugin can be found on [Github](https://github.com/TinxHQ/hackathon-coffee). This is only an example of what Wazo can do, and keep in mind that it was written in only a few hours, so it may not be the cleanest code ever...

Curious how our enterprise's SDK enable customization for our apps easily? Take a look at our [plugin documentation](https://developers.wazo.io/docs/plugins/ui/get-started/).
