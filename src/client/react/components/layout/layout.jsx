import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import RouterOutlet from "../routes/router_outlet";
import NavigationContainer from "../../containers/navigations/navigiation_container";

export class Layout extends Component {
  render() {
    return (
      <div>
        <React.Fragment>
          <NavigationContainer />
          <Container>
            <Row>
              <RouterOutlet />
            </Row>
          </Container>
        </React.Fragment>
      </div>
    );
  }
}

export default Layout;
