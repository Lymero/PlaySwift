import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchFormContainer from "./search_form_container";
import Auth from "react/services/auth0";

const Navigation = ({ authState, profile }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">
        Home
      </Navbar.Brand>
      <Nav className="mr-auto" />
      <SearchFormContainer />
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/playlists">
          My playlists - Current user =
          {authState.authenticated ? profile.name : "not logged in"}
        </Nav.Link>
      </Nav>
      <Button variant="outline-warning" onClick={Auth.logout}>
        Logout
      </Button>
    </Navbar>
  );
};

export default Navigation;
