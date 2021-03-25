import React from 'react';
import { useSelector } from 'react-redux';
import Layout from 'components/Layout';
import Head from 'next/head';
import cookie from 'cookie';
import styles from './event.module.scss';
import ModalNewJob from 'components/ModalNewJob'
import ModalUpdateEvent from 'components/ModalUpdateEvent';
import ModalDeleteJob from 'components/ModalDeleteJob';
import ModalUpdateJob from 'components/ModalUpdateJob';
import Candidature from 'components/Candidature';


const Event = ({ event, id }) => {
  const { token } = useSelector(state => state);

  return (
    
    <Layout>
      {event &&
        <div className={styles.Event}>
          <Head>
            <title>{event.name}</title>
          </Head>
          <div className={styles.Event__presentation}>
            <div className={styles.Event__presentation__container}>
              <div className={styles.Event__presentation__container__button}>
                <ModalUpdateEvent event={event} token={token} />
              </div>
              <div className={styles.Event__presentation__container__details}>
                <h1>{event.name}</h1>
                <h3>{event.description}</h3>
              </div>
            </div>
          </div>
          <div className={styles.Event__jobtitle}>
            <h2>Jobs</h2>
            <ModalNewJob eventId={id} eventDate={event.date} />
          </div>
          <ul className={styles.Event__joblist}>
            {event && 
            event.jobs.map((job) => (
              <li className={styles.Event__joblist__item} key={job.id}>
                <div className={styles.Event__joblist__item__title}>
                  <h2>{job.free_stead} x {job.name}</h2>
                  <div className={styles.Event__joblist__item__title__buttons}>
                    <ModalUpdateJob event={event} job={job} token={token} />
                    <ModalDeleteJob event={event} job={job} token={token} />
                </div>
                </div>
                <div className={styles.Event__joblist__item__body}>
                  <p>Description: {job.description}</p>
                  <p>Dresscode: {job.dresscode}</p>
                  <p>Durée: {job.duration}h</p>
                  <p>Tarif horaire: {job.rate}€</p>
                  <p>Total mission: {job.duration*job.rate}€</p>
                </div>
                
                <div className={styles.Event__joblist__item__candidates}>
                  <h2>Candidatures:</h2>
                  {job.candidatures && job.candidatures.map((candidature) => (
                    <Candidature event={event} candidature={candidature} candidate={candidature.user} token={token} />
                  ))}
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
    const id = params.id
    const {token} = cookie.parse(req.headers.cookie);
    const eventResponse = await fetch(`${process.env.API_ROOT}/events/${id}`, {
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
        id
      }
    }
  }
export default Event;
