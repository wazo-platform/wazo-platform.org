# [`websocketd`](https://github.com/wazo-platform/wazo-websocketd)

WebSocket server that delivers Wazo Platform-related events to clients.

This ease in building dynamic web applications that are using events from your Wazo.

## Schema

```mermaid
C4Container
    System_Boundary(websocketd_platform, "Websocketd application") {
        Container(websocketd, "wazo-websocketd", "Python", "Websocketd service")
        Container(bus, "RabbitMQ", "Erlang", "Messaging Bus")
        Container(auth, "wazo-auth", "Python", "Authentication service")
    }

    Person(User, "User")

    Rel(User, websocketd, "Receives events", "REST")
    Rel(websocketd, bus, "Receives Wazo platform events", "AMQP")
    Rel(websocketd, auth, "Authenticates", "REST")
```

## Usage example

```mermaid
sequenceDiagram
    participant User
    participant websocketd
    participant auth
    participant rabbitmq

    User->>websocketd: Send token
    websocketd->>auth: Validate token
    auth-->>websocketd: send acl list

    User->>websocketd: Subscribe event
    User->>websocketd: Subscribe event
    User->>websocketd: Start events emission

    rabbitmq->>websocketd: Receive event
    websocketd->>websocketd: Check ACL and filter event
    websocketd->>User: Send event
```

## See also

* [Dev notes](websocket-app.html)
