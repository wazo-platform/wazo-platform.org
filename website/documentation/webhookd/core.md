## How to add a webhookd type

:information_source:: we use _type_ and _service_ as synonym.

Your module will be discovered by [`stevedore`](https://docs.openstack.org/stevedore/), create it wherever you want.

Here is an example of a webhook type that is very busy and sleeps for `n` seconds :grinning:.

    ./
    ├── example_service/
    │   └── plugin.py
    └── setup.py

### Files

**_setup.py_**

```python
    from setuptools import setup
    from setuptools import find_packages

    setup(
        name='wazo-webhookd-service-example',
        version='1.0',
        packages=find_packages(),
        entry_points={
        'wazo_webhookd.services': [
                'example = example_service.plugin:Service',
            ]
        }
    )
```

* `example` is the name of the service, it will be used when creating a subscription ;
* `example_service` is the name of the directory above, the one that contains _plugin.py_ ;
* `plugin` is the name of the above file _plugin.py_ ;
* `Service` is the name of the class described in _plugin.py_ below.

**_example_service/plugin.py_**

```python
    import time

    class Service:

        def load(self, dependencies):
            celery_app = dependencies['celery']

            @celery_app.task
            def example_callback(subscription, event):
                tired = subscription['config']['sleep_time']
                time.sleep(tired)

            self._callback = example_callback

        def callback(self):
            return self._callback
```

* `subscription` is the subscription dict, same as the one returned by the REST API ;
  * `subscription['config']` contains the service-specific options ;
* `event` contains the Wazo event that triggered the webhook, it is of the form:

      {
          "name": "user_created",
          "origin_uuid": "the UUID of the Wazo server that sent the event",
          "data": {
            "id": 12,  # the ID of the user that was created
          }
      }

### Installation

    python ./setup.py install

Once installed, you may create subscriptions with the type ``example``:

```python
POST /subscriptions
{
  "name": "Example webhook",
  "service": "example",
  "config": {
    "time_sleep": 10
  },
  "events": ["user_created"],
}
```

### Example: trigger code on a bus event

**_example_service/plugin.py_**

```python
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

### Example: programmatically create a subscription

**_example_service/plugin.py_**

```python
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
