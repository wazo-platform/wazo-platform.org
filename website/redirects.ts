import type { Options } from '@docusaurus/plugin-client-redirects'

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
    from: '/uc-doc/administration/users',
    to: '/uc-doc/administration',
  },
  {
    from: ['/uc-doc/api_sdk/mobile/push_notification', '/uc-doc/api_sdk/mobile'],
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
];

export default REDIRECTS
