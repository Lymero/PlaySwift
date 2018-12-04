import React from "react";
import { HashRouter } from "react-router-dom";
import Layout from "./layout";

// TODO : wrap with authentication provider from redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import playlistsApp from "../redux/reducers";

const store = createStore(playlistsApp);

function Main() {
  return (
    <HashRouter>
      <Provider store={store}>
        <Layout />
      </Provider>
    </HashRouter>
  );
}

export default Main;
