---
sidebar_position: 2
id: wazo-agentd-dev-notes
title: Dev notes
description: wazo-agentd dev notes
slug: /wazo-agentd/dev-notes
---

## Running unit tests

```
apt-get install libpq-dev python3-dev libffi-dev libyaml-dev
pip install tox
tox --recreate -e py311
```

## Docker

The official docker image for this service is `wazoplatform/wazo-agentd`.

### Getting the image

To download the latest image from the docker hub

```shell
docker pull wazoplatform/wazo-agentd
```

### Running wazo-agentd

```shell
docker run wazoplatform/wazo-agentd
```

### Building the image

Building the docker image:

```shell
docker build -t wazoplatform/wazo-agentd .
```
