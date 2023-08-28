---
title: Asterisk Voicemail
---

## Query

```markdown
GET /delete_voicemail
```

## Parameters

- `name`: the voicemail name
- `context`(optional): the voicemail context (default is `ctx-<tenant slug>-internal-<UUID>`)

## Errors {#rest-api-errors}

| Error code | Error message | Description                  |
| ---------- | ------------- | ---------------------------- |
| 404        | Not found     | The voicemail does not exist |

## Example requests

```
GET /delete_voicemail HTTP/1.1
Host: wazoserver
Accept: application/json
```

## Example response

```
HTTP/1.1 200 OKi
Content-Type: application/json
{
    nothing
}
```
