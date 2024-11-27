import type { Options } from '@docusaurus/plugin-client-redirects';

const REDIRECTS: Options['redirects'] = [
  {
    from: '/uc-doc/administration/contact_directories/general',
    to: '/uc-doc/administration/contact_directories',
  },
  {
    from: '/uc-doc/administration/interconnections/introduction',
    to: '/uc-doc/administration/interconnections',
  },
  {
    from: '/uc-doc/administration/provisioning/introduction',
    to: '/uc-doc/administration/provisioning',
  },
  {
    from: '/uc-doc/administration/users/users',
    to: '/uc-doc/administration/users',
  },
  {
    from: [
      '/uc-doc/api_sdk/mobile/push_notification',
      '/uc-doc/api_sdk/mobile',
    ],
    to: '/uc-doc/api_sdk/mobile_push_notification',
  },
  {
    from: '/uc-doc/contact_center/introduction',
    to: '/uc-doc/contact_center',
  },
  {
    from: '/uc-doc/high_availability/introduction',
    to: '/uc-doc/high_availability',
  },
  {
    from: '/uc-doc/installation/install-system',
    to: '/uc-doc/installation',
  },
  {
    from: '/uc-doc/upgrade/introduction',
    to: '/uc-doc/upgrade',
  },
  {
    from: '/uc-doc/upgrade/upgrade_specific_version/introduction',
    to: '/uc-doc/upgrade/upgrade_specific_version',
  },
  {
    from: '/uc-doc/system/wazo-auth/introduction',
    to: '/uc-doc/system/wazo-auth',
  },
  {
    from: '/uc-doc/system/wazo-confd/introduction',
    to: '/uc-doc/system/wazo-confd',
  },
  {
    from: '/uc-doc/system/wazo-confgend/introduction',
    to: '/uc-doc/system/wazo-confgend',
  },
  {
    from: '/uc-doc/system/wazo-dird/introduction',
    to: '/uc-doc/system/wazo-dird',
  },
  {
    from: ['/uc-doc/introduction', '/uc-doc/changelog'],
    to: '/uc-doc',
  },
  {
    from: '/uc-doc/upgrade/old_upgrade_notes',
    to: '/uc-doc/upgrade/archives/upgrade_notes',
  },
  {
    from: '/uc-doc/upgrade/upgrade_from_wazo_18_03',
    to: '/uc-doc/upgrade/archives/upgrade_from_wazo_18_03',
  },
  {
    from: '/uc-doc/upgrade/migrate_i386_to_amd64',
    to: '/uc-doc/upgrade/archives/migrate_i386_to_amd64',
  },
];

export default REDIRECTS;
