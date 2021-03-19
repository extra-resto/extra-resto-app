import Cookies from 'js-cookie';

const initialState = {
  token: Cookies.get('token')
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      Cookies.set('token', action.token);
      return {
        ...state,
        token: action.token,
      }
    case "SET_LOGOUT":
      Cookies.remove('token');
      return {
        ...state,
        token: null,
      }
    default:
      return state;
  }
};

export default userReducer;
