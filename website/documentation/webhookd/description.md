# [`webhookd`](https://github.com/wazo-platform/wazo-webhookd)

Connect to Wazo Platform event bus to push custom HTTP hooks to external
system. It manages the list of webhooks and triggers them when an event occurs.

Configurable via REST API.

## Schema

```mermaid
C4Container
    System_Boundary(webhookd_platform, "Webhook application") {
        Container(webhookd, "wazo-webhookd", "Python", "Webhook service")
        Container(db, "Postgresql", "C", "Database")
        Container(bus, "RabbitMQ", "Erlang", "Messaging Bus")
        Container(auth, "wazo-auth", "Python", "Authentication service")
    }

    System_Ext(external_webapp, "HTTP Server", "External Applications")
    Person(User, "User")

    Rel(User, webhookd, "Configures wanted events", "REST")

    Rel(webhookd, db, "SQL")
    Rel(bus, webhookd, "Receives Wazo platform events", "AMQP")

    Rel(webhookd, auth, "Authenticates", "REST")
    Rel(webhookd, external_webapp, "Send Wazo platform events", "HTTP")
```

## Example

```mermaid
sequenceDiagram
    actor Alice
    actor Bob
    participant webhookd
    participant auth
    participant Bus
    participant Asterisk
    participant calld as wazo-calld
    participant sms as SMS Service<br/>(external)

    Alice->>webhookd: Listen to 'user_voicemail_message_created'
    webhookd->>auth: Validate token
    auth-->>webhookd: Token OK
    webhookd->>Bus: Subscribe to 'user_voicemail_message_created'
    webhookd-->>Alice: OK

    Bob->>Asterisk: Leave voicemail message
    Asterisk->>Bus: AMI event 'MessageWaiting'
    Bus->>calld: parse 'MessageWaiting'
    calld->>Bus: Send event 'user_voicemail_message_created'
    Bus->>webhookd: Publish event 'user_voicemail_message_created'
    webhookd->>sms: Make HTTP request
```


## API documentation

The REST API for wazo-webhookd is available [here](../api/webhook.html)

## See also

* [Dev notes](webhook-core.html)
