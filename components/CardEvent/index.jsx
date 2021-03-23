import styles from './CardEvent.module.scss';

const CardEvent = ({ event }) => {
  return (
    
    <div className={styles.CardEvent}>
      <p>{event.name}</p>
    </div>
  );
}

export default CardEvent;
