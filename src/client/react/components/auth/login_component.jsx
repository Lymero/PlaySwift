import React from "react";
import { Container, Button } from "react-bootstrap";
import Auth from "react/services/auth0.js";
import { connect } from "react-redux";

const LoginComponent = () => {
  return (
    <Container>
      <Button bsstyle="info" onClick={Auth.show}>
        Info
      </Button>
    </Container>
  );
};

export default LoginComponent;
