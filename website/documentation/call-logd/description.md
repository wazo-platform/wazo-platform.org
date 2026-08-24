# [`call-logd`](https://github.com/wazo-platform/wazo-call-logd)

Collect metadata on calls made on a Wazo Platform, allowing users to see their calls' history.

This is service accessible via REST API.

## Schema

```mermaid
C4Container
    Container(asterisk, "Asterisk", "C", "Back2Back Agent")
    Container(amid, "wazo-amid", "Python", "")

    System_Boundary(call_logd_platform, "Call-logd application") {
        Container(call_logd, "wazo-call-logd", "Python", "Call-log service")
        Container(db, "Postgresql", "C", "Database")
        Container(bus, "RabbitMQ", "Erlang", "Messaging Bus")
        Container(auth, "wazo-auth", "Python", "Authentication service")
    }

    Person(User, "User")

    Rel(amid, bus, "Push events", "AMQP")
    Rel(amid, asterisk, " ")
    Rel(asterisk, db, "Push raw call logs", "SQL")
    Rel(call_logd, db, "Push and Fetch call-log", "SQL")
    Rel(call_logd, bus, "Publishs and Recevied internal events", "AMQP")
    Rel(call_logd, auth, "Authenticates", "REST")
    Rel(User, call_logd, "Retrieves call history", "REST")
```

## Usage example

```mermaid
sequenceDiagram
    actor Alice
    participant Asterisk
    participant postgres
    participant amid
    participant bus
    participant call_logd
    participant websocketd

    Alice->>Asterisk: Hangup Call
    Asterisk->>postgres: Store Channel Events Logging (CELs)
    Asterisk->>amid: Push event:LINKEDID_END
    amid->>bus: Publish event:LINKEDID_END internally
    bus->>call_logd: Received event:LINKEDID_END
    call_logd->>postgres: Retrieve all CELs linked with LINKEDID_END through the CELID
    call_logd->>call_logd: Transforms CELs in Call Log
    call_logd->>postgres: Store Call Log
    call_logd->>bus: Publish call_logs_created event with the new Call Log
    bus->>websocketd: Transfert call_logs_created event
    websocketd->>Alice: Receive call_logs_created event
```

## API documentation

The REST API for wazo-call-logd is available [here](../api/cdr.html)

## Related

* [wazo-auth](https://github.com/wazo-platform/wazo-auth)

## See also

* [Admin notes](cdr-admin.html)
