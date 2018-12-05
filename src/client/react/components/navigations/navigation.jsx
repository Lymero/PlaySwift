import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import SearchForm from "./search_form";

const Navigation = ({ onClick }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">
        Home
      </Navbar.Brand>
      <Nav className="mr-auto" />
      <SearchForm />
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/playlists">
          My playlists
        </Nav.Link>
      </Nav>
      <Button variant="outline-warning" onClick={onClick}>
        Logout
      </Button>
    </Navbar>
  );
};

export default Navigation;
