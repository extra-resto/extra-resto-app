import React from 'react';
import { useSelector } from 'react-redux';
import Layout from 'components/Layout';
import Head from 'next/head';
import cookie from 'cookie';
import styles from './Event.module.scss';
import ModalNewJob from 'components/ModalNewJob'
import ModalUpdateEvent from 'components/ModalUpdateEvent';
import ModalDeleteJob from 'components/ModalDeleteJob';
import ModalUpdateJob from 'components/ModalUpdateJob';
import Candidature from 'components/Candidature';
import Application from 'components/Application';
import config from 'config/config.json';


const Event = ({ event, event_id }) => {
  const { token, id } = useSelector(state => state);

  return (
    
    <Layout>
      {event &&
        <div className={styles.Event}>
          <Head>
            <title>{event.name}</title>
          </Head>
          <div className={styles.Event__presentation}>
            <div className={styles.Event__presentation__container}>
              <div className={styles.Event__presentation__container__details}>
                <h1>{event.name}</h1>
                <h3>{event.description}</h3>
              </div>
            </div>
          </div>
          <div className={styles.Event__jobtitle}>
            <h2>Jobs</h2>
          </div>
          <ul className={styles.Event__joblist}>
            {event && 
            event.jobs.map((job) => (
              <li className={styles.Event__joblist__item} key={job.event_id}>
                <div className={styles.Event__joblist__item__title}>
                  <h2>{job.free_stead} x {job.name}</h2>
                </div>
                <div className={styles.Event__joblist__item__body}>
                  <p>Description: {job.description}</p>
                  <p>Dresscode: {job.dresscode}</p>
                  <p>Durée: {job.duration}h</p>
                  <p>Tarif horaire: {job.rate}€</p>
                  <p>Total mission: {job.duration*job.rate}€</p>
                </div>
                
                <div className={styles.Event__joblist__item__candidates}>
                  <h3>Nombre de candidatures: {job.candidatures && job.candidatures.length}</h3>
                  <Application job={job} token={token} user_id={id}/>
                </div>
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
    const event_id = params.id
    const {token} = cookie.parse(req.headers.cookie);
    const eventResponse = await fetch(`${config.SERVER_URL}/events/${event_id}`, {
      method: 'get',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
  
    })
    const event = await eventResponse.json();
  
    return {
      props: {
        event,
        event_id
      }
    }
  }
export default Event;
