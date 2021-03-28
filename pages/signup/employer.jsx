import React from 'react';
import styles from './SignUp.module.scss';
import Head from 'next/head';
import FormEmployerSignup from 'components/FormEmployerSignup';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';

const SignUp = () => {

  return (
    <>
    <div className={styles.SignUp}>
      <Head>
        <title>extra-resto - S'enregistrer</title>
        <link rel='icon' href='/favicon.svg' />
      </Head>
      <Navbar />
        <FormEmployerSignup />  
    </div>
    <Footer />
    </>
  );
}

export default SignUp;
