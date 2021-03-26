export const setUser = (token, role, id) => ({
  type: "SET_USER",
  token,
  role,
  id
});

export const setLogout = () => ({
  type: "SET_LOGOUT"
});
