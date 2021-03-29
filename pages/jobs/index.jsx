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

const CandidateHome = ({ jobListe }) => {
  const [job, setJob] = useState(jobListe);
  const [search, setSearch] = useState('');
  dayjs.locale('fr')

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
    if(e.target.value) {
      const research = jobListe.filter(job => job.name.toLowerCase().includes(search.toLowerCase()))
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
                  <Link  href="/job/[id]" as={`/job/${job.id}`} passHref >
                    <a>
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
                          <Link  href="/job/[id]" as={`/job/${job.id}`} passHref >
                            <a><Button content="Voir le job" /></a>
                          </Link>
                        </div>
                      </li>
                    </a>
                  </Link>
          
                ))}
              </ul>
            </div>
          </div> 

        </Layout>

    )
};

export const getServerSideProps = async () => {
  const jobResponse = await fetch(`${config.SERVER_URL}/jobs`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const jobListe = await jobResponse.json();

  return {
    props: {
      jobListe
    },
  };
};

export default CandidateHome;
