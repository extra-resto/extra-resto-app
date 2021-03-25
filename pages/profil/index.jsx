import cookie from "cookie";

const Profil = ({ userProfil }) => {
  return <div>userProfil.id</div>;
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