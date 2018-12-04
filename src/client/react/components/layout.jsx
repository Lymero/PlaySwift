import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { createStore } from "redux";
import RouterOutlet from "./router_outlet";
import { Provider } from "react-redux";

const initialState = {
  playlists: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "DISPLAY_PLAYLISTS":
      return {
        playlists: { playlist: "hello world" }
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

export class Layout extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <React.Fragment>
            <RouterOutlet />
          </React.Fragment>
        </div>
      </Provider>
    );
  }
}

export default Layout;
