import Card, { type Props as CardProps } from './Card';
import styles from './CardList.module.css';

type Props = {
  items: CardProps[];
};

const CardList = ({ items }: Props) => {
  if (!items?.length) {
    return undefined;
  }

  return (
    <div className={styles.listing}>
      {items?.map((item: CardProps) => (
        <Card key={item.href} {...item} />
      ))}
    </div>
  );
};

export default CardList;
