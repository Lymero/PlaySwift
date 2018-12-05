import React from "react";
import { Container, ListGroup } from "react-bootstrap";

const PlaylistsComponent = ({ playlists, current_user }) => {
  return (
    <Container>
      <h2>Bonjour {current_user.name}</h2>
      <h3>Playlists</h3>
      {playlists.length > 0 && <p>{playlists[0]["playlist"]}</p>}
    </Container>
  );
};

export default PlaylistsComponent;
