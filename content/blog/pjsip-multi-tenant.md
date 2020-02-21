Title: A Multi Tenant API for PJSIP
Date: 2020-03-01 14:00:00
Author: Pascal Cadotte Michaud
Category: Wazo Software
Tags: Asterisk, PJSIP, VOIP, API
Slug: pjsip-multi-tenant
Status: published

# Toward a Multi Tenant API for PJSIP

Asterisk has been switching from the legacy chan_sip channel driver to a new SIP
stack based on the [PJSIP library](https://www.pjsip.org/). We have been using
the new SIP stack in Wazo Platform for over a year now. The way we configure the
SIP channel driver as of Wazo 20.03 still relies on the API that existed for
chan_sip with a translation layer in wazo-confgend to convert the chan_sip
configuration in a chan_pjsip one.

The translation we are using at the moment does not deliver all the value we
could get from a properly configured chan_pjsip. And the standard format of the
`pjsip.conf` file is hard to override without using the [PJSIP
Wizard](https://wiki.asterisk.org/wiki/display/AST/PJSIP+Configuration+Wizard).

We chose to use this change in API to make the SIP configuration as multi tenant
as possible.

In this article we will look into the process of making this new API multi
tenant.


# Differences Between chan_sip and chan_pjsip

chan_sip is the old channel driver that has been in Asterisk for ages to handle
the SIP protocol. For some people this means that it has proved it's value over
time and that it's quite stable. But in fact, chan_sip proved to be hard to
maintain. Fixing a bug could result in other unrelated bug appearing.

In order to get the development around SIP more enjoyable a new channel driver
has been developed using an existing SIP library named PJSIP. One of the core
differences from an administrator point of view is the configuration file. What
used to be a single section for a peer in sip.conf is now multiple sections in
pjsip.conf and many configuration options have changed.

`chan_sip` also use a `general` section that could be used to set default values
for the whole channel driver.


# How Wazo Migrated from chan_sip to chan_pjsip

To be able to move quickly from chan_sip to chan_pjsip we chose to use a
translation to get from a valid chan_sip configuration to a valid chan_pjsip
configuration. This is heavily inspired by the `sip_to_pjsip.by` script that is
available in the Asterisk source code. This solution was sufficient to get us
started but we have not been able to leverage the full power of the new SIP
channel driver.


# A Multi Tenant SIP Configuration

The current SIP configuration is not completely multi tenant. What this means is
that there is still a SIP general configuration that is shared by all SIP
endpoints; lines and trunks. This general configuration is applied to ALL
tenants of a given engine. The lines and trunks themselves are multi tenant. To
make matters worst, the old API did not support configuration template. So a
tenant A that wants a configuration different from the general configuration of
it's engine would have to replicate that configuration option for all of it's
endpoints.

The design of the new API for PJSIP is the right opportunity to fix that
situation. In fact, PJSIP configuration file does not contain a `general`
section. There still exist some global configuration that is only configurable
by the "owner" of the engine, but all tenants will now be able to have it's own
"general" configuration.

The new API will allow a SIP configuration to have parents. A parent is another
SIP configuration that is included and which can be overridden. So the
configuration of line L1 could contain only 2 fields, it's peer name and
password. All other configuration options can be inherited the the general
configuration, webrtc configuration and user preference configuration for
example.

![Configuration Example](../../images/blog/pjsip-multi-tenant/pjsip_template.png "Template Hierarchy Example")

In this example we have 3 lines owned by 2 users. Each line inherit from the
user's preference template and from the SIP or WebRTC templates. The SIP and
WebRTC templates inherit from the General template. Each of these templates are
owned by a given tenant.

With this configuration granularity, each tenant will have it's own `general`
configuration and will be able to manage the SIP configuration of all of it's
endpoints independently from others without duplicating the configuration for
all of it's endpoints.


# Reloading

Another problem of the chan_sip channel driver and chan_pjsip with our current
implementation is the need to reload the configuration for each modification.
The new API will leverage a configuration system named
[Sorcery](https://wiki.asterisk.org/wiki/display/AST/Sorcery). It will allow
each configuration to be updated individually. Each time a configuration change
is done, Wazo will be able to update the modified sections of the configuration
only for the impacted resources instead of reloading the channel driver.


# Migrating to the New API

As usual we will do our best to make the migration smooth for everyone. At the
time of this writing the plan is to have all the configuration automatically
migrated automatically during the upgrades. Some new features will appear as
they are developed and integrated into the product. New forms will be available
in wazo-ui.

At the moment there is no plan to keep the old and new API working together. If
you do use the SIP configuration API get in touch with us on the
[forum](https://wazo-platform.discourse.group/latest)


# Conclusion

The new SIP configuration API should allow users to get a more flexible and more
productive work flow. It will also save the administrator from doing some manual
configuration for fields that are not well supported by the SIP to PJSIP
translation layer. And it will allow users of Wazo Platform to leverage the full
power of the chan_pjsip power.
