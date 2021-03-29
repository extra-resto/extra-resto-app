import cookie from "cookie";
import styles from './user.module.scss';
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import config from 'config/config.json';
import Head from 'next/head';

const Profil = ({ userProfil }) => {
  return (
    <>
      <Head>
        <title>Profil candidat</title>
        <link rel='icon' href='/favicon.svg' />
      </Head>

      <div className={styles.user}>
        <Navbar />
        <div className={styles.user__info}>
          <h1>Profil Candidat</h1>
          <div className={styles.user__info__desc}>
            <p>Prénom : {userProfil.first_name}</p>
            <p>Nom : {userProfil.last_name}</p>
            <p>Email : {userProfil.email}</p>
            <p>Téléphone : {userProfil.phone_number}</p>
          </div>
          <h2>CV de {userProfil.first_name}</h2>
          <embed
            style={{
              width: '100%',
              height: '1000px', 
            }}
            type='application/pdf'
            src={userProfil.resume_url}
          />
        </div>

        <Footer />
      </div>
    </>
    
  )
};

export const getServerSideProps = async ({ req, params }) => {

  if (!req.headers.cookie) {
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    }
  }
  const { token, role } = cookie.parse(req.headers.cookie);
  if (role !== "employer") {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }
  const user = await fetch(`${config.SERVER_URL}users/${params.id}`, {
    method: "get",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });
  const userProfil = await user.json();

  return {
    props: {
      userProfil,
    },
  };
};

export default Profil;