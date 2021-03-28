import React from 'react';
import Head from 'next/head';
import FormCandidateSignup from 'components/FormCandidateSignup';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';

const SignUp = () => {

  return (
    <>
      <Head>
        <title>extra-resto - S'enregistrer</title>
        <link rel='icon' href='/favicon.svg' />
      </Head>
      <Navbar />
        <FormCandidateSignup />
      <Footer />
    </>
  );
}

export default SignUp;
