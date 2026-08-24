# [provd](https://github.com/wazo-platform/wazo-provd)

wazo-provd is the phone provisioning service for the Wazo platform. It generates configuration files
for phones and gateways based on the plugins that are installed.

## Schema

```mermaid
C4Container
    Person(phone, "Desktop Phone")
    Person(consumer, "API consumer")

    System_Boundary(provd_system, "Provisioning") {
        Container(provd_app, "provd", "Python", "Provisioning service")
        Container(dxtorc, "dxtorc", "Python", "DHCP info transfer client")
        Container(dxtora, "dxtora", "Python", "DHCP info transfer daemon")
        System(dhcp_server, "DHCP Server")
        Container(asterisk, "Asterisk", "C", "Media server")
        Container(confd, "wazo-confd", "Python", "Configuration service")
        Container(agid, "wazo-agid", "Python", "AGI service")
        Container(amid, "wazo-amid", "Python", "AMI proxy service")
        ContainerDb(filesystem, "File System", "/var/lib/wazo-provd", "JSON database and provisioning plugins")
    }
    Container(auth, "wazo-auth", "Python", "Authentication service")
    System_Ext(provd_plugins, "Provd device plugins repository")

    Rel(phone, dhcp_server, "DHCP")
    Rel(phone, provd_app, "HTTP/TFTP")
    Rel(phone, asterisk, "SIP/SCCP")

    Rel(agid, asterisk, "AGI")
    Rel(agid, confd, "REST")

    Rel(amid, asterisk, "HTTP")
    Rel(provd_app, amid, "REST")

    Rel(dhcp_server, dxtorc, "subprocess")
    Rel(dxtorc, dxtora, "UNIX socket")
    Rel(dxtora, provd_app, "REST")

    Rel(confd, provd_app, "REST")

    Rel(provd_app, filesystem, " ")
    Rel(provd_app, auth, "REST")

    Rel(consumer, confd, "REST")

    Rel(provd_app, provd_plugins, "HTTP")
```

## Example

```mermaid
sequenceDiagram
    participant phone
    participant asterisk
    participant agid
    participant confd
    participant auth
    participant provd
    participant amid

    phone->>asterisk: prov code
    asterisk->>agid: device IP and prov code
    agid->>confd: token, get device from IP
    confd->>auth: validate token
    auth->>confd: allow
    confd->>agid: device
    agid->>confd: token, get line from prov code
    confd->>auth: validate token
    auth->>confd: allow
    confd->>agid: line
    agid->>confd: token, associate line with device
    confd->>auth: validate token
    auth->>confd: allow
    confd->>provd: token, update device
    provd->>auth: validate token
    auth->>provd: allow
    provd->>confd: ok
    confd->>provd: token, synchronize device
    provd->>auth: validate token
    auth->>provd: allow
    provd->>confd: ok
    confd->>agid: ok
    provd->>amid: synchronize device
    amid->>asterisk: synchronize device
    asterisk->>phone: SIP Notify
    phone->>provd: get configuration
```

## API documentation

The REST API for wazo-provd is available [here](../api/provisioning.html)

## Plugins

Each model of phone must have its plugin supported by wazo-provd. Plugins are located
[here](https://github.com/wazo-platform/wazo-provd-plugins)

Plugins are meant to be installed and upgraded independently of the OS to be able to use the firmware
version that works best for your use case.

Supported plugins are hosted on
[provd.wazo.community](https://provd.wazo.community/plugins/2/stable/)

## Auto provisioning

### How it works

Here's a simplified view of how auto-provisioning is supported on a typical SIP desktop phone:

1. The phone is powered on
2. During its boot process, the phone sends a DHCP request to obtain its network configuration
3. A DHCP server replies with the phone network configuration + an HTTP URL
4. The phone use the provided URL to retrieve a common configuration file, a MAC-specific
   configuration file, a firmware image and some language files.

Building on this, configuring one of the supported phone on Wazo is as simple as:

1. dhcpd-config
2. Installing the required provd plugin
3. Powering on the phone
4. Dialing the user's provisioning code from the phone

And _voilà_, once the phone has rebooted, your user is ready to make and receive calls. No manual
editing of configuration files nor fiddling in the phone's web interface.

## Tenant assignation

On initial insertion into provd, devices are assigned to the tenant of the token used internally by
provd, which is the master tenant. When a device is provisioned, it is transferred to the tenant of
the line to which it is being associated. When the device is reset to autoprov, the device stays in
its tenant. It is not possible to change the tenant of the device once it is set. If you wish to do
it anyway, you must delete the device and restart it manually.

## Limitations

- Device synchronisation does not work in situations where multiple devices are connected from
  behind NAPT network equipment. The devices must be re-synchronised manually.
- There may be an issue if you are using an analog gateway with lines that are not in the same
  tenant. Indeed, in the case that the gateway is only one device and each port is a separate line,
  the device will only be seen by the tenant of the first line that was added.

## External links

- [Introduction to provd plugin model](/uc-doc/contributors/provisioning/introduction-to-the-plugin-model-of-the-new-provisioning-server)
- [HTTP/TFTP requests processing in provd - part 1](/uc-doc/contributors/provisioning/httptftp-requests-processing-in-provd-part-1)
- [HTTP/TFTP requests processing in provd - part 2](/uc-doc/contributors/provisioning/httptftp-requests-processing-in-provd-part-2)

## Related

- [wazo-amid](amid.html)
- [wazo-auth](authentication.html)
- [wazo-confd](configuration.html)

## See also

- [Admin notes](provisioning-admin.html)
