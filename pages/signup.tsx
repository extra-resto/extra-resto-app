import React, { FunctionComponent } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';

import FormSignUp from '../components/FormSignUp';

const SignUp: React.FunctionComponent = () => {
  return (
    <Layout>
    <div>
      <Head>
        <title>extra-resto - SignUp</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>Hello from Signup</div>
      <FormSignUp />
    </div>
    </Layout>
  );
}

export default SignUp;
