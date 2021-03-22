import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import styles from './EmployerHome.module.scss';
import { useSelector } from 'react-redux';
import cookie from 'cookie'
import ModalNewEvent from 'components/ModalNewEvent';
import CardEvent from 'components/CardEvent';

const EmployerHome = ({ userInfos, token }) => {

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
        </div>
      </div>
      <div className={styles.EmployerHome__Modal}>
        <h2>Evenements à venir:</h2>
        <ModalNewEvent userInfos={userInfos} token={token} />
      </div>
      <ul className={styles.EmployerHome__eventlist}>
      {userInfos && userInfos.events.map(event => (
        <li key={event.name}>
          <CardEvent event={event} />
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
