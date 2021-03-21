import { initialState } from './store';
import Login from '../pages/login';
import { useRouter } from 'next/router';

const withPrivate = Component => {
  const Auth = (props) => {
    const router = useRouter();
    // Login data added to props via redux-store (or use react context for example)
    const { token } = initialState;

    // If user is not logged in, return login component
    if (!token) {
      return ()=>{
        router.push('/')
      }
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