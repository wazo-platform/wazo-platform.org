---
title: CSV Migration
---

-   [CSV Data](#csv-data)
-   [Field names](#field-names)

This page describes how to migrate CSV files from the legacy format to
the new format. Consult the [API
documentation](http://api.wazo.community) on user imports for further
details.

CSV Data
========

> -   Only data encoded as UTF-8 will be accepted
> -   The pipe delimiter (`|`) has been replaced by a comma (`,`)
> -   Double-quotes (`"`) must be escaped by writing them twice (e.g
>     `Robert ""Bob"" Jenkins`)

Field names
===========

Fields have been renamed in the new CSV format. Use the following table
to rename your fields. Fields marked as **N/A** are no longer supported.

>   ----------------------------------------------------
>   Old name               New name
>   ---------------------- -----------------------------
>   entityid               entity\_id
>
>   firstname              firstname
>
>   lastname               lastname
>
>   language               language
>
>   outcallerid            outgoing\_caller\_id
>
>   mobilephonenumber      mobile\_phone\_number
>
>   agentnumber            **N/A**
>
>   bosssecretary          **N/A**
>
>   callerid               **N/A**
>
>   enablehint             supervision\_enabled
>
>   enablexfer             call\_transfer\_enabled
>
>   enableclient           cti\_profile\_enabled
>
>   profileclient          cti\_profile\_name
>
>   username               username
>
>   password               password
>
>   phonenumber            exten
>
>   context                context
>
>   protocol               line\_protocol
>
>   linename               sip\_username
>
>   linesecret             sip\_secret
>
>   incallexten            incall\_exten
>
>   incallcontext          incall\_context
>
>   incallringseconds      incall\_ring\_seconds
>
>   voicemailname          voicemail\_name
>
>   voicemailnumber        voicemail\_number
>
>   voicemailcontext       voicemail\_context
>
>   voicemailpassword      voicemail\_password
>
>   voicemailemail         voicemail\_email
>
>   voicemailattach        voicemail\_attach\_audio
>
>   voicemaildelete        voicemail\_delete\_messages
>
>   voicemailaskpassword   voicemail\_ask\_password
>   ----------------------------------------------------
