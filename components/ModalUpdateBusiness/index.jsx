import styles from './ModalUpdateBusiness.module.scss';
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

const ModalUpdateBusiness = ({ business, token }) => {
  const [modalIsOpen,setIsOpen] = useState(false);


  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({name: '', address: '', postal_code: '', city:'', user_id:''});
  const router = useRouter();
  const [form, setForm] = useState({
    name: business.name, 
    address: business.address, 
    postal_code: business.postal_code, 
    city: business.city, 
    user_id: business.user_id,
    id: business.id
  });

  useEffect(() => {
    if (isSubmitting) {
      if (errors.name === '') {
        updateBusiness();
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

  const updateBusiness = async () => {
    try {
      const req = await fetch(`http://localhost:3000/api/businesses/${business.id}`, {
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
  	<div className={styles.ModalUpdateBusiness}>

      <div className={styles.ModalUpdateBusiness__updateButton}>
    	 <button onClick={openModal}>Mettre à jour</button>
      </div>

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <div className={styles.ModalUpdateBusiness__Modal}>
            <h2>Modifier mon entreprise</h2>
            <form className={styles.ModalUpdateBusiness__Modal__form} onSubmit={handleSubmit}>
              <label htmlFor="name">Nom de l'établissement</label>
              <input 
                name="name" 
                type="text" 
                autoComplete="name" 
                value={form.name}
                onChange={handleChange} 
                required 
              />
              <label htmlFor="address">Adresse</label>
              <input 
                name="address"
                type="text"
                autoComplete="address"
                value={form.address}
                onChange={handleChange}
                required
              />
              <label htmlFor="postal_code">Code postal</label>
              <input 
                name="postal_code"
                type="text"
                autoComplete="postal_code"
                value={form.postal_code}
                onChange={handleChange}
                required
              />
              <label htmlFor="city">Ville</label>
              <input 
                name="city"
                type="city" 
                autoComplete="city"
                onChange={handleChange} 
                value={form.city}
                required 
              />
              <button type="submit">Enregister</button>
            </form>
          </div>
        </Modal>
    </div>
  );
};

export default ModalUpdateBusiness;
