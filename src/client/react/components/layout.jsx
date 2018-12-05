import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import RouterOutlet from "./router_outlet";
import Navigation from "./navigations/navigation";

export class Layout extends Component {
  render() {
    return (
      <div>
        <React.Fragment>
          <Navigation />
          <Container>
            <Row>
              <Col xs={4} />
              <Col xs={8}>
                <RouterOutlet />
              </Col>
              <Col xs={4} />
            </Row>
          </Container>
        </React.Fragment>
      </div>
    );
  }
}

export default Layout;
