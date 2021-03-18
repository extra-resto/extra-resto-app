import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import FormLogin from '../../components/FormLogin';

const Login: React.FunctionComponent = () => {
  return (
    <Layout>
      <div>
        <Head>
          <title>extra-resto - Login</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <h1>Hello from Login</h1>
        <FormLogin />
      </div>
    </Layout>
  );
}

export default Login;
