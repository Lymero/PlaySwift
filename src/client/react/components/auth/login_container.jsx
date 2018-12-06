import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginComponent from "./login_component";

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { authenticated } = this.props.authState;
    return (
      <React.Fragment>
        {authenticated && <Redirect to="/" />}
        {!authenticated && <LoginComponent />}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  authState: state.usersSession.authState
});

export default connect(mapStateToProps)(LoginContainer);
