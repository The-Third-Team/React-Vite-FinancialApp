const BASE_URL = "api/"

import sendRequest from "./send-request"

export function register(userData) {
    return sendRequest(`${BASE_URL}register`, "POST", userData);
  }
  
  export function login(credentials) {
    return sendRequest(`${BASE_URL}login`, "POST", credentials);
  }
  
  export function googleLogin(credentials) {
    return sendRequest(`${BASE_URL}googleSignin`, "POST", credentials);
  }
  
  export function checkToken() {
    return sendRequest(`${BASE_URL}check-token`);
  }