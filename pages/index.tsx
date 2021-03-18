import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';


const Home: React.FunctionComponent = () => {
  return (
    <Layout>
    <div>
      <Head>
        <title>extra-resto - Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='main'>Hello from HomePage</div>
    </div>
    </Layout>
  );
}

export default Home;
