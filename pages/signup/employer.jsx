import React, { useState } from 'react';
import styles from './SignUp.module.scss';
import Head from 'next/head';
import Layout from 'components/Layout';
import FormEmployerSignup from 'components/FormEmployerSignup';
import FormBusinessSignup from 'components/FormBusinessSignup';

const SignUp = () => {
  const [step, setStep] = useState(1)

  return (
    <Layout>
    <div className={styles.SignUp}>
      <Head>
        <title>extra-resto - S'enregistrer</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>Nouvel employeur</h1>
      {step === 1 ? 
        <FormEmployerSignup setStep={setStep} /> :
        <FormBusinessSignup />
      }
    </div>
    </Layout>
  );
}

export default SignUp;
