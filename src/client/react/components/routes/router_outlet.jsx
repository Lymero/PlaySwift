import React from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import AllPlaylistsContainer from "react/components/playlists/all_playlists_container";
import MyPlaylistsContainer from "react/components/playlists/my_playlists_container";
import VideoPlayerContainer from "react/components/player/video_player_root_container";
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
        <Route path="/playlists/:idPlaylist" component={VideoPlayerContainer} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  authState: state.usersSession.authState
});

export default withRouter(connect(mapStateToProps)(RouterOutlet));
