import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

import RouterOutlet from "./router_outlet";

// components

export class Layout extends Component {
  render() {
    return (
      <div>
        <React.Fragment>
          <RouterOutlet />
        </React.Fragment>
      </div>
    );
  }
}

export default Layout;
