import React from "react";
import Auth from "react/services/auth0.js";

class LoginPrompt extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    Auth.show();
    return null;
  }
}

export default LoginPrompt;
