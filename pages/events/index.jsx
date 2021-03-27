import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import styles from './Events.module.scss';
import { useState, useEffect } from 'react';
import cookie from 'cookie';
import ModalNewEvent from 'components/ModalNewEvent';
import CardEvent from 'components/CardEvent';
import Link from 'next/link';
import ModalUpdateBusiness from 'components/ModalUpdateBusiness';
import ModalUpdateEvent from 'components/ModalUpdateEvent';
import ModalDeleteEvent from 'components/ModalDeleteEvent';
import config from 'config/config.json';
import { useRouter } from 'next/router';

const Events = ({ events, token }) => {
  const [eventList, setEventList] = useState([]); 
  const router = useRouter();

  const getEventsList = () => {
    //convert object into array without the key
    const neweventsArr = [];
    const eventsArr = Object.entries(events);
    eventsArr.map(event => neweventsArr.push(event[1]));
    
    //sort array by date
    neweventsArr.sort((a, b) => new Date(b.date) - new Date(a.date)).reverse()
  
    //filter past events
    setEventList(neweventsArr.filter(event => new Date(event.date) > new Date()));
  }

  const formattedDate = (d) => {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    if (events === undefined) router.push('/');
    getEventsList()
  }, [events])

  return (
    <Layout>
    <div className={styles.Events}>
      <Head>
        <title>Opportunités en cours</title>
        <link rel='icon' href='/favicon.svg' />
      </Head>
      <div className={styles.Events__titlecontainer}>
        <div className={styles.Events__titlecontainer__titlebloc}>
          <div className={styles.Events__titlecontainer__titlebloc__title}>
            <h1>Liste des évenements</h1>
          </div>
        </div>
      </div>
      <div className={styles.Events__Modal}>
        <h2>Opportunités en cours:</h2>
      </div>
      <ul className={styles.Events__eventlist}>
      {eventList && eventList.map(event => (
        <li key={event.id} className={styles.Events__eventlist__item}>
          {console.log(event)}
          <p>{formattedDate(new Date(event.date))}</p>
          <Link
          href={{
            pathname: '/events/[slug]',
            query: { slug: event.id },
          }}
          >
            <a>
              <CardEvent event={event} />
            </a>
          </Link>
        </li>
        ))}
      </ul>
    </div>
    </Layout>
  );
}

export const getServerSideProps = async ({req, res}) =>  {

  const {token, id} = cookie.parse(req.headers.cookie);
  
  const eventResponse = await fetch(`${config.SERVER_URL}/events`, {
    method: 'get',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }

  })
  const events = await eventResponse.json();

  return {
    props: {
      events,
      token
    }
  }
}

export default Events;