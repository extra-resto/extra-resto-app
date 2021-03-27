import React from 'react';
import Layout from 'components/Layout';
import Head from 'next/head';
import cookie from 'cookie';
import styles from './CandidateHome.module.scss';
import Link from 'next/link';
import config from 'config/config.json';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import Button from 'components/Button';

const CandidateHome = ({ jobListe }) => {
  dayjs.locale('fr')
  
    return (
      <Layout>
        <Head>
          <title>Candidate home page</title>
        </Head>
          <div className={styles.CandidateHome}>
            <div className={styles.CandidateHome__title}>
              <h1>Liste des emplois</h1>
            </div>
            <div className={styles.CandidateHome__display}>
              <ul className={styles.main}>
                {jobListe && jobListe.map((job) => (
                
                  
                  <li key={job.id} className={styles.card}>
                    <div className={styles.card__header}>
                      <h2>{job.name}</h2>
                    </div>

                    <div className={styles.card__body}>
                      <p>{dayjs(job.date).format('DD MMMM YYYY')}</p>
                      <p>Nombre de place restante : {job.free_stead}</p>
                    </div>
                    
                    <div className={styles.card__footer}>
                      <Link  href="/candidate_home/job/[id]" as={`/candidate_home/job/${job.id}`} passHref >
                        <a><Button content="Voir le job" /></a>
                      </Link>
                    </div>
                  </li>
          
                ))}
              </ul>
            </div>
          </div> 

        </Layout>

    )
};

export const getServerSideProps = async ({ req }) => {
  const { token, id } = cookie.parse(req.headers.cookie);
  const jobResponse = await fetch(`${config.SERVER_URL}/jobs`, {
    method: "get",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });
  const jobListe = await jobResponse.json();

  return {
    props: {
      jobListe,
      token,
      id,
    },
  };
};

export default CandidateHome;
