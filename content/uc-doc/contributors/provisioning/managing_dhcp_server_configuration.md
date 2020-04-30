---
title: Managing DHCP server configuration
---

This page considers the configuration files of the DHCP server in
`/etc/dhcp/dhcpd_update/`{.interpreted-text role="file"}.

## <a name="who-modifies-the-files"></a>Who modifies the files

The files are updated with the command `dhcpd-update`, which is also run
when updating the provisioning plugins. This commands fetches
configurations files from the `provd.wazo.community` server.

## <a name="how-to-update-the-source-files"></a>How to update the source files

## <a name="ensure-your-modifications-are-working"></a>Ensure your modifications are working

-   On a Wazo, edit manually the file
    `/etc/dhcp/dhcpd_update/*.conf`{.interpreted-text role="file"}
-   `service isc-dhcp-server restart`
-   If errors are shown in `/var/log/daemon.log`{.interpreted-text
    role="file"}, check your modifications

## <a name="edit-the-files"></a>Edit the files

-   Edit the files in the Git repo `wazo-provd-plugins`, directory
    `dhcp/`{.interpreted-text role="file"}
-   Push your modifications
-   Go in `dhcp/`{.interpreted-text role="file"}
-   Run `make upload` to push your modifications to
    `provd.wazo.community`. There is no `testing` version of these
    files. Once the files are uploaded, they are available for all Wazo
    installations.
