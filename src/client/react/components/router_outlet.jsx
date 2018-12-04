import React from "react";
import { Route, withRouter } from "react-router-dom";
import PlaylistsContainer from "./playlists/playlists_container";

function RouterOutlet() {
  return (
    <React.Fragment>
      {/* Usage of <PrivateRoute path={} component={}></PrivateRoute> */}
      {/* <Route path="/login" component={...} /> */}
      {/* <Route exact path="/" component={LoginContainer} /> */}
      <Route path="/playlists" component={PlaylistsContainer} />
      {/* <Route path="/logout" component={...} /> */}
    </React.Fragment>
  );
}

export default withRouter(RouterOutlet);
