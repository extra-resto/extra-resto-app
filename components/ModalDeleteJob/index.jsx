import styles from './ModalDeleteJob.module.scss';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';

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
      const req = await fetch(`http://localhost:3000/api/jobs/${job.id}`, {
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
    	 <button onClick={openModal}>
        <Image
          src="/images/Button/delete.svg"
          height={20} 
          width={20} 
          alt="delete cross"
        />
       </button>
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
