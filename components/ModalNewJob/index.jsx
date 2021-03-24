import styles from './ModalNewJob.module.scss';
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

const ModalNewEvent = ({ eventId, token, eventDate }) => {
  const [modalIsOpen,setIsOpen] = useState(false);


  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({name: '', date: '', description: ''});
  const router = useRouter();
  const [form, setForm] = useState({ 
    name: '',
    description: '',
    dresscode: '',
    duration: '',
    rate: '',
    free_stead: '',
    date: eventDate,
    free_stead: '',
    event_id: eventId, 
  });

  useEffect(() => {
    if (isSubmitting) {
      if (errors.name === '' && errors.date === '' && errors.description === '') {
        registerJob();
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

  const registerJob = async () => {
    try {
      const req = await fetch(`http://localhost:3000/api/jobs`, {
          method: 'POST',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
      })
      setIsOpen(false);
      router.push(`/employer_home/event/${eventId}`);
    } catch (error) {
      console.log(error)
    }
  }


  return (
  	<div className={styles.ModalNewJob}>

      <div className={styles.ModalNewJob__newJob}>
    	<button onClick={openModal}>Ajouter un Job</button>
      </div>

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <div className={styles.ModalNewJob__Modal}>
            <h2>Nouvel Emploi</h2>
            <form className={styles.ModalNewJob__Modal__form} onSubmit={handleSubmit}>
                <label htmlFor="name">Nom de l'emploi</label>
                <input 
                name="name" 
                type="text" 
                autoComplete="name" 
                onChange={handleChange} 
                required 
                />
                <label htmlFor="description">Description de l'emploi</label>
                <textarea 
                name="description" 
                type="text"
                autoComplete="description" 
                onChange={handleChange} 
                required 
                />
                <label htmlFor="dresscode">Dresscode de l'emploi</label>
                <textarea 
                name="dresscode" 
                type="text"
                autoComplete="dresscode" 
                onChange={handleChange} 
                required 
                />
                <label htmlFor="duration">durée de l'emploi /h</label>
                <input 
                name="duration" 
                type="number"
                onChange={handleChange} 
                required 
                />
                <label htmlFor="rate">Prix de l'heure /€</label>
                <input 
                name="rate" 
                type="number"
                onChange={handleChange} 
                required 
                />
                <label htmlFor="free_stead">Place de disponible</label>
                <input 
                name="free_stead" 
                type="number"
                onChange={handleChange} 
                required 
                />
              <button type="submit">Nouvelle emploi</button>
            </form>
          </div>
        </Modal>
    </div>
  );
};

export default ModalNewEvent;