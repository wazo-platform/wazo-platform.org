---
title: Meetings
---

## Purpose

A Meeting allows Wazo Platform users to get in conference with other people that are not using Wazo
directly. In other words, Wazo Platform users can create meetings and give a Web URL to anybody to
join them in a Web conference.

## Prerequisites

To achieve this feature, there are some prerequisites:

* Wazo Platform server 21.14 or above
* A web application for Wazo users
* A web application for external users (can be the same as for Wazo users)
* A HTTP Ingress configured on the server: that is the public address of the Wazo Platform server
  that will be given to external users to contact your server:
  
  ```http
  POST https://wazo.example.com/api/confd/1.1/ingresses/http
  Wazo-Tenant: 74f8a451-2b38-4b74-bdfe-8137688cc1e5
  
  {
    "uri": "https://wazo.example.com"
  }
  ```
* For video meetings, you need to enable `video_mode=sfu` in the global conferences bridge settings:

  ```http
  PUT https://wazo.example.com/api/confd/1.1/asterisk​/confbridge​/wazo_default_bridge
  
  {
    ...
    "video_mode": "sfu",
    ...
  }
  ```

## Use case

Wazo Platform user Alice wants to talk with her friend Ethan, who does not use Wazo Platform.

The sequence will look like:

![Sequence Diagram](/images/uc-doc/administration/meetings.svg)

1. Alice creates a Meeting:

   ```http
   POST https://wazo.example.com/api/confd/1.1/users/me/meetings
   
   {
     "name": "Meeting with Ethan"
   }
   ```

1. Alice then gets the following information to share with Ethan:

   * The Meeting UUID
   * The Wazo Platform server public URI
   * SIP credentials to place a call on the Wazo Platform server

1. Alice's application then encodes those information into a single Web URL, showing the resulting URL
to Alice.

1. Alice then calls the Meeting to wait for Ethan, by calling the extension
`wazo-meeting-21142baa-4318-4d80-a93f-c403a47192b5` (`2114...` being the Meeting UUID).

1. Alice may then share the Web URL with Ethan, so that Ethan can join Alice in the conference.

1. Ethan opens the Web URL, opening a web application. The web application can then call the Meeting
with WebRTC, by using the SIP credentials and calling the extension `meeting-guest`.

1. Alice now sees Ethan in the conference and they can enjoy their time together.

1. Once they are done, Alice can delete the Meeting:

  ```http
  DELETE https://wazo.example.com/api/confd/1.1/users/me/meetings/21142baa-4318-4d80-a93f-c403a47192b5
  ```

## Other scenarios

* Any meeting is automatically deleted 48h after its creation. Any participant still present in the
  Meeting at this time will be hungup.
* The meetings can be used by any SIP phone. However, the SIP device needs to be able to dial
  non-digit extensions like `meeting-guest`.

## Limitations

* Meetings are limited to 100 participants at a time
