import React from 'react';
import Layout from 'components/Layout';
import Head from 'next/head';
import cookie from 'cookie';
import styles from './CandidateHome.module.scss';

const CandidateHome = ({jobListe, token}) => {

  const handleCandidateApply = async (jobId) => {
    
    const response = await fetch(`${process.env.API_ROOT}candidatures`, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({jobs_id: jobId})
    })
  }

    return (
        <Layout>
            <Head>
                <title>Candidate home page</title>
            </Head>
        <div className={styles.CandidateHome}>
            <h1>Liste des emplois</h1>
            <ul>
                {jobListe && 
                jobListe.map((job) => (
                    <li key={job.id}>
                        <h1> Nom: {job.name}</h1>
                        <p>Description: {job.description}</p>
                        <p>Dresscode: {job.dresscode}</p>
                        <p>Nombre de place restante{job.free_stead}</p>
                        <p>Commence le {job.date}</p>
                        <button onClick={() => handleCandidateApply(job.id)}>Apply</button>
                    </li>
                ))
                }
            </ul>
        </div> 
        </Layout>

    )
};

export const getServerSideProps = async ({req}) =>  {
    const { token } = cookie.parse(req.headers.cookie);
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
        token
      }
    }
  }

export default CandidateHome;
