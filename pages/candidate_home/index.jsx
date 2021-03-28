import React from 'react';
import Head from 'next/head';
import styles from './CandidateHome.module.scss'
import Layout from 'components/Layout'
import cookie from 'cookie';
import config from 'config/config.json';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';

const CandidateHome = ({ userCandidatures }) => {
  console.log(userCandidatures)
    return (
        <>
        <div className={styles.main}>
          <Head>
            <title>extra-resto - S'enregistrer</title>
            <link rel='icon' href='/favicon.svg' />
          </Head>
          <Navbar />

          <div className={styles.candidatures}>
            <div>
              <h1>Les emplois pour lequelle vous postulez</h1>
              <ul>
                {userCandidatures && userCandidatures.map((candidature) => (
                  <li key={candidature.id} className={styles.card}>
                    <div className={styles.card__header}>
                      <h2>{candidature.job.name}</h2>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p>LOOOL</p>
            </div>
          </div>
        </div>
          <Footer />
       </>
      );
};

export const getServerSideProps = async ({ req }) =>  {
  const {token} = cookie.parse(req.headers.cookie);
  const candidatures = await fetch(`http://localhost:3000/api/candidatures/userCandidatures`, {
    method: 'get',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }

  })
  const userCandidatures = await candidatures.json();

  return {
    props: {
      userCandidatures
    }
  }
}


export default CandidateHome;
