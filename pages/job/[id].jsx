import React from 'react';
import Layout from 'components/Layout';
import Head from 'next/head';
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
        const candidatureId = candidatures.filter(candidature => candidature.user_id === parseInt(user.id))
    
        const response = await fetch(`${config.SERVER_URL}candidatures/${candidatureId[0].id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': user.token,
            'Content-Type': 'application/json'
          },
        })
        router.replace(router.asPath)
      }

  return (
      <Layout>
        <Head>
          <title>extra-resto - {jobInfos.name}</title>
          <link rel='icon' href='/favicon.svg' />
        </Head>
        <div className={styles.main}>
          <div className={styles.main__display}>
            <div className={styles.main__display__headers}>
              <div>
                <h1>{jobInfos.name}</h1>
                <h2>{jobInfos.businesses[0].name}</h2>
                <p className={styles.main__display__headers__city}>{jobInfos.businesses[0].city}</p>
                <p className={styles.main__display__headers__date}>{dayjs(jobInfos.date).format('DD MMMM YYYY')}</p>
                <p className={styles.main__display__headers__rate}>{jobInfos.rate}€/h</p>
              </div>
              <div>
                {jobInfos.candidatures && user.id && jobInfos.candidatures.some(candidature => candidature.user_id == parseInt(user.id)) ?  
                  <Button className={styles.main__display__headers__button} href={() => handleCandidateRemove(jobInfos.candidatures)} content="Annuler ma candidature"/>
                  : 
                  <Button className={styles.main__display__headers__button} href={() => handleCandidateApply(jobInfos.id)} content="Postuler" />}
              </div>
            </div>
            
            <div className={styles.main__display__body}>
              <div className={styles.main__display__body__event}>
                <h2>Evenement associé</h2>
                <h3>{jobInfos.event.name}</h3>
                <p>{jobInfos.event.description}</p>
              </div>
              <div className={styles.main__display__body__line}></div>
              <div className={styles.main__display__body__job}>
                <h2>Le Job</h2>
                <p>Description : {jobInfos.description}</p>
                <p>Le dresscode : {jobInfos.dresscode}</p>           
                <p>Temps de travail : {jobInfos.duration}</p>
                <p>Nombre de place restante : {jobInfos.free_stead}</p>               
                <p>Adresse : {jobInfos.businesses[0].address} {jobInfos.businesses[0].postal_code} {jobInfos.businesses[0].city}</p>
              </div>
            </div>     
          </div>
        </div>
    </Layout>
  )
};

export const getServerSideProps = async ({ params }) =>  {
    const jobId = params.id;
    const jobResponse = await fetch(`${config.SERVER_URL}jobs/${jobId}`, {
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