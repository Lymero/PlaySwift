import React from "react";
import { Container, ListGroup } from "react-bootstrap";
import PlaylistPreview from "./playlist_preview";

const PlaylistsComponent = ({ playlists }) => {
  return (
    <Container>
      <h3>Playlists</h3>
      <ListGroup>
        {playlists.map((playlist, i) => (
          <ListGroup.Item key={i}>
            <PlaylistPreview playlist={playlist} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default PlaylistsComponent;
