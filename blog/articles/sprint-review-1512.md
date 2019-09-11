Title: Sprint Review 15.12
Date: 2015-07-03 14:04
Author: sduthil
Category: XiVO IPBX
Slug: sprint-review-1512
Status: published

### New in this sprint

-   **XiVO Client**: The people xlet allows you to bookmark your
    contacts and list them. This also opens the way for personal
    contacts to be available from anywhere.

<!-- -->

-   **High Availability**: The High Availability system now synchronizes
    important files between servers. For example, IVR, custom sound
    files and favorite contacts are preserved. During a failure,
    telephony will be less affected while the main server is
    being repaired.

<!-- -->

-   **Function keys**: Function keys are manageable via a [REST
    API](http://documentation.xivo.io/en/latest/api_sdk/rest_api/confd/func_keys.html "REST API").
    This allows administrators to manage function keys more easily by
    applying templates of function keys to a set of users. In the
    future, this will also allow users to manage their own
    function keys.

<!-- -->

-   **REST API**: We currently have REST APIs for 5 components of XiVO,
    and now 2 of them (xivo-auth and xivo-dird) are protected with
    encryption and authentication. They can be used directly without
    requiring configuration. The other 3 are not exposed to the
    outside world.

<!-- -->

-   **XiVO Client**: We also made small improvements to the XiVO Client:
    -   The systray icon changed from the four letters (XiVO) to a
        single X
    -   The list in the People xlet can be sorted by agent status
    -   New language available: Spanish (Chile)

### Work done in this sprint, but not yet ready

-   **Asterisk upgrade**: Upgrade from Asterisk 11 to [Asterisk
    13](https://wiki.asterisk.org/wiki/display/AST/New+in+13 "Asterisk 13").
    In the long run, this will allow us to benefit from new features and
    other improvements, e.g. better performance, more control over
    queues and switchboards, correct undesirable behavior, create more
    meaningful call logs, make Asterisk more scalable (multiple Asterisk
    servers sharing the load of phone calls). The
    [ARI](https://wiki.asterisk.org/wiki/pages/viewpage.action?pageId=29395573 "ARI")
    is a very interesting feature of Asterisk 13 which gives us a lot
    more flexibility and allows us to add new features easily.

<!-- -->

-   **CTI authentication**: We mentioned in the previous sprint review
    users being able to log in their XiVO Clients using
    LDAP authentication. We are not there yet, but the bookmarked
    contacts feature validated our authentication mechanism and it is a
    step in the right direction.

<!-- -->

-   **64-bit**: XiVO is currently only supported on 32-bit architectures
    (AKA i386 or x86), but we are working on supporting 64-bit
    architectures (AKA amd64 or x86\_64). An ISO for 64-bit in beta
    version is [available for
    testing](http://mirror.xivo.io/iso/xivo-latest-beta-amd64.iso "available for testing").

See you for the next sprint review.

Source: [15.12
Roadmap](http://projects.xivo.io/versions/228 "15.12 Roadmap")

Links:

-   Function keys REST API:
    [http://documentation.xivo.io/en/lat...](http://documentation.xivo.io/en/latest/api_sdk/rest_api/confd/func_keys.html "http://documentation.xivo.io/en/latest/api_sdk/rest_api/confd/func_keys.html")
-   Asterisk 13 changelog:
    [https://wiki.asterisk.org/wiki/disp...](https://wiki.asterisk.org/wiki/display/AST/New+in+13 "https://wiki.asterisk.org/wiki/display/AST/New+in+13")
-   ARI:
    [https://wiki.asterisk.org/wiki/page...](https://wiki.asterisk.org/wiki/pages/viewpage.action?pageId=29395573 "https://wiki.asterisk.org/wiki/pages/viewpage.action?pageId=29395573")
-   64-bit ISO download:
    [http://mirror.xivo.io/iso/xivo-late...](http://mirror.xivo.io/iso/xivo-latest-beta-amd64.iso "http://mirror.xivo.io/iso/xivo-latest-beta-amd64.iso")

![2015-07-XIVO-15-12-RELEASED-SHARE-IT.png](/public/2015-07-XIVO-15-12-RELEASED-SHARE-IT.png "2015-07-XIVO-15-12-RELEASED-SHARE-IT.png, juil. 2015")

</p>

