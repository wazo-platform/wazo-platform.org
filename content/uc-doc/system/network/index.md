---
title: Network
---

## Add static network routes

Static routes cannot be added via the web interface. However, you may add static routes to your Wazo
by following following the steps described below. This procedure will ensure that your static routes
are applied at startup (i.e. each time the network interface goes up).

1.  Create the file `/etc/network/if-up.d/xivo-routes`:

    ```sh
    touch /etc/network/if-up.d/xivo-routes
    chmod 755 /etc/network/if-up.d/xivo-routes
    ```

2.  Insert the following content:

    ```sh
    #!/bin/sh
    if [ "${IFACE}" = "<network interface>" ]; then
        ip route add <destination> via <gateway>
        ip route add <destination> via <gateway>
    fi
    ```

3.  Fields <network interface>, <destination> and <gateway> should be replaced by your specific
    configuration. For example, if you want to add a route for 192.168.50.128/25 via 192.168.17.254
    which should be added when eth0 goes up:

    ```sh
    #!/bin/sh
    if [ "${IFACE}" = "eth0.2" ]; then
        ip route add 192.168.50.128/25 via 192.168.17.254
    fi
    ```

**Note**: The above check is to ensure that the route will be applied only if the correct
interface goes up. This check should contain the actual name of the interface (i.e. `eth0` or
`eth0.2` or `eth1` or ...). Otherwise the route won't be set up in every cases.

## Change interface MTU

**Warning**: Manually changing the MTU is risky. Please only proceed if you are aware of what you are
doing.

These steps describe how to change the MTU:

1. Create the file `/etc/network/if-up.d/xivo-mtu`:

    ```sh
    touch /etc/network/if-up.d/xivo-mtu chmod 755 /etc/network/if-up.d/xivo-mtu
    ```

2.  Insert the following content:

    ```sh
     #!/bin/sh

     # Set MTU per iface
     if [ "${IFACE}" = "<data interface>" ]; then
         ip link set ${IFACE} mtu <data mtu>
     elif [ "${IFACE}" = "<voip interface>" ]; then
         ip link set ${IFACE} mtu <voip mtu>
     fi
    ```

3.  Change the `<data interface>` to the name of your interface (e.g. eth0), and the `<data mtu>` to
    the new MTU (e.g. 1492),
4.  Change the `<voip interface>` to the name of your interface (e.g. eth1), and the `<voip mtu>` to
    the new MTU (e.g. 1488)

**Note**: In the above example you can set a different MTU per interface. If you don't need a
per-interface MTU you can simply write:

    ```sh
    #!/bin/sh
    ip link set ${IFACE} mtu <my mtu>
    ```
