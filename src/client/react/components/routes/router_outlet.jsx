import React from "react";
import { Route, withRouter } from "react-router-dom";
import AllPlaylistsContainer from "../../containers/playlists/all_playlists_container";
import MyPlaylistsContainer from "../../containers/playlists/my_playlists_container";

function RouterOutlet() {
  return (
    <React.Fragment>
      {/* check authenticated + redirect */}
      {/* routes */}
      <Route path="/" component={AllPlaylistsContainer} />
      <Route path="/login" />
      <Route path="/playlists" component={MyPlaylistsContainer} />
    </React.Fragment>
  );
}

export default withRouter(RouterOutlet);
