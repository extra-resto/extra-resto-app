import React, { FunctionComponent, useState } from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import FormSignUp from 'components/FormSignUp';
import styles from './SignUp.module.scss';
import SignupEmployer from 'components/SignupEmployer';

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
        <FormSignUp setStep={setStep} /> :
        <SignupEmployer />
      }
    </div>
    </Layout>
  );
}

export default SignUp;
