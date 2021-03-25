import React, { useState } from 'react';
import styles from './ModalCandidateEmployer.module.scss';
import Link from 'next/link';
import Modal from 'react-modal';
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

const ModalCandidateEmployer = () => {
	const [modalIsOpen,setIsOpen] = React.useState(false);

	const openModal = () => {
    setIsOpen(true);
  }

  const afterOpenModal = () => {
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
  	<div className={styles.ModalCandidateEmployer}>
      <Button content="S'inscrire" href={openModal}/>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className={styles.ModalCandidateEmployer__Modal}>
            <Link href='/signup/candidate'>
            <a className={styles.ModalCandidateEmployer__Modal__candidate}>
              <div className={styles.ModalCandidateEmployer__Modal__candidate__text}>
                <h2>Je cherche du travail</h2>
                <h3>Je suis Candidat</h3>
              </div>
            </a>
            </Link>
            <Link href='/signup/employer'>
              <a className={styles.ModalCandidateEmployer__Modal__employer}>
                <div className={styles.ModalCandidateEmployer__Modal__employer__text}>
                  <h2>Je possède une entreprise et je cherche à recruter</h2>
                  <h3>Je suis Employeur</h3>
                </div>
              </a>
            </Link>
          </div>
        </Modal>
    </div>
  );
};

export default ModalCandidateEmployer;

