import React from 'react';
import Layout from 'components/Layout';
import Head from 'next/head';
import cookie from 'cookie';
import styles from './event.module.scss';

const Event = ({ eventInfos }) => {
  return (
    
    <Layout>
      {eventInfos &&
        <div className={styles.Event}>
          <Head>
            <title>{eventInfos.name}</title>
          </Head>
            <h1>{eventInfos.description}</h1>
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
    const eventInfos = await eventResponse.json();
  
    return {
      props: {
        eventInfos
      }
    }
  }
export default Event;
