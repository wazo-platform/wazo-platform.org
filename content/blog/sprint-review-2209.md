Title: Wazo Platform 22.09 Released
Date: 2022-06-21T21:08:00
Author: The Wazo Authors
Category: Wazo Platform
Tags: wazo-platform, development
Slug: release-review-2209
Status: published

Hello Wazo Platform community!

Here is a short review of the Wazo Platform 22.09 release.

## Features
- **Authentication: Improve the LDAP authentication source by identifying tenants by domain name

## Bug Fixes
- **Provisioning**: Changing the provisioning port via the API did not change the provisioning server configuration.
- **Webhooks**: The webhooks are now tenant-aware: a webhook will only be triggered by events happening in the webhook's tenant.

## Ongoing Features
- **Scalability**: Consume events from the bus instead of the Asterisk websocket. This will improve the performance of Wazo and allow greater scalability.

## Community Contributions
Shout-out to user BnLG for his contributions that helps to make Wazo platform even better:
- **Security**: Various tweaks to reinforce security in NGINX, making wazo more secure
- **Phones**: Yealink and Gigaset N510 enhancements

For more details about the aforementioned topics, please see the [changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.09).

See you at the next sprint review!

## Resources

- [Install Wazo Platform](/use-cases)
- [Upgrade Wazo and Wazo Platform](/uc-doc/upgrade/). Be sure to read the
  [breaking changes](/uc-doc/upgrade/upgrade_notes#22-09)

Sources:

- [Upgrade notes](/uc-doc/upgrade/upgrade_notes#22-09)
- [Wazo Platform 22.09 Changelog](https://wazo-dev.atlassian.net/issues/?jql=project%3DWAZO%20AND%20fixVersion%3D22.09)

## Discussion

Comments or questions in
[this forum post](https://wazo-platform.discourse.group/t/blog-wazo-platform-22-09-released).
