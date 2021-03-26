import styles from './ModalDeleteEvent.module.scss';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

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

const ModalDeleteEvent = ({ event, token }) => {
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

  const deleteEvent = async (e) => {
    e.preventDefault();
    try {
      const req = await fetch(`${process.env.API_ROOT}events/${event.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
      })
      setIsOpen(false);
      router.push(`/employer_home/`);
    } catch (error) {
      console.log(error)
    }
  }

  return (
  	<div className={styles.ModalDeleteEvent}>

      <div className={styles.ModalDeleteEvent__updateButton}>
    	 <button onClick={openModal}>Supprimer<br/> l'évenement</button>
      </div>

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <div className={styles.ModalDeleteEvent__Modal}>
            <h2>Supprimer l'évenement</h2>
            <h3>Êtes-vous sûre de vouloir supprimer l'évenement?</h3>
            <div>
              <button onClick={deleteEvent}>Oui, je supprime</button>
              <button onClick={closeModal}>Non, je retourne à la liste</button>
            </div>
          </div>
        </Modal>
    </div>
  );
};

export default ModalDeleteEvent;
