import React from "react";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import PlaylistPreview from "./playlist_preview";
import NewPlaylistForm from "./new_playlist_form_container";

const PlaylistsComponent = ({ title, playlists }) => {
  return (
    <Container>
      <h3>
        {title}
        <span className="badge badge-secondary">{playlists.length}</span>
      </h3>
        <Row>
          {playlists.map((playlist, i) => (
            <Col className="mb-5" xs={12} sm={6} md={3} key={i}>
              <PlaylistPreview playlist={playlist} key={i}/>
            </Col>
          ))}
          <Col xs={12} sm={6} md={3}>
            {location.href.split("/")[
              location.href.split("/").indexOf("#") + 1
            ] && <NewPlaylistForm />}
        </Col>
      </Row>
    </Container>
  );
};

export default PlaylistsComponent;
