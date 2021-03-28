import styles from './ModalUpdateBusiness.module.scss';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import config from 'config/config.json';
import Image from 'next/image';
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
      const req = await fetch(`${config.SERVER_URL}businesses/${business.id}`, {
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
    	 <button onClick={openModal}>…</button>
      </div>

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <div className={styles.ModalUpdateBusiness__Modal}>
            <Image src="/images/icons/bill-svgrepo-com (1).svg" height={250} width={250} />
            <h2>Modifier mon entreprise</h2>
            <form className={styles.ModalUpdateBusiness__Modal__form} onSubmit={handleSubmit}>
              <input 
                name="name" 
                type="text" 
                autoComplete="name" 
                value={form.name}
                placeHolder="Nom de l'établissement"
                onChange={handleChange} 
                required 
              />
              <input 
                name="address"
                type="text"
                autoComplete="address"
                value={form.address}
                placeHolder="Adresse"
                onChange={handleChange}
                required
              />
              <input 
                name="postal_code"
                type="text"
                autoComplete="postal_code"
                value={form.postal_code}
                placeHolder="Code postal"
                onChange={handleChange}
                required
              />
              <input 
                name="city"
                type="city" 
                autoComplete="city"
                onChange={handleChange} 
                value={form.city}
                placeHolder="Ville"
                required 
              />
              <Button type="submit" content="Enregister" />
            </form>
          </div>
        </Modal>
    </div>
  );
};

export default ModalUpdateBusiness;
