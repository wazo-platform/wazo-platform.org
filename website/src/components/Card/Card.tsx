import Link from '@docusaurus/Link';
import styles from './Card.module.css';

export type Props = {
  href?: string | undefined;
  text: string;
  description?: string;
};

const Card = ({ href, text, description }: Props) => {
  const RootElement = href ? Link : 'div';
  const RootProps = href ? { to: href } : {};

  return (
    <RootElement className={`card ${styles.override}`} {...RootProps}>
      <div className="card__body">
        <p className={styles.card__title}>{text}</p>
        {description && (
          <p className={styles.card__description}>{description}</p>
        )}
      </div>
    </RootElement>
  );
};

export default Card;
