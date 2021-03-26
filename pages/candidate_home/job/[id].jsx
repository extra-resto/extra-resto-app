import React from 'react';
import Layout from 'components/Layout';
import Head from 'next/head';
import cookie from 'cookie';
import styles from './job.module.scss';
import {useRouter} from 'next/router';

const Job = ({jobInfos, id, token}) => {


    const router = useRouter();
    const handleCandidateApply = async (jobId) => {
        const data = {
          jobs_id: jobId
        }
        const response = await fetch(`http://localhost:3000/api/candidatures`, {
          method: 'POST',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        const data2 = await response.json()
        router.replace(router.asPath)
      }

      const handleCandidateRemove = async (candidatures) => {
        const cadidatureId = candidatures.filter(candidature => candidature.user_id === parseInt(id))
    
        const response = await fetch(`http://localhost:3000/api/candidatures/${cadidatureId[0].id}`, {
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
          <title>show job</title>
        </Head>
        <div className={styles.main}>
            <div className={styles.business}>
                <h1>Entreprise: {jobInfos.businesses[0].name}</h1>
                <p>Adresse: {jobInfos.businesses[0].address}</p>
                <p>Ville: {jobInfos.businesses[0].city}</p>
                <p>Code postal: {jobInfos.businesses[0].postal_code}</p>
            </div>

            <div className={styles.job}>
                <h2>Nom du job: {jobInfos.name}</h2>
                <p>Description: {jobInfos.description}</p>
                <p>Le desscode: {jobInfos.dresscode}</p>
                <p>Nombre de place restante: {jobInfos.free_stead}</p>
                {jobInfos.candidatures && jobInfos.candidatures.some(candidature => candidature.user_id == parseInt(id)) ?  
                <button onClick={() => handleCandidateRemove(jobInfos.candidatures)}>Annuler</button>
                : 
                <button onClick={() => handleCandidateApply(jobInfos.id)}>Participer</button>}
            </div>
        </div>
    </Layout>
  )
};

export const getServerSideProps = async ({params, req}) =>  {
    const jobId = params.id
    const {token, id} = cookie.parse(req.headers.cookie);
    const jobResponse = await fetch(`${process.env.API_ROOT}/jobs/${jobId}`, {
      method: 'get',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
  
    })
    const jobInfos = await jobResponse.json();
  
    return {
      props: {
        jobInfos,
        id,
        token
      }
    }
  }
export default Job;