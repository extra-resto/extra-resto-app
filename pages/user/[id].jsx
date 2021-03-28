import cookie from "cookie";
import styles from './user.module.scss';
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import config from 'config/config.json';

const Profil = ({ userProfil }) => {
  return (
      <div className={styles.user}>
        <Navbar />
        <div className={styles.user__info}>
          <h1>Profil Candidat</h1>
          <div className={styles.user__info__desc}>
            <p>Nom : {userProfil.first_name}</p>
            <p>Prénom : {userProfil.last_name}</p>
            <p>Email : {userProfil.email}</p>
            <p>Téléphone : {userProfil.phone_number}</p>
          </div>
          <h2>CV</h2>
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
    
  )
};

export const getServerSideProps = async ({ req, params }) => {
  const { token, id } = cookie.parse(req.headers.cookie);
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