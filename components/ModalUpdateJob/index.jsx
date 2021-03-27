import styles from './ModalUpdateJob.module.scss';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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

const ModalUpdateJob = ({ event, job, token }) => {
  const [modalIsOpen,setIsOpen] = useState(false);


  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({name: '', date: '', description: ''});
  const router = useRouter();
  const [form, setForm] = useState({ 
    name: job.name,
    description: job.description,
    dresscode: job.dresscode,
    duration: job.duration,
    rate: job.rate,
    free_stead: job.free_stead,
    date: event.date,
    event_id: event.id, 
  });

  useEffect(() => {
    if (isSubmitting) {
      if (errors.name === '') {
        updateJob();
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

  const updateJob = async () => {
    try {
      const req = await fetch(`${config.SERVER_URL}jobs/${job.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
      })
      setIsOpen(false);
      router.push(`/employer_home/event/${event.id}`);
    } catch (error) {
      console.log(error)
    }
  }

  return (
  	<div className={styles.ModalUpdateJob}>

      <div className={styles.ModalUpdateJob__updateButton}>
    	 <button onClick={openModal}>
        <Image
          src="/images/Button/website.svg"
          height={20} 
          width={20} 
          alt="extra-resto logo"
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

          <div className={styles.ModalUpdateJob__Modal}>
            <h2>Modifier le job</h2>
            <form className={styles.ModalNewJob__Modal__form} onSubmit={handleSubmit}>
                <label htmlFor="free_stead">Type d'emploi</label>
                <input 
                name="name" 
                type="text" 
                autoComplete="name"
                value={form.name}
                placeholder="Nom de l'emploi"
                onChange={handleChange}
                required 
                />
                <label htmlFor="free_stead">Description</label>
                <textarea 
                name="description" 
                type="text"
                autoComplete="description"
                value={form.description}
                placeholder="Description de l'emploi"
                onChange={handleChange} 
                required 
                />
                <label htmlFor="free_stead">Tenue vestimentaire</label>
                <textarea 
                name="dresscode" 
                type="text"
                autoComplete="dresscode"
                value={form.dresscode}
                placeholder="Dresscode"
                onChange={handleChange} 
                required 
                />
                <label htmlFor="free_stead">Durée de l'emploi (h)</label>
                <input 
                name="duration" 
                type="number"
                value={form.duration}
                placeHolder="Durée de l'emploi (h)"
                onChange={handleChange} 
                required 
                />
                <label htmlFor="rate">Salaire horaire (€)</label>
                <input 
                name="rate" 
                type="number"
                value={form.rate}
                placeHolder="Salaire horaire (€)"
                onChange={handleChange} 
                required 
                />
                <label htmlFor="free_stead">Places disponibles</label>
                <input 
                name="free_stead" 
                type="number"
                value={form.free_stead}
                onChange={handleChange} 
                required 
                />
              <Button type="submit" content="Modifier le job" />
            </form>
          </div>
        </Modal>
    </div>
  );
};

export default ModalUpdateJob;
