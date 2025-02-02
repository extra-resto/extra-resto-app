import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setLogout } from 'store/User/userAction';
import styles from './Logout.module.scss';
import config from 'config/config.json';

const Logout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);

  const userLogout = () => {
    fetch(`${config.SERVER_URL}logout`, {
      method: 'delete',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      dispatch(setLogout());
      router.push('/');
    })
  }
  return (
    <div className={styles.Logout}>
      <button type="button" onClick={userLogout}>Se deconnecter</button>
    </div>
  );
};

export default Logout;