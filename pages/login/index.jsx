import React, { FunctionComponent } from 'react';
import styles from './Login.module.scss';

import Head from 'next/head';
import Layout from 'components/Layout';
import FormLogin from 'components/FormLogin';
import ModalCandidateEmployer from 'components/ModalCandidateEmployer';

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
        <h2>Pas encore de compte?</h2>
        <ModalCandidateEmployer />
      </div>
    </Layout>
  );
}

export default Login;
