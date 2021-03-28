import React from 'react';
import styles from '../signup/SignUp.module.scss';
import Head from 'next/head';
import FormBusinessSignup from 'components/FormBusinessSignup';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';

const Bussiness = () => {
    return (
        <>
        <div className={styles.SignUp}>
          <Head>
            <title>extra-resto - S'enregistrer</title>
            <link rel='icon' href='/favicon.svg' />
          </Head>
          <Navbar /> 
            <FormBusinessSignup />
        </div>
        <Footer />
        </>
      );
};

export default Bussiness;
