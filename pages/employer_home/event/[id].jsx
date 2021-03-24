import React from 'react';
import { useSelector } from 'react-redux';
import Layout from 'components/Layout';
import Head from 'next/head';
import cookie from 'cookie';
import styles from './event.module.scss';
import ModalNewJob from 'components/ModalNewJob'
import ModalUpdateEvent from 'components/ModalUpdateEvent';
import ModalDeleteJob from 'components/ModalDeleteJob';

const Event = ({ eventInfos, id }) => {
  const { token } = useSelector(state => state);

  return (
    
    <Layout>
      {eventInfos &&
        <div className={styles.Event}>
          <Head>
            <title>{eventInfos.name}</title>
          </Head>
          <div className={styles.Event__presentation}>
            <div className={styles.Event__presentation__container}>
              <h1>{eventInfos.name}</h1>
              <h2>{eventInfos.description}</h2>
              <ModalUpdateEvent event={eventInfos} token={token} />
            </div>
          </div>
            <ModalNewJob eventId={id} eventDate={eventInfos.date} />
          <ul>
            {eventInfos && 
            eventInfos.jobs.map((job) => (
              <li key={job.id}>
                <h2>Nom de l'emploi: {job.name}</h2>
                <p>Description: {job.description}</p>
                <p>Dresscode: {job.dresscode}</p>
                <p>Durée: {job.duration}</p>
                <ModalDeleteJob event={eventInfos} job={job} token={token} />
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
