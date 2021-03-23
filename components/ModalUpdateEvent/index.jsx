import styles from './ModalUpdateEvent.module.scss';
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

const ModalUpdateEvent = ({ event, token }) => {
  const [modalIsOpen,setIsOpen] = useState(false);


  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({name: '', description: '', date:''});
  const router = useRouter();
  const [form, setForm] = useState({
    name: event.name,
    description: event.description,
    date: event.date, 
    business_id: event.business_id,
  });

  useEffect(() => {
    if (isSubmitting) {
      if (errors.name === '') {
        updateEvent();
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
      err.name = 'Name is not correct'
    }
    
    return err;
  }

  const updateEvent = async () => {
    try {
      const req = await fetch(`http://localhost:3000/api/events/${event.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
      })
      setIsOpen(false);
      router.push(`/employer_home/`);
    } catch (error) {
      console.log(error)
    }
  }

  return (
  	<div className={styles.ModalUpdateEvent}>

      <div className={styles.ModalUpdateEvent__updateButton}>
    	 <button onClick={openModal}>Mettre à jour</button>
      </div>

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <div className={styles.ModalUpdateEvent__Modal}>
            <h2>Modifier l'évenement</h2>
            <form className={styles.ModalUpdateEvent__Modal__form} onSubmit={handleSubmit}>
              <label htmlFor="name">Nom de l'évenement</label>
              <input 
                name="name" 
                type="text" 
                autoComplete="name"
                value={form.name}
                onChange={handleChange} 
                required 
              />
              <label htmlFor="date">Date de l'évenement</label>
              <input 
                name="date" 
                type="date" 
                autoComplete="name"
                value={form.date}
                onChange={handleChange} 
                required 
              />
              <label htmlFor="description">Description de l'évenement</label>
              <textarea 
                name="description" 
                type="text"
                autoComplete="description"
                value={form.description}
                onChange={handleChange} 
                required 
              />
              <button type="submit">Enregistrer</button>
            </form>
          </div>
        </Modal>
    </div>
  );
};

export default ModalUpdateEvent;
