import React from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import AllPlaylistsContainer from "react/components/playlists/all_playlists_container";
import MyPlaylistsContainer from "react/components/playlists/my_playlists_container";
import MyVideosContainer from "react/components/videos/my_videos_container";
import LoginPrompt from "react/components/auth/login_prompt";
import CallbackContainer from "react/components/auth/callback_container";
import { connect } from "react-redux";

function RouterOutlet({ authState, location: { pathname } }) {
  const redirectToLogin = !authState.authenticated && pathname !== "/login";

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
        <Route exact path="/playlists" component={MyPlaylistsContainer} />
        <Route path="/playlists/:idPlaylist" component={MyVideosContainer} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  authState: state.usersSession.authState
});

export default withRouter(connect(mapStateToProps)(RouterOutlet));
