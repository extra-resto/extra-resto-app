import styles from './ModalNewJob.module.scss';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { motion } from "framer-motion";
import config from 'config/config.json';
import Button from 'components/Button';
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
      const req = await fetch(`${config.SERVER_URL}jobs`, {
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
    	 <button onClick={openModal}>
        <motion.p
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 0.8 }}
        >
          +
        </motion.p>
       </button>
      </div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className={styles.ModalNewJob__Modal}>
            <Image src="/images/Button/job.svg" height={250} width={250} />
            <h2>Nouvel Emploi</h2>
            <form className={styles.ModalNewJob__Modal__form} onSubmit={handleSubmit}>
                <input 
                name="name" 
                type="text" 
                autoComplete="name" 
                onChange={handleChange} 
                placeHolder="Nom de l'emploi"
                required 
                />
                <textarea 
                name="description" 
                type="text"
                autoComplete="description" 
                onChange={handleChange}
                placeHolder="Description de l'emploi"
                required 
                />
                <textarea 
                name="dresscode" 
                type="text"
                autoComplete="dresscode" 
                onChange={handleChange}
                placeHolder="Dresscode de l'emploi"
                required 
                />
                <input 
                name="duration" 
                type="number"
                onChange={handleChange}
                placeHolder="Durée de l'emploi (h)"
                required 
                />
                <input 
                name="rate" 
                type="number"
                onChange={handleChange}
                placeHolder="Salaire horaire (€)"
                required 
                />
                <input 
                name="free_stead" 
                type="number"
                onChange={handleChange} 
                placeHolder="Places disponibles"
                required 
                />
              <Button type="submit" content="Poster" />
            </form>
          </div>
        </Modal>
    </div>
  );
};

export default ModalNewEvent;