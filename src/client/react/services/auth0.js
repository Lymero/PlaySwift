import AuthModule from "auth0-lock";
import JWT from "jsonwebtoken";
import {
  setAuthState
} from "react/actions/actions";
import store from "react/reducers/root";

// https://auth0.com/docs/libraries/lock/v11/configuration#database-options
const passwordlessOptions = {
  allowedConnections: ["google-oauth2"],
  closable: true,
  auth: {
    audience: "http://localhost:3030",
    redirectUrl: "http://localhost:3030/authCallback",
    responseType: "token id_token",
    params: {
      scope: "openid email profile"
    }
  }
};

const lock = new AuthModule(
  "F7e38indc2EkfYA5lH8snHyM9DqP1Hcu",
  "web3.eu.auth0.com",
  passwordlessOptions
);

function show() {
  lock.show();
}

function verify() {
  if (isAuthenticated()) {
    store.dispatch(setAuthState({
      'authenticated': true
    }));
    return true;
  }
  return false;
}

function isAuthenticated() {
  let token = localStorage.getItem("accessToken");
  if (token === null) throw "AccessToken not found in localStorage";
  let decoded = JWT.decode(token);
  return (new Date().getTime() / 1000) < decoded.exp;
}

function getUserProfile() {
  let token = localStorage.getItem("profile");
  if (token === null) throw "ProfileToken not found in localStorage";
  let decoded = JWT.decode(token);
  return decoded;
}

function getUserId() {
  return getUserProfile().sub.split("|")[1];
}

function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("profile");
  store.dispatch(setAuthState({
    'authenticated': false
  }));
}

export default {
  show: show,
  logout: logout,
  verify: verify,
  getUserProfile: getUserProfile,
  getUserId: getUserId,
  isAuthenticated: isAuthenticated
};