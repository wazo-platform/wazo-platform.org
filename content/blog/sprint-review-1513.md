Title: Sprint review 15.13
Date: 2015-07-24 14:19
Author: sduthil
Category: XiVO IPBX
Slug: sprint-review-1513
Status: published

Hello everyone,

During this sprint most of the work was done on pushing Asterisk 13 into
XiVO. We added an extra testing day during the sprint in order to help
detect differences between Asterisk 11 and 13.

### New in this sprint

-   **Asterisk**: Upgrade from Asterisk 11 to [Asterisk
    13](https://wiki.asterisk.org/wiki/display/AST/New+in+13 "Asterisk 13").
    In the long run, this will allow us to work on small and
    not-so-small improvements to XiVO, such as: benefit from nice
    performance improvements; add more control over queues and
    switchboards (allowing us to correct undesirable behavior); generate
    more meaningful call logs; make the system more easily
    scalable, (i.e. multiple Asterisks could share the load of
    phone calls). The
    [ARI](https://wiki.asterisk.org/wiki/pages/viewpage.action?pageId=29395573 "ARI")
    is a very interesting feature of Asterisk 13 which gives us a lot of
    flexibility and allows us to make new features easily. See also our
    blog entry about [Asterisk
    13](/index.php?post/2015/07/20/XiVO-and-Asterisk-13 "Asterisk 13").

<!-- -->

-   **XiVO Client**: We have started integrating personal contacts into
    the People Xlet. For now, you can list, create and delete
    personal contacts. What remains to do is to edit contacts, integrate
    them into search results, import and export contacts. The goal is to
    delete the Personal Directory Xlet, and ultimately merge all other
    contact-related xlets into the People Xlet. Note that these personal
    contacts are accessible from any client, not just the one where they
    were created, like before. They are also manageable via a REST API
    in xivo-dird.

<!-- -->

-   **REST API**: We have continued to improve the management of
    function keys via a REST API, adding more management features and
    making it easier to use.

### Ongoing features

-   **Directories**: We are working on unifying directories so that all
    contacts will be available from anywhere, be it your phone or your
    CTI client. Also, we want XiVO to be able to get contacts from a
    variety of third-party products, so we're setting up a plugin
    mechanism allowing the retrieval of contacts from various sources.
    For example, you can make XiVO list contacts [from your Odoo
    system](https://github.com/alexis-via/xivo-dird-plugin-backend-odoo "from your Odoo system").
    Finally, we're working on integrating this plugin mechanism with the
    current web interface.

### Want to play with XiVO?

There's a new community-driven project called **Raspivo**, to support
XiVO on Raspberry Pi 2. Take a look at the documentation [on their
website](http://raspivo.io/installation-depuis-nos-depots-en.html "on their website").

Source: [Roadmap
15.13](http://projects.xivo.io/versions/229 "Roadmap 15.13")

Links:

-   Asterisk 13:
    [https://wiki.asterisk.org/wiki/disp...](https://wiki.asterisk.org/wiki/display/AST/New+in+13 "https://wiki.asterisk.org/wiki/display/AST/New+in+13")
-   ARI:
    [https://wiki.asterisk.org/wiki/page...](https://wiki.asterisk.org/wiki/pages/viewpage.action?pageId=29395573 "https://wiki.asterisk.org/wiki/pages/viewpage.action?pageId=29395573")
-   Asterisk 13 in XiVO:
    [http://blog.xivo.io/index.php?post/...](http://blog.xivo.io/index.php?post/2015/07/20/XiVO-and-Asterisk-13 "http://blog.xivo.io/index.php?post/2015/07/20/XiVO-and-Asterisk-13")
-   Odoo in XiVO:
    [https://github.com/alexis-via/xivo-...](https://github.com/alexis-via/xivo-dird-plugin-backend-odoo "https://github.com/alexis-via/xivo-dird-plugin-backend-odoo")
-   Raspivo:
    [http://raspivo.io/installation-depu...](http://raspivo.io/installation-depuis-nos-depots-en.html "http://raspivo.io/installation-depuis-nos-depots-en.html")

![XIVO-RELEASE-15.13-July-August2015.png](/images/blog/XIVO-RELEASE-15.13-July-August2015.png "XIVO-RELEASE-15.13-July-August2015.png, juil. 2015")

</p>

