import Router from 'next/router'
import styles from './FormSignUp.module.scss';

const FormSignUp = () => {
  const registerUser = async event => {
    event.preventDefault()

    const res = await fetch('https://extra-resto-api.herokuapp.com/api/signup', {
      body: JSON.stringify({
        user: {
          first_name: event.target.first_name.value,
          last_name: event.target.last_name.value,
          email: event.target.email.value,
          phone_number: event.target.phone_number.value,
          password: event.target.password.value
        }
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    const result = await res.json()
    Router.push('/');
  }

  return (
    <form className={styles.FormSignUp} onSubmit={registerUser}>
      <label htmlFor="first_name">Prénom</label>
      <input id="first_name" name="first_name" type="text" autoComplete="first_name" required />
      <label htmlFor="last_name">Nom de Famille</label>
      <input id="last_name" name="last_name" type="text" autoComplete="last_name" required />
      <label htmlFor="phone_number">n° de Téléphone</label>
      <input id="phone_number" name="phone_number" type="text" autoComplete="phone_number" required />
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" autoComplete="email" required />
      <label htmlFor="password">Mot de passe</label>
      <input id="password" name="password" type="password" autoComplete="password" required />
      <button type="submit">S'enregistrer</button>
    </form>
  )
}

export default FormSignUp;
