import React from "react";
import LoginComponent from "./login_component";

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LoginComponent/>
    );
  }
}

export default LoginContainer;
