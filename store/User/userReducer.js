import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const isExpired = (token) => {
  const { exp } = jwtDecode(token);
  const now = Date.now() / 1000;
  return (exp < now);
};

const baseState = {
  token: undefined,
  role: undefined,
  id: undefined
}

const initState = () => {
  const token = Cookies.get('token');
  if (!token) return baseState;
  if (isExpired(token)) {
    Cookies.remove('token');
    Cookies.remove('role');
    Cookies.remove('id');
    return baseState;
  }
  else return {
    token: Cookies.get('token'),
    role: Cookies.get('role'),
    id: Cookies.get('id')
  }
};

export const initialState = initState();

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      Cookies.set('token', action.token);
      Cookies.set('role', action.role);
      Cookies.set('id', action.id)
      return {
        ...state,
        token: action.token,
        role: action.role,
        id: action.id
      }
    case "SET_LOGOUT":
      Cookies.remove('token');
      Cookies.remove('role');
      Cookies.remove('id');
      return {
        ...state,
        token: null,
        role: null,
        id: null
      }
    default:
      return state;
  }
};

export default userReducer;
