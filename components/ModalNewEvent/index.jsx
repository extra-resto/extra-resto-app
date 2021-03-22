import styles from './ModalNewEvent.module.scss';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import { setUser, setEmployer, setCandidate } from 'store/User/userAction';
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

const ModalNewEvent = ({ userInfos }) => {
  const [modalIsOpen,setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({password: '', phone_number: ''});
  const router = useRouter();
  const [form, setForm] = useState({ 
    name: '',
    date: new Date(),
    description: '',
    business_id: userInfos.businesses[0].id
  });

  useEffect(() => {
    if (isSubmitting) {
      registerEvent();
      // if (errors.password === '' && errors.phone_number === '') {
      //   registerEvent();
      // }
      // else {
      //   setIsSubmitting(false);
      // }
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

    let err = { name: '' };

    if(!form.name) {
      err.name = 'Password and confirmation password are different'
    }
    
    return err;
  }

  const registerEvent = async () => {
    try {
      const req = await fetch(`${process.env.API_ROOT}events`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
      })
      setIsOpen(false);
    } catch (error) {
      console.log(error)
    }
  }


  return (
  	<div className={styles.ModalNewEvent}>
    	<button onClick={openModal}>Nouvel Evenement</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <div className={styles.ModalNewEvent__Modal}>
            <form className={styles.FormEmployerSignup} onSubmit={handleSubmit}>
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
              <input 
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
