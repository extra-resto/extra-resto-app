import styles from './FormSignUp.module.scss';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { setUser } from '../../store/User/userAction';
import { useDispatch, useSelector } from 'react-redux';

const FormSignUp = ({ setStep }) => {
  const dispatch = useDispatch();
  const tokensel = useSelector(state => state.token)
  const [form, setForm] = useState({ 
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
    password_confirmation: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({password: '', phone_number: ''});

  useEffect(() => {
    if (isSubmitting) {
      if (errors.password === '' && errors.phone_number === '') {
        registerUser();
      }
      else {
        setIsSubmitting(false);
      }
    }
  }, [errors])

  const registerUser = async () => {
    try {
      const req = await fetch('http://localhost:3000/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user: form })
      })
      const token = req.headers.get('Authorization');
      dispatch(setUser(token))
      const result = await req.json();
      registerEmployer(token)
      console.log("iciiiiiiiiii")
      console.log(tokensel)

      setStep(2);
    } catch (error) {
      console.log(error)
    }
  }

  const registerEmployer = async (token) => {
    try {
      const req = await fetch('http://localhost:3000/api/employers', {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      })
      const result = await req.json();
      console.log(result)
      
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
      password: string;
      phone_number: string;
    }

    let err: Err = { password: '', phone_number: '' };

    if(form.password !== form.password_confirmation) {
      err.password = 'Password and confirmation password are different'
    }
    if(form.phone_number.match(/^\d+$/) === null) {
      err.phone_number = 'Veuillez entrer un numéro valide'
    }
    
    return err;
  }

  return (
    <>
      {errors.password ? <p>La confirmation de mot de passe est différente du mot de passse</p> : null}
      {errors.phone_number ? <p>Veuillez entrer un numéro de téléphone valide</p> : null}
      <form className={styles.FormSignUp} onSubmit={handleSubmit}>
        <label htmlFor="first_name">Prénom</label>
        <input 
          name="first_name" 
          type="text" 
          autoComplete="first_name" 
          onChange={handleChange} 
          required 
        />
        <label htmlFor="last_name">Nom de Famille</label>
        <input 
          name="last_name"
          type="text"
          autoComplete="last_name"
          onChange={handleChange}
          required
        />
        <label htmlFor="phone_number">n° de Téléphone</label>
        <input 
          name="phone_number"
          type="text"
          autoComplete="phone_number"
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email</label>
        <input 
          name="email" 
          type="email" 
          autoComplete="email" 
          onChange={handleChange} 
          required 
        />
        <label htmlFor="password">Mot de passe</label>
        <input 
          name="password" 
          type="password" 
          onChange={handleChange} 
          required 
        />
        <label htmlFor="password">Confirmation de mot de passe</label>
        <input 
          name="password_confirmation" 
          type="password" 
          onChange={handleChange} 
          required 
        />
        <button type="submit">S'enregistrer</button>
      </form>
    </>
  )
}

export default FormSignUp;
