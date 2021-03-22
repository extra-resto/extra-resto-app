import React, { FunctionComponent } from 'react';
import { useState, useEffect } from 'react';
import Router from "next/router";
import Head from 'next/head';
import Layout from 'components/Layout';
import styles from './Home.module.scss';
import Cookie from 'js-cookie';


const Home = () => {
  const [role, setRole] = useState(Cookie.get('role'));

  useEffect(() => {
    if (role == 'employer') Router.push('/employer_home');
    if (role == null) Router.push('/concept');
  }, [role])

  return (
    <Layout>
    <div className={styles.Home}>
      <Head>
        <title>extra-resto - Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </div>
    </Layout>
  );
}

export default Home;
