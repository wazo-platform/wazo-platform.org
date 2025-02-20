---
title: Paging
---

With Wazo, you can define paging (i.e. intercom) extensions to page a group of users. When calling a
paging extension, the phones of the specified users will auto-answer, if they support it.

You can manage your paging with `/pagings` endpoints(see
[API Reference](/documentation/api/configuration.html#tag/pagings)).

When adding a new paging extension, the number can be any numeric value; to call it, you just need
to prefix the paging number with `*11`.

An Announcement sound file may be specified using the `announce_sound` attribute in the create
request payload.  
The sound file must be present in a tenant-specific directory
`/var/lib/wazo/sounds/tenants/<tenant_uuid>/playback/`(where `<tenant_uuid>` is the UUID of the
tenant, which can be obtained using `wazo-auth-cli tenant list`).
