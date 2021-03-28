import React from 'react';
import Layout from 'components/Layout';
import Head from 'next/head';
import cookie from 'cookie';
import styles from './job.module.scss';
import {useRouter} from 'next/router';
import config from 'config/config.json';
import Button from 'components/Button';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { useSelector } from 'react-redux';

const Job = ({ jobInfos }) => {
  const user = useSelector(state => state);
    dayjs.locale('fr')
    const router = useRouter();

    const handleCandidateApply = async (jobId) => {
        if (!user.token) return router.replace("/login");
        const data = {
          jobs_id: jobId
        }
        const response = await fetch(`${config.SERVER_URL}candidatures`, {
          method: 'POST',
          headers: {
            'Authorization': user.token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        const data2 = await response.json()
        router.replace(router.asPath)
      }

      const handleCandidateRemove = async (candidatures) => {
        const cadidatureId = candidatures.filter(candidature => candidature.user_id === parseInt(id))
    
        const response = await fetch(`${config.SERVER_URL}candidatures/${cadidatureId[0].id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          },
        })
        router.replace(router.asPath)
      }

  return (
      <Layout>
        <Head>
          <title>{jobInfos.name}</title>
        </Head>
        <div className={styles.main}>
          <div className={styles.main__display}>
            <div className={styles.business}>
                <h1>Entreprise: {jobInfos.businesses[0].name}</h1>
                <p>Adresse: {jobInfos.businesses[0].address}</p>
                <p>Ville: {jobInfos.businesses[0].city}</p>
                <p>Code postal: {jobInfos.businesses[0].postal_code}</p>
            </div>

            <div className={styles.event}>
                <h1>{jobInfos.event.name}</h1>
                <p>{jobInfos.event.description}</p>
            </div>

            <div className={styles.job}>
                <h2>Nom du job: {jobInfos.name}</h2>
                <p>{dayjs(jobInfos.date).format('DD MMMM YYYY')}</p>
                <p>Description: {jobInfos.description}</p>
                <p>Le dresscode: {jobInfos.dresscode}</p>
                <p>prix: {jobInfos.rate}</p>
                <p>Temps: {jobInfos.duration}</p>
                <p>Nombre de place restante: {jobInfos.free_stead}</p>
                {jobInfos.candidatures && user.id && jobInfos.candidatures.some(candidature => candidature.user_id == parseInt(user.id)) ?  
                <Button href={() => handleCandidateRemove(jobInfos.candidatures)} content="Annuler ma candidature"/>
                : 
                <Button href={() => handleCandidateApply(jobInfos.id)} content="Postuler" />}
            </div>
          </div>
        </div>
    </Layout>
  )
};

export const getServerSideProps = async ({ params }) =>  {
    const jobId = params.id;
    const jobResponse = await fetch(`${config.SERVER_URL}/jobs/${jobId}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const jobInfos = await jobResponse.json();
  
    return {
      props: {
        jobInfos
      }
    }
  }
export default Job;