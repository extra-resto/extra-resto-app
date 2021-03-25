import cookie from "cookie";
import Layout from 'components/Layout';
import styles from './user.module.scss';
import Navbar from "components/Navbar";
import Footer from "components/Footer";

const Profil = ({ userProfil }) => {
  return (
    <>
      <Navbar />
      <div className={styles.user}>
        <h1>Profil Candidat</h1>
        <h2>{userProfil.first_name}</h2>
        <h2>{userProfil.last_name}</h2>
        <h2>{userProfil.email}</h2>
        <h2>{userProfil.phone_number}</h2>
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
    </>
  )
};

export const getServerSideProps = async ({ req, params }) => {
  const { token, id } = cookie.parse(req.headers.cookie);
  const user = await fetch(`${process.env.API_ROOT}users/${params.id}`, {
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