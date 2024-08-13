import { Icon } from '@iconify/react';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Programmable Interfaces',
    Svg: () => <Icon fontSize={64} icon="mdi:monitor-mobile-phone" />,
    description: (
      <>
        All the programmable interfaces are mobile and web friendly: WebRTC,
        REST API, WebSockets and Webhooks.
      </>
    ),
  },
  {
    title: 'Easy to Consume',
    Svg: () => <Icon fontSize={64} icon="mdi:api" />,
    description: (
      <>
        We designed the platform with an API-First approach. Building blocks are
        micro-services developed in Python. All APIs are described through
        OpenAPI specifications.
      </>
    ),
  },
  {
    title: 'Battlefield Tested',
    Svg: () => <Icon fontSize={64} icon="mdi:shield" />,
    description: (
      <>
        The core Telecom engine is implemented using the Asterisk, RTPEngine and
        Kamailio projects. The technical core engine is based on RabbitMQ, NGinx
        and PostgreSQL.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props) => (
            <Feature key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
