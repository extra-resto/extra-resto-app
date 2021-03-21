import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import FormLogin from 'components/FormLogin';
import styles from './Login.module.scss';

const Login = () => {
  return (
    <Layout>
      <div className={styles.Login}>
        <Head>
          <title>extra-resto - Login</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <h1>Se Connecter</h1>
        <FormLogin />
      </div>
    </Layout>
  );
}

export default Login;
