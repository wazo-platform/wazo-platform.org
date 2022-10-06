Title: New Events Documentation
Date: 2022-10-04 13:00:00
Author: Julien Alie
Category: Wazo Platform
Tags: Applications, Documentation
Slug: new-events-documentation
Status: published

Hello Wazo community!  

In line with launching our new [event documentation](https://wazo-platform.org/documentation) section on our website, in the last few months, 
we have been busy refactoring our events subsystem in Wazo to make it simpler for developers and ourselves.  

The first change, and most important, is that events are now fully _tenant-aware_, meaning they will never be dispatched to users outside
of its intended tenant.

We have also rewritten the way they work to streamline their use; events are now divided into 3 main types:

- **Service-Level Events:**
Meant to be consumed by internal services (and plugins).  Will never be received by users.

- **Tenant-Level Events:**
Meant to be consumed by all connected users of a tenant.
These events usually represent changes at the tenant level on the stack (i.e: configuration setting changed)

- **User-Level Events:**
Meant to be consumed by individual users.  
These events usually represent specific actions targeting a user (i.e: joining a meeting or a conference, 
receiving a chat message, receiving a call, etc)


At a more technical level, here is how we implement it within Wazo:

For an event to be forwarded to a user connected through the websocket, the event must meet the following criteria:
- Headers must have an entry `tenant_uuid` = <tenant uuid>
- Headers must have an entry `user_uuid:<user uuid>` = true (or `user_uuid:*` = true for all users) 

Any event will always be available to services, but to be relayed to users, these entries are mandatory.

## Sounds cool, but how does it work in practice

Here’s a coding example of how we recommend defining, for instance, a new user event

```py
class CustomUserEvent(UserEvent):
	service = 'confd'
	name = 'do_something'
	routing_key_fmt = 'config.{user_uuid}.can.use.variables.here'

	def __init__(self, value1, value2, tenant_uuid, user_uuid):
		content = {'value1': value1, 'value2': value2}
		super().__init__(content, tenant_uuid, user_uuid)
```

and somewhere else in code (service or plugin)

```py
event = CustomUserEvent(resource_val1, resource_val2, user.tenant_uuid, user.uuid)
[...]
bus.publish(event)
```

A few things to note here are the required properties when writing new events:
* _service_: name of the service (without the prefix) who will publish the event, here `confd` (used by documentation generator)
* _name_: name of the event, used for routing the message
* _routing_key_fmt_: routing key used to route messages in a topic exchange (compatibility with older version)

Now, when we publish this event using our publisher, headers will be generated automatically. 
In our example, because our event is derived from `UserEvent`, the headers will be (using example values): 
```py
{
	'name': 'do_something',
	'tenant_uuid': '57b7080f-1d39-4269-af22-4df0f4ac6112',
	'user_uuid:731e36bc-5104-4539-b0b2-bb38932dfc16': True,
	[…]
}
```


## What if I need **all** events?

In the old system, it was possible for a user to have access to all events (as long as it had the correct permissions).  
But what if I still need that behavior, e.g in a m2m (machine to machine) forwarding/dispatching scenario?

Well, we have you covered!

If a user belongs to the stack's _master tenant_ (in opposition to a regular tenant), from the bus perspective, that user 
is considered an admin and will be able to receive all events it is registered to, independently of headers.
 

## TLDR

To conclude this short article on changes to the event (bus) subsystem, here's the key takeaways:
* To reach users, events must have headers tagged with both `tenant_uuid` and `user_uuid:<uuid or *>`
* Without these, events are treated as service-level events (will never reach users)
* A _master tenant_ user will always receive all events independently of headers

Thank you for reading!
