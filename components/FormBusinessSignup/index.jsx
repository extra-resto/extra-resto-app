import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styles from './FormBusinessSignup.module.scss';
import config from 'config/config.json';
import Image from 'next/image';
import Button from 'components/Button';

const FormBusinessSignup = () => {
  const token = useSelector(state => state.token);
  const [form, setForm] = useState({ 
    name: '',
    address: '',
    postal_code: '',
    city: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({name: ''});
  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (errors.name === '') {
        registerBusiness();
      }
      else {
        setIsSubmitting(false);
      }
    }
  }, [errors])

  const registerBusiness = async () => {
    try {
      const req = await fetch(`${config.SERVER_URL}businesses`, {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })
      const result = await req.json();
      router.push("/");
      
    } catch (error) {
      console.log(error)
    }
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

  return (
    <div className={styles.Login}>
      <div className={styles.Login__background}>
        <div className={styles.Login__background__img}>
          <h1>Entreprise</h1>
          <Image src="/images/icons/restaurant-store-svgrepo-com.svg" height={250} width={250} />
        </div>
        {errors.name ? <p>La confirmation de mot de passe est différente du mot de passse</p> : null}
        <div className={styles.Login__background__form}>
          <form className={styles.SignupEmployer} onSubmit={handleSubmit}>
            <label htmlFor="name"></label>
            <input 
              placeholder="Nom de l'établissement"
              name="name" 
              type="text" 
              autoComplete="name" 
              onChange={handleChange} 
              required 
            />
            <label htmlFor="address"></label>
            <input 
              placeholder="Adresse"
              name="address"
              type="text"
              autoComplete="address"
              onChange={handleChange}
              required
            />
            <label htmlFor="postal_code"></label>
            <input 
              placeholder="Code postal"
              name="postal_code"
              type="text"
              autoComplete="postal_code"
              onChange={handleChange}
              required
            />
            <label htmlFor="city"></label>
            <input 
              placeholder="Ville"
              name="city"
              type="city" 
              autoComplete="city" 
              onChange={handleChange} 
              required 
            />
            <Button type="submit" content="Valider" />
          </form>
        </div>
      </div>
    </div>
  )
};

export default FormBusinessSignup;
