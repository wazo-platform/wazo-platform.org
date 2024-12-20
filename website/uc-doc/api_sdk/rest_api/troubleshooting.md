---
title: Troubleshooting
---

Here is a list of common problems you can encounter with Wazo REST APIs.

## API Console: Failed to load API definition...

### Problem

When trying to access to the API Console via `https://wazo-platform.org/documentation`, I get:

```markdown
Failed to load API definition.

Errors Fetch error Failed to fetch https://<stack_ip>/api/confd/1.1/api/api.yml Fetch error Possible
cross-origin (CORS) issue? The URL origin (https://<stack_ip>) does not match the page
(https://wazo-platform.org). Check the server returns the correct 'Access-Control-Allow-\*' headers.
```

### Answer

This is a very generic error message from Swagger UI. It can have a variety of causes, most
commonly:

- the HTTPS certificate of the API you're trying to get is not trusted
- the daemon that serves the API is not running

What you can do:

- check that the OpenAPI spec is accessible: when choosing an API Console, copy-paste the both parts
  (IP + .../api.yml) of the URL of the top text boxes into your browser.
- check the HTTP requests/answers in your browser debugging tools
- check that the daemon is running: in a console, type: `wazo-service status`
- check the log files of the daemon in `/var/log/<daemon>.log` (see also:
  [Log Files](/uc-doc/system/log_files))
