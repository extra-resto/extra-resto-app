import React, { FunctionComponent, useState } from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import FormSignUp from '../../components/FormSignUp';
import styles from './SignUp.module.scss';
import SignupEmployer from '../../components/SignupEmployer';

const SignUp: React.FunctionComponent = () => {
  const [step, setStep] = useState(1)

  return (
    <Layout>
    <div className={styles.SignUp}>
      <Head>
        <title>extra-resto - S'enregistrer</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>S'enregistrer</h1>
      {step === 1 ? 
        <FormSignUp setStep={setStep} /> :
        <SignupEmployer />
      }
    </div>
    </Layout>
  );
}

export default SignUp;
