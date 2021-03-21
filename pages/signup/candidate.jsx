import React, { FunctionComponent, useState } from 'react';

import styles from './SignUp.module.scss';

import Head from 'next/head';
import Layout from 'components/Layout';
import FormCandidateSignUp from 'components/FormCandidateSignUp';

const SignUp = () => {

  return (
    <Layout>
    <div className={styles.SignUp}>
      <Head>
        <title>extra-resto - S'enregistrer</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>Nouveau candidat</h1>
        <FormCandidateSignUp />
    </div>
    </Layout>
  );
}

export default SignUp;
