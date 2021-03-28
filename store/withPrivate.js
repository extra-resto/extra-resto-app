import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withPrivate = Component => {
  return () => {
    const token = useSelector(state => state.token);
    const router = useRouter();

    useEffect(() => {
      if(!token) router.push("/login")
    }, [token])

    return <Component {...arguments} />
  }
}

export default withPrivate;
