import React from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import AllPlaylistsContainer from "../../containers/playlists/all_playlists_container";
import MyPlaylistsContainer from "../../containers/playlists/my_playlists_container";
import LoginContainer from "../auth/login_container";
import CallbackContainer from "../auth/callback_container";
import { connect } from "react-redux";

function RouterOutlet({ authState, location: { pathname } }) {
  const redirectToLogin = !authState.authenticated && pathname !== "/login";

  return (
    <React.Fragment>
      {/*  {redirectToLogin && <Redirect to="/login" />}
      {!redirectToLogin && (
        <React.Fragment> */}
      <Route exact path="/" component={AllPlaylistsContainer} />
      <Route path="/login" component={LoginContainer} />
      <Route path="/authCallback" component={CallbackContainer} />
      <Route path="/playlists" component={MyPlaylistsContainer} />
      {/* </React.Fragment>
      )} */}
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  authState: state.usersSession.authState
});

export default withRouter(connect(mapStateToProps)(RouterOutlet));
