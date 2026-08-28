import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageServices from '@site/src/components/HomepageServices';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import clsx from 'clsx';

import Showcase from '../components/Showcase';
import styles from './index.module.css';

const HeroPanel = () => (
  <div className={styles.heroPanel}>
    <div className={styles.heroPanelHeader}>
      <span className={styles.heroPanelKicker}>Open all the way down</span>
      <span className={styles.heroPanelNote}>No vendor lock-in</span>
    </div>
    <div className={styles.heroPanelBody}>
      <div className={clsx(styles.stackCard, styles.stackCardDashed)}>
        <b>Your application</b>
        <span>
          Softphone, contact center, embedded voice — yours to design.
        </span>
      </div>
      <div className={styles.stackArrow} aria-hidden="true">
        ↓
      </div>
      <div className={clsx(styles.stackCard, styles.stackCardHighlight)}>
        <div className={styles.stackCardTitleRow}>
          <b>Wazo Platform APIs</b>
          <span>OpenAPI</span>
        </div>
        <div className={styles.stackChips}>
          <span>REST</span>
          <span>WebRTC</span>
          <span>WebSockets</span>
          <span>Webhooks</span>
        </div>
      </div>
      <div className={styles.stackArrow} aria-hidden="true">
        ↓
      </div>
      <div className={styles.stackCard}>
        <b>Open telecom core</b>
        <div className={clsx(styles.stackChips, styles.stackChipsMuted)}>
          <span>Asterisk</span>
          <span>PostgreSQL</span>
          <span>RabbitMQ</span>
        </div>
      </div>
    </div>
    <div className={styles.heroPanelFooter}>
      Your infrastructure, and the data always stays yours
    </div>
  </div>
);

const HomepageHero = () => (
  <header className={styles.hero}>
    <div className={clsx('container', styles.heroInner)}>
      <div>
        <Heading as="h1" className={styles.heroTitle}>
          Build your own
          <br />
          IP telecom platform
        </Heading>
        <p className={styles.heroSubtitle}>
          Wazo Platform is an open source, API-first stack of telecom
          micro-services. Voice, video, messaging and presence — programmable
          end to end.
        </p>
        <div className={styles.heroButtons}>
          <Link className="button button--primary button--lg" to="/docs/intro">
            Get started
          </Link>
          <Link
            className={clsx('button button--lg', styles.buttonOutline)}
            to="/uc-doc/installation"
          >
            Installation
          </Link>
        </div>
        <div className={styles.heroTags}>
          <span>Open source</span>
          <span>GPLv3</span>
        </div>
      </div>
      <HeroPanel />
    </div>
  </header>
);

const HomepageCommunity = () => (
  <section className="container">
    <div className={styles.community}>
      <div>
        <Heading as="h2" className={styles.communityTitle}>
          Built in the open, with the community
        </Heading>
        <p className={styles.communityText}>
          Report a bug, propose a feature, or ship a patch. Discussion happens
          on Mattermost and the forum; code review happens on GitHub.
        </p>
      </div>
      <div className={styles.communityButtons}>
        <Link
          className="button button--primary button--lg"
          to="/docs/contribute"
        >
          Contribute
        </Link>
        <a
          className={clsx('button button--lg', styles.buttonOutline)}
          href="https://mm.wazo.community/wazo-platform/"
        >
          Join Mattermost
        </a>
      </div>
    </div>
  </section>
);

const Home = () => {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout description={siteConfig.tagline}>
      <HomepageHero />
      <main>
        <HomepageFeatures />
        <HomepageServices />
        <Showcase />
        <HomepageCommunity />
      </main>
    </Layout>
  );
};

export default Home;
