import Head from 'next/head'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'

export default function Home() {
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
