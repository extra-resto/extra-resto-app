import styles from './ModalDeleteJob.module.scss';
import Modal from 'react-modal';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import config from 'config/config.json';
import Button from 'components/Button';

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
            <Image src="/images/icons/bill-svgrepo-com (1).svg" height={250} width={250} />
            <h2>Supprimer le job</h2>
            <h3>Êtes-vous sûre de vouloir supprimer le job?</h3>
            <div className={styles.ModalDeleteJob__Modal__choices}>
              <div className={styles.ModalDeleteJob__Modal__choices__cancel}>
                <Image src="/images/Button/back.svg" height={50} width={50} alt="extra-resto logo" />
                <Button href={closeModal} content="Non, je retourne à la liste" />
              </div>
              <div className={styles.ModalDeleteJob__Modal__choices__delete}>
                <Image src="/images/Button/trash.svg" height={50} width={50} alt="extra-resto logo" />
                <Button href={deleteJob} content="Oui, je supprime" />
              </div>
            </div>
          </div>
        </Modal>
    </div>
  );
};

export default ModalDeleteJob;
