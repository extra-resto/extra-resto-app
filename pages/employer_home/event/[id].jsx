import React from 'react';
import Layout from 'components/Layout';
import Head from 'next/head';
import cookie from 'cookie';
import styles from './event.module.scss';
import ModalNewJob from 'components/ModalNewJob'

const Event = ({ eventInfos, id }) => {
  return (
    
    <Layout>
      <ModalNewJob eventId={id} eventDate={eventInfos.date} />
      {eventInfos &&
        <div className={styles.Event}>
          <Head>
            <title>{eventInfos.name}</title>
          </Head>
            <h1>{eventInfos.description}</h1>
          <ul>
            {eventInfos && 
            eventInfos.jobs.map((job) => (
              <li key={job.id}>
                <h2>Nom de l'emploi: {job.name}</h2>
                <p>Description: {job.description}</p>
                <p>Dresscode: {job.dresscode}</p>
                <p>Durée: {job.duration}</p>
              </li>
            ))
            }
          </ul>
        </div>
      }
    </Layout>
  )
};

export const getServerSideProps = async ({params, req}) =>  {
    const id = params.id
    const {token} = cookie.parse(req.headers.cookie);
    const eventResponse = await fetch(`${process.env.API_ROOT}/events/${id}`, {
      method: 'get',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
  
    })
    const eventInfos = await eventResponse.json();
  
    return {
      props: {
        eventInfos,
        id
      }
    }
  }
export default Event;
