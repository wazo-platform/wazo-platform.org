---
title: Contact Center
---

import CardList from '@site/src/components/Card/CardList';

<CardList
  items={[
    { text: 'Agents', href: '/uc-doc/contact_center/agents' },
    { text: 'Queues', href: '/uc-doc/contact_center/queues' },
    { text: 'Skill Based Routing', href: '/uc-doc/contact_center/skillbasedrouting' },
    { text: 'Reporting', href: '/uc-doc/contact_center/reporting' },
  ]}
/>

## Objectives

In Wazo, the contact center is implemented to fulfill the following objectives.

### Call routing

Includes basic call distribution using call queues and skills-based routing

### Agent and Supervisor workstation

Provides the ability to execute contact center actions such as: agent login, agent logout and to
receive real time statistics regarding contact center status

### Statistics reporting

Provides contact center management reporting on contact center activities

### Advanced functionalities

- Call recording
- Screen Pop-up
