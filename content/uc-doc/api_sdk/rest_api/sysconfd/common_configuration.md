---
title: Common configuration
---

- [Apply configuration](#apply-configuration)
  - [Query](#query)
- [Generate configuration](#generate-configuration)
  - [Query](#query-1)
- [Change ownership of the Asterisk autoprov configuration files](#change-ownership-of-the-asterisk-autoprov-configuration-files)
  - [Query](#query-2)
  - [Example:](#example)

# Apply configuration

## Query

    GET /commonconf_apply

# Generate configuration

## Query

    POST /commonconf_generate

# Change ownership of the Asterisk autoprov configuration files

## Query

    POST /exec_request_handlers

     {"chown_autoprov_config": "foo"}

## Example:

```{.sourceCode .sh}
curl -X POST -H 'Content-Type: application/json' "http://localhost:8668/exec_request_handlers" -d '{"chown_autoprov_config": "foo"}'
```
