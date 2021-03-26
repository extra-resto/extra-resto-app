import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styles from './FormBusinessSignup.module.scss';

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
      const req = await fetch(`${process.env.API_ROOT}businesses`, {
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
    <>
      {errors.name ? <p>La confirmation de mot de passe est différente du mot de passse</p> : null}
      <h2>Mon entreprise</h2>
      <form className={styles.SignupEmployer} onSubmit={handleSubmit}>
        <label htmlFor="name">Nom de l'établissement</label>
        <input 
          name="name" 
          type="text" 
          autoComplete="name" 
          onChange={handleChange} 
          required 
        />
        <label htmlFor="address">Adresse</label>
        <input 
          name="address"
          type="text"
          autoComplete="address"
          onChange={handleChange}
          required
        />
        <label htmlFor="postal_code">Code postal</label>
        <input 
          name="postal_code"
          type="text"
          autoComplete="postal_code"
          onChange={handleChange}
          required
        />
        <label htmlFor="city">Ville</label>
        <input 
          name="city"
          type="city" 
          autoComplete="city" 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Enregistrer</button>
      </form>
    </>
  )
};

export default FormBusinessSignup;
