import React from "react";
import { Route, withRouter } from "react-router-dom";
import PlaylistsContainer from "./playlists/playlists_container";
import LoginContainer from "./auth/login_container";
import CallbackContainer from "./auth/callback_container";

function RouterOutlet() {
  return (
    <React.Fragment>
      <Route exact path="/" component={LoginContainer}/>
      {/* Usage of <PrivateRoute path={} component={}></PrivateRoute> */}
      <Route path="/login" component={LoginContainer} />
      <Route path="/authCallback" component={CallbackContainer} />
      {/* <Route exact path="/" component={LoginContainer} /> */}
      <Route path="/playlists" component={PlaylistsContainer} />
      {/* <Route path="/logout" component={...} /> */}
    </React.Fragment>
  );
}

export default withRouter(RouterOutlet);
