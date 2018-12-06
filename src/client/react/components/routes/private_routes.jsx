import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ path, component, authState }) => {
  return authState.authenticated ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/login" />
  );
};

const mapStateToProps = state => ({
  authState: state.usersSession.authState
});

export default connect(mapStateToProps)(PrivateRoute);
