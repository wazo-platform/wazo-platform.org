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

## Scale wazo-auth to several processes

The thread pool above scales a service inside one process, which Python limits to roughly one CPU
core. Beyond that, wazo-auth can run as several processes. Its work is split into three roles,
selected with the repeatable `--role` option or the `roles` configuration key:

- `api`: serve the REST API
- `scheduler`: run the periodic tasks (expired token and session cleanup)
- `init`: run the one-shot startup tasks (schema upgrade, policy update, bootstrap user)

One process runs all three by default, so an existing installation is unchanged. Instances
coordinate through PostgreSQL advisory locks (startup tasks serialized, a single scheduler leader
elected), so running several is safe.

Add API-only processes with the systemd template, the instance name being the port to listen on:

```shell
systemctl enable --now wazo-auth-worker@19497
```

Workers stop and start with `wazo-auth.service`. Send traffic to them by adding one line per worker
in `/etc/nginx/conf.d/wazo-auth-upstream.conf`:

```nginx
upstream wazo-auth {
    server 127.0.0.1:9497;
    server 127.0.0.1:19497;
}
```

```shell
nginx -t && systemctl reload nginx
```

Public and internal requests both use this upstream, so both are load balanced. Each instance logs
to journald (`journalctl -t wazo-auth-worker@19497`), and the nginx access logs report which backend
served a request in `$upstream_addr`.
