import React, { useState } from 'react';
import Layout from 'components/Layout';
import Head from 'next/head';
import cookie from 'cookie';
import styles from './CandidateHome.module.scss';
import Link from 'next/link';
import config from 'config/config.json';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import Button from 'components/Button';
import Image from 'next/image';

const CandidateHome = ({ jobListe }) => {
  const [job, setJob] = useState(jobListe);
  const [search, setSearch] = useState('');
  dayjs.locale('fr')

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if(e.target.value) {
      const research = jobListe.filter(job => job.name.toLowerCase().includes(search))
      setJob(research)
    } else setJob(jobListe)
  }
  
    return (
      <Layout>
        <Head>
          <title>Candidate home page</title>
        </Head>
          <div className={styles.CandidateHome}>
            <h1>Liste des emplois</h1>
            <input onChange={handleSearch} placeholder="rechercher" />
            <div className={styles.CandidateHome__display}>
              <ul className={styles.main}>
                {job && job.map((job) => (

                  <li key={job.id} className={styles.card}>
                    {console.log(job)}
                    <div className={styles.card__header}>
                      <h2>{job.name}</h2>
                    </div>

                    <div className={styles.card__body}>
                      <i>{dayjs(job.date).format('DD MMMM YYYY')}</i>
                      <p className={styles.card__body__rate}>{job.rate}€/h</p>
                      <p>Place restante : {job.free_stead}</p>
                      <p>Postulants : {job.candidatures.length}</p>
                      <p>{job.description.substring(0,40)}...</p>
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
