import Cookies from 'js-cookie';

const initialState = {
  token: Cookies.get('token'),
  role: Cookies.get('role'),
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      Cookies.set('token', action.token);
      Cookies.set('role', action.role);
      return {
        ...state,
        token: action.token,
        role: action.role
      }
    case "SET_LOGOUT":
      Cookies.remove('token');
      Cookies.remove('role');
      return {
        ...state,
        token: null,
        role: null
      }
    default:
      return state;
  }
};

export default userReducer;
