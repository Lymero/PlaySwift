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
    redirectUrl: "http://localhost:3030/#/authCallback",
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

function errorCallback() {
  console.error("auth0-lock authentication error");
}

function successCallback() {
  console.log("auth0-lock authentication success");
  store.dispatch(setAuthState({
    'authenticated': true
  }));
}

lock.on("authenticated", authResult => {
  // Use the token in authResult to getUserInfo() and save it to localStorage
  lock.getUserInfo(authResult.accessToken, function (error, profile) {
    if (error) {
      errorCallback();
      return;
    }
    successCallback();
    localStorage.setItem("accessToken", authResult.accessToken);
    localStorage.setItem("profile", JSON.stringify(profile));
  });
});

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
  if (token === null) return false;
  let decoded = JWT.decode(token);
  return (new Date().getTime() / 1000) < decoded.exp;
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
  isAuthenticated: isAuthenticated
};