export const setUser = (token) => ({
  type: "SET_USER",
  token
});

export const setEmployer = (id) => ({
  type: "SET_EMPLOYER",
  id
});

export const setCandidate = (id) => ({
  type: "SET_CANDIDATE",
  id
});

export const setLogout = () => ({
  type: "SET_LOGOUT"
});
