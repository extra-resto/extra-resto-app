import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import FormSignUp from '../components/FormSignUp';

const Login: React.FunctionComponent = () => {
  return (
    <Layout>
    <div>
      <Head>
        <title>extra-resto - Login</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>Hello from Login</div>
      <FormSignUp />
    </div>
    </Layout>
  );
}

export default Login;
