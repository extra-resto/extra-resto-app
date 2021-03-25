<<<<<<< HEAD
import React from "react";
import Layout from "components/Layout";
import Head from "next/head";
import cookie from "cookie";
import styles from "./CandidateHome.module.scss";
import { useRouter } from "next/router";

const CandidateHome = ({ jobListe, token, id }) => {
  const router = useRouter();
  const handleCandidateApply = async (jobId) => {
    const data = {
      jobs_id: jobId,
    };
    const response = await fetch(`http://localhost:3000/api/candidatures`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const data2 = await response.json();
    router.replace(router.asPath);
  };

  const handleCandidateRemove = async (candidatures) => {
    const cadidatureId = candidatures.filter(
      (candidature) => candidature.user_id === parseInt(id)
    );

    const response = await fetch(
      `http://localhost:3000/api/candidatures/${cadidatureId[0].id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    router.replace(router.asPath);
  };

  return (
    <Layout>
      <Head>
        <title>Candidate home page</title>
      </Head>
      <div className={styles.CandidateHome}>
        {console.log(jobListe)}
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
                {job.candidatures.some(
                  (candidature) => candidature.user_id == id.toString()
                ) ? (
                  <button
                    onClick={() => handleCandidateRemove(job.candidatures)}
                  >
                    Annuler
                  </button>
                ) : (
                  <button onClick={() => handleCandidateApply(job.id)}>
                    Participer
                  </button>
                )}
              </li>
            ))}
        </ul>
      </div>
    </Layout>
  );
=======
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
>>>>>>> develop
};

export const getServerSideProps = async ({ req }) => {
  const { token, id } = cookie.parse(req.headers.cookie);
  const jobResponse = await fetch(`${process.env.API_ROOT}/jobs`, {
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
