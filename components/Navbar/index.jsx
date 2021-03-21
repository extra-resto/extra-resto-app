import Link from 'next/link';
import styles from './Navbar.module.scss';
import Image from 'next/image';
import Modal from 'react-modal';
import React, { useState } from 'react';
import Logout from 'components/Logout';
import { useSelector } from 'react-redux';

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

export const Navbar = () => {
  const [modalIsOpen,setIsOpen] = React.useState(false);
  const token = useSelector(state => state.token);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
  }

  function closeModal(){
    setIsOpen(false);
  }


  return (
    <>
      <nav className={styles.Navbar}>
        <Link href='/'>
  	      <a>
          <Image 
            src="/images/Navbar/eye.svg"
            height={90} 
            width={90} 
            alt="extra-resto logo"
          />
          </a>
        </Link>
        <Link href='/concept'>
  	      <a>Le Concept</a>
        </Link>

        {token ? (
          <Logout />
        ):
        (
          <>
            <a onClick={openModal}>S'inscrire</a>
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div className={styles.Modal}>
                <Link href='/signup/candidate'>
                <a className={styles.Modal__candidate}>
                  <div className={styles.Modal__candidate__text}>
                    <h2>Je cherche du travail</h2>
                    <h3>Je suis Candidat</h3>
                  </div>
                </a>
                </Link>
                <Link href='/signup/employer'>
                  <a className={styles.Modal__employer}>
                    <div className={styles.Modal__employer__text}>
                      <h2>Je possède une entreprise et je cherche à recruter</h2>
                      <h3>Je suis Employeur</h3>
                    </div>
                  </a>
                </Link>
              </div>
            </Modal>
            <Link href='/login'>
              <a>Se Connecter</a>
            </Link>
          </>
        )}
      </nav>
    </>
  )
}

export default Navbar;
