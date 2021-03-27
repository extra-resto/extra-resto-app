import React from 'react';
import styles from './Login.module.scss';
import Head from 'next/head';
import Layout from 'components/Layout';
import FormLogin from 'components/FormLogin';
import ModalCandidateEmployer from 'components/ModalCandidateEmployer';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import Image from 'next/image';
import { images } from 'next.config';

const Login = () => {
  return (
      <>

        <Head>
          <title>extra-resto - Login</title>
          <link rel='icon' href='/favicon.svg' />
        </Head>
        <Navbar />
      <div className={styles.Login}>
        <div className={styles.Login__background}>
          <div className={styles.Login__background__img}>
            <h1>Connexion</h1>
            <Image src="/images/icons/waitress-svgrepo-com.svg" height={250} width={250} />
          </div>
          <div className={styles.Login__background__form}>
            <FormLogin />
            <h3>Pas encore de compte ?</h3>
            <ModalCandidateEmployer />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
