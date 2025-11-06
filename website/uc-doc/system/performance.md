---
title: Performance
---

The default settings of Wazo are sufficient for low-traffic environments. However, higher traffic
may require some modifications to improve the performance or quality of calls.

## Increase the number of concurrent requests

Wazo services can handle multiple requests concurrently. The setting `max_threads` will define the
number of threads and database connections that Wazo daemons will keep ready for processing
requests.

Since this setting increases the number of database connections, you may also have to increase the
maximum number of database connections. By default, Wazo uses a maximum of about 50 connections and
PostgreSQL accepts a maximum of 100 connections.

For example, to modify the number of concurrent requests:

1. If needed, increase the number of maximum database connections by creating
   `/etc/postgresql/15/main/conf.d/20-custom-max-connections.conf`:

```ini
max_connections = 200
```

2. Then restart the database and all services to apply the change:

```shell
wazo-service restart all
```

3. Increase the number of concurrent requests for `wazo-chatd` (for example) by creating a new file
   `/etc/wazo-chatd/conf.d/50-threads.yml`:

```yaml
rest_api:
  max_threads: 25
```

4. Then restart the service to apply the change:

```shell
systemctl restart wazo-chatd
```
