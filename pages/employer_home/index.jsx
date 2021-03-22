import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import styles from './EmployerHome.module.scss';
import { useSelector } from 'react-redux';
import Cookie from 'js-cookie'

const EmployerHome = ({ events }) => {

  return (
    <Layout>
    <div className={styles.EmployerHome}>
      <Head>
        <title>extra-resto - Employer Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
    
      <div className='main'>Hello from Employer Homepage</div>
      {JSON.stringify(events)}
     
    </div>
    </Layout>
  );
}


export const getServerSideProps = async ({req}) =>  {
  //Fetch the events
  const user_id = req
  const token = req.headers.cookie
  const events_res = await fetch(`http://localhost:3000/api/users/10`, {
    method: 'get',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }

  })
  const events = await events_res.json();

  //Return the events as props
  return {
    props: {
      events
    }
  }
}

export default EmployerHome;
