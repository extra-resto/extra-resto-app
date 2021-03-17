import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

const Home: React.FunctionComponent = () => {
  return (
    <Layout>
    <div>
      <Head>
        <title>extra-resto - Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>Hello from HomePage</div>
    </div>
    </Layout>
  );
}

export default Home;
