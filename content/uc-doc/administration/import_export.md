---
title: Import Export
---

## Importing a whole tenant

When creating a new tenant on a Wazo stack it can be convenient to be able to create ressources in a
single bulk action. [A tool](https://github.com/wazo-platform/wazo-export-import) is available to
configure a new tenant using a spreadsheet.

There are two use cases to use the import tool.

1. To create a tenant from scratch using a spreadsheet document to define all ressources.
2. To create a tenant based on an existing system without recreating everything from scratch

## Installation

Installing the import tool is required on the exporting and importing system.

To install it on a debian based system use the following commands on the command line.

```sh
apt update && apt install git python3-pip
git clone https://github.com/wazo-platform/wazo-export-import.git
cd wazo-export-import
pip3 install -rrequirements.txt
python3 setup.py install
```

## Creating you import file

The first thing to do is to create the file that will contain all of your resources.

### Supported resources and fields

Each tab in the file represents a resource.

To list available resources use the following command

```sh
wazo-generate-dump list resources
```

To list available fields use the following command

```sh
wazo-generate-dump list fields --<resource name>
```

### Starting from scratch

To create a tenant from scratch you will first need to create a spreadsheet file that will be used
as the scafold for your import.

To create a spreadsheet ready to type in your data you can use the following command.

```sh
wazo-generate-dump new <filename.ods>
```

This will create a file that can be opened with Microsoft Excel, Libre Office or Google Spreadsheet.

The new file will contain many tabs and each tab contain many columns. The column named `ref` are
used to reference other resources between each tabs of the file.

For example, given a user with `ref` being `user1` you can then reference that user in the
`group_members`. In the `user` column you can add `user1` to add the user from that row to a group.

Tabs and columns that are not required can be removed from the file for easier editing.

### Building the export file from other tools

If you already have a system with your users or even other resources configured you can use it as
the base to fill up your import file.

For example, if you have a CSV file with your users in it, you can modify the header of you CSV to
match the available fields in the export file and use the CSV to fill you export file with the
following command

```sh
cat user.csv | wazo-generate-dump import --users my-export.ods
```

### System specific scripts

Some scripts are available to export specific systems to the appropriate export file format. To list
all available scripts look at the contrib directory.

#### Exporting from a Xivo installation

If you are exporting an Xivo system you can use the `export_xivo.sh` script to create your export
file.

```sh
./contrib/export_xivo.sh
```

This will create a file named `export.ods` in the current directory.

## Creating you new tenant

The import is meant to be used in a new tenant. The tenant **does not** get created by the import
tool.

The first thing you have to do is create a new tenant on your stack. Once that tenant has been
created, you **MUST** add the extension range to your contexts to match the resources you are going
to import.

## Updating the export file to match your system

If you used an existing system to create your import file chances are that it will contain some
resources that can conflict with the stack you are importing on. For example, the context names from
the old system might already exist on the system you are importing to.

These issues should be fixed before doing the import. For the context example you would go to the
`contexts` tab in the `ods` file and change the name of the contexts to match the names of the
`internal`, `outgoing` and `incoming` contexts in your new tenant. Leaving the old name in other
tabs will allow the reference system within the import to resolv the old names to the new one.

## Importing the resources

Importing your data.

```sh
wazo-import-dump import --username <username> --password <password> --tenant <tenant-uuid> <filename.ods>
```

The username and password should match a user with the necessary permissions to create all required
resources in wazo-auth and wazo-confd.

A new user can be created from the command line for this purpose with the following commands.

```sh
# Create a user named import with password secret
wazo-auth-cli user create --password secret import

# Associate the import user to the admin policy
wazo-auth-cli user add --policy wazo_default_admin_policy import

# Delete the user after the import
wazo-auth-cli user delete import
```

The tenant can be found using the following command

```sh
wazo-auth-cli tenant list
```
