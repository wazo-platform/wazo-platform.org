---
subtitle: Categories
title: Music on Hold
---

Available categories are:

- files: play sound files. Formats supported:

  ***

  Format Name Filename Extension

  ***

  G.719 .g719

  G.723 .g723 .g723sf

  G.726 .g726-40 .g726-32 .g726-24 .g726-16

  G.729 .g729

  GSM .gsm

  iLBC .ilbc

  Ogg Vorbis .ogg (only mono files sampled at 8000 Hz)

  G.711 A-law .alaw .al .alw

  G.711 μ-law .pcm .ulaw .ul .mu .ulw

  G.722 .g722

  Au .au

  Siren7 .siren7

  Siren14 .siren14

  SLN .raw .sln .sln12 .sln16 .sln24 .sln32 .sln44 .sln48 .sln96 .sln192

  VOX .vox

  WAV .wav .wav16

  WAV GSM .WAV .wav49

  ***

  Only 1 audio channel must be present per file, i.e. files must be in mono.

  If your music on hold files don't seem to work, you should look for errors in the asterisk logs.

  The on-hold music will always play from the start.

- mp3: play MP3 files.

  #:warning: The mp3 mode is deprecated and you should not use it. Instead, you should convert your
  MP3 files to another format and use the "files" mode.

  The on-hold music will play from an arbitrary position on the track, it will not play from the
  start.

- custom: do not play sound files. Instead, run an external process. That process must send on
  stdout the same binary format than WAV files.

  Example process:
  `/usr/bin/mpg123 -s --mono -y -f 8192 -r 8000 http://streaming.example.com/stream.mp3`{.sourceCode}

  #:exclamation: Processes run by custom categories are started as soon as the category is created
  and will only stop when the category is deleted. This means that on-hold music fed from online
  streaming will constantly be receiving network traffic, even when there are no calls.
