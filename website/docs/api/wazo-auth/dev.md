---
sidebar_position: 2
id: wazo-auth-dev-notes
title: Dev notes
description: wazo-auth dev notes
slug: /wazo-auth/dev-notes
---

### Running unit tests

```shell
apt update
apt install libldap2-dev libpq-dev python-dev libffi-dev libyaml-dev libsasl2-dev
pip install tox
tox --recreate -e py27
```

## Running integration tests

You need Docker installed.

```shell
cd integration_tests
pip install -U -r test-requirements.txt
make test-setup
make test
```
