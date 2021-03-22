import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import styles from './EmployerHome.module.scss';
import { useSelector } from 'react-redux';

const EmployerHome = ({ events }) => {
  const user = useSelector(state => state);

  return (
    <Layout>
    <div className={styles.EmployerHome}>
      <Head>
        <title>extra-resto - Employer Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {JSON.stringify(events)}
      <div className='main'>Hello from Employer Homepage</div>
     
    </div>
    </Layout>
  );
}


export async function getStaticProps() {
  //Fetch the events
  const events_res = await fetch(`http://localhost:3000/api/users/8`, {
  method: 'get',
  headers: {
    'Authorization': user.token,
    'Content-Type': 'application/json'
  },

  })
  const events = await events_res.json()

  //Return the events as props
  return {
    props: {
    events
    }
  }
}

export default EmployerHome;
