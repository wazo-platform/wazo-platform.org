---
subtitle: Status
title: Status check
---

- [Query](#query)
- [Example request](#example-request)
- [Example response](#example-response)

# Query

    GET /status_check

# Example request

    GET /status_check HTTP/1.1
    Host: wazoserver
    Content-Type: application/json

# Example response

    HTTP/1.1 200 OK
    Content-Type: application/json
    {
        "status": "up"
    }
