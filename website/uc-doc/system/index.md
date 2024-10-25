---
title: System
---

import CardList from '@site/src/components/Card/CardList';

## Wazo Micro-Services

Documentations for the main services that make up Wazo Platform system.

<CardList
  items={[
    {
      text: 'wazo-auth',
      href: '/uc-doc/system/wazo-auth',
      description: 'Services that handle all authentication logic.'
    },
    {
      text: 'wazo-webhookd',
      href: '/uc-doc/system/wazo-webhookd',
      description: 'Services that handle events.'
    },
    {
      text: 'wazo-calld',
      href: '/uc-doc/system/wazo-calld',
      description: 'Service that handle communication interactions.'
    },
    {
      text: 'wazo-confd',
      href: '/uc-doc/system/wazo-confd',
      description: 'Service that will configure the platform.'
    },
    {
      text: 'wazo-dird',
      href: '/uc-doc/system/wazo-dird',
      description: 'Service that handle contacts\' directories'
    },
    {
      text: 'wazo-sysconfd',
      href: '/uc-doc/system/wazo-sysconfd',
      description: 'Service that handle system configuration for Wazo.'
    },
    {
      text: 'wazo-confgend',
      href: '/uc-doc/system/wazo-confgend',
      description: 'Configuration file generator.'
    },
    {
      text: 'wazo-phoned',
      href: '/uc-doc/system/wazo-phoned',
      description: 'Interface to use directory service with phones'
    },
    {
      text: 'wazo-service',
      href: '/uc-doc/system/service',
      description: 'Command that interact with all services'
    },
    {
      text: 'wazo-purge-db',
      href: '/uc-doc/system/purge_logs',
      description: ''
    },
  ]}
/>


## Generic Services

Documentations of various and generix services included inside the platform.

<CardList
  items={[
    { text: 'DHCP Server', href: '/uc-doc/system/dhcp' },
    { text: 'Network', href: '/uc-doc/system/network' },
    { text: 'Backup Restore', href: '/uc-doc/system/backup_restore' },
    { text: 'HTTPS Certificate', href: '/uc-doc/system/https_certificate' },
    { text: 'Configuration Files', href: '/uc-doc/system/configuration_files' },
    { text: 'Log Files', href: '/uc-doc/system/log_files' },
    { text: 'nginx', href: '/uc-doc/system/nginx' },
    { text: 'NTP', href: '/uc-doc/system/ntp' },
    { text: 'Performance', href: '/uc-doc/system/performance' },
    { text: 'Proxy', href: '/uc-doc/system/proxy' },
    { text: 'Service Discovery', href: '/uc-doc/system/service_discovery' },
    { text: 'Service Authentication', href: '/uc-doc/system/service_authentication' },
  ]}
/>
