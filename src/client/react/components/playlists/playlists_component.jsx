import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import PlaylistPreview from "./playlist_preview";
import NewPlaylistForm from "./new_playlist_form_container";

const PlaylistsComponent = ({ title, playlists }) => {
  return (
    <Container>
      <h3>
        {title}
        <span className="badge badge-secondary">{playlists.length}</span>
      </h3>
      <ListGroup>
        <Row>
          {playlists.map((playlist, i) => (
            <Col xs={12} sm={6} md={3} key={i}>
              <ListGroup.Item key={i}>
                <PlaylistPreview playlist={playlist} />
              </ListGroup.Item>
            </Col>
          ))}
          <Col xs={12} sm={6} md={3}>
            {location.href.split("/")[
              location.href.split("/").indexOf("#") + 1
            ] && <NewPlaylistForm />}
          </Col>
        </Row>
      </ListGroup>
    </Container>
  );
};

export default PlaylistsComponent;
