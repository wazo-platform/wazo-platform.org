---
title: REST API Troubleshooting
---

- [Swagger UI: Can\'t read from server\...](#swagger-ui-cant-read-from-server...)
  - [Problem](#problem)
  - [Answer](#answer)

Here is a list of common problems you can encounter with Wazo REST APIs.

# Swagger UI: Can\'t read from server\...

## Problem

When trying to access Swagger UI via `http://wazo/api`, I get:

    Can't read from server. It may not have the appropriate access-control-origin settings.

## Answer

This is a very generic error message from Swagger UI. It can have a variety of causes, most
commonly:

- the HTTPS certificate of the API you\'re trying to get is not trusted
- the daemon that serves the API is not running

What you can do:

- check that the Swagger API spec is accessible: when choosing an API in the Swagger menu,
  copy-paste the URL of the top text box ending with `api.yml` into your browser.
- check the HTTP requests/answers in your browser debugging tools
- check that the daemon is running: in a console, type: `wazo-service status`
- check the log files of the daemon in `/var/log/<daemon>.log` (see also:
  [Log Files](/uc-doc/system/log_files))
