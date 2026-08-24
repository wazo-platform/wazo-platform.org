# wazo-calld

wazo-calld is the call control service for the Wazo platform.

It manages the following resources:

* applications
* calls
* fax
* relocates
* switchboards
* transfers
* voicemails

## API documentation

The REST API for wazo-calld is available [here](../api/application.html#tag/applications).

The bus events are defined [here](https://github.com/wazo-platform/wazo-calld/blob/master/wazo_calld/plugins/calls/events.yml) and [here](https://github.com/wazo-platform/wazo-calld/blob/master/wazo_calld/plugins/switchboards/events.yml).

## Schema

```mermaid
C4Container
    Person(user, "User")
    Person(phone, "Phone")

    System_Boundary(calld_system, "Call application") {
        Container(calld_app, "wazo-calld", "Python", "Call application service")
        Container(asterisk, "Asterisk", "C", "Media server")
        Container(auth, "wazo-auth", "Python", "Authentication service")
        Container(amid, "wazo-amid", "Python", "AMI proxy service")
        Container(bus, "RabbitMQ", "Erlang", "Message bus")
        Container(confd, "wazo-confd", "Python", "Configuration service")
    }

    Rel(user, phone, "uses")
    Rel(user, calld_app, " ", "REST")

    Rel(calld_app, auth, " ", "REST")
    Rel(calld_app, amid, " ", "REST")

    Rel(amid, asterisk, " ", "HTTP")
    Rel(amid, asterisk, " ", "TCP")
    Rel(amid, bus, " ", "AMQP")

    Rel(asterisk, phone, " ", "SIP/SCCP")

    Rel(phone, asterisk, " ")

    Rel(calld_app, bus, " ", "AMQP")
    Rel(calld_app, confd, " ", "REST")
    Rel(calld_app, asterisk, " ", "REST")
```

## Example

```mermaid
sequenceDiagram
    participant Phone1000
    participant asterisk
    participant Phone1001
    participant User
    participant calld

    Phone1000->>asterisk: Call 1001
    asterisk->>Phone1001: 1001
    Phone1001->>User: answers
    asterisk->>calld: Event
    calld->>User: Event
    User->>calld: DELETE /calls/{call_id}
    calld->>asterisk: Hangup
    asterisk->>calld: OK
    asterisk->>Phone1001: Bye
    calld->>User: 204
```

## Related

* [wazo-amid](amid.html)
* [wazo-auth](authentication.html)
* [wazo-confd](configuration.html)

## See also

* [Dev notes](application-dev.html)
