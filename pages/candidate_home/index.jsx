import React from 'react';
import Head from 'next/head';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import styles from './CandidateHome.module.scss'
import Layout from 'components/Layout'

const CandidateHome = () => {
    return (
        <Layout>
          <Head>
            <title>extra-resto - S'enregistrer</title>
            <link rel='icon' href='/favicon.svg' />
          </Head>
        <div className={styles.main}>

          <div>

          </div>
          
        </div>
        </Layout>
      );
};



export default CandidateHome;
