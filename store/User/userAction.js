export const setUser = (token, role) => ({
  type: "SET_USER",
  token,
  role
});

export const setLogout = () => ({
  type: "SET_LOGOUT"
});
