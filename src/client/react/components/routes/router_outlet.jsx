import React from "react";
import { Route, withRouter } from "react-router-dom";
<<<<<<< HEAD
import PlaylistsContainer from "../../containers/playlists/playlists_container";
import LoginContainer from "react/components/auth/login_container";
import CallbackContainer from "react/components/auth/callback_container";
=======
import AllPlaylistsContainer from "../../containers/playlists/all_playlists_container";
import MyPlaylistsContainer from "../../containers/playlists/my_playlists_container";
import LoginContainer from "../auth/login_container";
import CallbackContainer from "../auth/callback_container";
>>>>>>> f4222fd1b9d6fe6dae40163f0baa994aec2050a6

function RouterOutlet() {
  return (
    <React.Fragment>
      {/* check authenticated + redirect */}
      {/* routes */}
      <Route path="/" component={AllPlaylistsContainer} />
      <Route path="/login" component={LoginContainer} />
      <Route path="/authCallback" component={CallbackContainer} />
      <Route path="/playlists" component={MyPlaylistsContainer} />
    </React.Fragment>
  );
}

export default withRouter(RouterOutlet);
