import React from "react";
import { Container, ListGroup } from "react-bootstrap";
import { connect } from "react-redux";

const PlaylistsComponent = ({ playlists }) => {
  return (
    <Container>
      <h3>Playlists</h3>
      <p> {playlists["playlist"]} </p>
    </Container>
  );
};

const mapStateToProps = state => ({
  playlists: state.playlists
});

export default connect(mapStateToProps)(PlaylistsComponent);
