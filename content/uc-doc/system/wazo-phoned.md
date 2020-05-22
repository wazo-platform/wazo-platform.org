---
title: 'wazo-phoned'
---

wazo-phoned is an interface to use directory service with phones. It
offers a simple REST interface to authenticate phones and to search
results from [wazo-dird](/uc-doc/system/log_files#wazo-dird).

Usage
=====

wazo-phoned is used through HTTP requests, using HTTP and HTTPS. Its
default port is 9498 and 9499. As a user, the common operation is to
search through directory from a phone. The phone needs to send two
parameters:

-   `xivo_user_uuid`: The Wazo user uuid that the phone is
    associated. It's used to search through personal contacts (see
    [personal](/uc-doc/system/wazo-dird/stock_plugins#dird-services-personal)).
-   `profile`: The profile that the user is associated. It's used to
    format results as configured.

#:exclamation: Since most phones dont't support HTTPS, a small protection is to
configure authorized_subnets in `configuration-files`.

Launching wazo-phoned
=====================

On the command line, type `wazo-phoned -h` to see how to use it.
