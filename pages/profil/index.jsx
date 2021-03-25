import cookie from "cookie";

const Profil = ({ userProfil }) => {
  console.log(userProfil)
  return (
    <div>
      <h1>Votre profil</h1>
      <h2>{userProfil.first_name}</h2>
      <h2>{userProfil.last_name}</h2>
      <h2>{userProfil.email}</h2>
      <h2>{userProfil.phone_number}</h2>
    </div>
  )
};

export const getServerSideProps = async ({ req }) => {
  const { token, id } = cookie.parse(req.headers.cookie);
  const user = await fetch(`${process.env.API_ROOT}users/${id}`, {
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