import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Login from '../pages/login';

const withPrivate = Component => {
  const Auth = (props) => {
    const token = useSelector(state => state.token)
    const router = useRouter();
    // Login data added to props via redux-store (or use react context for example)

    // If user is not logged in, return login component
    if (!token) {
      return (
        <Login />
      )
    }

    // If user is logged in, return original component
    return (
      <Component {...props} />
    );
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withPrivate;