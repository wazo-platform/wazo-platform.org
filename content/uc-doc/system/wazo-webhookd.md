---
title: 'wazo-webhookd'
---

-   [How to add a new webhookd type (a.k.a
    service)](#how-to-add-a-new-webhookd-type-a.k.a-service)
    -   [How to trigger code on a bus
        event](#how-to-trigger-code-on-a-bus-event)
    -   [How to programmatically create a
        subscription](#how-to-programmatically-create-a-subscription)

wazo-webhookd is the microservice responsible for webhooks: it manages
the list of webhooks and triggers them when an event occurs.

How to add a new webhookd type (a.k.a service)
==============================================

Here is an example of a webhook type that does nothing. Actually, it is
very busy and sleeps for N seconds `:)` You may of course change this
behaviour for something more suited to your needs.

Files:

    setup.py
    example_service/plugin.py

`setup.py`:

``` {.sourceCode .python}
from setuptools import setup
from setuptools import find_packages

setup(
    name='wazo-webhookd-service-example',
    version='1.0',
    packages=find_packages(),
    entry_points={
    'wazo_webhookd.services': [
            # * "example" is the name of the service.
            #   It will be used when creating a subscription.
            # * "example_service" is the name of the directory above,
            #   the one that contains plugin.py
            # * "plugin" is the name of the above file "plugin.py"
            # * "Service" is the name of the class shown below
            'example = example_service.plugin:Service',
        ]
    }
)
```

`example_service/plugin.py`:

``` {.sourceCode .python}
import time

class Service:

    def load(self, dependencies):
        celery_app = dependencies['celery']

        @celery_app.task
        def example_callback(subscription, event):
            '''
            * "subscription" is the subscription dict, same as the one returned by the REST API.
              The service-specific options are available in the "config" key, e.g. for http: the
              url is in subscription['config']['url'].
            * "event" contains the Wazo event that triggered the webhook.
              "event" is of the form:
              {
                  "name": "user_created",
                  "origin_uuid": "the UUID of the Wazo server that sent the event",
                  "data": {
                    "id": 12,  # the ID of the user that was created
                  }
              }
            '''
            tired = subscription['config']['sleep_time']
            time.sleep(tired)

        self._callback = example_callback

    def callback(self):
        return self._callback
```

To install this Python plugin, run:

    python setup.py install

Once installed, you may create subscriptions with the type `example`:

    POST /subscriptions
    {
      "name": "Example webhook",
      "service": "example",
      "config": {
        "time_sleep": 10
      },
      "events": ["user_created"],
    }

How to trigger code on a bus event
----------------------------------

`example_service/plugin.py`:

``` {.sourceCode .python}
class Service:

    def load(self, dependencies):
        ...
        bus_consumer = dependencies['bus_consumer']
        bus_consumer.subscribe_to_event_names(uuid=uuid.uuid4(),
                                              event_names=['user_created'],
                                              user_uuid=None,
                                              wazo_uuid=None,
                                              callback=self.on_user_created)

    def on_user_created(self, body, event):
        logger.debug('User %s has been created!', body['uuid'])
```

How to programmatically create a subscription
---------------------------------------------

`example_service/plugin.py`:

``` {.sourceCode .python}
from wazo_webhookd.plugins.subscription.service import SubscriptionService

class Service:

    def load(self, dependencies):
        ...
        subscription_service = SubscriptionService(dependencies['config'])
        ...
        subscription = subscription_service.create({
            'name': 'my-subscription',
            'service': 'http',
            'events': ['call_created'],
            'config': {
                'method': 'get',
                'url': 'https://me.example.com',
            },
        })
```
