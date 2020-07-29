# Upgrading from Wazo 18.03

## Rationale

* Wazo 18.03 was the last version before a big gap in Wazo versions: the next available version is Wazo 19.13
* As a consequence, a lot of Wazo installation have been installed in this version Wazo 18.03
* Given the big gap of versions, there are some corner cases that are not handled automatically by wazo-upgrade.

## Procedure

* Check the system locale
  * Execute `locale -a`
  * If the system locale is not in en.UTF-8, change it to en.UTF-8 and reboot.
* Check there is no custom certificate configured in `/etc/xivo/custom/custom-certificate.yml`.
  * If there is a custom certificate configured, follow [this procedure](https://wazo-platform.org/uc-doc/system/https_certificate#revert-previous-custom-https-certificate-configuration) to remove the custom certificate configuration.
* Check that `wazo-auth-cli` is working properly (a backup/restore may have [broken this tool](/etc/xivo/custom/custom-certificate.yml))
  * `wazo-auth-cli --config /root/.config/wazo-auth-cli user list` should return a list of system users.
  * If it returns an error `401 Client Error: UNAUTHORIZED for url: https://localhost:9497/0.1/token`, follow the workaround procedure in [this ticket](https://wazo-dev.atlassian.net/browse/WAZO-1413).
* Run `wazo-upgrade`
* Check that the database configuration is not skipped
  * Execute `debconf-show xivo-manage-db`
  * Check that `xivo-manage-db/db-skip` is set to `false`
  * If set to `true`, then probably an upgrade script has failed. Check `/var/log/xivo-upgrade.log` to determine the cause of the problem.
  * Once you have found the problem, run `wazo-upgrade -f` again to execute the missing upgrade scripts
  * Execute `debconf-show xivo-manage-db` to check again
  * Check that `xivo-manage-db/db-skip` is set to `false`
  * In last recourse, run: `echo PURGE | debconf-communicate xivo-manage-db`
* Run `wazo-dist-upgrade`
