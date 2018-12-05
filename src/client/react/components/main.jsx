import React from "react";
import { HashRouter } from "react-router-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducers from "../redux/reducers/root";

import Layout from "./layout";

const store = createStore(rootReducers);

import { addCurrentUser } from "../redux/actions/actions";
store.dispatch(addCurrentUser({ name: "chris" }));
console.log(store.getState());

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
