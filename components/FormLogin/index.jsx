import Router from 'next/router';
import styles from './FormLogin.module.scss';
import { useState, useEffect } from 'react';
import { setUser } from 'store/User/userAction';
import { useDispatch } from 'react-redux';
import Button from 'components/Button';
import config from 'config/config.json';

const FormLogin = () => {
  const dispatch = useDispatch();
  const [failed, setFailed] = useState('');
  const [form, setForm] = useState({ 
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({email: ''});

  useEffect(() => {
    if (isSubmitting) {
      if (errors.email === '') {
        handleLogin();
      }
      else {
        setIsSubmitting(false);
      }
    }
  }, [errors])

  const handleLogin = async () => {
    try {
      const req = await fetch(`${config.SERVER_URL}login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user: form })
      })
      const token = req.headers.get('Authorization');
      const result = await req.json();
      if(result.error) {
        setFailed(result.error);
        return;
      }
      dispatch(setUser(token, result.data.attributes.role, result.data.id));
      Router.push("/");

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

    let err = { email: '' };

    if(!form.email) {
      err.email = 'Veuillez entrer un email'
    }

    return err;
  }

  return (
    <>
    {errors.email ? <p>Veuillez entrer un email</p> : null}
    {failed ? <p className={styles.error}>Veuillez entrer une adresse email valide</p> : null}
    <form className={styles.FormLogin} onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input 
        name="email"
        type="email"
        autoComplete="email"
        onChange={handleChange}
        required
      />
      <label htmlFor="password">Password</label>
      <input 
        name="password"
        type="password"
        autoComplete="password"
        onChange={handleChange}
        required
      />
      <Button type="submit" content="Se connecter" className={styles.ButtonLogin}></Button>
    </form>
    </>
  )
}

export default FormLogin;
