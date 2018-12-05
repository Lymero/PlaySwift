import React from "react";
import { HashRouter } from "react-router-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducers from "./reducers/root";

import Layout from "./components/layout/layout";

const store = createStore(rootReducers);

// A mettre dans la route /login
import { setCurrentUser } from "./actions/actions";
store.dispatch(setCurrentUser({ name: "chris" }));

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
