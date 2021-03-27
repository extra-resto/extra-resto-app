import React, { useState } from 'react';
import styles from './SignUp.module.scss';
import Head from 'next/head';
import Layout from 'components/Layout';
import FormEmployerSignup from 'components/FormEmployerSignup';
import FormBusinessSignup from 'components/FormBusinessSignup';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';

const SignUp = () => {
  const [step, setStep] = useState(1)

  return (
    <>
    <div className={styles.SignUp}>
      <Head>
        <title>extra-resto - S'enregistrer</title>
        <link rel='icon' href='/favicon.svg' />
      </Head>
      <Navbar />
      {step === 1 ? 
        <FormEmployerSignup setStep={setStep} /> :
        <FormBusinessSignup />
      }
    </div>
    <Footer />
    </>
  );
}

export default SignUp;
