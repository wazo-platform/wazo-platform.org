---
Title: Hackathon 2022 - Bridging Wazo and Matrix
Date: 2022-10-20 12:00:00
Author: Jesse Sopel
Category: Hackathon
Tags: Chat, Python, Matrix, Bridge, Hackathon
Slug: hackathon-2022-bridging-wazo-and-matrix
Status: published
---

Every year Wazo organizes a Hackathon with their employees, and as many of us as possible get together to work on some fun projects and see what we can learn.
There were multiple teams working on different projects. Our team consisted of Charles, Francis, Francois and I (Jesse).
We decided to both work on creating a bridge between Wazo's built-in chat system and a Matrix server, as well as [testing out adding some new features to the existing chat](https://wazo-platform.org/blog/hackaton-2022-building-group-chat-with-wazo), but this article is focused on the former.

## The Objective

The goal was to create a bidirectional bridge between Wazo's [Chatd](https://wazo-platform.org/documentation/overview/chat.html) and a [Matrix](https://matrix.org/) Homeserver.

A user that exists on both platforms can have the two accounts mapped to each other, but in case they do not exist or have no account configured in the bridge, then "puppet" accounts should be created for them. This allows the Matrix user to chat with any user on Wazo as if they were using it directly. This is known as a [Double Puppeting](https://matrix.org/docs/guides/types-of-bridging#double-puppeted-bridge). Now, we didn't quite get there, but we made some good progress and learned some new things.

## Technologies/Libraries used

- [Chatd](https://wazo-platform.org/documentation/overview/chat.html)- Chat messages
- [Webhookd](https://wazo-platform.org/documentation/overview/webhook.html) - Listen for messages and forward to bridge
- [Confd](https://wazo-platform.org/documentation/overview/configuration.html) - Get user information
- [Matrix Synapse](https://matrix.org/docs/projects/server/synapse) - The Matrix homeserver
- [Mautrix](https://github.com/mautrix/python) - Library for the bridge
- [aiohttp](https://docs.aiohttp.org/en/stable/)  - API calls and server for webhooks
- [python markdown](https://python-markdown.github.io/)  - Rendering Markdown text to HTML

In order to create the bridge we decided to use the [Mautrix](https://github.com/mautrix/python) Library since it is very feature complete, written in Python, and they have many well established bridges already. We spent a lot of time looking through the library and looking at the other implementations to figure out how we might do something similar for Wazo. Then we created the base structure of the project and the models needed to store information about the users, puppets and groups in order to create a mapping between the two systems.

## Step 1: Understanding, planning and the database

Our first step, but to figure out how Mautrix works. Their bridges are very feature rich, but we were unable to find much documentation for the actual library, so we needed to spend a lot of time reading the library code and looking at other bridges to figure out how they worked. Also, lots of testing was needed. Then we needed to make the Database models for the different items that need to be saved in the bridge, such as Wazo-Matrix mappings for users and groups. Typically, we use PostgreSQL, but for our test we simply used sqlite because it required less configuration and it would be easier to copy the database around for our tests.

## Step 2: Bridge Wazo to Matrix

In order to test something, we needed at least one direction to work. So we started with the Wazo side. We needed to know as soon as a message was sent to our user so we could create the groups/users and forward the message to Matrix. To do this, we created a small HTTP server using aiohttp and set up a webhook with Webhookd. The webhook listens for a new message event in chatd and then posts the message information to a URL that our bridge exposes. When the message content is received the bridge checks to whom the message is being sent. If the users are not already in the bridge and Matrix, then it must create them and the room. The user of Matrix receives an invite to the new room which contains puppeted users. Once the room and users already exist, the bridge simply forwards the new messages to the correct group in Matrix.

## Step 3: Different message formats

Parallel to the bridge, we were also working on supporting new types of content in chatd such as Markdown, emoji, files and reactions. ([You can read about that here](https://wazo-platform.org/blog/hackaton-2022-building-group-chat-with-wazo)). The Matrix protocol already supports these things as does the client we were using (Element). In order to support Markdown, we simply used a python library python-markdown to render the text into HTML and send that as the `formatted_body` to Matrix. This allowed for rich text content such as lists, tables, bold, italic, strike-through, embedded images and more. As for emoji, since they are simply unicode characters, no special logic was needed. However, sadly, we did not have time to add reactions or file handling to the bridge during the event.

## Step 4: Bridge Matrix to Wazo

The next step would have been to send the messages written in Matrix to chatd via the API. We got fairly far along on this, but sadly did not complete it in time, so it was not functional for our demo and the bridge remained one-sided. So any messages written in chatd were correctly received in the Matrix client, but it was not possible to respond in the client.

## Possible improvements

A side from simply completing the other side of the bridge there are many other things we wanted to add. We also wanted to handle files and other media content as well as reactions. The Mautrix library also has tools for using chatbots to perform the initial configuration and authentication of bridged users, which would have been ideal. In our case, it was simply configured in the config file.
Nonetheless, it was a very interesting project.

## What we learned

We learned a lot about how Mautrix works and, more generally, the things we could do with a bridge. All platforms are a bit different and provide different tools for linking them to other services, but in a lot of cases it is possible to do something like this to allow for different platforms to be linked together. It's always nice when you can make platforms work together.

We also got a lot of ideas of things that it would be nice to add to improve chatd, maybe sometime in the future.

The code for the bridge is [located here](https://github.com/wazo-platform/hackathon-2022-mautrix-wazo), but keep in mind it was just a test for the Hackathon and is not fully functional.
