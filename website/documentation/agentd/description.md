# [agentd](https://github.com/wazo-platform/wazo-agentd)

wazo-agentd is the service responsible of managing agent which are used to distribute calls received on queues in a call center use case.

It can do the following actions:

* log in
* log out
* pause
* resume

## Schema

```mermaid
C4Container
    Person(phone, "Phone")
    Person(user, "User")

    System_Boundary(auth_system, "Agent") {
        Container(agentd_app, "wazo-agentd", "Python", "Agent service")
        Container(auth, "wazo-auth", "Python", "Authentication service")
        ContainerDb(pgsql, "PostgreSQL", "C", "Database")
        Container(bus, "RabbitMQ", "Erlang", "Message bus")
        Container(agid, "wazo-agid", "Python", "AGI service")
        Container(asterisk, "Asterisk", "C", "Media server")
    }

    Rel(user, agentd_app, " ", "REST")
    Rel(phone, asterisk, " ", "SIP/SCCP")

    Rel(agentd_app, auth, " ", "REST")
    Rel(agentd_app, pgsql, " ", "SQL")
    Rel(agentd_app, bus, " ", "AMQP")

    Rel(agid, agentd_app, " ", "REST")

    Rel(asterisk, agid, " ", "AGI")
    Rel(agentd_app, asterisk, " ", "AMI")
```

## Example

```mermaid
sequenceDiagram
    participant phone
    participant asterisk
    participant agid
    participant agentd
    participant auth
    participant db

    phone->>asterisk: *311001
    asterisk->>agid: agent login 1001
    agid->>agentd: token, login 1001
    agentd->>auth: authorize token?
    auth->>agentd: ok
    agentd->>db: login 1001
    agentd->>asterisk: add queue member
```

## API documentation

The REST API for wazo-agentd is available [here](../api/agent.html)

## Related

* [wazo-auth](authentication.html)

## See also

* [Dev notes](agent-core.html)
