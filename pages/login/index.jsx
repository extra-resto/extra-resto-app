import React, { FunctionComponent } from 'react';
import styles from './Login.module.scss';

import Head from 'next/head';
import Layout from 'components/Layout';
import FormLogin from 'components/FormLogin';
import ModalCandidateEmployer from 'components/ModalCandidateEmployer';

const Login = () => {
  return (
    <Layout>
        <Head>
          <title>extra-resto - Login</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
      <div className={styles.Login}>
        <div className={styles.Login__background}>
          <h1>Se Connecter</h1>
          <FormLogin />
          <h3>Pas encore de compte ?</h3>
          <ModalCandidateEmployer />
        </div>
      </div>
    </Layout>
  );
}

export default Login;
