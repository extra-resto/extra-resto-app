import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import styles from './EmployerHome.module.scss';
import { useState, useEffect } from 'react';
import cookie from 'cookie';
import ModalNewEvent from 'components/ModalNewEvent';
import CardEvent from 'components/CardEvent';
import Link from 'next/link';
import ModalUpdateBusiness from 'components/ModalUpdateBusiness';
import ModalUpdateEvent from 'components/ModalUpdateEvent';
import ModalDeleteEvent from 'components/ModalDeleteEvent';

const EmployerHome = ({ userInfos, token }) => {
  const [eventList, setEventList] = useState([]);

  const getEventsList = () => {

    //convert object into array without the key
    const neweventsArr = [];
    const eventsArr = Object.entries(userInfos.businesses[0].events);
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
    getEventsList()
  }, [userInfos])

  return (
    <Layout>
    <div className={styles.EmployerHome}>
      <Head>
        <title>extra-resto - Employer Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.EmployerHome__titlecontainer}>
        <div className={styles.EmployerHome__titlecontainer__titlebloc}>
          <div className={styles.EmployerHome__titlecontainer__titlebloc__title}>
            <h1>Mon entreprise</h1>
            <ModalUpdateBusiness business={userInfos.businesses[0]} token={token} />
          </div>
          <h3>{userInfos.businesses[0].name}</h3>
          <h3>{userInfos.businesses[0].address}</h3>
          <h3>{userInfos.businesses[0].postal_code} {userInfos.businesses[0].city}</h3>
          
        </div>
      </div>
      <div className={styles.EmployerHome__Modal}>
        <h2>Evenements à venir:</h2>
        <ModalNewEvent userInfos={userInfos} token={token} />
      </div>
      <ul className={styles.EmployerHome__eventlist}>
      {eventList && eventList.map(event => (
        <li key={event.id} className={styles.EmployerHome__eventlist__item}>
          <div className={styles.EmployerHome__eventlist__item__buttons}>
            <ModalUpdateEvent event={event} token={token} />
            <ModalDeleteEvent event={event} token={token} />
          </div>
          <p>{formattedDate(new Date(event.date))}</p>
          <Link
          href={{
            pathname: '/employer_home/event/[slug]',
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

export const getServerSideProps = async ({req}) =>  {

  const {token, id} = cookie.parse(req.headers.cookie);
  
  const eventResponse = await fetch(`${process.env.API_ROOT}/users/${id}`, {
    method: 'get',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }

  })
  const userInfos = await eventResponse.json();

  return {
    props: {
      userInfos,
      token
    }
  }
}

export default EmployerHome;
