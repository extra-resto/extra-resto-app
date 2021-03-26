import styles from './ModalNewEvent.module.scss';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import { setUser, setEmployer, setCandidate } from 'store/User/userAction';
import { useDispatch } from 'react-redux';
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

const ModalNewEvent = ({ userInfos, token }) => {
  const [modalIsOpen,setIsOpen] = useState(false);


  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({name: '', date: '', description: ''});
  const router = useRouter();
  const [form, setForm] = useState({ 
    name: '',
    date: new Date(),
    description: '',
    business_id: userInfos.businesses[0].id
  });

  useEffect(() => {
    if (isSubmitting) {
      if (errors.name === '' && errors.date === '' && errors.description === '') {
        registerEvent();
      }
      else {
        setIsSubmitting(false);
      }
    }
  }, [errors])
	

	const openModal = () => {
    setIsOpen(true);
  }

  const afterOpenModal = () => {
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const validate = () => {

    let err = {name: '', date: '', description: ''};

    if(!form.name) {
      err.name = 'Password and confirmation password are different'
    }
    
    return err;
  }

  const registerEvent = async () => {
    try {
      const req = await fetch(`${config.SERVER_URL}events`, {
          method: 'POST',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
      })
      setIsOpen(false);
      router.push("/employer_home");
    } catch (error) {
      console.log(error)
    }
  }


  return (
  	<div className={styles.ModalNewEvent}>

      <div className={styles.ModalNewEvent__newEvent}>
    	<button onClick={openModal}>Ajouter un Evenement</button>
      </div>


        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <div className={styles.ModalNewEvent__Modal}>
            <h2>Nouvel Evenement</h2>
            <form className={styles.ModalNewEvent__Modal__form} onSubmit={handleSubmit}>
              <label htmlFor="name">Nom de l'évenement</label>
              <input 
                name="name" 
                type="text" 
                autoComplete="name" 
                onChange={handleChange} 
                required 
              />
              <label htmlFor="date">Date de l'évenement</label>
              <input 
                name="date" 
                type="date" 
                autoComplete="name"
                onChange={handleChange} 
                required 
              />
              <label htmlFor="description">Description de l'évenement</label>
              <textarea 
                name="description" 
                type="text"
                autoComplete="description" 
                onChange={handleChange} 
                required 
              />
              <button type="submit">Nouvel evenement</button>
            </form>
          </div>
        </Modal>
    </div>
  );
};

export default ModalNewEvent;
