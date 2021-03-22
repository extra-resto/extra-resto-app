import React, { FunctionComponent, useState } from 'react';

import styles from './SignUp.module.scss';

import Head from 'next/head';
import Layout from 'components/Layout';
import FormCandidateSignup from 'components/FormCandidateSignup';

const SignUp = () => {

  return (
    <Layout>
    <div className={styles.SignUp}>
      <Head>
        <title>extra-resto - S'enregistrer</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>Nouveau candidat</h1>
        <FormCandidateSignup />
    </div>
    </Layout>
  );
}

export default SignUp;
