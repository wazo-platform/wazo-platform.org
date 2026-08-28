import { Icon } from '@iconify/react';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import styles from './styles.module.css';

const contacts = [
  { name: '72%', detail: '46%' },
  { name: '60%', detail: '38%' },
  { name: '80%', detail: '42%' },
  { name: '55%', detail: '34%' },
];

const bars = [10, 20, 14, 26, 16, 8, 18, 12];

// Decorative softphone wireframe: "your own client, built on the platform
// APIs" — pure placeholder shapes, hidden from assistive tech.
const SoftphoneWireframe = () => (
  <div className={styles.frame} aria-hidden="true">
    <div className={styles.window}>
      <div className={styles.windowBar}>
        <span className={styles.windowDot} />
        <span className={styles.windowDot} />
        <span className={styles.windowDot} />
        <span className={styles.windowTitle}>your softphone</span>
      </div>
      <div className={styles.windowBody}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarSearch} />
          <div className={styles.sidebarList}>
            {contacts.map((contact) => (
              <div key={contact.name} className={styles.contact}>
                <div className={styles.contactAvatar} />
                <div className={styles.contactLines}>
                  <div style={{ width: contact.name }} />
                  <div style={{ width: contact.detail }} />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.sidebarFooter} />
        </div>
        <div className={styles.call}>
          <div className={styles.callAvatar}>
            <Icon icon="mdi:account" width={34} height={34} />
          </div>
          <div className={styles.callLines}>
            <div />
            <div />
          </div>
          <div className={styles.waveform}>
            {bars.map((height, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static decorative list
              <span key={index} style={{ height }} />
            ))}
          </div>
          <div className={styles.callActions}>
            <span>
              <Icon icon="mdi:microphone-off" width={20} height={20} />
            </span>
            <span>
              <Icon icon="mdi:dialpad" width={20} height={20} />
            </span>
            <span>
              <Icon icon="mdi:video" width={20} height={20} />
            </span>
            <span className={styles.callHangup}>
              <Icon icon="mdi:phone-hangup" width={20} height={20} />
            </span>
          </div>
        </div>
      </div>
    </div>
    <div className={styles.frameCaption}>
      Wireframe — your own client, built on the platform APIs
    </div>
  </div>
);

const Showcase = () => (
  <section className={clsx('container', styles.demo)}>
    <div className={styles.description}>
      <Heading as="h2" className={styles.title}>
        Your Own Solution
      </Heading>
      <p>
        Design a solution that reflects your unique vision, whether it's
        streamlining team collaboration, creating seamless customer
        interactions, or coming up with a new way of connecting.
      </p>
      <p>
        Our project is backed by the&nbsp;
        <a href="https://www.tldrlegal.com/license/gnu-general-public-license-v3-gpl-3">
          GPL-3
        </a>
        &nbsp;license, which means you can use it for free, even for commercial
        purposes.
      </p>
      <div className={styles.points}>
        <div>
          <b>Self-hosted</b>
          <span>Your infrastructure, your data.</span>
        </div>
        <div>
          <b>Extensible</b>
          <span>Plugins and custom services.</span>
        </div>
        <div>
          <b>No lock-in</b>
          <span>Standard SIP and open specs.</span>
        </div>
      </div>
    </div>
    <SoftphoneWireframe />
  </section>
);

export default Showcase;
