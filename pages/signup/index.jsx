import Link from 'next/link';
import Head from 'next/head';
import Layout from 'components/Layout';
import styles from './SignUp.module.scss';

const SignUp = () => {

  return (
    <Layout>
    <div className={styles.SignUp}>
      <Head>
        <title>extra-resto - S'enregistrer</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>S'enregistrer</h1>
      <a>Je suis employeur</a>
      <a>Je suis candidat</a>
    </div>
    </Layout>
  );
}

export default SignUp;
