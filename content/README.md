This directory aggregates documentation about Wazo services.

The documentation is oriented towards system architecture, not development or end-users.

Diagrams are written with [PlantUML](https://plantuml.com).

Services:

* [agentd](./agentd/description.md): Call center agent management.
* [amid](./amid/description.md): A daemon for interacting with Asterisk's AMI.
* [auth](./auth/description.md): Authentication server used by the Wazo platform.
* [call-logd](./call-logd/description.md): Collect metadata on calls made on a Wazo Platform.
* [calld](./calld/description.md): Call control service for the Wazo platform.
* [chatd](./chatd/description.md): Add messaging functionality, as well as devices and users presence for a Wazo Platform.
* [confd](./confd/description.md): Configuring and managing PBX part of Wazo Platform.
* [dird](./dird/description.md): Directory server, to query all directories that are configured.
* [plugind](./plugind/description.md): Install plugins on the system
* [provd](./provd/description.md): The phone provisioning service, that generates configuration files for phones and gateways.
* [webhookd](./webhookd/description.md): Connect to Wazo Platform event bus to push custom HTTP hooks to external system.
* [websocketd](./websocketd/description.md): WebSocket server that delivers Wazo Platform-related events to clients.
