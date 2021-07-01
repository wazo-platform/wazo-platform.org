---
subtitle: Adding a Migration Script
title: Database
---

Strating with XiVO 14.08, the database migration is handled by
[alembic](http://alembic.readthedocs.org).

The Wazo migration scripts can be found in the
[xivo-manage-db](https://github.com/wazo-platform/xivo-manage-db) repository.

On a XiVO, they are located in the `/usr/share/xivo-manage-db`{.interpreted-text role="file"}
directory.

To add a new migration script from your developer machine, go into the root directory of the
xivo-manage-db repository. There should be an `alembic.ini`{.interpreted-text role="file"} file in
this directory. You can then use the following command to create a new migration script:

    alembic revision -m "<description>"

This will create a file in the `alembic/versions`{.interpreted-text role="file"} directory, which
you\'ll have to edit.

When the migration scripts are executed, they use a connection to the database with the role/user
`asterisk`. This means that new objects that are created in the migration scripts will be owned by
the `asterisk` role and it is thus not necessary (nor recommended) to explicitly grant access to
objects to the asterisk role (i.e. no \"GRANT ALL\" command after a \"CREATE TABLE\" command).
