import Router from 'next/router'

const FormSignUp = () => {
  const registerUser = async event => {
    event.preventDefault()

    const res = await fetch('http://localhost:3000/api/signup', {
      body: JSON.stringify({
        user: {
          name: event.target.name.value,
          email: event.target.email.value,
          password: event.target.password.value
        }
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    const result = await res.json()
    // result.user => 'Ada Lovelace'
    Router.push('/');
  }

  return (
    <form onSubmit={registerUser}>
      <label htmlFor="name">Name</label>
      <input id="name" name="name" type="text" autoComplete="name" required />
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" autoComplete="email" required />
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" autoComplete="password" required />
      <button type="submit">Register</button>
    </form>
  )
}

export default FormSignUp;
