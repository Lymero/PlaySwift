import React from "react";
import {
  Nav,
  Navbar,
  Button,
  Image,
  Dropdown,
  DropdownButton
} from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchFormContainer from "./search_form_container";
import Auth from "react/services/auth0";
import image from "../../../resources/logo.png";

const Navigation = ({ authState, profile }) => {
  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Navbar.Brand as={Link} to="/">
        <Image src={image} height="40px" />
      </Navbar.Brand>
      <Nav className="m-auto">
        <SearchFormContainer />
      </Nav>
      <span className="userIdentification">
        <Image src={profile.picture} className="" roundedCircle />
      </span>
      <DropdownButton
        variant="outline-light"
        id="dropdown-basic-button"
        title={authState.authenticated ? profile.name : "not logged in"}
      >
        <Dropdown.Item href="#/playlists">My Playlists</Dropdown.Item>
        <Dropdown.Item onClick={Auth.logout}>Logout</Dropdown.Item>
      </DropdownButton>
      ;
    </Navbar>
  );
};

export default Navigation;
