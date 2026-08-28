import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  kicker: string;
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    kicker: '01 / Interfaces',
    title: 'Programmable Interfaces',
    description: (
      <>
        All the programmable interfaces are mobile and web friendly: WebRTC,
        REST API, WebSockets and Webhooks.
      </>
    ),
  },
  {
    kicker: '02 / API-first',
    title: 'Easy to Consume',
    description: (
      <>
        We designed the platform with an API-First approach. Building blocks are
        micro-services developed in Python. All APIs are described through
        OpenAPI specifications.
      </>
    ),
  },
  {
    kicker: '03 / Proven',
    title: 'Battlefield Tested',
    description: (
      <>
        The core Telecom engine is implemented using the Asterisk, RTPEngine and
        Kamailio projects. The technical core engine is based on RabbitMQ, NGinx
        and PostgreSQL.
      </>
    ),
  },
];

const Feature = ({ kicker, title, description }: FeatureItem) => (
  <div className={styles.feature}>
    <div className={styles.featureKicker}>{kicker}</div>
    <Heading as="h3" className={styles.featureTitle}>
      {title}
    </Heading>
    <p className={styles.featureText}>{description}</p>
  </div>
);

const HomepageFeatures = () => (
  <section className="container">
    <div className={styles.features}>
      {FeatureList.map((props) => (
        <Feature key={props.title} {...props} />
      ))}
    </div>
  </section>
);

export default HomepageFeatures;
