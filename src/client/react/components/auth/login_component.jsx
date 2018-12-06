import React from "react";
import { Container, Button } from "react-bootstrap";
import Auth from 'react/services/auth0.js';

const LoginComponent = () => {
  return (
    <Container>
        <Button bsStyle="info" onClick={ Auth.show() }>Info</Button>
    </Container>
  );
};

export default LoginComponent;
