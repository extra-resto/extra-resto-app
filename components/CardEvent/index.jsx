import styles from './CardEvent.module.scss';

const CardEvent = ({ event }) => {
  return (

    <div className={styles.CardEvent}>
	    <div className={styles.CardEvent__head}>
	      <h3>{event.name}</h3>
	    </div>
	    <div className={styles.CardEvent__body}>
	    	<ul className={styles.CardEvent__body}>
	    		{event.jobs && event.jobs.map(job => (
					<li>{job.free_stead} x {job.name} {job.candidatures.length===1 && `(1 candidate)`}{job.candidatures.length>1 && `(${job.candidatures.length} candidates)`}</li>
	    		))}
	      	</ul>
	    </div>
    </div>
  );
}

export default CardEvent;
