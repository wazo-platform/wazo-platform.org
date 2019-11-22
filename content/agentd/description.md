# [agentd](https://github.com/wazo-platform/wazo-agentd)

wazo-agentd is the service responsible of managing agent which are used to distribute calls received on queues in a call center use case.

It can do the following actions:

* log in
* log out
* pause
* resume

## Schema

![Agent schema](diagram.svg)

## Example

![Sequence diagram](sequence-diagram.svg)

## API documentation

The REST API for wazo-agentd is available [here](../api/agent.html)

## Related

* [wazo-auth](authentication.html)
