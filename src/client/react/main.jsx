import React from "react";
import { HashRouter } from "react-router-dom";


import { Provider } from "react-redux";
import rootStore from "./reducers/root";
import { PlaylistsProvider } from "react/context/playlists";


import Layout from "./components/layout/layout";

function Main() {
  return (
    <HashRouter>
      <PlaylistsProvider>
        <Provider store={rootStore}>
          <Layout />
        </Provider>
      </PlaylistsProvider>
    </HashRouter>
  );
}

export default Main;
