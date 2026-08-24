# [`chatd`](https://github.com/wazo-platform/xivo-chatd)

Add messaging functionality, as well as devices and users presence for a Wazo Platform.

This is service accessible via REST API.

## Schema

```mermaid
C4Container
    System_Boundary(chatd_platform, "chatd application") {
        Container(chatd, "wazo-chatd", "Python", "Presentiel and Chat service")
        Container(db, "Postgresql", "C", "Database")
        Container(bus, "RabbitMQ", "Erlang", "Messaging Bus")
        Container(auth, "wazo-auth", "Python", "Authentication service")

        Container(amid, "wazo-amid", "Python", "")
        Container(confd, "wazo-confd", "Python", "")
    }

    Person(User, "User")

    Rel(chatd, amid, "Get phone status", "REST")
    Rel(chatd, confd, "Get user list", "REST")
    Rel(chatd, auth, "Get sessions", "REST")
    Rel(User, chatd, "Retrieves presences", "REST")
    Rel(chatd, db, " ", "SQL")
    Rel(chatd, bus, "Publishs and Recevied internal events", "AMQP")
    Rel(chatd, auth, "Authenticates", "REST")
```

## Usage example

```mermaid
sequenceDiagram
    actor Alice
    participant asterisk
    participant amid
    participant bus
    participant chatd
    participant websocketd
    actor Bob

    Alice->>asterisk: compose *10

    opt Internal events
        asterisk-->>amid: Event DeviceStateChange<br/>name: PJSIP/alice<br/>state: ringing
        amid-->>bus: Event DeviceStateChange<br/>name: PJSIP/alice<br/>state: ringing
        bus-->>chatd: Event DeviceStateChange<br/>name: PJSIP/alice<br/>state: ringing
    end

    opt Wazo platform events
        chatd->>bus: Event Presence Alice
        bus-->>websocketd: Event Presence Alice
        websocketd->>Bob: Event Presence Alice
        websocketd->>Alice: Event Presence Alice
    end
```
```mermaid
sequenceDiagram
    actor Alice
    participant chatd
    participant bus
    participant websocketd
    actor Bob

    Alice->>chatd: Create a room<br/>POST /users/me/rooms<br/>{users:[#lt;uuid:bob#gt;]}
    chatd-->>Alice: ​
    Alice->>chatd: Create a message<br/>POST /users/me/rooms/#lt;uuid#gt;/messages
    chatd-->>bus: Publish message<br/>as Wazo platform event
    bus-->>websocketd: Relay message

    websocketd->>Bob: Receive message
```

## API documentation

The REST API for wazo-chatd is available [here](../api/chat.html)

## Related

* [wazo-amid](https://github.com/wazo-platform/wazo-amid)
* [wazo-confd](configuration.html)
