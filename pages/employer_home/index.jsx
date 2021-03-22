import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import styles from './EmployerHome.module.scss';
import { useSelector } from 'react-redux';

const EmployerHome = ({ events }) => {
  const user = useSelector(state => state);

  const logState = () => {
    console.log(user);
  }

  return (
    <Layout>
    <div className={styles.EmployerHome} onClick={logState}>
      <Head>
        <title>extra-resto - Employer Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='main'>Hello from Employer Homepage</div>
      <ul>
      {events && events.map(event => (
        <li key={event.name}>{event.name}</li>
        ))}
      </ul>
    </div>
    </Layout>
  );
}


export async function getStaticProps() {
  //Fetch the events
  const events_res = await fetch('http://localhost:3000/events')
  const events = await events_res.json()

  //Return the events as props
  return {
    props: {
    events
    }
  }
}

export default EmployerHome;
