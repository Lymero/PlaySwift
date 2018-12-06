import React from "react";
import { HashRouter } from "react-router-dom";


import { Provider } from "react-redux";
import rootStore from "./reducers/root";

import Layout from "./components/layout/layout";

function Main() {
  return (
    <HashRouter>
      <Provider store={rootStore}>
        <Layout />
      </Provider>
    </HashRouter>
  );
}

export default Main;
