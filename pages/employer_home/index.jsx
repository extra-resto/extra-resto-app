import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import styles from './EmployerHome.module.scss';
import { useSelector } from 'react-redux';
import cookie from 'cookie'
import ModalNewEvent from 'components/ModalNewEvent';

const EmployerHome = ({ userInfos, token }) => {

  return (
    <Layout>
    <div className={styles.EmployerHome}>
      <Head>
        <title>extra-resto - Employer Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='main'>Hello from Employer Homepage</div>
      <ModalNewEvent userInfos={userInfos} token={token} />
      <ul>
      {userInfos && userInfos.events.map(event => (
        <li key={event.name}>{event.name}</li>
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
