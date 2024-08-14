import useBaseUrl from '@docusaurus/useBaseUrl';
import { Controls, Player } from '@lottiefiles/react-lottie-player';
import Heading from '@theme/Heading';
import { useRef } from 'react';
import styles from './styles.module.css';

const Showcase = () => {
  const playerRef = useRef<Player>(null);

  return (
    <section className={styles.demo}>
      <div className={styles.description}>
        <Heading as="h1">Your Own Solution</Heading>
        <p>
          Design a solution that reflects your unique vision, whether it's
          streamlining team collaboration, creating seamless customer
          interactions, or coming up with a new way of connecting.
          <br />
          <br />
          Our project is backed by the&nbsp;
          <a href="https://www.tldrlegal.com/license/gnu-general-public-license-v3-gpl-3">
            GPL-3
          </a>
          &nbsp;license, which means you can use it for free, even for
          commercial purposes.
        </p>
      </div>
      <Player
        className={styles.animation}
        ref={playerRef}
        autoplay
        loop
        src={useBaseUrl('animations/conference.json')}
      >
        <Controls visible={false} />
      </Player>
    </section>
  );
};

export default Showcase;
