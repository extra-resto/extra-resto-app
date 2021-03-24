import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Layout from 'components/Layout';
import styles from './Home.module.scss';
import Button from 'components/Button';

const Home = () => {
  return (
    <Layout>
    <div className={styles.Home}>
      <Head>
        <title>extra-resto - Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='main'>Hello from HomePage</div>
      <Button content="Enregistrer CV"></Button>
    </div>
    </Layout>
  );
}

export default Home;
