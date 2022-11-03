---
title: Live Conversation Transcript
date: 2020-01-03
author: Pascal Cadotte Michaud
category: Wazo Platform
tags: wazo-platform, asterisk, stt, astricon
slug: live-transcript-demo-astricon-19
status: published
---

# Live Conversation Transcript

At Astridevcon 2018, the developer conference that happens just before Astricon
every year, there was a lot of interest around the streaming of audio outside of
Asterisk. During the following year, we decided to tackle that problem and see
what we could come up with.

During a Hackaton in January 2019, we developed an Asterisk module that adds a
way to connect to the Asterisk websocket and receive the audio from the selected
channel over the websocket. The code for that module can be found
[here](https://github.com/sboily/wazo-hackathon-asterisk-stream-module).

At Astricon 2019 we presented that module. Unfortunately, the presentations at
Astricon have not been recorded. This article will get you started playing with
our Asterisk module.


## Motivation

Being able to stream audio out of Asterisk can be used to solve a variety of
problems. The obvious reason is to get a transcript of your call. Audio is
expensive to store, hard to search and hard to index. It can also be used for
fraud detection, call prioritization in call centers or to route a call in an IVR.


## The Solution

The module we developed is pretty simple. When connecting to the Asterisk
websocket, you specify the channel you wish to connect to using the `Channel-ID`
header and the `stream-channel` sub-protocol. At that point you will start
receiving audio in 16 bits signed linear PCM format (a.k.a SLIN16).


## Usage

The equivalent of a "hello world" for that feature is to write the audio stream to a
file. Here's a commented Python snippet that does just that.

```python
import websocket
import sys

with open("out.wav", "wb") as f:  # Open the output file
    ws = websocket.WebSocketApp(
        "ws://localhost:5039/ws",  # Connects to the Asterisk Web Socket
        on_message=lambda ws, msg: out.write(msg), # Add a callback to write incoming messages to the file
        on_error=lambda ws, error: print(error),  # Add a callback to print all errors
        on_close=lambda ws: print("### closed ###"),  # Add a callback to see when the Web Socket gets closed
        subprotocols=["stream-channel"],  # Select the "stream-channe" sub-protocol
        header=["Channel-ID: " + sys.argv[1]],  # Use the first command line argument to specify the channel
    )
    ws.run_forever()  # Listen on that Web Socket
```

This could hardly get any simpler.

As the consumer of the data you can then leverage external tools to do what you
want with that audio stream: you can send it to a Speech-To-Text engine but you
can also record it for later use, or analyze it to find voice quality issues, for example.

Have a look to my [presentation
slides](https://www.slideshare.net/PascalCadotteMichaud/getting-a-livetranscriptofyourcallusingtheari)
for a comparison between existing solutions for streaming audio from Asterisk.


## Resources

* [Slides](https://www.slideshare.net/PascalCadotteMichaud/getting-a-livetranscriptofyourcallusingtheari) from my Astricon presentation
* Our Asterisk [module](https://github.com/sboily/wazo-hackathon-asterisk-stream-module)
