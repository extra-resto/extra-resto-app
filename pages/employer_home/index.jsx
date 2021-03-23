import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import styles from './EmployerHome.module.scss';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import cookie from 'cookie';
import ModalNewEvent from 'components/ModalNewEvent';
import CardEvent from 'components/CardEvent';
import Link from 'next/link';

const EmployerHome = ({ userInfos, token }) => {
  const [eventList, setEventList] = useState([]);

  const getEventsList = () => {

    //convert object into array without the key
    const neweventsArr = [];
    const eventsArr = Object.entries(userInfos.events);
    eventsArr.map(event => neweventsArr.push(event[1]));
    //sort array by date
    neweventsArr.sort((a, b) => new Date(b.date) - new Date(a.date)).reverse()
    //filter past events
    setEventList(neweventsArr);
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
        <div className={styles.EmployerHome__titlebloc}>
          <h1>Mon entreprise</h1>
          <h3>{userInfos.businesses[0].name}</h3>
          <h3>{userInfos.businesses[0].address}</h3>
          <h3>{userInfos.businesses[0].postal_code} {userInfos.businesses[0].city}</h3>
          <button>mettre à jour</button>
        </div>
      </div>
      <div className={styles.EmployerHome__Modal}>
        <h2>Evenements à venir:</h2>
        <ModalNewEvent userInfos={userInfos} token={token} />
      </div>
      <ul className={styles.EmployerHome__eventlist}>
      {eventList && eventList.map(event => (
        <li key={event.id} className={styles.EmployerHome__eventlist__item}>
          <p>{formattedDate(new Date(event.date))}</p>
          <Link href="/employer_home/event/[id]" as={`/employer_home/event/${event.id}`}>
            <a>
              <CardEvent event={event} />
            </a>
          </Link>
          <div className={styles.EmployerHome__eventlist__item__buttons}>
            <button className={styles.EmployerHome__eventlist__item__buttons__modify}>modifier<br />l'évenement</button>
            <button className={styles.EmployerHome__eventlist__item__buttons__delete}>supprimer<br />l'évenement</button>
          </div>
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
