---
sidebar_position: 2
id: wazo-plugind-admin-notes
title: Admin notes
description: wazo-plugind admin notes
slug: /wazo-plugind/admin-notes
---

## Docker

The official docker image for this service is `wazoplatform/wazo-plugind`.

### Getting the image

To download the latest image from the docker hub

```shell
docker pull wazoplatform/wazo-plugind
```

### Running wazo-plugind

```shell
docker run -e"XIVO_UUID=<the xivo UUID>" wazoplatform/wazo-plugind
```

### Building the image

Building the docker image:

```shell
docker build -t wazoplatform/wazo-plugind .
```
