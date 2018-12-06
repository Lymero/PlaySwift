import React from "react";
import { Route, withRouter } from "react-router-dom";
import PlaylistsContainer from "../../containers/playlists/playlists_container";
import LoginContainer from "react/components/auth/login_container";
import CallbackContainer from "react/components/auth/callback_container";

function RouterOutlet() {
  return (
    <React.Fragment>
      {/* check authenticated + redirect */}
      {/* routes */}
      <Route path="/playlists" component={PlaylistsContainer} />
      <Route path="/login" component={LoginContainer} />
      <Route path="/authCallback" component={CallbackContainer} />
    </React.Fragment>
  );
}

export default withRouter(RouterOutlet);
