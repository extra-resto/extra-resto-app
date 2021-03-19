import React from 'react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const SignupEmployer = () => {
  const [form, setForm] = useState({ 
    name: '',
    adress: '',
    postal_code: '',
    city: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({name: ''});

  useEffect(() => {
    if (isSubmitting) {
      if (errors.name === '') {
        registerEmployer();
      }
      else {
        setIsSubmitting(false);
      }
    }
  }, [errors])

  const registerEmployer = async () => {
    const token = Cookies.get('token')
    console.log(token)
    try {
      const req = await fetch('http://localhost:3000/api/businesses', {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })
      const result = await req.json();
      console.log(result);
      
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
    type Err = {
      name: string;
    }

    let err: Err = { name: '' };

    if(!form.name) {
      err.name = 'Password and confirmation password are different'
    }
    
    return err;
  }

  return (
    <>
      {errors.name ? <p>La confirmation de mot de passe est différente du mot de passse</p> : null}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nom de l'établissement</label>
        <input 
          name="name" 
          type="text" 
          autoComplete="name" 
          onChange={handleChange} 
          required 
        />
        <label htmlFor="adress">Adresse</label>
        <input 
          name="adress"
          type="text"
          autoComplete="adress"
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
        <button type="submit">Valider</button>
      </form>
    </>
  )
};

export default SignupEmployer;