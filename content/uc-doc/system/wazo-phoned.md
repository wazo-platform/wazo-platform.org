---
title: 'wazo-phoned'
---

-   [Usage](#usage)
-   [Launching wazo-phoned](#launching-wazo-phoned)

wazo-phoned is an interface to use directory service with phones. It
offers a simple REST interface to authenticate phones and to search
results from `wazo-dird`{.interpreted-text role="ref"}.

Usage
=====

wazo-phoned is used through HTTP requests, using HTTP and HTTPS. Its
default port is 9498 and 9499. As a user, the common operation is to
search through directory from a phone. The phone needs to send two
parameters:

-   \`xivo\_user\_uuid\`: The Wazo user uuid that the phone is
    associated. It\'s used to search through personal contacts (see
    `dird_services_personal`{.interpreted-text role="ref"}).
-   \`profile\`: The profile that the user is associated. It\'s used to
    format results as configured.

::: {.note}
::: {.admonition-title}
Note
:::

Since most phones dont\'t support HTTPS, a small protection is to
configure authorized\_subnets in `configuration-files`{.interpreted-text
role="ref"}
:::

Launching wazo-phoned
=====================

On the command line, type `wazo-phoned -h` to see how to use it.
