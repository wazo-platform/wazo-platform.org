---
title: Performance
---

The default settings of Wazo are sufficient for low-traffic environments. However, higher traffic
may require some modifications to improve the performance or quality of calls.

## Increase the number of concurrent requests

Wazo services can handle multiple requests concurrently. Two settings control the pool of worker
threads processing requests: `min_threads` defines the number of threads and database connections
that Wazo daemons keep ready at all times, and `max_threads` defines the ceiling the pool can grow
to when the demand increases. Extra threads and database connections are released automatically when
the demand decreases.

Database connections scale with the thread pool: a service holds `min_threads` connections
permanently and may open up to `max_threads` connections during peaks. The sum of `max_threads` over
all services should stay below the maximum number of database connections. Wazo configures
PostgreSQL with `max_connections = 2048` by default, which leaves ample headroom.

For example, to modify the number of concurrent requests:

1. Increase the number of concurrent requests for `wazo-chatd` (for example) by creating a new file
   `/etc/wazo-chatd/conf.d/50-threads.yml`:

```yaml
rest_api:
  min_threads: 10
  max_threads: 200
```

2. Then restart the service to apply the change:

```shell
systemctl restart wazo-chatd
```
