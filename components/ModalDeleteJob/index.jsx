import styles from './ModalDeleteJob.module.scss';
import Modal from 'react-modal';
import { useState } from 'react';
import { useRouter } from 'next/router';
import config from 'config/config.json';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#__next');

const ModalDeleteJob = ({ event, job, token }) => {
  const [modalIsOpen,setIsOpen] = useState(false);
  const router = useRouter();
  
	const openModal = () => {
    setIsOpen(true);
  }

  const afterOpenModal = () => {
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const deleteJob = async (e) => {
    e.preventDefault();
    try {
      const req = await fetch(`${config.SERVER_URL}jobs/${job.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
      })
      setIsOpen(false);
      router.push(`/employer_home/event/${event.id}`);
    } catch (error) {
      console.log(error)
    }
  }

  return (
  	<div className={styles.ModalDeleteJob}>

      <div className={styles.ModalDeleteJob__updateButton}>
    	 <button onClick={openModal}>Supprimer<br/> le job</button>
      </div>

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <div className={styles.ModalDeleteJob__Modal}>
            <h2>Supprimer le job</h2>
            <h3>Êtes-vous sûre de vouloir supprimer le job?</h3>
            <div>
              <button onClick={deleteJob}>Oui, je le supprime</button>
              <button onClick={closeModal}>Non, je retourne à la liste</button>
            </div>
          </div>
        </Modal>
    </div>
  );
};

export default ModalDeleteJob;
