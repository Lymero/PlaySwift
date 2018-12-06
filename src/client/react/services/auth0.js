import AuthModule from "auth0-lock";

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

function errorCallback() {
  console.error("auth0-lock authentication error");
}

function successCallback() {
  console.log("auth0-lock authentication success");
}

lock.on("authenticated", authResult => {
  // Use the token in authResult to getUserInfo() and save it to localStorage
  lock.getUserInfo(authResult.accessToken, function(error, profile) {
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

export default {
  show: show
};
