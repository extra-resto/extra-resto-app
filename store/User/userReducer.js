import Cookies from 'js-cookie';

const initialState = {
  token: Cookies.get('token'),
  role: Cookies.get('role'),
  id: Cookies.get('id')
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      Cookies.set('token', action.token);
      return {
        ...state,
        token: action.token,
      }
    case "SET_EMPLOYER":
      Cookies.set('role', "employer");
      Cookies.set('id', action.id);
      return {
        ...state,
        role: "employer",
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
