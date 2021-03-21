import Head from 'next/head';
import React from 'react';
import Layout from '../../components/Layout';
import withPrivate from '../../store/withPrivate';

const test = () => {
  return (
    <Layout>
      <Head>
      <title>extra-resto - Test</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
        heloo !
      </div>
    </Layout>
  );
};

export default withPrivate(test);