---
title: wazo-sysconfd
---

import CardList from '@site/src/components/Card/CardList';

This service provides a public API that can be used to change the configuration that are on a Wazo.

**Warning** The 0.1 API is currently in development. Major changes could still happen and new
resources will be added over time.

## API reference

<CardList
  items={[
    { text: 'Asterisk voicemail', href: '/uc-doc/api_sdk/rest_api/sysconfd/asterisk_voicemail' },
    { text: 'Common configuration', href: '/uc-doc/api_sdk/rest_api/sysconfd/common_configuration' },
    { text: 'Dhcpd configuration', href: '/uc-doc/api_sdk/rest_api/sysconfd/dhcpd_configuration' },
    { text: 'HA', href: '/uc-doc/api_sdk/rest_api/sysconfd/ha' },
    { text: 'DNS', href: '/uc-doc/api_sdk/rest_api/sysconfd/dns' },
    { text: 'Services', href: '/uc-doc/api_sdk/rest_api/sysconfd/services' },
    { text: 'Xivo services', href: '/uc-doc/api_sdk/rest_api/sysconfd/xivo_services' },
    { text: 'Handlers', href: '/uc-doc/api_sdk/rest_api/sysconfd/handlers' },
    { text: 'Status check', href: '/uc-doc/api_sdk/rest_api/sysconfd/status_check' },
  ]}
/>
