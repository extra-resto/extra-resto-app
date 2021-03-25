import React from 'react';
import Layout from 'components/Layout';
import Head from 'next/head';
import cookie from 'cookie';
import styles from './CandidateHome.module.scss';
import Link from 'next/link';

const CandidateHome = ({jobListe}) => {
  
    return (
        <Layout>
            <Head>
                <title>Candidate home page</title>
            </Head>
        <div className={styles.CandidateHome}>
          {console.log(jobListe)}
            <h1>Liste des emplois</h1>
            <ul >

          <div className={styles.main}>
                {jobListe && 
                jobListe.map((job) => (
                  
                <li key={job.id} className={styles.card}>
                  <div className={styles.card__header}>
                    <h2>{job.name}</h2>
                  </div>

                  <div className={styles.card__body}>
                    <p>Nombre de place restante: {job.free_stead}</p>
                  </div>
                  
                  <div className={styles.card__footer}>
                    <Link  href="/candidate_home/job/[id]" as={`/candidate_home/job/${job.id}`} passHref >
                      <button>Voir le job</button>
                    </Link>
                  </div>
                </li>
          
                ))
                }
            </div>
            </ul>
        </div> 
        </Layout>

    )
};

export const getServerSideProps = async ({req}) =>  {
    const { token, id } = cookie.parse(req.headers.cookie);
    const jobResponse = await fetch(`${process.env.API_ROOT}/jobs`, {
      method: 'get',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
  
    })
    const jobListe = await jobResponse.json();
  
    return {
      props: {
        jobListe,
        token,
        id
      }
    }
  }

export default CandidateHome;
