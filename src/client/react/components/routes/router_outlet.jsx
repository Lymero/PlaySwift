import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import PlaylistsContainer from "../../containers/playlists/playlists_container";

function RouterOutlet() {
  return (
    <React.Fragment>
      {/* check authenticated + redirect */}
      {/* routes */}
      <Route path="/playlists" component={PlaylistsContainer} />
    </React.Fragment>
  );
}

export default withRouter(RouterOutlet);
