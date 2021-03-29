import React from 'react';
import Head from 'next/head';
import styles from './CandidateHome.module.scss'
import cookie from 'cookie';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import Link from 'next/link';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

const CandidateHome = ({ userCandidatures }) => {
  console.log(userCandidatures)
  dayjs.locale('fr')
  const hiredFalse = userCandidatures.filter(candidature => candidature.hired === false)
  const hiredTrue = userCandidatures.filter(candidature => candidature.hired === true)
  return (
    <>
      <div className={styles.main}>
        <Head>
          <title>extra-resto - S'enregistrer</title>
          <link rel='icon' href='/favicon.svg' />
        </Head>
        <Navbar />

        <div className={styles.candidatures}>
          <div className={styles.candidature__listcontainer}>
            <h1>Vos emplois en attente de confirmation</h1>
            <ul>
              {hiredFalse && hiredFalse.map((candidature) => (
                <Link href="/job/[id]" as={`/job/${candidature.job.id}`} passHref>
                  <a>
                    <li key={candidature.id} className={styles.card}>
                      <div className={styles.card__header}>
                        <h2>Nom: {candidature.job.name}</h2>
                        <p>Date de création: {dayjs(candidature.job.date).format('DD MMMM YYYY')}</p>
                      </div>
                    </li>
                  </a>
                </Link>
              ))}
            </ul>
          </div>
          <div className={styles.candidature__listcontainer}>
            <h1>Vos emplois confirmés</h1>
            <ul>
              {hiredTrue && hiredTrue.map((candidature) => (
                <Link href="/job/[id]" as={`/job/${candidature.job.id}`} passHref>
                  <a>
                    <li key={candidature.job.id} className={styles.card}>
                      <div className={styles.card__header}>
                        <h2>Nom: {candidature.job.name}</h2>
                        <p>Date de création: {dayjs(candidature.job.date).format('DD MMMM YYYY')}</p>
                      </div>
                    </li>
                  </a>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { token } = cookie.parse(req.headers.cookie);
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