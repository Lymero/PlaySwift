import React from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import AllPlaylistsContainer from "../../containers/playlists/all_playlists_container";
import MyPlaylistsContainer from "../../containers/playlists/my_playlists_container";
import LoginPrompt from "../auth/login_prompt";
import CallbackContainer from "../auth/callback_container";
import { connect } from "react-redux";

import Auth from "react/services/auth0.js";

const authenticated = Auth.isAuthenticated();

function RouterOutlet({ authState, location: { pathname } }) {
  const redirectToLogin = !authState.authenticated && pathname !== "/login";

  console.log(authenticated + " " + redirectToLogin);

  if (redirectToLogin) {
    return (
      <React.Fragment>
        <Redirect to="/login" />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Route exact path="/" component={AllPlaylistsContainer} />
        <Route path="/login" component={LoginPrompt} />
        <Route path="/authCallback" component={CallbackContainer} />
        <Route path="/playlists" component={MyPlaylistsContainer} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  authState: state.usersSession.authState
});

export default withRouter(connect(mapStateToProps)(RouterOutlet));
