import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchForm from "./search_form";
import Auth from "react/services/auth0";

const Navigation = ({ authState }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">
        Home
      </Navbar.Brand>
      <Nav className="mr-auto" />
      <SearchForm />
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/playlists">
          My playlists - Current user =
          {authState.authenticated
            ? Auth.getUserProfile().name
            : "not logged in"}
        </Nav.Link>
      </Nav>
      <Button variant="outline-warning" onClick={Auth.logout}>
        Logout
      </Button>
    </Navbar>
  );
};

export default Navigation;
