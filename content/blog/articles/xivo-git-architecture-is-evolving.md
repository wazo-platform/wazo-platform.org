Title: XiVO GIT Architecture is evolving
Date: 2012-01-17 19:10
Author: cedric
Category: XiVO IPBX
Tags: XiVO
Slug: xivo-git-architecture-is-evolving
Status: published

The [\#
xivodevteam](https://twitter.com/#!/Xivodevteam " # xivodevteam")
decided to change the architecture of the git repository of
[XiVO](/index.php?tag/XiVO).

Why do we wanted to do this change ?

-   It's easier for the community to work on small component rather than
    on a big git repository
-   Each component can be independent
-   Allows usage of XiVO components in third-party systems
-   Simplify and unify the names of the services

Diagram of the migration of the git repository:

[![XiVO REPOSITORY GIT
ARCHITECTURE](/public/git/.xivo-git-architecture_m.jpg "XiVO REPOSITORY GIT ARCHITECTURE, janv. 2012")](/public/git/xivo-git-architecture.png "XiVO REPOSITORY GIT ARCHITECTURE")

The large circle on the left is our warehouse with all the components
together.

Each component will become an independent [git
repository](http://git.proformatique.com/ " git repository ")
http://git.proformatique.com/

</p>

