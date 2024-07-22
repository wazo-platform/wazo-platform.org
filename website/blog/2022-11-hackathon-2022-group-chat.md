---
title: Building a Group Chat with Wazo
date: 2022-11-18 10:00:00
author: Francis Chartrand
category: Wazo Platform
tags: [hackathon, chat, websocket, solidjs]
slug: hackaton-2022-building-group-chat-with-wazo
status: published
---

## 2022 Hackathon

Every year, Wazo organizes a hackathon in the region of Quebec with all the members of the
engineering team. For us, the hackathon is a great way to do some team building and meet in real
life, since not everyone lives around Quebec City.

![banner cottage huard (small)](../static/images/blog/hackathon-2022/huard-cottage.jpg)
![front view cottage (small)](../static/images/blog/hackathon-2022/cottage-front-huard.jpg)
![rear view cottage lake (small)](../static/images/blog/hackathon-2022/cottage-from-lake.jpg)

## Kick-Off

One subject for the hackathon was to build a chat app powered by Wazo supporting: GIFs, emojis,
reactions on messages, files attachment and Markdown. Also behind the scene, we wanted to
[build a bridge between Wazo And Matrix](/blog/hackathon-2022-bridging-wazo-and-matrix) to explore
methods for integrating Wazo with third-party platforms.

[Jesse](https://github.com/sopelj), [Charles](https://github.com/DrPyser), [Francois](https://github.com/fblackburn1)
and I ([Francis](https://github.com/chartrandf)) teamed up to explore these ideas further.

## Working on Wazo-Platform to Support Group Chat and Reactions

### Support Multiple Recipients

Firstly, we needed to remove the hard limit of two members per room. This part was the easiest since
it’s a
[hardcoded condition set by us](https://github.com/wazo-platform/wazo-chatd/blob/master/wazo_chatd/plugins/rooms/http.py#L37-L40).
However, several questions would need to be addressed to make it production ready:

- How do we handle message history visibility when a new member is added to a conversation
- How to define max participants
- How to leave a conversation
- etc…

### Adding Reactions to Messages

We added a new table **chatd_room_message_reaction**. This table will be in charge of storing all
reactions added by a user to a message. Users can add as many emojis as they wants to a message, but
not the same twice.

```python
class RoomMessageReaction(Base):

    __tablename__ = 'chatd_room_message_reaction'

    message_uuid = Column(
        UUIDType(),
        ForeignKey('chatd_room_message.uuid', ondelete='CASCADE'),
        primary_key=True,
    )

    user_uuid = Column(UUIDType(), nullable=False, primary_key=True)

    emoji = Column(String(10))

    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        server_default=text("(now() at time zone 'utc')"),
        nullable=False,
    )
```

The second part, is to add real-time reactions in the chat, so we created two new events for this :

- `chatd_users_room_message_reaction_created`
- `chatd_users_room_message_reaction_deleted`

These events look like this and allow the app to add/remove the reactions to a
specific message in real-time.

```json
{
  "message_uuid": "a0e7dc92-92a3-485b-b8dd-09a909a1f5a0",
  "data": {
    "emoji": "🎉",
    "user_uuid": "8040ec9d-1a61-4ca3-abe5-ad7c2f192e03"
  }
}
```

#### Funny corner-case

At first, we added a limit of 1 character for the emoji column. But we figured out that some emojis
are more than one character. This is how variations for an emoji are handled ❤️🧡💛💚💙💜🤎🖤🤍.

## Building a UI Powered by Wazo Platform

![banner cottage huard (small)](../static/images/blog/hackathon-2022/group-chat/channel-markdown.jpg)
![front view cottage (small)](../static/images/blog/hackathon-2022/group-chat/create-room.jpg)
![rear view cottage lake (small)](../static/images/blog/hackathon-2022/group-chat/emoji-picker.jpg)

For the UI part, we used the [SolidJS](https://www.solidjs.com/) reactive library and our SDK
[wazo-js-sdk](https://github.com/wazo-platform/wazo-js-sdk). Building the UI was quite
straightforward since our SDK handled token creation and allowed us to use the preconfigured
WebSocket Client.

### Live Chat Logic

A Group Chat is mainly HTTP Requests and WebSocket listeners. Here’s the HTTP Request that we need
to make in the app:

```javascript
import getApiClient from '@wazo/sdk/lib/service/getApiClient';

const client = getApiClient('hostname.example');

// On page load, we fetch rooms for the current user
const rooms = await client.chatd.getUserRooms();

// On room load, we fetch previous message in a room
const messages = await client.chatd.getRoomMessages(ROOM_UUID);

// On form submit, we send the new message to chatd services
await client.chatd.sendRoomMessage(ROOM_UUID, {
  content: 'The new message content',
  alias: 'Alias/Name of the member',
});
```

The second part is about listening to WebSocket messages. We used the wazo-js-sdk WebSocket client.
Here are the events that we listened to :

```javascript
// Initialize websocket client
import { WazoWebSocketClient } from '@wazo/sdk';

const ws = new WazoWebSocketClient({
  host,
  token: response.token,
  events: [
    'chatd_user_room_message_created',
    // Other events to listen
  ],
  version: '2',
});

// Main events to listen
ws.on('chatd_user_room_message_created', message => {
  // Listen for "room message created" events
  // - Validate the message is in the displayed room
  // - Add message to all messages
  //
  // Message Payload Example:
  // {
  //   room_uuid: "697a35a6-534c-461d-9466-6f77d0181e80",
  //   data: {
  //     content: 'The new message content',
  //     alias: 'Alias/Name of the member',
  //     created_at: '2022-10-24T15:50:00.000000+00:00',
  //     user_uuid: '8040ec9d-1a61-4ca3-abe5-ad7c2f192e03',
  //     uuid: 'a0e7dc92-92a3-485b-b8dd-09a909a1f5a0',
  //   }
  // }
});

ws.on('chatd_user_room_created', message => {
  // Listen for "room created" events
  // - Add new room to the listing
  //
  // Message Payload Example
  // {
  //   uuid: '6f9c7df4-8529-4336-9b65-21ceec774583'
  //   name: 'New Room Name',
  //   tenant_uuid: '47e1a830-cb3a-4ac9-9117-82acbb54d72b',
  //   users: [
  //     {
  //       tenant_uuid: '5d5e7e18-46ae-4046-beda-3cdcd5449142',
  //       uuid: '551d06a1-808a-417d-995d-7abb66d55c33',
  //     },
  //     // Other users
  //   ]
  // }
});
```

### The Hardest Parts of a Group Chat Application

We found that the most challenging parts of a group chat application are :

- Creating a feature-rich interface. We may have not realized it at first, but chat apps are
  powerful tools with a lot of shortcuts. For example: editing previous messages, switching
  to new channels, aliases in messages (@mention, emoji syntax `:smile:`, link detection, etc.).
- More complex features and settings are common as well: threads, notifications, participant
  management, privacy settings, etc.

## Conclusion

The hackathon was a great opportunity for us to work closely with our colleagues and try new
technologies. It also gives us a good idea about what is missing and how much effort would be
required to implement and deploy these features

### Code reference: show me the code

All our code created during the hackathon is open-source. Dive in and ask us questions on our
[public Mattermost](https://mm.wazo.community/wazo-platform/).

- [SolidJS Group Chat](https://github.com/wazo-platform/hackathon-group-chat-2022)
- [Matrix Bridge](https://github.com/wazo-platform/hackathon-2022-mautrix-wazo)
