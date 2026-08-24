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
    from: '/uc-doc/upgrade/migrate_i386_to_amd64',
    to: '/uc-doc/upgrade/archives/migrate_i386_to_amd64',
  },
  {
    from: '/contribute',
    to: '/docs/contribute',
  },
  {
    from: '/contribute/code',
    to: '/docs/contribute/codebase',
  },
  {
    from: '/contribute/new_service',
    to: '/docs/contribute/new-service',
  },
  {
    from: '/contribute/rest',
    to: '/docs/contribute/rest-api',
  },
  {
    from: ['/tutorials', '/tutorials/authenticate-user-wazo-api'],
    to: '/docs/tutorials/authenticate-user-wazo-api',
  },
  // former hand-maintained /docs/api pages, replaced by /documentation/overview
  {
    from: '/docs/category/api',
    to: '/documentation',
  },
  {
    from: '/docs/wazo-agentd',
    to: '/documentation/overview/agent',
  },
  {
    from: '/docs/wazo-agentd/dev-notes',
    to: '/documentation/overview/agent-core',
  },
  {
    from: '/docs/wazo-amid',
    to: '/documentation/overview/amid',
  },
  {
    from: '/docs/wazo-auth',
    to: '/documentation/overview/authentication',
  },
  {
    from: '/docs/wazo-auth/admin-notes',
    to: '/documentation/overview/authentication-admin',
  },
  {
    from: '/docs/wazo-auth/dev-notes',
    to: '/documentation/overview/authentication-dev',
  },
  {
    from: '/docs/wazo-call-logd',
    to: '/documentation/overview/cdr',
  },
  {
    from: '/docs/wazo-call-logd/admin-notes',
    to: '/documentation/overview/cdr-admin',
  },
  {
    from: '/docs/wazo-calld',
    to: '/documentation/overview/application',
  },
  {
    from: '/docs/wazo-calld/dev-notes',
    to: '/documentation/overview/application-dev',
  },
  {
    from: '/docs/wazo-chatd',
    to: '/documentation/overview/chat',
  },
  {
    from: '/docs/wazo-confd',
    to: '/documentation/overview/configuration',
  },
  {
    from: '/docs/wazo-dird',
    to: '/documentation/overview/contact',
  },
  {
    from: '/docs/wazo-dird/glossary',
    to: '/documentation/overview/contact-glossary',
  },
  {
    from: '/docs/wazo-plugind',
    to: '/documentation/overview/plugins',
  },
  {
    from: '/docs/wazo-plugind/admin-notes',
    to: '/documentation/overview/plugins-admin',
  },
  {
    from: '/docs/wazo-provd',
    to: '/documentation/overview/provisioning',
  },
  {
    from: '/docs/wazo-provd/admin-notes',
    to: '/documentation/overview/provisioning-admin',
  },
  {
    from: '/docs/wazo-router-confd',
    to: '/documentation/overview/router-confd',
  },
  {
    from: '/docs/wazo-webhookd',
    to: '/documentation/overview/webhook',
  },
  {
    from: '/docs/wazo-webhookd/dev-notes',
    to: '/documentation/overview/webhook-core',
  },
  {
    from: '/docs/wazo-websocketd',
    to: '/documentation/overview/websocket',
  },
  {
    from: '/docs/wazo-websocketd/dev-notes',
    to: '/documentation/overview/websocket-app',
  },
];

export default REDIRECTS;
