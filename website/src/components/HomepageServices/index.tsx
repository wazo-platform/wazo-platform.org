import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type Service = {
  // iconify name, as the API references landing renders it (see
  // src/plugins/documentation/helper.ts iconifyName + content/sections.yaml)
  icon: string;
  name: string;
  description: string;
  repository: string;
  module: string;
  graphql?: boolean;
};

const services: Service[] = [
  {
    icon: 'fa-solid:key',
    name: 'Authentication',
    description: 'Users, groups, policies and ACLs.',
    repository: 'wazo-auth',
    module: 'authentication',
  },
  {
    icon: 'fa-solid:brain',
    name: 'Application',
    description: 'Create your communication application.',
    repository: 'wazo-calld',
    module: 'application',
  },
  {
    icon: 'fa-solid:cogs',
    name: 'Configuration',
    description: 'Configure your platform.',
    repository: 'wazo-confd',
    module: 'configuration',
  },
  {
    icon: 'fa-solid:users',
    name: 'Contacts',
    description: 'Get, manage and search contacts.',
    repository: 'wazo-dird',
    module: 'contact',
    graphql: true,
  },
  {
    icon: 'fa-solid:globe',
    name: 'Webhooks',
    description: 'Create webhooks based on Wazo events.',
    repository: 'wazo-webhookd',
    module: 'webhook',
  },
  {
    icon: 'fa-solid:newspaper',
    name: 'Call Detail Record',
    description: 'Get your CDRs by our API.',
    repository: 'wazo-call-logd',
    module: 'cdr',
  },
];

const ServiceRow = ({
  icon,
  name,
  description,
  repository,
  module,
  graphql,
}: Service) => (
  <div className={styles.row}>
    <div className={styles.rowIdent}>
      <div className={styles.rowIcon}>
        <Icon icon={icon} width={18} height={18} />
      </div>
      <div>
        <div className={styles.rowName}>{name}</div>
        <div className={styles.rowDescription}>{description}</div>
      </div>
    </div>
    <div className={styles.rowLinks}>
      <Link to={`/documentation/overview/${module}`}>Overview</Link>
      <Link to={`/documentation/api/${module}`}>API Reference</Link>
      <Link to={`/documentation/console/${module}`}>Console</Link>
      {graphql ? (
        <Link to={`/documentation/graphql/${module}`}>GraphQL</Link>
      ) : (
        <Link to={`/documentation/events/${module}`}>Events</Link>
      )}
    </div>
    <div className={styles.rowRepo}>{repository}</div>
  </div>
);

const HomepageServices = () => (
  <section className="container">
    <div className={styles.header}>
      <div>
        <Heading as="h2" className={styles.title}>
          Every service, documented
        </Heading>
        <p className={styles.subtitle}>
          Each micro-service ships with an overview, a REST reference, a live
          console and event schemas.
        </p>
      </div>
      <Link className={styles.allLink} to="/documentation">
        All API references
      </Link>
    </div>
    <div className={styles.rows}>
      {services.map((service) => (
        <ServiceRow key={service.module} {...service} />
      ))}
    </div>
  </section>
);

export default HomepageServices;
