import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import FormSignUp from '../../components/FormSignUp';
import styles from './SignUp.module.scss';

const SignUp: React.FunctionComponent = () => {
  return (
    <Layout>
    <div className={styles.SignUp}>
      <Head>
        <title>extra-resto - S'enregistrer</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>S'enregistrer</h1>
      <FormSignUp />
    </div>
    </Layout>
  );
}

export default SignUp;
