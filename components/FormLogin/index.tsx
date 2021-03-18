import Router from 'next/router';
import styles from './FormLogin.module.scss';

const FormLogin = () => {
  const handleLogin = async event => {
    event.preventDefault()

    const res = await fetch('http://localhost:3000/api/login', {
      body: JSON.stringify({
        user: {
          email: event.target.email.value,
          password: event.target.password.value
        }
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    const result = await res.json();
    Router.push('/');
  }

  return (
    <form className={styles.FormLogin} onSubmit={handleLogin}>
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" autoComplete="email" required />
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" autoComplete="password" required />
      <button type="submit">Se connecter</button>
    </form>
  )
}

export default FormLogin;
