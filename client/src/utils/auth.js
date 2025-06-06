// This module provides authentication utilities for managing user sessions
// using localStorage to store the authentication token.
const Auth = {
  login: (token) => {
    localStorage.setItem('id_token', token);
    // window.location.assign('/');
  },
  logout: () => {
    localStorage.removeItem('id_token');
    // window.location.assign('/');
  },
  getToken: () => {
    return localStorage.getItem('id_token');
  },
  loggedIn: () => {
    return !!Auth.getToken();
  },
};

export default Auth;
//                 