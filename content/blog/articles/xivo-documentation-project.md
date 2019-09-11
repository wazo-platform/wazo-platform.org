Title: XiVO Documentation Project
Date: 2012-02-01 01:24
Author: jylebleu
Category: Software
Slug: xivo-documentation-project
Status: published

Documentation is often a touchy subject on many projects, and for XiVO
in this respect, it is also an important matter.

Retrospective, over retrospective, documentation organization and tools
comes often to the surface. Maybe some of you already noticed that XiVO
development cycle has changed and that we are now producing a release
every two weeks. In fact we started to use SCRUM six months ago, and in
this respect, we do not forget to do our 'inspect and adapt' meeting,
not so many often as we should but this is an other story !

Anyway, XiVO documentation is currently done using a
[wiki](http://wiki.xivo.io "wiki"), but this wiki is hard to maintain
and to structure, information is also difficult to find. We tried also
to use other type of wikis, but nothing was very satisfying.

We looked over some other projects, to check how the documentation was
done, and it comes to us that some of them are using
[sphinx](http://sphinx.pocoo.org/ "sphinx")

> “a tool that makes it easy to create intelligent and beautiful
> documentation, written by Georg Brandl and licensed under the BSD
> license”

One of the item of our *Definition of Done* is documentation, it has to
be done by the development team. It is so natural to us to edit
restructured text, using GIT to push modification to a repository that
all the team was enthusiast to use these tools for improving XiVO
documentation. It was also an opportunity for us to try to use an
external Git repository, we chose
[Gitorious](https://gitorious.org/xivo-doc "Gitorious") to start with
XiVO documentation project. This is also a way to open it to a larger
community.

Do not hesitate to clone the project and submit documentation patches
!!!

Last but not least, documentation production is now integrated in our
tool chain, using [jenkins](http://jenkins.xivo.io "jenkins") as
integration server, files are pulled from Gitorious automatically to
produce the [XiVO documentation
site](http://documentation.xivo.io "XiVO documentation site")

You will find how to contribute
[here](http://documentation.xivo.io/developers/contributes/index.html "here")
Have fun !!

![XiVO documentation tool
chain](/public/xivosoft/.doc_process_m.jpg "XiVO documentation tool chain, fév. 2012")

</p>

